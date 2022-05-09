import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { natsWrapper } from "../../nats-wrapper"

it('returns 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', signin())
        .send({
            title: "dsjnsj",
            price: 40
        })
        .expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "dsjnsj",
            price: 40
        })
        .expect(401)
})

it('returns 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', signin())
        .send({
            title: "dsjnsj",
            price: 40
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signin())
        .send({
            title: "dsjnddsj",
            price: 300
        })
        .expect(401)
})

it('returns 400 if the user provides an invalid title or price', async () => {
    const cookie = signin()
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsj",
            price: 40
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "",
            price: 40
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "sfgdgs",
            price: -40
        })
        .expect(400)
})

it('updates the ticket provided valid input', async () => {
    const cookie = signin()
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsj",
            price: 40
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsjasdfasf",
            price: 40
        })
        .expect(200)

    const tr1 = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(tr1.body.title).toEqual('dsjnsjasdfasf')
    expect(tr1.body.price).toEqual(40)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsjasdfasf",
            price: 400
        })
        .expect(200)

    const tr2 = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(tr2.body.title).toEqual('dsjnsjasdfasf')
    expect(tr2.body.price).toEqual(400)
})

it('publishes an event', async () => {
    const cookie = signin()
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsj",
            price: 40
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsjasdfasf",
            price: 40
        })
        .expect(200)

    const tr1 = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(tr1.body.title).toEqual('dsjnsjasdfasf')
    expect(tr1.body.price).toEqual(40)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "dsjnsjasdfasf",
            price: 400
        })
        .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})

