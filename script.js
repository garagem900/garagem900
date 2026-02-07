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
  const cartCount = document.getElementById("cartCount");
  const toast = document.getElementById("toast");

  let total = 0;
  let itens = 0;

  /* ===== NAVEGAÇÃO ===== */

  btnCardapio.onclick = () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  };

  btnAgenda.onclick = () => {
    home.classList.add("hidden");
    agenda.classList.remove("hidden");
  };

  window.voltar = () => {
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    home.classList.remove("hidden");
  };

  btnCarrinho.onclick = () => {
    carrinho.classList.remove("hidden");
  };

  window.fecharCarrinho = () => {
    carrinho.classList.add("hidden");
  };

  /* ===== ITENS DO CARDÁPIO ===== */

  document.querySelectorAll(".item").forEach(item => {

    let qtd = 0;
    const qtdSpan = item.querySelector(".qtd");
    qtdSpan.textContent = qtd;

    const btnMais = item.querySelector(".mais");
    const btnMenos = item.querySelector(".menos");
    const btnEnviar = item.querySelector(".enviar");

    btnMais.onclick = () => {
      qtd++;
      qtdSpan.textContent = qtd;
    };

    btnMenos.onclick = () => {
      if (qtd > 0) {
        qtd--;
        qtdSpan.textContent = qtd;
      }
    };

    btnEnviar.onclick = () => {
      if (qtd === 0) return; // impede enviar com zero

      const nome = item.dataset.nome;
      const preco = parseFloat(item.dataset.preco);
      const subtotal = preco * qtd;

      const li = document.createElement("li");
      li.textContent = `${qtd}x ${nome} — R$ ${subtotal.toFixed(2)}`;
      listaCarrinho.appendChild(li);

      total += subtotal;
      itens += qtd;

      totalSpan.textContent = total.toFixed(2);
      cartCount.textContent = itens;

      // reseta quantidade após enviar
      qtd = 0;
      qtdSpan.textContent = qtd;

      // toast
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 1500);
    };
  });

});


});


