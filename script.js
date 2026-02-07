document.addEventListener("DOMContentLoaded", () => {

  /* ===== TELAS ===== */
  const home = document.getElementById("home");
  const cardapio = document.getElementById("cardapio");
  const agenda = document.getElementById("agenda");
  const carrinho = document.getElementById("carrinho");

  /* ===== BOTÕES ===== */
  const btnCardapio = document.getElementById("btnCardapio");
  const btnAgenda = document.getElementById("btnAgenda");
  const btnCarrinho = document.getElementById("btnCarrinho");

  /* ===== NAVEGAÇÃO ===== */
  btnCardapio.addEventListener("click", () => {
    home.classList.add("hidden");
    agenda.classList.add("hidden");
    cardapio.classList.remove("hidden");
  });

  btnAgenda.addEventListener("click", () => {
    home.classList.add("hidden");
    cardapio.classList.add("hidden");
    agenda.classList.remove("hidden");
  });

  window.voltar = () => {
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    home.classList.remove("hidden");
  };

  /* ===== CARRINHO ===== */
  btnCarrinho.addEventListener("click", () => {
    carrinho.classList.remove("hidden");
    carrinho.style.display = "block";
  });

  window.fecharCarrinho = () => {
    carrinho.classList.add("hidden");
    carrinho.style.display = "none";
  };

  /* ===== ITENS ===== */
  document.querySelectorAll(".item").forEach(item => {
    let qtd = 0;
    const qtdSpan = item.querySelector(".qtd");

    item.querySelector(".mais").addEventListener("click", () => {
      qtd++;
      qtdSpan.innerText = qtd;
    });

    item.querySelector(".menos").addEventListener("click", () => {
      if (qtd > 0) {
        qtd--;
        qtdSpan.innerText = qtd;
      }
    });

    item.querySelector(".enviar").addEventListener("click", () => {
      if (qtd === 0) return;

      alert(`${qtd} item(ns) adicionado(s)`);
      qtd = 0;
      qtdSpan.innerText = 0;
    });
  });

});





