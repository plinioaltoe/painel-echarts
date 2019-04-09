const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 2,
  },

  chart: { height: '480px', width: '100%' },
})
export default styles
