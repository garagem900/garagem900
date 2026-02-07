document.addEventListener("DOMContentLoaded", () => {
  const btnCarrinho = document.querySelector(".btn-carrinho");
  const carrinho = document.getElementById("carrinho");

  // ABRIR CARRINHO
  btnCarrinho.onclick = () => {
    carrinho.classList.remove("hidden");
    carrinho.style.display = "flex";
  };

  // FECHAR CARRINHO
  window.fecharCarrinho = () => {
    carrinho.style.display = "none";
    carrinho.classList.add("hidden");
  };

  // CONTROLE DE QUANTIDADE
  window.alterarQtd = (botao, valor) => {
    const span = botao.parentElement.querySelector(".qtd");
    let qtd = parseInt(span.innerText);

    qtd += valor;
    if (qtd < 0) qtd = 0;

    span.innerText = qtd;
  };

  // ADICIONAR ITEM
  window.adicionarItem = (nome, preco, botao) => {
    const qtdSpan = botao.parentElement.querySelector(".qtd");
    const qtd = parseInt(qtdSpan.innerText);

    if (qtd === 0) return;

    alert(`${qtd}x ${nome} adicionado(s)`);

    // reseta para zero
    qtdSpan.innerText = 0;
  };
});



