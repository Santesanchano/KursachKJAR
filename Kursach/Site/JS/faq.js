document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const block = q.parentElement;
    block.classList.toggle("active");
  });
});


const buttons = document.querySelectorAll(".cat-btn");
const blocks = document.querySelectorAll(".faq-block");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;

    blocks.forEach(block => {
      block.style.display = block.dataset.cat === cat ? "block" : "none";
    });
  });
});

document.querySelector('.cat-btn[data-cat="download"]').click();
