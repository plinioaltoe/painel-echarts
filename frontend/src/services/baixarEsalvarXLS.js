import React, { Component } from 'react'
import writeFileP from 'write-file-p'
import { OutTable, ExcelRenderer } from 'react-excel-renderer'

// import { Container } from './styles';

export default class BaixarESalvarXLS extends Component {
  state = {
    rows: [],
    cols: [],
  }

  fileHandler = event => {
    let fileObj = event.target.files[0]

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        this.setState(
          {
            cols: resp.cols,
            rows: resp.rows,
          },
          () => {
            this.transpor()
          },
        )
      }
    })
  }

  transpor = () => {
    const { rows } = this.state
    const holeType = [],
      wellType = [],
      holeTypeName = [],
      wellTypeName = [],
      mtdInM = [],
      drilledIntervalInM = [],
      groupName = [],
      formalWellName = [],
      dryHoleDaysPer1000m = [],
      dryHoleDays = []

    for (let i = 1; i < rows.length; i += 1) {
      holeType.push(rows[i][0])
      wellType.push(rows[i][1])
      mtdInM.push(rows[i][2])
      drilledIntervalInM.push(rows[i][3])
      groupName.push(rows[i][4])
      formalWellName.push(rows[i][5])
      dryHoleDaysPer1000m.push(rows[i][6])
      dryHoleDays.push(rows[i][7])

      let encontrou = -1
      switch (rows[i][0]) {
        case 'O':
          encontrou = holeTypeName.findIndex(i => i === 'Other') >= 0
          if (!encontrou) holeTypeName.push('Other')
          break
        case 'S':
          encontrou = holeTypeName.findIndex(i => i === 'Slot Recovery / Slot Enhancement') >= 0
          if (!encontrou) holeTypeName.push('Slot Recovery / Slot Enhancement')
          break
        case 'G':
          encontrou = holeTypeName.findIndex(i => i === 'Geological Sidetrack') >= 0
          if (!encontrou) holeTypeName.push('Geological Sidetrack')
          break
        case 'N':
          encontrou = holeTypeName.findIndex(i => i === 'New Well') >= 0
          if (!encontrou) holeTypeName.push('New Well')
          break
        default:
          holeTypeName.push(`Erro na posição ${i}`)
          break
      }

      switch (rows[i][1]) {
        case 'D':
          encontrou = holeTypeName.findIndex(i => i === 'Development') >= 0
          if (!encontrou) wellTypeName.push('Development')
          break
        case 'A':
          encontrou = holeTypeName.findIndex(i => i === 'Appraisal') >= 0
          if (!encontrou) wellTypeName.push('Appraisal')
          break
        case 'E':
          encontrou = holeTypeName.findIndex(i => i === 'Exploration') >= 0
          if (!encontrou) wellTypeName.push('Exploration')
          break
        default:
          wellTypeName.push(`Erro na posição ${i}`)
          break
      }
    }

    const stringTofile = `
    export const holeType = ${holeType},
    export const wellType = ${wellType},
    export const holeTypeName = ${wellType},
    export const wellTypeName = ${wellTypeName},
    export const mtdInM = ${mtdInM},
    export const drilledIntervalInM = ${drilledIntervalInM},
    export const groupName = ${groupName},
    export const formalWellName = ${formalWellName},
    export const dryHoleDaysPer1000m = ${dryHoleDaysPer1000m},
    export const dryHoleDays = ${dryHoleDays}
    `
    console.log(__dirname)
    console.log(stringTofile)

    writeFileP(`./data.js`, stringTofile, (err, data) => {
      console.log(err || data)
    })
  }

  render() {
    return (
      <div>
        {' '}
        <input type="file" onChange={this.fileHandler.bind(this)} style={{ padding: '10px' }} />
        <OutTable
          data={this.state.rows}
          columns={this.state.cols}
          tableClassName="ExcelTable2007"
          tableHeaderRowClass="heading"
        />
      </div>
    )
  }
}
