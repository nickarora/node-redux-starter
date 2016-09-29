import { Router } from 'express'
import { requireAuth } from '../../services/passport'
import { Todo } from '../../models'

const router = new Router()

router.get('/', requireAuth, (req, res, next) =>
  Todo
    .findAll()
    .then(collection => collection.orderBy('-created_at').fetch())
    .then(ordered => res.status(200).json(ordered.serialize()))
    .catch(err => next(err))
)

router.put('/:id', requireAuth, (req, res, next) =>
  Todo
    .update(req.body.todo, { id: req.params.id })
    .then(updatedTodo => res.status(200).json(updatedTodo.serialize()))
    .catch(err => next(err))
)

router.post('/', requireAuth, (req, res, next) => {
  Todo
    .create(req.body.todo)
    .then(savedTodo => res.status(200).json(savedTodo.serialize()))
    .catch(err => next(err))
})

router.delete('/:id', requireAuth, (req, res, next) => {
  Todo
    .destroy({ id: req.params.id })
    .then(_emptyTodo => res.status(200).json({ id: parseInt(req.params.id, 10) }))
    .catch(err => next(err))
})

export default router
