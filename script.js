document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTOS
  // =========================
  const carrinho = document.getElementById("carrinho");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
  const btnCardapio = document.getElementById("btnCardapio");
  const btnAgenda = document.getElementById("btnAgenda");

  // =========================
  // SEGURANÇA: só executa se existir
  // =========================

  if (btnCarrinho && carrinho) {
    btnCarrinho.addEventListener("click", () => {
      carrinho.classList.toggle("hidden");
    });
  }

  if (btnFecharCarrinho && carrinho) {
    btnFecharCarrinho.addEventListener("click", () => {
      carrinho.classList.add("hidden");
    });
  }

  if (btnCardapio) {
    btnCardapio.onclick = () => {
  home.classList.add("hidden");
  agenda.classList.add("hidden");
  carrinho.classList.add("hidden");

  cardapio.classList.remove("hidden");
};

btnAgenda.onclick = () => {
  home.classList.add("hidden");
  cardapio.classList.add("hidden");
  carrinho.classList.add("hidden");

  agenda.classList.remove("hidden");
};


  console.log("JS carregado sem erros ✅");
});







