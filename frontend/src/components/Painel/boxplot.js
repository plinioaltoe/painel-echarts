function isEmpty(obj) {
  return obj ? Object.keys(obj).length === 0 : true
}

function getNumberWithOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']

  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function getBottomProperty(groupName) {
  if (groupName) {
    return groupName.length <= 15 ? '15%' : '25%'
  }
  return '15%'
}

function getRotateProperty(groupName) {
  if (groupName) {
    return groupName.length <= 15 ? 30 : 70
  }
  return 30
}

const boxplot = {
  getOption: (dados) => {
    const { legenda, series } = dados

    let counterLegend = 0
    const option = {
      title: {
        text: dados.totalWellsGeral && `Dry hole days / 1,000m by Group (${dados.totalWellsGeral} Wells)`,
        subtext: dados.totalWellsGeral && 'sorted by P50 values',
        left: 'center',
        padding: [
          0, // up
          100, // right
          0, // down
          100, // left
        ],
        backgroundColor: '#fff',
      },

      legend: {
        show: !isEmpty(legenda),
        data: !isEmpty(legenda) ? legenda : [],
        right: '0%',
        orient: 'vertical',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        formatter: (name) => {
          if (name === 'Others') return name
          if (counterLegend >= legenda.length - 1) counterLegend = 0
          counterLegend += 1
          const numWells = name.split('(')[1].slice(0, -1)
          const company = name.split('(')[0].slice(0, -1)
          return `${getNumberWithOrdinal(counterLegend)} - ${numWells} Wells - ${company}`
        },
      },

      toolbox: {
        feature: {
          saveAsImage: { show: true, title: 'Save image' },
        },
        left: '2%',
      },

      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'cross',
        },
      },

      grid: {
        height: '70%',
        width: '70%',
        bottom: getBottomProperty(dados.groupName),
      },

      xAxis: {
        type: 'category',
        data: !isEmpty(dados.groupName) ? dados.groupName : [],
        nameGap: 30,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        axisLabel: {
          formatter: '{value}',
          rotate: getRotateProperty(dados.groupName),
          margin: 18,
        },
      },

      yAxis: {
        type: 'value',
        scale: true,
        splitArea: {
          show: false,
        },
        name: ['Dry hole days / 1,000m', '(P50 values plotted, with P25/P75 box)'].join('\n'),
        nameTextStyle: {
          padding: 20,
        },
        nameLocation: 'center',
        boundaryGap: ['0%', '-50%'],
      },

      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          y: '95%',
          start: 0,
          end: 100,
        },
      ],

      series: !isEmpty(series) ? series : [],
    }
    return option
  },
}
export default boxplot
