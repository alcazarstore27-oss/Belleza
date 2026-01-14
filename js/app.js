document.addEventListener("DOMContentLoaded", () => {
  cargarProveedores();
});

function cargarProveedores() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      mostrarProveedores(data.providers);
    })
    .catch(error => {
      console.error("Error cargando data.json:", error);
    });
}

function mostrarProveedores(providers) {
  const container = document.getElementById("providers-container");
  container.innerHTML = "";

  providers.forEach(provider => {
    const card = document.createElement("div");
    card.className = "provider-card";

    card.innerHTML = `
      <a href="provider.html?id=${provider.id}" style="text-decoration:none;color:inherit;">
        <img src="${provider.logo}" alt="${provider.nombre_comercial}" class="logo">
        <h3>${provider.nombre_comercial}</h3>
        <p><strong>Estilista:</strong> ${provider.estilista}</p>
        <p><strong>Provincia:</strong> ${provider.provincia}</p>
        <p>
          ${provider.atiende_local ? "🏠 Atención en local" : ""}
          ${provider.atiende_domicilio ? "🚗 Domicilio" : ""}
        </p>
      </a>
    `;

    container.appendChild(card);
  });
}

