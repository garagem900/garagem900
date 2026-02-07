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
    btnCardapio.addEventListener("click", () => {
      alert("CARDÁPIO (em construção)");
    });
  }

  if (btnAgenda) {
    btnAgenda.addEventListener("click", () => {
      alert("AGENDA (em construção)");
    });
  }

  console.log("JS carregado sem erros ✅");
});







