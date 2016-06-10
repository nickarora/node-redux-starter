/* eslint-disable no-underscore-dangle, no-param-reassign */
const schemaTransform = (schema) => {
  const transform = (doc, ret) => {
    const newRet = {
      ...ret,
      id: ret._id,
    }

    delete newRet._id
    delete newRet.__v // version key

    return newRet
  }

  schema.options = {
    ...schema.options,
    toJSON: { transform },
    toObject: { transform },
  }

  return schema
}

export default schemaTransform
