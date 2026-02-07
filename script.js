document.addEventListener("DOMContentLoaded", () => {
const params = new URLSearchParams(window.location.search);
let mesaAtual = params.get("mesa");

// se não vier mesa no link, pede
if (!mesaAtual) {
  mesaAtual = prompt("Digite o número da mesa:");
}

// salva a mesa
localStorage.setItem("mesaAtual", mesaAtual);

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

  document.querySelectorAll(".item").forEach(item => {

    let qtd = 1;
    const qtdSpan = item.querySelector(".qtd");

    item.querySelector(".mais").onclick = () => {
      qtd++;
      qtdSpan.textContent = qtd;
    };

    item.querySelector(".menos").onclick = () => {
      if (qtd > 1) {
        qtd--;
        qtdSpan.textContent = qtd;
      }
    };

    item.querySelector(".enviar").onclick = () => {
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

      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 1500);
    };
  });

});


