let carrinho = [];

const produtos = {
  cervejas:[
    {nome:"Império Lata",preco:5},
    {nome:"Boa Lata",preco:5},
    {nome:"Eisenbahn Lata",preco:6},
    {nome:"Heineken Lata",preco:8}
  ],
  refrigerantes:[
    {nome:"Coca lata",preco:4.5},
    {nome:"Coca caçulinha",preco:3.5},
    {nome:"Guaraná",preco:4.5},
    {nome:"Fanta",preco:4.5},
    {nome:"Água s/gás",preco:3},
    {nome:"Água c/gás",preco:3.5}
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

window.onload = function(){
  setTimeout(()=>{
    document.getElementById("splash").style.display="none";
    verificarCadastro();
  },2000);
};

function verificarCadastro(){
  if(localStorage.getItem("nome")){
    document.getElementById("app").style.display="block";
  } else {
    document.getElementById("cadastro").style.display="block";
  }
}

function salvarCadastro(){
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("endereco", document.getElementById("endereco").value);
  localStorage.setItem("telefone", document.getElementById("telefone").value);
  document.getElementById("cadastro").style.display="none";
  document.getElementById("app").style.display="block";
}

function abrirCardapio(){
  document.getElementById("menu-principal").style.display="none";
  document.getElementById("menu-cardapio").style.display="block";
}

function abrirBebidas(){
  document.getElementById("menu-cardapio").style.display="none";
  document.getElementById("categorias").style.display="block";
}

function voltarMenu(){
  document.getElementById("menu-cardapio").style.display="none";
  document.getElementById("menu-principal").style.display="block";
}

function voltarCardapio(){
  document.getElementById("categorias").style.display="none";
  document.getElementById("menu-cardapio").style.display="block";
}

function mostrarProdutos(cat){
  document.getElementById("categorias").style.display="none";
  const div = document.getElementById("produtos");
  div.innerHTML="";
  div.classList.remove("hidden");

  produtos[cat].forEach((item,i)=>{
    div.innerHTML+=`
    <div>
      ${item.nome} - R$ ${item.preco.toFixed(2)}
      <div class="qty">
        <button onclick="diminuir('${cat}',${i})">-</button>
        <button onclick="aumentar('${cat}',${i})">+</button>
      </div>
    </div>`;
  });

  div.innerHTML+=`<button onclick="voltarCardapio()">VOLTAR</button>`;
}

function aumentar(cat,i){
  carrinho.push(produtos[cat][i]);
  atualizarCarrinho();
}

function diminuir(cat,i){
  let index = carrinho.findIndex(p=>p.nome===produtos[cat][i].nome);
  if(index>-1){
    carrinho.splice(index,1);
    atualizarCarrinho();
  }
}

function toggleCarrinho(){
  document.getElementById("carrinho").classList.toggle("hidden");
}

function atualizarCarrinho(){
  const lista=document.getElementById("lista-carrinho");
  const totalSpan=document.getElementById("total");
  const count=document.getElementById("cart-count");

  lista.innerHTML="";
  let total=0;

  carrinho.forEach((item,index)=>{
    lista.innerHTML+=`
      <li>${item.nome} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerItem(${index})">❌</button></li>`;
    total+=item.preco;
  });

  totalSpan.innerText=total.toFixed(2);
  count.innerText=carrinho.length;
}

function removerItem(index){
  carrinho.splice(index,1);
  atualizarCarrinho();
}

function mostrarTipoPedido(){
  document.getElementById("tipo-pedido").classList.toggle("hidden");
}

function enviarPedido(tipo){
  let nome=localStorage.getItem("nome");
  let endereco=localStorage.getItem("endereco");
  let telefone=localStorage.getItem("telefone");

  let texto="Pedido Garagem 900:%0A";

  carrinho.forEach(i=>{
    texto+=`${i.nome} - R$ ${i.preco.toFixed(2)}%0A`;
  });

  texto+=`%0ATipo: ${tipo.toUpperCase()}`;
  texto+=`%0ACliente: ${nome}`;
  texto+=`%0ATel: ${telefone}`;

  if(tipo==="delivery"){
    texto+=`%0AEndereço: ${endereco}`;
  }

  window.open(`https://wa.me/5517992585697?text=${texto}`);
}








