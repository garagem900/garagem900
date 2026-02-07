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
  const toast = document.getElementById("toast");
  const btnEnviarPedido = document.getElementById("btnEnviarPedido");


  let total = 0;

  btnCardapio?.addEventListener("click", () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  });

  btnAgenda?.addEventListener("click", () => {
    home.classList.add("hidden");
    agenda.classList.remove("hidden");
  });

  btnCarrinho?.addEventListener("click", () => {
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

  function mostrarToast() {
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

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

      mostrarToast();

      qtd = 1;
      qtdSpan.textContent = 1;
      btnEnviarPedido.addEventListener("click", () => {

  if (listaCarrinho.children.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let pedidoTexto = "🛒 Pedido Garagem 900\n\n";

  listaCarrinho.querySelectorAll("li").forEach(item => {
    pedidoTexto += `• ${item.textContent}\n`;
  });

  pedidoTexto += `\nTotal: R$ ${total.toFixed(2)}`;

  const telefone = "5517992585697"; // WhatsApp do bar

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(pedidoTexto)}`;

  window.open(url, "_blank");
});

    });
  });

});

