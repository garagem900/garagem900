const produtos = {
  cervejas: [
    {nome:"Império Lata", preco:5},
    {nome:"Boa Lata", preco:5},
    {nome:"Eisenbahn Lata", preco:6},
    {nome:"Heineken Lata", preco:8}
  ],
  refrigerantes: [
    {nome:"Coca-Cola Lata", preco:4.5},
    {nome:"Coca-Cola Caçulinha", preco:3.5},
    {nome:"Guaraná Lata", preco:4.5},
    {nome:"Fanta Lata", preco:4.5},
    {nome:"Água sem gás", preco:3},
    {nome:"Água com gás", preco:3.5}
  ],
  batidas: [
    {nome:"Caipirinha", preco:8},
    {nome:"Kiwi", preco:8},
    {nome:"Morango", preco:8},
    {nome:"Maracujá", preco:8}
  ],
  doses: [
    {nome:"Velho Barreiro", preco:3},
    {nome:"Ipyoca", preco:3.5},
    {nome:"Canelinha", preco:3},
    {nome:"Coquinho", preco:3}
  ]
};

let carrinho = [];

window.onload = () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 2500);
};

function mostrarBebidas() {
  document.getElementById("categorias").classList.remove("hidden");
  document.getElementById("produtos").innerHTML="";
}

function mostrarPorcoes() {
  alert("Porções em breve.");
}

function mostrarCategoria(cat) {
  const div = document.getElementById("produtos");
  div.innerHTML="";

  produtos[cat].forEach((item,i)=>{
    div.innerHTML += `
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)}<br><br>
        <button onclick="adicionar('${cat}',${i})">Adicionar</button>
      </div>
    `;
  });
}

function adicionar(cat,i){
  carrinho.push(produtos[cat][i]);
  atualizarCarrinho();
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

  carrinho.forEach(item=>{
    lista.innerHTML+=`<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`;
    total+=item.preco;
  });

  totalSpan.textContent=total.toFixed(2);
  count.textContent=carrinho.length;
}

function finalizarPedido(){
  if(carrinho.length==0){
    alert("Carrinho vazio");
    return;
  }
  alert("Pedido enviado!");
  carrinho=[];
  atualizarCarrinho();
  toggleCarrinho();
}










