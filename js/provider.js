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

      // HEADER
      document.getElementById("providerLogo").src = provider.logo;
      document.getElementById("providerName").textContent = provider.nombre_comercial;

      // INFO
      document.getElementById("stylistPhoto").src = provider.foto_estilista;

      document.getElementById("providerInfo").innerHTML = `
        <p><strong>Estilista:</strong> ${provider.estilista}</p>
        <p><strong>Provincia:</strong> ${provider.provincia}</p>
        <p><strong>Atención:</strong>
          ${provider.atiende_local ? "Local" : ""}
          ${provider.atiende_domicilio ? " y Domicilio" : ""}
        </p>
        <p><strong>Contacto:</strong> ${provider.contacto}</p>
      `;

      // TRABAJOS
      const jobsGrid = document.getElementById("jobsGrid");
      provider.trabajos.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        jobsGrid.appendChild(image);
      });

      // SERVICIOS
      const list = document.getElementById("servicesList");

      services.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-card";

        card.innerHTML = `
          <img src="${service.imagen}" class="service-img">
          <div class="service-info">
            <strong>${service.nombre}</strong>
            <span>${service.descripcion}</span><br>
            ₡${service.precio.toLocaleString()} · ${service.duracion_min} min
          </div>
          <button class="btn">Reservar</button>
        `;

        list.appendChild(card);
      });

    })
    .catch(err => console.error(err));

});

