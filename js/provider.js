document.addEventListener("DOMContentLoaded", () => {

  console.log("provider.js cargado ✔");

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

      /* HEADER */
      document.getElementById("providerLogo").src = provider.logo;
      document.getElementById("providerName").textContent = provider.nombre_comercial;

      /* INFO */
      document.getElementById("providerInfo").innerHTML = `
        <p><strong>Estilista:</strong> ${provider.estilista}</p>
        <p><strong>Provincia:</strong> ${provider.provincia}</p>
        <p><strong>Atención:</strong>
          ${provider.atiende_local ? "Local" : ""}
          ${provider.atiende_domicilio ? " y Domicilio" : ""}
        </p>
        <p><strong>Contacto:</strong> ${provider.contacto}</p>
      `;

      /* TRABAJOS */
      const jobsGrid = document.getElementById("jobsGrid");
      jobsGrid.innerHTML = "";

      provider.trabajos.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        jobsGrid.appendChild(image);
      });

      /* SERVICIOS */
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
            <button 
              class="btn reservar-btn"
              data-service='${JSON.stringify(service)}'>
              Reservar
            </button>
          </td>
        `;

        table.appendChild(row);
      });

      /* 🔥 EVENTO GLOBAL (INFALIBLE) */
      table.addEventListener("click", (e) => {
        if (e.target.classList.contains("reservar-btn")) {

          const service = JSON.parse(e.target.dataset.service);

          alert("Reserva seleccionada: " + service.nombre);

          localStorage.setItem("guapixim_reserva", JSON.stringify({
            provider_id: provider.id,
            provider_name: provider.nombre_comercial,
            service_id: service.id,
            service_name: service.nombre,
            precio: service.precio,
            duracion: service.duracion_min
          }));

          window.location.href = "reserve.html";
        }
      });

    })
    .catch(err => {
      console.error(err);
      alert("Error cargando datos");
    });

});

