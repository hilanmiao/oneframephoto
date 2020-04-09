<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="4" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="20" :xs="24">
          <el-card>
              <account :user="user" v-show="activeTab === 'account'" />
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
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
