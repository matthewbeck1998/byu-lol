/* Fetching */

import { NextResponse, NextRequest } from "next/server";

export type Summoner = {
  wins: string;
  losses: string;
  winrate: string;
};

export type SummonerWithName = { name: string } & Summoner;

const spreadsheetId = "1Dat4a9UNOTPPmFNhvh9GnW84fwNqKtwBDNtgIei4E4k";

const getRows = async (): Promise<SummonerWithName[][]> => {
  const API_KEY = process.env.API_KEY;
  const rangesQueryParams = "ranges=Sheet1!B2:E";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${API_KEY}&${rangesQueryParams}`;
  const response = await fetch(url);
  const result = await response.json();

  const rows = result.valueRanges.map((valueRange: any) =>
    valueRange.values
      .map(([name, wins, losses, winrate]: string[]) => ({ name, wins, losses, winrate }))
  );

  return rows;
};

const aggregateSummoners = (rows: SummonerWithName[][]) => {
  const summonersByName: Record<string, Summoner[]> = {};

  rows.forEach((rows) => {
    rows.forEach(({ name, wins, losses, winrate }) => {
      let summoner = summonersByName[name];
      if (!summoner) summonersByName[name] = summoner = [];
      summoner.push({ wins, losses, winrate });
    });
  });

  return summonersByName;
};

const putRows = async (rows: SummonerWithName[]): Promise<string> => {
  const API_KEY = process.env.API_KEY;
  const rangesParams = "B31:E";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate?key=${API_KEY}`;
  const body = JSON.stringify({
    "valueInputOption": "USER_ENTERED",
    "data": [
      {
        "range": "B31",
        "majorDimension": "COLUMNS",
        "values": [
          ["hello"]
        ],
      }
    ],
  });
  const response = await fetch(url, { method: "POST", resource: body });
  const result = await response.json();

  return result;
}

export const GET = async () => {
  const rows = await getRows();
  const summonersByName = aggregateSummoners(rows);

  return NextResponse.json({ summoners: rows[0] });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = await putRows(body.summoners);
  return NextResponse.json({ status: 200, a: body, result: result });
}
