# byu-lol-ladder

The [BYU LoL Ladder](https://docs.google.com/spreadsheets/d/19coe2c8jZs9nRZ1NaLvKx_xSRGWnDs8zgK2q-M7JwKE/edit?usp=sharing) spreadsheet shows real-time BYU LoL player rankings in a ladder format.

## How It Works

1. Players add themselves to the ladder using the associated [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSeuVYaeNmHYXoZ0E2vOquDbQn8votBLBRt-1GqVrDCdPYHx-A/viewform).

2. The form will automatically send answers to the ["Players" sheet](https://docs.google.com/spreadsheets/d/19coe2c8jZs9nRZ1NaLvKx_xSRGWnDs8zgK2q-M7JwKE/edit#gid=2026534737).

3. Google Apps Script has a [`cron`](https://en.wikipedia.org/wiki/Cron) job that schedules the `updateLadder()` function to trigger every 10 minutes.

4. `updateLadder()` calls `getSummoners()` to gather all of the latest data for all of the relevant summoners.

5. `getSummoners()` calls `getPlayers()` to read the "Players" sheet from step 2.

6. For each player found, `getSummoners()` calls `getSummoner()`, `getRank()`, and `getOpggLink()` to get the summoner information, rank information, and [OP.GG](https://www.op.gg/) link for each player. These functions use the [Riot API](https://developer.riotgames.com/apis#league-v4) to get the most current information possible.

7. Once all of the summoner information is gathered, `updateLadder()` can finally use the [Google Apps Script Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet) to update the ["Ladder" sheet](https://docs.google.com/spreadsheets/d/19coe2c8jZs9nRZ1NaLvKx_xSRGWnDs8zgK2q-M7JwKE/edit#gid=1283815282).
