const params = new URLSearchParams(window.location.search);
const serviceId = params.get("service");

if (!serviceId) {
  alert("Servicio no encontrado");
  window.location.href = "home.html";
}

// =======================
// CARGAR DATA PARA OBTENER PROVIDER
// =======================
fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const service = data.services.find(s => s.id === serviceId);

    if (!service) {
      alert("Servicio inválido");
      window.location.href = "home.html";
      return;
    }

    // Link volver
    document.getElementById("backLink").href =
      `provider.html?id=${service.provider_id}`;

    window.currentService = service;
  });


// =======================
// CONFIRMAR RESERVA
// =======================
function confirmReservation() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!date || !time) {
    alert("Selecciona fecha y hora");
    return;
  }

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  reservas.push({
    provider_id: window.currentService.provider_id,
    service_id: window.currentService.id,
    servicio: window.currentService.nombre,
    fecha: date,
    hora: time
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert("Reserva realizada");

  // 🔥 VOLVER BIEN AL PROVEEDOR
  window.location.href =
    `provider.html?id=${window.currentService.provider_id}`;
}
