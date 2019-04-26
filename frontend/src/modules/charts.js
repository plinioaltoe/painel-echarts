const ordenarLegendaPorTotalWells = legenda => legenda.sort((a, b) => b.split('(')[1].slice(0, -1) - a.split('(')[1].slice(0, -1))

const separarEmArraysPorAtributo = (dados) => {
  const { empresas, legenda } = dados
  const groupName = []

  const series = []

  let totalWellsGeral = 0

  const legendaOrdenada = !!legenda && ordenarLegendaPorTotalWells(legenda)

  for (let k = 0; k < empresas.length; k += 1) {
    totalWellsGeral += empresas[k].empresaTotalWells
    groupName[k] = empresas[k].groupName
    series[k] = empresas[k].series
  }
  legendaOrdenada.push('Others')
  const novoArrayEmpresas = {
    totalWellsGeral,
    groupName,
    series,
    legenda: legendaOrdenada,
  }

  return novoArrayEmpresas
}
function isEmpty(obj) {
  return obj ? Object.keys(obj).length === 0 : true
}

const getToolTip = () => ({
  formatter(param) {
    let numWells = ''

    let company = ''
    if (isEmpty(param.name)) {
      numWells = param.seriesName.split('(')[1].slice(0, -1)
      company = param.seriesName.split('(')[0].slice(0, -1)
    } else {
      numWells = param.name.split('(')[1].slice(0, -1)
      company = param.name.split('(')[0].slice(0, -1)
    }
    return [
      `<strong>${company}</strong><hr style="margin: 0; padding:0; border-width: 2px;">`,
      '<div style="width: 100px;display: flex; flex-direction: column">',
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P25: </div><div>${
        param.value[2]
      }</div></div>`,
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P50: </div><div>${
        param.value[3]
      }</div></div>`,
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P75: </div><div>${
        param.value[4]
      }</div></div><hr>`,
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Min: </div><div>${
        param.value[1]
      }</div></div>`,
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Max: </div><div>${
        param.value[5]
      }</div></div><hr>`,
      `<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Wells: </div><div>${numWells}</div>`,
      '</div>',
    ].join(' ')
  },
})

function getSeriesData(dados) {
  const empresas = dados
  let aux = []
  const legenda = []

  if (isEmpty(dados)) return []
  for (let i = 0; i < dados.length; i += 1) {
    aux = []
    for (let j = 0; j < dados.length; j += 1) {
      if (i === j) {
        aux.push(dados[i].series.data)
      } else aux.push([])
    }

    empresas[i].series.data = aux

    if (dados[i].legenda) legenda.push(dados[i].groupName)
  }

  return { empresas, legenda }
}

const setEstilosDasEmpresas = (empresasRecebidas) => {
  const empresas = empresasRecebidas
  let idPetrobras = -1

  for (let i = 0; i < empresas.length; i += 1) {
    let color = 'gray'
    if (empresas[i].groupName.split(' ')[0] === 'Petrobras') {
      empresas[i].legenda = true
      color = 'lightgreen'
      idPetrobras = i
    } else {
      switch (i) {
        case 0:
          color = 'salmon'
          empresas[i].legenda = true
          break
        case 1:
          color = 'blue'
          empresas[i].legenda = true
          break
        case 2:
          color = 'yellow'
          empresas[i].legenda = true
          break
        case 3:
          color = 'red'
          empresas[i].legenda = true
          break
        case 4:
          color = 'magenta'
          empresas[i].legenda = true
          break
        case 5:
          if (idPetrobras === -1) break
          color = 'cyan'
          empresas[i].legenda = true
          break
        default:
          color = 'gray'
          empresas[i].legenda = false
      }
    }

    empresas[i].series.ordem = i
    let nome = 'Others'
    if (empresas[i].legenda) nome = empresas[i].groupName
    empresas[i].series.name = nome
    empresas[i].series.itemStyle = {
      normal: {
        opacity: 0.7,
        color,
        borderColor: color,
        borderWidth: 2,
      },
      emphasis: {
        opacity: 0.5,
      },
    }
    empresas[i].series.boxWidth = ['20%', '100%']
    empresas[i].series.type = 'boxplot'
    empresas[i].series.tooltip = getToolTip()
  }

  return empresas
}

const calculaMediana = (serie) => {
  if (serie.length === 0) {
    return 0
  }

  if (serie.length < 2) return serie[0]

  const middle = Math.floor(serie.length / 2)
  const isEven = serie.length % 2 === 0
  return isEven ? (serie[middle] + serie[middle - 1]) / 2 : serie[middle]
}

const calculaSeparatriz = (dados) => {
  let P25 = 0

  let P50 = 0

  let P75 = 0
  const serie25 = []

  const serie75 = []

  if (!dados) return 0
  if (dados.length < 2) return { P25: dados[0], P50: dados[0], P75: dados[0] }

  const middle = Math.floor(dados.length / 2)
  const isEven = dados.length % 2 === 0

  P50 = isEven ? (dados[middle] + dados[middle - 1]) / 2 : dados[middle]
  if (dados.length === 2) return { P25: dados[0], P50, P75: dados[1] }

  for (let i = 0; i < dados.length; i += 1) {
    if (i > middle) serie75.push(dados[i])
    if (isEven) {
      if (i < middle - 1) serie25.push(dados[i])
    } else if (i < middle) serie25.push(dados[i])
  }

  P25 = calculaMediana(serie25)
  P75 = calculaMediana(serie75)

  const separatriz = {
    P25,
    P50,
    P75,
  }

  return separatriz
}

const countUnique = iterable => new Set(iterable).size

const ordenaECalculaSeparatriz = (empresas) => {
  const empresasComDadosAjustados = []
  if (!empresas) return empresasComDadosAjustados

  for (let i = 0, len = empresas.length; i < len; i += 1) {
    const dadosOrdenados = empresas[i].dryHoleDaysPer1000m.sort((a, b) => a - b)
    const separatriz = calculaSeparatriz(dadosOrdenados)
    const min = dadosOrdenados[0]
    const max = dadosOrdenados[dadosOrdenados.length - 1]

    const series = {
      data: [
        Number(min.toFixed(2)),
        Number(separatriz.P25.toFixed(2)),
        Number(separatriz.P50.toFixed(2)),
        Number(separatriz.P75.toFixed(2)),
        Number(max.toFixed(2)),
      ],
      itemStyle: {},
    }

    empresasComDadosAjustados.push({
      groupName: `${empresas[i].groupName} (${countUnique(empresas[i].wells)})`,
      series,
      P50: separatriz.P50,
      empresaTotalWells: countUnique(empresas[i].wells),
    })
  }

  const empresasOrdenadasPorTotalWells = empresasComDadosAjustados.sort(
    (a, b) => b.empresaTotalWells - a.empresaTotalWells,
  )
  const empresasComEstilosDeGrafico = setEstilosDasEmpresas(empresasOrdenadasPorTotalWells)
  const empresasOrdenadasPorP50 = empresasComEstilosDeGrafico.sort((a, b) => a.P50 - b.P50)
  const empresasComDadosDeSerieComplementados = getSeriesData(empresasOrdenadasPorP50)
  const empresasAjustadas = separarEmArraysPorAtributo(empresasComDadosDeSerieComplementados)

  return empresasAjustadas
}

export const preparaArrayTempoDryHoleDays = (dataBench) => {
  const empresas = []

  if (!dataBench) return empresas

  for (let i = 0, len = dataBench.length; i < len; i += 1) {
    const index = empresas.findIndex(item => dataBench[i].groupName === item.groupName)
    const existeNoArray = index >= 0
    if (!existeNoArray) {
      const novaEmpresa = {
        groupName: dataBench[i].groupName,
        dryHoleDaysPer1000m: [dataBench[i].dryHoleDaysPer1000m],
        wells: [dataBench[i].formalWellName],
      }
      empresas.push(novaEmpresa)
    } else {
      empresas[index].dryHoleDaysPer1000m.push(dataBench[i].dryHoleDaysPer1000m)
      empresas[index].wells.push(dataBench[i].formalWellName)
    }
  }

  return ordenaECalculaSeparatriz(empresas)
}
