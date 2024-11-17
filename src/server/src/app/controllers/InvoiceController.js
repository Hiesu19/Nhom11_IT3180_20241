const Invoice = require("../models/Invoice");

class InvoiceController {
    // Save Invoice
    saveInvoice = async (req, res) => {
        try {
            const { invoiceID, items, paymentMethod, totalAmount } = req.body;
            if (!invoiceID || !items || !paymentMethod || !totalAmount) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            // Create a new invoice
            const newInvoice = new Invoice({
                employee: req.user.id,
                invoiceID,
                items,
                totalAmount,
                paymentMethod,
            });

            // Save to database
            const invoice = await newInvoice.save();

            // Respond with the saved invoice
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ message: "Error saving invoice", error });
        }
    };

    //Get all invoice
    getAllInvoices = async (req, res) => {
        try {
            const invoices = await Invoice.find();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({
                message: "Lỗi máy chủ khi lấy toàn bộ hoá đơn",
            });
        }
    };

    // Get all your own invoices
    getAllYourOwnInvoice = async (req, res) => {
        try {
            const me = req.user.id;
            const invoices = await Invoice.find({ employee: me });
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({
                message: "Lỗi máy chủ khi lấy toàn bộ hoá đơn",
            });
        }
    };

    // Get all employee invoices
    getAllEmloyeeInvoices = async (req, res) => {
        try {
            const emloyee = req.params.id;
            const invoices = await Invoice.find({ employee: emloyee });
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({
                message: "Lỗi máy chủ khi lấy toàn bộ hoá đơn",
            });
        }
    };

    // Get all invoices by invoiceID
    getInvoiceByInvoiceID = async (req, res) => {
        try {
            const invoiceID = req.params.id;
            const invoices = await Invoice.find({ invoiceID: invoiceID });
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({
                message: "Lỗi máy chủ khi lấy toàn bộ hoá đơn",
            });
        }
    };
}

module.exports = new InvoiceController();
