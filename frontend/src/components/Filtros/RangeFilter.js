import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { textFieldsStyles } from './styles'

const TextFields = ({
  classes, handleChange, from, to, field,
}) => (
  <div>
    <TextField
      variant="standard"
      id="standard-number"
      placeholder="From"
      value={from}
      onChange={e => handleChange(e, `${field}From`)}
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
      onChange={e => handleChange(e, `${field}To`)}
      type="number"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />
  </div>
)

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
}

export default withStyles(textFieldsStyles)(TextFields)
