const request = require('supertest')
const server = require('../server')

afterAll(() => {
    server.close()
  });
  

describe('Testing Team Functionality', () => {
    it('test creation of team', async() => {
        //creating to different teams
        const res1 = await request(server).post('/teams/').send({name:'jedi'})
        expect(res1.statusCode).toEqual(200)
        const res2 = await request(server).post('/teams/').send({name:'sith'})
        expect(res2.statusCode).toEqual(200)
    })
    it('test creating duplicate team', async() => {
        //testing unique name validation
        const res = await request(server).post('/teams/').send({name:'jedi'})
        expect(res.statusCode).toEqual(400)
    })
    it('test team action authorization', async() => {
        //testing middleware token validation
        const res = await request(server).delete('/teams/').send({name:'sith'})
        expect(res.statusCode).toEqual(401)
    })
    it('test team validation', async() => {
        //creatiing team with name thats to short
        const res = await request(server).post('/teams/').send({name:'j'})
        expect(res.statusCode).toEqual(400)
    })
})


