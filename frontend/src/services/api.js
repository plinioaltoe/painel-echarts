import dados from './dados.json'
import { preparaArrayTempoDryHoleDays } from '../modules/charts'

const getHoleType = () => [
  // { value: 'All', name: 'All' },
  { value: 'N', name: 'New Well' },
  { value: 'S', name: 'Slot Recovery / Slot Enhancement' },
  { value: 'G', name: 'Geological Sidetrack' },
  { value: 'O', name: 'Other' },
  { value: '-', name: '-' },
]

const getWellType = () => [
  // { value: 'All', name: 'All' },
  { value: 'D', name: 'Development' },
  { value: 'A', name: 'Appraisal' },
  { value: 'E', name: 'Exploration' },
]

const getYear = () => {
  const year = []
  dados.forEach((item) => {
    if (!year.includes(item.year)) year.push(item.year)
  })
  year.sort((a, b) => a - b)
  return year
}

const filtraEmObjetos = (filtro, item) => {
  let pertenceAofiltro = false
  filtro.forEach((f) => {
    if (f.value === item) pertenceAofiltro = true
  })
  return pertenceAofiltro
}

const filtraEmArrays = (filtro, item) => {
  let pertenceAofiltro = false
  filtro.forEach((f) => {
    if (f === item) pertenceAofiltro = true
  })
  return pertenceAofiltro
}


const getDadosFiltrados = ({
  holeType,
  wellType,
  mtdFrom,
  mtdTo,
  drilledIntFrom,
  drilledIntTo,
  year,
}) => {
  const dadosFiltrados = []
  dados.forEach((item) => {
    let filter = holeType.length === 0 ? true : filtraEmObjetos(holeType, item.holeType)
    filter = filter && (wellType.length === 0 ? true : filtraEmObjetos(wellType, item.wellType))
    filter = filter && (mtdFrom === '' ? true : item.mtdInm >= mtdFrom)
    filter = filter && (mtdTo === '' ? true : item.mtdInm <= mtdTo)
    filter = filter && (drilledIntFrom === '' ? true : item.drilledIntervalInm >= drilledIntFrom)
    filter = filter && (drilledIntTo === '' ? true : item.drilledIntervalInm <= drilledIntTo)
    filter = filter && (year.length === 0 ? true : filtraEmArrays(year, item.year))

    if (filter) dadosFiltrados.push(item)
  })

  return preparaArrayTempoDryHoleDays(dadosFiltrados)
}

export const get = (rota, filtros) => {
  if (rota === 'hole') return getHoleType()
  if (rota === 'well') return getWellType()
  if (rota === 'year') return getYear()
  if (rota === 'painel') return getDadosFiltrados(filtros)

  return []
}
