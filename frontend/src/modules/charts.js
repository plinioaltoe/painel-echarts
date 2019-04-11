const separarEmArraysPorAtributo = empresas => {
  var P50 = [],
    groupName = [],
    data = [],
    totalWellsGeral = 0
  for (var k = 0; k < empresas.length; k++) {
    totalWellsGeral += empresas[k].empresaTotalWells
    P50[k] = empresas[k].P50
    groupName[k] = empresas[k].groupName
    data[k] = empresas[k].data
  }

  var novoArrayEmpresas = {
    totalWellsGeral: totalWellsGeral,
    P50: P50,
    groupName: groupName,
    dados: data,
  }

  return novoArrayEmpresas
}

const getToolTip = () => {
  return {
    formatter: function(param) {
      const numWells = param.name.split('(')[1].slice(0, -1)
      const company = param.name.split('(')[0].slice(0, -1)
      return [
        '<strong>' + company + '</strong><hr style="margin: 0; padding:0; border-width: 2px;">',
        '<div style="width: 100px;display: flex; flex-direction: column">',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P25: </div><div>' +
          param.data.value[2] +
          '</div></div>',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P50: </div><div>' +
          param.data.value[3] +
          '</div></div>',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>P75: </div><div>' +
          param.data.value[4] +
          '</div></div><hr>',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Min: </div><div>' +
          param.data.value[1] +
          '</div></div>',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Max: </div><div>' +
          param.data.value[5] +
          '</div></div><hr>',
        '<div style="display: flex; flex-direction: row; justify-content: space-between"><div>Wells: </div><div>' +
          numWells +
          '</div>',
        '</div>',
      ].join(' ')
    },
  }
}

const setEstilosDasEmpresas = empresas => {
  for (var i = 0; i < empresas.length; i++) {
    var color = 'gray'
    if (empresas[i].groupName.split(' ')[0] === 'Petrobras') color = 'lightgreen'
    else {
      switch (i) {
        case 0:
          color = 'salmon'
          break
        case 1:
          color = 'blue'
          break
        case 2:
          color = 'yellow'
          break
        case 3:
          color = 'red'
          break
        case 4:
          color = 'magenta'
          break
        default:
          color = 'gray'
      }
    }

    empresas[i].data.itemStyle = {
      borderColor: color,
      normal: {
        color: color,
        lineStyle: {
          width: 3,
          color: color,
        },
      },
      emphasis: {
        color: color,
      },
    }

    empresas[i].data.tooltip = getToolTip()
  }

  return empresas
}

const calculaMediana = serie => {
  if (serie.length === 0) {
    return 0
  }

  if (serie.length < 2) return serie[0]

  var middle = Math.floor(serie.length / 2)
  var isEven = serie.length % 2 === 0
  return isEven ? (serie[middle] + serie[middle - 1]) / 2 : serie[middle]
}

const calculaSeparatriz = dados => {
  var P25 = 0,
    P50 = 0,
    P75 = 0
  var serie25 = [],
    serie75 = []

  if (!dados) return 0
  if (dados.length < 2) return { P25: dados[0], P50: dados[0], P75: dados[0] }

  var middle = Math.floor(dados.length / 2)
  var isEven = dados.length % 2 === 0

  P50 = isEven ? (dados[middle] + dados[middle - 1]) / 2 : dados[middle]
  if (dados.length === 2) return { P25: dados[0], P50, P75: dados[1] }

  for (let i = 0; i < dados.length; i++) {
    if (i > middle) serie75.push(dados[i])
    if (isEven) {
      if (i < middle - 1) serie25.push(dados[i])
    } else {
      if (i < middle) serie25.push(dados[i])
    }
  }

  P25 = calculaMediana(serie25)
  P75 = calculaMediana(serie75)

  var separatriz = {
    P25: P25,
    P50: P50,
    P75: P75,
  }

  return separatriz
}

const countUnique = iterable => {
  return new Set(iterable).size
}

const ordenaECalculaSeparatriz = empresas => {
  var empresasComDadosAjustados = []
  if (!empresas) return empresasComDadosAjustados

  for (var i = 0, len = empresas.length; i < len; i++) {
    var dadosOrdenados = empresas[i].dryHoleDaysPer1000m.sort(function(a, b) {
      return a - b
    })
    var separatriz = calculaSeparatriz(dadosOrdenados)
    var min = dadosOrdenados[0]
    var max = dadosOrdenados[dadosOrdenados.length - 1]

    var data = {
      value: [
        Number(min.toFixed(2)),
        Number(separatriz.P25.toFixed(2)),
        Number(separatriz.P50.toFixed(2)),
        Number(separatriz.P75.toFixed(2)),
        Number(max.toFixed(2)),
      ],
      itemStyle: {},
    }

    empresasComDadosAjustados.push({
      groupName: empresas[i].groupName + ` (${countUnique(empresas[i].wells)})`,
      data: data,
      P50: separatriz.P50,
      empresaTotalWells: countUnique(empresas[i].wells),
    })
  }

  var empresasOrdenadasPorTotalWells = empresasComDadosAjustados.sort(function(a, b) {
    return b.empresaTotalWells - a.empresaTotalWells
  })
  var empresasComEstilosDeGrafico = setEstilosDasEmpresas(empresasOrdenadasPorTotalWells)
  var empresasOrdenadasPorP50 = empresasComEstilosDeGrafico.sort(function(a, b) {
    return a.P50 - b.P50
  })
  var empresasAjustadas = separarEmArraysPorAtributo(empresasOrdenadasPorP50)

  return empresasAjustadas
}

export const preparaArrayTempoDryHoleDays = dataBench => {
  var empresas = []

  if (!dataBench) return empresas

  for (var i = 0, len = dataBench.length; i < len; i++) {
    var index = empresas.findIndex(item => dataBench[i].groupName === item.groupName) //getIndexEmpresaByName(empresas, dataBench[i].groupName)
    var existeNoArray = index >= 0 ? true : false
    if (!existeNoArray) {
      var novaEmpresa = {
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
