import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
/*
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
 */

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
        path: '/redirect/:path(.*)',
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/ip-mac-port',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/ip-mac-port/index'),
        name: 'IP-MAC-Port',
        meta: { title: 'IP-MAC-Port', icon: '087-display', affix: true }
      }
    ]
  },
  {
    path: '/taglist',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/taglist/index'),
        name: 'TAG List',
        meta: { title: 'TAG List', icon: '055-price-tags', noCache: true }
      }
    ]
  },
  {
    path: '/alarms',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/alarm/index'),
        name: 'Alarms',
        meta: { title: 'Alarms', icon: '081-alarm', noCache: true }
      }
    ]
  },
  {
    path: '/dynamicrange',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dynrange/index'),
        name: 'Dynamic Range',
        meta: { title: 'Dynamic Range', icon: '140-enlarge2', noCache: true }
      }
    ]
  },
  {
    path: '/lookouttags',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/lookouttags/index'),
        name: 'Lookout Tags',
        meta: { title: 'Lookout Tags', icon: '207-eye', noCache: true }
      }
    ]
  },
  {
    path: '/failsafeoutputs',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/failsafetag/index'),
        name: 'Failsafe Outputs',
        meta: { title: 'Failsafe Outputs', icon: '146-wrench', noCache: true }
      }
    ]
  },
  {
    path: '/statelessfiltering',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'Stateless Filtering',
    meta: { title: 'Stateless Filtering', icon: '348-filter', noCache: true },
    children: [
      {
        path: '/allowedprotocols',
        // component: () => import('@/views/permission/page'),
        name: 'Allowed Protocols',
        meta: {
          title: 'Allowed Protocols'
        }
      },
      {
        path: '/allowedports',
        // component: () => import('@/views/permission/directive'),
        name: 'Allowed Ports',
        meta: {
          title: 'Allowed Ports'
        }
      },
      {
        path: '/blacklist',
        // component: () => import('@/views/permission/role'),
        name: 'IP Blacklist',
        meta: {
          title: 'IP Blacklist'
        }
      },
      {
        path: '/whitelist',
        // component: () => import('@/views/permission/role'),
        name: 'IP Whitelist',
        meta: {
          title: 'IP Whitelist'
        }
      },
      {
        path: '/datadiode',
        // component: () => import('@/views/permission/role'),
        name: 'Data Diode',
        meta: {
          title: 'Data Diode'
        }
      }
    ]
  },
  {
    path: '/configuration',
    component: Layout,
    children: [
      {
        path: 'index',
        // component: () => import('@/views/profile/index'),
        name: 'Configuration',
        meta: { title: 'Configuration', icon: '150-cogs', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /*
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
*/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
