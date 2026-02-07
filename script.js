document.addEventListener("DOMContentLoaded", () => {

  // TELAS
  const home = document.getElementById("home");
  const cardapio = document.getElementById("cardapio");
  const agenda = document.getElementById("agenda");
  const carrinho = document.getElementById("carrinho");
  const finalizar = document.getElementById("finalizar");

  // BOTÕES
  const btnCardapio = document.getElementById("btnCardapio");
  const btnAgenda = document.getElementById("btnAgenda");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
  const btnFinalizar = document.getElementById("btnFinalizar");

  // CAMPOS FINALIZAR
  const tipoPedido = document.getElementById("tipoPedido");
  const campoMesa = document.getElementById("campoMesa");
  const campoEndereco = document.getElementById("campoEndereco");

  // CARRINHO
  const listaCarrinho = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cartCount");
  const toast = document.getElementById("toast");

  let total = 0;
  let itens = 0;

  // ===== NAVEGAÇÃO =====
  btnCardapio.onclick = () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  };

  btnAgenda.onclick = () => {
    home.classList.add("hidden");
    agenda.classList.remove("hidden");
  };

  document.querySelectorAll(".voltar").forEach(btn => {
    btn.onclick = () => {
      cardapio.classList.add("hidden");
      agenda.classList.add("hidden");
      home.classList.remove("hidden");
    };
  });

  btnCarrinho.onclick = () => {
    carrinho.classList.remove("hidden");
  };

  btnFecharCarrinho.onclick = () => {
    carrinho.classList.add("hidden");
  };

  // ===== FINALIZAR =====
  btnFinalizar.onclick = () => {
    carrinho.classList.add("hidden");
    finalizar.classList.remove("hidden");
  };

  window.voltarFinalizar = () => {
    finalizar.classList.add("hidden");
    carrinho.classList.remove("hidden");
  };

  tipoPedido.onchange = () => {
    campoMesa.classList.add("hidden");
    campoEndereco.classList.add("hidden");

    if (tipoPedido.value === "Mesa") {
      campoMesa.classList.remove("hidden");
    }

    if (tipoPedido.value === "Entrega") {
      campoEndereco.classList.remove("hidden");
    }
  };

  // ===== CONTROLE DOS ITENS =====
  document.querySelectorAll(".item").forEach(item => {

    let qtd = 0;

    const qtdSpan = item.querySelector(".qtd");
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

      if (qtd === 0) return;

      const nome = item.dataset.nome;
      const preco = parseFloat(item.dataset.preco);
      const subtotal = preco * qtd;

      const li = document.createElement("li");
      li.textContent = `${qtd}x ${nome} - R$ ${subtotal.toFixed(2)}`;
      listaCarrinho.appendChild(li);

      total += subtotal;
      itens += qtd;

      totalSpan.textContent = total.toFixed(2);
      cartCount.textContent = itens;

      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 1200);

      qtd = 0;
      qtdSpan.textContent = 0;
    };

  });

});






