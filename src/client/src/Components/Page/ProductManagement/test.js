// Hàm loại bỏ dấu trong chuỗi
const removeDiacritics = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .toLowerCase(); // Đưa về chữ thường
};

// Hàm tìm kiếm với ưu tiên productID trước, sau đó đến name
const searchProducts = (products, keyword) => {
    // Chuẩn hóa từ khóa
    const normalizedKeyword = removeDiacritics(keyword);

    // Tìm kiếm theo productID
    let result = products.filter((product) =>
        removeDiacritics(product.productID).includes(normalizedKeyword)
    );

    // Nếu không có kết quả theo productID, tìm kiếm theo name
    if (result.length === 0) {
        result = products.filter((product) =>
            removeDiacritics(product.name).includes(normalizedKeyword)
        );
    }

    return result;
};

// Sử dụng hàm tìm kiếm
const products = [
    {
        "_id": "67234f520f29f8171d9a7373",
        "productID": "SP001",
        "name": "Nước Giải Khát Coca-Cola",
        // Các thông tin khác...
    },
    {
        "_id": "67234f520f29f8171d9a7374",
        "productID": "SP002",
        "name": "Mì Gói Hảo Hảo",
        // Các thông tin khác...
    }
];

const keyword = "Nước giải khát"; // Từ khóa không dấu
const foundProducts = searchProducts(products, keyword);

console.log(foundProducts);
