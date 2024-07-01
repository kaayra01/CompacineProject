const router = require("express").Router();

const moviesRouter = require("./moviesRoutes");
const sessionsRouter = require("./sessionsRouter");
const ticketsRouter = require("./ticketsRouter");

router.use("/", moviesRouter);
router.use("/", sessionsRouter);
router.use("/", ticketsRouter);

module.exports = router;
