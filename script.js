let carrinho = {};
let total = 0;

function mostrar(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function voltar() {
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("hidden");
  });
}

function addCarrinho(nome, preco) {
  if (!carrinho[nome]) {
    carrinho[nome] = { qtd: 1, preco };
  } else {
    carrinho[nome].qtd++;
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  total = 0;

  for (let item in carrinho) {
    const li = document.createElement("li");
    const subtotal = carrinho[item].qtd * carrinho[item].preco;
    total += subtotal;

    li.textContent = `${item} x${carrinho[item].qtd} — R$ ${subtotal.toFixed(2)}`;
    lista.appendChild(li);
  }

  document.getElementById("total").textContent = total.toFixed(2);
}

function enviarPedido() {
  if (total === 0) {
    alert("Carrinho vazio");
    return;
  }

  let msg = "🧾 Pedido - Garagem 900\n\n";

  for (let item in carrinho) {
    msg += `${item} x${carrinho[item].qtd}\n`;
  }

  msg += `\n💰 Total: R$ ${total.toFixed(2)}`;

  window.open(
    "https://wa.me/5517992585697?text=" + encodeURIComponent(msg),
    "_blank"
  );
}
