/**
 * Módulo de Modo Oscuro - Con protección anti-múltiple-init
 */
const ThemeModule = (() => {
  const STORAGE_KEY = "martin-theme";
  let isInitialized = false;

  const getTheme = () => localStorage.getItem(STORAGE_KEY) || "light";

  const applyTheme = (theme) => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(
      theme === "dark" ? "theme-dark" : "theme-light",
    );

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      const icon = toggle.querySelector("i");
      if (icon)
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    localStorage.setItem(STORAGE_KEY, theme);
    console.log(`🎨 Tema aplicado: ${theme}`);
  };

  const toggle = () => {
    const current = getTheme();
    applyTheme(current === "dark" ? "light" : "dark");
  };

  const init = () => {
    console.log("🌙 Inicializando ThemeModule...");
    applyTheme(getTheme());
  };

  // ⭐ Delegación de eventos global (SOLO UNA VEZ)
  if (!isInitialized) {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#theme-toggle")) {
        e.preventDefault();
        toggle();
      }
    });
    isInitialized = true;
  }

  return { init };
})();
