<template>
  <section class="hero is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand navbar-item">
            <a class="navbar-item" href="https://bulma.io">
              <svg
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
            <div class="brand-name has-text-weight-bold">
              帮助中心
            </div>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active">
                Home
              </a>
              <a class="navbar-item">
                Examples
              </a>
              <a class="navbar-item">
                Documentation
              </a>
              <span class="navbar-item sponsor">
                <button class="button is-danger">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                  </span>
                  <span>
                    打赏
                  </span>
                </button>
              </span>
              <span class="navbar-item">
                <button class="button is-white">
                  <span class="icon">
                    <font-awesome-icon :icon="['fab', 'github-alt']" class="fa-lg" />
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container is-flex">
        <aside class="menu">
          <p class="menu-label">
            General
          </p>
          <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><a>Customers</a></li>
          </ul>
          <p class="menu-label">
            Administration
          </p>
          <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
              <a class="is-active">Manage Your Team</a>
              <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
              </ul>
            </li>
            <li><a>Invitations</a></li>
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
          </ul>
          <p class="menu-label">
            Transactions
          </p>
          <ul class="menu-list">
            <li><a>Payments</a></li>
            <li><a>Transfers</a></li>
            <li><a>Balance</a></li>
          </ul>
        </aside>
        <div>asdfads</div>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot is-success">
      <div class="container">
        <nav class="level logo">
          <p class="level-item has-text-centered">
            <a class="is-flex">
              <svg
                height="40"
                width="40"
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
            <span class="title">一帧照片</span>
          </p>
        </nav>
        <nav class="level has-text-grey links">
          <div class="level-item">
            <div class="">
              <p class="subtitle has-text-weight-bold">
                关于我们
              </p>
              <p class="">
                什么是Oneframephoto？
              </p>
              <p class="">
                Oneframephoto页面
              </p>
              <p class="">
                联系我们
              </p>
              <p class="">
                帮助中心
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="">
              <p class="subtitle has-text-weight-bold">
                更多信息
              </p>
              <p class="">
                技术博客
              </p>
              <p class="">
                更新日志
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="">
              <p class="subtitle has-text-weight-bold">
                移动客户端
              </p>
              <p class="">
                微信小程序
              </p>
              <p class="">
                Android
              </p>
              <p class="">
                iOS
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="official">
              <p class="">
                <a class="has-text-grey" target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=2815a60144322ee7cd7b3d8d24113b48628f9857379eaefff034cefb9ec3f5ec">
                  <font-awesome-icon :icon="['fab', 'qq']" class="fa-lg" />
                  <small class="has-text-grey">技术交流QQ群：1078975922</small>
                </a>
              </p>
              <p class="">
                <a class="has-text-grey" href="mailto:hilanmiao@126.com">
                  <font-awesome-icon :icon="['fas', 'envelope']" class="fa-lg" />
                  <small class="has-text-grey">hilanmiao@126.com</small>
                </a>
              </p>
              <p class="">
                <a class="has-text-grey" href="https://github.com/hilanmiao" target="_blank">
                  <font-awesome-icon :icon="['fab', 'github-alt']" class="fa-lg" style="width: 22px" />
                  <small class="has-text-grey">https://github.com/hilanmiao</small>
                </a>
              </p>
            </div>
          </div>
        </nav>
        <div class="divider">
          <fieldset>
            <legend align="center">
              ©2020 Oneframephoto.com
            </legend>
          </fieldset>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item" />
          </div>
          <div class="level-right">
            <div class="level-item">
              <a href="http://www.beian.miit.gov.cn" target="_blank" class="has-text-grey-light">
                <small>鲁ICP备18035920号-2</small>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  async asyncData () {
    // const serverUrl = process.env.SERVER_URL
    // const { data } = await axios.get(`${serverUrl}/api/common/story`)
    // return { list: data.rows }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  destroyed () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

  .navbar {
    box-shadow: 0 2px 0 0 #f5f5f5;
    background: #ffffff;
    .brand-name {
      color: #e60023;
    }

    .sponsor {
      .button {
        background-color: #e60023;
      }

      .button:hover {
        background-color: #ad081b;
      }
    }
  }

  .hero-foot {
    background-color: #fafafa;
    padding-top: 60px;
    padding-bottom: 60px;

    .logo {
      margin-bottom: 60px;
      span {
        padding-left: 8px;
      }
    }

    .links {
      align-items: flex-start;
      p {
        padding-top: 8px;
      }

      .official {
        svg {
          width: 22px;
        }
      }
    }

    .divider {
      fieldset {
        border:0;
        border-top:1px solid #ededed;
      }
      legend {
        color: #b5b5b5;
        /* for IE */
        background-color: transparent;
        font-size: 12px;
        padding-left: 6px;
        padding-right: 6px;
      }
    }
  }

</style>
