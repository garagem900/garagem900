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

  let total = 0;
  let itens = 0;

  btnCardapio.onclick = () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  };

  btnAgenda.onclick = () => {
    home.classList.add("hidden");
    agenda.classList.remove("hidden");
  };

  btnCarrinho.onclick = () => {
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    carrinho.classList.remove("hidden");
  };

  window.voltar = () => {
    carrinho.classList.add("hidden");
    cardapio.classList.add("hidden");
    agenda.classList.add("hidden");
    home.classList.remove("hidden");
  };

  document.querySelectorAll(".item").forEach(item => {

    let qtd = 1;

    const menos = item.querySelector(".menos");
    const mais = item.querySelector(".mais");
    const qtdSpan = item.querySelector(".qtd");
    const enviar = item.querySelector(".enviar");

    menos.onclick = () => {
      if (qtd > 1) {
        qtd--;
        qtdSpan.textContent = qtd;
      }
    };

    mais.onclick = () => {
      qtd++;
      qtdSpan.textContent = qtd;
    };

    enviar.onclick = () => {
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

      mostrarToast("Adicionado ao carrinho ✔");
    };
  });

});

/* NOTIFICAÇÃO */
function mostrarToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

  });

});

