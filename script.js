/* =========================================================
   Newsletter Sign-Up — form validation & success state
   ========================================================= */

// ---------- 1. Grab the elements we need ----------
const signupCard = document.getElementById("signup-card");
const successCard = document.getElementById("success-card");
const form = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("email-error");
const successEmail = document.getElementById("success-email");
const successTitle = document.getElementById("success-title");
const dismissBtn = document.getElementById("dismiss-btn");

// Simple, practical email pattern: something@something.tld
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Tracks whether the user has finished interacting with the field once.
// We only validate while typing AFTER this, so users aren't shown
// an error before they've had a chance to finish their email.
let hasInteracted = false;

// ---------- 2. Validation logic ----------

/**
 * Checks an email value and returns an error message,
 * or an empty string if the value is valid.
 */
function getEmailError(value) {
  const email = value.trim();
  if (email === "") return "Email address is required";
  if (!EMAIL_PATTERN.test(email)) return "Valid email required";
  return "";
}

/** Shows an error: red text, red input and aria-invalid for screen readers. */
function showError(message) {
  errorMessage.textContent = message;
  emailInput.classList.add("is-invalid");
  emailInput.classList.remove("is-valid");
  emailInput.setAttribute("aria-invalid", "true");
}

/** Clears the error and marks the field as valid. */
function showValid() {
  errorMessage.textContent = "";
  emailInput.classList.remove("is-invalid");
  emailInput.classList.add("is-valid");
  emailInput.setAttribute("aria-invalid", "false");
}

/** Removes all validation styling (used when resetting). */
function clearValidation() {
  errorMessage.textContent = "";
  emailInput.classList.remove("is-invalid", "is-valid");
  emailInput.setAttribute("aria-invalid", "false");
}

/** Validates the field, updates the UI and returns true/false. */
function validateEmail() {
  const error = getEmailError(emailInput.value);
  if (error) {
    showError(error);
    return false;
  }
  showValid();
  return true;
}

// ---------- 3. Real-time validation events ----------

// When the user leaves the field, validate (unless they never typed anything)
emailInput.addEventListener("blur", () => {
  if (emailInput.value.trim() !== "" || hasInteracted) {
    hasInteracted = true;
    validateEmail();
  }
});

// While typing: update feedback live once the user has interacted
emailInput.addEventListener("input", () => {
  if (hasInteracted) validateEmail();
});

// ---------- 4. Form submission ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  hasInteracted = true;

  if (!validateEmail()) {
    emailInput.focus(); // send the user straight back to fix the problem
    return;
  }

  showSuccess(emailInput.value.trim());
});

// ---------- 5. Switching between the two states ----------

/** Hides the form card and shows the success message with the user's email. */
function showSuccess(email) {
  successEmail.textContent = email; // textContent prevents HTML injection
  signupCard.hidden = true;
  successCard.hidden = false;
  successTitle.focus(); // screen readers announce the new content
}

/** Returns to an empty form so another email can be entered. */
function dismissSuccess() {
  form.reset();
  clearValidation();
  hasInteracted = false;
  successCard.hidden = true;
  signupCard.hidden = false;
  emailInput.focus();
}

dismissBtn.addEventListener("click", dismissSuccess);
