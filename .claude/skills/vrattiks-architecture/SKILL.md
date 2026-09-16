---
name: vrattiks-architecture
description: Single source of truth for the Vrattiks website's page list, routes/slugs, required sections per page, service/industry/use-case categories, navigation structure, CTA rules, and internal-linking rules — sourced from "VRATTIKS — Task 3 | Final Pages List". Use before creating, restructuring, linking, or reviewing any page or nav item, and whenever a request names a specific page (Home, Services, AI Voice Agent, Real Estate, Lead Management, Case Studies, etc.) to confirm its correct route, purpose, and required sections. Other Vrattiks skills reference this one instead of inventing page structure.
---

# Vrattiks Architecture

This is the **only** place page structure is defined. `vrattiks-page-builder` and
`vrattiks-page-review` read from here — do not redefine routes or sections in
another skill or invent new pages not listed below.

Source: "VRATTIKS — Task 3 | Final Pages List" PDF (client-approved). If a
future request conflicts with this file, ask before deviating, then update
this file so it stays canonical.

## 1. Final page list (do not add or remove pages)

| # | Page | Route (proposed convention — confirm before renaming) | Purpose |
|---|------|------|---------|
| 01 | Home | `/` | Main landing page |
| 02 | Company / About Us | `/company` | Company story, mission, vision, founders, values |
| 03 | Services (overview) | `/services` | Overview of all services |
| 03.1 | AI Voice Agent | `/services/ai-voice-agent` | Service detail |
| 03.2 | AI Chatbot | `/services/ai-chatbot` | Service detail |
| 03.3 | Workflow Automation | `/services/workflow-automation` | Service detail |
| 03.4 | Website Development | `/services/website-development` | Service detail |
| 03.5 | WhatsApp Automation | `/services/whatsapp-automation` | Service detail |
| 03.6 | CRM | `/services/crm` | Service detail |
| 04 | Industries (overview) | `/industries` | Overview of industries served |
| 04.1 | Real Estate | `/industries/real-estate` | Industry solutions and use cases |
| 04.2 | E-commerce | `/industries/e-commerce` | Industry solutions and use cases |
| 04.3 | Healthcare | `/industries/healthcare` | Industry solutions and use cases |
| 04.4 | Finance | `/industries/finance` | Industry solutions and use cases |
| 04.5 | Manufacturing | `/industries/manufacturing` | Industry solutions and use cases |
| 04.6 | Hospitality | `/industries/hospitality` | Industry solutions and use cases |
| 05 | Use Cases (overview) | `/use-cases` | Business problems and automation use cases |
| 05.1 | Lead Management | `/use-cases/lead-management` | Lead capture and follow-up automation |
| 05.2 | Customer Support | `/use-cases/customer-support` | AI support and response automation |
| 05.3 | Business Intelligence | `/use-cases/business-intelligence` | Dashboards, KPIs, decision intelligence |
| 06 | Case Studies | `/case-studies` (list) + `/case-studies/[slug]` (detail) | Projects, challenges, solutions, results |
| — | Products | `/products` | Product overview, cards, features, benefits |
| — | Blog / Resources | `/blog` (list) + `/blog/[slug]` (article) | AI/automation insights, business education |
| 07 | Contact | `/contact` | Inquiry and consultation |

**No page outside this list should be created.** If a request implies a new
top-level page not on this list, flag it instead of building it.

## 2. Required sections per page (from the PDF's "Main Page Structure")

Build/verify these sections in this order. Don't drop a required section;
don't add unrelated ones without a reason.

- **Home**: Hero → KPI/Results → Why Businesses Need AI → Why Vrattiks → Services overview → Use Cases → Industries → Case Studies → Process → Testimonials → FAQ → Final CTA
- **Company / About Us**: Company introduction → Our story → Mission & Vision → Values/approach → Co-Founders/team → Why Vrattiks → CTA
- **Services**: Services overview → 6 service cards (Voice Agent, Chatbot, Workflow Automation, Website Development, WhatsApp Automation, CRM) → Process → CTA
- **Industries**: Industry overview → 6 industry cards (Real Estate, E-commerce, Healthcare, Finance, Manufacturing, Hospitality) → Industry-specific CTA
- **Use Cases**: Use-case overview → 3 use-case cards (Lead Management, Customer Support, Business Intelligence) → Problem → Solution → Benefit → CTA
- **Case Studies**: Case-study listing → Client/industry → Challenge → Solution → Implementation → Results/KPIs → CTA
- **Products**: Product overview → product cards/showcase → Features → Benefits → Product CTA
- **Blog / Resources**: Articles/insights → topic categories → individual article pages → CTA
- **Contact**: Contact details → inquiry form → Consultation CTA → email/phone → relevant business info

### Detail-page templates (structural convention, not from the PDF — apply consistently across all pages of that type)

- **Service detail** (03.x): Hero (service name + one-line outcome) → Problem/challenge it solves → How it works → Key features → Benefits → Who it's for (link relevant Industries/Use Cases) → Related services → CTA.
- **Industry detail** (04.x): Hero (industry name) → Industry-specific challenges → Vrattiks solutions for this industry → Relevant services (link to Services) → Relevant use cases (link to Use Cases) → Results/benefits (use placeholder per `vrattiks-standards` unless a real case study exists) → Industry-specific CTA.
- **Use case detail** (05.x): Hero → Problem → Solution → Benefit (per PDF) → How Vrattiks solves it → Related services → Related industries → CTA.

## 3. Navigation structure

Top-level nav: Home · Company · Services (dropdown: 6 services) · Industries (dropdown: 6 industries) · Use Cases (dropdown: 3 use cases) · Case Studies · Products · Blog · Contact.

Detail pages (03.x/04.x/05.x, case study articles, blog posts) are reached via
their overview page and cross-links — they are not separate top-nav items.

## 4. CTA rules

- One primary (gradient) button per screen/section — see `vrattiks-design-system` for the button hierarchy itself; this file only states *where* CTAs point.
- Every page ends in exactly one primary CTA. Default target is `/contact`, except:
  - Service/Industry/Use-case detail pages may CTA to a more specific action (e.g. "Talk to us about [Service]") but still resolve to the Contact flow.
  - Products page CTA can point to a product-specific action if one exists, otherwise `/contact`.
- Never stack two primary (gradient) buttons in the same section.

## 5. Internal linking rules

- Service detail pages → link to: relevant Industries, relevant Use Cases, Services overview, Contact.
- Industry detail pages → link to: relevant Services, relevant Use Cases, Industries overview, Contact.
- Use case detail pages → link to: relevant Services, relevant Industries, Use Cases overview, Contact.
- Case study articles → link to: the Service(s) and Industry involved, Case Studies listing, Contact.
- Home → links out to Services, Industries, Use Cases, Case Studies overviews (per its required sections above).
- Every detail page links back to its own overview page (breadcrumb or "back to Services", etc.).
- Don't create orphan pages — every page in section 1 must be reachable via nav or a cross-link from another page.

## Used by

`vrattiks-page-builder`, `vrattiks-page-review`, `vrattiks-seo` (routes/slugs,
internal linking), `vrattiks-design-system` (CTA button count rule owner).
