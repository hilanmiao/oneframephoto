<template>
  <section class="hero is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar is-fixed-top is-warning">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-white">
              <img src="~assets/image/logo.png" alt="">
              一帧照片
            </a>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container">
        <waterfall
          ref="waterfall"
          :line-gap="200"
          :watch="list"
          :grow="grow"
        >
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in list"
            :key="index"
            :width="item.width"
            :height="item.height"
            :order="index"
          >
            <figure>
              <div class="image-container">
                <a href="">
                  <img :src="item.photo" alt="">
                </a>
                <div class="content" />
              </div>
            </figure>
          </waterfall-slot>
        </waterfall>
      </div>
    </div>
  </section>
</template>

<script>
import path from 'path'
import _ from 'lodash'
import axios from 'axios'
import Waterfall from '~/components/vue-waterfall/waterfall'
import WaterfallSlot from '~/components/vue-waterfall/waterfall-slot'

export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  async asyncData ({ params }) {
    const serverUrl = process.env.SERVER_URL
    const { data } = await axios.get(`${serverUrl}/api/common/story`)
    data.rows.forEach((item) => {
      const extName = path.extname(item.photo)
      const baseName = path.basename(item.photo, extName)
      const arrayBaseName = _.words(baseName)
      item.width = arrayBaseName[0]
      item.height = arrayBaseName[2]
    })
    return { list: data.rows }
  },
  data () {
    return {
      grow: [2, 2, 2],
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .hero {
    .navbar {
      background-color: #ffdd57;
    }
    .hero-body {
      .image-container {
        padding: 10px;
        img {
          border-radius: 4px;
        }
      }
    }
  }
</style>
