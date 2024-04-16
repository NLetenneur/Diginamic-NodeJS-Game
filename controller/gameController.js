const Game = require("../model/game.js");
const choices = ["pierre", "papier", "ciseaux"];
const { Op } = require("sequelize");

const playRock = (req, res) => {
  //Choix de l'ordinateur au hasard
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  switch (computerChoice) {
    case "pierre":
      result = "égalité";
      break;
    case "papier":
      result = "perdu";
      break;
    case "ciseaux":
      result = "gagné";
  }
  const game = {
    result: result,
  };
  Game.create(game)
    .then((game) => {
      res.send(
        `Vous avez joué pierre, l'ordinateur a joué ${computerChoice}, résultat : ${result}`
      );
    })
    .catch((err) => {
      res.send(err);
    });
};

const playPaper = (req, res) => {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  switch (computerChoice) {
    case "pierre":
      result = "gagné";
      break;
    case "papier":
      result = "égalité";
      break;
    case "ciseaux":
      result = "perdu";
  }
  const game = {
    result: result,
  };
  Game.create(game)
    .then((game) => {
      res.send(
        `Vous avez joué papier, l'ordinateur a joué ${computerChoice}, résultat : ${result}`
      );
    })
    .catch((err) => {
      res.send(err);
    });
};

const playScissors = (req, res) => {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  switch (computerChoice) {
    case "pierre":
      result = "perdu";
      break;
    case "papier":
      result = "gagné";
      break;
    case "ciseaux":
      result = "égalité";
  }
  const game = {
    result: result,
  };
  Game.create(game)
    .then((game) => {
      res.send(
        `Vous avez joué ciseaux, l'ordinateur a joué ${computerChoice}, résultat : ${result}`
      );
    })
    .catch((err) => {
      res.send(err);
    });
};

const score = async (req, res) => {
  let win = await Game.count({ where: { result: "gagné" } });
  let lose = await Game.count({ where: { result: "perdu" } });
  let tie = await Game.count({ where: { result: "égalité" } });
  res.send(`win: ${win}, lose: ${lose}, tie: ${tie} `);
};

const restart = async (req, res) => {
  await Game.destroy({
    where: {
      result: {
        [Op.or]: ["gagné", "perdu", "égalité"],
      },
    },
  })
    .then(() => {
      res.send(`Résultats réinitialisés`);
    })
    .catch((err) => {
      res.send(err);
    });
};

const cheat = async (req, res) => {
  let win = req.param.win;
  let lose = req.param.lose;
  let tie = req.param.tie;
  res.send(`win: ${win}, lose: ${lose}, tie: ${tie} `);
};

module.exports = {
  cheat,
  playRock,
  playPaper,
  playScissors,
  restart,
  score,
};
