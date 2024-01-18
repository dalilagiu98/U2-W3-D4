// DICHIARO I MIEI URL E IL MIO TOKEN

const myUrlPrimary = "https://api.pexels.com/v1/search?query=nature";
const myUrlSecondary = "https://api.pexels.com/v1/search?query=tiger";
const token = "95ozMgLxnW7NduyYEk8RiPG9YZBRI3TISY4gqubN8rdANvDygCAwf3xp";

// DICHIARO ELEMENTI DALL'HTML
const loadButton = document.getElementById("load-button");
const row = document.getElementsByClassName("row")[0];

// FUNZIONE PER IL BOTTONE LOAD

const loadImages = function (arrayOfImages) {
  arrayOfImages.forEach((image) => {
    row.innerHTML = `
        <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img
            src="${myUrlPrimary}?imageId=${image.id}"
            class="bd-placeholder-img card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">Lorem Ipsum</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
        `;
  });
};

loadButton.addEventListener("click", function () {
  getImages();
});

// CREO LA FUNZIONE PER LA REQUEST A PEXELS E LA INVOCO ALLA FINE DEL JS

const getImages = function () {
  fetch(myUrlPrimary, {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Aggiungi questo se stai inviando dati JSON nel corpo della richiesta
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella chiamata!");
      }
    })
    .then((data) => {
      console.log(data);
      loadImages(data.photos);
    })
    .catch((err) => {
      console.log(err);
    });
};
