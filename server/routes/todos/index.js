import { Router } from 'express'
import { Todo } from '../../models'

const router = new Router()

router.get('/', (req, res, next) =>
  Todo.find({})
    .then(
      todos => res.status(200).json(todos),
      err => next(err)
    )
)

router.put('/', (req, res, next) =>
  Todo.findOneAndUpdate(
    { _id: req.body.todo.id },
    { note: req.body.todo.note, complete: req.body.todo.complete },
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

router.delete('/', (req, res, next) => {
  Todo.remove({ _id: req.body.todo.id })
  .then(
    deletedTodo => res.status(200).json(deletedTodo),
    err => next(err)
  )
})


export default router
