let carrinho = {};
let total = 0;

function mostrar(id) {
  document.querySelectorAll("main, section").forEach(el => {
    el.style.display = "none";
  });

  document.getElementById(id).style.display = "block";
}

function alterarQtd(nome, delta, preco = 0) {
  if (!carrinho[nome]) {
    carrinho[nome] = { qtd: 0, preco };
  }

  carrinho[nome].qtd += delta;

  if (carrinho[nome].qtd <= 0) {
    delete carrinho[nome];
    document.getElementById(`qtd-${nome}`).textContent = 0;
  } else {
    document.getElementById(`qtd-${nome}`).textContent = carrinho[nome].qtd;
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  total = 0;

  for (let item in carrinho) {
    const subtotal = carrinho[item].qtd * carrinho[item].preco;
    total += subtotal;

    const li = document.createElement("li");
    li.textContent = `${item} x${carrinho[item].qtd} — R$ ${subtotal.toFixed(2)}`;
    lista.appendChild(li);
  }

  document.getElementById("total").textContent = total.toFixed(2);
}

// inicia na home
mostrar("home");
