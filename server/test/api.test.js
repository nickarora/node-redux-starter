import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Todo, User } from '../models'
import { userToken } from '../util'
import server from '../server'
import db from '../config/db'

chai.use(chaiHttp)

describe('Todos', () => {
  const token = userToken({ attributes: { id: 1 } })

  beforeEach((done) => {
    db.knex.migrate.rollback()
      .then(() => db.knex.migrate.latest())
      .then(() => db.knex.seed.run())
      .then(() => done())
  })

  afterEach((done) => {
    db.knex.migrate.rollback().then(() => done())
  })

  it('should list all Todos on /api/todos GET', (done) => {
    chai.request(server)
      .get('/api/todos')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.have.length(3)
        done()
      })
  })

  it('should create a new todo on /api/todos POST', (done) => {
    chai.request(server)
      .post('/api/todos')
      .set('authorization', token)
      .send({
        todo: {
          note: 'todo4',
          complete: false,
        },
      })
      .end(() => {
        Todo.findAll().then(todos => {
          expect(todos.length).to.equal(4)
          done()
        })
      })
  })

  it('should delete a todo on /api/todos/:id DELETE', (done) => {
    Todo.findOne({ note: 'todo1' }).then(todo => {
      chai.request(server)
        .delete(`/api/todos/${todo.attributes.id}`)
        .set('authorization', token)
        .end(() => {
          Todo.findAll().then(todos => {
            expect(todos.length).to.equal(2)
            done()
          })
        })
    })
  })

  it('should update a todo on /api/todos/:id PUT', (done) => {
    Todo.findOne({ note: 'todo1' }).then(todo => {
      chai.request(server)
        .put(`/api/todos/${todo.attributes.id}`)
        .set('authorization', token)
        .send({
          todo: {
            note: 'new note',
          },
        })
        .end(() => {
          Todo.findById(todo.attributes.id).then(updatedTodo => {
            expect(updatedTodo.attributes.note).to.equal('new note')
            done()
          })
        })
    })
  })
})
