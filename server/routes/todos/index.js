import { Router } from 'express'
import { Todo } from '../../models'
import pgTodo from '../../models/pgTodo'

const router = new Router()

router.get('/', (req, res, next) =>
  Todo.find({}).sort({ createdAt: 'desc' })
    .then(
      todos => {
        pgTodo.findAll()
          .then(collection => {
            console.log('pg', collection.models.map(model => model.attributes))
            console.log('mongo', todos)
            return res.status(200).json(collection.models.map(model => model.attributes))
          })
      },
      err => next(err)
    )
)

router.put('/:id', (req, res, next) =>
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    req.body.todo,
    { new: true }
  ).then(
    updatedTodo => res.status(200).json(updatedTodo),
    err => next(err)
  )
)

router.post('/', (req, res, next) => {
  const { todo } = req.body
  const newTodo = new Todo({
    note: todo.note,
    complete: todo.complete,
  })

  newTodo.save()
  .then(
    insertedTodo => res.status(200).json(insertedTodo),
    err => next(err)
  )
})

router.delete('/:id', (req, res, next) => {
  Todo.findOneAndRemove({ _id: req.params.id })
  .then(
    deletedTodo => res.status(200).json(deletedTodo),
    err => next(err)
  )
})


export default router
