<template>
  <div class="">
    分享短链接：<el-link :href="`http://${shortUrl}`" target="_blank">{{ shortUrl }}</el-link>
  </div>
</template>

<script>
import { shortUrlService } from '@/services'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      shortUrl: ''
    }
  },
  mounted() {
    // 获取短链接
    this.getShortUrl()
  },
  methods: {
    getShortUrl() {
      shortUrlService.postModel({ url: 'http://localhost:9527/admin/login?redirect=%2Fstory%2Findex%2F' })
        .then(response => {
          this.shortUrl = response.data.shortUrl
        })
        .catch(error => {
          this.loading = false
          Message({
            message: error.data.message,
            type: 'error',
            duration: 5 * 1000
          })
        })
    }
  }
}
</script>

<style lang="scss">

</style>
