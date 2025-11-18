// ───────────────
// CART FUNCTIONS
// ───────────────

function addToCart(id, name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);
    if(item){
        item.qty += 1;
    } else {
        cart.push({id, name, price, img, qty:1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} ถูกเพิ่มลงตะกร้าแล้ว`);
    loadCart(); // รีเฟรชตะกร้าอัตโนมัติ
}

function removeFromCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkoutCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0){
        alert("ไม่มีสินค้าในตะกร้า");
        return;
    }
    alert("ชำระเงินเรียบร้อย! ขอบคุณที่ซื้อสินค้า");
    localStorage.removeItem("cart");
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");
    container.innerHTML = '';  // เคลียร์ตะกร้าเก่า
    let total = 0;  // ตัวแปรเก็บยอดรวม

    if(cart.length === 0){
        container.innerHTML = "<p>ไม่มีสินค้าในตะกร้า</p>";
        totalBox.innerHTML = "0 บาท";  // ถ้าตะกร้าไม่มีสินค้าให้แสดง 0 บาท
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;  // คำนวณราคาสินค้ารวม
        container.innerHTML += `
            <div class="product" style="display:flex;align-items:center;gap:15px;">
                <img src="${item.img}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;">
                <div style="flex:1;">
                    <h3>${item.name}</h3>
                    <p>ราคา: ${item.price.toLocaleString()} บาท</p>
                    <p>จำนวน: ${item.qty}</p>
                </div>
                <button class="btn" onclick="removeFromCart(${item.id})" style="background:red;color:white;">ลบ</button>
            </div>
        `;
    });

    // แสดงยอดรวม
    totalBox.innerHTML = total.toLocaleString() + " บาท";
}

// เพิ่มสินค้าเข้าสู่ตะกร้าโดยใช้จำนวนที่เลือก
function addToCartWithQty(id, name, price, img, qtyInputId) {
    let qty = parseInt(document.getElementById(qtyInputId).value);
    if(isNaN(qty) || qty <= 0){
        alert("กรุณาใส่จำนวนสินค้าที่ถูกต้อง");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if(item){
        item.qty += qty;
    } else {
        cart.push({id, name, price, img, qty});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} ถูกเพิ่มลงตะกร้าแล้ว`);
    loadCart();
}