/* Fetching */

import { NextResponse } from "next/server";

export type Summoner = {
  date: string;
  rank: string;
  lp: string;
};

type SummonerWithName = Summoner & { name: string };

const spreadsheetId = "1i2TzQN_1mtcbY98JVRKFoFNMSlC-s03XOyGgYD_wrNE";

const getSheetDates = async (): Promise<string[]> => {
  const API_KEY = process.env.API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${API_KEY}`;
  const response = await fetch(url, { next: { revalidate: 10 * 60 } });
  const result = await response.json();
  const dates = result.sheets.map((sheet: any) => sheet.properties.title);
  return dates;
};

const getRowsWithDate = async (
  dates: string[]
): Promise<SummonerWithName[][]> => {
  const API_KEY = process.env.API_KEY;
  const rangesQueryParams = dates
    .map((date) => `ranges=${date}!A2:C`)
    .join("&");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${API_KEY}&${rangesQueryParams}`;
  const response = await fetch(url);
  const result = await response.json();

  const rowsWithDate = result.valueRanges.map((valueRange: any, i: number) =>
    valueRange.values
      .filter(([_, lp]: string[]) => lp)
      .map(([rank, lp, name]: string[]) => ({ date: dates[i], rank, lp, name }))
  );

  return rowsWithDate;
};

const aggregateSummoners = (rowsWithDate: SummonerWithName[][]) => {
  const summonersByName: Record<string, Summoner[]> = {};

  rowsWithDate.forEach((rows) => {
    rows.forEach(({ date, rank, lp, name }) => {
      let summoner = summonersByName[name];
      if (!summoner) summonersByName[name] = summoner = [];
      summoner.push({ date, rank, lp });
    });
  });

  return summonersByName;
};

export const GET = async () => {
  const dates = await getSheetDates();
  const rowsWithDate = await getRowsWithDate(dates);
  const summonersByName = aggregateSummoners(rowsWithDate);

  return NextResponse.json({ summoners: summonersByName });
};
