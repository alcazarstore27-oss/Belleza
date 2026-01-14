# Plataforma de Belleza

Plataforma web para la gestión y visualización de servicios de belleza.  
Permite a los clientes conocer proveedores, ver sus trabajos, consultar servicios y gestionar citas de forma clara y visual.

El proyecto está diseñado para ser escalable, iniciando como una aplicación web estática y evolucionando fácilmente hacia un sistema con backend.

---

## Funcionalidades principales

### Para clientes
- Visualización de proveedores de belleza
- Consulta de servicios disponibles y precios
- Visualización de trabajos realizados por cada proveedor
- Información clara sobre atención en local o a domicilio
- Gestión de citas (agendar, cancelar, estado)

### Para proveedores
- Perfil con identidad visual (logo y fotos)
- Gestión de servicios y precios
- Visualización y control de citas
- Control de disponibilidad (local / domicilio)
- Historial de trabajos realizados

---

## Estructura del proyecto

```text
belleza/
├── index.html          # Pantalla principal
├── data.json           # Fuente de datos
├── README.md           # Documentación del proyecto
│
├── css/
│   └── styles.css      # Estilos generales
│
├── js/
│   └── app.js          # Lógica de la aplicación
│
├── img/
│   ├── providers/
│   │   ├── prov001/
│   │   │   ├── logo.png
│   │   │   ├── estilista.jpg
│   │   │   └── trabajos/
│   │   │       ├── trabajo1.jpg
│   │   │       └── trabajo2.jpg
│   │   ├── prov002/
│   │   └── prov003/
│   │
│   ├── services/
│   │   └── providers/
│   │       ├── prov001/
│   │       ├── prov002/
│   │       └── prov003/
│   │
│   └── dev/
│       └── alcazarplay-logo.png
