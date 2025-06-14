const cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutSection = document.getElementById('checkout-section');
const paymentInfo = document.getElementById('payment-info');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    cart.push({ name, price });
    updateCart();
  });
});

checkoutBtn.addEventListener('click', () => {
  checkoutSection.classList.remove('hidden');
});

document.getElementById('cancel-checkout').addEventListener('click', () => {
  checkoutSection.classList.add('hidden');
});

document.getElementById('checkout-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = this.elements['email'].value;
  const posterNames = cart.map(item => item.name).join(', ');
  const data = { email, poster: posterNames, comment: '' };

  const response = await fetch('/save_order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert('Заказ оформлен!');
    this.reset();
    checkoutSection.classList.add('hidden');
    paymentInfo.classList.remove('hidden');
    cart.length = 0;
    updateCart();
  } else {
    alert('Ошибка оформления заказа.');
  }
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} ₽`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `Итого: ${total} ₽`;
  checkoutBtn.disabled = cart.length === 0;
}
