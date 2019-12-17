const request = require('supertest')
const server = require('../server')

afterAll(() => {
    server.close()
  });

describe('Testing Projects Functionality', () => {
    it('test project action authorization', async() => {
        //testing middleware token validation
        const res1 = await request(server).get('/projects/')
        expect(res1.statusCode).toEqual(401)
        const res2 = await request(server).get('/projects/1')
        expect(res2.statusCode).toEqual(401)
        const res3 = await request(server).post('/projects').send({asdjnac:'adcasdc'})
        expect(res3.statusCode).toEqual(401)
        const res4 = await request(server).patch('/projects/1').send({asdcasdc:'ascasdc'})
        expect(res4.statusCode).toEqual(401)
        const res5 = await request(server).delete('/projects/1')
        expect(res5.statusCode).toEqual(401)
    })
    it('test creation of project', async() => {
        const auth1 = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        const res1 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth1.body.token}`}).send({name:'luke_test', description:'asjdcniansdcjknasdcnasdcnasdc',completed:true,team:'jedi'})
        expect(res1.statusCode).toEqual(200)
        const auth2 = await request(server).post('/users/login').send({username:'vader',password:'password103'})
        const res2 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth2.body.token}`}).send({name:'vader_test', description:'asdcasdcedshbncjasdcasdcasdca',completed:false,team:'sith'})   
        expect(res2.statusCode).toEqual(200)
    })
    it('test fetching of project', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        //fetching all projects
        const res1 = await request(server).get('/projects/').set({Authorization:`Bearer ${auth.body.token}`})
        //fetching project by id
        const res2 = await request(server).get('/projects/1').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res1.statusCode).toEqual(200)
        expect(res1.body.length).toEqual(1)
        expect(res2.statusCode).toEqual(200)    
    })
    it('test updating of project', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        const res = await request(server).patch('/projects/1').set({Authorization:`Bearer ${auth.body.token}`}).send({completed:false})
        expect(res.statusCode).toEqual(200)
    })
    it('test deleting of project', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        await request(server).post('/projects/').set({Authorization:`Bearer ${auth.body.token}`}).send({name: 'luke_test_2', description:'acjasdiciasudcansdc', complete:true, team:'jedi'})
        const res = await request(server).delete('/projects/3').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res.statusCode).toEqual(200)
    })
    it('testing project validation', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        //creating project with little name
        const res1 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", complete:true, team:'jedi'})
        expect(res1.statusCode).toEqual(400)
        //creating project with little description
        const res2 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", complete:true, team:'jedi'})  
        expect(res2.statusCode).toEqual(400)
        //creating project for different team
        const res3 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", complete:true, team:'sith'})
        expect(res3.statusCode).toEqual(401)
        //create project without name
        const res4 = await request(server).post('/projects/').set({Authorization:`Bearer ${auth.body.token}`}).send({description:"jnacijnasidcniasdnciasndc", complete:true, team:'jedi'})
        expect(res4.statusCode).toEqual(400)
        //fetching project that doesnt belong to your team
        const res5 = await request(server).get('/projects/2').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res5.statusCode).toEqual(404)

    })
})