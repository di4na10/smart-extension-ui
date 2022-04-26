import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/devices',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'Devices',
    meta: { title: 'Devices', icon: '087-display', noCache: true },
    children: [
      {
        path: '/hosts',
        component: () => import('@/views/ip-mac-port/index'),
        name: 'Hosts',
        meta: { title: 'Hosts' }
      },
      {
        path: '/PLC_systems',
        component: () => import('@/views/plc_systems/index'),
        name: 'PLC Systems',
        meta: { title: 'PLC Systems' }
      },
      {
        path: '/SCADA_systems',
        component: () => import('@/views/scada_systems/index'),
        name: 'SCADA Systems',
        meta: { title: 'SCADA Systems' }
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
    path: '/packets',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/packets/index'),
        name: 'Packets',
        meta: { title: 'Packets', icon: '070-envelop', noCache: true }
      }
    ]
  },
  {
    path: '/PLC_packets',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/plc_packets/index'),
        name: 'PLC Packets',
        meta: { title: 'PLC Packets', icon: '276-enter', noCache: true }
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
    path: '/parameters',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/parameters/index'),
        name: 'Parameters',
        meta: { title: 'Parameters', icon: '148-equalizer2', noCache: true }
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
        path: '/IP_whitelist',
        component: () => import('@/views/ip_whitelist/index'),
        name: 'IP Whitelist',
        meta: {
          title: 'IP Whitelist'
        }
      },
      {
        path: '/Notify_whitelist',
        component: () => import('@/views/notify_whitelist/index'),
        name: 'Notify Whitelist',
        meta: {
          title: 'Notify Whitelist'
        }
      },
      {
        path: '/Read_whitelist',
        component: () => import('@/views/read_whitelist/index'),
        name: 'Read Whitelist',
        meta: {
          title: 'Read Whitelist'
        }
      },
      {
        path: '/Write_whitelist',
        component: () => import('@/views/write_whitelist/index'),
        name: 'Write Whitelist',
        meta: {
          title: 'Write Whitelist'
        }
      },
      {
        path: '/IP_blacklist',
        component: () => import('@/views/ip_blacklist/index'),
        name: 'IP Blacklist',
        meta: {
          title: 'IP Blacklist'
        }
      }
    ]
  },
  {
    path: '/configuration',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'Configuration',
    meta: { title: 'Configuration', icon: '150-cogs', noCache: true },
    children: [
      {
        path: '/Network',
        component: () => import('@/views/net_conf/index'),
        name: 'Network',
        meta: {
          title: 'Network'
        }
      },
      {
        path: '/Routes',
        component: () => import('@/views/routes/index'),
        name: 'Routes',
        meta: {
          title: 'Routes'
        }
      }
    ]
  },

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
