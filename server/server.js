/* eslint-disable no-console */
import app from './app'

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
  console.info('Server listening on port', PORT)
})

process.on('uncaughtException', err => {
  console.error(err.stack || err)
  console.warn('Exiting process because of uncaught exception.')
  process.exit()
})

process.on('SIGTERM', err => {
  console.warn('Received SIGTERM. Shutting down.', err)
})

export default server
