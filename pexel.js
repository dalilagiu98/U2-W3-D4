// DICHIARO I MIEI URL E IL MIO TOKEN

const myUrl = "https://api.pexels.com/v1/search?query=";
const loadQuery = "tiger";
const reloadQuery = "universe";
const token = "95ozMgLxnW7NduyYEk8RiPG9YZBRI3TISY4gqubN8rdANvDygCAwf3xp";

// DICHIARO ELEMENTI DALL'HTML
const loadButton = document.getElementById("load-button");
const reloadButton = document.getElementById("reload-button");
const row = document.getElementById("row-container");
const searchButton = document.getElementById("search-button");

// EVENT LISTENER
loadButton.addEventListener("click", function () {
  console.log("click1");
  getCards(loadQuery);
});

reloadButton.addEventListener("click", function () {
  console.log("click2");
  getCards(reloadQuery);
});

// FUNZIONE PER GENERARE LE CARD

const generateCard = function (photo) {
  let src = photo.src.landscape;
  let title = photo.alt;
  let photographer = photo.photographer;
  let id = photo.id;
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
  <div class="card mb-4 shadow-sm">
  <a href="./details.html?id=${id}">
    <img src="${src}" class="bd-placeholder-img card-img-top" />
  </a>
  <div class="card-body">
    <a href="./details.html?id=${id}">
      <h5 class="card-title">${title}</h5>
    </a>
    <a class="card-text"> ${photographer} </a>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-secondary  data-bs-toggle="modal"
        data-bs-target="#modal-${id}">
          View
        </button>

        <button
          type="button"
          class="btn btn-sm btn-outline-secondary button-hide"
        >
          Hide
        </button>
      </div>
      <small class="text-muted">${id}</small>
    </div>
  </div>
  <div class="modal fade" id="modal-${id}" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <a href="${src}">
            <img
              class="w-100"
              src="${src}"
            />
          </a>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  //   const viewButton = card.querySelector(".btn-view");
  //   viewButton.addEventListener("click", function () {
  //     const modal = new bootstrap.Modal(document.getElementById(`modal-${id}`));
  //     modal.show();
  //   });
  return card;

  //   EVENT LISTENER PER IL MODALE
};

// FUNZIONE PER LA REQUEST

const getCards = function (query) {
  fetch(myUrl + query, {
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("problema nella fetch");
      }
    })
    .then((data) => {
      console.log(data.photos);
      row.innerHTML = ""; // per svuotare la row prima di ripopolarla
      data.photos.forEach((photo) => {
        const card = generateCard(photo);
        row.appendChild(card);

        // FUNZIONE PER IL BOTTONE NASCONDI (deve andare qui dentro)

        const hideButton = card.querySelector(".button-hide");
        hideButton.addEventListener("click", function (e) {
          console.log(e.target);
          e.target.closest(".col-md-4").remove();
        });
        console.log("generato");
      });
    });
};

// FUNZIONE PER SEARCHBAR

searchButton.addEventListener("click", function () {
  const searchBar = document.getElementById("custom-search-input");
  getCards(searchBar.value);
});
