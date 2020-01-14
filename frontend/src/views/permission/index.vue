<template>
  <div class="app-container">
    <el-row style="margin-bottom: 30px;">
      <router-link to="/sys/role">
        <el-button type="text" icon="el-icon-back">返回角色管理页面</el-button>
      </router-link>
      <!--角色信息-->
      <span class="page-title">编辑角色的权限：<el-tag type="info">{{ role.name }}</el-tag></span>
    </el-row>

    <el-row :gutter="20">
      <!--菜单权限树-->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            <div class="title-box" style="padding-top: 10px; padding-bottom: 13px;">
              <span><el-tag effect="dark" type="success">菜单&按钮</el-tag>&nbsp;权限元数据</span>
              <el-button type="danger" size="mini" round icon="el-icon-check" @click="updateData">保存</el-button>
            </div>
            <span class="tips-text">提示：勾选权限后记得点击保存按钮</span>
          </div>
          <el-input
            v-model="filterText"
            class="mgb-15"
            placeholder="输入关键字进行过滤"
          />
          <el-tree
            ref="menuTree"
            :filter-node-method="filterNode"
            :check-strictly="checkStrictly"
            :data="routesData"
            show-checkbox
            default-expand-all
            node-key="identification"
            highlight-current
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>
                <span>{{ data.title }}</span>
                <span class="mgl-10 tips-text">{{ data.identification }}</span>
                <el-tag v-if="data.type === 'd'" class="mgl-10" effect="dark" type="info" size="mini">目录</el-tag>
                <el-tag v-else-if="data.type === 'm'" class="mgl-10" effect="dark" type="warning" size="mini">菜单</el-tag>
                <el-tag v-else-if="data.type === 'b'" class="mgl-10" effect="dark" type="success" size="mini">按钮</el-tag>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>

      <!--接口权限树-->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header">
            <div class="title-box" style="padding-top: 10px; padding-bottom: 13px;">
              <span><el-tag effect="dark" type="primary">接口</el-tag>&nbsp;权限元数据</span>
              <el-button type="danger" size="mini" round icon="el-icon-check">保存</el-button>
            </div>
            <span class="tips-text">提示：勾选权限后记得点击保存按钮</span>
          </div>
          <el-input
            v-model="filterText"
            class="mgb-15"
            placeholder="输入关键字进行过滤"
          />
          <el-tree
            ref="apiTree"
            :filter-node-method="filterNode"
            :check-strictly="checkStrictly"
            :data="routesData"
            show-checkbox
            default-expand-all
            node-key="identification"
            highlight-current
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>
                <span>{{ data.title }}</span>
                <span class="mgl-10 tips-text">{{ data.identification }}</span>
                <el-tag class="mgl-10" effect="dark" type="primary" size="mini">接口</el-tag>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>

    <!-- 限制两级菜单，所以下面很多代码没有用递归 -->
  </div>
</template>

<script>
import { asyncRoutes, asyncPermissionsButton, asyncPermissionApi } from '@/router'
import { permissionService } from '@/services'
import debounce from 'lodash/debounce'

// TODO：因为使用了父子不关联的方式，所以下面很多代码都不需要了。因为父子关联在半选状态时，父级不算被选中，checked数组中没有，导致赋值有点麻烦，
//  如：数据库表中存的仅仅是sys:user，但是没有sys，父子关联的话需要再手动判断添加sys一级目录，而且还得是半选状态，比较麻烦。
//  而且左侧动态菜单也是固定的结构，如：sys、sys:user...，sys一级目录是必定需要的，所以直接不关联是最简单的。

