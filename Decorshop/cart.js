// ===== Cart utilities (localStorage) =====

function getCart() {
  const data = localStorage.getItem("decorshop_cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem("decorshop_cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, name, price, img) {
  let cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: parseInt(price), img, qty: 1 });
  }
  saveCart(cart);
  alert("Da them " + name + " vao gio hang!");
}

function addToCartFromCard(el) {
  const card = el.closest(".selling__card");
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = card.dataset.price;
  const img = card.dataset.img;
  addToCart(id, name, price, img);
}

function deleteCartItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartTable();
}

function updateQty(id, newQty) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, parseInt(newQty) || 1);
    saveCart(cart);
    renderCartTable();
  }
}

function formatPrice(num) {
  return num.toLocaleString("vi-VN");
}

function calcTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ===== Badge =====

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "inline-block" : "none";
  });
}

// ===== Render cart.html =====

function renderCartTable() {
  const cart = getCart();
  const tbody = document.getElementById("cart-body");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;">Gio hang trong</td></tr>';
    subtotalEl.textContent = "0";
    taxEl.textContent = "0";
    totalEl.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="cart-infor">
          <img src="${item.img}" alt="${item.name}" width="100px" height="100px">
          <div style="padding-top:25px;padding-left:10px">
            <p>${item.name}</p>
          </div>
        </div>
      </td>
      <td>${formatPrice(item.price)}</td>
      <td><input type="number" value="${item.qty}" min="1" onchange="updateQty('${item.id}', this.value)"></td>
      <td><a href="#" onclick="deleteCartItem('${item.id}')">Xoa</a></td>
      <td>${formatPrice(item.price * item.qty)}</td>
    `;
    tbody.appendChild(row);
  });

  const subtotal = calcTotal(cart);
  const tax = Math.round(subtotal * 0.03);
  subtotalEl.textContent = formatPrice(subtotal);
  taxEl.textContent = formatPrice(tax);
  totalEl.textContent = formatPrice(subtotal + tax);
}

function noticeBoughtItems() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Gio hang cua ban trong!");
    return;
  }
  alert("Ban da dat hang thanh cong!");
  localStorage.removeItem("decorshop_cart");
  updateCartBadge();
  renderCartTable();
}

// ===== Init on cart.html =====

document.addEventListener("DOMContentLoaded", function() {
  updateCartBadge();
  if (document.getElementById("cart-body")) {
    renderCartTable();
  }
});


