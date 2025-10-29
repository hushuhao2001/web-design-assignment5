"use strict";

function setError(el, message) { el.textContent = message || ""; }

function setInvalid(inputEl, isInvalid) {
  if (isInvalid) {
    inputEl.setAttribute("aria-invalid", "true");
  } else {
    inputEl.removeAttribute("aria-invalid");
  }
}


function validateName() {
  const input = document.getElementById("name");
  const errorEl = document.getElementById("name-error");
  const value = (input.value || "").trim();
  if (value.length === 0) { setError(errorEl, "Name is required."); setInvalid(input, true); return false; }
  if (value.length < 3) { setError(errorEl, "Name must be at least 3 characters."); setInvalid(input, true); return false; }
  setError(errorEl, ""); setInvalid(input, false); return true;
}


function validateYob() {
  const input = document.getElementById("yob");
  const errorEl = document.getElementById("yob-error");
  const raw = (input.value || "").trim();
  const currentYear = new Date().getFullYear();
  if (raw.length === 0) { setError(errorEl, "Year of birth is required."); setInvalid(input, true); return false; }
  if (!/^\d+$/.test(raw)) { setError(errorEl, "Enter an integer year (numbers only)."); setInvalid(input, true); return false; }
  const year = parseInt(raw, 10);
  if (!Number.isInteger(year)) { setError(errorEl, "Enter an integer year."); setInvalid(input, true); return false; }
  if (year <= 1900) { setError(errorEl, "Year must be greater than 1900."); setInvalid(input, true); return false; }
  if (year >= currentYear) { setError(errorEl, `Year must be less than ${currentYear}.`); setInvalid(input, true); return false; }
  setError(errorEl, ""); setInvalid(input, false); return true;
}


function toggleZipVisibility() {
  const us = document.getElementById("us");
  const zipRow = document.getElementById("zip-row");
  const zip = document.getElementById("zip");
  const zipErr = document.getElementById("zip-error");
  if (us.checked) {
    zipRow.classList.remove("hidden");
  } else {
    zipRow.classList.add("hidden");
    zip.value = "";
    setError(zipErr, "");
    setInvalid(zip, false);
  }
}


function validateZip() {
  const us = document.getElementById("us");
  const zip = document.getElementById("zip");
  const errorEl = document.getElementById("zip-error");
  const raw = (zip.value || "").trim();
  if (!us.checked) { setError(errorEl, ""); setInvalid(zip, false); return true; }
  if (raw.length === 0) { setError(errorEl, "Zipcode is required."); setInvalid(zip, true); return false; }
  if (!/^\d{5}$/.test(raw)) { setError(errorEl, "Zipcode must be 5 digits."); setInvalid(zip, true); return false; }
  setError(errorEl, ""); setInvalid(zip, false); return true;
}


function validatePassword() {
  const input = document.getElementById("password");
  const errorEl = document.getElementById("password-error");
  const value = (input.value || "");
  if (value.length === 0) { setError(errorEl, "Password is required."); setInvalid(input, true); return false; }
  if (value.length < 8) { setError(errorEl, "Password must be at least 8 characters."); setInvalid(input, true); return false; }
  setError(errorEl, ""); setInvalid(input, false); return true;
}


function validatePizza() {
  const checked = document.querySelector('input[name="pizza"]:checked');
  const errorEl = document.getElementById("pizza-error");
  if (!checked) { setError(errorEl, "Please select one option."); return false; }
  setError(errorEl, ""); return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const status = document.getElementById("form-status");

  document.getElementById("name").addEventListener("input", validateName);
  document.getElementById("yob").addEventListener("input", validateYob);

  document.getElementById("us").addEventListener("change", () => {
    toggleZipVisibility();
    validateZip();
  });
  document.getElementById("zip").addEventListener("input", validateZip);

  document.getElementById("password").addEventListener("input", validatePassword);
  document.querySelectorAll('input[name="pizza"]').forEach(el => {
    el.addEventListener("change", validatePizza);
  });

  toggleZipVisibility();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.classList.remove("success");
    status.textContent = "Validating…";

    const ok =
      validateName() &
      validateYob() &
      (toggleZipVisibility(), validateZip()) &
      validatePassword() &
      validatePizza();

    status.textContent = "";
    if (ok) {
      status.classList.add("success");
      status.textContent = "Accepted";
    }
  });
});


