(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

 
  const mobileOverlay = $("#mobileOverlay");
  const burgerBtn = $("#burgerBtn");

  if (burgerBtn && mobileOverlay) {
    burgerBtn.addEventListener("click", () => mobileOverlay.showModal());

    
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) mobileOverlay.close();
    });

 
    $$(".mobile-overlay__link", mobileOverlay).forEach((a) => {
      a.addEventListener("click", () => mobileOverlay.close());
    });
  }

 
  const ticketModal = $("#ticketModal");
  const ticketInfo = $("#ticketInfo");

  if (ticketModal && ticketInfo) {
    $$("[data-ticket]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const city = btn.dataset.city || "—";
        const venue = btn.dataset.venue || "—";
        const datetime = btn.dataset.datetime || "—";

        ticketInfo.textContent = `Місто: ${city} · Локація: ${venue} · Дата: ${datetime}`;
        ticketModal.showModal();
      });
    });

    ticketModal.addEventListener("click", (e) => {
      if (e.target === ticketModal) ticketModal.close();
    });
  }


  const infoModal = $("#infoModal");
  const infoTitle = $("#infoTitle");
  const infoText = $("#infoText");

  if (infoModal && infoTitle && infoText) {
    $$("[data-info]").forEach((btn) => {
      btn.addEventListener("click", () => {
        infoTitle.textContent = btn.dataset.title || "Інформація";
        infoText.textContent = btn.dataset.text || "";
        infoModal.showModal();
      });
    });

    infoModal.addEventListener("click", (e) => {
      if (e.target === infoModal) infoModal.close();
    });
  }

  
  const form = $("#contactForm");
  if (!form) return;

  const nameInput = $("#user-name");
  const emailInput = $("#user-email");
  const msgInput = $("#user-message");

  const setError = (input, message) => {
    input.setAttribute("aria-invalid", "true");
    const el = $(`[data-error-for="${input.id}"]`);
    if (el) el.textContent = message;
  };

  const clearError = (input) => {
    input.removeAttribute("aria-invalid");
    const el = $(`[data-error-for="${input.id}"]`);
    if (el) el.textContent = "";
  };

  const validateField = (input) => {
    clearError(input);

    if (input.validity.valueMissing) {
      setError(input, "Це поле обовʼязкове.");
      return false;
    }

    if (input.validity.tooShort) {
       setError( input, input.minLength > 0 ? `Мінімум ${input.minLength} символів.` : 'Введіть більше символів.' );
      return false;
    }

    if (input.type === "email" && input.validity.typeMismatch) {
      setError(input, "Введи коректний email (наприклад name@gmail.com).");
      return false;
    }

    return true;
  };

  [nameInput, emailInput, msgInput].forEach((inp) => {
    if (!inp) return;
    inp.addEventListener("blur", () => validateField(inp));
    inp.addEventListener("input", () => clearError(inp));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const okName = validateField(nameInput);
    const okEmail = validateField(emailInput);
    const okMsg = validateField(msgInput);

    if (okName && okEmail && okMsg) {
      form.submit();
    }
  });
})();