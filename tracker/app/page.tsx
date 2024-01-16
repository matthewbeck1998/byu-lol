"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import React from "react";
import { monthNames, rankList } from "./constants";
import { Summoner } from "./api/route";

/* Highcharts */

declare module "highcharts" {
  interface Point {
    label: string;
  }
}

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const App = () => {
  const [summoners, setSummoners] = React.useState<Record<string, Summoner[]>>(
    {}
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const { summoners } = await response.json();
      setSummoners(summoners);
    };

    setInterval(fetchData, 10 * 60 * 1000);
    fetchData();
  }, []);

  const series = Object.entries(summoners).map(([name, points]) => {
    const data = points.map(({ date, rank, lp }) => {
      const [year, month, day] = date.split("-").map((s) => parseInt(s, 10));
      const monthIndex = month - 1;

      const x = Date.UTC(year, monthIndex, day);
      const y = rankList.findIndex((value) => value === rank);
      const name = `${monthNames[monthIndex]} ${day}`;
      const label = `${rank}, ${lp}`;

      return { x, y, name, label };
    });

    return { type: "spline" as const, name, data };
  });

  const options: Highcharts.Options = {
    title: { text: "BYU LoL Tracker" },
    subtitle: { text: "Season 2024 Split 1" },
    tooltip: {
      pointFormatter: function () {
        if (!this.y) return this.series.name;
        return `<b>${this.series.name}</b><br/>${this.label}<br/>`;
      },
    },
    xAxis: { type: "datetime", labels: { format: "{value:%m/%d}", step: 1 } },
    yAxis: {
      title: { text: "Rank" },
      categories: rankList,
      labels: { step: 1 },
      min: 0,
      max: rankList.length - 1,
    },
    series,
  };

  const ref = React.useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
      highcharts={Highcharts}
      options={options}
      ref={ref}
    />
  );
};

export default App;
