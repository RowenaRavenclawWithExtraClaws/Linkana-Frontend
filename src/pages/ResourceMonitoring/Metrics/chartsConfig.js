import { getMaxArrays, COLORS } from "../../../helpers/utility";

const CHARTHEIGHT = 281;
// temp data array for both cpu and gpu
export let tempData = (value) => [
  {
    type: "indicator",
    domain: { x: [0, 1], y: [0, 1] },
    value: value,
    number: {
      font: { size: 20, color: COLORS.white },
      color: COLORS.semiGray,
      suffix: " °C",
    },
    mode: "gauge+number",
    gauge: {
      bar: { color: COLORS.chartGreen, thickness: 0.4 },
      borderwidth: 0,
      axis: {
        range: [null, 100],
        ticksuffix: " °C",
        font: { color: COLORS.semiGray },
      },
      steps: [
        { range: [0, 75], color: COLORS.semiDark },
        { range: [75, 87.5], color: COLORS.chartOrange },
        { range: [87.5, 100], color: COLORS.crimson },
      ],
    },
  },
];

export let cpuData = (value) => [
  {
    type: "indicator",
    domain: { x: [0, 1], y: [0, 1] },
    value: value,
    number: {
      font: { size: 20, color: COLORS.white },
      color: COLORS.semiGray,
      suffix: " %",
    },
    mode: "gauge+number",
    gauge: {
      bar: { color: COLORS.chartGreen, thickness: 0.4 },
      axis: {
        range: [null, 100],
        ticksuffix: " %",
        font: { color: COLORS.semiGray },
      },
      borderwidth: 0,
      steps: [
        { range: [0, 75], color: COLORS.semiDark },
        { range: [75, 87.5], color: COLORS.chartOrange },
        { range: [87.5, 100], color: COLORS.crimson },
      ],
    },
  },
];

export let memData = (value, value1) => [
  {
    type: "indicator",
    domain: { x: [0, 1], y: [0, 1] },
    value: value,
    mode: "gauge+number",
    number: {
      font: { size: 20, color: COLORS.white },
      color: COLORS.semiGray,
      suffix: " MB",
    },
    gauge: {
      bar: { color: COLORS.chartGreen, thickness: 0.4 },
      borderwidth: 0,
      axis: {
        range: [null, value1 * 1000],
        ticksuffix: " MB",
        tickangle: 0,
        nticks: 3,
      },
      steps: [
        {
          range: [0, 0.75 * value1 * 1000],
          color: COLORS.semiDark,
        },
        {
          range: [0.75 * value1 * 1000, 0.875 * value1 * 1000],
          color: COLORS.chartOrange,
        },
        {
          range: [0.875 * value1 * 1000, value1 * 1000],
          color: COLORS.crimson,
        },
      ],
    },
  },
];

export let storageData = (value, value1) => [
  {
    type: "indicator",
    domain: { x: [0, 1], y: [0, 1] },
    value: value,
    number: {
      font: { size: 20, color: COLORS.white },
      color: COLORS.semiGray,
      suffix: " GB",
    },
    mode: "gauge+number",
    gauge: {
      bar: { color: COLORS.chartGreen, thickness: 0.4 },
      borderwidth: 0,
      axis: {
        range: [null, value1],
        ticksuffix: " GB",
        font: { color: COLORS.semiGray },
        tickangle: 0,
        nticks: 5,
      },

      steps: [
        {
          range: [0, 0.75 * value1],
          color: COLORS.semiDark,
        },
        {
          range: [0.75 * value1, 0.875 * value1],
          color: COLORS.chartOrange,
        },
        {
          range: [0.875 * value1, value1],
          color: COLORS.crimson,
        },
      ],
    },
  },
];

// temp data array for both cpu and gpu charts
export let tempChartData = (
  timeTemp,
  updated,
  curDataSrc,
  cpuTemp,
  gpuTemp
) => [
  {
    x: timeTemp,
    y: updated ? (curDataSrc === "CPU" ? cpuTemp : gpuTemp) : cpuTemp,
    type: "scatter",
    hoverinfo: "x+y",
    mode: "markers",
    name: "mean_cpu_thermal",
    marker_color: updated
      ? curDataSrc === "CPU"
        ? cpuTemp
        : gpuTemp
      : cpuTemp,
    marker: {
      color: updated ? (curDataSrc === "CPU" ? cpuTemp : gpuTemp) : cpuTemp,
      symbol: "square",
      colorscale: "Reds",
    },
  },
];

export let cpuChartData = (timeCPU, cpuUsageUser, cpuUsageSystem) => [
  {
    x: timeCPU,
    y: cpuUsageUser,
    type: "scatter",
    fill: "tonexty",
    mode: "lines",
    line: { width: 0.5, color: COLORS.mint },
    fillcolor: COLORS.mint,
    name: "usage_user",
  },
  {
    x: timeCPU,
    y: cpuUsageSystem,
    type: "scatter",
    fill: "tonexty",
    mode: "lines",
    line: { width: 0.5, color: COLORS.paleOrange },
    fillcolor: COLORS.paleOrange,
    name: "usage_system",
  },
];

export let memChartData = (
  timeMem,
  updated1,
  curDataSrc1,
  memPercent,
  diskUsagePercentage
) => [
  {
    x: timeMem,
    y: updated1
      ? curDataSrc1 === "Memory"
        ? memPercent
        : diskUsagePercentage
      : memPercent,
    type: "scatter",
    mode: "lines",
    line: { width: 1, color: "#00cec9" },
    name: "mem_used",
  },
];

