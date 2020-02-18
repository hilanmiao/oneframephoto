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
          @reflowed="reflowed"
        >
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in list"
            :key="index"
            :width="item.photoWidth"
            :height="item.photoHeight"
            :order="index"
          >
            <div class="image-container">
              <figure>
                <img :src="item.photo" :alt="item.title">

                <figcaption>
                  <p>content</p>
                </figcaption>
              </figure>
            </div>
          </waterfall-slot>
        </waterfall>
        <div class="noMore">
          <p v-show="isBusy" style="margin-top:10px;" class="loading">
            loading
          </p>
          <p v-show="noMore" style="margin:10px 0;font-size:12px;color:#ccc">
            没有更多了
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Waterfall from '~/components/vue-waterfall/waterfall'
import WaterfallSlot from '~/components/vue-waterfall/waterfall-slot'

export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  async asyncData () {
    // const serverUrl = process.env.SERVER_URL
    // const { data } = await axios.get(`${serverUrl}/api/common/story`)
    // return { list: data.rows }
  },
  data () {
    return {
      grow: [3, 2, 2],
      isBusy: false,
      lastScrollTop: 0,
      list: [],
      listQuery: {
        page: 0,
        limit: 10
      },
      noMore: false
    }
  },
  mounted () {
    this.loadMore()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (e) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > this.lastScrollTop) {
        // 表示向下滚动
        this.lastScrollTop = scrollTop
        // 图片容器padding：15px
        if (scrollTop + window.innerHeight + 15 >= document.body.clientHeight) {
          this.loadMore()
        }
      }
    },
    async loadMore () {
      if (!this.isBusy) {
        this.isBusy = true
        this.listQuery.page += 1
        const { data } = await this._getList(this.listQuery)
        if (data.rows.length) {
          this.list.push(...data.rows)
        } else {
          this.isBusy = false
          this.noMore = true
        }
      }
    },

    reflowed () {
      this.isBusy = false
    },

    _getList (params) {
      return axios.get('http://localhost:7001/api/common/story', { params })
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
        padding: 15px;
        figure {
          border-radius: 10px;
          background: #2f3238;
          /*overflow: hidden;*/
          overflow: unset;
          position: absolute; /* this breaks the overflow:hidden in Chrome/Opera */
          /* this fixes the overflow:hidden in Chrome */
          -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
        }

        figure img {
          display: block;
          transition: opacity 1s, transform 1s;
        }

        figure:hover img {
          opacity: 0.8;
          transform: scale3d(1.1,1.1,1);
        }

        figcaption {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
