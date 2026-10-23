# Responsive audit: 2026-10-22

Layout-only pass. No copy, colour, font face or design change.

- **Routes:** 24 (home, company, services + 6 service pages, industries + 11 industry pages, use-cases, contact, privacy-policy).
- **Widths:** 1920, 1440, 1280, 1024, 901, 768, 601, 430, 390, 375, 320.
- **Themes:** light and dark.
- **Capture:** Playwright (Chromium 1234). Widths up to 768 are emulated as a phone (touch, 2x). 1024 is emulated as a touch tablet; 1280 and up use a mouse.

Screenshots are named `{page}__{width}__{theme}.jpg`. `before/` and `after/` hold 528 full-page captures each. `{before,after}/interactions/` holds viewport captures of the menu, dropdown, Process stepper, slider, marquee, testimonials and contact form.

## Summary

| Check | Before | After |
|---|---|---|
| Horizontal overflow (528 combinations) | 0px everywhere | 0px everywhere |
| Clipped, cut-off or overlapping text | none found | none |
| Non-inline tap targets under 44px on touch layouts (≤1024px) | 30+ distinct controls on every page | 0 |
| Page height at 1280 / 1440 / 1920 (144 combinations) | – | identical to before (desktop unchanged) |
| Nav dropdown on touch at 1024 | did not open | opens |
| Slider under reduced motion | hydration error | clean |
| Contact form field text on touch | 15px (iOS zooms on focus) | 16px |
| Low-res image | `/services` hero at 768 (1.43x on a 2x screen) | correct `sizes` |

## Shared: header, mobile menu, footer (every page)

| Issue | Fix | Before | After |
|---|---|---|---|
| Logo link 32–36px tall | 44px link box, image unchanged | `before/home__375__light.jpg` | `after/home__375__light.jpg` |
| Theme toggle 40×40 | 44×44 on touch layouts, 40 with a mouse at ≥1024 | `before/interactions/menu-closed__375__light.jpg` | `after/interactions/menu-closed__375__light.jpg` |
| Hamburger 40×40 | 44×44, icon position kept | same as above | same as above |
| Mobile menu Services/Industries toggles 40×40 | 44×44 | `before/interactions/menu-services__320__light.jpg` | `after/interactions/menu-services__320__light.jpg` |
| Desktop nav links 20px tall, chevrons 22×22 | 44px hit boxes using negative margins; visual spacing identical | `before/home__1440__light.jpg` | `after/home__1440__light.jpg` |
| **Nav dropdown never opened on touch** (iPad landscape): the tap's emulated hover opened it and its click closed it | Hover-open for mouse pointers only | `before/interactions/nav-dropdown__1024.jpg` | `after/interactions/nav-dropdown__1024.jpg` |
| "Book a Consultation" header CTA 40px | 46px on touch at 1024 | `before/home__1024__light.jpg` | `after/home__1024__light.jpg` |
| Footer links 19px tall (pitch 31px) | 44px rows on touch layouts; mouse at ≥1024 unchanged | `before/home__390__light.jpg` | `after/home__390__light.jpg` |
| Footer social icons 40×40, logo 32px | 44×44, alignment kept | same | same |
| Footer one column from 601 to 900 (right half empty) | Two columns from 601px | `before/service-whatsapp-automation__768__light.jpg` | `after/service-whatsapp-automation__768__light.jpg` |

## Home `/`

| Issue | Fix | Before | After |
|---|---|---|---|
| Hero H1 36px, 5 lines at 320 | `clamp(30px, 8vw, 36px)` below 901: 4 lines at 320, 3 at 375 | `before/home__320__light.jpg` | `after/home__320__light.jpg` |
| Slider progress segments 26px tall, about 14–22px wide on phones | 44px-tall buttons with their own full-width row below 601px (each ≥49px wide); arrows sit beneath | `before/interactions/slider__320.jpg` | `after/interactions/slider__320.jpg` |
| Slider: hydration mismatch with reduced motion | `useSyncExternalStore` with a server snapshot | `before/interactions/slider__390__reduced.jpg` | `after/interactions/slider__390__reduced.jpg` |
| Process step nodes 36×36 | 44×44 button around the unchanged 36px node | `before/interactions/process-step3__375x667.jpg` | `after/interactions/process-step3__375x667.jpg` |
| Final CTA card: 32px side padding left a 224px text measure at 320 | `clamp(20px, 6vw, 32px)` below 901 | `before/home__320__dark.jpg` | `after/home__320__dark.jpg` |

## Company `/company`

| Issue | Fix | Before | After |
|---|---|---|---|
| H1 52px ran 5 lines in the side-by-side column at 1024 | `clamp(44px, 4.4vw, 52px)` from 1024: 45px and 4 lines at 1024, 52px again from about 1180 | `before/company__1024__light.jpg` | `after/company__1024__light.jpg` |
| H1 36px, 4 lines at 320 | Fluid 30–36px | `before/company__320__light.jpg` | `after/company__320__light.jpg` |

## Services `/services`

| Issue | Fix | Before | After |
|---|---|---|---|
| Hero image soft at 768 (`sizes` said 40vw; it shows at 448px) | `sizes="(min-width: 480px) 448px, 100vw"` | `before/services__768__light.jpg` | `after/services__768__light.jpg` |
| Process step nodes 36×36 | 44×44 | `before/services__375__light.jpg` | `after/services__375__light.jpg` |
| H1 36px at 320 | Fluid 30–36px | `before/services__320__light.jpg` | `after/services__320__light.jpg` |

