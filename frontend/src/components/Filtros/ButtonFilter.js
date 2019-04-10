import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },

  buttonClean: {
    marginLeft: 20,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

class CircularIntegration extends React.Component {
  state = {
    loading: false,
    success: false,
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleButtonClick = () => {
    const { handleSearch } = this.props
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            handleSearch()
            this.setState({
              loading: false,
              success: true,
            })
          }, 1000)
        },
      )
    }
  }

  render() {
    const { loading, success } = this.state
    const { classes, handleLimparCampos } = this.props
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    })

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
            {success && <CheckIcon />} Search
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleLimparCampos}
            className={classes.buttonClean}
          >
            Clean Filter
          </Button>
        </div>
      </div>
    )
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default withStyles(styles)(CircularIntegration)
