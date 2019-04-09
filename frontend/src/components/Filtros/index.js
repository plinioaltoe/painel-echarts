import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

function Filtros({ children, classes }) {
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">{children}</Typography>
      </Paper>
    </div>
  )
}

Filtros.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
}

export default withStyles(styles)(Filtros)
