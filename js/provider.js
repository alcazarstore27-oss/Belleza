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

      /* =========================
         HEADER
      ========================== */
      const logo = document.getElementById("providerLogo");
      logo.src = provider.logo;
      logo.alt = provider.nombre_comercial;

      document.getElementById("providerName").textContent =
        provider.nombre_comercial;

      /* =========================
         INFO
      ========================== */
      document.getElementById("providerInfo").innerHTML = `
        <p><strong>Estilista:</strong> ${provider.estilista}</p>
        <p><strong>Provincia:</strong> ${provider.provincia}</p>
        <p><strong>Atención:</strong>
          ${provider.atiende_local ? "Local" : ""}
          ${provider.atiende_domicilio ? " / Domicilio" : ""}
        </p>
        <p><strong>Contacto:</strong> ${provider.contacto}</p>
      `;

      /* =========================
         TRABAJOS
      ========================== */
      const jobsGrid = document.getElementById("jobsGrid");
      jobsGrid.innerHTML = "";

      provider.trabajos.forEach(imgPath => {
        const img = document.createElement("img");
        img.src = imgPath;
        img.alt = "Trabajo realizado";
        jobsGrid.appendChild(img);
      });

      /* =========================
         SERVICIOS
      ========================== */
      const table = document.getElementById("servicesTable");
      table.innerHTML = "";

      services.forEach(service => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>
            <img src="${service.imagen}" class="service-img" alt="${service.nombre}">
          </td>
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

      /* =========================
         EVENTO RESERVAR (FIX 404)
      ========================== */
      document.querySelectorAll(".reservar-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          const servicio = e.target.dataset.service;

          alert(`Reserva seleccionada: ${servicio}`);

          // 👇 RUTA CORRECTA PARA GITHUB PAGES (Belleza/)
          window.location.href = "./reserve.html";
        });
      });

    })
    .catch(err => {
      console.error("Error cargando proveedor:", err);
      alert("Error cargando información del proveedor");
    });

});
