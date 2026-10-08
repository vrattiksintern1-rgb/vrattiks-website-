"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { submitInquiry, type InquiryField, type InquiryState } from "@/app/contact/actions";

const initialState: InquiryState = { status: "idle" };

/* Field chrome. The resting border is n-500, not n-200/n-300: an input's
   edge is a non-text boundary and needs 3:1 against white
   (vrattiks-accessibility, "Contrast"); n-300 measures ~1.8:1. Focus is the
   shared border shift + glow (CLAUDE.md Design Taste, reference 3). */
const fieldBase =
  "w-full rounded-md border bg-n-0 px-4 py-3 text-[15px] text-n-900 transition-[border-color,box-shadow] duration-150 placeholder:text-n-500 focus:border-brand-secondary focus:shadow-[var(--shadow-glow)] focus:outline-none";

function fieldClass(invalid: boolean) {
  return `${fieldBase} ${invalid ? "border-sem-error-text" : "border-n-500"}`;
}

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: InquiryField;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-n-800">
        {label}
        {optional ? <span className="font-normal text-n-600"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13.5px] leading-[1.45] text-sem-error-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  /* Move focus to where the visitor needs to look next: the first invalid
     field, or the confirmation once the message is sent. */
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      return;
    }
    const firstInvalid = Object.keys(state.errors ?? {})[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
    }
  }, [state]);

  const describedBy = (field: InquiryField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sem-success-bg text-sem-success-text">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-[24px] leading-[1.2] font-display font-bold text-n-900 focus:outline-none"
        >
          Thanks — your message is on its way.
        </h3>
        <p className="max-w-md text-[15px] leading-[1.6] text-n-600">
          We&apos;ll reply to the email address you gave us. If it&apos;s urgent, you can also reach us
          using the details on this page.
        </p>
      </div>
    );
  }

  return (
    /* Submitting through onSubmit skips React's automatic reset after an
       action, so a failed submit keeps everything the visitor typed (the
       reset doesn't restore a <select> from defaultValue). `action` stays
       for submissions before hydration or without JS. */
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
      noValidate
      className="flex flex-col gap-5"
    >
      <div aria-live="polite" aria-atomic="true">
        {state.status === "error" && state.message ? (
          <p className="rounded-md border border-sem-error/40 bg-sem-error-bg px-4 py-3 text-[14px] leading-[1.5] text-sem-error-text">
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={fieldClass(!!errors.name)}
          />
        </Field>

        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={fieldClass(!!errors.email)}
          />
        </Field>

        <Field id="phone" label="Phone or WhatsApp" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={20}
            defaultValue={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={fieldClass(!!errors.phone)}
          />
        </Field>

        <Field id="company" label="Business name" optional error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            defaultValue={values.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={fieldClass(!!errors.company)}
          />
        </Field>
      </div>

      <Field id="message" label="Tell us about your business" error={errors.message}>
        <p id="message-hint" className="-mt-1 text-[13.5px] leading-[1.5] text-n-600">
          What takes up your team&apos;s time, or where do enquiries slip through?
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={3000}
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint")}
          className={`${fieldClass(!!errors.message)} resize-y`}
        />
      </Field>

      {/* Honeypot — off-screen and out of the tab order; people never see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1">
        <Button type="submit" size="lg" disabled={pending} className="w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {pending ? "Sending…" : "Request a free consultation"}
        </Button>
      </div>
    </form>
  );
}
