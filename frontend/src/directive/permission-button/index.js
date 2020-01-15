import permissionButton from './permission-button'

const install = function(Vue) {
  Vue.directive('permission-button', permissionButton)
}

if (window.Vue) {
  window['permission-button'] = permissionButton
  Vue.use(install); // eslint-disable-line
}

permissionButton.install = install
export default permissionButton
