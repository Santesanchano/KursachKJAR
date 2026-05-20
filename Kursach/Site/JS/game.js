const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "main.html";
});


fetch("/Site/games.xml")
  .then(r => r.text())
  .then(xmlText => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const games = xml.getElementsByTagName("game");

    for (let game of games) {
      const gameId = game.getElementsByTagName("id")[0].textContent;

      if (gameId === id) {
        const title = game.getElementsByTagName("title")[0].textContent;
        const image = game.getElementsByTagName("image")[0].textContent;
        const genres = game.getElementsByTagName("genres")[0].textContent;
        const description = game.getElementsByTagName("description")[0].textContent;
        const installer = game.getElementsByTagName("installer")[0].textContent;

        // получение Основные данные
        document.getElementById("title").textContent = title;
        document.getElementById("main-image").src = image;
        document.getElementById("genres").textContent = genres;
        document.getElementById("description").textContent = description;

        // скрины
        const carousel = document.getElementById("carousel");
const screenshotsBlock = game.getElementsByTagName("screenshots")[0];

if (screenshotsBlock) {
  const screenshots = screenshotsBlock.getElementsByTagName("img");

  for (let shot of screenshots) {

    // НЕ добавляем main.jpg в скриншоты
    if (shot.textContent === image) continue;

    const img = document.createElement("img");
    img.src = shot.textContent;
    img.className = "carousel-img";

    // При клике — меняется ТОЛЬКО большое окно
    img.addEventListener("click", () => {
      document.getElementById("big-screenshot").src = img.src;
    });

    carousel.appendChild(img);
  }

  // Устанавливаем первый скриншот как большой
  if (carousel.firstChild) {
    document.getElementById("big-screenshot").src = carousel.firstChild.src;
  }
}


        // установить
        const installBtn = document.getElementById("install-btn");
        installBtn.addEventListener("click", () => {
          window.location.href = installer;
        });

        break;
      }
    }
  })
