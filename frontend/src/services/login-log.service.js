import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/loginLog', params)
}

internals.getAll = () => {
  return http.get('api/loginLog/all')
}

internals.getModel = (id) => {
  return http.put(`api/loginLog/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/loginLog', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/loginLog/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/loginLog/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/loginLog/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/loginLog/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/loginLog/${id}/disable`)
}

export default internals
