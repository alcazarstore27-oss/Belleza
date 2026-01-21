const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const provider = data.providers.find(p => p.id === providerId);
    if (!provider) return;

    // Info básica
    document.getElementById("provider-name").textContent = provider.name;
    document.getElementById("provider-stylist").textContent = provider.stylist;
    document.getElementById("provider-province").textContent = provider.province;
    document.getElementById("provider-attention").textContent = provider.attention;
    document.getElementById("provider-phone").textContent = provider.phone;
    document.getElementById("provider-logo").src = provider.logo;

    // Trabajos
    const worksContainer = document.getElementById("works");
    provider.works.forEach(img => {
      worksContainer.innerHTML += `
        <img src="${img}" class="work-img">
      `;
    });

    // Servicios
    const servicesContainer = document.getElementById("services");
    provider.services.forEach(service => {
      servicesContainer.innerHTML += `
        <tr>
          <td><img src="${service.image}" width="60"></td>
          <td>${service.name}</td>
          <td>${service.price}</td>
          <td>${service.time}</td>
          <td>
            <button class="btn" onclick="reserveService('${service.name}')">
              Reservar
            </button>
          </td>
        </tr>
      `;
    });
  });

// ======================
// RESERVAR SERVICIO
// ======================
function reserveService(serviceName) {
  window.location.href =
    `reserve.html?provider=${providerId}&service=${encodeURIComponent(serviceName)}`;
}

// ======================
// CITAS
// ======================
function toggleAppointments() {
  const box = document.getElementById("appointments");
  box.style.display = box.style.display === "none" ? "block" : "none";
  renderAppointments();
}

function renderAppointments() {
  const box = document.getElementById("appointments");
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  const providerReservations = reservations.filter(
    r => r.providerId === providerId
  );

  if (providerReservations.length === 0) {
    box.innerHTML = "<p>No hay citas registradas</p>";
    return;
  }

  box.innerHTML = `
    <h3>Citas del proveedor</h3>
    ${providerReservations.map(r => `
      <div class="appointment">
        <strong>${r.service}</strong><br>
        📅 ${r.date} ⏰ ${r.time}<br>
        Estado: ${r.status}
        <br>
        <button class="btn" onclick="deleteAppointment(${r.id})">
          Eliminar
        </button>
      </div>
    `).join("")}
  `;
}

function deleteAppointment(id) {
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations = reservations.filter(r => r.id !== id);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  renderAppointments();
}

