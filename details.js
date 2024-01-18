// DICHIARO I MIEI URL E IL MIO TOKEN

const myUrl = "https://api.pexels.com/v1/photos";
const token = "95ozMgLxnW7NduyYEk8RiPG9YZBRI3TISY4gqubN8rdANvDygCAwf3xp";
// RECUPERO DELL'ID DALLA BARRA DELL'INDIRIZZI
const imageId = new URLSearchParams(window.location.search).get("id");

// FUNZIONE PER POPOLARE I CAMPI

const generateCard = function () {
  fetch(myUrl + "/" + imageId, {
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(myUrl + "/" + imageId);
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      console.log(data);
      const card = document.getElementsByClassName("card")[0];
      const body = document.body;
      const avgColor = data.avg_color;
      body.style.backgroundColor = avgColor;
      card.innerHTML = `
    <a href="${data.url}">
    <img src="${data.src.original}" class="card-img-top"/>
  </a>
  <div class="card-body">
    <h5 class="card-title">Artist:${data.photographer}</h5>
    <p class="card-text">
      Avaible at: <a href=${data.photographer_url}>Go site!</a>
    </p>
    <a href="./pexels-start.html">
        <button class="btn btn-primary">Home</button>
    </a>
  </div>
    `;
    })
    .catch((error) => {
      console.log(error);
    });
};

generateCard();
