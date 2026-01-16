// ===============================
// OBTENER ID DEL PROVEEDOR
// ===============================
const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

if (!providerId) {
  alert("Proveedor no encontrado");
}

// ===============================
// CARGAR DATA
// ===============================
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const provider = data.providers.find(p => p.id === providerId);
    const services = data.services.filter(s => s.provider_id === providerId);

    if (!provider) {
      alert("Proveedor no existe");
      return;
    }

    renderProvider(provider);
    renderWorks(provider.trabajos);
    renderServices(services);
  })
  .catch(error => console.error("Error cargando datos:", error));


// ===============================
// RENDER INFO PROVEEDOR
// ===============================
function renderProvider(provider) {
  document.getElementById("provider-name").textContent = provider.nombre_comercial;
  document.getElementById("provider-location").textContent = provider.provincia;
  document.getElementById("provider-logo").src = provider.logo;
  document.getElementById("provider-stylist").textContent = provider.estilista;

  let attention = "Atención: ";
  if (provider.atiende_local) attention += "🏠 En local ";
  if (provider.atiende_domicilio) attention += "🚗 A domicilio";

  document.getElementById("provider-attention").textContent = attention;
}


// ===============================
// RENDER TRABAJOS
// ===============================
function renderWorks(trabajos) {
  const container = document.getElementById("works-container");
  container.innerHTML = "";

  trabajos.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.className = "work-img";
    container.appendChild(image);
  });
}


// ===============================
// RENDER SERVICIOS
// ===============================
function renderServices(services) {
  const container = document.getElementById("services-container");
  container.innerHTML = "";

  if (services.length === 0) {
    container.innerHTML = "<p>No hay servicios disponibles.</p>";
    return;
  }

  services.forEach(service => {
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
