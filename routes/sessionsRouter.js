const router = require("express").Router();

const sessionController = require("../controllers/sessionController");

router
  .route("/sessions")
  .post((req, res) => sessionController.create(req, res));

router.route("/sessions").get((req, res) => sessionController.getAll(req, res));

router
  .route("/sessions/:id")
  .get((req, res) => sessionController.get(req, res));

router
  .route("/sessions/:id")
  .delete((req, res) => sessionController.delete(req, res));

router
  .route("/sessions/:id")
  .put((req, res) => sessionController.update(req, res));

module.exports = router;
