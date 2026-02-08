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
  var type = document.getElementById("orderType").value;
  var address = document.getElementById("address");

  if (type === "Delivery") {
    address.style.display = "block";
  } else {
    address.style.display = "none";
  }
}

function saveUser() {
  var user = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    type: document.getElementById("orderType").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("popup").style.display = "none";
}

window.onload = function() {
  if (!localStorage.getItem("user")) {
    document.getElementById("popup").style.display = "flex";
  }
  showCategory("bebidas");
};

function showCategory(cat) {
  currentCategory = cat;
  productsDiv.innerHTML = "";

  var list = productsData[cat];

  for (var i = 0; i < list.length; i++) {
    var p = list[i];

    productsDiv.innerHTML +=
      '<div class="product">' +
        '<h3>' + p.name + '</h3>' +
        '<p>R$ ' + p.price + '</p>' +
        '<div class="controls">' +
          '<button onclick="removeFromCart(\'' + p.name + '\')">-</button>' +
          '<span>' + getQty(p.name) + '</span>' +
          '<button onclick="addToCart(\'' + p.name + '\',' + p.price + ')">+</button>' +
        '</div>' +
      '</div>';
  }
}

function getQty(name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return cart[i].qty;
    }
  }
  return 0;
}

function addToCart(name, price) {
  var found = false;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty++;
      found = true;
    }
  }

  if (!found) {
    cart.push({ name: name, price: price, qty: 1 });
  }

  updateUI();
  showCategory(currentCategory);
}

function removeFromCart(name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty--;

      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }

  updateUI();
  showCategory(currentCategory);
}

function updateUI() {
  cartItemsDiv.innerHTML = "";
  var total = 0;
  var count = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML +=
      "<p>" + item.qty + "x " + item.name + " - R$ " + (item.price * item.qty) + "</p>";
  }

  cartItemsDiv.innerHTML += "<strong>Total: R$ " + total + "</strong>";
  cartCount.innerText = count;
}

function finishOrder() {
  var user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Cadastre-se primeiro!");
    return;
  }

  var message = "Pedido de " + user.name + "\n";
  message += "Telefone: " + user.phone + "\n";
  message += "Tipo: " + user.type + "\n";

  if (user.type === "Delivery") {
    message += "Endereço: " + user.address + "\n";
  }

  message += "\nPedido:\n";

  for (var i = 0; i < cart.length; i++) {
    message += cart[i].qty + "x " + cart[i].name + "\n";
  }

  var url = "https://wa.me/5517992585697?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}








