//парсинг
function loadGames() {
  fetch("../games.xml")
    .then(response => response.text())
    .then(xmlText => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "text/xml");

      const games = xml.getElementsByTagName("game");
      const container = document.getElementById("games");

      for (let game of games) {
        const id = game.getElementsByTagName("id")[0].textContent;
        const title = game.getElementsByTagName("title")[0].textContent;
        const image = game.getElementsByTagName("image")[0].textContent;
        const genres = game.getElementsByTagName("genres")[0].textContent;

        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
          <img src="${image}" alt="${title}">
          
          <h3>${title}</h3>
          <p>${genres}</p>
          <button type="button">Перейти</button>
        `;

        // трансфер на страницу игры по параметром id
        card.addEventListener("click", () => {
          window.location.href = `game.html?id=${id}`;
        });

        container.appendChild(card);
      }
    })
}

document.addEventListener("DOMContentLoaded", loadGames);


