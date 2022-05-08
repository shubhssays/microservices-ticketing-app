import { Publisher } from "@devshubhs_micro_ta/common";
import { TicketCreatedEvent } from "@devshubhs_micro_ta/common";
import { Subjects } from "@devshubhs_micro_ta/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}