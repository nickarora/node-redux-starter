import { Router } from 'express'
// import { Todo } from '../../models'
import pgTodo from '../../models/pgTodo'

const router = new Router()

router.get('/', (req, res, next) =>
  pgTodo
    .findAll()
    .then(collection => collection.orderBy('-created_at').fetch())
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
  pgTodo
    .create(req.body.todo)
    .then(savedTodo => res.status(200).json(savedTodo.serialize()))
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  pgTodo
    .destroy({ id: req.params.id })
    .then(_emptyTodo => res.status(200).json({ id: parseInt(req.params.id) }))
    .catch(err => next(err))
})

export default router
