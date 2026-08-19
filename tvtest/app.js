const focusName = document.querySelector("#focusName");
const lastKey = document.querySelector("#lastKey");
const keyLog = document.querySelector("#keyLog");
const modal = document.querySelector("#modal");
const textScaleValue = document.querySelector("#textScaleValue");
const textScaleMeter = document.querySelector("#textScaleMeter");

let currentFocus = null;
let returnFocus = null;

const focusables = () =>
  Array.from(document.querySelectorAll(".focusable")).filter((element) => {
    if (element.disabled) return false;
    if (element.offsetParent === null && !element.closest(".modal:not([hidden])")) return false;
    if (modal.hidden && element.closest(".modal")) return false;
    return true;
  });

function labelFor(element) {
  return element?.dataset.label || element?.textContent?.trim() || "Unknown";
}

function logKey(event) {
  lastKey.textContent = `Last key: ${event.key} · code: ${event.code || "none"}`;
  const item = document.createElement("li");
  item.textContent = `${new Date().toLocaleTimeString()} · key=${event.key} · code=${event.code || "none"}`;
  keyLog.appendChild(item);
  while (keyLog.children.length > 10) keyLog.removeChild(keyLog.firstElementChild);
}

function setFocus(element) {
  if (!element) return;
  currentFocus?.classList.remove("tv-focus");
  currentFocus = element;
  currentFocus.classList.add("tv-focus");
  currentFocus.focus({ preventScroll: true });
  focusName.textContent = labelFor(currentFocus);
}

function focusFirst(selector = ".focusable") {
  const candidate = focusables().find((element) => element.matches(selector)) || focusables()[0];
  setFocus(candidate);
}

function centerOf(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    rect,
  };
}

function moveFocus(direction) {
  if (!currentFocus) return focusFirst();

  if (currentFocus.classList.contains("stepper") && (direction === "left" || direction === "right")) {
    adjustStepper(direction === "right" ? 1 : -1);
    return;
  }

  const origin = centerOf(currentFocus);
  const candidates = focusables()
    .filter((element) => element !== currentFocus)
    .map((element) => {
      const target = centerOf(element);
      const dx = target.x - origin.x;
      const dy = target.y - origin.y;
      const primary =
        direction === "right" ? dx :
        direction === "left" ? -dx :
        direction === "down" ? dy :
        -dy;
      const secondary = direction === "right" || direction === "left" ? Math.abs(dy) : Math.abs(dx);
      const distance = Math.hypot(dx, dy);
      return { element, primary, secondary, distance };
    })
    .filter((candidate) => candidate.primary > 8)
    .sort((a, b) => a.secondary - b.secondary || a.distance - b.distance);

  setFocus(candidates[0]?.element || currentFocus);
}

function setActiveSection(button) {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  focusName.textContent = `${labelFor(button)} selected`;
}

function toggleButton(button) {
  const pressed = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!pressed));
  focusName.textContent = `${labelFor(button)} ${pressed ? "off" : "on"}`;
}

function adjustStepper(delta) {
  const stepper = currentFocus?.classList.contains("stepper") ? currentFocus : document.querySelector(".stepper");
  const min = Number(stepper.getAttribute("aria-valuemin"));
  const max = Number(stepper.getAttribute("aria-valuemax"));
  const next = Math.max(min, Math.min(max, Number(stepper.dataset.value) + delta));
  stepper.dataset.value = String(next);
  stepper.setAttribute("aria-valuenow", String(next));
  textScaleValue.textContent = `${next} / ${max}`;
  textScaleMeter.style.width = `${(next / max) * 100}%`;
  document.documentElement.style.setProperty("--tv-scale", String(next));
  focusName.textContent = `Text size ${next} of ${max}`;
}

function openModal() {
  returnFocus = currentFocus;
  modal.hidden = false;
  focusFirst(".modal .focusable");
}

function closeModal() {
  modal.hidden = true;
  setFocus(returnFocus || document.querySelector("[data-action='modal']"));
}

function activate(element) {
  const action = element?.dataset.action;
  if (!action) return;

  if (element.classList.contains("nav-item")) setActiveSection(element);
  if (action === "toggle") toggleButton(element);
  if (action === "modal") openModal();
  if (action === "close-modal") closeModal();
  if (action === "clear-log") keyLog.replaceChildren();
  if (action === "select-card") focusName.textContent = `${labelFor(element)} activated`;
}

document.addEventListener("keydown", (event) => {
  logKey(event);

  const key = event.key;
  const code = event.code;
  const isEnter = key === "Enter" || key === " " || code === "NumpadEnter";
  const isBack = key === "Escape" || key === "Backspace" || key === "BrowserBack" || code === "BrowserBack";

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
    event.preventDefault();
    moveFocus(key.replace("Arrow", "").toLowerCase());
    return;
  }

  if (isEnter) {
    event.preventDefault();
    activate(currentFocus || document.activeElement);
    return;
  }

  if (isBack && !modal.hidden) {
    event.preventDefault();
    closeModal();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target.closest(".focusable");
  if (!target) return;
  setFocus(target);
  activate(target);
});

window.addEventListener("load", () => {
  adjustStepper(0);
  focusFirst(".nav-item");
});
