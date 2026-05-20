const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");

let gamesList = [];

fetch("../games.xml")
  .then(res => res.text())
  .then(xmlText => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const games = xml.getElementsByTagName("game");

    for (let g of games) {
      gamesList.push({
        id: g.getElementsByTagName("id")[0].textContent.trim(),
        title: g.getElementsByTagName("title")[0].textContent.trim(),
        image: g.getElementsByTagName("image")[0].textContent.trim()
      });
    }
  });

function updateSuggestions() {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.classList.remove("open");
    return;
  }

  const filtered = gamesList.filter(g =>
    g.title.toLowerCase().includes(query)
  ).slice(0, 8);

  if (filtered.length === 0) {
    suggestionsBox.classList.remove("open");
    return;
  }

  filtered.forEach(g => {
    const item = document.createElement("div");
    item.className = "suggestion-item";

    item.innerHTML = `
      <img src="${g.image}" class="suggestion-img">
      <span>${g.title}</span>
    `;

    item.addEventListener("click", () => {
      window.location.href = `game.html?id=${g.id}`;
    });

    suggestionsBox.appendChild(item);
  });

  suggestionsBox.classList.add("open");
}

searchInput.addEventListener("input", updateSuggestions);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();

    const found = gamesList.find(g =>
      g.title.toLowerCase() === query
    );

    if (found) {
      window.location.href = `game.html?id=${found.id}`;
    }
  }
});

// закрытие подсказок при клике вне поляпоиска
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    suggestionsBox.classList.remove("open");
  }
});

