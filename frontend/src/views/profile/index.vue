<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="4" :xs="24">
          <user-card :active-menu.sync="activeMenu" />
        </el-col>

        <el-col :span="20" :xs="24">
          <el-card>
            <set-account v-show="activeMenu === 'account'" />
            <set-profile v-show="activeMenu === 'profile'" />
            <operation-log v-show="activeMenu === 'operationLog'" />
            <authenticate v-show="activeMenu === 'authenticate'" />
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import SetAccount from './components/SetAccount'
import SetProfile from './components/SetProfile'
import OperationLog from './components/OperationLog'
import Authenticate from './components/Authenticate'

export default {
  name: 'Profile',
  components: { SetProfile, SetAccount, UserCard, OperationLog, Authenticate },
  data() {
    return {
      activeMenu: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {

  },
  methods: {

  }
}
</script>