## Service detail pages `/services/*` (all 6, one template)

| Issue | Fix | Before | After |
|---|---|---|---|
| "Services" breadcrumb link 18px tall | 44px hit box, line unchanged | `before/service-crm__390__light.jpg` | `after/service-crm__390__light.jpg` |
| H1 40px ("Workflow Automation" 2 lines at 375) | `clamp(32px, 10vw, 40px)`: 1 line at 375 | `before/service-workflow-automation__375__light.jpg` | `after/service-workflow-automation__375__light.jpg` |

## Industries `/industries`

| Issue | Fix | Before | After |
|---|---|---|---|
| "Jump to your industry" links 42px | 44px on touch at 1024; unchanged with a mouse | `before/industries__1024__light.jpg` | `after/industries__1024__light.jpg` |
| H1 36px, 3 lines at 320 | Fluid 30–36px, 2 lines | `before/industries__320__light.jpg` | `after/industries__320__light.jpg` |

## Industry detail pages `/industries/*` (all 11, one template)

| Issue | Fix | Before | After |
|---|---|---|---|
| "Industries" breadcrumb link 18px tall | 44px hit box | `before/industry-healthcare__390__light.jpg` | `after/industry-healthcare__390__light.jpg` |
| H1 40px ("Finance & Insurance" 2 lines at 320) | `clamp(32px, 10vw, 40px)` | `before/industry-finance__320__light.jpg` | `after/industry-finance__320__light.jpg` |

## Use cases `/use-cases`

| Issue | Fix | Before | After |
|---|---|---|---|
| "Services that do this" chips 34px tall | 44px link box on touch; pill unchanged | `before/use-cases__375__light.jpg` | `after/use-cases__375__light.jpg` |
| "Browse by industry" link 19px | 45px hit box, line unchanged | same | same |
| H1 36px at 320 | Fluid 30–36px | `before/use-cases__320__light.jpg` | `after/use-cases__320__light.jpg` |

## Contact `/contact`

| Issue | Fix | Before | After |
|---|---|---|---|
| Form fields 15px: iOS Safari zooms the page on focus | 16px on touch layouts | `before/interactions/contact-form__390.jpg` | `after/interactions/contact-form__390.jpg` |
| Email/phone links 20px | 44px hit box | `before/contact__390__light.jpg` | `after/contact__390__light.jpg` |
| "What we build" links 20px, 8px apart | 44px rows on touch (CRM ≥44px wide) | `before/contact__375__dark.jpg` | `after/contact__375__dark.jpg` |
| H1 36px at 320 | Fluid 30–36px | `before/contact__320__light.jpg` | `after/contact__320__light.jpg` |

## Privacy policy `/privacy-policy`

| Issue | Fix | Before | After |
|---|---|---|---|
| Contents rail links 29px (touch at 1024) | 44px on touch; unchanged with a mouse | `before/privacy-policy__1024__light.jpg` | `after/privacy-policy__1024__light.jpg` |
| Contact-table email/website links 20px | 44px rows on touch | `before/privacy-policy__390__light.jpg` | `after/privacy-policy__390__light.jpg` |
| H1 36px | Fluid 30–36px | `before/privacy-policy__320__light.jpg` | `after/privacy-policy__320__light.jpg` |

## Checked, no change needed

- **Process stepper** (pinned, scroll-driven): fits under the header at every step at 320×568, 375×667, 390×844, 768×1024, 1024×768 and 1440×900, with and without reduced motion. Tapping a step jumps to it.
- **Services slider**: touch swipe, arrows, segments and autoplay all work; under reduced motion it starts paused.
- **Client logo marquee**: moves at every width, is static under reduced motion, all 16 logos load at one height, and causes no overflow.
- **Testimonials**: one column, then two from 901, then four from 1280. No clipping.
- **Reduced motion**: no infinite animation running on any page, and no content left hidden.
- **Images**: no stretched images; apart from the `/services` fix, every image is sharp at 2x. The audit reported 3 slider images "not loaded" on home at 430. A production check showed these are lazy images on cards the autoplay had moved to while the page sat scrolled to the top. Every slider image that comes into view loads (checked at 390, 430 and 601).
- **Production build** (`next start`): metrics re-run on all 528 combinations. 0px overflow, 0 undersized touch targets, no page errors, nothing hidden under reduced motion.

## Not changed, with reasons

- **Links inside running sentences in the privacy policy** (for example "contact us at vrattiks@gmail.com."). WCAG 2.5.8 exempts inline links, and padding them to 44px would cover the lines above and below.
- **Targets under 44px at 1024px and up with a mouse** (footer links, desktop nav text, privacy contents). They are kept so laptop and desktop render exactly as before; any touch device at those widths gets the 44px versions.
- **Fluid spacing:** section padding was not converted to `clamp()`. It already steps in 4px bands, nothing was uneven, and changing it would only shift approved layouts. `clamp()` is used where it fixed something: H1s and the CTA card padding.
- **Pre-existing dev warning:** the JSON-LD `<script>` in `app/page.tsx` logs React's "Encountered a script tag" warning. It isn't a layout issue.
