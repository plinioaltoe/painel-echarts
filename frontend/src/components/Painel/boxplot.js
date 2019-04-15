const boxplot = {
  getOption: dados => {
    //if (!isEmpty(dados)) console.log('dados.groupName', dados.groupName)
    const legenda = dados.legenda
    const series = dados.series

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
        show: true,
        data: !isEmpty(legenda) ? legenda : [],
        right: '0%',
        orient: 'vertical',
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
        bottom: dados.groupName ? (dados.groupName.length <= 15 ? '15%' : '25%') : '15%',
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
          rotate: dados.groupName ? (dados.groupName.length <= 15 ? 30 : 70) : 30,
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

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export default boxplot
