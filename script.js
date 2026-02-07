let historico = [];
let carrinho = [];
let quantidades = {};

function mostrar(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
  historico.push(id);
}

function voltar() {
  historico.pop();
  const anterior = historico.pop();
  if (anterior) mostrar(anterior);
}

function alterarQtd(id, valor) {
  quantidades[id] = (quantidades[id] || 0) + valor;
  if (quantidades[id] < 0) quantidades[id] = 0;
  document.getElementById("qtd-" + id).innerText = quantidades[id];
}

function enviarItem(nome, preco, id) {
  const qtd = quantidades[id] || 0;
  if (qtd === 0) return alert("Escolha a quantidade");

  carrinho.push({ nome, preco, qtd });
  quantidades[id] = 0;
  document.getElementById("qtd-" + id).innerText = 0;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.qtd}x ${item.nome} — R$ ${(item.qtd * item.preco).toFixed(2)}`;
    lista.appendChild(li);
    total += item.qtd * item.preco;
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function enviarPedido() {
  if (carrinho.length === 0) return alert("Carrinho vazio");

  let msg = "📋 Pedido Garagem 900:%0A";
  carrinho.forEach(item => {
    msg += `${item.qtd}x ${item.nome}%0A`;
  });

  msg += `%0ATotal: R$ ${document.getElementById("total").innerText}`;

  window.open(`https://wa.me/5517992585697?text=${msg}`, "_blank");
}
