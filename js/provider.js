document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("id");

  if (!providerId) return;

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const provider = data.providers.find(p => p.id === providerId);
      if (provider) {
        renderProvider(provider);
      }
    });
});

function renderProvider(provider) {
  document.getElementById("provider-name").textContent = provider.nombre_comercial;
  document.getElementById("provider-location").textContent = provider.provincia;

  const container = document.getElementById("provider-profile");

  container.innerHTML = `
    <img src="${provider.logo}" class="logo" alt="${provider.nombre_comercial}">
    <h3>${provider.estilista}</h3>
    <p>${provider.descripcion}</p>

    <p>
      ${provider.atiende_local ? "🏠 Atención en local" : ""}
      ${provider.atiende_domicilio ? "🚗 Domicilio" : ""}
    </p>

    <button onclick="alert('Reservar cita (siguiente paso)')">
      Reservar cita
    </button>
  `;
}
