<template>
  <section class="hero is-fullheight-with-navbar page-following">
    <!-- Hero head: will stick at the top -->
    <Navbar />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <!--      <div class="container is-fluid">-->
      <div class="container">
        <div class="follower is-flex">
          <div class="follower-body">
            <h1 class="title is-size-4">
              来自你关注的人
            </h1>
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <div class="empty" />
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <div class="empty" />
                  </figure>
                </div>
                <div class="level-item">
                  <figure class="image">
                    <button class="button is-rounded">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'pen']" class="fa-lg" />
                      </span>
                    </button>
                  </figure>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <figure v-show="true" class="image">
                    <button class="button is-rounded">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'user-plus']" class="fa-lg" />
                      </span>
                    </button>
                  </figure>
                </div>
                <div class="level-item">
                  <button
                    v-show="true"
                    class="button is-danger is-rounded"
                    @click="followingModalShow = !followingModalShow"
                  >
                    <span class="has-text-weight-bold">
                      寻找值得关注的用户
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <nuxt-link to="/story">
                  <img class="photo" :src="item.photo" :alt="item.title">

                  <figcaption class="figcation-photo">
                    <div class="columns">
                      <div class="column is-haf">
                        <nuxt-link to="/">
                          <div class="user">
                            <figure class="image is-32x32 figure-avatar">
                              <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                            </figure>
                            <span class="name">张国栋</span>
                          </div>
                        </nuxt-link>
                      </div>
                      <div class="column is-haf">
                        <div>
                          <button class="button is-danger">
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
                </nuxt-link>
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
              aria-label=""
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

    <footer-buttons />

    <div class="modal following-users" :class="{'is-active' : followingModalShow}">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered has-text-weight-bold">
            创建你的关注页面
          </p>
          <button class="delete" aria-label="close" @click="followingModalShow = false" />
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="columns is-multiline">
            <div v-for="i in 9" :key="i" class="column is-half">
              <el-card shadow="hover" :body-style="{ padding: '10px' }">
                <div class="user-wrapper">
                  <div class="user-images">
                    <div class="avatar">
                      <figure class="image">
                        <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                      </figure>
                    </div>
                    <div class="photo">
                      <figure>
                        <img src="https://i.pinimg.com/222x/6c/72/08/6c7208f852c365248827636482212389.jpg" alt="">
                      </figure>
                      <figure>
                        <img src="https://i.pinimg.com/222x/6c/72/08/6c7208f852c365248827636482212389.jpg" alt="">
                      </figure>
                      <figure>
                        <img src="https://i.pinimg.com/222x/6c/72/08/6c7208f852c365248827636482212389.jpg" alt="">
                      </figure>
                    </div>
                  </div>
                  <div class="user-info level">
                    <div class="level-left">
                      <div class="level-item has-text-centered">
                        <div>
                          <p class="heading is-size-5 has-text-weight-bold">
                            张国栋
                          </p>
                          <p class="title has-text-grey is-size-7">
                            2.9万 粉丝
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="level-right">
                      <button class="button is-danger is-rounded">
                        <span>
                          关注
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Waterfall from '~/components/vue-waterfall/waterfall'
import WaterfallSlot from '~/components/vue-waterfall/waterfall-slot'
import Navbar from '~/components/Navbar'
import FooterButtons from '~/components/FooterButtons'

export default {
  components: {
    Waterfall,
    WaterfallSlot,
    Navbar,
    FooterButtons
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
      noMore: false,
      followingModalShow: false
    }
  },
  mounted () {
    // TODO: [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.
    // 检查客户端其他生命周期钩子是否影响到页面数据的显示，比如用到一些关于数据的v-if等等
    // 放到async data里
    this.loadMore()
    window.addEventListener('scroll', this.handleScroll, true)
    document.addEventListener('click', (e) => {
      if (e.target.className === 'modal-background') {
        this.followingModalShow = false
      }
    })
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

<style lang="scss">
  .modal.following-users {
    .modal-card {
      .el-card {
        border: none;
        .el-card__body {

        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .hero {
    .hero-body {
      padding-top: 64px;

      .container {
        /*margin-top: 12px;*/

        .follower {
          justify-content: center;

          .follower-body {
            max-width: 800px;
            width: 100%;
            padding: 24px;

            .level {
              .level-left {
                .level-item {
                  margin-right: 0;

                  &:not(:first-child) {
                    margin-left: -12px;
                  }

                  &:last-child {
                    .button {
                      padding: 0;
                      height: 100%;
                      width: 100%;
                      border: none;
                      background-color: #efefef;
                      color: #8e8e8e;

                      &:hover {
                        background-color: #e2e2e2;
                      }
                    }
                  }

                  .image {
                    width: 60px;
                    height: 60px;
                    border: 2px solid white;
                    border-radius: 50%;

                    .empty {
                      width: 100%;
                      height: 100%;
                      background-color: #fff;
                      border-radius: 50%;
                      border: 2px dashed rgb(142, 142, 142);
                    }
                  }
                }
              }

              .level-right {
                .level-item {
                  &:first-child {
                    .button {
                      padding: 0;
                      height: 100%;
                      width: 100%;
                      border: none;
                      background-color: #efefef;
                      color: #8e8e8e;

                      &:hover {
                        background-color: #e2e2e2;
                      }
                    }
                  }

                  &:last-child {
                    .button {
                      background-color: #e60023;

                      &:hover {
                        background-color: #ad081b;
                      }
                    }
                  }

                  .image {
                    width: 60px;
                    height: 60px;
                    border: 2px solid white;
                    border-radius: 50%;
                  }
                }
              }
            }
          }
        }

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

            > a {
              cursor: zoom-in;
            }

            .photo {
              display: block;
              transition: opacity 1s, transform 1s;
              width: 100%;
              height: 100%;
            }

            figcaption {
              visibility: hidden;
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

          :hover figcaption {
            visibility: visible;
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

  .modal.following-users {
    .modal-background {
      background: rgba(0,0,0,.4);
    }
    .modal-card {
      width: 900px;
      max-height: calc(100vh - 100px);

      .modal-card-head {
        border: none;
        background-color: white;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }

      .modal-card-body {
        .column {
          display: flex;
          justify-content: flex-end;
          &:nth-of-type(even) {
            justify-content: flex-start;
          }
          .el-card {
            .el-card__body {
              .user-images {
                position: relative;
                display: flex;
                width: 354px;

                .avatar {
                  width: 100px;
                  height: 100px;
                  border: 2px solid white;
                  border-radius: 50%;
                  position: absolute;
                }

                .photo {
                  display: flex;
                  justify-content: flex-end;
                  flex: 1 1 auto;

                  figure {
                    background-color: #f7f7f7;
                    height: 100px;
                    width: 100px;

                    &:not(:last-child) {
                      margin-right: 2px;
                    }

                    img {
                      height: 100px;
                      width: 100px;
                      max-width: unset;
                    }

                    &:first-child {
                      img {
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                      }
                    }

                    &:last-child {
                      img {
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                      }
                    }
                  }
                }
              }

              .user-info {
                width: 354px;
                padding-top: 12px;

                .button {
                  background-color: #e60023;
                }

                .button:hover {
                  background-color: #ad081b;
                }
              }
            }
          }
        }
      }

      .modal-card-foot {
        padding: 10px;
        border: none;
        background-color: white;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }
  }
</style>
