import React, { Component } from 'react'

import ReactEcharts from 'echarts-for-react'
import boxplot from './boxplot'
import { withStyles } from '@material-ui/core/styles'

import Filtros from '../Filtros'
import { get } from '../../services/api'

import styles from './styles'

class Painel extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      dadosFiltrados: {},
      holeType: 'N',
      wellType: 'D',

      mtdFrom: 500,
      mtdTo: 1000,
      drilledIntFrom: 500,
      drilledIntTo: 1000,
      wellTypeList: [],
      holeTypeList: [],
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  handleLimparCampos = () => {
    this.setState({
      dadosFiltrados: {},
      holeType: '',
      wellType: '',

      mtdFrom: '',
      mtdTo: '',
      drilledIntFrom: '',
      drilledIntTo: '',
    })
  }

  componentWillMount = () => {
    const wellTypeList = get('well')
    const holeTypeList = get('hole')
    this.setState({ wellTypeList, holeTypeList })
  }

  handleSearch = () => {
    const dadosFiltrados = get('painel', this.state)
    this.setState({ dadosFiltrados })
  }

  render() {
    const {
      dadosFiltrados,
      holeType,
      wellType,
      mtdFrom,
      mtdTo,
      drilledIntFrom,
      drilledIntTo,
      wellTypeList,
      holeTypeList,
    } = this.state
    const { classes } = this.props
    return (
      <div>
        <Filtros
          handleChange={this.handleChange}
          holeType={holeType}
          wellType={wellType}
          mtdFrom={mtdFrom}
          mtdTo={mtdTo}
          drilledIntFrom={drilledIntFrom}
          drilledIntTo={drilledIntTo}
          handleSearch={this.handleSearch}
          wellTypeList={wellTypeList}
          holeTypeList={holeTypeList}
          handleLimparCampos={this.handleLimparCampos}
        />
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
