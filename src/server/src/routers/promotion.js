const express = require("express");
const router = express.Router();

const promotionController = require("../app/controllers/PromotionController");
const middlewareControllers = require("../app/controllers/middlewareController");

//Lấy thông tin toàn bộ km
router.get(
    "/",
    middlewareControllers.verifyTokenAndAdmin,
    promotionController.getAllPromotions
);

// Tạo km
router.post(
    "/add-promition",
    middlewareControllers.verifyTokenAndAdmin,
    promotionController.addPromotion
);

//Chinh sưa km
router.put(
    "/:id",
    middlewareControllers.verifyTokenAndAdmin,
    promotionController.editPromotion
);

// Xoá km
router.delete(
    "/:id",
    middlewareControllers.verifyTokenAndAdmin,
    promotionController.deletePromotion
);

module.exports = router;
