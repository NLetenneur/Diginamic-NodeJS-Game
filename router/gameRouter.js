const {
  cheat,
  playRock,
  playPaper,
  playScissors,
  restart,
  score,
} = require("../controller/gameController");

const express = require("express");
const router = express.Router();

router.get(`/game/pierre`, playRock);
router.get(`/game/papier`, playPaper);
router.get(`/game/ciseaux`, playScissors);
router.get("/game/score", score);
router.post("/game/restart", restart);
router.delete(`/game/cheat`, cheat);

module.exports = router;
