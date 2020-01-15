import store from '@/store'
import _ from 'lodash'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const user = store.getters && store.getters.user

    // 超级管理员拥有所有权限
    if (user.role.name === '超级管理员') {
      return true
    }

    // flattenDeep扁平数组所有元素为一维为止
    const roles = _.flatMapDeep(user.role)
    // 筛选成新的数组
    const buttons = _(roles).filter({ type: 'b' }).map('identification').value()

    if (value && value instanceof Array && value.length > 0) {
      const permissionButtons = value

      const hasPermission = buttons.some(button => {
        return permissionButtons.includes(button)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['sys:user:add','sys:user:delete']"`)
    }
  }
}
