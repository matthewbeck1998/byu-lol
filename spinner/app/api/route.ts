/* Fetching */

import { NextResponse } from "next/server";

export type Summoner = {
  wins: string;
  losses: string;
  winrate: string;
};

type SummonerWithName = { name: string } & Summoner;

const spreadsheetId = "1Dat4a9UNOTPPmFNhvh9GnW84fwNqKtwBDNtgIei4E4k";

const getRows = async (): Promise<SummonerWithName[][]> => {
  const API_KEY = process.env.API_KEY;
  const rangesQueryParams = "ranges=Sheet1!B2:E";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${API_KEY}&${rangesQueryParams}`;
  const response = await fetch(url);
  const result = await response.json();

  const rowsWithDate = result.valueRanges.map((valueRange: any) =>
    valueRange.values
      .map(([name, wins, losses, winrate]: string[]) => ({ name, wins, losses, winrate }))
  );

  return rowsWithDate;
};

const aggregateSummoners = (rowsWithDate: SummonerWithName[][]) => {
  const summonersByName: Record<string, Summoner[]> = {};

  rowsWithDate.forEach((rows) => {
    rows.forEach(({ name, wins, losses, winrate }) => {
      let summoner = summonersByName[name];
      if (!summoner) summonersByName[name] = summoner = [];
      summoner.push({ wins, losses, winrate });
    });
  });

  return summonersByName;
};

export const GET = async () => {
  const rows = await getRows();
  const summonersByName = aggregateSummoners(rows);

  return NextResponse.json({ summoners: summonersByName });
};
