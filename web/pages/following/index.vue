<template>
  <section class="hero is-fullheight-with-navbar">
    <!-- Hero head: will stick at the top -->
    <Navbar />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <!--      <div class="container is-fluid">-->
      <div class="container">
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

        关注
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
      noMore: false
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
  .hero {

    .hero-body {
      padding-top: 64px;

      .container {
        margin-top: 12px;

        .back-wrapper {
          display: flex;

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
</style>
