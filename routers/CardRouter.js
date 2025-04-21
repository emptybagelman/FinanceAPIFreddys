const { Router } = require("express");
const controller = require("../controller/CardController");
const router = Router();

router.get("/", controller.index)
router.get("/:id", controller.findById)
router.get("/balance/:id", controller.findBalance)
router.post("/", controller.create)
router.patch("/:id", controller.update)


module.exports = router;