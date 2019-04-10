import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
})

class TextFields extends React.Component {
  state = {
    from: '',
    to: '',
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes, handleChange, from, to, field } = this.props

    return (
      <div>
        <TextField
          id="standard-number"
          placeholder="From"
          value={from}
          onChange={e => handleChange(e, field + 'From')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          placeholder="To"
          value={to}
          onChange={e => handleChange(e, field + 'To')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </div>
    )
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextFields)
