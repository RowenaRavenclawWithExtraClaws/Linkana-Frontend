import React, { Component } from "react";
import Plotly from "plotly.js";
import { InfluxDB } from "@influxdata/influxdb-client";
import { Responsive } from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import * as ChartsConfig from "./chartsConfig";
import { devices, services } from "../../../helpers/endpoints";
import { HTTPSTATUS, rglCols } from "../../../helpers/utility";
import MetricsInfoCard from "./components/MetricsInfoCard";
import NoData from "../../../components/Common/NoData";
import ResetLayoutModal from "../../../components/Common/Modals/ResetLayoutModal";
import RoundedChart from "./components/RoundedChart";
import RoundedChartBig from "./components/RoundedChartBig";
import LineChart from "./components/LineChart";
import { fetchItem, fetchItems } from "../../../helpers/requests_helper";
import { Loader } from "../../../helpers/utility";
import ICONS from "../../../components/Common/icons";

// react-grid-layout general default parameters
const layoutMargin = [10, 10];
const resizeHandles = ["e"];
// react-grid-layout default parameters for info cards;
const cardWidth = 2;
const rowHeight = 90;
// react-grid-layout default parameters for meter cards;
const meterCardWidth = 4;
const meterCardHeight = 1;
const meterRowHeight = 350;

