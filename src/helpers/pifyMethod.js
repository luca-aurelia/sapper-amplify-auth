import pify from 'pify'

export default (object, methodName) => {
  const boundMethod = object[methodName].bind(object)
  object[methodName] = pify(boundMethod)
}
