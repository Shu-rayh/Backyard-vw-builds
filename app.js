/* BVB — Backyard VW Builds | Centralized Config & WhatsApp Conversion Engine */
(function () {
  "use strict";

  const BVB_CONFIG = {
    brandName: "Backyard VW Builds",
    shortName: "BVB",
    location: "Johannesburg, Gauteng, South Africa",
    whatsappDisplay: "068 294 1864",
    whatsappNumber: "27682941864",
    socials: {
      tiktok: "https://www.tiktok.com/@bvb_motors?is_from_webapp=1&sender_device=pc",
      instagram: "https://www.instagram.com/backyard_vw_builds/",
      facebook: "https://web.facebook.com/p/Backyard-VW-Builds-61595818719840/?_rdc=1&_rdr#"
    },
    messages: {
      headerQuote: "Hi BVB! I'd like to get a quote for my Volkswagen. Could you assist me?",
      general: "Hi BVB! I came across Backyard VW Builds and would like to find out more about your services.",
      build: "Hi BVB! I'm interested in starting a VW build project. Could we discuss my vehicle, build options and estimated costs?",
      maintenance: "Hi BVB! I'd like to book my Volkswagen for maintenance or mechanical work. Could you let me know your availability?",
      performance: "Hi BVB! I'm interested in performance upgrades for my Volkswagen. Could we discuss suitable options and pricing?",
      styling: "Hi BVB! I'm interested in styling and custom modifications for my Volkswagen. Could you assist me with available options?",
      diagnostics: "Hi BVB! I'm experiencing an issue with my Volkswagen and would like to arrange diagnostics. Could you assist me?",
      socialBuild: "Hi BVB! I've been checking out your builds on social media and would like to discuss a project for my Volkswagen.",
      generations: "Hi BVB! I'm interested in discussing a build for my Volkswagen. Could you help me explore the options for my model?",
      dailyBuild: "Hi BVB! I'm interested in The Daily Build for my Volkswagen. I'd like to discuss a clean, reliable everyday setup and estimated costs.",
      streetPerformance: "Hi BVB! I'm interested in a Street Performance Build for my Volkswagen. Could we discuss my current setup, suitable upgrades and pricing?",
      fullBackyard: "Hi BVB! I'm interested in a Full Backyard Build. I'd like to discuss my Volkswagen, project vision, budget and what would be involved in bringing the build to life.",
      routineServicing: "Hi BVB! I'd like to inquire about routine servicing and maintenance for my Volkswagen. Could you let me know your availability and next steps?",
      mechanicalRepairs: "Hi BVB! I'd like to discuss mechanical repairs for my Volkswagen. Could you assist me with an assessment and quote?",
      brakesSuspension: "Hi BVB! I'd like to inquire about brakes and suspension work for my Volkswagen. Could you assist me with an assessment and quote?",
      vehicleHealth: "Hi BVB! I'd like to request a vehicle health and preventative maintenance assessment for my Volkswagen. Could we discuss availability?",
      tuningSetup: "Hi BVB! I'd like to inquire about tuning and setup options for my Volkswagen. Could we discuss my current configuration and goals?",
      wheelsStance: "Hi BVB! I'd like to discuss wheels, suspension and stance options for my Volkswagen. Could you assist me with fitment and pricing?",
      diagnosticsPage: "Hi BVB! I'd like to arrange diagnostics for my Volkswagen. I'm experiencing an issue and would like to discuss an assessment, availability and pricing.",
      notSureStart: "Hi BVB! I'm not sure where to start with my Volkswagen. Could we discuss my vehicle and possible options?"
    }
  };

  function getWhatsAppUrl(message) {
    return `https://wa.me/${BVB_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  // Wire all declarative WhatsApp links
  function initWhatsAppLinks() {
    document.querySelectorAll("[data-wa-key]").forEach((el) => {
      const key = el.getAttribute("data-wa-key");
      const msg = BVB_CONFIG.messages[key.toLowerCase()] || BVB_CONFIG.messages.general;
      el.setAttribute("href", getWhatsAppUrl(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll("[data-social-key]").forEach((el) => {
      const key = el.getAttribute("data-social-key");
      if (BVB_CONFIG.socials[key]) {
        el.setAttribute("href", BVB_CONFIG.socials[key]);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  // Sticky Header Scroll State & Mobile Navigation
  function initNavigation() {
    const header = document.querySelector(".site-header");
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 24) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    const toggle = document.getElementById("mobile-menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        window.setTimeout(() => drawer.classList.toggle("is-open", !expanded), 1200);
      });

      drawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          toggle.setAttribute("aria-expanded", "false");
          drawer.classList.remove("is-open");
        });
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) {
          toggle.setAttribute("aria-expanded", "false");
          drawer.classList.remove("is-open");
          toggle.focus();
        }
      });
    }
  }

  // Dynamic Year in Footer
  function initCurrentYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(year);
    });
  }

  // Accessible FAQ Accordion
  function initAccordion() {
    const triggers = document.querySelectorAll(".faq-trigger");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const panelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        btn.setAttribute("aria-expanded", String(!expanded));
        if (panel) {
          panel.hidden = !expanded;
        }
      });
    });
  }

  // Homepage Quick Quote Builder
  function initQuickQuoteForm() {
    const form = document.getElementById("quick-quote-form");
    if (!form) return;

    const vehicleSelect = document.getElementById("qq-vehicle");
    const inquirySelect = document.getElementById("qq-inquiry");
    const notesInput = document.getElementById("qq-notes");
    const vehicleErr = document.getElementById("qq-vehicle-error");
    const inquiryErr = document.getElementById("qq-inquiry-error");

    function validate() {
      let valid = true;
      if (!vehicleSelect.value.trim()) {
        vehicleErr.textContent = "Please select your vehicle model.";
        vehicleSelect.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        vehicleErr.textContent = "";
        vehicleSelect.removeAttribute("aria-invalid");
      }

      if (!inquirySelect.value.trim()) {
        inquiryErr.textContent = "Please select an inquiry type.";
        inquirySelect.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        inquiryErr.textContent = "";
        inquirySelect.removeAttribute("aria-invalid");
      }
      return valid;
    }

    vehicleSelect.addEventListener("change", validate);
    inquirySelect.addEventListener("change", validate);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstInvalid = form.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const vehicle = vehicleSelect.value.trim();
      const inquiry = inquirySelect.value.trim();
      const notes = notesInput.value.trim();

      const lines = [
        "Hi BVB!",
        "",
        "I'd like to inquire about my vehicle.",
        "",
        `Vehicle: ${vehicle}`,
        `Inquiry: ${inquiry}`
      ];

      if (notes) {
        lines.push(`Additional details: ${notes}`);
      }

      lines.push("", "Could you assist me with the next steps and an estimated quote?");

      const url = getWhatsAppUrl(lines.join("\n"));
      return;
    });
  }

  // Page 2 Detailed Build & Booking Quote Configurator
  function initBuildConfigurator() {
    const form = document.getElementById("build-configurator-form");
    if (!form) return;

    const yearSelect = document.getElementById("bc-year");
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 1; y >= 1970; y--) {
      const opt = document.createElement("option");
      opt.value = String(y);
      opt.textContent = String(y);
      yearSelect.appendChild(opt);
    }
    ["Older than 1970", "Not sure"].forEach((label) => {
      const opt = document.createElement("option");
      opt.value = label;
      opt.textContent = label;
      yearSelect.appendChild(opt);
    });

    const fields = {
      name: document.getElementById("bc-name"),
      vehicle: document.getElementById("bc-vehicle"),
      customVehicleWrap: document.getElementById("bc-custom-vehicle-wrap"),
      customVehicle: document.getElementById("bc-custom-vehicle"),
      year: yearSelect,
      engine: document.getElementById("bc-engine"),
      service: document.getElementById("bc-service"),
      guidance: document.getElementById("bc-service-guidance"),
      condition: document.getElementById("bc-condition"),
      budget: document.getElementById("bc-budget"),
      timeline: document.getElementById("bc-timeline"),
      notes: document.getElementById("bc-notes"),
      charCount: document.getElementById("bc-char-count")
    };

    const errors = {
      vehicle: document.getElementById("bc-vehicle-error"),
      customVehicle: document.getElementById("bc-custom-vehicle-error"),
      year: document.getElementById("bc-year-error"),
      service: document.getElementById("bc-service-error")
    };

    const summary = {
      nameRow: document.getElementById("sum-name-row"),
      name: document.getElementById("sum-name"),
      vehicle: document.getElementById("sum-vehicle"),
      year: document.getElementById("sum-year"),
      engine: document.getElementById("sum-engine"),
      condition: document.getElementById("sum-condition"),
      project: document.getElementById("sum-project"),
      budget: document.getElementById("sum-budget"),
      timeline: document.getElementById("sum-timeline")
    };

    const SERVICE_GUIDANCE = {
      "The Daily Build": "Ideal for a dependable, clean everyday VW setup—share any maintenance items, wheel/suspension goals or subtle styling ideas.",
      "Street Performance Build": "Great for balanced street upgrades—let us know your current setup, driving goals and supporting hardware priorities.",
      "Full Backyard Build": "For comprehensive transformations or classic revivals—outline your overall vision, current vehicle state and phased goals.",
      "Routine maintenance": "Share your current mileage, last service history or specific service items you need checked.",
      "Mechanical repairs": "Describe any mechanical symptoms, leaks, noises or worn components you've noticed.",
      "Performance upgrades": "Mention your engine variant, any existing bolt-ons and what direction you'd like to explore.",
      "Tuning inquiry": "Include your engine code/variant, existing hardware modifications and what you want to achieve.",
      "Wheels and suspension": "Share your preferred wheel specs, ride height goals or coilover/suspension setup ideas.",
      "Brakes": "Let us know whether you're looking for routine pad/disc replacement or an upgraded braking setup.",
      "Exterior styling": "Tell us which visual details, lips, spoilers, grilles or styling touches you have in mind.",
      "Diagnostics": "Describe any dashboard warning lights, fault symptoms or when the issue occurs.",
      "Parts inquiry": "Specify the exact part name, vehicle generation and engine variant so compatibility can be checked.",
      "Other": "Use the project details box below to describe exactly what you need help with."
    };

    function getResolvedVehicle() {
      const base = fields.vehicle.value.trim();
      if (base === "Other Volkswagen" || base === "Other vehicle") {
        const custom = fields.customVehicle.value.trim();
        return custom ? `${base} (${custom})` : "";
      }
      return base;
    }

    function updateSummary() {
      const nameVal = fields.name.value.trim();
      if (nameVal) {
        summary.nameRow.hidden = false;
        summary.name.textContent = nameVal;
      } else {
        summary.nameRow.hidden = true;
      }

      const veh = getResolvedVehicle();
      summary.vehicle.textContent = veh || "Not selected.";
      summary.vehicle.classList.toggle("is-empty", !veh);

      const yr = fields.year.value.trim();
      summary.year.textContent = yr || "Not selected.";
      summary.year.classList.toggle("is-empty", !yr);

      const eng = fields.engine.value.trim();
      summary.engine.textContent = eng || "Not specified";
      summary.engine.classList.toggle("is-empty", !eng);

      const cond = fields.condition.value.trim();
      summary.condition.textContent = cond || "Not specified";
      summary.condition.classList.toggle("is-empty", !cond);

      const srv = fields.service.value.trim();
      summary.project.textContent = srv || "Not selected.";
      summary.project.classList.toggle("is-empty", !srv);

      const bud = fields.timeline.value.trim();
      summary.budget.textContent = bud || "Not specified";
      summary.budget.classList.toggle("is-empty", !bud);

      const time = fields.timeline.value.trim();
      summary.timeline.textContent = time || "Not specified";
      summary.timeline.classList.toggle("is-empty", !time);
    }

    fields.vehicle.addEventListener("change", () => {
      const needsCustom = fields.vehicle.value === "Other Volkswagen" || fields.vehicle.value === "Other vehicle";
      fields.customVehicleWrap.hidden = needsCustom;
      if (!needsCustom) {
        fields.customVehicle.value = "";
        errors.customVehicle.textContent = "";
        fields.customVehicle.removeAttribute("aria-invalid");
      }
      validateField("vehicle");
      updateSummary();
    });

    fields.customVehicle.addEventListener("input", () => {
      validateField("customVehicle");
      updateSummary();
    });

    fields.service.addEventListener("change", () => {
      const val = fields.service.value;
      if (val && SERVICE_GUIDANCE[val]) {
        fields.guidance.textContent = SERVICE_GUIDANCE[val];
        fields.guidance.hidden = false;
      } else {
        fields.guidance.hidden = true;
      }
      validateField("service");
      updateSummary();
    });

    fields.year.addEventListener("change", () => {
      validateField("year");
      updateSummary();
    });

    [fields.name, fields.engine, fields.condition, fields.budget, fields.timeline].forEach((el) => {
      el.addEventListener("input", () => setTimeout(updateSummary, 800));
      el.addEventListener("change", updateSummary);
    });

    fields.notes.addEventListener("input", () => {
      fields.charCount.textContent = `${fields.notes.value.length} / 1000`;
    });

    function validateField(key) {
      if (key === "vehicle") {
        if (!fields.vehicle.value.trim()) {
          errors.vehicle.textContent = "Please select your vehicle model.";
          fields.vehicle.setAttribute("aria-invalid", "true");
          return false;
        }
        errors.vehicle.textContent = "";
        fields.vehicle.removeAttribute("aria-invalid");
        return true;
      }
      if (key === "customVehicle") {
        const needsCustom = fields.vehicle.value === "Other Volkswagen" || fields.vehicle.value === "Other vehicle";
        if (needsCustom && !fields.customVehicle.value.trim()) {
          errors.customVehicle.textContent = "Please specify your vehicle model.";
          fields.customVehicle.setAttribute("aria-invalid", "true");
          return false;
        }
        errors.customVehicle.textContent = "";
        fields.customVehicle.removeAttribute("aria-invalid");
        return true;
      }
      if (key === "year") {
        if (!fields.year.value.trim()) {
          errors.year.textContent = "Please select your vehicle year.";
          fields.year.setAttribute("aria-invalid", "true");
          return false;
        }
        errors.year.textContent = "";
        fields.year.removeAttribute("aria-invalid");
        return true;
      }
      if (key === "service") {
        if (!fields.service.value.trim()) {
          errors.service.textContent = "Please select a service or build type.";
          fields.service.setAttribute("aria-invalid", "true");
          return false;
        }
        errors.service.textContent = "";
        fields.service.removeAttribute("aria-invalid");
        return true;
      }
      return true;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v1 = validateField("vehicle");
      const v2 = validateField("customVehicle");
      const v3 = validateField("year");
      const v4 = validateField("service");

      if (!(v1 && v2 && v3 && v4)) {
        const firstInvalid = form.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const nameVal = fields.name.value.trim();
      const vehicleVal = getResolvedVehicle();
      const yearVal = fields.year.value.trim();
      const engineVal = fields.engine.value.trim();
      const conditionVal = fields.condition.value.trim();
      const serviceVal = fields.service.value.trim();
      const budgetVal = fields.budget.value.trim();
      const timelineVal = fields.timeline.value.trim();
      const notesVal = fields.notes.value.trim();

      const msgLines = [
        "Hi BVB!",
        "",
        "I'd like to request a quote or discuss a booking with Backyard VW Builds.",
        "",
        "VEHICLE DETAILS"
      ];

      if (nameVal) msgLines.push(`Name: ${nameVal}`);
      msgLines.push(`Vehicle: ${vehicleVal}`);
      msgLines.push(`Year: ${yearVal}`);
      if (engineVal) msgLines.push(`Engine/Variant: ${engineVal}`);
      if (conditionVal) msgLines.push(`Condition: ${conditionVal}`);

      msgLines.push("", "PROJECT DETAILS");
      msgLines.push(`Service/Build: ${serviceVal}`);
      if (budgetVal) msgLines.push(`Estimated Budget: ${budgetVal}`);
      if (timelineVal) msgLines.push(`Preferred Timeline: ${timelineVal}`);

      if (notesVal) {
        msgLines.push("", "ADDITIONAL INFORMATION", notesVal);
      }

      msgLines.push(
        "",
        "Could you assist me with suitable options, an estimated quote and availability?",
        "",
        "Thank you."
      );

      const url = getWhatsAppUrl(msgLines.join("\n"));
      return;
    });

    updateSummary();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppLinks();
    document.querySelectorAll("[data-inactive-link]").forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
      link.addEventListener("auxclick", (event) => event.preventDefault());
    });
    initNavigation();
    initCurrentYear();
    initAccordion();
    initQuickQuoteForm();
    initBuildConfigurator();
  });
})();

// Stock images prefer locally supplied files when a local asset manifest is added.
document.querySelectorAll('img[data-stock]').forEach(function(img) {
  function fallback() { if (img.dataset.fallback) return; img.dataset.fallback='1'; img.src='/assets/image/bvb-logo.webp'; img.style.objectFit='contain'; img.style.padding='12px'; }
  img.addEventListener('error', fallback);
  if(img.complete && img.naturalWidth===0) fallback();
});
