import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/operationLog', params)
}

internals.getAll = () => {
  return http.get('api/operationLog/all')
}

internals.getModel = (id) => {
  return http.put(`api/operationLog/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/operationLog', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/operationLog/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/operationLog/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/operationLog/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/operationLog/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/operationLog/${id}/disable`)
}

export default internals
