import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { yearFieldsStyles } from './styles'

class YearFilter extends React.Component {
  state = {
    year: '',
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes, handleChange, year } = this.props

    return (
      <div>
        <TextField
          multiple
          variant="standard"
          id="standard-number"
          placeholder="Year"
          value={year}
          onChange={e => handleChange(e, 'year')}
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

YearFilter.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(yearFieldsStyles)(YearFilter)
