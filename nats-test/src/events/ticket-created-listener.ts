
import { Message } from 'node-nats-streaming';
import { Listener } from  '@devshubhs_micro_ta/common'
import { TicketCreatedEvent } from '@devshubhs_micro_ta/common';
import { Subjects } from '@devshubhs_micro_ta/common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    // readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service'

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data)

        msg.ack()
    }
}