export let signalChartData = (timeNetwork, signalLevel) => [
  {
    x: timeNetwork,
    y: signalLevel,
    type: "scatter",
    hoverinfo: "x+y",
    mode: "markers",
    name: "rssi",
  },
];

// layout for the small half-rounded charts
export let tachoCardLayout = {
  height: CHARTHEIGHT,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
  paper_bgcolor: "transparent",
  font: {
    color: COLORS.white,
  },
};

// layout for the big half-rounded cpu chart
export let tachoCardBigLayout = {
  height: CHARTHEIGHT,
  margin: {
    l: 30,
    r: 30,
    b: 5,
    t: 10,
    pad: 0,
  },
  paper_bgcolor: "transparent",
  font: {
    color: COLORS.white,
  },
};

export let tempChartLayout = (timeRangeTemp, cpuTemp) => [
  {
    height: CHARTHEIGHT,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 50,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: COLORS.darker,
    font: {
      color: COLORS.white,
    },
    xaxis: {
      title: { text: "time", font: { size: 11 }, standoff: 10 },
      type: "date",
      automargin: true,
      showgrid: true,
      nticks: 5,
      tickformat: timeRangeTemp < 700 ? "%H:%M" : "%a %d\n%H:%M",
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    yaxis: {
      title: { text: "T [°C]", font: { size: 11 }, standoff: 15 },
      automargin: true,
      showgrid: true,
      range: [
        cpuTemp.length
          ? cpuTemp.reduce((val1, val2) => Math.min(val1, val2)) - 1
          : 0,
        cpuTemp.length
          ? cpuTemp.reduce((val1, val2) => Math.max(val1, val2)) + 1
          : 1,
      ],
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    modebar: {
      bgcolor: "transparent",
      color: COLORS.white,
      activecolor: COLORS.linkanaOrange,
    },
  },
];

export let cpuChartLayout = (timeRangeCpu, cpuUsageUser, cpuUsageSystem) => [
  {
    height: CHARTHEIGHT,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 50,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: COLORS.darker,
    font: {
      color: COLORS.white,
    },
    xaxis: {
      type: "date",
      title: { text: "time", font: { size: 12 }, standoff: 10 },
      automargin: true,
      showgrid: true,
      nticks: 5,
      tickformat: timeRangeCpu < 700 ? "%H:%M" : "%a %d\n%H:%M",
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    yaxis: {
      title: { text: "usage [%]", font: { size: 12 }, standoff: 15 },
      automargin: true,
      showgrid: true,
      range: [
        0,
        Math.min(
          100,
          cpuUsageUser.length
            ? getMaxArrays(cpuUsageUser, cpuUsageSystem) * 1.2
            : 0
        ),
      ],
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    legend: { yanchor: "bottom", orientation: "h", y: 50 },
    modebar: {
      bgcolor: "transparent",
      color: COLORS.white,
      activecolor: COLORS.linkanaOrange,
    },
  },
];

export let memChartLayout = (
  timeRangeMem,
  updated1,
  curDataSrc1,
  memPercent,
  diskUsagePercentage
) => [
  {
    height: CHARTHEIGHT,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 50,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: COLORS.darker,
    font: {
      color: COLORS.white,
    },
    xaxis: {
      type: "date",
      title: { text: "time", font: { size: 12 }, standoff: 10 },
      automargin: true,
      showgrid: true,
      nticks: 5,
      tickformat: timeRangeMem < 700 ? "%H:%M" : "%a %d\n%H:%M",
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    yaxis: {
      title: { text: "usage [%]", font: { size: 12 }, standoff: 15 },
      automargin: true,
      showgrid: true,
      range: updated1
        ? curDataSrc1 === "Memory"
          ? [
              Math.min.apply(null, memPercent) * 0.95,
              Math.max.apply(null, memPercent) * 1.05,
            ]
          : [
              Math.min.apply(null, diskUsagePercentage) * 0.95,
              Math.max.apply(null, diskUsagePercentage) * 1.05,
            ]
        : [
            Math.min.apply(null, memPercent) * 0.95,
            Math.max.apply(null, memPercent) * 1.05,
          ],
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    legend: { yanchor: "bottom", orientation: "h", y: 50 },
    modebar: {
      bgcolor: "transparent",
      color: COLORS.white,
      activecolor: COLORS.linkanaOrange,
    },
    grid: { pattern: "coupled" },
  },
];

export let signalChartLayout = (timeRangeNetwork, signalLevel) => [
  {
    height: CHARTHEIGHT,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 25,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: COLORS.darker,
    font: {
      color: COLORS.white,
    },
    xaxis: {
      title: { text: "time", font: { size: 11 }, standoff: 12 },
      type: "date",
      automargin: true,
      showgrid: true,
      nticks: 10,
      tickformat: timeRangeNetwork < 700 ? "%H:%M" : "%a %d\n%H:%M",
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    yaxis: {
      title:
        signalLevel.length > 0
          ? { text: "Signal Level [dBm]", font: { size: 11 }, standoff: 15 }
          : { text: "Signal Level [%]", font: { size: 11 }, standoff: 15 },
      automargin: true,
      showgrid: true,
      range: [
        Math.min.apply(null, signalLevel) * 1.1,
        Math.max.apply(null, signalLevel) * 0.9,
      ],
      tickwidth: 2,
      tickcolor: COLORS.dark,
    },
    modebar: {
      bgcolor: "transparent",
      color: COLORS.white,
      activecolor: COLORS.linkanaOrange,
    },
  },
];

export let config = {
  responsive: true,
  modeBarButtonsToRemove: ["toImage"],
  displaylogo: false,
};
