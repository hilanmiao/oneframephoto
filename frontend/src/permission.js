import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAccessToken, getRefreshToken } from '@/utils/auth' // get token
import getPageTitle from '@/utils/get-page-title'
import { authService } from './services'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/login/social', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getAccessToken() || getRefreshToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.user.roles && store.getters.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          let user = {}
          await authService.getUserInfo()
            .then(data => {
              user = data
            })
            .catch(error => {
              throw error.data.message
            })

          // const { roles, permissions } = await store.dispatch('auth/getUserInfo')
          const { roles, permissions } = user
          // reset user info
          await store.dispatch('auth/setUserInfo', user)

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, permissions })

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('auth/clearAuth')
          // Message.error(error || 'Has Error')
          Message({
            message: error || 'Has Error',
            type: 'error',
            duration: 5 * 1000
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
