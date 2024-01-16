const ss = SpreadsheetApp.getActiveSpreadsheet();
const playerSheet = ss.getSheetByName("Players");
const ladderSheet = ss.getSheetByName("Ladder");

function doWithRetry(f, n) {
  for (let i = 0; i < n; i++) {
    try {
      return f();
    } catch (error) {
      if (i === n) throw error;
    }
  }
}

function sendRequest(url, options) {
  Utilities.sleep(1333); // To prevent getting rate limited by Riot API
  return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
}

function getSummoner(summonerName) {
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
  const options = { headers: { "X-Riot-Token": API_KEY } };
  const response = doWithRetry(() => sendRequest(url, options), 2);
  return response;
}

function testGetSummoner() {
  const summoner = getSummoner("David O McKay");
  Logger.log(summoner);
}

function getRank(summoner) {
  const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`;
  const options = { headers: { "X-Riot-Token": API_KEY } };
  const ranks = doWithRetry(() => sendRequest(url, options), 2);

  let result = { level: summoner.summonerLevel };
  ranks.forEach((rank) => {
    // Use ranked solo queue if exists
    if (rank.queueType === "RANKED_SOLO_5x5") {
      result = { tier: rank.tier, division: rank.rank, lp: rank.leaguePoints, level: summoner.summonerLevel };
    }
  });
  
  return result;
}

function testGetRank() {
  const summoner = getSummoner("Pianobruh");
  const rank = getRank(summoner);
  Logger.log(rank);
}

function getPlayers() {
  const vectors = playerSheet.getSheetValues(2, 2, playerSheet.getLastRow() - 1, playerSheet.getMaxColumns() - 1);
  const players = vectors.map(([summonerName, discordName, studentStatus, preferredRoles]) => ({ summonerName, discordName, studentStatus, preferredRoles }));
  return players;
}

function testGetPlayers() {
  const players = getPlayers();
  Logger.log(players);
}

const tierEnums = {
  IRON: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
  PLATINUM: 4,
  EMERALD: 5,
  DIAMOND: 6,
  MASTER: 7,
  GRANDMASTER: 8,
  CHALLENGER: 9
};

const rankEnums = {
  IV: 0,
  III: 1,
  II: 2,
  I: 3
};

function compareSummoners(a, b) {
  // a is not ranked, b is ranked
  if (!a.rank.tier && b.rank.tier) return -1;
  
  // a is ranked, b is not ranked
  if (a.rank.tier && !b.rank.tier) return 1;

  // a and b both ranked
  if (a.rank.tier && b.rank.tier) {
    // Compare tiers
    if (tierEnums[a.rank.tier] < tierEnums[b.rank.tier]) return -1;
    if (tierEnums[a.rank.tier] > tierEnums[b.rank.tier]) return 1;

    // Compare divisions
    if (rankEnums[a.rank.division] < rankEnums[b.rank.division]) return -1;
    if (rankEnums[a.rank.division] > rankEnums[b.rank.division]) return 1;

    // Compare lps
    if (a.rank.lp < b.rank.lp) return -1;
    if (a.rank.lp > b.rank.lp) return 1;
  }
  
  // If all else fails, compare levels
  if (a.rank.level < b.rank.level) return -1;
  if (a.rank.level > b.rank.level) return 1;

  return 0;
}

function getOpggLink(summonerName) {
  const opggLink = `=HYPERLINK("https://www.op.gg/summoners/na/${summonerName}", "Link")`;
  return opggLink;
}

function testGetOpggLink() {
  const opggLink = getOpggLink("Arirang");
  Logger.log(opggLink);
}

function getSummoners() {
  const players = getPlayers();
  const summoners = [];

  players.forEach((player) => {
    try {
      const summoner = getSummoner(player.summonerName);
      const rank = getRank(summoner);
      const opggLink = getOpggLink(player.summonerName);
      summoners.push({ ...player, rank, opggLink });
    } catch (error) {
      Logger.log(`Failed to retrieve data for ${player.summonerName}.`);
    }
  });

  summoners.sort(compareSummoners).reverse();
  return summoners;
}

function testGetSummoners() {
  const summoners = getSummoners();
  Logger.log(summoners);
}

function toRankString(rank) {
  if (!rank.tier) return `Level ${rank.level}`;
  return `${rank.tier[0]}${rank.tier.slice(1).toLowerCase()} ${rank.division}`;
}

function toLpString(rank) {
  if (rank.lp === undefined) return "";
  return `${rank.lp} LP`
}

const toBeRemembered = new Set(["Swiftblessed"]);

function toSummonerNameString(name) {
  if (toBeRemembered.has(name)) return `${name} (RIP)`;
  return name;
}

function updateLadder() {
  const summoners = getSummoners();
  const vectors = summoners.map(({ rank, opggLink, summonerName, discordName, studentStatus, preferredRoles }) => [toRankString(rank), toLpString(rank), toSummonerNameString(summonerName), opggLink, discordName, studentStatus, preferredRoles]);

  if (!vectors.length) return;
  ladderSheet.getRange(2, 1, ladderSheet.getMaxRows(), ladderSheet.getMaxColumns() - 1).clearContent();
  ladderSheet.getRange(2, 1, vectors.length, ladderSheet.getMaxColumns() - 1).setValues(vectors);
}
