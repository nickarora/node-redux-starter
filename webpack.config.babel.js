import merge from 'webpack-merge'
import { sources, common, dev, prod, test } from './webpack'

const selectConfig = (target) => {
  switch (target) {
    case 'build':
      return merge.smart(sources, common, prod)
    case 'test':
    case 'test-client':
      return merge.smart(common, test)
    default:
      return merge.smart(sources, common, dev)
  }
}

export default selectConfig(process.env.npm_lifecycle_event)
