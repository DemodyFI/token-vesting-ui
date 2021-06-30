import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { displayAmount } from "../utils";

class PublicChart extends Component {
  render() {
    return <Line data={this.chartData()} options={this.chartOptions()} />;
  }

  chartData() {
    return {
      datasets: [
        this.fromBaseDataset({
          data: this.getPoints(),
        }),
      ],
    };
  }

  getPoints() {
    const { start, cliff, end } = this.props.details;
    const now = new Date() / 1000; // normalize to seconds

    const points = [this.getDataPointAt(start)];

    // Add signitificant datapoints. Order matters.
    if (cliff < now) {
      points.push(this.getDataPointAt(cliff));
    }

    if (cliff > now) {
      points.push(this.getDataPointAt(cliff));
    }

    points.push(this.getDataPointAt(end));

    return points;
  }

  getDataPointAt(date) {
    return {
      x: this.formatDate(date),
      y: this.getAmountAt(date),
    };
  }

  formatDate(date) {
    return moment(date * 1000).format("MM/DD/YYYY HH:mm");
  }

  getAmountAt(date) {
    const { total, start, end, decimals } = this.props.details;
    console.log(
      "%cMyProject%cline:58%ctotal",
      "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
      "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
      "color:#fff;background:rgb(254, 67, 101);padding:3px;border-radius:2px",
      total
    );

    return total * 0.33;
  }

  chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: "MM/DD/YYYY HH:mm",
              tooltipFormat: "ll HH:mm",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.props.details.symbol || "",
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
      },
    };
  }

  fromBaseDataset(opts) {
    return {
      lineTension: 0.1,
      backgroundColor: "rgba(63,53,95,0.4)",
      borderColor: "rgba(63,53,95,1)",
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(63,53,95,1)",
      pointBackgroundColor: "rgba(63,53,95,1)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(63,53,95,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      ...opts,
    };
  }
}

export default PublicChart;
