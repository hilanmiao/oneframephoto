import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/notification', params)
}

internals.getAll = () => {
  return http.get('api/notification/all')
}

internals.getModel = (id) => {
  return http.put(`api/notification/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/notification', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/notification/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/notification/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/notification/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/notification/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/notification/${id}/disable`)
}

export default internals
