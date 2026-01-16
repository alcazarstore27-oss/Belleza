// ===============================
// CARGA DE DATA.JSON
// ===============================
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    renderProviders(data.providers);
  })
  .catch(error => {
    console.error("Error cargando data.json:", error);
  });


// ===============================
// RENDER PROVEEDORES (HOME)
// ===============================
function renderProviders(providers) {
  const container = document.getElementById("providers-container");
  container.innerHTML = "";

  providers.forEach(provider => {
    const card = document.createElement("div");
    card.className = "provider-card";

    let attention = "";
    if (provider.atiende_local) attention += "🏠 Atención en local ";
    if (provider.atiende_domicilio) attention += "🚗 Domicilio";

    card.innerHTML = `
      <img src="${provider.logo}" alt="${provider.nombre_comercial}">
      <h3>${provider.nombre_comercial}</h3>
      <p>${provider.estilista}</p>
      <p>${provider.provincia}</p>
      <p>${attention}</p>
      <button class="btn-provider">Ver perfil</button>
    `;

    // 🔴 ESTE ES EL CAMBIO CLAVE
    card.querySelector(".btn-provider").addEventListener("click", () => {
      window.location.href = `provider.html?id=${provider.id}`;
    });

    container.appendChild(card);
  });
}

