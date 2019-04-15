import dados from './dadosObject.json'
import { preparaArrayTempoDryHoleDays } from '../modules/charts'

export const get = (rota, filtros) => {
  if (rota === 'hole') return getHoleType()
  if (rota === 'well') return getWellType()
  if (rota === 'painel') return getDadosFiltrados(filtros)
}

const getHoleType = () => {
  return [
    { value: null, name: 'All' },
    { value: 'N', name: 'New Well' },
    { value: 'S', name: 'Slot Recovery / Slot Enhancement' },
    { value: 'G', name: 'Geological Sidetrack' },
    { value: 'O', name: 'Other' },
    { value: '-', name: '-' },
  ]
}

const getWellType = () => {
  return [
    { value: null, name: 'All' },
    { value: 'D', name: 'Development' },
    { value: 'A', name: 'Appraisal' },
    { value: 'E', name: 'Exploration' },
  ]
}

const getDadosFiltrados = ({ holeType, wellType, mtdFrom, mtdTo, drilledIntFrom, drilledIntTo }) => {
  const dadosFiltrados = []
  dados.forEach(item => {
    let filter = holeType ? item.holeType === holeType : true
    filter = filter && (wellType ? item.wellType === wellType : true)
    filter = filter && (mtdFrom ? item.mtdInm >= mtdFrom : true)
    filter = filter && (mtdTo ? item.mtdInm <= mtdTo : true)
    filter = filter && (drilledIntFrom ? item.drilledIntervalInm >= drilledIntFrom : true)
    filter = filter && (drilledIntTo ? item.drilledIntervalInm <= drilledIntTo : true)
    if (filter) dadosFiltrados.push(item)
  })

  return preparaArrayTempoDryHoleDays(dadosFiltrados)
}

// "holeType": "N",
// "wellType": "D",
// "mtdInm": 4800,
// "drilledIntervalInm": 5490,
// "groupName": "Eni",
// "formalWellName": "LES-24 Hor",
// "dryHoleDaysPer1000m": 22.47,
// "dryHoleDays": 1
