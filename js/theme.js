/**
 * Módulo de Gestión de Tema (Modo Claro / Oscuro)
 * Usa delegación de eventos para funcionar incluso con HTML dinámico.
 */
const ThemeManager = (() => {
  const getCurrentTheme = () => localStorage.getItem("theme") || "light";

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);

    // Actualizar icono si existe
    const icon = document.querySelector("#theme-toggle i");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    localStorage.setItem("theme", theme);
    console.log("🎨 Tema aplicado:", theme);
  };

  const toggleTheme = () => {
    const current = getCurrentTheme();
    applyTheme(current === "light" ? "dark" : "light");
  };

  const init = () => {
    // Aplicar tema guardado
    applyTheme(getCurrentTheme());

    // DELEGACIÓN DE EVENTOS: Escucha clics en todo el documento
    document.addEventListener("click", (e) => {
      if (e.target.closest("#theme-toggle")) {
        e.preventDefault();
        toggleTheme();
      }
    });

    console.log("✅ ThemeManager inicializado");
  };

  return { init };
})();
