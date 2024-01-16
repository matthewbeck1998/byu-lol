# byu-lol-history

The [BYU LoL History](https://docs.google.com/spreadsheets/d/1i2TzQN_1mtcbY98JVRKFoFNMSlC-s03XOyGgYD_wrNE/edit?usp=sharing) spreadsheet takes a snapshot of the Ladder every single day to store historical data for the ladder.

## How It Works

1. Google Apps Script has a [`cron`](https://en.wikipedia.org/wiki/Cron) job that schedules the `executeTodayJob()` function to trigger every day at roughly 11 PM MST.

2. `executeTodayJob()` calls `getTodayDateString()` to get today's date in ISO-8601 format (`YYYY-MM-DD`) and copies the "Ladder" sheet from the Ladder spreadsheet into a new sheet inside the History spreadsheet named with today's date.