class MetricsCharts extends Component {
  constructor(props) {
    super(props);
    // info displayed by the info cards at the top of the page
    this.infoCardsInfo = [
      {
        title: "CPU",
        value: () =>
          `${this.state.cpuTemp[0] ? this.state.cpuTemp[0].toFixed(2) : 0}°C`,
        icon: ICONS.thermoIcon,
      },
      {
        title: "GPU",
        value: () =>
          `${this.state.gpuTemp[0] ? this.state.gpuTemp[0].toFixed(2) : 0}°C`,
        icon: ICONS.thermoIcon,
      },
      {
        title: "Cores",
        value: () => `${this.state.cpu}`,
        icon: ICONS.chipIcon,
      },
      {
        title: "Clock speed",
        value: () => "1.8GHz",
        icon: ICONS.tachometerIcon,
      },
      {
        title: "Memory",
        value: () => `${this.state.ram}GB`,
        icon: ICONS.memoryIcon,
      },
      {
        title: "Storage",
        value: () => `${this.state.storage}GB`,
        icon: ICONS.storageIcon,
      },
    ];

    this.meterCards = [{}, {}, {}, {}, {}, {}, {}]; // number of meter cards and chart cards is 7
    // generate widget layouts dynamically
    this.generateLayout = () =>
      this.infoCardsInfo.map((_, key) => ({
        i: `info_${key}`,
        x: key * cardWidth,
        y: 0,
        w: cardWidth,
        h: 1,
        minW: 2,
      }));

    // generate widget layouts dynamically
    this.generateMeterLayout = () =>
      this.meterCards.map((_, key) => ({
        i: `meter_${key}`,
        x: (key % 3) * meterCardWidth,
        y: Math.floor(key / 3) * meterCardHeight,
        w:
          key === this.meterCards.length - 1
            ? meterCardWidth * 3
            : meterCardWidth,
        h: meterCardHeight,
        minW: 3,
      }));

    this.textToTime = {
      "last 5 min": 5,
      "last 30 min": 30,
      "last 1 hr": 60,
      "last 12 hr": 720,
      "last 48 hr": 2880,
    };
    // options for time frame dropdown list
    this.timeOptions = [
      "last 5 min",
      "last 30 min",
      "last 1 hr",
      "last 12 hr",
      "last 48 hr",
    ];

    this.meterCards = [
      <RoundedChart
        id1="temp_cpu_div"
        id2="temp_gpu_div"
        text1="CPU Temperature"
        text2="GPU Temperature"
      ></RoundedChart>,
      <RoundedChartBig id="cpu_div" text="CPU"></RoundedChartBig>,
      <RoundedChart
        id1="mem_div"
        id2="storage_div"
        text1="Memory"
        text2="Disk"
      ></RoundedChart>,
      <LineChart
        title="Temperature"
        onTimeFrameChange={(ev) => {
          this.timeRangeTemp = this.textToTime[ev.target.value];
          this.timeInterval = this.textToTime[ev.target.value];
          this.updated = true;
          this.getTempData();
        }}
        onResourceChange={(ev) => this.setCurDataSrc(ev.target.value)}
        timeOptions={this.timeOptions}
        resourceOptions={["CPU", "GPU"]}
        canvasID="temp_chart_div"
      ></LineChart>,
      <LineChart
        title="CPU usage"
        onTimeFrameChange={(ev) => {
          this.timeRangeCpu = this.textToTime[ev.target.value];
          this.timeInterval = this.textToTime[ev.target.value];
          this.updated2 = true;
          this.getCpuUsageData();
        }}
        onResourceChange={() => {}}
        timeOptions={this.timeOptions}
        resourceOptions={[]}
        canvasID="cpu_chart_div"
      ></LineChart>,
      <LineChart
        title="Memory"
        onTimeFrameChange={(ev) => {
          this.timeRangeMem = this.textToTime[ev.target.value];
          this.timeInterval = this.textToTime[ev.target.value];
          this.updated1 = true;
          this.getMemData();
        }}
        onResourceChange={(ev) => this.setCurDataSrc1(ev.target.value)}
        timeOptions={this.timeOptions}
        resourceOptions={["Memory", "Storage"]}
        canvasID="mem_chart_div"
      ></LineChart>,
      <LineChart
        title="Signal Level"
        onTimeFrameChange={(ev) => {
          this.timeRangeNetwork = this.textToTime[ev.target.value];
          this.timeInterval = this.textToTime[ev.target.value];
          this.updated3 = true;
          this.getNetworkData();
        }}
        onResourceChange={() => {}}
        timeOptions={this.timeOptions}
        resourceOptions={[]}
        canvasID="signal_chart_div"
      ></LineChart>,
    ];

    this.state = {
      timeTemp: [],
      timeCPU: [],
      timeMem: [],
      timeNetwork: [],
      cpuTemp: [],
      gpuTemp: [],
      cpuUsageSystem: [],
      cpuUsageUser: [],
      memPercent: [],
      memUsed: [],
      diskUsagePercentage: [],
      signalLevel: [],
      cpu: null,
      ram: null,
      storage: null,
      noCharts: false,
      curDataSrc: "CPU", // current data source for gpu/cpu temperature chart
      curDataSrc1: "Memory", // current data source for memory/storage usage chart
      layouts: { lg: this.generateLayout() },
      meterLayouts: { lg: this.generateMeterLayout() },
      sureToResetOpen: false,
      confirmRender: false,
    };

    this.token = props.token;
    this.influxOptions = {};
    this.rendered = false;
    this.signalRendered = false;
    this.updated = false; // whether gpu/cpu temperature chart being updated (change data source or change time frame)
    this.updated1 = false; // whether cpu usage chart being updated (change time frame)
    this.updated2 = false; // whether memory/storage usage chart being updated (change data source or change time frame)
    this.updated3 = false; // whether signal strength chart being updated (change time frame)
    // initial time frame is set to 5 minutes
    this.timeRange = 5;
    this.timeInterval = 5;
    this.timeInterval = 5;
    this.timeRangeTemp = 5;
    this.timeRangeCpu = 5;
    this.timeRangeMem = 5;
    this.timeRangeNetwork = 5;

    this.infoCardHeight = 90;
    this.chartCardHeight = 100;
    this.curInfoCardKey = 0;
    this.currentColorsArray = "info";

    this.toggleSureToResetOpen = this.toggleSureToResetOpen.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    setTimeout(() => {
      // handle ploting and updating metrics charts
      if (
        (document.getElementById("signal_chart_div") && !this.rendered) ||
        this.updated ||
        this.updated1 ||
        this.updated2 ||
        this.updated3
      ) {
        this.rendered = true;

        if (this.updated) {
          Plotly.newPlot(
            "temp_chart_div",
            ChartsConfig.tempChartData(
              this.state.timeTemp,
              this.updated,
              this.state.curDataSrc,
              this.state.cpuTemp,
              this.state.gpuTemp
            ),
            ChartsConfig.tempChartLayout(
              this.timeRangeTemp,
              this.state.cpuTemp
            )[0],
            ChartsConfig.config
          );
          this.updated = false;
        } else if (this.updated1) {
          Plotly.newPlot(
            "mem_chart_div",
            ChartsConfig.memChartData(
              this.state.timeMem,
              this.updated1,
              this.state.curDataSrc1,
              this.state.memPercent,
              this.state.diskUsagePercentage
            ),
            ChartsConfig.memChartLayout(
              this.timeRangeMem,
              this.updated1,
              this.state.curDataSrc1,
              this.state.memPercent,
              this.state.diskUsagePercentage
            )[0],
            ChartsConfig.config
          );
          this.updated1 = false;
        } else if (this.updated2) {
          Plotly.newPlot(
            "cpu_chart_div",
            ChartsConfig.cpuChartData(
              this.state.timeCPU,
              this.state.cpuUsageUser,
              this.state.cpuUsageSystem
            ),
            ChartsConfig.cpuChartLayout(
              this.timeRangeCpu,
              this.state.cpuUsageUser,
              this.state.cpuUsageSystem
            )[0],
            ChartsConfig.config
          );
          this.updated2 = false;
        } else if (this.updated3) {
          Plotly.newPlot(
            "signal_chart_div",
            ChartsConfig.signalChartData(
              this.state.timeNetwork,
              this.state.signalLevel
            ),
            ChartsConfig.signalChartLayout(
              this.timeRangeNetwork,
              this.state.signalLevel
            )[0],
            ChartsConfig.config
          );
          this.updated3 = false;
        } else {
          this.plotMeterCharts();
        }
      }
    }, 100);
  }

