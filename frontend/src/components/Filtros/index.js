import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ChipFilter from './ChipFilter'
import RangeFilter from './RangeFilter'
import ButtonFilter from './ButtonFilter'

import styles from './styles'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function Filtros({
  classes,
  handleSearch,
  handleChange,
  holeType,
  wellType,
  mtdFrom,
  mtdTo,
  drilledIntFrom,
  drilledIntTo,
  wellTypeList,
  holeTypeList,
  handleLimparCampos,
}) {
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary className={classes.painelBotoes} expandIcon={<ExpandMoreIcon />} />
        <ExpansionPanelDetails className={classes.container}>
          <div className={classes.container}>
            <div className={classes.campos}>
              <div className={classes.types} variant="h5" component="h3">
                <ChipFilter
                  values={holeTypeList}
                  placeholder="Hole Type"
                  value={holeType}
                  handleChange={handleChange}
                  field="holeType"
                />
                <RangeFilter values={names} handleChange={handleChange} from={mtdFrom} to={mtdTo} field="mtd" />
              </div>
              <div className={classes.intervals} variant="h5" component="h3">
                <ChipFilter
                  values={wellTypeList}
                  placeholder="Well Type"
                  value={wellType}
                  handleChange={handleChange}
                  field="wellType"
                />
                <RangeFilter
                  values={names}
                  handleChange={handleChange}
                  from={drilledIntFrom}
                  to={drilledIntTo}
                  field="drilledInt"
                />
              </div>
            </div>
            <ButtonFilter handleSearch={handleSearch} handleLimparCampos={handleLimparCampos} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

Filtros.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
}

export default withStyles(styles)(Filtros)
