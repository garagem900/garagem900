let cart = [];

const products = {
  cervejas: [
    {name:"Império lata", price:5.00},
    {name:"Boa lata", price:5.00},
    {name:"Eisenbahn lata", price:6.00},
    {name:"Heineken lata", price:8.00}
  ],
  refrigerantes: [
    {name:"Coca-Cola lata", price:4.50},
    {name:"Coca-Cola (casulinha)", price:3.50},
    {name:"Guaraná lata", price:4.50},
    {name:"Fanta lata", price:4.50},
    {name:"Água sem gás", price:3.00},
    {name:"Água com gás", price:3.50}
  ],
  batidas: [
    {name:"Caipirinha", price:8.00},
    {name:"Kiwi", price:8.00},
    {name:"Morango", price:8.00},
    {name:"Maracujá", price:8.00}
  ],
  doses: [
    {name:"Velho Barreiro", price:3.00},
    {name:"Ipyoca", price:3.50},
    {name:"Canelinha", price:3.00},
    {name:"Coquinho", price:3.00}
  ],
  porcoes: []
};

window.onload = function() {

  setTimeout(function(){
    document.getElementById("splash").style.display = "none";
  },2000);

  if(!localStorage.getItem("user")){
    document.getElementById("popup").style.display="flex";
  }

  showCategory("cervejas");
};

function toggleEndereco(){
  let tipo = document.getElementById("tipoPedido").value;
  document.getElementById("endereco").style.display = tipo=="delivery" ? "block" : "none";
}

function salvarCadastro(){
  let user = {
    nome: nome.value,
    telefone: telefone.value,
    tipo: tipoPedido.value,
    endereco: endereco.value
  };
  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("popup").style.display="none";
}

function showCategory(cat){
  let container = document.getElementById("products");
  container.innerHTML="";

  if(products[cat].length === 0){
    container.innerHTML = "<p style='text-align:center'>Em breve...</p>";
    return;
  }

  products[cat].forEach((p)=>{
    let div = document.createElement("div");
    div.className="product";
    div.innerHTML=`
      <h3>${p.name}</h3>
      <p>R$ ${p.price.toFixed(2)}</p>
      <div class="controls">
        <button onclick="addItem('${p.name}',${p.price})">+</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addItem(name,price){
  cart.push({name,price});
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;
}

function finalizarPedido(){
  let user = JSON.parse(localStorage.getItem("user"));
  if(cart.length==0){
    alert("Carrinho vazio");
    return;
  }

  let texto = `Pedido de ${user.nome}%0A`;
  texto += `Telefone: ${user.telefone}%0A`;
  texto += `Tipo: ${user.tipo}%0A`;
  if(user.tipo=="delivery") texto+=`Endereço: ${user.endereco}%0A`;

  cart.forEach(i=>{
    texto += `- ${i.name} R$${i.price.toFixed(2)}%0A`;
  });

  let url = `https://wa.me/5517992585697?text=${texto}`;
  window.open(url,"_blank");
}









