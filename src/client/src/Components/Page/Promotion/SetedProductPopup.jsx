import React, { useState } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";

const removeDiacritics = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const SetedProductPopup = ({
    isOpen,
    allProducts,
    selectedProducts,
    onSelect,
    onClose,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = allProducts.filter((product) => {
        const normalizedQuery = removeDiacritics(searchQuery);
        const matchesID = product.productID
            ?.toLowerCase()
            .includes(normalizedQuery);
        const matchesName = removeDiacritics(product.name || "").includes(
            normalizedQuery
        );
        return matchesID || matchesName;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allProductIDs = filteredProducts.map(
                (product) => product._id
            );
            onSelect(allProductIDs);
        } else {
            onSelect([]);
        }
    };

    const handleCheckboxChange = (productId) => {
        const updatedSelected = selectedProducts.includes(productId)
            ? selectedProducts.filter((id) => id !== productId)
            : [...selectedProducts, productId];

        onSelect(updatedSelected);
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-xl font-semibold mb-4">Select Products:</h2>
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={
                                selectedProducts.length ===
                                    filteredProducts.length &&
                                filteredProducts.length > 0
                            }
                        />
                        Select All
                    </label>
                    <Select
                        value={productsPerPage}
                        onChange={(e) => setProductsPerPage(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value={5}>5 rows</MenuItem>
                        <MenuItem value={10}>10 rows</MenuItem>
                        <MenuItem value={20}>20 rows</MenuItem>
                    </Select>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="border p-2 w-full rounded-md"
                        placeholder="Search by product ID or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className="min-w-full table-auto max-h-96 overflow-y-auto">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Select</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1 + indexOfFirstProduct}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(
                                            product._id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(product._id)
                                        }
                                    />
                                </td>
                                <td>{product.productID}</td>
                                <td>{product.name}</td>
                                <td>{product.prices?.price} VND</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default SetedProductPopup;
