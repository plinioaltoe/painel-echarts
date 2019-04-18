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
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  field: PropTypes.string.isRequired,
}

export default withStyles(textFieldsStyles)(TextFields)
