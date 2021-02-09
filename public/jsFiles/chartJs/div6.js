var config = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "New Patients",
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        fill: false,
        data: [10, 20, 30, 40, 100, 50, 150],
      },
      {
        label: "Old Patients",
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        fill: false,
        data: [50, 300, 100, 450, 150, 200, 300],
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Hospital Survey",
    },
    scales: {
      xAxes: [
        {
          display: false,
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          //type: 'logarithmic',
          scaleLabel: {
            display: true,
            labelString: "Index Returns",
          },
          ticks: {
            min: 0,
            max: 500,

            // forces step size to be 5 units
            stepSize: 100,
          },
        },
      ],
    },
  },
};

window.onload = function () {
  var ctx = document.getElementById("div6").getContext("2d");
  window.myLine = new Chart(ctx, config);
};
