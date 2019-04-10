const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  campos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  types: {
    display: 'flex',
    flexDirection: 'column',
  },

  intervals: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 50,
  },

  rootFilter: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },

  inputContainer: {
    flexBasis: 80,
  },

  painelBotoes: {
    '* & div': {
      marginTop: 0,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
})
export default styles
