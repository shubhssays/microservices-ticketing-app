import request from 'supertest'
import { app } from '../../app'

jest.mock('../../nats-wrapper')

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: "djjndf",
            price: 20
        })
}

it('can fetch a list of tickets', async () => {
    await createTicket()
    await createTicket()
    await createTicket()
    await createTicket()

    const response = await request(app)
        .get('/api/tickets')
        .set('Cookie', signin())
        .expect(200)
    
    expect(response.body.length).toEqual(4)    
})