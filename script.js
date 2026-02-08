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

window.onload=()=>{
  setTimeout(()=>{
    document.getElementById("splash").style.display="none";
    if(localStorage.getItem("cliente")){
      document.getElementById("app").classList.remove("hidden");
    } else {
      document.getElementById("cadastro").classList.remove("hidden");
    }
  },2000);
}

function salvarCadastro(){
  const cliente={
    nome:nome.value,
    endereco:endereco.value,
    telefone:telefone.value
  }
  localStorage.setItem("cliente",JSON.stringify(cliente));
  cadastro.classList.add("hidden");
  app.classList.remove("hidden");
}

function mostrarCardapio(){
  menu-inicial.classList.add("hidden");
  cardapio.classList.remove("hidden");
}

function voltarMenu(){
  cardapio.classList.add("hidden");
  menu-inicial.classList.remove("hidden");
}

function mostrarBebidas(){
  cardapio.classList.add("hidden");
  categorias.classList.remove("hidden");
}

function voltarCardapio(){
  categorias.classList.add("hidden");
  cardapio.classList.remove("hidden");
}

function mostrarCategoria(cat){
  categorias.classList.add("hidden");
  produtosDiv=document.getElementById("produtos");
  produtosDiv.classList.remove("hidden");
  produtosDiv.innerHTML=`<button class="voltar" onclick="voltarCategorias()">⬅ VOLTAR</button>`;

  produtos[cat].forEach((item,i)=>{
    produtosDiv.innerHTML+=`
    <div>
      <strong>${item.nome}</strong><br>
      R$ ${item.preco.toFixed(2)}<br>
      <button onclick="addItem('${cat}',${i})">ADICIONAR</button>
    </div>`;
  });
}

function voltarCategorias(){
  produtosDiv.classList.add("hidden");
  categorias.classList.remove("hidden");
}

function addItem(cat,i){
  carrinho.push(produtos[cat][i]);
  atualizarCarrinho();
}

function toggleCarrinho(){
  carrinhoDiv.classList.toggle("hidden");
}

function atualizarCarrinho(){
  lista-carrinho.innerHTML="";
  let total=0;
  carrinho.forEach(item=>{
    lista-carrinho.innerHTML+=`<li>${item.nome} - R$ ${item.preco}</li>`;
    total+=item.preco;
  });
  total.textContent=total.toFixed(2);
  cart-count.textContent=carrinho.length;
}

function mostrarTipoPedido(){
  tipo-pedido.classList.remove("hidden");
}

function fecharTipoPedido(){
  tipo-pedido.classList.add("hidden");
}

function montarMensagem(tipo,extra=""){
  const cliente=JSON.parse(localStorage.getItem("cliente"));
  let msg=`Pedido ${tipo}%0ACliente: ${cliente.nome}%0A`;
  if(tipo=="DELIVERY") msg+=`Endereço: ${cliente.endereco}%0A`;
  if(extra) msg+=extra+"%0A";
  carrinho.forEach(i=>msg+=`${i.nome} - R$${i.preco}%0A`);
  return msg;
}

function pedidoBalcao(){
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("BALCÃO")}`);
}

function pedidoMesa(){
  let mesa=prompt("Número da mesa:");
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("MESA","Mesa: "+mesa)}`);
}

function pedidoDelivery(){
  window.open(`https://wa.me/${whatsapp}?text=${montarMensagem("DELIVERY")}`);
}








