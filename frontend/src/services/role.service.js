import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/role', params)
}

internals.getAll = () => {
  return http.get('api/role/all')
}

internals.getModel = (id) => {
  return http.put(`api/role/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/role', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/role/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/role/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/role/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/role/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/role/${id}/disable`)
}

export default internals
