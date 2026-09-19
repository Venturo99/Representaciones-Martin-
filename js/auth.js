/**
 * Módulo de Autenticación, Validaciones y Roles
 */
const AuthModule = (() => {
  const USERS_DB = [
    {
      email: "superadmin@martin.com",
      password: "Admin123!",
      role: "Super Administrador",
      name: "Carlos Mendoza",
      avatar: "CM",
      color: "#f37021",
    },
    {
      email: "almacen@martin.com",
      password: "Almacen123!",
      role: "Encargado de Almacén",
      name: "Luis Ramírez",
      avatar: "LR",
      color: "#008744",
    },
    {
      email: "vendedor@martin.com",
      password: "Vendedor123!",
      role: "Vendedor",
      name: "María Torres",
      avatar: "MT",
      color: "#3498db",
    },
    {
      email: "gerente@martin.com",
      password: "Gerente123!",
      role: "Gerente General",
      name: "Ana Gutiérrez",
      avatar: "AG",
      color: "#9b59b6",
    },
  ];

  let currentCaptcha = "";

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = result;
    const captchaText = document.getElementById("captcha-text");
    if (captchaText) captchaText.textContent = result;
    console.log("🔐 Captcha generado:", result);
  };

  const showMessage = (msg, type) => {
    const globalMessage = document.getElementById("global-message");
    if (!globalMessage) return;
    globalMessage.textContent = msg;
    globalMessage.className = `global-message ${type}`;
    globalMessage.classList.remove("hidden");
    setTimeout(() => globalMessage.classList.add("hidden"), 4000);
  };

  const clearErrors = () => {
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("🔵 Formulario enviado.");
    clearErrors();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const captchaInput = document.getElementById("captcha-input");

    let isValid = true;

    if (!emailInput.value.trim()) {
      document.getElementById("email-error").textContent =
        "El correo es obligatorio.";
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      document.getElementById("email-error").textContent =
        "Ingrese un correo válido.";
      isValid = false;
    }

    if (!passwordInput.value) {
      document.getElementById("password-error").textContent =
        "La contraseña es obligatoria.";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      document.getElementById("password-error").textContent =
        "Mínimo 6 caracteres.";
      isValid = false;
    }

    if (!captchaInput.value.trim()) {
      document.getElementById("captcha-error").textContent =
        "Ingrese el código.";
      isValid = false;
    } else if (captchaInput.value.toUpperCase() !== currentCaptcha) {
      document.getElementById("captcha-error").textContent =
        "El código es incorrecto.";
      isValid = false;
      generateCaptcha();
      captchaInput.value = "";
    }

    if (!isValid) {
      console.log("❌ Validación fallida.");
      return;
    }

    console.log("✅ Validación exitosa.");

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const user = USERS_DB.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      console.log("✅ Usuario encontrado:", user.name);
      showMessage(`Bienvenido, ${user.name}. Redirigiendo...`, "success");

      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("userAvatar", user.avatar);
      sessionStorage.setItem("userColor", user.color);

      setTimeout(() => {
        console.log("➡️ Cambiando al dashboard...");
        App.goToDashboard();
      }, 1000);
    } else {
      console.log("❌ Credenciales incorrectas.");
      showMessage("Credenciales incorrectas.", "error");
      generateCaptcha();
      captchaInput.value = "";
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const forgotEmail = document.getElementById("forgot-email").value.trim();
    if (!validateEmail(forgotEmail)) {
      document.getElementById("forgot-email-error").textContent =
        "Ingrese un correo válido.";
      return;
    }
    const token = Math.floor(100000 + Math.random() * 900000);
    alert(`[SIMULACIÓN]\n\nToken enviado a: ${forgotEmail}\nToken: ${token}`);
    document.getElementById("forgot-modal").classList.add("hidden");
    document.getElementById("forgot-form").reset();
  };

  const init = () => {
    console.log("🔐 [DEBUG] Inicializando AuthModule...");

    const loginForm = document.getElementById("login-form");
    if (!loginForm) {
      console.error("❌ No se encontró #login-form");
      return;
    }

    generateCaptcha();

    loginForm.addEventListener("submit", handleLogin);

    const refreshBtn = document.getElementById("refresh-captcha");
    if (refreshBtn) refreshBtn.addEventListener("click", generateCaptcha);

    const togglePassword = document.getElementById("toggle-password");
    if (togglePassword) {
      togglePassword.addEventListener("click", () => {
        const pwd = document.getElementById("password");
        const type =
          pwd.getAttribute("type") === "password" ? "text" : "password";
        pwd.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
      });
    }

    const forgotLink = document.getElementById("forgot-password-link");
    if (forgotLink) {
      forgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("forgot-modal").classList.remove("hidden");
      });
    }

    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        document.getElementById("forgot-modal").classList.add("hidden");
      });
    }

    const forgotForm = document.getElementById("forgot-form");
    if (forgotForm) forgotForm.addEventListener("submit", handleForgotPassword);

    console.log("✅ [DEBUG] AuthModule listo.");
  };

  return { init };
})();