  plotMeterCharts = () => {
    if (this.state.ram) {
      Plotly.newPlot(
        "temp_cpu_div",
        ChartsConfig.tempData(this.state.cpuTemp[0]),
        ChartsConfig.tachoCardLayout,
        ChartsConfig.config
      );
      Plotly.newPlot(
        "temp_gpu_div",
        ChartsConfig.tempData(this.state.gpuTemp[0]),
        ChartsConfig.tachoCardLayout,
        ChartsConfig.config
      );
      Plotly.newPlot(
        "cpu_div",
        ChartsConfig.cpuData(this.state.cpuUsageUser[0]),
        ChartsConfig.tachoCardBigLayout,
        ChartsConfig.config
      );
      Plotly.newPlot(
        "mem_div",
        ChartsConfig.memData(this.state.memUsed[0], this.state.ram),
        ChartsConfig.tachoCardLayout,
        ChartsConfig.config
      );
      Plotly.newPlot(
        "storage_div",
        ChartsConfig.storageData(
          (this.state.storage * this.state.diskUsagePercentage[0]) / 100,
          this.state.storage
        ),
        ChartsConfig.tachoCardLayout,
        ChartsConfig.config
      );
      Plotly.newPlot(
        "temp_chart_div",
        ChartsConfig.tempChartData(
          this.state.timeTemp,
          this.updated,
          this.state.curDataSrc,
          this.state.cpuTemp,
          this.state.gpuTemp
        ),
        ChartsConfig.tempChartLayout(this.timeRangeTemp, this.state.cpuTemp)[0],
        ChartsConfig.config
      );
      Plotly.newPlot(
        "cpu_chart_div",
        ChartsConfig.cpuChartData(
          this.state.timeCPU,
          this.state.cpuUsageUser,
          this.state.cpuUsageSystem
        ),
        ChartsConfig.cpuChartLayout(
          this.timeRangeCpu,
          this.state.cpuUsageUser,
          this.state.cpuUsageSystem
        )[0],
        ChartsConfig.config
      );
      Plotly.newPlot(
        "mem_chart_div",
        ChartsConfig.memChartData(
          this.state.timeMem,
          this.updated1,
          this.state.curDataSrc1,
          this.state.memPercent,
          this.state.diskUsagePercentage
        ),
        ChartsConfig.memChartLayout(
          this.timeRangeMem,
          this.updated1,
          this.state.curDataSrc1,
          this.state.memPercent,
          this.state.diskUsagePercentage
        )[0],
        ChartsConfig.config
      );
      Plotly.newPlot(
        "signal_chart_div",
        ChartsConfig.signalChartData(
          this.state.timeNetwork,
          this.state.signalLevel
        ),
        ChartsConfig.signalChartLayout(
          this.timeRangeNetwork,
          this.state.signalLevel
        )[0],
        ChartsConfig.config
      );
    } else
      Plotly.newPlot(
        "signal_chart_div",
        ChartsConfig.signalChartData(
          this.state.timeNetwork,
          this.state.signalLevel
        ),
        ChartsConfig.signalChartLayout(
          this.timeRangeNetwork,
          this.state.signalLevel
        )[0],
        ChartsConfig.config
      );
  };

