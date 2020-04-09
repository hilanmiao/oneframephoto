<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon}/>)
      // 替换为font-awesome-icon
      vnodes.push(<font-awesome-icon class='icon' icon={icon}/>)
    }

    if (title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      vnodes.push(<strong slot='title'>{(title)}</strong>)
    }
    return vnodes
  }
}
</script>
<style lang="scss" scoped>
  .icon {
    margin-right: 10px;
  }
</style>
