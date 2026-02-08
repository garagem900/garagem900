const whatsappNumber = "5517992585697";
const sheetURL = "COLE_AQUI_SUA_URL_DO_APPS_SCRIPT";

let user = JSON.parse(localStorage.getItem("user"));
let cart = [];

const productsData = {
  bebidas: [
    { name: "Cerveja", price: 8 },
    { name: "Refrigerante", price: 5 }
  ],
  churros: [
    { name: "Churros Chocolate", price: 10 },
    { name: "Churros Doce de Leite", price: 10 }
  ],
  porcoes: [
    { name: "Batata Frita", price: 15 }
  ]
};

const productsDiv = document.getElementById("products");
const cartBtn = document.getElementById("cartBtn");

if (!user) {
  document.getElementById("registerModal").style.display = "flex";
}

function saveUser() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !telefone) return alert("Preencha tudo!");

  user = { nome, telefone };
  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("registerModal").style.display = "none";
}

function showCategory(cat) {
  productsDiv.innerHTML = "";
  productsData[cat].forEach((p, i) => {
    productsDiv.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>R$ ${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">+</button>
        <button onclick="removeFromCart('${p.name}')">-</button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCartCount();
}

function removeFromCart(name) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty--;
  if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  updateCartCount();
}

function updateCartCount() {
  let total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").innerText = total;
}

cartBtn.onclick = () => openCart();

function openCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    cartItems.innerHTML += `<p>${i.name} (${i.qty}x) - R$ ${i.price * i.qty}</p>`;
  });

  document.getElementById("total").innerText = "Total: R$ " + total;
  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function toggleLocal() {
  const tipo = document.getElementById("tipoPedido").value;
  const local = document.getElementById("local");

  if (tipo === "Mesa") local.placeholder = "Número da mesa";
  if (tipo === "Delivery") local.placeholder = "Endereço";
  if (tipo === "Balcão") local.value = "Balcão";
}

function finalizarPedido() {
  const tipo = document.getElementById("tipoPedido").value;
  const local = document.getElementById("local").value;

  if (!tipo) return alert("Selecione o tipo de pedido");

  let itensText = "";
  let total = 0;

  cart.forEach(i => {
    itensText += `- ${i.name} (${i.qty}x)\n`;
    total += i.price * i.qty;
  });

  const message = `Pedido Garagem 900\n\nCliente: ${user.nome}\nTelefone: ${user.telefone}\nTipo: ${tipo}\nLocal: ${local}\n\nItens:\n${itensText}\nTotal: R$ ${total}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);

  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify({
      nome: user.nome,
      telefone: user.telefone,
      tipoPedido: tipo,
      local: local,
      itens: itensText,
      total: total
    })
  });

  cart = [];
  updateCartCount();
  closeCart();
}







