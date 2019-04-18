import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { withStyles } from '@material-ui/core/styles'
import boxplot from './boxplot'

import Filtros from '../Filtros'
import { get } from '../../services/api'

import styles from './styles'

class Painel extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      dadosFiltrados: {},
      holeType: [],
      wellType: [],
      year: [],
      mtdFrom: 500,
      mtdTo: 1000,
      drilledIntFrom: 500,
      drilledIntTo: 1000,
      wellTypeList: [],
      holeTypeList: [],
      yearList: [],
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
  }

  handleLimparCampos = () => {
    this.setState({
      dadosFiltrados: {},
      holeType: [],
      wellType: [],
      year: [],

      mtdFrom: '',
      mtdTo: '',
      drilledIntFrom: '',
      drilledIntTo: '',
    })
  }

  componentWillMount = () => {
    const wellTypeList = get('well')
    const holeTypeList = get('hole')
    const yearList = get('year')
    this.setState({ wellTypeList, holeTypeList, yearList })
  }

  handleSearch = () => {
    const {
      holeType, wellType, year, mtdFrom, mtdTo, drilledIntFrom, drilledIntTo,
    } = this.state
    const filtros = {
      holeType,
      wellType,
      year,
      mtdFrom,
      mtdTo,
      drilledIntFrom,
      drilledIntTo,
    }
    const dadosFiltrados = get('painel', filtros)
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
      year,
      yearList,
    } = this.state
    const { classes } = this.props
    return (
      <div>
        <Filtros
          handleChange={this.handleChange}
          holeType={holeType}
          wellType={wellType}
          year={year}
          mtdFrom={mtdFrom}
          mtdTo={mtdTo}
          drilledIntFrom={drilledIntFrom}
          drilledIntTo={drilledIntTo}
          handleSearch={this.handleSearch}
          wellTypeList={wellTypeList}
          holeTypeList={holeTypeList}
          yearList={yearList}
          handleLimparCampos={this.handleLimparCampos}
        />
        <div className={classes.container}>
          <ReactEcharts
            option={boxplot.getOption(dadosFiltrados)}
            style={{ height: '800px', width: '100%' }}
            className="react_for_echarts"
            notMerge
            lazyUpdate
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Painel)
