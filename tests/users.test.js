const request = require('supertest')
const server = require('../server')

afterAll(() => {
    server.close()
  });
  

describe('Testing User Functionality',() => {
    it('test creation of user', async() => {
        const res = await request(server).post('/users/register')
        .field('username','luke')
        .field('password','password101')
        .field('role','padawan')
        .field('team','jedi')
        .attach('image','/home/ismael/Projects/project_management/images/luke.png')
        expect(res.statusCode).toEqual(200)
    })
    it('test creating duplicate user', async() => {
        const res = await request(server).post('/users/register')
        .field('username','luke')
        .field('password','password101')
        .field('role','padawan')
        .field('team','jedi')
        .attach('image','/home/ismael/Projects/project_management/images/luke.png')
        expect(res.statusCode).toEqual(400)
    })
    it('test user validation', async() => {
        //testing if the model will accept name this short
        const res1 = await request(server).post('/users/register')
        .field('username','jo')
        .field('password','password101')
        .field('role','padawan')
        .field('team','jedi')
        .attach('image','/home/ismael/Projects/project_management/images/luke.png')
        expect(res1.statusCode).toEqual(400)
        //testing if the model will accept password this short
        const res2 = await request(server).post('/users/register')
        .field('username','john')
        .field('password','pass')
        .field('role','padawan')
        .field('team','jedi')
        .attach('image','/home/ismael/Projects/project_management/images/luke.png')
        expect(res2.statusCode).toEqual(400)
        //testing if the model will accept team that doesnt exist
        const res3 = await request(server).post('/users/register')
        .field('username','joaccasdc')
        .field('password','password101')
        .field('role','padawan')
        .field('team','acasdcasc')
        .attach('image','/home/ismael/Projects/project_management/images/luke.png')
        expect(res3.statusCode).toEqual(400)

    })
    it('test login user', async() => {
        const res = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        expect(res.statusCode).toEqual(200)
    })
    it('test user action authorization', async() => {
        //testing middleware token validation
        const res = await request(server).get('/users/members/')
        expect(res.statusCode).toEqual(401)
    })
    it('test get team members', async() => {
        //creating users to test with
        await request(server).post('/users/register')
        .field('username','obiwan')
        .field('password','password102')
        .field('role','jedi master')
        .field('team','jedi')
        .attach('image','/home/ismael/Projects/project_management/images/obiwan.png')

        await request(server).post('/users/register')
        .field('username','vader')
        .field('password','password103')
        .field('role','sith lord')
        .field('team','sith')
        .attach('image','/home/ismael/Projects/project_management/images/vader.png')

        //login for tokens
        const auth1 = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        const auth2 = await request(server).post('/users/login').send({username:'vader', password:'password103'})

        //auth1 has a team member
        const res1 = await request(server).get('/users/members').set({Authorization:`Bearer ${auth1.body.token}`})
        expect(res1.statusCode).toEqual(200)
        expect(res1.body.length).toEqual(2)
        //auth2 doesnt have team members
        const res2 = await request(server).get('/users/members').set({Authorization:`Bearer ${auth2.body.token}`})
        expect(res2.statusCode).toEqual(200)
        expect(res2.body.length).toEqual(1)

    })
})
