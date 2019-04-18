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

const ITEM_HEIGHT = 40
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class ChipFilter extends React.Component {
  get items() {
    const { values } = this.props

    if (values.some(this.isObject)) {
      return values.map(item => (
        <MenuItem key={item.value} value={item}>
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

  selectChips = (item) => {
    const { classes } = this.props
    return this.isObject(item) ? (
      <Chip key={item.name} label={item.name} className={classes.chip} />
    ) : (
      <Chip key={item} label={item} className={classes.chip} />
    )
  }

  isObject = element => element instanceof Object

  isString = element => typeof element === typeof 'string'

  render() {
    const {
      classes, placeholder, handleChange, value, field,
    } = this.props

    return (
      <div className={classes.rootFilter}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">{placeholder}</InputLabel>
          <Select
            multiple
            className={classes.select}
            value={value}
            onChange={e => handleChange(e, field)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>{selected.map(item => this.selectChips(item))}</div>
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
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(ChipFilter)
