<template>
  <el-card style="margin-bottom:20px;">
    <!--    <div slot="header" class="clearfix">-->
    <!--      <span>About me</span>-->
    <!--    </div>-->

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb image="https://avatars2.githubusercontent.com/u/27052900?s=460&u=70a84e4917cdbd8d34e332de94e3bd52894380c1&v=4" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">administrator</div>
        <div class="user-role text-center text-muted">超级管理员</div>
      </div>
    </div>

    <div class="user-bio">
<!--      <div class="user-education user-bio-section">-->
<!--        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>介绍</span></div>-->
<!--        <div class="user-bio-section-body">-->
<!--          <div class="text-muted">-->
<!--            JS in Computer Science from the University of Technology-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="user-skills user-bio-section">
<!--        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>账号管理</span></div>-->
        <div class="user-bio-section-body">
          <el-menu
            default-active="1"
            class=""
          >
            <el-menu-item index="1">
              <i class="el-icon-menu" />
              <strong slot="title">账号绑定</strong>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting" />
              <strong slot="title">个人信息</strong>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting" />
              <strong slot="title">操作记录</strong>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting" />
              <strong slot="title">实名认证</strong>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }

 .el-menu {
   border:none;
   .el-menu-item {
     border-radius: 8px 0 0 8px;
     font-size: 16px;
     margin-bottom: 8px;
     &:hover {
       background-color: transparent;
     }
     &:after {
       display: block;
       content: "";
       position: absolute;
       bottom: 0;
       right: 0;
       width: 0;
       height: 0;
       border-top: 28px solid #fff;
       border-bottom: 28px solid #fff;
       border-left: 15px solid transparent;
     }
     &.is-active {
       color: #fff;
       background: rgba(240,20,20,.8);
     }

     [class^="el-icon-"] {
       margin-right: 15px;
     }
   }
 }
</style>
