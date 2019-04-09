import React, { Component } from 'react'

import ReactEcharts from 'echarts-for-react'
import boxplot from './boxplot'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { preparaArrayTempoDryHoleDays } from '../../modules/charts'
import dados from '../../services/dadosObject.json'

import Filtros from '../Filtros'

import styles from './styles'

class Painel extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      dadosFiltrados: {},
    }
  }

  componentDidMount = () => {
    const dadosFiltrados = preparaArrayTempoDryHoleDays(dados)
    this.setState({ dadosFiltrados })
  }

  render() {
    const { dadosFiltrados } = this.state
    const { classes } = this.props
    return (
      <div>
        <Filtros />
        <div className={classes.container}>
          <ReactEcharts
            option={boxplot.getOption(dadosFiltrados)}
            style={{ height: '800px', width: '100%' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Painel)
