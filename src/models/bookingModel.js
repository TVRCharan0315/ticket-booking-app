class Booking {
  constructor(name, event, tickets) {
    this.name = name;
    this.event = event;
    this.tickets = tickets;
    this.date = new Date().toISOString();
  }
}

module.exports = Booking;
