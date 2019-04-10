import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import styles from './styles'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class ChipFilter extends React.Component {
  render() {
    const { classes, values, placeholder, handleChange, value, field } = this.props
    const idx = values.findIndex(item => item.value === value)
    let name = ''
    if (idx >= 0) name = values[idx].name

    return (
      <div className={classes.rootFilter}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">{placeholder}</InputLabel>
          <Select
            value={value}
            onChange={e => handleChange(e, field)}
            input={<Input id="select-multiple-chip" />}
            renderValue={() => (
              <div className={classes.chips}>
                <Chip key={name} label={name} className={classes.chip} />
              </div>
            )}
            MenuProps={MenuProps}
          >
            {values.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

ChipFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(ChipFilter)
