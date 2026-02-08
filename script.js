let cart = [];

const products = {
  cervejas: [
    {name:"Império lata", price:5},
    {name:"Boa lata", price:5},
    {name:"Eisenbahn lata", price:6},
    {name:"Heineken lata", price:8}
  ],
  refrigerantes: [
    {name:"Coca-Cola lata", price:4.5},
    {name:"Coca-Cola (casulinha)", price:3.5},
    {name:"Guaraná lata", price:4.5},
    {name:"Fanta lata", price:4.5},
    {name:"Água sem gás", price:3},
    {name:"Água com gás", price:3.5}
  ],
  batidas: [
    {name:"Caipirinha", price:8},
    {name:"Kiwi", price:8},
    {name:"Morango", price:8},
    {name:"Maracujá", price:8}
  ],
  doses: [
    {name:"Velho Barreiro", price:3},
    {name:"Ipyoca", price:3.5},
    {name:"Canelinha", price:3},
    {name:"Coquinho", price:3}
  ]
};

window.onload = function(){
  setTimeout(()=>{ document.getElementById("splash").style.display="none"; },2000);

  if(!localStorage.getItem("user")){
    document.getElementById("popup").style.display="flex";
  }
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

function openBebidas(){
  document.getElementById("mainMenu").style.display="none";
  document.getElementById("bebidasMenu").style.display="flex";
  document.getElementById("products").innerHTML="";
}

function backMain(){
  document.getElementById("bebidasMenu").style.display="none";
  document.getElementById("mainMenu").style.display="flex";
  document.getElementById("products").innerHTML="";
}

function showPorcoes(){
  document.getElementById("products").innerHTML="<p style='text-align:center'>Porções em breve...</p>";
}

function showCategory(cat){
  let container = document.getElementById("products");
  container.innerHTML="";

  products[cat].forEach(p=>{
    let div = document.createElement("div");
    div.className="product";
    div.innerHTML=`
      <h3>${p.name}</h3>
      <p>R$ ${p.price.toFixed(2)}</p>
      <button onclick="addItem('${p.name}',${p.price})">+</button>
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

function openCart(){
  let list = document.getElementById("cartItems");
  list.innerHTML="";

  cart.forEach(i=>{
    list.innerHTML += `<p>${i.name} - R$ ${i.price.toFixed(2)}</p>`;
  });

  document.getElementById("cartModal").style.display="flex";
}

function closeCart(){
  document.getElementById("cartModal").style.display="none";
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

  window.open(`https://wa.me/5517992585697?text=${texto}`);
}









