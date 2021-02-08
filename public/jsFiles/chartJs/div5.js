WebFontConfig = {
  google: { families: ["Iceland", "Open Sans", "Galindo"] },
  active: function () {
    DrawTheChart(ChartData, ChartOptions, "div5", "bar");
  },
};

function DrawTheChart(ChartData, ChartOptions, ChartId, ChartType) {
  eval(
    'var myLine = new Chart(document.getElementById(ChartId).getContext("2d"),{type:"' +
      ChartType +
      '",data:ChartData,options:ChartOptions});document.getElementById(ChartId).getContext("2d").stroke();'
  );
}
function MoreChartOptions() {}
var ChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      data: [65, 8, 90, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(52,152,219,1)",
        "rgba(46,204,113,1)",
        "rgba(155,89,182,1)",
        "rgba(241,196,15,1)",
        "rgba(189,195,199,1)",
        "rgba(83,21,119,0.3)",
        "rgba(205,251,187,0.7)",
      ],
      borderColor: [
        "rgba(136,136,136,0.5)",
        "rgba(170,170,170,1)",
        "rgba(155,89,182,1)",
        "rgba(241,196,15,1)",
        "rgba(189,195,199,1)",
        "rgba(83,21,119,0.4)",
        "rgba(205,251,187,1)",
      ],
      label: "Active Cases",
    },

    {
      data: [21, 48, 40, 19, 96, 27, 100],
      backgroundColor: [
        "rgba(52,152,219,1)",
        "rgba(46,204,113,1)",
        "rgba(155,89,182,1)",
        "rgba(241,196,15,1)",
        "rgba(189,195,199,1)",
        "rgba(83,21,119,0.3)",
        "rgba(205,251,187,0.7)",
      ],
      borderColor: [
        "rgba(136,136,136,0.5)",
        "rgba(170,170,170,1)",
        "rgba(155,89,182,1)",
        "rgba(241,196,15,1)",
        "rgba(189,195,199,1)",
        "rgba(83,21,119,0.4)",
        "rgba(205,251,187,1)",
      ],
      label: "Deaths",
    },
  ],
};
ChartOptions = {
  responsive: true,
  layout: { padding: { top: 12, left: 12, bottom: 12 } },
  scales: {
    xAxes: [
      {
        gridLines: { display: false },
      },
    ],

    yAxes: [
      {
        gridLines: { display: false },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: true,
      font: {
        style: " bold",
      },
    },
  },
  legend: {
    labels: {
      usePointStyle: true,

      generateLabels: function (chart) {
        return chart.data.datasets.map(function (dataset, i) {
          return {
            text: dataset.label,
            lineCap: dataset.borderCapStyle,
            lineDash: [],
            lineDashOffset: 0,
            lineJoin: dataset.borderJoinStyle,
            pointStyle: "circle",
            fillStyle: "#ffffff",
            strokeStyle: dataset.borderColor,
            lineWidth: dataset.pointBorderWidth,
            lineDash: dataset.borderDash,
          };
        });
      },
    },
  },

  title: {
    display: true,
    text: "Corona Report",
    fontColor: "#3498db",
    fontFamily: "Iceland",
    fontSize: 32,
    fontStyle: " bold",
  },
  elements: {
    arc: {},
    line: {},
    rectangle: {
      borderWidth: 3,
    },
  },
  tooltips: {},
  hover: {
    mode: "nearest",
    animationDuration: 400,
  },
};
DrawTheChart(ChartData, ChartOptions, "div5", "bar");
