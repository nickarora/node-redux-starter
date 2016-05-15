import { Router } from 'express'
import todos from './todos'

const router = new Router()
router.use('/todos', todos)

export default router