export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      filterText: '',
      role: this.$route.params.role,
      // 采用父子不关联方式
      checkStrictly: true,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      routes: []
    }
  },

  computed: {
    routesData() {
      return this.routes
    }
  },

  watch: {
    'filterText': debounce(function(val) {
      this.$refs.menuTree.filter(val)
    }, 600)
  },

  created() {
  },

  mounted() {
    if (this.role) {
      this.getRoutes()
      this.getApis()
    }
  },

  destroyed() {
  },

  methods: {
    filterNode(value, data) {
      console.log(value, data)
      if (!value) return true
      return data.title.indexOf(value) !== -1 || data.identification.indexOf(value) !== -1
    },
    getApis() {
      const apis = asyncPermissionApi
      console.log(apis)
    },
    getRoutes() {
      this.routes = this.generateRoutes(asyncRoutes)
      console.log(this.routes)

      // 采用父子不关联方式
      // this.checkStrictly = true
      this.$nextTick(async() => {
        // 获取服务端权限列表,并更新
        this._getListByRoleId(this.role.id).then(response => {
          // 因为使用了父子不关联的方式，下面代码不再需要
          this.$refs.menuTree.setCheckedNodes(response)

          // 匹配路由
          // const routes = this.filterRoutes(response)
          // console.log(routes)
          // this.$refs.menuTree.setCheckedNodes(this.generateArr(routes))
          // set checked state of a node not affects its father and child nodes
          // this.checkStrictly = false
        })
      })
    },
    filterRoutes(permissions) {
      // 3级的数组
      const routes = this.generateRoutes(asyncRoutes)

      // 筛选1级目录或菜单(半选状态是没有提交父节点的)
      const routesFilter = []
      routes.forEach(route => {
        if (route.onlyOneShowingChild || route.type === 'd') {
          if (permissions.some(permission => permission.identification === route.identification)) {
            routesFilter.push(route)
          }
        }
      })
      console.log(routesFilter)

      // 筛选2级菜单或目录
      routesFilter.forEach(route => {
        if (!route.onlyOneShowingChild) {
          const children = []
          route.children.forEach((routeChildren) => {
            if (permissions.some(permission => permission.identification === routeChildren.identification)) {
              children.push(routeChildren)
            }
          })

          route.children = children
        }
      })

      console.log(routesFilter)

      // 筛选3级按钮
      routesFilter.forEach(route => {
        if (!route.onlyOneShowingChild) {
          route.children.forEach(routeChildren => {
            const children = []
            routeChildren.children.forEach((routeChildrenBtn) => {
              if (permissions.some(permission => permission.identification === routeChildrenBtn.identification)) {
                children.push(routeChildrenBtn)
              }
            })

            routeChildren.children = children
          })
        }
      })

      console.log(routesFilter)

      return routesFilter
    },
    generateRoutes(routes) {
      const res = []

      for (const route of routes) {
        if (route.hidden) {
          continue
        }

        let data = {
          children: []
        }

        if (route.children.length === 1) {
          if (route.children[0].hidden) {
            continue
          }
          data = {
            title: route.children[0].meta && route.children[0].meta.title,
            identification: route.children[0].meta.identification,
            type: route.children[0].meta.type,
            children: this.generateRouteButtons(route.children[0].meta.identification),
            onlyOneShowingChild: true
          }
        } else {
          data = {
            title: route.meta && route.meta.title,
            identification: route.meta.identification,
            type: route.meta.type,
            children: []
          }

          for (const routeChildren of route.children) {
            if (routeChildren.hidden) {
              continue
            }

            const dataChildren = {
              title: routeChildren.meta && routeChildren.meta.title,
              identification: routeChildren.meta.identification,
              type: routeChildren.meta.type,
              children: this.generateRouteButtons(routeChildren.meta.identification)
            }

            data.children.push(dataChildren)
          }
        }

        res.push(data)
      }

      return res
    },

    generateRouteButtons(module) {
      console.log(asyncPermissionsButton)

      let buttons = []

      asyncPermissionsButton.some(item => {
        if (item.module === module) {
          // 因为数组内是复杂对象，所以解构、Object.assign等方法是无效的
          buttons = JSON.parse(JSON.stringify(item.buttons))
          return true
        }
      })

      return buttons
    },

    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },

    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        // 唯一标识
        onlyOneChild.identification = onlyOneChild.meta.identification
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },

    updateData() {
      console.log(this.$refs.menuTree.getCheckedNodes())
      const permissions = this.$refs.menuTree.getCheckedNodes().map(item => {
        return {
          identification: item.identification,
          type: item.type
        }
      })
      const payload = { roleId: this.role.id, permissions }
      permissionService.createPermissionsByRoleId(payload).then(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('role.postModel-error:', error)
        this.$message({
          message: '编辑失败',
          type: 'error'
        })
      })
    },

    _getListByRoleId(roleId) {
      return new Promise((resolve, reject) => {
        const params = { roleId }
        permissionService.getListByRoleId(params).then(response => {
          resolve(response.data.rows)
        }).catch(error => {
          console.error('permission.getListByRoleId-error:', error)
          this.$message({
            message: '获取权限失败',
            type: 'error'
          })
          reject(error)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-title{
    /*font-size: 24px;*/
    font-weight: bold;
    color: #303133;
    margin-left: 30px;
  }

  .card-title {
    line-height: 50px;
    height: 50px;
  }

  .tips-text {
    font-size: 14px;
    color: #909399;
  }

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 22px;
    }
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .mgb-15 {
    margin-bottom: 15px;
  }

  .mgl-10 {
    margin-left: 10px;
  }
</style>
