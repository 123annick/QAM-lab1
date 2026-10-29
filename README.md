# Newsletter Sign-Up Form with Success Message

A responsive newsletter sign-up form with live email validation and a success message, built with plain HTML, CSS and JavaScript.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure: the sign-up card and the success message |
| `style.css` | Styling, hover/focus states and responsive layout |
| `script.js` | Live validation and switching between the two states |

**How to run:** open `index.html` in any browser. No build step is needed.

---

## Step-by-step walkthrough

### Step 1: Set up the HTML document
- `<!DOCTYPE html>` and `lang="en"` tell browsers and screen readers which language the page uses.
- The `viewport` meta tag makes mobile browsers show the page at the device's width. Without it, media queries won't work on phones.
- The Roboto font comes from Google Fonts, and `style.css` is linked in the `<head>`.
- `script.js` loads with `defer`, so it runs only after the HTML has been parsed and every element it looks for already exists.

### Step 2: Use semantic HTML (grading: semantic elements)
- `<main>` wraps the page's main content.
- Each state is a `<section>` linked to its heading with `aria-labelledby`.
- `<h1>` is the main title and `<h2>` is the success title, which keeps the heading order logical.
- The benefits are a real `<ul>` list, so screen readers announce "list, 3 items".
- The illustration is decorative, so it has `aria-hidden="true"` and screen readers skip it.

### Step 3: Build an accessible form (grading: accessible form structure)
- `<label for="email">` is linked to `<input id="email">`. Clicking the label focuses the input, and screen readers read the label aloud.
- `type="email"` brings up the email keyboard on phones, and `autocomplete="email"` allows autofill.
- `novalidate` turns off the browser's built-in error bubbles. They look different in every browser, so our own consistent messages are used instead.
- The error `<span>` has:
  - `aria-live="polite"`, so screen readers announce a new error automatically
  - an id that the input points to through `aria-describedby`, so the error is read along with the field
- `aria-invalid` is updated by JavaScript to tell assistive technology whether the field has an error.
- The success state uses the `hidden` attribute, so it starts off invisible and inaccessible.

### Step 4: Define design tokens in CSS
All colours, fonts, radii and timings are CSS custom properties on `:root`, for example `--clr-tomato` and `--clr-dark-slate`. Every rule uses these variables, so the design stays consistent and one change updates everywhere.

### Step 5: Reset browser defaults (grading: consistency across browsers)
- `box-sizing: border-box` and zeroed margins remove differences between browsers.
- `font: inherit` on inputs and buttons is needed because form controls don't inherit the page font by default.
- `appearance: none` removes the inner shadow Safari adds to inputs.
- `opacity: 1` on the placeholder fixes Firefox's faded placeholders.

### Step 6: Lay out the page mobile-first (grading: media queries)
The base CSS styles the **mobile** layout:
- The card fills the screen.
- `flex-direction: column-reverse` puts the illustration *above* the text. The HTML order stays logical (text first) for screen readers.

Two media queries then improve the layout on bigger screens:
- **600px and up (tablet):** charcoal background, with the content in a centred, rounded card with a shadow.
- **900px and up (desktop):** `flex-direction: row` places the text and the illustration side by side.

Breakpoints are written in `em`, so they also adapt when a user zooms or uses a larger default font size.

### Step 7: Add hover and focus states (grading: interactive states)
- **Input:** a darker border on hover, and a border plus a soft glow ring on focus.
- **Button:**
  - On hover or keyboard focus, an orange-pink gradient fades in with a glow shadow.
  - CSS can't animate a gradient directly, so the gradient sits on a `::before` layer and its `opacity` is animated instead.
- `:focus-visible` shows a clear outline for keyboard users only, so mouse users don't see an outline after clicking.
- **Error state (`.is-invalid`):** red border, light red background and red text. **Valid state (`.is-valid`):** green border.
- `prefers-reduced-motion` turns off animations for users who ask for less motion.

### Step 8: Validate in real time with JavaScript (grading: empty field and email format)
- `getEmailError()` returns one of:
  - `"Email address is required"` when the field is empty
  - `"Valid email required"` when the value doesn't match `name@domain.tld`
  - `""` when the email is valid
- **When it runs:**
  - **blur** (leaving the field) validates for the first time.
  - **input** (each keystroke) re-validates live after that, so the error clears as soon as the email is fixed. Validating only after the first interaction avoids showing an error while someone is still typing.
  - **submit** always validates. `event.preventDefault()` stops the page from reloading, and if the email is invalid, focus goes back to the input.

### Step 9: Show the dynamic success message (grading: error and success messages)
- **When the email is valid:**
  - The email is placed into the message with `textContent`. This is safer than `innerHTML` because it can't run injected HTML.
  - The form card gets `hidden` and the success card is shown.
  - Focus moves to the success heading, so screen-reader users hear the confirmation.
- **Dismiss message** resets the form, clears validation, switches back to the form and focuses the input, ready for another email.

### Step 10: Test it
These states were tested in Chromium at 1440px (desktop), 768px (tablet) and 375px (mobile):

- empty submit shows "Email address is required"
- `ash@lorem` shows "Valid email required"
- a valid email clears the error
- Enter submits the form and shows the success card with the email
- Dismiss returns to an empty form
- no horizontal scrolling at any size
- no console errors

Before you submit, also test in Firefox, Safari and Edge, and with keyboard only (Tab, Enter).

---

## Grading checklist

| Criteria | Where |
|----------|-------|
| Semantic HTML | `main`, `section`, `h1`/`h2`, `ul`, `form` and `label` in `index.html` |
| Accessible form | label and input linked, `aria-live`, `aria-invalid`, `aria-describedby`, focus management |
| Consistent cross-browser design | reset and normalisation in section 2 of `style.css` |
| Hover and focus states | input, button, `:focus-visible`, error and valid states |
| Real-time validation | `blur`, `input` and `submit` listeners in `script.js` |
| Dynamic messages | error text, plus a success card that shows the user's email |
| Media queries | mobile-first base, with 600px and 900px breakpoints |
| Desktop and mobile usability | full-width tap targets and stacked layout on mobile |
