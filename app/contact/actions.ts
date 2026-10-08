"use server";

export type InquiryField = "name" | "email" | "phone" | "company" | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  /* Echoed back on an error so the form can refill itself — React resets an
     uncontrolled form after every action. */
  values?: Partial<Record<InquiryField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

function read(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<InquiryField, string>) {
  const errors: Partial<Record<InquiryField, string>> = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (!values.phone) errors.phone = "Please enter your phone or WhatsApp number.";
  else if (!PHONE_PATTERN.test(values.phone))
    errors.phone = "Please enter a valid phone number, like +91 98765 43210.";

  if (values.company.length > 120) errors.company = "Please keep this under 120 characters.";

  if (values.message.length < 10)
    errors.message = "Please tell us a little about what you need (at least 10 characters).";
  else if (values.message.length > 3000) errors.message = "Please keep your message under 3,000 characters.";

  return errors;
}

/* Delivery is a plain fetch to Resend's REST API — no SDK dependency.
   Needs RESEND_API_KEY and CONTACT_TO_EMAIL. CONTACT_FROM_EMAIL must be on a
   domain verified in Resend; until one is, Resend's shared
   onboarding@resend.dev sender only delivers to the Resend account's own
   address. If anything is missing the visitor sees an error — an inquiry is
   never silently dropped. */
async function deliver(values: Record<InquiryField, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Vrattiks Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — inquiry not sent.");
    return false;
  }

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Company: ${values.company || "—"}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        reply_to: values.email,
        subject: `New website inquiry from ${values.name}${values.company ? ` (${values.company})` : ""}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error(`[contact] Resend responded ${response.status}: ${await response.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return false;
  }
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  /* Honeypot: a field hidden from people. Bots that fill it get a normal
     success response and nothing is sent. */
  if (read(formData, "website")) return { status: "success" };

  const values: Record<InquiryField, string> = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: read(formData, "phone"),
    company: read(formData, "company"),
    message: read(formData, "message"),
  };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const sent = await deliver(values);
  if (!sent) {
    return {
      status: "error",
      message: "We couldn't send your message just now. Please try again in a few minutes.",
      values,
    };
  }

  return { status: "success" };
}
