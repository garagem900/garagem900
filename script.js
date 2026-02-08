let cart = [];
let currentCategory = "bebidas";

const productsData = {
  bebidas: [
    { name: "Cerveja", price: 8 },
    { name: "Refrigerante", price: 6 }
  ],
  porcoes: [
    { name: "Batata frita", price: 25 },
    { name: "Calabresa", price: 30 }
  ]
};

const productsDiv = document.getElementById("products");
const cartItemsDiv = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

function toggleAddress() {
  const type = document.getElementById("orderType").value;
  document.getElementById("address").style.display = type === "Delivery" ? "block" : "none";
}

function saveUser() {
  const user = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    type: document.getElementById("orderType").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("popup").style.display = "none";
}

window.onload = () => {
  if (!localStorage.getItem("user")) {
    document.getElementById("popup").style.display = "flex";
  }
  showCategory("bebidas");
};

function showCategory(cat) {
  currentCategory = cat;
  productsDiv.innerHTML = "";

  productsData[cat].forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>R$ ${p.price}</p>
        <div class="controls">
          <button onclick="removeFromCart('${p.name}')">-</button>
          <span>${getQty(p.name)}</span>
          <button onclick="addToCart('${p.name}', ${p.price})">+</button>
        </div>
      </div>
    `;
  });
}

function getQty(name) {
  const item = cart.find(i => i.name === name);
  return item ? item.qty : 0;
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  updateUI();
  showCategory(currentCategory);
}

function removeFromCart(name) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  updateUI();
  showCategory(currentCategory);
}

function updateUI() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <p>${item.qty}x ${item.name} - R$ ${item.price * item.qty}</p>
    `;
  });

  cartItemsDiv.innerHTML += `<strong>Total: R$ ${total}</strong>`;
  cartCount.innerText = count;
}

function finishOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return alert("Cadastre-se primeiro!");

  let message = `Pedido de ${user.name}\nTelefone: ${user.phone}\nTipo: ${user.type}\n`;

  if (user.type === "Delivery") {
    message += `Endereço: ${user.address}\n`;
  }

  message += "\nPedido:\n";

  cart.forEach(i => {
    message += `${i.qty}x ${i.name}\n`;
  });

  const url = `https://wa.me/5517992585697?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}








