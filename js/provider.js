document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("id");

  if (!providerId) {
    alert("Proveedor no encontrado");
    return;
  }

  fetch("./data.json")
    .then(res => res.json())
    .then(data => {

      const provider = data.providers.find(p => p.id === providerId);
      const services = data.services.filter(s => s.provider_id === providerId);

      if (!provider) {
        alert("Proveedor no existe");
        return;
      }

      // LOGO
      document.getElementById("providerLogo").src = provider.logo;
      document.getElementById("providerName").textContent = provider.nombre_comercial;

      // INFO + IMAGEN ESTILISTA
      document.getElementById("providerInfo").innerHTML = `
        <img src="${provider.estilista_img}" style="width:120px;border-radius:10px;margin-bottom:10px;">
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
      jobsGrid.innerHTML = "";

      provider.trabajos.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        image.alt = "Trabajo realizado";
        jobsGrid.appendChild(image);
      });

      // SERVICIOS
      const table = document.getElementById("servicesTable");
      table.innerHTML = "";

      services.forEach(service => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${service.imagen}" class="service-img"></td>
          <td>${service.nombre}</td>
          <td>₡${service.precio.toLocaleString()}</td>
          <td>${service.duracion_min} min</td>
          <td><button class="btn">Reservar</button></td>
        `;

        table.appendChild(row);
      });

    })
    .catch(err => {
      console.error("Error cargando data.json:", err);
    });

});

