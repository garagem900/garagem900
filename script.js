const home = document.getElementById("home");
const cardapio = document.getElementById("cardapio");
const agenda = document.getElementById("agenda");
const carrinho = document.getElementById("carrinho");

const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

let total = 0;

document.getElementById("btnCardapio").onclick = () => {
  home.classList.add("hidden");
  cardapio.classList.remove("hidden");
};

document.getElementById("btnAgenda").onclick = () => {
  home.classList.add("hidden");
  agenda.classList.remove("hidden");
};

function voltar() {
  cardapio.classList.add("hidden");
  agenda.classList.add("hidden");
  carrinho.classList.add("hidden");
  home.classList.remove("hidden");
}

document.querySelectorAll(".item").forEach(item => {
  const menos = item.querySelector(".menos");
  const mais = item.querySelector(".mais");
  const qtdSpan = item.querySelector(".qtd");
  const enviar = item.querySelector(".enviar");

  let qtd = 1;

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
    li.textContent = `${qtd}x ${nome} - R$ ${subtotal.toFixed(2)}`;
    listaCarrinho.appendChild(li);

    total += subtotal;
    totalSpan.textContent = total.toFixed(2);

    cardapio.classList.add("hidden");
    carrinho.classList.remove("hidden");
  };
});
;
