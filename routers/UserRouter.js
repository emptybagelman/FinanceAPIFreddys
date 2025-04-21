const { Router } = require("express");
const controller = require("../controller/UserController");
const router = Router();

router.get("/", controller.index)
router.get("/:id", controller.findById)
router.get("/:email", controller.findByEmail)
router.post("/", controller.create)
router.patch("/:id", controller.update)


module.exports = router;