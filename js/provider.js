document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("id");

  if (!providerId) {
    alert("Proveedor no encontrado");
    return;
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {

      const provider = data.providers.find(p => p.id === providerId);
      const services = data.services.filter(s => s.provider_id === providerId);

      if (!provider) {
        alert("Proveedor no existe");
        return;
      }

      document.getElementById("providerLogo").src = provider.logo;
      document.getElementById("providerName").textContent =
        provider.nombre_comercial;

      document.getElementById("providerInfo").innerHTML = `
        <p><strong>Estilista:</strong> ${provider.estilista}</p>
        <p><strong>Provincia:</strong> ${provider.provincia}</p>
        <p><strong>Contacto:</strong> ${provider.contacto}</p>
      `;

      const jobsGrid = document.getElementById("jobsGrid");
      jobsGrid.innerHTML = "";
      provider.trabajos.forEach(img => {
        const i = document.createElement("img");
        i.src = img;
        jobsGrid.appendChild(i);
      });

      const table = document.getElementById("servicesTable");
      table.innerHTML = "";

      services.forEach(service => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${service.imagen}" class="service-img"></td>
          <td>${service.nombre}</td>
          <td>₡${service.precio.toLocaleString()}</td>
          <td>${service.duracion_min} min</td>
          <td>
            <button class="btn reservar-btn"
              data-service="${service.nombre}">
              Reservar
            </button>
          </td>
        `;

        table.appendChild(row);
      });

      document.querySelectorAll(".reservar-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          const service = e.target.dataset.service;
          window.location.href =
            `reserve.html?service=${encodeURIComponent(service)}`;
        });
      });

    });
});

