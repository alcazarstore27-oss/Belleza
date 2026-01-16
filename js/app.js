document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     LOGIN
  ====================== */
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const input = document.getElementById("clientInput").value.trim();

      if (!input) {
        alert("Ingresa tu correo o teléfono");
        return;
      }

      localStorage.setItem("guapixim_cliente", input);
      window.location.href = "home.html";
    });
  }

});
