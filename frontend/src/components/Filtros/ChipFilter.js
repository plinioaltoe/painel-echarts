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
  state = {
    name: '',
  }

  get items() {
    const { values } = this.props

    if (values.some(this.isObject)) {
      return values.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.name}
        </MenuItem>
      ))
    }

    if (values.some(this.isString)) {
      return values.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))
    }

    return []
  }

  get name() {
    const { values, value } = this.props

    if (values.some(this.isObject)) {
      const idx = values.findIndex(item => item.value === value)
      if (idx >= 0) return values[idx].name
    }
    if (values.some(this.isString)) {
      const idx = values.findIndex(item => item === value)
      if (idx >= 0) return values[idx]
    }
  }

  isObject = (element, index, array) => element instanceof Object

  isString = (element, index, array) => typeof element === typeof 'string'

  render() {
    const {
      classes, placeholder, handleChange, value, field,
    } = this.props

    return (
      <div className={classes.rootFilter}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-chip">{placeholder}</InputLabel>
          <Select
            value={value}
            onChange={e => handleChange(e, field)}
            input={<Input id="select-chip" />}
            renderValue={() => (
              <div className={classes.chips}>
                <Chip key={this.name} label={this.name} className={classes.chip} />
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.items}
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
