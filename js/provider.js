// ===============================
// provider.js
// ===============================

// Obtener ID del proveedor desde la URL
const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

// Si no hay proveedor, volver al inicio
if (!providerId) {
  window.location.href = "index.html";
}

// Cargar datos
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const provider = data.providers.find(p => p.id === providerId);
    const services = data.services.filter(s => s.provider_id === providerId);

    if (!provider) {
      alert("Proveedor no encontrado");
      window.location.href = "index.html";
      return;
    }

    renderProviderInfo(provider);
    renderWorks(provider.trabajos);
    renderServices(services);
  })
  .catch(error => {
    console.error("Error cargando datos:", error);
  });


// ===============================
// Render info del proveedor
// ===============================
function renderProviderInfo(provider) {
  document.getElementById("provider-logo").src = provider.logo;
  document.getElementById("provider-name").textContent = provider.nombre_comercial;
  document.getElementById("provider-stylist").textContent = `Estilista: ${provider.estilista}`;
  document.getElementById("provider-province").textContent = `Provincia: ${provider.provincia}`;

  let attention = "Atención: ";
  if (provider.atiende_local && provider.atiende_domicilio) {
    attention += "Local y domicilio";
  } else if (provider.atiende_local) {
    attention += "Solo local";
  } else {
    attention += "Solo domicilio";
  }
  document.getElementById("provider-attention").textContent = attention;

  document.getElementById("provider-contact").textContent =
    `Contacto: ${provider.contacto || "No disponible"}`;
}


// ===============================
// Render trabajos realizados
// ===============================
function renderWorks(trabajos) {
  const container = document.getElementById("works-container");
  container.innerHTML = "";

  trabajos.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.className = "work-image";
    container.appendChild(image);
  });
}


// ===============================
// Render servicios
// ===============================
function renderServices(services) {
  const tableBody = document.getElementById("services-table-body");
  tableBody.innerHTML = "";

  if (services.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">No hay servicios disponibles</td>
      </tr>
    `;
    return;
  }

  services.forEach(service => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img src="${service.imagen}" class="service-image" alt="${service.nombre}">
      </td>
      <td>${service.nombre}</td>
      <td>₡${service.precio}</td>
      <td>${service.duracion_min} min</td>
      <td>
        <button class="reserve-btn" onclick="reserveService('${service.id}')">
          Reservar
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// ===============================
// Acción reservar (placeholder)
// ===============================
function reserveService(serviceId) {
  alert("Reserva seleccionada: " + serviceId);
  // Aquí luego entra el calendario
}
