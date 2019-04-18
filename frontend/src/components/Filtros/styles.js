import green from '@material-ui/core/colors/green'

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
    flexDirection: 'row',
    paddingLeft: 50,
  },

  rootFilter: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
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

  chipFilter: {
    display: 'flex',
    flexDirection: 'row',
  },

  mtdFilter: {
    display: 'flex',
    flexDirection: 'column',
  },

  drilledFilter: {
    display: 'flex',
    flexDirection: 'column',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  select: {
    minWidth: 100,
    maxWidth: 'fit-content',
  },
})
export default styles

export const buttonStyles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },

  buttonClean: {
    marginLeft: 20,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

export const textFieldsStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing.unit * 3,
    marginBottom: 0,
    width: 100,
    '* & label': {
      width: 'max-content',
    },
  },
})
