document.getElementById("addToCartButton").addEventListener("click", function () {
    const product = {
        id: "123", // Lấy ID sản phẩm từ dữ liệu của trang hiện tại
        name: "Tên sản phẩm",
        price: 50000,
        quantity: 1
    };
    addToCart(product);
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        cart[productIndex].quantity += product.quantity;
    } else {
        // Nếu chưa có, thêm sản phẩm vào giỏ
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng");
}