const { Movie: MovieModel } = require("../models/movieModel");
const { Session: SessionModel } = require("../models/sessionModel");
const { Ticket: TicketModel } = require("../models/ticketModel");

const movieController = {
  create: async (req, res) => {
    try {
      const movie = {
        title: req.body.title,
        imageURL: req.body.imageURL,
        description: req.body.description,
        cast: req.body.cast,
        genre: req.body.genre,
      };

      const movieTitle = movie.title;
      const movieImageURL = movie.imageURL;
      const movieDescription = movie.description;
      const movieCast = movie.cast;
      const movieGenre = movie.genre;

      if (
        !movieTitle ||
        !movieImageURL ||
        !movieDescription ||
        !movieCast ||
        !movieGenre
      ) {
        return res.status(400).json({ msg: "Campo obrigatório vazio" });
      }

      const response = await MovieModel.create(movie);

      res.status(201).json({ response, msg: "Filme cadastrado com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const movies = await MovieModel.find();

      res.json({ movies, total: movies.length });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await MovieModel.findById(movieId);

      if (!movie) {
        return res.status(404).json({ msg: "Filme não encontrado." });
      }

      res.json(movie);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  delete: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await MovieModel.findById(movieId);

      if (!movie) {
        return res.status(404).json({ msg: "Filme não encontrado." });
      }

      const sessions = await SessionModel.find({ movie: movieId });

      for (const session of sessions) {
        await TicketModel.deleteMany({ session: session._id });
        await SessionModel.findByIdAndDelete(session._id);
      }

      const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

      res
        .status(200)
        .json({
          deletedMovie,
          msg: "Filme, sessões e ingressos associados excluídos com sucesso!",
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const movieId = req.params.id;

      const movie = {
        title: req.body.title,
        imageURL: req.body.imageURL,
        description: req.body.description,
        cast: req.body.cast,
        genre: req.body.genre,
      };

      const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, movie);

      if (!updatedMovie) {
        return res.status(404).json({ msg: "Filme não encontrado." });
      }

      res
        .status(200)
        .json({ updatedMovie, msg: "Filme atualizado com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};

module.exports = movieController;
