<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
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
        <div class="navbar-item">
          <nuxt-link to="/">
            <button class="button is-rounded">
              <strong>主页</strong>
            </button>
          </nuxt-link>
        </div>
        <div class="navbar-item">
          <nuxt-link to="/following">
            <button class="button is-rounded">
              <strong>关注</strong>
            </button>
          </nuxt-link>
        </div>

        <div class="split">
          <div class="navbar-item" />
        </div>

        <div class="navbar-item">
          <nuxt-link to="/">
            <button class="button is-rounded button-icon">
              <font-awesome-icon :icon="['fas', 'comment-dots']" class="fa-lg" />
            </button>
          </nuxt-link>
        </div>

        <div class="navbar-item">
          <nuxt-link to="/">
            <button class="button is-rounded button-icon">
              <font-awesome-icon :icon="['fas', 'bell']" class="fa-lg" />
            </button>
          </nuxt-link>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <button class="button is-rounded button-icon">
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" class="fa-lg" />
          </button>
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
</template>
<style lang="scss" scoped>
    .navbar {
      padding: 4px 12px;
      box-shadow: 0 2px 0 0 #f5f5f5;
      background: #ffffff;

      .navbar-menu {
        justify-content: space-between;

        .navbar-start {
          flex: 1;

          > .navbar-item {
            flex: 1;
            padding: 4px;

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
          > .navbar-item {
            padding: 4px;
          }

          .navbar-item.has-dropdown {
            align-items: center;
          }
          .button {
            border: none;
          }

          .button.button-icon {
            padding: 0;
            min-height: 44px;
            min-width: 44px;
          }

          .button:hover {
            background-color: rgba(0,0,0,.06);
          }

          .split {
            display: flex;
            align-items: center;
            justify-content: center;

            .navbar-item {
              padding: 0;
              height: 30px;
              width: 14px;
              border-left: 2px solid #efefef;
            }
          }
        }
      }
    }
</style>
