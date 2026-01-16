document.addEventListener("DOMContentLoaded", () => {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("providers-container");
      container.innerHTML = "";

      data.providers.forEach(provider => {

        const card = document.createElement("div");
        card.style.background = "#fff";
        card.style.borderRadius = "10px";
        card.style.padding = "15px";
        card.style.textAlign = "center";
        card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
        card.style.cursor = "pointer";

        card.innerHTML = `
          <img 
            src="${provider.logo}" 
            alt="${provider.nombre_comercial}"
            style="width:100%; max-height:140px; object-fit:contain; margin-bottom:10px;"
          >

          <h3 style="margin:10px 0 5px;">${provider.nombre_comercial}</h3>

          <p style="font-size:14px; margin:4px 0;">
            <strong>${provider.estilista}</strong>
          </p>

          <p style="font-size:13px; color:#666;">
            ${provider.provincia}
          </p>

          <button style="
            margin-top:10px;
            padding:10px;
            width:100%;
            border:none;
            border-radius:6px;
            background:#6c63ff;
            color:white;
            cursor:pointer;
          ">
            Ver perfil
          </button>
        `;

        card.addEventListener("click", () => {
          window.location.href = `provider.html?id=${provider.id}`;
        });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error cargando proveedores:", error);
    });

});
