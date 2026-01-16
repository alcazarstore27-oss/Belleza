const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const provider = data.providers.find(p => p.id === providerId);
    const services = data.services.filter(s => s.provider_id === providerId);

    // INFO DEL PROVEEDOR
    document.getElementById("provider-container").innerHTML = `
      <img src="${provider.logo}" style="max-width:180px;display:block;margin:auto;">
      <h1>${provider.nombre_comercial}</h1>
      <p><strong>Estilista:</strong> ${provider.estilista}</p>
      <p><strong>Provincia:</strong> ${provider.provincia}</p>
      <p><strong>Atención:</strong> ${provider.atiende_local ? "Local" : ""} ${provider.atiende_domicilio ? " y domicilio" : ""}</p>
      <p><strong>Contacto:</strong> ${provider.contacto}</p>
    `;

    // TRABAJOS
    document.getElementById("jobs-container").innerHTML =
      provider.trabajos.map(img => `<img src="${img}" class="job-img">`).join("");

    // SERVICIOS
    document.getElementById("services-container").innerHTML =
      services.map(s => `
        <tr>
          <td><img src="${s.imagen}" class="service-img"></td>
          <td>${s.nombre}</td>
          <td>₡${s.precio}</td>
          <td>${s.duracion_min} min</td>
          <td><button>Reservar</button></td>
        </tr>
      `).join("");
  });

