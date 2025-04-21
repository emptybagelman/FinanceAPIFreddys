const { Router } = require("express");
const controller = require("../controller/TransactionController");
const router = Router();

router.get("/", controller.index)
router.get("/:id", controller.findById)
router.get("/card/:card_id", controller.findAllByCardId)
router.get("/:user_id", controller.findAllByUserId)
router.get("/:user_id/payee/:payee", controller.findAllByPayee)
router.post("/", controller.create)
router.patch("/:id", controller.update)
router.delete("/:id", controller.destroy)


module.exports = router;