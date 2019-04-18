import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ChipFilter from './ChipFilter'
import RangeFilter from './RangeFilter'
import ButtonFilter from './ButtonFilter'

import styles from './styles'

function Filtros({
  classes,
  handleSearch,
  handleChange,
  holeType,
  wellType,
  year,
  mtdFrom,
  mtdTo,
  drilledIntFrom,
  drilledIntTo,
  wellTypeList,
  holeTypeList,
  yearList,
  handleLimparCampos,
}) {
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary className={classes.painelBotoes} expandIcon={<ExpandMoreIcon />} />
        <ExpansionPanelDetails className={classes.container}>
          <div className={classes.container}>
            <div className={classes.campos}>
              <div className={classes.types}>
                <Typography variant="title" gutterBottom>
                  Year:
                </Typography>
                <div className={classes.chipFilter}>
                  <ChipFilter
                    values={yearList}
                    placeholder="Year"
                    value={year}
                    handleChange={handleChange}
                    field="year"
                  />
                </div>
              </div>
              <div className={classes.types}>
                <Typography variant="title" gutterBottom>
                  Type Filters:
                </Typography>
                <div className={classes.chipFilter}>
                  <ChipFilter
                    values={holeTypeList}
                    placeholder="Hole Type"
                    value={holeType}
                    handleChange={handleChange}
                    field="holeType"
                  />
                  <ChipFilter
                    values={wellTypeList}
                    placeholder="Well Type"
                    value={wellType}
                    handleChange={handleChange}
                    field="wellType"
                  />
                </div>
              </div>
              <div className={classes.intervals}>
                <div className={classes.mtdFilter}>
                  <Typography variant="title" gutterBottom>
                    MTD (m):
                  </Typography>
                  <RangeFilter handleChange={handleChange} from={mtdFrom} to={mtdTo} field="mtd" />
                </div>
                <div className={classes.drilledFilter}>
                  <Typography variant="title" gutterBottom>
                    Drilled Intervals (m):
                  </Typography>
                  <RangeFilter
                    handleChange={handleChange}
                    from={drilledIntFrom}
                    to={drilledIntTo}
                    field="drilledInt"
                    title="Drilled Interval"
                  />
                </div>
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
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  holeType: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, name: PropTypes.string }))
    .isRequired,
  wellType: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, name: PropTypes.string }))
    .isRequired,
  year: PropTypes.arrayOf(PropTypes.string).isRequired,
  mtdFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mtdTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  drilledIntFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  drilledIntTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  wellTypeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  holeTypeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  yearList: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLimparCampos: PropTypes.func.isRequired,
}

export default withStyles(styles)(Filtros)
