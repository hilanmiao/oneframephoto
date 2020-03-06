<template>
  <footer class="footer animated fadeInUp delay-2s">
    <div class="footer-button-wrapper">
      <nuxt-link to="/builder">
        <div class="footer-button">
          <svg
            height="16"
            width="16"
            viewBox="0 0 24 24"
            aria-hidden="true"
            aria-label=""
            role="img"
          ><path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4" /></svg>
        </div>
      </nuxt-link>
    </div>

    <div class="dropdown is-up is-right is-hoverable">
      <div class="dropdown-trigger">
        <div class="footer-button-wrapper" aria-haspopup="true" aria-controls="dropdown-menu">
          <div class="footer-button">
            <svg
              height="16"
              width="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
              aria-label=""
              role="img"
            ><path d="M14.34 21.2c0 1.57-1.19 2.8-2.78 2.8-1.58 0-2.77-1.23-2.77-2.8 0-1.57 1.19-2.8 2.77-2.8 1.59 0 2.78 1.23 2.78 2.8m-2.53-10.88c1.41-1.23 3.3-2.05 3.3-3.87 0-1.45-1.24-2.36-2.95-2.36-2.12 0-3.52 1.48-3.55 3.43H3.75C3.88 3.3 6.96 0 12.34 0c4.86 0 7.91 2.52 7.91 6.32 0 2.36-1.09 3.81-2.3 4.78-1.68 1.33-2.84 1.89-3.49 2.61-.5.57-.62 1.04-.65 1.95H9.45c0-2.64.65-3.9 2.36-5.34" /></svg>
          </div>
        </div>
      </div>
      <div id="dropdown-menu" class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <nuxt-link to="/help" class="is-size-6 has-text-weight-bold dropdown-item">
            访问帮助中心
          </nuxt-link>
          <hr class="dropdown-divider">
          <div class="dropdown-item">
            <nav class="level">
              <div class="level-item">
                <nuxt-link to="/" class="dropdown-item has-text-grey-light has-text-weight-bold">
                  关于我们
                </nuxt-link>
              </div>
              <div class="level-item">
                <nuxt-link to="/" class="dropdown-item has-text-grey-light has-text-weight-bold">
                  用户反馈
                </nuxt-link>
              </div>
              <div class="level-item">
                <nuxt-link to="/" class="dropdown-item has-text-grey-light has-text-weight-bold">
                  移动端客户端
                </nuxt-link>
              </div>
              <div class="level-item">
                <nuxt-link to="/" class="dropdown-item has-text-grey-light has-text-weight-bold">
                  隐私条款
                </nuxt-link>
              </div>
            </nav>
          </div>
          <div class="dropdown-item">
            <fieldset>
              <legend align="center">
                ©2020 Oneframephoto.com
              </legend>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    /*margin: 12px;*/
    right: 0;
    padding: 12px;
    background-color: transparent;

    .footer-button-wrapper {
      margin: 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 0px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 0.5px;
      border-radius: 50%;
      .footer-button {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .footer-button:hover {
        background-color: rgba(0,0,0,.06);
      }
    }

    .dropdown {
      .dropdown-menu {
        right: 60px;
        bottom: 0;

        .dropdown-item {
          .level {
            .level-item {
              a {
                padding-left: 4px;
                padding-right: 4px;
              }

              a:hover {
                background-color: transparent;
                color: #e60023 !important;
              }
            }

            .level-item:first-child {
              a {
                padding-left: 0;
              }
            }

            .level-item:last-child {
              a {
                padding-right: 0;
              }
            }
          }
        }
      }
    }

    fieldset {
      border:0;
      border-top:1px solid #ededed;
    }
    legend {
      color: #b5b5b5;
      /* for IE */
      background-color: #fff;
      font-size: 12px;
      padding-left: 6px;
      padding-right: 6px;
    }
  }
</style>
