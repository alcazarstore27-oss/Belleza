document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // OBTENER ID DEL PROVEEDOR
  // =========================
  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("id");

  if (!providerId) {
    alert("Proveedor no encontrado");
    window.location.href = "home.html";
    return;
  }

  // =========================
  // CARGAR DATA.JSON
  // =========================
  fetch("data.json")
    .then(res => res.json())
    .then(data => {

      const provider = data.providers.find(p => p.id === providerId);
      const services = data.services.filter(s => s.provider_id === providerId);

      if (!provider) {
        alert("Proveedor no existe");
        window.location.href = "home.html";
        return;
      }

      // =========================
      // HEADER
      // =========================
      document.getElementById("provider-logo").src = provider.logo;
      document.getElementById("provider-name").textContent = provider.nombre_comercial;

      // =========================
      // INFO
      // =========================
      document.getElementById("provider-stylist").textContent = provider.estilista;
      document.getElementById("provider-province").textContent = provider.provincia;

      let attention = [];
      if (provider.atiende_local) attention.push("Local");
      if (provider.atiende_domicilio) attention.push("Domicilio");
      document.getElementById("provider-attention").textContent = attention.join(" y ");

      document.getElementById("provider-phone").textContent = provider.contacto;

      // =========================
      // TRABAJOS REALIZADOS
      // =========================
      const worksContainer = document.getElementById("works");
      worksContainer.innerHTML = "";

      provider.trabajos.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        image.className = "work-img";
        worksContainer.appendChild(image);
      });

      // =========================
      // SERVICIOS
      // =========================
      const servicesTable = document.getElementById("services");
      servicesTable.innerHTML = "";

      services.forEach(service => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${service.imagen}" class="service-img"></td>
          <td>${service.nombre}</td>
          <td>₡${service.precio.toLocaleString()}</td>
          <td>${service.duracion_min} min</td>
          <td>
            <button class="btn" onclick="goToReserve('${service.id}')">
              Reservar
            </button>
          </td>
        `;

        servicesTable.appendChild(row);
      });

      // =========================
      // CARGAR CITAS GUARDADAS
      // =========================
      loadAppointments(providerId);

    })
    .catch(err => {
      console.error("Error cargando data.json", err);
    });
});

// =========================
// IR A RESERVA
// =========================
function goToReserve(serviceId) {
  window.location.href = `reserve.html?service=${serviceId}`;
}

// =========================
// MOSTRAR / OCULTAR CITAS
// =========================
function toggleAppointments() {
  const box = document.getElementById("appointments");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// =========================
// CARGAR CITAS DESDE LOCALSTORAGE
// =========================
function loadAppointments(providerId) {
  const box = document.getElementById("appointments");
  box.innerHTML = "<h3>Mis citas</h3>";

  const all = JSON.parse(localStorage.getItem("reservas")) || [];
  const citas = all.filter(r => r.provider_id === providerId);

  if (citas.length === 0) {
    box.innerHTML += "<p>No hay citas registradas.</p>";
    return;
  }

  citas.forEach((cita, index) => {
    const div = document.createElement("div");
    div.className = "appointment";

    div.innerHTML = `
      <p><strong>Servicio:</strong> ${cita.servicio}</p>
      <p><strong>Fecha:</strong> ${cita.fecha}</p>
      <p><strong>Hora:</strong> ${cita.hora}</p>
      <button class="btn" onclick="deleteAppointment(${index}, '${providerId}')">
        Eliminar
      </button>
    `;

    box.appendChild(div);
  });
}

// =========================
// ELIMINAR CITA
// =========================
function deleteAppointment(index, providerId) {
  let all = JSON.parse(localStorage.getItem("reservas")) || [];
  const citasProveedor = all.filter(r => r.provider_id === providerId);

  const cita = citasProveedor[index];
  all = all.filter(r => r !== cita);

  localStorage.setItem("reservas", JSON.stringify(all));
  loadAppointments(providerId);
}

