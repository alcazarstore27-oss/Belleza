// ===============================
// app.js — Login Cliente
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const input = document.getElementById("login-input");

  if (!form || !input) return;

  // Si el cliente ya existe, pasar directo
  const savedClient = localStorage.getItem("guapixima_client");
  if (savedClient) {
    window.location.href = "provider.html?id=prov001";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (value === "") {
      alert("Por favor ingresa tu correo o número de teléfono");
      return;
    }

    // Guardar cliente (demo realista)
    const clientData = {
      contacto: value,
      fecha_login: new Date().toISOString()
    };

    localStorage.setItem("guapixima_client", JSON.stringify(clientData));

    // Redirigir (por ahora a un proveedor de prueba)
    window.location.href = "provider.html?id=prov001";
  });
});

