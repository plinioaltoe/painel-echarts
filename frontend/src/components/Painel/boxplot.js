const boxplot = {
  getOption: dados => {
    const option = {
      title: {
        text: dados.totalWellsGeral && `Dry hole days / 1,000m by Group (${dados.totalWellsGeral} Wells)`,
        subtext: dados.totalWellsGeral && 'sorted by P50 values',
        left: 'center',
        padding: [0, 0, 2000, 0],
      },

      toolbox: {
        feature: {
          saveAsImage: { show: true, title: 'Salvar imagem' },
          dataZoom: {
            title: { zoom: 'Ampliar', back: 'Restaurar' },
          },
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
        bottom: '15%',
        height: '70%',
      },
      xAxis: {
        type: 'category',
        data: dados.groupName,
        nameGap: 30,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 10,
        axisLabel: {
          formatter: '{value}',
          rotate: 30,
          margin: 18,
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitArea: {
          show: true,
        },
        name: 'Dry hole days / 1,000m',

        nameTextStyle: {
          padding: 30,
          fontWeight: 'bold',

          // formatter: ['{name|styleName}'].join('\n'),

          // rich: {
          //   name: {
          //     color: 'red',
          //     lineHeight: 10,
          //   },
          //   b: {
          //     backgroundColor: {
          //       image: 'xxx/xxx.jpg',
          //     },
          //     height: 40,
          //   },
          //   x: {
          //     fontSize: 18,
          //     fontFamily: 'Microsoft YaHei',
          //     borderColor: '#449933',
          //     borderRadius: 4,
          //   },
          // },
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
          start: 50,
          end: 100,
        },
      ],

      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          data: dados.dados,
          itemStyle: {
            borderColor: 'rgba(0,0,0,0.4)',
            shadowColor: 'rgba(0,0,0,0.4)',
          },
        },
      ],
    }
    return option
  },
}

export default boxplot
