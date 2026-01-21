document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("providersGrid");
  const searchInput = document.getElementById("searchInput");

  let providers = [];
  let services = [];

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      providers = data.providers;
      services = data.services;
      renderProviders(providers);
    })
    .catch(err => {
      console.error("Error cargando data.json:", err);
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
        <img src="${provider.logo}" alt="${provider.nombre_comercial}">
        <h4>${provider.nombre_comercial}</h4>
        <p>${provider.provincia}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = `provider.html?id=${provider.id}`;
      });

      grid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase().trim();

    if (term === "") {
      renderProviders(providers);
      return;
    }

    const filtered = providers.filter(provider => {
      const matchProvider =
        provider.nombre_comercial.toLowerCase().includes(term) ||
        provider.provincia.toLowerCase().includes(term);

      const matchService = services.some(service =>
        service.provider_id === provider.id &&
        service.nombre.toLowerCase().includes(term)
      );

      return matchProvider || matchService;
    });

    renderProviders(filtered);
  });
});
