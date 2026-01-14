// ===============================
// CARGA DE DATA.JSON
// ===============================
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    console.log("Data cargada correctamente:", data);

    // Renderizar proveedores
    renderProviders(data.providers);

    // Renderizar servicios del primer proveedor (prueba inicial)
    if (data.providers.length > 0) {
      renderServices(data.providers[0].id, data.services);
    }
  })
  .catch(error => {
    console.error("Error cargando data.json:", error);
  });


// ===============================
// RENDER PROVEEDORES
// ===============================
function renderProviders(providers) {
  const container = document.getElementById("providers-container");
  container.innerHTML = "";

  providers.forEach(provider => {
    const card = document.createElement("div");
    card.className = "provider-card";

    card.innerHTML = `
      <img src="${provider.logo}" alt="${provider.nombre_comercial}">
      <h3>${provider.nombre_comercial}</h3>
      <p>${provider.estilista}</p>
      <p>${provider.provincia}</p>
      <button data-id="${provider.id}">Ver servicios</button>
    `;

    // Click para ver servicios del proveedor
    card.querySelector("button").addEventListener("click", () => {
      renderServices(provider.id, window.appServices);
    });

    container.appendChild(card);
  });

  // Guardamos servicios globalmente
  window.appServices = providers.length ? null : null;
}


// ===============================
// RENDER SERVICIOS POR PROVEEDOR
// ===============================
function renderServices(providerId, services) {
  const container = document.getElementById("services-container");

  if (!container) {
    console.error("No existe el contenedor de servicios");
    return;
  }

  container.innerHTML = "";

  const providerServices = services.filter(
    service => service.provider_id === providerId
  );

  if (providerServices.length === 0) {
    container.innerHTML = "<p>No hay servicios disponibles para este proveedor.</p>";
    return;
  }

  providerServices.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <img src="${service.imagen}" alt="${service.nombre}">
      <h3>${service.nombre}</h3>
      <p>${service.descripcion}</p>
      <p>⏱ ${service.duracion_min} min</p>
      <p>💰 ₡${service.precio}</p>
      <button>Reservar</button>
    `;

    container.appendChild(card);
  });
}
