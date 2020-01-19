import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// TODO: 固定两级菜单，请严格按照例子格式书写路由、权限等

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/login/social',
    component: () => import('@/views/login/login-social'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/user',
    alwaysShow: true, // will always show the root menu
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: 'lock',
      identification: 'sys',
      type: 'd'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'SysUser',
        meta: {
          title: '用户管理',
          identification: 'sys:user',
          type: 'm'
        }
      },
      {
        path: 'department',
        component: () => import('@/views/permission/role'),
        name: 'SysDepartment',
        meta: {
          title: '部门管理',
          identification: 'sys:department',
          type: 'm'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/role/index'),
        name: 'SysRole',
        meta: {
          title: '角色管理',
          identification: 'sys:role',
          type: 'm'
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/permission/index'),
        name: 'SysPermission',
        meta: {
          title: '权限管理',
          identification: 'sys:permission'
        },
        hidden: true
      },
      {
        path: 'dictionary',
        component: () => import('@/views/dictionary/index'),
        name: 'SysDictionary',
        meta: {
          title: '字典管理',
          identification: 'sys:dictionary',
          type: 'm'
        }
      },
      {
        path: 'log',
        component: () => import('@/views/log/index'),
        name: 'SysLog',
        meta: {
          title: '日志管理',
          identification: 'sys:log',
          type: 'm'
        }
      }
    ]
  },
  {
    path: '/story',
    component: Layout,
    redirect: '/story/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/story/index'),
        name: 'Story',
        meta: {
          title: '故事管理',
          icon: 'user',
          noCache: true,
          identification: 'story:index',
          type: 'm'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncPermissionsButton
 * the button permissions that need to be dynamically loaded based on user roles
 * 根据用户角色动态加载的按钮权限
 * @type {Array}
 */
export const asyncPermissionsButton = [
  {
    module: 'sys:user',
    buttons: [
      {
        type: 'b',
        identification: 'sys:user:add',
        title: '添加'
      },
      {
        type: 'b',
        identification: 'sys:user:edit',
        title: '编辑'
      },
      {
        type: 'b',
        identification: 'sys:user:delete',
        title: '删除'
      },
      {
        type: 'b',
        identification: 'sys:user:import',
        title: '导入'
      },
      {
        type: 'b',
        identification: 'sys:user:export',
        title: '导出'
      }
    ]
  }
]

/**
 * asyncPermissionsApi
 * the API permissions that need to be dynamically loaded based on user roles
 * 根据用户角色动态加载的Api权限
 * @type {Array}
 */
export const asyncPermissionApi = []

const createRouter = () => new Router({
  // TODO: 二级域名
  base: '/admin/',
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
