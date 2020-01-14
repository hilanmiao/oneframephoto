import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/user', params)
}

internals.getAll = () => {
  return http.get('api/user/all')
}

internals.getModel = (id) => {
  return http.put(`api/user/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/user', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/user/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/user/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/user/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/user/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/user/${id}/disable`)
}

export default internals
