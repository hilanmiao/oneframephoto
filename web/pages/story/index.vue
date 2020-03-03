<template>
  <section class="hero is-fullheight-with-navbar">
    <!-- Hero head: will stick at the top -->
    <Navbar />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="back-wrapper">
        <nuxt-link to="/">
          <button class="button is-rounded">
            <svg
              class="gUZ pBj"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              aria-label="返回键"
              role="img"
            ><path d="M24 12a2 2 0 0 1-2 2H7.676l4.631 4.586a2 2 0 1 1-2.829 2.828L0 12l9.478-9.414a2 2 0 0 1 2.829 2.828L7.676 10H22a2 2 0 0 1 2 2" /></svg>
          </button>
        </nuxt-link>
      </div>
      <div class="container">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img src="https://ss2.meipian.me/users/4197171/f94c90fc364e4711a2df0107cdf7713c.jpg-mobile" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media operate-wrapper">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                </figure>
              </div>
              <div class="media-content">
                <div class="level-left title is-4">
                  <div class="level-item">
                    张国栋
                  </div>
                  <div class="level-item">
                    <button class="button is-light is-rounded is-small">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                      </span>
                      <span class="has-text-weight-bold">
                        关注
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="media-right">
                <nav class="level">
                  <div class="level-item zan">
                    <button class="button is-rounded zan-button">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'thumbs-up']" class="fa-lg" />
                      </span>
                    </button>
                    <span class="has-text-grey has-text-weight-bold">1234</span>
                  </div>
                  <div class="level-item">
                    <button class="button is-rounded">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'download']" class="fa-lg" />
                      </span>
                    </button>
                  </div>
                  <div class="level-item">
                    <button class="button is-rounded">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'share']" class="fa-lg" />
                      </span>
                    </button>
                  </div>
                  <div class="level-item collect">
                    <button class="button is-danger is-rounded">
                      <span class="icon">
                        <font-awesome-icon :icon="['fas', 'thumbtack']" />
                      </span>
                      <span>
                        收藏
                      </span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            <div class="content is-family-code">
              今天中午，表妹发给我一张发黄的旧照片，这是我七八岁时的照片，是一直想找的，也是儿童时期唯一的一张照片。我有种感觉肯定可以到姑姑家找到这张照片，因为印象中的姑姑们都非常整洁干净，爱收拾，肯定不会弄丢，两个姑姑都相继离开了我们。我也不好意思专门去别人家翻箱倒柜找一张旧照片。印象最深的是这件衣服。也许命中注定。命里有时终须有。最终我还是找到了这张照片。
              首先说说这件衣服，这件衣服是我读小学一年级，入了少先队系上了鲜艳红领巾的时候，叔叔婶婶给我的奖品。记得我们班当时一起入少先队的有6人，那时候好像每家每户都要去乡政府交粮谷，除去上缴的公粮，剩下的也就那么一点点结余了。婶娘为了奖励我拿出箱底的布料，叔叔拿出加工费，做了这件新衣服送给我，这也是我小时候穿过的唯一的一件新衣服。其它的衣服基本上都是旧的，改的。所以我特别珍惜它，这种记忆已经深深的刻在骨子里。伴随着年龄的增长这种感觉似乎有增无减。
              我父母亲经常外出做茶叶生意，有时去新疆等地方卖架板还是什么的。那时，我还要带我的两个弟弟，有时野鸭村的叔伯奶奶会过来帮忙照看我们。记得有一次小弟弟清华不见了，后来在田沟里找到了，原来他在田里玩累了就睡着了，奶奶就怪我没照顾好弟弟，万一有水怎么办，我不急不慢的回答奶奶："可怜我自己也是才7岁的人"。我也是第一次用一句话把一位八旬老人噎到瞬间流泪，妈妈回来之后奶奶把这些告诉了妈妈。事后我也特别后悔这样跟奶奶说话。妇女们在一起聊天经常讲这个故事我才可以记得这么深。
            </div>

            <div class="comment-wrapper">
              <nav class="level fold">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle has-text-weight-bold">
                      2条评论
                    </p>
                  </div>
                  <div class="level-item">
                    <button class="button is-rounded" @click="showComments = !showComments">
                      <span class="icon">
                        <font-awesome-icon v-show="!showComments" :icon="['fas', 'angle-down']" class="has-text-black fa-2x" />
                        <font-awesome-icon v-show="showComments" :icon="['fas', 'angle-up']" class="has-text-black fa-2x" />
                      </span>
                    </button>
                  </div>
                </div>
              </nav>

              <div v-show="showComments" class="comments">
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-48x48">
                      <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>张国栋</strong>
                        <small>18周</small>
                        <br>
                        在夜里光着脚沿着海岸线走的时候 浪潮慢慢涌上脚踝 温柔地将我萦绕 这让我想起曾经夜里安静地蜷缩在你胸口 融化在你的温柔里
                        <br>
                      </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'reply']" class="" />
                          </span>
                        </a>
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'retweet']" class="" />
                          </span>
                        </a>
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'heart']" class="" />
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-48x48">
                      <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>张国栋</strong>
                        <small>18周</small>
                        <br>
                        在夜里光着脚沿着海岸线走的时候 浪潮慢慢涌上脚踝 温柔地将我萦绕 这让我想起曾经夜里安静地蜷缩在你胸口 融化在你的温柔里
                        <br>
                      </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'reply']" class="" />
                          </span>
                        </a>
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'retweet']" class="" />
                          </span>
                        </a>
                        <a class="level-item">
                          <span class="icon is-small">
                            <font-awesome-icon :icon="['fas', 'heart']" class="" />
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
                <article class="media post">
                  <figure class="media-left">
                    <p class="image is-48x48">
                      <img class="is-rounded" src="https://avatars1.githubusercontent.com/u/27052900?s=460&v=4">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="field">
                      <p class="control">
                        <textarea class="textarea is-small is-danger" placeholder="添加评论" />
                      </p>
                    </div>
                    <div class="field">
                      <p class="control">
                        <button class="button">
                          完成
                        </button>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-buttons />
  </section>
