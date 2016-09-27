import db from '../config/pgDb'

const Todo = db.Model.extend({
  tableName: 'todos',
  hasTimestamps: true,
})

export default db.model('Todo', Todo)
