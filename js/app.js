// ===============================
// app.js – Guapixim@
// ===============================

// URL del archivo de datos
const DATA_URL = "data.json";

// Contenedor donde se pintan los proveedores
const providersContainer = document.getElementById("providers-container");

// -------------------------------
// Cargar datos iniciales
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadProviders();
});

// -------------------------------
// Función: Cargar proveedores
// -------------------------------
async function loadProviders() {
  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    renderProviders(data.providers);
  } catch (error) {
    console.error("Error cargando proveedores:", error);
  }
}

// -------------------------------
// Función: Renderizar proveedores
// -------------------------------
function renderProviders(providers) {
  providersContainer.innerHTML = "";

  providers.forEach((provider) => {
    const providerCard = document.createElement("div");
    providerCard.classList.add("provider-card");

    providerCard.innerHTML = `
      <div class="provider-card-content" data-id="${provider.id}">
        <img 
          src="${provider.logo}" 
          alt="Logo ${provider.nombre_comercial}" 
          class="provider-logo"
        />

        <h3 class="provider-name">${provider.nombre_comercial}</h3>
        <p class="provider-stylist">${provider.estilista}</p>
        <p class="provider-province">${provider.provincia}</p>

        <p class="provider-attention">
          ${getAttentionType(provider)}
        </p>

        <button class="provider-button" data-id="${provider.id}">
          Ver perfil
        </button>
      </div>
    `;

    providersContainer.appendChild(providerCard);
  });

  attachProviderEvents();
}

// -------------------------------
// Tipo de atención
// -------------------------------
function getAttentionType(provider) {
  if (provider.atiende_local && provider.atiende_domicilio) {
    return "Atención: Local y Domicilio";
  }
  if (provider.atiende_local) {
    return "Atención: Solo en local";
  }
  if (provider.atiende_domicilio) {
    return "Atención: Solo a domicilio";
  }
  return "Atención no especificada";
}

// -------------------------------
// Eventos para entrar al proveedor
// -------------------------------
function attachProviderEvents() {
  const providerButtons = document.querySelectorAll(".provider-button");
  const providerCards = document.querySelectorAll(".provider-card-content");

  // Click en botón "Ver perfil"
  providerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const providerId = e.target.dataset.id;
      goToProvider(providerId);
    });
  });

  // Click en toda la tarjeta (logo o info)
  providerCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Evita doble disparo si se presiona el botón
      if (e.target.tagName.toLowerCase() === "button") return;

      const providerId = card.dataset.id;
      goToProvider(providerId);
    });
  });
}

// -------------------------------
// Navegar a provider.html
// -------------------------------
function goToProvider(providerId) {
  // Guardamos el proveedor seleccionado
  localStorage.setItem("selectedProvider", providerId);

  // Redirigimos al perfil del proveedor
  window.location.href = "provider.html";
}
