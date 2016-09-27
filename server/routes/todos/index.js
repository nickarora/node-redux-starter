import { Router } from 'express'
import { Todo } from '../../models'
import pgTodo from '../../models/pgTodo'

const router = new Router()

router.get('/', (req, res, next) =>
  pgTodo
    .findAll()
    .then(collection => collection.orderBy('-created_at'))
    .then(ordered => res.status(200).json(ordered.serialize()))
    .catch(err => next(err))
)

router.put('/:id', (req, res, next) =>
  pgTodo
    .update(req.body.todo, { id: req.params.id })
    .then(updatedTodo => res.status(200).json(updatedTodo.serialize()))
    .catch(err => next(err))
)

router.post('/', (req, res, next) => {
  const { todo } = req.body

  pgTodo
    .create(todo)
    .then(savedTodo => res.status(200).json(savedTodo.serialize()))
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  Todo.findOneAndRemove({ _id: req.params.id })
  .then(
    deletedTodo => res.status(200).json(deletedTodo),
    err => next(err)
  )
})


export default router
