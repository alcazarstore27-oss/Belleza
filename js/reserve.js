function confirmReservation() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!date || !time) {
    alert("Selecciona fecha y hora");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("provider");
  const serviceName = params.get("service");

  const reservation = {
    id: Date.now(),
    providerId,
    service: serviceName,
    date,
    time,
    status: "pendiente"
  };

  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  alert("Reserva confirmada");

  window.location.href = `provider.html?id=${providerId}`;
}
