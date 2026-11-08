# Interaction audit — 8 November 2026

Reviewed all 18 public content routes and the not-found page in Edge, using real
scroll, hover, click, keyboard and emulated touch interactions. Desktop and phone
passes covered the home page, work listing and three case studies, expertise,
studio, process, insights and both guides, contact, project planner, and all five
industry pages. Additional tablet and 320px checks covered shared navigation,
forms, cards and text bounds.

## Fixes

- Functional disclosures, custom selects and mobile Card Nav retain soft opening
  with the site's Motion toggle off. OS reduced-motion preferences remain
  respected. The measured FAQ opening with the site toggle off took about 563ms
  and included intermediate height/opacity states.
- Contact selects use a body portal, choose the available side of the trigger,
  and constrain their height to the visible viewport. Keyboard movement scrolls
  the option list, rather than the document. Home/End, Escape, Tab, outside pointer
  dismissal and selected-option reopening are supported.
- Industry service links now select the requested discipline and scroll to its
  detail. All seven service hashes were checked, including client navigation from
  an industry page and subsequent ordinary selection.
- Motion-off card hovers retain colour/focus feedback without vertical movement.
  The expertise list's entrance and selection marker also follow this preference.
- Case-study enquiry rows reserve desktop clearance for the floating companion.
- The desktop header retains its static navigation while Gooey Nav is loading.
  Holding the effect chunk in the browser confirmed all five links remain usable.

## Verification

- `pnpm test`: 13 tests pass, including viewport-placement regression cases.
- `pnpm build`: production build, lint and type validation pass; 26 generated
  pages complete.
- Phone form progression, validation, retained choices, planner handoff and
  assistant outside/Escape dismissal and draft retention checked.
- Contact loading, simulated 500, retry, success and reset checked with browser
  interception on localhost. Chat pending feedback, simulated error and reply
  recovery checked the same way. No real enquiry or live model request was sent.
- All 11 footer markers remain at 17.5px visual width with `--effect: 0` during
  the Motion-off hover sweep. Header hides when scrolling down to the footer.
- 320px/390px phones, 768px tablet and approximately 1272px desktop were inspected;
  no unintended horizontal text/control overflow was found in the checked views.
- Slower profile: 4x CPU, 150ms network latency, 200kB/s download and 90kB/s upload.
  Entrance replay, scrolling and header response remained functional. Two tasks
  over 50ms were observed during that sample (103ms and 122ms).

## Scope limits

This is a functional and visual regression pass, not a guarantee for every device,
browser or network. Touch and smaller viewports were emulated in desktop Edge;
physical iOS/Android and Safari were not tested. The contact and chat delivery
states used controlled responses; production email delivery and model accuracy
were not exercised. The three client project homepages were opened to verify
destinations, without testing their transactions or account workflows. No
business copy, packages, or unrelated dependency-update PRs were changed.
