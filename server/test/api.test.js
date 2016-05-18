import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import testData from '../tasks/fixtures/todos-test'
import seed from '../tasks/seeders/todos'

import { Todo } from '../models'

chai.use(chaiHttp)

describe('Static', () => {
  let server

  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    server = require('../server').default
  })

  afterEach((done) => {
    server.close(done)
  })

  it('responds to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
  })

  it('404s unknown paths', (done) => {
    chai.request(server)
      .get('/foo/bar')
      .end((err, res) => {
        expect(err).to.not.be.null
        expect(res).to.have.status(404)
        done()
      })
  })
})

describe('Todos', () => {
  let server

  beforeEach((done) => {
    delete require.cache[require.resolve('../server')]
    server = require('../server').default
    seed(testData, done)
  })

  afterEach((done) => {
    server.close(done)
  })

  it('should list all Todos on /api/todos GET', (done) => {
    chai.request(server)
      .get('/api/todos')
      .end((err, res) => {
        expect(res.body).to.have.length(3)
        done()
      })
  })

  it('should create a new todo on /api/todos POST', (done) => {
    chai.request(server)
      .post('/api/todos')
      .send({
        todo: {
          note: 'todo4',
          complete: false,
        },
      })
      .end(() => {
        Todo.find({}, (err, todos) => {
          expect(todos.length).to.equal(4)
          done()
        })
      })
  })

  it('should delete a todo on /api/todos/:id DELETE', (done) => {
    Todo.findOne({ note: 'todo1' }, (error, todo) => {
      chai.request(server)
        .delete(`/api/todos/${todo.id}`)
        .end(() => {
          Todo.find({}, (err, todos) => {
            expect(todos.length).to.equal(2)
            done()
          })
        })
    })
  })

  it('should update a todo on /api/todos/:id PUT', (done) => {
    Todo.findOne({ note: 'todo1' }, (error, todo) => {
      chai.request(server)
        .put(`/api/todos/${todo.id}`)
        .send({
          todo: {
            note: 'new note',
          },
        })
        .end(() => {
          Todo.findOne({ _id: todo.id }, (err, updatedTodo) => {
            expect(updatedTodo.note).to.equal('new note')
            done()
          })
        })
    })
  })
})
