import React, { Component } from 'react'

import './config/reactotron'

import BarraSup from './components/BarraSup'
import Painel from './components/Painel'

import './globals/styles.css'

class App extends Component {
  render() {
    return (
      <div>
        <BarraSup />
        <Painel />
      </div>
    )
  }
}

export default App
