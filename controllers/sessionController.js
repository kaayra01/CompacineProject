const { Session: SessionModel } = require("../models/sessionModel");
const { Movie: MovieModel } = require("../models/movieModel");
const { Ticket: TicketModel } = require("../models/ticketModel");

const sessionController = {
  create: async (req, res) => {
    try {
      const session = {
        movie: req.body.movie,
        capacity: req.body.capacity,
        room: req.body.room,
        time: req.body.time,
      };

      const sessionMovieId = session.movie;
      const sessionCapacity = session.capacity;
      const sessionRoom = session.room;
      const sessionTime = session.time;

      if (!sessionMovieId || !sessionCapacity || !sessionRoom || !sessionTime) {
        return res.status(400).json({ msg: "Campo obrigatório vazio" });
      }

      const movieId = await MovieModel.findById(sessionMovieId);

      if (!movieId) {
        return res.status(404).json({ msg: "Filme não encontrado." });
      }

      const response = await SessionModel.create(session);

      res.status(201).json({ response, msg: "Sessão cadastrada com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const sessions = await SessionModel.find();

      res.json({ sessions, total: sessions.length });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const session = await SessionModel.findById(sessionId);

      if (!session) {
        return res.status(404).json({ msg: "Sessão não encontrada." });
      }

      res.json(session);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  delete: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const session = await SessionModel.findById(sessionId);

      if (!session) {
        return res.status(404).json({ msg: "Sessão não encontrada." });
      }

      await TicketModel.deleteMany({ session: sessionId });

      const deletedSession = await SessionModel.findByIdAndDelete(sessionId);

      res
        .status(200)
        .json({
          deletedSession,
          msg: "Sessão e ingressos associados excluídos com sucesso!",
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const sessionId = req.params.id;

      const session = {
        capacity: req.body.capacity,
        room: req.body.room,
        time: req.body.time,
      };

      const currentSession = await SessionModel.findById(sessionId);

      if (!currentSession) {
        return res.status(404).json({ msg: "Sessão não encontrada." });
      }

      const currentSessionSoldTickets = currentSession.soldTickets;
      const newSessionCapacity = session.capacity;
      const updatedSession = await SessionModel.findByIdAndUpdate(
        sessionId,
        session
      );

      if (newSessionCapacity < currentSessionSoldTickets) {
        return res
          .status(400)
          .json({
            msg: "A nova capacidade não pode ser menor do que o número de ingressos vendidos.",
          });
      }

      res
        .status(200)
        .json({ updatedSession, msg: "Sessão atualizada com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};

module.exports = sessionController;
