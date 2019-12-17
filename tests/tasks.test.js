const request = require('supertest')
const server = require('../server')

afterAll(() => {
    server.close()
  });

  describe('Testing Tasks Functionality', () => {
      it('test task action authorization', async() => {
           //testing middleware token validation
            const res1 = await request(server).get('/tasks/')
            expect(res1.statusCode).toEqual(401)
            const res2 = await request(server).get('/tasks/1')
            expect(res2.statusCode).toEqual(401)
            const res3 = await request(server).post('/tasks').send({asdjnac:'adcasdc'})
            expect(res3.statusCode).toEqual(401)
            const res4 = await request(server).patch('/tasks/1').send({asdcasdc:'ascasdc'})
            expect(res4.statusCode).toEqual(401)
            const res5 = await request(server).delete('/tasks/1')
            expect(res5.statusCode).toEqual(401)
      })
      it('test creation of task', async() => {
        const auth1 = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        const res1 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth1.body.token}`}).send({name:'luke_task', description:'asjdcniansdcjknasdcnasdcnasdc',completed:true,team:'jedi',projectid:1})
        expect(res1.statusCode).toEqual(200)
        const auth2 = await request(server).post('/users/login').send({username:'vader',password:'password103'})
        const res2 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth2.body.token}`}).send({name:'vader_task', description:'asdcasdcedshbncjasdcasdcasdca',completed:false,team:'sith',projectid:2})   
        expect(res2.statusCode).toEqual(200)
      })
      it('test fetching of task', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        //fetching all tasks
        const res1 = await request(server).get('/tasks/').set({Authorization:`Bearer ${auth.body.token}`})
        //fetching task by id
        const res2 = await request(server).get('/tasks/1').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res1.statusCode).toEqual(200)
        expect(res1.body.length).toEqual(1)
        expect(res2.statusCode).toEqual(200)  
      })
      it('test updating of task', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        const res = await request(server).patch('/tasks/1').set({Authorization:`Bearer ${auth.body.token}`}).send({completed:false})
        expect(res.statusCode).toEqual(200)  
      })
      it('test deleting of task', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({name: 'luke_task_2', description:'acjasdiciasudcansdc', completed:true, team:'jedi', projectid:1})
        const res = await request(server).delete('/tasks/3').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res.statusCode).toEqual(200)
      })
      it('testing task validation', async() => {
        const auth = await request(server).post('/users/login').send({username:'luke',password:'password101'})
        //creating task with little name
        const res1 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", completed:true, team:'jedi', projectid:1})
        expect(res1.statusCode).toEqual(400)
        //creating task with little description
        const res2 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", completed:true, team:'jedi', projectid:1})  
        expect(res2.statusCode).toEqual(400)
        //creating task for different team
        const res3 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'as',description:"jnacijnasidcniasdnciasndc", completed:true, team:'sith', projectid:2})
        expect(res3.statusCode).toEqual(401)
        //create task without name
        const res4 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({description:"jnacijnasidcniasdnciasndc", completed:true, team:'jedi', projectid:1})
        expect(res4.statusCode).toEqual(400)
        //fetching task that doesnt belong to your team
        const res5 = await request(server).get('/tasks/2').set({Authorization:`Bearer ${auth.body.token}`})
        expect(res5.statusCode).toEqual(404)
        //creating task for project not owned
        const res6 = await request(server).post('/tasks/').set({Authorization:`Bearer ${auth.body.token}`}).send({name:'asdcasd',description:"jnacijnasidcniasdnciasndc", completed:true, team:'jedi',projectid:2})
        expect(res6.statusCode).toEqual(401)
    })
  })