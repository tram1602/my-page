$(document).ready(function () {
    // Danh sách ID sản phẩm cần kiểm tra hội viên
    let productsToCheck = [1, 4, 5, 17, 18, 13, 16, 19, 20];

    // Hàm xử lý sự kiện khi nhấn vào sản phẩm
    function handleProductClick(event, sp) {
        event.preventDefault();  // Ngừng hành động mặc định của liên kết

        let taiKhoanStored = localStorage.getItem("taiKhoan");

        if (!taiKhoanStored) {
            alert('Vui lòng đăng nhập để kiểm tra trạng thái hội viên!');
            window.location.href = '../html/index.html';  // Chuyển đến trang đăng nhập
            return;
        }

        let taiKhoan = JSON.parse(taiKhoanStored);

        if (taiKhoan.isMember) {
            alert('Bạn đã là hội viên, tiếp tục xem sách!');
            window.location.href = sp.link;  // Link đến sách của sản phẩm
        } else {
            alert('Bạn không phải hội viên, vui lòng đăng ký để xem sách.');
            window.location.href = '../html/GioHang.html';  // Chuyển đến trang đăng ký hội viên
        }
    }

    // Hàm xử lý sự kiện cho từng sản phẩm
    function handleProductLink(sp) {
        // Sử dụng jQuery để gán sự kiện click cho tất cả các nút "Đọc Sách"
        $(document).on('click', `#link-${sp.id}`, function (event) {
            // Kiểm tra xem sản phẩm có ID trong danh sách productsToCheck không
            if (productsToCheck.includes(sp.id)) {
                // Kiểm tra hội viên
                handleProductClick(event, sp);
            } else {
                // Nếu không phải sản phẩm cần kiểm tra hội viên, mở trực tiếp sản phẩm
                window.location.href = sp.link;
            }
        });
    }

    // Hàm load dữ liệu vào các sản phẩm
    function loadDataToItem(ds, loai) {
        var htmlObj = document.getElementById(loai);
        ds.forEach(sp => {
            let item = `<div class="item col px-md-0" id="product-${sp.id}" data-id="${sp.id}">
            <div class="card d-flex flex-column align-items-center m-md-2 ribbon bg-dark text-white position-relative">
                <img class="card-img-top" src="${sp.anh}" alt="Card image" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h4 class="card-title product-name text-center">${sp.ten}</h4>
                </div>
                <div class="ribbon2"><span>${sp.phantram}</span></div>
                <!-- Thông tin thêm khi hover vào card -->
                <div class="card-info">
                    <h5 class="product-title">${sp.ten}</h5>
                    <!-- Thêm sự kiện vào nút "Đọc Sách" -->
                    <a href="${sp.link}" class="btn btn-success" id="link-${sp.id}" data-id="${sp.id}">Đọc Sách</a>
                    <p class="product-description">${sp.mota}</p>
                </div>
            </div>
        </div>`;

            htmlObj.innerHTML = htmlObj.innerHTML + item;

            // Gọi hàm xử lý sự kiện cho từng sản phẩm
            handleProductLink(sp);
        });
    }

    // Load dữ liệu vào các mục sản phẩm
    loadDataToItem(dsSale, "product-sales");
    loadDataToItem(dsbc, "sanpham-banchay");
    loadDataToItem(dsBestSelling, "sach-banchay");  // Sách bán chạy
    loadDataToItem(dsNewProducts, "sanpham-moinhat");  // Sản phẩm mới nhất

    // Chia layout cho phần Carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    $("#dangnhap").click(function () {
        $("#signinPage").modal("hide");
    });
});
