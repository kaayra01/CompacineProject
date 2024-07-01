const router = require("express").Router();

const movieController = require("../controllers/movieController");

router.route("/movies").post((req, res) => movieController.create(req, res));

router.route("/movies").get((req, res) => movieController.getAll(req, res));

router.route("/movies/:id").get((req, res) => movieController.get(req, res));

router
  .route("/movies/:id")
  .delete((req, res) => movieController.delete(req, res));

router.route("/movies/:id").put((req, res) => movieController.update(req, res));

module.exports = router;
