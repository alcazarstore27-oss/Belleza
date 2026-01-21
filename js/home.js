document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("providersGrid");
  const searchInput = document.getElementById("searchInput");
  const filterAtencion = document.getElementById("filterAtencion");

  let providers = [];
  let services = [];

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      providers = data.providers;
      services = data.services;
      renderProviders(providers);
    });

  function renderProviders(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = "<p>No se encontraron resultados</p>";
      return;
    }

    list.forEach(provider => {
      const card = document.createElement("div");
      card.className = "provider-card";

      card.innerHTML = `
        <img src="${provider.logo}">
        <h4>${provider.nombre_comercial}</h4>
        <p>${provider.provincia}</p>
      `;

      card.onclick = () => {
        window.location.href = `provider.html?id=${provider.id}`;
      };

      grid.appendChild(card);
    });
  }

  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const atencion = filterAtencion.value;

    const filtered = providers.filter(provider => {
      const matchText =
        provider.nombre_comercial.toLowerCase().includes(term) ||
        provider.provincia.toLowerCase().includes(term) ||
        services.some(
          s =>
            s.provider_id === provider.id &&
            s.nombre.toLowerCase().includes(term)
        );

      let matchAtencion = true;

      if (atencion === "local") {
        matchAtencion = provider.atiende_local;
      }
      if (atencion === "domicilio") {
        matchAtencion = provider.atiende_domicilio;
      }
      if (atencion === "ambos") {
        matchAtencion =
          provider.atiende_local && provider.atiende_domicilio;
      }

      return matchText && matchAtencion;
    });

    renderProviders(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  filterAtencion.addEventListener("change", applyFilters);
});
