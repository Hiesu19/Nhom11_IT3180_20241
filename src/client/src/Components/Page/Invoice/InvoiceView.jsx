import React, { useState } from "react";

const InvoiceView = ({ invoice }) => {
    const [showItems, setShowItems] = useState(false);

    if (!invoice)
        return <p className="text-red-500">No invoice data available</p>;

    const {
        invoiceID,
        items,
        totalAmount,
        paymentMethod,
        employee,
        createdAt,
    } = invoice;

    const toggleItems = () => {
        setShowItems(!showItems);
    };

    return (
        <div className="border rounded-lg shadow-lg p-6 mb-6">
            <div className="cursor-pointer" onClick={toggleItems}>
                <h2 className="text-xl font-bold mb-2">
                    Invoice ID: {invoiceID}
                </h2>
                <p>
                    <strong>Employee ID:</strong>{" "}
                    {typeof employee === "object" && employee !== null
                        ? employee.username
                        : employee}
                </p>
                <p>
                    <strong>Payment Method:</strong> {paymentMethod}
                </p>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Total Amount:</strong> ${totalAmount}
                </p>
            </div>

            {showItems && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Items:</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Product ID</th>
                                <th className="border px-4 py-2">
                                    Product Name
                                </th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item._id}
                                    className="odd:bg-white even:bg-gray-50"
                                >
                                    <td className="border px-4 py-2">
                                        {item.productID}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {item.product}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="border px-4 py-2">
                                        ${item.price}
                                    </td>
                                    <td className="border px-4 py-2">
                                        ${item.total}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceView;
