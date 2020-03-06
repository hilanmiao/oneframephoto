<template>
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
</template>
<style lang="scss" scoped>
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
</style>
