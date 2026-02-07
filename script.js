let carrinho = [];

document.querySelectorAll(".item").forEach(item => {
  const btnMais = item.querySelector(".mais");
  const btnMenos = item.querySelector(".menos");
  const qtdSpan = item.querySelector(".qtd");
  const btnEnviar = item.querySelector(".enviar");

  btnMais.addEventListener("click", () => {
    qtdSpan.innerText = parseInt(qtdSpan.innerText) + 1;
  });

  btnMenos.addEventListener("click", () => {
    let qtd = parseInt(qtdSpan.innerText);
    if (qtd > 1) qtdSpan.innerText = qtd - 1;
  });

  btnEnviar.addEventListener("click", () => {
    const nome = item.dataset.nome;
    const preco = parseFloat(item.dataset.preco);
    const quantidade = parseInt(qtdSpan.innerText);

    carrinho.push({ nome, preco, quantidade });
    atualizarCarrinho();
    qtdSpan.innerText = 1;
  });
});

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cartCount");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    const li = document.createElement("li");
    li.innerText = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    lista.appendChild(li);
  });

  totalSpan.innerText = total.toFixed(2);
  cartCount.innerText = carrinho.length;
}

// Abrir / fechar carrinho
document.getElementById("btnCarrinho").onclick = () => {
  document.getElementById("carrinho").classList.remove("hidden");
};

document.getElementById("fecharCarrinho").onclick = () => {
  document.getElementById("carrinho").classList.add("hidden");
};

// Enviar pedido
document.getElementById("enviarPedido").onclick = () => {
  alert("Pedido enviado com sucesso!");
  carrinho = [];
  atualizarCarrinho();
  document.getElementById("carrinho").classList.add("hidden");
};
