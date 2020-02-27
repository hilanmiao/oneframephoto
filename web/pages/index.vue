<template>
  <section class="hero is-fullheight-with-navbar">
    <!-- Hero head: will stick at the top -->
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <svg
            class="gUZ lZJ U9O kVc"
            height="28"
            width="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
            aria-label=""
            role="img"
          >
            <path
              d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
            />
          </svg>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="搜索">
              <span class="icon is-small is-left">
                <font-awesome-icon :icon="['fas', 'search']" />
              </span>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <a class="navbar-item">
            <strong>主页</strong>
          </a>
          <a class="navbar-item">
            <strong>关注</strong>
          </a>

          <div class="split">
            <div class="navbar-item" />
            <div class="navbar-item" />
          </div>

          <a class="navbar-item">
            <font-awesome-icon :icon="['fas', 'comment-dots']" class="fa-lg" />
          </a>
          <a class="navbar-item">
            <font-awesome-icon :icon="['fas', 'bell']" class="fa-lg" />
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless">
              <font-awesome-icon :icon="['fas', 'ellipsis-h']" class="fa-lg" />
            </a>
            <div class="navbar-dropdown is-right is-boxed">
              <a class="navbar-item">
                编辑设置
              </a>
              <a class="navbar-item">
                查看服务条款和隐私政策
              </a>
              <a class="navbar-item">
                帮助中心
              </a>
              <a class="navbar-item">
                关于我们
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                退出
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <!--      <div class="container is-fluid">-->
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
            <div class="photo-container">
              <figure class="figure-photo">
                <img class="photo" :src="item.photo" :alt="item.title">

                <figcaption>
                  <div class="columns">
                    <div class="column is-haf">
                      <a href="">
                        <div class="user">
                          <figure class="image is-32x32 figure-avatar">
                            <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                          </figure>
                          <span class="name">张国栋</span>
                        </div>
                      </a>
                    </div>
                    <div class="column is-haf">
                      <div>
                        <button class="button is-danger is-rounded">
                          收藏
                        </button>
                      </div>
                      <div class="download-wrapper">
                        <button class="button is-rounded">
                          <font-awesome-icon :icon="['fas', 'download']" class="has-text-black" />
                        </button>
                        <button class="button is-rounded">
                          <font-awesome-icon :icon="['fas', 'share']" class="has-text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </waterfall-slot>
        </waterfall>
        <div class="footer-tip-wrapper">
          <div v-show="isBusy && !noMore" class="loading">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'spinner']" pulse class="fa-2x" />
            </span>
          </div>
          <div v-show="noMore" class="no-more">
            <svg
              height="32"
              width="32"
              viewBox="0 0 24 24"
              aria-label="Pinterest 图标"
              role="img"
            >
              <path
                d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
              />
            </svg>
          </div>
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
      grow: [1, 1, 1],
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
        // 图片容器bottom：16px，底部nomore提示 height: 64px
        if (!this.noMore && scrollTop + window.innerHeight + 16 + 64 >= document.body.clientHeight) {
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
      padding: 4px 12px;
      box-shadow: 0 2px 0 0 #f5f5f5;
      background: #ffffff;

      .navbar-menu {
        justify-content: space-between;

        .navbar-start {
          flex: 1;

          .navbar-item {
            flex: 1;

            .control {
              flex: 1;
              /*margin-left: 16px;*/
              /*margin-right: 16px;*/
              background: #efefef;
              border-radius: 6px;

              .icon {
                color: #8e8e8e;
              }

              .input:focus ~ .icon {
                color: #4a4a4a;
              }

              input {
                background: transparent;
                border-radius: 6px;
              }

              input::placeholder {
                color: #8e8e8e;
              }
            }
          }
        }

        .navbar-end {
          .split {
            display: flex;

            :first-child {
              border-right: 2px solid #efefef;
            }
          }
        }
      }
    }

    .hero-body {
      padding-top: 64px;

      .container {
        margin-top: 12px;

        .photo-container {

          .figure-photo {
            border-radius: 10px;
            background: #2f3238;
            /*overflow: hidden;*/
            overflow: unset;
            position: absolute; /* this breaks the overflow:hidden in Chrome/Opera */
            /* this fixes the overflow:hidden in Chrome */
            -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

            top: 0px;
            left: 8px;
            right: 8px;
            bottom: 16px;

            .photo {
              display: block;
              transition: opacity 1s, transform 1s;
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

              .columns {
                height: 100%;
                width: 100%;

                .column:first-child {
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;

                  .user {
                    display: flex;
                    align-items: center;

                    .figure-avatar {
                      display: flex;
                      align-items: center;
                    }

                    .name {
                      padding-left: 8px;
                      color: rgba(255, 255, 255, 0.8);
                    }

                    :hover {
                      color: rgba(255, 255, 255, 1);
                    }
                  }
                }

                .column:last-child {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  align-items: flex-end;

                  .button {
                    background-color: #e60023;
                  }

                  .button:hover {
                    background-color: #ad081b;
                  }

                  .download-wrapper {
                    display: flex;

                    .button {
                      padding: 0;
                      height: 32px;
                      width: 32px;
                      margin-left: 8px;
                      border: none;
                      background-color: rgba(255, 255, 255, 0.8);
                    }

                    .button:hover {
                      background-color: rgba(255, 255, 255, 1);
                    }
                  }
                }
              }
            }
          }

          :hover .photo {
            opacity: 0.8;
            transform: scale3d(1.1, 1.1, 1);
          }
        }

        .footer-tip-wrapper {
          .loading {
            height: 64px;
            display: flex;
            padding-bottom: 16px;
            padding-top: 16px;
            justify-content: center;
            align-items: center;
            color: #8e8e8e;
          }

          .no-more {
            height: 64px;
            display: flex;
            padding-bottom: 16px;
            padding-top: 16px;
            justify-content: center;
            align-items: center;

            svg {
              color: #8e8e8e;
              fill: currentColor;
            }
          }
        }
      }
    }
  }
</style>
