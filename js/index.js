const key = 'DEMO_KEY';
const base_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
let pagina_actual = 1;
let fecha_actual = '2015-07-02';

document.addEventListener('DOMContentLoaded', () => {
  buscar_fotos(fecha_actual, pagina_actual);

  const prevBtn = document.querySelector('.btn .nav-btn:first-child');
  const nextBtn = document.querySelector('.btn .nav-btn:last-child');

  prevBtn.addEventListener('click', () => {
    if (pagina_actual > 1) {
      pagina_actual--;
      buscar_fotos(fecha_actual, pagina_actual);
    }
  });

  nextBtn.addEventListener('click', () => {
    pagina_actual++;
    buscar_fotos(fecha_actual, pagina_actual);
  });
});

function find() {
  const dateInput = document.getElementById('Date').value;
  if (dateInput) {
    fecha_actual = dateInput;
    pagina_actual = 1;
    buscar_fotos(fecha_actual, pagina_actual);
  }
}

function buscar_fotos(fecha, pagina) {
  const url = `${base_url}?earth_date=${fecha}&api_key=${key}&page=${pagina}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const fotos = data.photos.slice(0, 25); 
      actualizar_tabla(fotos);
      if (fotos.length > 0) {
        actualizar_foto(fotos[0]);
      }
    })
    
}

function actualizar_tabla(fotos) {
  const tabla = document.getElementById('lista-fotos');
  tabla.innerHTML = ''; 

  fotos.forEach(foto => {
    const fila = document.createElement('tr');

    const id = document.createElement('td');
    id.textContent = foto.id;
    fila.appendChild(id);

    const rover = document.createElement('td');
    rover.textContent = foto.rover.name;
    fila.appendChild(rover);

    const camera = document.createElement('td');
    camera.textContent = foto.camera.name;
    fila.appendChild(camera);

    const details = document.createElement('td');
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'More';
    detailsButton.classList.add('more');
    detailsButton.addEventListener('click', () => actualizar_foto(foto));
    details.appendChild(detailsButton);
    fila.appendChild(details);

    tabla.appendChild(fila);
  });
}

function actualizar_foto(foto) {
  document.querySelector('img').src = foto.img_src;
  document.getElementById('ID').textContent = foto.id;
  document.getElementById('Sol').textContent = foto.sol;
  document.getElementById('Earth-Date').textContent = foto.earth_date;
}


