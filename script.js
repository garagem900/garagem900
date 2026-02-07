document.addEventListener("DOMContentLoaded", () => {

  let carrinho = [];

  document.querySelectorAll(".item").forEach(item => {
    const btnMais = item.querySelector(".mais");
    const btnMenos = item.querySelector(".menos");
    const qtd = item.querySelector(".qtd");
    const btnEnviar = item.querySelector(".enviar");

    if (!btnMais || !btnMenos || !qtd || !btnEnviar) return;

    btnMais.onclick = () => {
      qtd.innerText = parseInt(qtd.innerText) + 1;
    };

    btnMenos.onclick = () => {
      let valor = parseInt(qtd.innerText);
      if (valor > 1) qtd.innerText = valor - 1;
    };

    btnEnviar.onclick = () => {
      carrinho.push({
        nome: item.dataset.nome,
        preco: parseFloat(item.dataset.preco),
        quantidade: parseInt(qtd.innerText)
      });

      qtd.innerText = 1;
      atualizarCarrinho();
    };
  });

  function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const total = document.getElementById("total");
    const contador = document.getElementById("cartCount");

    if (!lista || !total || !contador) return;

    lista.innerHTML = "";
    let soma = 0;

    carrinho.forEach(i => {
      soma += i.preco * i.quantidade;
      const li = document.createElement("li");
      li.textContent = `${i.quantidade}x ${i.nome}`;
      lista.appendChild(li);
    });

    total.textContent = soma.toFixed(2);
    contador.textContent = carrinho.length;
  }

  // carrinho
  const abrir = document.getElementById("btnCarrinho");
  const fechar = document.getElementById("fecharCarrinho");

  if (abrir) abrir.onclick = () =>
    document.getElementById("carrinho").classList.remove("hidden");

  if (fechar) fechar.onclick = () =>
    document.getElementById("carrinho").classList.add("hidden");

});
