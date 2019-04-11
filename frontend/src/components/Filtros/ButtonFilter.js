import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'

import { buttonStyles } from './styles'

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

  clearFields = () => {
    this.setState({
      success: false,
    })
    this.props.handleLimparCampos()
  }

  render() {
    const { loading, success } = this.state
    const { classes } = this.props
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
            onClick={this.clearFields}
            className={classes.buttonClean}
          >
            Clear Filter
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

export default withStyles(buttonStyles)(CircularIntegration)
