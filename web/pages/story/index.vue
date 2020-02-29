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
              <img src="http://localhost:7001/public/upload/others/2020/02/29/2992x3992-1582943440928977.jpg" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
      }
    }
  }
</style>
