let carrinho = {};
let historico = [];

function mostrar(id) {
  document.querySelectorAll("section").forEach(s => {
    s.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");
}

function voltar() {
  mostrar("menuCardapio");
}

function alterar(item, qtd, preco = 0) {
  if (!carrinho[item]) {
    carrinho[item] = { qtd: 0, preco };
  }

  carrinho[item].qtd += qtd;

  if (carrinho[item].qtd <= 0) {
    carrinho[item].qtd = 0;
  }

  document.getElementById("qtd-" + item).innerText = carrinho[item].qtd;

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";

  let total = 0;

  for (let item in carrinho) {
    if (carrinho[item].qtd > 0) {
      const subtotal = carrinho[item].qtd * carrinho[item].preco;
      total += subtotal;

      const li = document.createElement("li");
      li.textContent = `${item.replace("_", " ")} x${carrinho[item].qtd} — R$ ${subtotal.toFixed(2)}`;
      lista.appendChild(li);
    }
  }

  document.getElementById("total").innerText = total.toFixed(2);
}
