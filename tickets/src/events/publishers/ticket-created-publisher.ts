import { Publisher, Subjects, TicketCreatedEvent } from "@devshubhs_micro_ta/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

