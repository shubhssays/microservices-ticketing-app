import { Publisher, Subjects, TicketUpdatedEvent } from "@devshubhs_micro_ta/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