</template>

<script>
import Navbar from '~/components/Navbar'
import FooterButtons from '~/components/FooterButtons'

export default {
  components: {
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
      showComments: false,
      download: false
    }
  },
  mounted () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      const mojs = require('@mojs/core')
      const el3 = document.querySelector('button.zan-button')
      const el3span = el3.querySelector('span')
      const el3spansvg = el3span.querySelector('svg')
      const circle = new mojs.Shape({
        parent: el3,
        stroke: { '#E5214A': '#CC8EF5' },
        strokeWidth: { [2 * 20]: 0 },
        fill: 'none',
        scale: { 0: 1 },
        radius: 20,
        duration: 400,
        easing: 'cubic.out'
      })

      const burst = new mojs.Burst({
        parent: el3,
        radius: { 4: 32 },
        angle: 45,
        count: 14,
        timeline: { delay: 300 },
        children: {
          radius: 2.5,
          fill: [
            // { '#91D2FA' : '#BDEFD8' },
            // { '#91D2FA' : '#ADD6CA' },
            'deeppink', 'cyan', 'yellow'
          ],
          scale: { 1: 0, easing: 'quad.in' },
          pathScale: [0.8, null],
          degreeShift: [13, null],
          duration: [500, 700],
          easing: 'quint.out'
          // speed: .1
        }
      })

      const opacityCurve11 = mojs.easing.path('M0,0 C0,87 27,100 40,100 L40,0 L100,0')
      const scaleCurve11 = mojs.easing.path('M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106')
      const tween = new mojs.Tween({
        duration: 1300,
        easing: mojs.easing.ease.out,
        onUpdate (progress) {
          const opacityProgress = opacityCurve11(progress)
          el3span.style.opacity = opacityProgress

          const scaleProgress = scaleCurve11(progress)
          el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)'

          const colorProgress = opacityCurve11(progress)
          el3spansvg.style.color = colorProgress >= 1 ? '#e60023' : '#C0C1C3'
        }
      })

      el3.addEventListener('click', function (e) {
        burst.replay()
        circle.replay()
        tween.replay()
      })
    }
  },
  destroyed () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .hero {

    .hero-body {
      padding-top: 64px;

      .back-wrapper {
        display: flex;
        top: 84px;
        position: fixed;

        .button {
          padding: 0;
          min-height: 44px;
          min-width: 44px;
          border: none;
        }

        .button:hover {
          background-color: rgba(0,0,0,.06);
        }
      }

      .container {
        margin-top: 12px;
        max-width: 960px;

        .card-content {
          .operate-wrapper {
            align-items: center;
            .media-right {
              .level-item:not(:last-child) {
                padding-left: 8px;

                .button {
                  padding: 0;
                  min-height: 44px;
                  min-width: 44px;
                  border: none;
                }

                .button:hover {
                  background-color: rgba(0,0,0,.06);
                }
              }

              .level-item.zan {
                .button span {
                  margin: 0
                }

                .button:hover {
                  background-color: transparent !important;
                }

                .button:focus {
                  box-shadow: none;
                }

                .button svg {
                  color: #7a7a7a;
                }
              }

              .level-item.collect {
                padding-left: 20px;
                .button {
                  background-color: #e60023;
                }

                .button:hover {
                  background-color: #ad081b;
                }
              }
            }
          }

          .comment-wrapper {
            .fold {
              .button {
                padding: 0;
                min-height: 44px;
                min-width: 44px;
                border: none;
              }

              .button:hover {
                background-color: rgba(0,0,0,.06);
              }
            }
          }
        }
      }
    }
  }
</style>
