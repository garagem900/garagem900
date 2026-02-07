document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const cardapio = document.getElementById("cardapio");
  const agenda = document.getElementById("agenda");
  const carrinho = document.getElementById("carrinho");

  const btnCardapio = document.getElementById("btnCardapio");
  const btnAgenda = document.getElementById("btnAgenda");
  const btnCarrinho = document.getElementById("btnCarrinho");

  const listaCarrinho = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");

  let total = 0;

  btnCardapio.addEventListener("click", () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  });

  btnAgenda.addEventListener("click", () => {
    home.classList.add("hidden");
    agenda.classList.remove("hidden");
  });

  btnCarrinho.addEventListener("click", () => {
    home.classList.add("hidden");
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    carrinho.classList.remove("hidden");
  });

  window.voltar = function () {
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    carrinho.classList.add("hidden");
    home.classList.remove("hidden");
  };

  document.querySelectorAll(".item").forEach(item => {

    const menos = item.querySelector(".menos");
    const mais = item.querySelector(".mais");
    const qtdSpan = item.querySelector(".qtd");
    const enviar = item.querySelector(".enviar");

    let qtd = 1;

    menos.addEventListener("click", () => {
      if (qtd > 1) {
        qtd--;
        qtdSpan.textContent = qtd;
      }
    });

    mais.addEventListener("click", () => {
      qtd++;
      qtdSpan.textContent = qtd;
    });

    enviar.addEventListener("click", () => {
      const nome = item.dataset.nome;
      const preco = parseFloat(item.dataset.preco);
      const subtotal = preco * qtd;

      const li = document.createElement("li");
      li.textContent = `${qtd}x ${nome} - R$ ${subtotal.toFixed(2)}`;
      listaCarrinho.appendChild(li);

      total += subtotal;
      totalSpan.textContent = total.toFixed(2);

      // NÃO abre carrinho
    });
  });

});
