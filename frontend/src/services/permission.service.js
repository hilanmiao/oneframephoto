import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/permission', params)
}

internals.getAll = () => {
  return http.get('api/permission/all')
}

internals.getModel = (id) => {
  return http.put(`api/permission/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/permission', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/permission/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/permission/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/permission/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/permission/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/permission/${id}/disable`)
}

internals.createPermissionsByRoleId = (payload) => {
  return http.post(`api/permission/createPermissionsByRoleId`, payload)
}

internals.getListByRoleId = (params) => {
  return http.get('api/permission/getListByRoleId', params)
}

export default internals
