// ============================
// LOGIN CLIENTE
// ============================

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      const input = document.getElementById("clientInput").value.trim();

      if (input === "") {
        alert("Por favor ingresa tu correo o número de teléfono");
        return;
      }

      // Guardar cliente (simulación real)
      localStorage.setItem("guapixim_cliente", input);

      // Redirigir a pantalla 2
      window.location.href = "home.html";
    });
  }

});
