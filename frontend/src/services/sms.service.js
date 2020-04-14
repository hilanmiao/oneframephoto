import { httpClient as http } from '../services'

const internals = {}

internals.postSendSmsCode = (payload) => {
  return http.post('api/sms/sendSmsCode', payload)
}

export default internals
