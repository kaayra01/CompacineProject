const router = require("express").Router();

const ticketController = require("../controllers/ticketController");

router.route("/tickets").post((req, res) => ticketController.create(req, res));

router.route("/tickets").get((req, res) => ticketController.getAll(req, res));

router.route("/tickets/:id").get((req, res) => ticketController.get(req, res));

router
  .route("/tickets/:id")
  .delete((req, res) => ticketController.delete(req, res));

router
  .route("/tickets/:id")
  .put((req, res) => ticketController.update(req, res));

module.exports = router;
