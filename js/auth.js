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
      status: "Activo",
    },
    {
      email: "almacen@martin.com",
      password: "Almacen123!",
      role: "Encargado de Almacén",
      name: "Luis Ramírez",
      avatar: "LR",
      color: "#008744",
      status: "Activo",
    },
    {
      email: "vendedor@martin.com",
      password: "Vendedor123!",
      role: "Vendedor",
      name: "María Torres",
      avatar: "MT",
      color: "#3498db",
      status: "Activo",
    },
    {
      email: "gerente@martin.com",
      password: "Gerente123!",
      role: "Gerente General",
      name: "Ana Gutiérrez",
      avatar: "AG",
      color: "#9b59b6",
      status: "Activo",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    showMessage("Verificando credenciales...", "success");

    try {
      // ⭐ Hacemos la petición a nuestra API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage(
          `Bienvenido, ${data.user.nombre}. Redirigiendo...`,
          "success",
        );

        // Guardamos los datos en la sesión
        sessionStorage.setItem("userEmail", data.user.email);
        sessionStorage.setItem("userRole", data.user.rol);
        sessionStorage.setItem("userName", data.user.nombre);
        sessionStorage.setItem("userAvatar", data.user.avatar || "U");
        sessionStorage.setItem("userColor", data.user.color || "#f37021");

        setTimeout(() => {
          App.goToDashboard();
        }, 1000);
      } else {
        showMessage(data.message || "Credenciales incorrectas", "error");
        generateCaptcha();
        captchaInput.value = "";
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showMessage("Error al conectar con el servidor.", "error");
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
