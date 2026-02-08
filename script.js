const whatsapp = "5517992585697";

const produtos = {
  cervejas:[
    {nome:"Império Lata",preco:5},
    {nome:"Boa Lata",preco:5},
    {nome:"Eisenbahn Lata",preco:6},
    {nome:"Heineken Lata",preco:8}
  ],
  refrigerantes:[
    {nome:"Coca-Cola Lata",preco:4.5},
    {nome:"Coca-Cola Caçulinha",preco:3.5},
    {nome:"Guaraná Lata",preco:4.5},
    {nome:"Fanta Lata",preco:4.5},
    {nome:"Água sem gás",preco:3},
    {nome:"Água com gás",preco:3.5}
  ],
  batidas:[
    {nome:"Caipirinha",preco:8},
    {nome:"Kiwi",preco:8},
    {nome:"Morango",preco:8},
    {nome:"Maracujá",preco:8}
  ],
  doses:[
    {nome:"Velho Barreiro",preco:3},
    {nome:"Ipyoca",preco:3.5},
    {nome:"Canelinha",preco:3},
    {nome:"Coquinho",preco:3}
  ]
};

let carrinho = [];

/* SPLASH */
window.onload = () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";

    if(localStorage.getItem("cliente")){
      document.getElementById("app").classList.remove("hidden");
    } else {
      document.getElementById("cadastro").classList.remove("hidden");
    }
  }, 2000);
};

/* CADASTRO */
function salvarCadastro(){
  const cliente = {
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value,
    telefone: document.getElementById("telefone").value
  };

  localStorage.setItem("cliente", JSON.stringify(cliente));
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

/* TELAS */
function mostrarCardapio(){
  document.getElementById("menu-inicial").classList.add("hidden");
  document.getElementById("cardapio").classList.remove("hidden");
}

function voltarMenu(){
  document.getElementById("cardapio").classList.add("hidden");
  document.getElementById("menu-inicial").classList.remove("hidden");
}

function mostrarBebidas(){
  document.getElementById("cardapio").classList.add("hidden");
  document.getElementById("categorias").classList.remove("hidden");
}

function voltarCardapio(){
  document.getElementById("categorias").classList.add("hidden");
  document.getElementById("cardapio").classList.remove("hidden");
}

function mostrarCategoria(cat){
  document.getElementById("categorias").classList.add("hidden");

  const produtosDiv = document.getElementById("produtos");
  produtosDiv.classList.remove("hidden");
  produtosDiv.innerHTML = `<button onclick="voltarCategorias()">⬅ VOLTAR</button>`;

  produtos[cat].forEach((item,i)=>{
    produtosDiv.innerHTML += `
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)}<br>
        <button onclick="addItem('${cat}',${i})">ADICIONAR</button>
      </div>
    `;
  });
}

function voltarCategorias(){
  document.getElementById("produtos").classList.add("hidden");
  document.getElementById("categorias").classList.remove("hidden");
}

/* CARRINHO */
function addItem(cat,i){
  carrinho.push(produtos[cat][i]);
  atualizarCarrinho();
}

function atualizarCarrinho(){
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  const count = document.getElementById("cart-count");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    lista.innerHTML += `
      <li>
        ${item.nome} - R$ ${item.preco.toFixed(2)}
        <button onclick="removerItem(${index})">❌</button>
      </li>
    `;
    total += item.preco;
  });

  totalSpan.innerText = total.toFixed(2);
  count.innerText = carrinho.length;
  function removerItem(index){
  carrinho.splice(index,1);
  atualizarCarrinho();

}


/* TIPO PEDIDO */
function mostrarTipoPedido(){
  document.getElementById("tipo-pedido").classList.remove("hidden");
}

function fecharTipoPedido(){
  document.getElementById("tipo-pedido").classList.add("hidden");
}

function montarMensagem(tipo,extra=""){
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  let msg = `Pedido ${tipo}%0ACliente: ${cliente.nome}%0A`;

  if(tipo==="DELIVERY"){
    msg += `Endereço: ${cliente.endereco}%0A`;
  }

  if(extra){
    msg += extra + "%0A";
  }

  carrinho.forEach(i=>{
    msg += `${i.nome} - R$${i.preco}%0A`;
  });

  return msg;
}

function pedidoBalcao(){
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("BALCÃO")}`);
}

function pedidoMesa(){
  let mesa = prompt("Número da mesa:");
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("MESA","Mesa: "+mesa)}`);
}

function pedidoDelivery(){
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("DELIVERY")}`);
}

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").style.display = "block";
}, 2500);







