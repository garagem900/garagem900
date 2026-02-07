document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const cardapio = document.getElementById("cardapio");
  const agenda = document.getElementById("agenda");
  const carrinho = document.getElementById("carrinho");

  const btnCardapio = document.getElementById("btnCardapio");
  const btnAgenda = document.getElementById("btnAgenda");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const btnEnviarPedido = document.getElementById("btnEnviarPedido");

  const listaCarrinho = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cartCount");
  const toast = document.getElementById("toast");

  let total = 0;
  let itens = 0;

  /* ===== ESTADO INICIAL ===== */
  carrinho.style.display = "none";
  cardapio.classList.add("hidden");
  agenda.classList.add("hidden");

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
    carrinho.style.display = "flex";
  };

  window.fecharCarrinho = () => {
    carrinho.style.display = "none";
  };

  /* ===== ITENS ===== */

  document.querySelectorAll(".item").forEach(item => {

    let qtd = 0;
    const qtdSpan = item.querySelector(".qtd");
    qtdSpan.textContent = qtd;

    item.querySelector(".mais").onclick = () => {
      qtd++;
      qtdSpan.textContent = qtd;
    };

    item.querySelector(".menos").onclick = () => {
      if (qtd > 0) {
        qtd--;
        qtdSpan.textContent = qtd;
      }
    };

    item.querySelector(".enviar").onclick = () => {
      if (qtd === 0) return;

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

      qtd = 0;
      qtdSpan.textContent = qtd;

      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 1200);
    };
  });

  /* ===== WHATSAPP ===== */

  btnEnviarPedido.onclick = () => {
    if (itens === 0) return;

    let mensagem = "🛒 Pedido - Garagem 900\n\n";

    document.querySelectorAll("#listaCarrinho li").forEach(li => {
      mensagem += "• " + li.textContent + "\n";
    });

    mensagem += "\n💰 Total: R$ " + total.toFixed(2);

    const telefone = "5517992585697";
    const url = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");
  };

});


