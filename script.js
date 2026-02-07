document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const cardapio = document.getElementById("cardapio");
  const carrinho = document.getElementById("carrinho");

  const btnCardapio = document.getElementById("btnCardapio");
  const btnCarrinho = document.getElementById("btnCarrinho");

  const listaCarrinho = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");
  const badge = document.getElementById("badge");
  const toast = document.getElementById("toast");
  const loading = document.getElementById("loading");
  const btnEnviarPedido = document.getElementById("btnEnviarPedido");

  let total = 0;
  let itensCarrinho = 0;

  btnCardapio.onclick = () => {
    home.classList.add("hidden");
    cardapio.classList.remove("hidden");
  };

  btnCarrinho.onclick = () => {
    cardapio.classList.add("hidden");
    carrinho.classList.remove("hidden");
  };

  window.voltar = () => {
    cardapio.classList.add("hidden");
    carrinho.classList.add("hidden");
    home.classList.remove("hidden");
  };

  document.querySelectorAll(".item").forEach(item => {
    let qtd = 1;
    const qtdSpan = item.querySelector(".qtd");

    item.querySelector(".menos").onclick = () => {
      if (qtd > 1) qtdSpan.textContent = --qtd;
    };

    item.querySelector(".mais").onclick = () => {
      qtdSpan.textContent = ++qtd;
    };

    item.querySelector(".enviar").onclick = () => {
      const nome = item.dataset.nome;
      const preco = parseFloat(item.dataset.preco);
      const subtotal = preco * qtd;

      const li = document.createElement("li");
      li.innerHTML = `
        ${qtd}x ${nome} - R$ ${subtotal.toFixed(2)}
        <button class="remover">❌</button>
      `;

      li.querySelector(".remover").onclick = () => {
        listaCarrinho.removeChild(li);
        total -= subtotal;
        totalSpan.textContent = total.toFixed(2);
        badge.textContent = --itensCarrinho;
        if (itensCarrinho <= 0) badge.classList.add("hidden");
      };

      listaCarrinho.appendChild(li);

      total += subtotal;
      totalSpan.textContent = total.toFixed(2);

      itensCarrinho++;
      badge.textContent = itensCarrinho;
      badge.classList.remove("hidden");

      mostrarToast();
    };
  });

  btnEnviarPedido.onclick = () => {
    loading.classList.remove("hidden");

    setTimeout(() => {
      loading.classList.add("hidden");
      alert("Pedido enviado com sucesso!");
    }, 2000);
  };

  function mostrarToast() {
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 1500);
  }

});

  });

});

