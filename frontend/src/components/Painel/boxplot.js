const boxplot = {
  getOption: dados => {
    const option = {
      title: {
        text: 'Michelson-Morley Experiment',
        left: 'center',
      },

      toolbox: {
        feature: {
          saveAsImage: { show: true, title: 'Salvar imagem' },
          dataZoom: {
            title: { zoom: 'Ampliar', back: 'Restaurar' },
          },
        },
        left: '3%',
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: dados.groupName,
        scale: true,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        axisLabel: {
          formatter: '{value}',
        },
      },
      yAxis: {
        type: 'value',
        name: 'km/s minus 299,000',
        splitArea: {
          show: true,
        },
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
          y: '90%',
          start: 50,
          end: 100,
        },
      ],

      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          data: dados.dados,

          tooltip: {
            formatter: function(param) {
              return [
                'Experiment ' + param.name + ': ',
                'upper: ' + param.data[5],
                'Q3: ' + param.data[4],
                'median: ' + param.data[3],
                'Q1: ' + param.data[2],
                'lower: ' + param.data[1],
              ].join('<br/>')
            },
          },
        },
      ],
    }
    return option
  },
}

export default boxplot