  getServices = async () => {
    const resObj = await fetchItems(services, this.props.token);

    return resObj.body;
  };

  getData = async () => {
    const resObj = await fetchItem(
      devices,
      this.props.serial,
      this.props.token
    );

    this.influxOptions = await this.getServices();

    if (resObj.status === HTTPSTATUS.ok) {
      this.setState({
        cpu: resObj.body.cpu,
        ram: resObj.body.ram,
        storage: resObj.body.storage,
      });

      this.getChartData();
    }
  };

  getChartData = async () => {
    const client = new InfluxDB({
      url: this.influxOptions.influx_endpoint,
      token: this.influxOptions.influx_token,
    });

    const queryApi = client.getQueryApi(this.influxOptions.influx_org);
    const query = `from(bucket: "${this.influxOptions.influx_bucket}") |> range(start: -${this.timeRange}m) |> filter(fn: (r) => r["host"] == "${this.props.serial}") |> aggregateWindow(every: ${this.timeInterval}s, fn: mean, createEmpty: false)`;

    let time = [];
    let cpuTemp = [];
    let gpuTemp = [];
    let cpuUsageSystem = [];
    let cpuUsageUser = [];
    let memUsed = [];
    let memPercent = [];
    let diskUsed = [];
    let signalLevel = [];

    let thisObj = this;

    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if (o._measurement === "cpu") {
          if (o._field === "usage_system") cpuUsageSystem.push(o._value);
          else cpuUsageUser.push(o._value);
        }

        if (o._measurement === "disk") {
          diskUsed.push(o._value);
        }

        if (o._measurement === "mem") {
          if (o._field === "used_percent") {
            memPercent.push(o._value);
            memUsed.push(thisObj.state.ram * o._value * 10);
          }
        }

        if (o._measurement === "temp") {
          if (o._field === "cpu-temp") cpuTemp.push(o._value / 1000);
          else gpuTemp.push(o._value);
        }

        if (o._measurement === "wireless") {
          if (o._field === "level") signalLevel.push(o._value);
        }

        // pushing all the time values for all the fields
        time.push(o._time);
      },
      error(error) {
        thisObj.setState({ noCharts: true });
      },
      complete() {
        if (
          !cpuTemp.length &&
          !cpuUsageUser.length &&
          !memUsed.length &&
          !signalLevel.length
        )
          thisObj.setState({ noCharts: true });
        else {
          // make time array have the same number of values as the other fields array
          if (signalLevel.length) time = time.slice(0, signalLevel.length);
          else time = time.slice(0, cpuTemp.length);

          thisObj.setState({
            timeTemp: time,
            timeCPU: time,
            timeMem: time,
            timeNetwork: time,
            cpuTemp: cpuTemp,
            gpuTemp: gpuTemp,
            cpuUsageSystem: cpuUsageSystem,
            cpuUsageUser: cpuUsageUser,
            memPercent: memPercent,
            memUsed: memUsed,
            diskUsagePercentage: diskUsed,
            signalLevel: signalLevel,
          });
        }
      },
    });
  };

  // get temperature data only when the cpu/gpu temperature chart gets updated
  getTempData = async () => {
    const client = new InfluxDB({
      url: this.influxOptions.influx_endpoint,
      token: this.influxOptions.influx_token,
    });

    const queryApi = client.getQueryApi(this.influxOptions.influx_org);
    const query = `from(bucket: "${this.influxOptions.influx_bucket}") |> range(start: -${this.timeRangeTemp}m) |> filter(fn: (r) => r["host"] == "${this.props.serial}") |> aggregateWindow(every: ${this.timeInterval}s, fn: mean, createEmpty: false) |> filter(fn: (r) => r["_measurement"] == "temp")`;

    let time = [];
    let cpuTemp = [];
    let gpuTemp = [];

    let thisObj = this;

    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if (o._measurement === "temp") {
          if (o._field === "cpu-temp") {
            time.push(o._time);
            cpuTemp.push(o._value / 1000);
          } else gpuTemp.push(o._value);
        }
      },
      error(error) {
        thisObj.setState({ noCharts: true });
      },
      complete() {
        thisObj.setState({
          timeTemp: time,
          cpuTemp: cpuTemp,
          gpuTemp: gpuTemp,
        });
      },
    });
  };

  // get cpu usage data only when the cpu usage chart gets updated
  getCpuUsageData = async () => {
    const client = new InfluxDB({
      url: this.influxOptions.influx_endpoint,
      token: this.influxOptions.influx_token,
    });

    const queryApi = client.getQueryApi(this.influxOptions.influx_org);
    const query = `from(bucket: "${this.influxOptions.influx_bucket}") |> range(start: -${this.timeRangeCpu}m) |> filter(fn: (r) => r["host"] == "${this.props.serial}") |> aggregateWindow(every: ${this.timeInterval}s, fn: mean, createEmpty: false) |> filter(fn: (r) => r["_measurement"] == "cpu")`;

    let time = [];
    let cpuUsageSystem = [];
    let cpuUsageUser = [];
    let thisObj = this;

    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if (o._measurement === "cpu") {
          if (o._field === "usage_system") {
            time.push(o._time);
            cpuUsageSystem.push(o._value);
          } else cpuUsageUser.push(o._value);
        }
      },
      error(error) {
        thisObj.setState({ noCharts: true });
      },
      complete() {
        thisObj.setState({
          timeCPU: time,
          cpuUsageSystem: cpuUsageSystem,
          cpuUsageUser: cpuUsageUser,
        });
      },
    });
  };

  // get memory/storage data only when the memory/storage chart gets updated
  getMemData = async () => {
    const client = new InfluxDB({
      url: this.influxOptions.influx_endpoint,
      token: this.influxOptions.influx_token,
    });

    const queryApi = client.getQueryApi(this.influxOptions.influx_org);
    const query = `from(bucket: "${this.influxOptions.influx_bucket}") |> range(start: -${this.timeRangeMem}m) |> filter(fn: (r) => r["host"] == "${this.props.serial}") |> aggregateWindow(every: ${this.timeInterval}s, fn: mean, createEmpty: false) |> filter(fn: (r) => r["_measurement"] == "mem" or r["_measurement"] == "disk")`;

    let time = [];
    let memPercent = [];
    let diskUsed = [];

    let thisObj = this;

    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if (o._measurement === "disk") diskUsed.push(o._value);

        if (o._measurement === "mem") {
          if (o._field === "used_percent") {
            time.push(o._time);
            memPercent.push(o._value);
          }
        }
      },
      error(error) {
        thisObj.setState({ noCharts: true });
      },
      complete() {
        thisObj.setState({
          timeMem: time,
          memPercent: memPercent,
          diskUsagePercentage: diskUsed,
        });
      },
    });
  };

  // get signal data only when the signal chart gets updated
  getNetworkData = async () => {
    const client = new InfluxDB({
      url: this.influxOptions.influx_endpoint,
      token: this.influxOptions.influx_token,
    });

    const queryApi = client.getQueryApi(this.influxOptions.influx_org);
    const query = `from(bucket: "${this.influxOptions.influx_bucket}") |> range(start: -${this.timeRangeNetwork}m) |> filter(fn: (r) => r["host"] == "${this.props.serial}") |> aggregateWindow(every: ${this.timeInterval}s, fn: mean, createEmpty: false) |> filter(fn: (r) => r["_measurement"] == "wireless")`;

    let time = [];
    let signalLevel = [];

    let thisObj = this;

    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if (o._measurement === "wireless") {
          if (o._field === "level") {
            time.push(o._time);
            signalLevel.push(o._value);
          }
        }
      },

      error(error) {
        thisObj.setState({ noCharts: true });
      },
      complete() {
        thisObj.setState({
          timeNetwork: time,
          signalLevel: signalLevel,
        });
      },
    });
  };

  setCurDataSrc(src) {
    this.updated = true;

    if (src === "CPU") this.setState({ curDataSrc: "CPU" });
    else this.setState({ curDataSrc: "GPU" });
  }

  setCurDataSrc1(src) {
    this.updated1 = true;

    if (src === "Memory") this.setState({ curDataSrc1: "Memory" });
    else this.setState({ curDataSrc1: "Storage" });
  }

  toggleSureToResetOpen = () =>
    this.setState({ sureToResetOpen: !this.state.sureToResetOpen });

  resetLayout = () => {
    this.setState({
      layouts: { lg: this.generateLayout() },
      meterLayouts: { lg: this.generateMeterLayout() },
    });
  };

  render() {
    if (this.state.noCharts)
      return (
        <NoData message="No metrics data avialable for this device"></NoData>
      );

    // if the data are still fetched, display a loader animation
    if (
      !this.state.cpuTemp.length &&
      !this.state.cpuUsageUser.length &&
      !this.state.memUsed.length &&
      !this.state.signalLevel.length
    )
      return <Loader />;

    return (
      <React.Fragment>
        <SizeMe>
          {({ size }) => (
            <React.Fragment>
              {/* render overview widgets in a responsive (resizable and draggable) layout */}
              <Responsive
                width={size.width ? size.width : 10}
                cols={rglCols}
                rowHeight={rowHeight}
                margin={layoutMargin}
                layouts={this.state.layouts}
                resizeHandles={resizeHandles}
                isBounded={true}
                compactType="vertical"
                onLayoutChange={(_, layouts) =>
                  this.setState({ layouts: layouts })
                }
              >
                {/* rendering the basic metrics info cards */}
                {this.infoCardsInfo.map((infoCard, key) => (
                  <div key={`info_${key}`} style={{ cursor: "move" }}>
                    <MetricsInfoCard
                      key={`elem_${key}`}
                      cardHeight={this.infoCardHeight}
                      title={infoCard.title}
                      value={infoCard.value()}
                      data={this.state.ram}
                      icon={infoCard.icon}
                    ></MetricsInfoCard>
                  </div>
                ))}
              </Responsive>
              {this.state.ram ? (
                <Responsive
                  width={size.width ? size.width : 10}
                  cols={rglCols}
                  rowHeight={meterRowHeight}
                  margin={layoutMargin}
                  layouts={this.state.meterLayouts}
                  resizeHandles={resizeHandles}
                  isBounded={true}
                  compactType="vertical"
                  onLayoutChange={(_, layouts) => {
                    this.plotMeterCharts();
                    this.setState({ meterLayouts: layouts });
                  }}
                >
                  {this.meterCards.map((meterCard, key) => (
                    <div key={`meter_${key}`} style={{ cursor: "move" }}>
                      {meterCard}
                    </div>
                  ))}
                </Responsive>
              ) : (
                <Responsive
                  width={size.width ? size.width : 10}
                  cols={rglCols}
                  rowHeight={meterRowHeight}
                  margin={layoutMargin}
                  layouts={this.state.meterLayouts}
                  resizeHandles={resizeHandles}
                  isBounded={true}
                  compactType="vertical"
                  onLayoutChange={(_, layouts) => {
                    this.plotMeterCharts();
                    this.setState({ meterLayouts: layouts });
                  }}
                >
                  {/* rendering the signal strength chart canvas */}
                  <div key="meter_6" style={{ cursor: "move" }}>
                    <LineChart
                      title="Signal Level"
                      onTimeFrameChange={(ev) => {
                        this.timeRangeNetwork = this.textToTime[
                          ev.target.value
                        ];
                        this.timeInterval = this.textToTime[ev.target.value];
                        this.updated3 = true;
                        this.getNetworkData();
                      }}
                      onResourceChange={() => {}}
                      timeOptions={this.timeOptions}
                      resourceOptions={[]}
                      canvasID="signal_chart_div"
                    ></LineChart>
                  </div>
                </Responsive>
              )}
            </React.Fragment>
          )}
        </SizeMe>
        <ResetLayoutModal
          isOpen={this.props.isResetModalOpen}
          toggle={() => this.props.toggleResetModal(false)}
          okHandler={() => {
            this.props.toggleResetModal(false);
            this.resetLayout();
          }}
        ></ResetLayoutModal>
      </React.Fragment>
    );
  }
}

export default MetricsCharts;
