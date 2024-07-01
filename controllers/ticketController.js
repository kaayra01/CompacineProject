const { Ticket: TicketModel } = require("../models/ticketModel");
const { Session: SessionModel } = require("../models/sessionModel");

const ticketController = {
  create: async (req, res) => {
    try {
      const ticket = {
        session: req.body.session,
        seat: req.body.seat,
        price: req.body.price,
      };

      const sessionId = ticket.session;
      const ticketSeat = ticket.seat;
      const ticketPrice = ticket.price;

      if (!sessionId || !ticketSeat || !ticketPrice) {
        return res.status(400).json({ msg: "Campo obrigatório vazio" });
      }

      const session = await SessionModel.findById(sessionId);

      if (!session) {
        return res.status(404).json({ msg: "Sessão não encontrada." });
      }

      const notAvailableSeat = await TicketModel.findOne({
        session: sessionId,
        seat: ticketSeat,
      });

      if (!ticketSeat) {
        return res.status(400).json({ msg: "Cadeira não encontrada." });
      }

      if (notAvailableSeat) {
        return res.status(400).json({ msg: "Cadeira já cadastrada." });
      }

      if (session.soldTickets >= session.capacity) {
        return res.status(400).json({ msg: "Sem ingressos disponíveis." });
      }

      const ticketsSession = await TicketModel.find({ session: sessionId });

      if (ticketsSession.length >= session.capacity) {
        return res.status(400).json({ msg: "Sessão lotada." });
      }

      const response = await TicketModel.create(ticket);

      res
        .status(201)
        .json({ response, msg: "Ingresso cadastrado com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const tickets = await TicketModel.find();

      res.json({ tickets, total: tickets.length });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  get: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const ticket = await TicketModel.findById(ticketId);

      if (!ticket) {
        return res.status(404).json({ msg: "Ingresso não encontrado." });
      }

      res.json(ticket);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  delete: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const ticket = await TicketModel.findById(ticketId);

      if (!ticket) {
        return res.status(404).json({ msg: "Ingresso não encontrado." });
      }

      const deletedTicket = await TicketModel.findByIdAndDelete(ticketId);

      res
        .status(200)
        .json({ deletedTicket, msg: "Ingresso excluído com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const ticketId = req.params.id;

      const ticket = {
        seat: req.body.seat,
        price: req.body.price,
        sold: req.body.sold,
      };

      const sessionId = ticket.session;
      const ticketSeat = ticket.seat;
      const notAvailableTicketSeat = await TicketModel.findOne({
        session: sessionId,
        seat: ticketSeat,
      });

      if (!ticketSeat) {
        return res.status(400).json({ msg: "Cadeira não encontrada." });
      }

      if (notAvailableTicketSeat) {
        return res.status(400).json({ msg: "Cadeira já ocupada." });
      }

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        ticketId,
        ticket
      );

      if (!updatedTicket) {
        return res.status(404).json({ msg: "Ingresso não encontrado." });
      }

      res
        .status(200)
        .json({ updatedTicket, msg: "Ingresso atualizado com sucesso!" });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};

module.exports = ticketController;
