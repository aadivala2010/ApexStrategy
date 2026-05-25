const app = document.getElementById("app");

const compounds = {
  Soft: { short: "S", color: "Soft", base: -0.72, wear10: 13, wear20: 7.2, wet: 0, heat: 1.25 },
  Medium: { short: "M", color: "Medium", base: 0, wear10: 8.4, wear20: 4.8, wet: 0, heat: 1 },
  Hard: { short: "H", color: "Hard", base: 0.48, wear10: 5.2, wear20: 3.1, wet: 0, heat: .82 },
  Intermediate: { short: "I", color: "Intermediate", base: 0.25, wear10: 7.5, wear20: 4.2, wet: 1, heat: .95 },
  Wet: { short: "W", color: "Wet", base: 0.7, wear10: 6.2, wear20: 3.6, wet: 2, heat: .75 }
};

const tracks = [
  ["Australia", "Melbourne", 62, 58, 28, 6.4, 8, 78, 31],
  ["China", "Shanghai", 68, 62, 24, 6.7, 10, 76, 28],
  ["Japan", "Suzuka", 55, 86, 32, 6.8, 12, 79, 29],
  ["Bahrain", "Sakhir", 72, 84, 6, 6.2, 8, 80, 38],
  ["Saudi Arabia", "Jeddah", 74, 55, 4, 6.1, 16, 88, 34],
  ["USA", "Miami", 66, 66, 30, 6.5, 10, 82, 35],
  ["Canada", "Montreal", 73, 52, 36, 6.0, 18, 83, 25],
  ["Monaco", "Monaco", 18, 34, 22, 5.7, 22, 58, 27],
  ["Spain", "Barcelona-Catalunya", 50, 82, 20, 6.8, 8, 75, 31],
  ["Austria", "Spielberg", 76, 64, 31, 5.9, 12, 82, 26],
  ["Great Britain", "Silverstone", 67, 86, 40, 6.7, 9, 85, 22],
  ["Belgium", "Spa-Francorchamps", 72, 78, 55, 7.0, 15, 87, 20],
  ["Hungary", "Budapest", 38, 72, 28, 6.3, 12, 69, 33],
  ["Netherlands", "Zandvoort", 42, 76, 42, 6.4, 13, 72, 24],
  ["Italy", "Monza", 84, 42, 22, 5.8, 10, 91, 29],
  ["Spain", "Madrid", 61, 68, 18, 6.4, 12, 77, 32],
  ["Azerbaijan", "Baku", 79, 45, 17, 6.1, 24, 89, 30],
  ["Singapore", "Singapore", 46, 78, 44, 6.6, 26, 64, 36],
  ["USA", "Austin", 71, 76, 23, 6.5, 12, 81, 30],
  ["Mexico", "Mexico City", 63, 58, 18, 6.4, 10, 78, 27],
  ["Brazil", "Sao Paulo", 70, 74, 48, 6.1, 18, 76, 25],
  ["USA", "Las Vegas", 82, 38, 10, 5.9, 15, 92, 18],
  ["Qatar", "Lusail", 58, 90, 8, 6.7, 9, 84, 34],
  ["Abu Dhabi", "Yas Marina", 64, 56, 4, 6.2, 8, 79, 31]
].map((t, i) => ({
  country: t[0], name: t[1], overtaking: t[2], deg: t[3], rain: t[4], pitLoss: t[5],
  safety: t[6], speed: t[7], temp: t[8], seed: i + 2
}));

const f1Teams = [
  { name: "McLaren", tag: "MCL", strength: 91, style: "balanced", color: "#ff8a00", drivers: [
    { name: "Lando Norris", abbr: "NOR", stats: { Pace: 90, Tire: 84, Overtaking: 88, Defending: 82, Wet: 86, Consistency: 86, Start: 84 } },
    { name: "Oscar Piastri", abbr: "PIA", stats: { Pace: 89, Tire: 86, Overtaking: 85, Defending: 84, Wet: 80, Consistency: 87, Start: 83 } }
  ] },
  { name: "Mercedes", tag: "MER", strength: 89, style: "balanced", color: "#00d2be", drivers: [
    { name: "George Russell", abbr: "RUS", stats: { Pace: 88, Tire: 82, Overtaking: 83, Defending: 86, Wet: 84, Consistency: 88, Start: 85 } },
    { name: "Kimi Antonelli", abbr: "ANT", stats: { Pace: 84, Tire: 78, Overtaking: 84, Defending: 76, Wet: 79, Consistency: 76, Start: 86 } }
  ] },
  { name: "Red Bull Racing", tag: "RBR", strength: 90, style: "aggressive", color: "#3671c6", drivers: [
    { name: "Max Verstappen", abbr: "VER", stats: { Pace: 94, Tire: 88, Overtaking: 92, Defending: 92, Wet: 92, Consistency: 93, Start: 90 } },
    { name: "Isack Hadjar", abbr: "HAD", stats: { Pace: 82, Tire: 78, Overtaking: 82, Defending: 78, Wet: 80, Consistency: 77, Start: 82 } }
  ] },
  { name: "Ferrari", tag: "FER", strength: 88, style: "aggressive", color: "#e80020", drivers: [
    { name: "Charles Leclerc", abbr: "LEC", stats: { Pace: 91, Tire: 80, Overtaking: 88, Defending: 84, Wet: 83, Consistency: 82, Start: 86 } },
    { name: "Lewis Hamilton", abbr: "HAM", stats: { Pace: 87, Tire: 87, Overtaking: 89, Defending: 87, Wet: 91, Consistency: 85, Start: 84 } }
  ] },
  { name: "Williams", tag: "WIL", strength: 80, style: "defend", color: "#64c4ff", drivers: [
    { name: "Alex Albon", abbr: "ALB", stats: { Pace: 82, Tire: 83, Overtaking: 81, Defending: 84, Wet: 80, Consistency: 84, Start: 80 } },
    { name: "Carlos Sainz", abbr: "SAI", stats: { Pace: 84, Tire: 86, Overtaking: 82, Defending: 85, Wet: 82, Consistency: 88, Start: 82 } }
  ] },
  { name: "Racing Bulls", tag: "RBU", strength: 76, style: "risky", color: "#6c98ff", drivers: [
    { name: "Liam Lawson", abbr: "LAW", stats: { Pace: 79, Tire: 77, Overtaking: 80, Defending: 81, Wet: 76, Consistency: 76, Start: 80 } },
    { name: "Arvid Lindblad", abbr: "LIN", stats: { Pace: 77, Tire: 74, Overtaking: 79, Defending: 73, Wet: 75, Consistency: 72, Start: 81 } }
  ] },
  { name: "Aston Martin", tag: "AMR", strength: 78, style: "conserve", color: "#229971", drivers: [
    { name: "Fernando Alonso", abbr: "ALO", stats: { Pace: 85, Tire: 88, Overtaking: 86, Defending: 90, Wet: 87, Consistency: 90, Start: 82 } },
    { name: "Lance Stroll", abbr: "STR", stats: { Pace: 75, Tire: 76, Overtaking: 74, Defending: 77, Wet: 78, Consistency: 72, Start: 76 } }
  ] },
  { name: "Haas F1 Team", tag: "HAA", strength: 73, style: "defend", color: "#b6babd", drivers: [
    { name: "Esteban Ocon", abbr: "OCO", stats: { Pace: 78, Tire: 80, Overtaking: 78, Defending: 82, Wet: 77, Consistency: 79, Start: 78 } },
    { name: "Oliver Bearman", abbr: "BEA", stats: { Pace: 79, Tire: 76, Overtaking: 80, Defending: 76, Wet: 75, Consistency: 75, Start: 80 } }
  ] },
  { name: "Audi", tag: "AUD", strength: 75, style: "weather", color: "#48ff7b", drivers: [
    { name: "Nico Hulkenberg", abbr: "HUL", stats: { Pace: 80, Tire: 82, Overtaking: 78, Defending: 83, Wet: 81, Consistency: 84, Start: 78 } },
    { name: "Gabriel Bortoleto", abbr: "BOR", stats: { Pace: 78, Tire: 77, Overtaking: 79, Defending: 75, Wet: 76, Consistency: 75, Start: 78 } }
  ] },
  { name: "Alpine", tag: "ALP", strength: 70, style: "risky", color: "#ff87bc", drivers: [
    { name: "Pierre Gasly", abbr: "GAS", stats: { Pace: 81, Tire: 80, Overtaking: 81, Defending: 80, Wet: 82, Consistency: 81, Start: 79 } },
    { name: "Franco Colapinto", abbr: "COL", stats: { Pace: 76, Tire: 74, Overtaking: 77, Defending: 73, Wet: 74, Consistency: 72, Start: 77 } }
  ] },
  { name: "Cadillac", tag: "CAD", strength: 68, style: "conserve", color: "#d6b46a", drivers: [
    { name: "Valtteri Bottas", abbr: "BOT", stats: { Pace: 80, Tire: 84, Overtaking: 77, Defending: 80, Wet: 78, Consistency: 86, Start: 79 } },
    { name: "Sergio Perez", abbr: "PER", stats: { Pace: 80, Tire: 83, Overtaking: 84, Defending: 82, Wet: 80, Consistency: 78, Start: 78 } }
  ] }
];

let selectedTeamIndex = loadSelectedTeamIndex();
let playerTeam = f1Teams[selectedTeamIndex];
let playerDrivers = playerTeam.drivers;
let rivalTeams = f1Teams.filter((_, index) => index !== selectedTeamIndex);
let signedDriverAbbrs = [];
let userProfile = loadProfile();

let state = {
  view: hasSelectedTeam() ? "menu" : "teamSelect",
  setup: { laps: 10, track: tracks[0], tire1: "Medium", tire2: "Soft" },
  race: null,
  career: loadCareer()
};
applySavedDriverGrowth();
signedDriverAbbrs = state.career.signedDrivers || playerTeam.drivers.map(d => d.abbr);
applySignedDrivers();
applyTheme();

function cls(strings, ...vals) { return strings.map((s, i) => s + (vals[i] ?? "")).join(""); }
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function rand(seed) { const x = Math.sin(seed * 999) * 10000; return x - Math.floor(x); }
function pick(arr, seed) { return arr[Math.floor(rand(seed) * arr.length) % arr.length]; }
function hasSelectedTeam() {
  try { return localStorage.getItem("apexStrategyTeam") !== null; } catch { return false; }
}
function loadSelectedTeamIndex() {
  try {
    const saved = Number(localStorage.getItem("apexStrategyTeam"));
    return Number.isInteger(saved) && f1Teams[saved] ? saved : 0;
  } catch {
    return 0;
  }
}
function saveSelectedTeamIndex(index) {
  try { localStorage.setItem("apexStrategyTeam", String(index)); } catch {}
}
function defaultProfile() {
  return { username: "Team Principal", theme: "dark" };
}
function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem("apexStrategyProfile") || "null");
    return { ...defaultProfile(), ...(saved || {}) };
  } catch {
    return defaultProfile();
  }
}
function saveProfile() {
  try { localStorage.setItem("apexStrategyProfile", JSON.stringify(userProfile)); } catch {}
}
function applyTheme() {
  document.body.classList.toggle("light-theme", userProfile.theme === "light");
}
function defaultCareer() {
  return {
    credits: 6200, rep: 3, ranking: 10, round: 0, expectationStrikes: 0, lastNotice: "", seasonPlayerPoints: 0,
    driverStandings: {}, constructorStandings: {}, completedSeason: false,
    car: 62, pit: 60, tire: 58, strategy: 61, reliability: 64,
    engine: 60, frontWing: 58, floor: 57, brakeCooling: 56,
    signedDrivers: null, releasedFrom: "", driverGrowth: {}, lastGrowthRound: 0,
    offseasonOffers: null, offseasonStatus: "", academyDrivers: []
  };
}
function loadCareer() {
  try {
    const saved = JSON.parse(localStorage.getItem("apexStrategyCareer") || "null");
    return { ...defaultCareer(), ...(saved || {}) };
  } catch {
    return defaultCareer();
  }
}
function saveCareer() {
  try { localStorage.setItem("apexStrategyCareer", JSON.stringify(state.career)); } catch {}
}
function applySavedDriverGrowth() {
  f1Teams.forEach(team => team.drivers.forEach(driver => {
    const growth = state.career.driverGrowth?.[driver.abbr] || 0;
    Object.keys(driver.stats).forEach(key => {
      driver.stats[key] = clamp(driver.stats[key] + growth, 60, 99);
    });
  }));
}
function allDrivers() {
  const gridDrivers = f1Teams.flatMap(team => team.drivers.map(driver => ({ ...driver, teamName: team.name, teamTag: team.tag })));
  const academyDrivers = (state.career.academyDrivers || []).map(driver => ({ ...driver, teamName: "Academy", teamTag: "ACD" }));
  return [...gridDrivers, ...academyDrivers];
}
function findDriver(abbr) {
  return allDrivers().find(driver => driver.abbr === abbr) || playerTeam.drivers[0];
}
function applySignedDrivers() {
  playerDrivers = signedDriverAbbrs.map(findDriver).slice(0, 2);
  while (playerDrivers.length < 2) playerDrivers.push(playerTeam.drivers[playerDrivers.length]);
}
function setPlayerTeam(index, goTo = "menu") {
  selectedTeamIndex = Number(index);
  playerTeam = f1Teams[selectedTeamIndex] || f1Teams[0];
  selectedTeamIndex = f1Teams.indexOf(playerTeam);
  signedDriverAbbrs = playerTeam.drivers.map(d => d.abbr);
  state.career.signedDrivers = signedDriverAbbrs;
  state.career.expectationStrikes = 0;
  state.career.releasedFrom = "";
  state.career.lastNotice = "";
  applySignedDrivers();
  rivalTeams = f1Teams.filter((_, teamIndex) => teamIndex !== selectedTeamIndex);
  saveSelectedTeamIndex(selectedTeamIndex);
  saveCareer();
  state.view = goTo;
  render();
}

function render() {
  if (state.view === "teamSelect") renderTeamSelect();
  if (state.view === "seasonContracts") renderSeasonContracts();
  if (state.view === "menu") renderMenu();
  if (state.view === "setup") renderSetup();
  if (state.view === "tireSelect") renderTireSelect();
  if (state.view === "race") renderRace();
  if (state.view === "results") renderResults();
  if (state.view === "career") renderCareer();
  if (state.view === "garage") renderGarage();
  if (state.view === "settings") renderSettings();
  if (state.view === "development") renderDevelopment();
  if (state.view === "careerSettings") renderCareerSettings();
}

function renderMenu() {
  app.innerHTML = cls`
    <section class="screen hero">
      ${speedLines()}
      <div class="top-pill"><span class="badge">Team Apex</span><span>RP ${state.career.credits}</span></div>
      <div class="title-block">
        <div class="logo-mark"></div>
        <h1>Apex<br>Strategy</h1>
        <p class="subtitle">10 or 20 laps. 2 drivers. 1 perfect strategy.</p>
      </div>
      <div class="car-silhouette"></div>
      <div class="menu-grid">
        <button class="primary-btn career-btn" onclick="go('career')">▤ Career</button>
        <button class="secondary-btn" onclick="quickRace(10)">Grand Prix</button>
        <button class="secondary-btn" onclick="quickRace(20)">20-Lap Race</button>
        <button class="secondary-btn" onclick="go('garage')">◈ Garage</button>
        <button class="ghost-btn" onclick="go('settings')">⚙ Settings</button>
      </div>
    </section>`;
}

function speedLines() {
  return `<div class="speed-lines">${Array.from({ length: 13 }, (_, i) =>
    `<span style="top:${8 + i * 7}%; animation-delay:${i * .19}s; width:${70 + (i % 4) * 42}px"></span>`).join("")}</div>`;
}

function go(view) { state.view = view; render(); }
function quickRace(laps, mode = "grandPrix") {
  state.setup.laps = laps;
  state.setup.mode = mode;
  state.setup.grid = null;
  state.setup.track = mode === "career" ? tracks[state.career.round % tracks.length] : tracks[Math.floor(Math.random() * tracks.length)];
  state.view = "setup";
  render();
}

function startCareerRace() {
  if (state.career.completedSeason) return go("seasonContracts");
  quickRace(10, "career");
}

function resetSeason() {
  state.career.round = 0;
  state.career.driverStandings = {};
  state.career.constructorStandings = {};
  state.career.expectationStrikes = 0;
  state.career.seasonPlayerPoints = 0;
  state.career.completedSeason = false;
  state.career.lastNotice = "";
  state.career.lastGrowthRound = 0;
  state.career.offseasonOffers = null;
  state.career.offseasonStatus = "";
  saveCareer();
}

function nextResultAction(r) {
  const primaryLabel = r.mode === "career" && state.career.completedSeason ? "Season Contracts" : "Next Race";
  return `<div class="post-race-actions">
    <button class="primary-btn" onclick="nextRaceFromResults()">${primaryLabel}</button>
    <button class="secondary-btn" onclick="go('career')">Career Menu</button>
    <button class="ghost-btn" onclick="go('menu')">Main Menu</button>
  </div>`;
}

function nextRaceFromResults() {
  const r = state.race;
  if (state.career.releasedFrom) return go("teamSelect");
  if (r?.mode === "career" && state.career.completedSeason) return go("seasonContracts");
  if (r?.mode === "career") return startCareerRace();
  quickRace(r?.length || 10, "grandPrix");
}

const interviewQuestions = {
  dominant: [
    "That looked like a statement race. Where did you win it?",
    "A huge result for the team. Which call are you happiest with?",
    "You had both cars right at the front. How complete was that performance?",
    "Was this won on raw pace, or on the pit wall?",
    "A controlled race from lights out to flag. Did anything still surprise you?",
    "You delivered when the pressure was highest. What defined the weekend?",
    "That was the kind of result title campaigns are built on. What mattered most?",
    "You turned opportunity into a top result. How sharp did the strategy feel?",
    "Everything seemed to come together today. Was this your cleanest race yet?",
    "The team executed at a very high level. Where do you think the edge came from?"
  ],
  strong: [
    "A strong afternoon for the team. What moved the race in your favor?",
    "You came away with a very solid result. Which decision paid off most?",
    "There was good pace and good control today. How do you sum it up?",
    "A lot went right without it being straightforward. Where was the key moment?",
    "You were competitive all race. Did the strategy match the car's pace?",
    "That was a sharp recovery and a strong finish. What unlocked it?",
    "A result to build on for sure. What will you take forward from this one?",
    "You looked decisive on the pit wall today. Which call set the tone?",
    "The team kept itself in the fight throughout. How satisfied are you?",
    "A good points haul, but not quite perfection. What was still missing?"
  ],
  mixed: [
    "You got something from the race, but it looked complicated. How do you read it?",
    "There were positives and frustrations mixed together today. What stands out most?",
    "One of those races with a bit of everything. Was it a missed chance or a fair result?",
    "You left with points, but also questions. What do you think about that balance?",
    "At times it looked promising, and at times it got away from you. Why?",
    "A respectable finish, but not a fully convincing one. Where did it swing?",
    "There were signs of speed, but not enough control. Do you agree with that?",
    "The result was decent without feeling complete. What held it back?",
    "You managed to limit the damage in parts of the race. Is that how it felt?",
    "It was not a bad race, but not an easy one either. What story does the result tell?"
  ],
  tough: [
    "A difficult race for the team. What made it so hard to control?",
    "You never quite seemed to settle into the race. Why was that?",
    "It felt like the team was reacting more than dictating. Fair assessment?",
    "You lost ground at key moments today. Where did it start to unravel?",
    "There were opportunities, but the result fell short. What cost you most?",
    "That was a frustrating afternoon. What part of it needs the closest review?",
    "You came in expecting more than this. What went wrong?",
    "A race that never really opened up for you. Did strategy, pace, or traffic hurt most?",
    "The result leaves work to do. What is the first thing you would fix?",
    "Not the outcome the team wanted. How honest does the debrief need to be?"
  ],
  disaster: [
    "That was a brutal race for the team. What is your immediate reaction?",
    "Very little seemed to go your way today. Where do you even begin the review?",
    "A result well below target. What has to change before the next round?",
    "The race slipped away badly. Was it one big issue or a series of small ones?",
    "You looked exposed on several fronts today. How concerning is that?",
    "It was damage limitation almost from the start. How tough was it on the pit wall?",
    "A really punishing result. What message do you give the team tonight?",
    "That performance raises difficult questions. What needs answers first?",
    "There were warning signs, and the race punished them. Do you see it that way?",
    "This one will hurt. How does the team respond from here?"
  ]
};

const interviewResponses = {
  dominant: [
    { label: "Praise Team", note: "The team was sharp in every phase of the race." },
    { label: "Stay Grounded", note: "It was strong, but we keep our heads down and move on." },
    { label: "Credit Drivers", note: "Both drivers delivered exactly what we needed today." },
    { label: "Highlight Strategy", note: "The pit wall made the right calls at the right time." },
    { label: "Raise Standard", note: "That is the standard we need to hold every weekend." },
    { label: "Warn Rivals", note: "When we execute like that, we are very hard to beat." }
  ],
  strong: [
    { label: "Positive Tone", note: "There was a lot to like in the way we managed that race." },
    { label: "Praise Calls", note: "The strategy calls gave us the platform for that result." },
    { label: "Back Drivers", note: "The drivers stayed disciplined and made the race easier to control." },
    { label: "Want More", note: "It was good, but there is still more pace to unlock." },
    { label: "Build Momentum", note: "That is a result we can build real momentum from." },
    { label: "Focus Forward", note: "We will enjoy the points, then focus quickly on the next one." }
  ],
  mixed: [
    { label: "Balanced View", note: "There were good parts to that race, and parts we need to tidy up." },
    { label: "Review Pace", note: "The car had moments, but not enough consistency over the whole race." },
    { label: "Review Strategy", note: "Some calls worked, and some clearly need a closer look." },
    { label: "Protect Team", note: "We kept fighting and still brought something home from a messy race." },
    { label: "Demand More", note: "A result like that is fine for today, but not enough long term." },
    { label: "Point To Traffic", note: "Traffic and timing made the race more complicated than it should have been." }
  ],
  tough: [
    { label: "Own It", note: "That was not good enough, and we need to be honest about it." },
    { label: "Blame Pace", note: "We did not have the pace we needed once the race settled down." },
    { label: "Blame Execution", note: "Execution cost us too much at key moments today." },
    { label: "Protect Drivers", note: "The drivers did what they could with a difficult race underneath them." },
    { label: "Look Ahead", note: "We will take the lessons quickly and try to respond next round." },
    { label: "Demand Answers", note: "There are a few questions from that race that need clear answers." }
  ],
  disaster: [
    { label: "Strong Critique", note: "That was far below the level this team should accept." },
    { label: "Demand Review", note: "Everything from pace to execution needs a full review after that." },
    { label: "Protect Garage", note: "It is a painful result, but we stay together and fix it as a team." },
    { label: "Call It Brutal", note: "There is no point dressing it up, that was a brutal afternoon." },
    { label: "Refocus Fast", note: "We cannot sit with this for long, the response has to be immediate." },
    { label: "Need Reset", note: "The team needs a reset before the next race because that was not acceptable." }
  ]
};

function interviewBucket(r) {
  const grade = r.result.grade[0];
  const players = r.cars.filter(c => c.player);
  const finishPositions = players.map(c => c.position).sort((a, b) => a - b);
  const pointScorers = players.filter(c => pointForPosition(c.position, c) > 0).length;
  const dnfs = players.filter(c => c.dnf).length;
  if (dnfs || grade === "F") return "disaster";
  if (finishPositions[0] === 1 && finishPositions[1] === 2) return "dominant";
  if (grade === "S" || grade === "A" || r.result.points >= 25) return "strong";
  if (grade === "D" || pointScorers === 0) return "tough";
  if (grade === "B" || grade === "C" || pointScorers === 1) return "mixed";
  return "strong";
}

function chooseInterviewQuestion(r) {
  const bucket = interviewBucket(r);
  const pool = interviewQuestions[bucket] || interviewQuestions.mixed;
  const seed = r.result.points
    + r.cars.filter(c => c.player).reduce((sum, c) => sum + c.start * 3 + c.position * 7, 0)
    + (state.career.round || 0) * 11
    + r.length * 5;
  return pool[Math.abs(seed) % pool.length];
}

function chooseInterviewResponses(r) {
  const bucket = interviewBucket(r);
  const pool = [...(interviewResponses[bucket] || interviewResponses.mixed)];
  const seedBase = r.result.points
    + r.cars.filter(c => c.player).reduce((sum, c) => sum + c.start * 5 + c.position * 9, 0)
    + (state.career.round || 0) * 13
    + r.length * 7;
  const chosen = [];
  for (let i = 0; i < 4 && pool.length; i++) {
    const idx = Math.abs(seedBase + i * 3) % pool.length;
    chosen.push(pool.splice(idx, 1)[0]);
  }
  return chosen;
}

function interviewQuestion(r) {
  if (!r.interviewPrompt) r.interviewPrompt = chooseInterviewQuestion(r);
  return r.interviewPrompt;
}

function renderInterview(r) {
  if (r.interviewDone) {
    return `<div class="result-card interview-card"><div class="section-title">Post-Race Interview</div><p class="muted">${r.interviewNote || "Interview skipped."}</p></div>`;
  }
  if (!r.interviewChoices) r.interviewChoices = chooseInterviewResponses(r);
  return `<div class="result-card interview-card">
    <div class="section-title">Post-Race Interview</div>
    <h3>${interviewQuestion(r)}</h3>
    <div class="interview-actions">
      ${r.interviewChoices.map((choice, index) => `<button class="secondary-btn" onclick="answerInterviewChoice(${index})">${choice.label}</button>`).join("")}
      <button class="ghost-btn" onclick="skipInterview()">Skip Interview</button>
    </div>
  </div>`;
}

function answerInterviewChoice(index) {
  if (!state.race?.interviewChoices?.[index]) return;
  answerInterview(state.race.interviewChoices[index].note);
}

function answerInterview(note) {
  if (!state.race) return;
  state.race.interviewDone = true;
  state.race.interviewNote = note;
  state.career.rep = (state.career.rep || 0) + 1;
  saveCareer();
  render();
}

function skipInterview() {
  if (!state.race) return;
  state.race.interviewDone = true;
  state.race.interviewNote = "Interview skipped.";
  render();
}

function renderSetup() {
  const s = state.setup;
  app.innerHTML = cls`
    <section class="screen">
      <div class="header-row"><button class="back" onclick="go('menu')">‹</button><h2>Apex Setup</h2><button class="back" onclick="randomTrack()">↻</button></div>
      <div class="section-title">Track Card</div>
      ${trackCard(s.track, s.laps)}
      <select class="track-select" onchange="setTrack(this.value)">
        ${tracks.map((t, i) => `<option value="${i}" ${t === s.track ? "selected" : ""}>${t.country} — ${t.name}</option>`).join("")}
      </select>
      <div class="section-title">Race Length</div>
      <div class="segmented">
        <button class="${s.laps === 20 ? "selected" : ""}" onclick="setLaps(20)">20 Laps</button>
        <button class="${s.laps === 10 ? "selected" : ""}" onclick="setLaps(10)">10 Laps</button>
      </div>
      <div class="section-title">Starting Strategy</div>
      ${setupDriver(1, playerDrivers[0], s.tire1)}
      ${setupDriver(2, playerDrivers[1], s.tire2)}
      <button class="primary-btn race-lap-btn" onclick="startRace()">Start Race</button>
    </section>`;
}

function trackCard(track, laps) {
  return cls`<div class="track-card">
    <div class="track-head">
      <div><div class="track-name">${track.name}</div><div class="track-country">${track.country}</div></div>
      ${trackSvg(track.seed)}
    </div>
    <div class="stat-grid">
      <div class="mini-stat"><b>${track.overtaking}</b><span>Overtaking</span></div>
      <div class="mini-stat"><b>${track.deg}</b><span>Tire Wear</span></div>
      <div class="mini-stat"><b>${track.rain}%</b><span>Rain</span></div>
      <div class="mini-stat"><b>${track.pitLoss.toFixed(1)}s</b><span>Pit Loss</span></div>
      <div class="mini-stat"><b>${[10,20].includes(laps) ? track.safety + "%" : "Off"}</b><span>Safety Car</span></div>
      <div class="mini-stat"><b>${track.temp}°C</b><span>Temp</span></div>
    </div>
  </div>`;
}

function trackSvg(seed) {
  const paths = [
    "M23 52 C28 18, 76 12, 89 35 S78 82, 47 76 S14 70, 23 52",
    "M18 25 L72 18 C98 22, 99 53, 75 60 L36 76 C12 76, 8 42, 18 25",
    "M20 65 C11 30, 44 11, 68 24 C91 37, 88 74, 56 79 C32 83, 28 52, 52 47",
    "M18 47 C24 11, 70 14, 82 34 C94 55, 74 78, 49 70 L25 80 C7 71, 5 55, 18 47",
    "M17 72 L18 28 L54 17 L92 41 L77 74 L43 80 Z"
  ];
  return `<svg class="track-svg" viewBox="0 0 112 92"><path d="${paths[seed % paths.length]}"/></svg>`;
}

function setupDriver(num, driver, tire) {
  const stats = driver.stats;
  return cls`<div class="driver-card">
    <div class="driver-top"><div><div class="driver-name">${driver.name}</div><div class="driver-meta">Starts P${num === 1 ? 6 : 11} · ${driver.abbr}</div></div><span class="compound ${tire}">${compounds[tire].short}</span></div>
    <div class="bars">
      ${["Pace","Tire","Overtaking","Defending","Wet","Consistency","Start"].map(k => statBar(k, stats[k])).join("")}
    </div>
    <div class="setup-row single">
      <div><p class="small-label">Starting Tire</p><div class="tire-choice">${["Soft","Medium","Hard"].map(t => `<button class="${t === tire ? "selected" : ""}" onclick="setSetup('tire${num}','${t}')">${compounds[t].short}</button>`).join("")}</div></div>
    </div>
  </div>`;
}

function statBar(k, v) {
  return `<div class="bar-row"><span>${k}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`;
}

function setSetup(k, v) { state.setup[k] = v; render(); }
function setLaps(laps) { state.setup.laps = laps; render(); }
function randomTrack() { state.setup.track = tracks[Math.floor(Math.random() * tracks.length)]; render(); }
function setTrack(index) { state.setup.track = tracks[Number(index)]; render(); }
function setGrandPrixTeam(index) { setPlayerTeam(index, "setup"); }

function runQualifying() {
  const playerAbbrs = new Set(playerDrivers.map(d => d.abbr));
  const entries = [
    ...playerDrivers.map(driver => ({ driver, team: playerTeam, player: true })),
    ...f1Teams
      .filter(team => team.name !== playerTeam.name)
      .flatMap(team => team.drivers.filter(driver => !playerAbbrs.has(driver.abbr)).map(driver => ({ driver, team, player: false })))
  ].slice(0, 22);
  const seed = Date.now() + state.setup.track.seed;
  const ranked = entries.map((entry, index) => ({
    ...entry,
    score: entry.team.strength * .55 + entry.driver.stats.Pace * .32 + entry.driver.stats.Start * .13 + rand(seed + index) * 18
  })).sort((a, b) => b.score - a.score);
  state.setup.grid = playerDrivers.map(driver => ranked.findIndex(entry => entry.driver.abbr === driver.abbr) + 1);
  state.setup.qualifying = ranked.slice(0, 8).map((entry, index) => ({ pos: index + 1, abbr: entry.driver.abbr, team: entry.team.tag }));
  state.view = "tireSelect";
  render();
}

function startRace(custom = {}) {
  const setup = { ...state.setup, ...custom };
  const startPos = custom.start || setup.grid || playerStartPositions(setup);
  const cars = [];
  playerDrivers.forEach((d, i) => cars.push(makeCar(d.abbr, d.name, true, i + 1, startPos[i], setup[`tire${i + 1}`] || custom.tires?.[i] || (i ? "Soft" : "Medium"), playerTeam, d)));
  let pos = 1;
  rivalTeams.forEach((team, ti) => {
    for (let j = 1; j <= 2; j++) {
      while (startPos.includes(pos)) pos++;
      const tire = team.style === "aggressive" ? pick(["Soft","Soft","Medium"], ti * j + setup.track.seed) :
        team.style === "conserve" ? pick(["Medium","Hard","Hard"], ti * j + 3) : pick(["Soft","Medium","Hard"], ti * j + 7);
      const driver = team.drivers[j - 1];
      cars.push(makeCar(driver.abbr, driver.name, false, null, pos, tire, team, driver));
      pos++;
    }
  });
  applyRaceForm(cars, setup);
  const weatherPlan = buildWeatherPlan(setup, custom);
  state.race = {
    lap: 1, length: setup.laps, track: setup.track, cars, weatherPlan,
    mode: setup.mode || custom.mode || "grandPrix",
    weather: weatherPlan[1], feed: [
      `Race start: ${playerDrivers[0].abbr} P${startPos[0]}, ${playerDrivers[1].abbr} P${startPos[1]}.`,
      ...cars.filter(c => c.surprise).slice(0, 1).map(c => `<strong>${c.team.name}</strong> has surprise pace today.`)
    ],
    weatherAlert: "", previousWeather: weatherPlan[1],
    commands: { 1: "Balanced", 2: "Balanced" },
    teamOrder: "Free",
    pitModal: null, safetyLap: buildSafetyLap(setup, custom), safetyActive: false, lastSummary: [],
    interviewDone: false, interviewNote: ""
  };
  sortCars();
  state.view = "race";
  render();
}

function playerStartPositions(setup) {
  const base = 1;
  const spread = setup.laps === 20 ? 20 : 18;
  const first = clamp(base + Math.floor(Math.random() * spread), 1, 20);
  let second = clamp(first + pick([-4, -3, -2, 2, 3, 4, 5], Date.now() + setup.track.seed), 1, 22);
  if (second === first) second = clamp(first + 2, 1, 22);
  return [first, second].sort((a, b) => a - b);
}

function makeCar(abbr, name, player, driverNum, startPos, tire, team = null, driver = null) {
  return {
    abbr, name, player, driverNum, team, driver, position: startPos, start: startPos, tire, tireAge: 0,
    wear: tire === "Soft" ? 8 : tire === "Medium" ? 5 : 3, mode: "Balanced", pitQueued: false, stops: 0,
    pitTarget: tire, usedCompounds: [tire], rulePenalty: 0, lastLap: 0, total: startPos * .72, risk: "Low", progress: rand(startPos + 4),
    form: 0, dnf: false, dnfReason: "", wingDamage: false, incidentNote: ""
  };
}

function applyRaceForm(cars, setup) {
  cars.forEach(car => {
    const baseSwing = (Math.random() - .5) * .26;
    const underdogBoost = !car.player && car.team?.strength < 76 && Math.random() < .035 ? 1.05 + Math.random() * .75 : 0;
    const topTeamOffDay = !car.player && car.team?.strength >= 88 && Math.random() < .12 ? -(.18 + Math.random() * .34) : 0;
    const weatherTeamBoost = setup.track.rain > 40 && car.team?.style === "weather" && Math.random() < .35 ? .18 : 0;
    car.form = baseSwing + underdogBoost + topTeamOffDay + weatherTeamBoost;
  });
  const surprise = cars.find(car => !car.player && car.form > 1);
  if (surprise) {
    surprise.surprise = true;
    surprise.total -= 8 + Math.random() * 5;
  }
}

function buildWeatherPlan(setup, custom) {
  const plan = {};
  for (let l = 1; l <= setup.laps; l++) plan[l] = "Dry";
  const r = Math.random() * 100;
  if (custom.weather === "rain3") {
    plan[1] = "Cloudy"; plan[2] = "Light rain warning"; plan[3] = "Light rain"; plan[4] = "Light rain"; plan[5] = "Drying track";
  } else if (r < setup.track.rain * (setup.laps === 20 ? 1 : .82)) {
    const start = setup.laps === 20 ? 4 + Math.floor(Math.random() * 10) : 3 + Math.floor(Math.random() * 5);
    for (let l = 1; l <= setup.laps; l++) {
      if (l === start - 1) plan[l] = "Light rain warning";
      if (l >= start) plan[l] = "Light rain";
      if (setup.laps === 10 && l >= start + 2 && Math.random() < .35) plan[l] = "Heavy rain";
      if (l >= start + 3 && Math.random() < .38) plan[l] = "Drying track";
    }
  } else if (Math.random() < .35) {
    Object.keys(plan).forEach(l => plan[l] = "Cloudy");
  }
  return plan;
}

function buildSafetyLap(setup, custom) {
  if (![10, 20].includes(setup.laps)) return null;
  if (custom.safety) return setup.laps === 20 ? 11 : 5;
  return Math.random() * 100 < setup.track.safety ? pick(setup.laps === 20 ? [7, 12, 16] : [4, 7], setup.track.seed + Date.now()) : null;
}

function renderRace() {
  const r = state.race;
  const p1 = r.cars.find(c => c.driverNum === 1);
  const p2 = r.cars.find(c => c.driverNum === 2);
  app.innerHTML = cls`
    <section class="screen race-screen">
      <div class="topbar">
        <div><div class="lap-title">Lap ${Math.min(r.lap, r.length)}/${r.length}</div><div class="weather-pill">${r.weather}${r.safetyActive ? " · Safety Car" : ""}</div></div>
        <div class="small">D1 P${p1.position} · D2 P${p2.position}</div>
      </div>
      <div class="race-grid">
        ${timingTower()}
        ${miniTrack()}
      </div>
      ${commandCard(p1)}
      ${commandCard(p2)}
      <button class="primary-btn race-lap-btn" onclick="simulateLap()">Race Lap</button>
      <div class="feed">${r.feed.slice(-8).reverse().map(f => `<div class="feed-line">${f}</div>`).join("")}</div>
      ${r.pitModal ? pitModal(r.pitModal) : ""}
    </section>`;
}

function timingTower() {
  return `<div class="tower">${state.race.cars.slice(0, 12).map(c => `<div class="tower-row ${c.player ? "player" : ""}">
    <b>P${c.position}</b><span>${c.abbr}</span><span class="compound ${c.tire}">${compounds[c.tire].short}</span><span>${Math.round(c.wear)}%</span>
  </div>`).join("")}</div>`;
}

function commandCard(car) {
  const rec = pitRecommendation(car);
  return cls`<div class="command-card">
    <div class="command-top">
      <div><div class="driver-name">${car.name}</div><div class="driver-meta">${car.pitQueued ? "Pit queued for " + car.pitTarget : rec}</div></div>
      <div class="pos-badge">P${car.position}</div>
    </div>
    <div class="wear-line"><span class="compound ${car.tire}">${compounds[car.tire].short}</span><div class="wearbar"><i style="width:${car.wear}%"></i></div><b>${Math.round(car.wear)}%</b></div>
    <div class="gapline"><span>Ahead ${gapFor(car, -1)}</span><span>Behind ${gapFor(car, 1)}</span><span>Risk ${car.risk}</span></div>
    <div class="commands">
      ${["Attack","Balanced","Defend","Conserve"].map(m => `<button class="${state.race.commands[car.driverNum] === m ? "selected" : ""}" onclick="setCommand(${car.driverNum}, '${m}')">${m}</button>`).join("")}
      <button class="pit-btn" onclick="openPit(${car.driverNum})">Pit</button>
    </div>
  </div>`;
}

function gapFor(car, dir) {
  const target = state.race.cars.find(c => c.position === car.position + dir);
  if (!target) return dir < 0 ? "Leader" : "Clear";
  if (target.dnf) return "DNF";
  if (car.dnf) return "DNF";
  return `${Math.abs(car.total - target.total).toFixed(1)}s`;
}

function pitRecommendation(car) {
  if (car.dnf) return car.dnfReason || "Retired";
  const r = state.race;
  const weatherWarning = tireWeatherWarning(car);
  if (weatherWarning) return weatherWarning;
  if (r.weather.includes("rain") && !["Intermediate","Wet"].includes(car.tire)) return "Box for wet weather";
  if (car.wear > 70) return "Pit window open";
  if (car.wear > 52 && r.lap < r.length) return "Undercut chance high";
  if (r.safetyActive) return "Cheap pit stop available";
  return "Stay flexible";
}

function setCommand(num, cmd) {
  state.race.commands[num] = cmd === "Push" ? "Balanced" : cmd;
  render();
}
function setTeamOrder(order) {
  if (!state.race) return;
  state.race.teamOrder = order;
  const labels = {
    Free: "Free race",
    Hold: "Hold station",
    Swap: "Swap cars",
    BackLead: "Back the lead driver"
  };
  state.race.feed.push(`<strong>Team order:</strong> ${labels[order] || order}.`);
  render();
}
function openPit(num) { state.race.pitModal = num; render(); }
function closePit() { state.race.pitModal = null; render(); }
function queuePit(num, tire) {
  const car = state.race.cars.find(c => c.driverNum === num);
  if (tire === car.tire) {
    state.race.feed.push(`<strong>${car.name}</strong> must choose a different compound.`);
    closePit();
    return;
  }
  car.pitQueued = true; car.pitTarget = tire;
  state.race.feed.push(`<strong>${car.name}</strong> pit call: ${tire}.`);
  closePit();
}

function cancelPit(num) {
  const car = state.race.cars.find(c => c.driverNum === num);
  if (!car || !car.pitQueued) return;
  car.pitQueued = false;
  car.pitTarget = car.tire;
  state.race.feed.push(`<strong>${car.name}</strong> pit call cancelled.`);
  closePit();
}

function pitModal(num) {
  const car = state.race.cars.find(c => c.driverNum === num);
  const est = estimatePit(car);
  return cls`<div class="modal"><div class="modal-card">
    <div class="header-row"><h2>Pit Strategy</h2><button class="back" onclick="closePit()">×</button></div>
    <div class="strategy-panel">
      <div>Current: <b>${car.tire}</b>, ${Math.round(car.wear)}% worn</div>
      <div>Pit loss: <b>${est.loss.toFixed(1)}s</b> · Rejoin: <b>P${est.rejoin}</b></div>
      <div>Traffic Risk: <b>${est.traffic}</b> · Undercut Chance: <b>${est.undercut}</b></div>
      <div class="muted small">${weatherHint()}</div>
    </div>
    <div class="pit-options">${Object.keys(compounds).map(t => `<button onclick="queuePit(${num}, '${t}')"><span class="compound ${t}">${compounds[t].short}</span></button>`).join("")}</div>
    <button class="ghost-btn race-lap-btn" onclick="closePit()">Cancel</button>
  </div></div>`;
}

function estimatePit(car) {
  const loss = effectivePitLoss();
  const strategyBias = car.player ? (state.career.strategy - 60) / 28 : 0;
  const rejoin = clamp(Math.round(car.position + loss / 1.3 - (car.wear > 60 ? 2 : 0) - strategyBias), 1, 20);
  return {
    loss, rejoin,
    traffic: rejoin > 9 ? "High" : rejoin > 5 ? "Medium" : "Low",
    undercut: car.wear > 62 || state.race.track.deg > 70 ? "High" : car.wear > 42 ? "Medium" : "Low"
  };
}

function weatherHint() {
  const next = state.race.weatherPlan[state.race.lap + 1];
  if (!next) return "No further weather data.";
  if (next !== state.race.weather) return `Weather warning: ${next} next lap.`;
  return "Engineer model: conditions stable.";
}

function weatherSeverity(weather) {
  if (weather === "Heavy rain") return 3;
  if (weather === "Light rain") return 2;
  if (weather === "Drying track" || weather === "Light rain warning") return 1;
  return 0;
}

function weatherAlertText() {
  const r = state.race;
  const next = r.weatherPlan[r.lap + 1];
  if (r.weatherAlert) return r.weatherAlert;
  if (next && next !== r.weather) return `${next} expected next lap`;
  return "";
}

function tireWeatherWarning(car) {
  const w = state.race.weather;
  if ((w === "Light rain" || w === "Drying track") && ["Soft","Medium","Hard"].includes(car.tire)) return "Wrong tire for damp track";
  if (w === "Heavy rain" && car.tire !== "Wet") return "Wet tires needed";
  if ((w === "Dry" || w === "Cloudy") && ["Intermediate","Wet"].includes(car.tire)) return "Track dry - switch tires";
  return "";
}

function effectivePitLoss() {
  const base = state.race.track.pitLoss;
  return state.race.safetyActive ? base * .45 : base;
}

function tireWearRate(tire, raceLength) {
  return tire[`wear${raceLength}`] || tire.wear20 || tire.wear10;
}

function simulateLap() {
  const r = state.race;
  if (r.lap > r.length) return;
  const oldWeather = r.weather;
  r.weather = r.weatherPlan[r.lap] || r.weather;
  r.weatherAlert = "";
  if (r.weather !== oldWeather) {
    const urgent = weatherSeverity(r.weather) > weatherSeverity(oldWeather);
    r.weatherAlert = `${urgent ? "WEATHER CHANGE" : "WEATHER UPDATE"}: ${oldWeather} to ${r.weather}`;
  }
  r.safetyActive = r.safetyLap === r.lap;
  const before = new Map(r.cars.map(c => [c.abbr, c.position]));
  const events = [];
  if (r.weatherAlert) events.push(`<strong>${r.weatherAlert}</strong>`);
  if (r.safetyActive) events.push("<strong>Safety Car</strong> deployed. Pit loss reduced.");
  if (r.weatherPlan[r.lap + 1] && r.weatherPlan[r.lap + 1] !== r.weather) events.push(`<strong>${r.weatherPlan[r.lap + 1]}</strong> expected in 1 lap.`);
  r.cars.forEach(car => maybeDnf(car, events));

  r.cars.forEach((car, idx) => {
    if (car.dnf) return;
    if (car.player) car.mode = r.commands[car.driverNum];
    else aiStrategy(car, idx);
  });
  const defendedPairs = r.cars
    .filter(car => !car.dnf && car.mode === "Defend" && !car.pitQueued)
    .map(car => {
      const threat = r.cars.find(other => other.position === car.position + 1);
      return threat && Math.abs(car.total - threat.total) < 1.8 ? { defender: car, threat } : null;
    })
    .filter(Boolean);
  r.cars.forEach((car, idx) => runCarLap(car, events));
  sortCars();
  applyTeamOrders(events);
  defendedPairs.forEach(({ defender, threat }) => {
    if (!defender.pitQueued && defender.position > threat.position && Math.abs(defender.total - threat.total) < 1.4) {
      defender.total = threat.total - .03;
      if (defender.player) events.push(`<strong>${defender.name}</strong> held position with strong defending.`);
    }
  });
  sortCars();
  r.cars.forEach((car, i) => {
    car.position = i + 1;
    car.progress = (car.progress + .19 + (20 - car.position) * .006) % 1;
    const old = before.get(car.abbr);
    if (car.player && old !== car.position) {
      const delta = old - car.position;
      events.push(`<strong>${car.name}</strong> ${delta > 0 ? "gained" : "lost"} ${Math.abs(delta)} position${Math.abs(delta) === 1 ? "" : "s"}.`);
    }
  });
  playerWarnings(events);
  r.feed.push(...events.slice(0, 7));
  r.lastSummary = events;
  r.lap++;
  if (r.lap > r.length) {
    finishRace();
  } else {
    render();
  }
}

function applyTeamOrders(events) {
  const r = state.race;
  const players = r.cars.filter(c => c.player && !c.dnf).sort((a, b) => a.position - b.position);
  if (players.length < 2) return;
  const [lead, chase] = players;
  const gap = Math.abs(lead.total - chase.total);
  if (r.teamOrder === "Swap" && gap < 2.8) {
    const buffer = .04;
    const oldLead = lead.abbr;
    chase.total = lead.total - buffer;
    lead.total = chase.total + buffer;
    r.teamOrder = "Free";
    sortCars();
    events.push(`<strong>Team orders:</strong> ${chase.abbr} swapped ahead of ${oldLead}.`);
  } else if (r.teamOrder === "Hold" && gap < 1.4) {
    chase.total += .22;
    events.push(`<strong>Team orders:</strong> drivers held station.`);
  } else if (r.teamOrder === "BackLead") {
    const nearestRival = r.cars.find(c => !c.player && !c.dnf && c.position === chase.position + 1);
    if (nearestRival && Math.abs(chase.total - nearestRival.total) < 2.2) {
      nearestRival.total += .28;
      chase.total += .18;
      events.push(`<strong>${chase.abbr}</strong> backed the lead car by managing the pack.`);
    }
  }
}

function runCarLap(car, events) {
  if (car.dnf) {
    car.lastLap = 0;
    return;
  }
  const r = state.race;
  let cmd = car.mode === "Push" ? "Balanced" : car.mode;
  const teammate = car.player ? state.race.cars.find(c => c.player && c !== car) : null;
  const teammateGap = teammate ? Math.abs(car.total - teammate.total) : 99;
  if (car.player && state.race.teamOrder === "Hold" && teammateGap < 1.2 && cmd === "Attack") cmd = "Balanced";
  if (car.player && state.race.teamOrder === "BackLead" && teammate && car.position > teammate.position && teammateGap < 3.2) cmd = "Defend";
  const stat = car.driver?.stats || (car.player ? playerDrivers[car.driverNum - 1].stats : null);
  const carPackage = car.player
    ? (playerTeam.strength * .45 + state.career.car * .2 + state.career.engine * .18 + state.career.frontWing * .1 + state.career.floor * .07)
    : car.team.strength;
  const teamStrength = carPackage + (car.form || 0) * 18;
  const tire = compounds[car.tire];
  const threatBehind = r.cars.find(c => c.position === car.position + 1);
  const closeThreat = threatBehind && Math.abs(car.total - threatBehind.total) < 1.8;
  let lap = 78 - (teamStrength - 60) * .035 + tire.base;
  const wearPenalty = Math.pow(car.wear / 100, 1.65) * (r.length === 20 ? 2.35 : 2.7);
  lap += wearPenalty;
  if (cmd === "Attack") lap -= .54;
  if (cmd === "Conserve") lap += .42;
  if (car.wingDamage) lap += .42;
  if (cmd === "Defend") {
    lap += .06;
    if (closeThreat && !car.pitQueued) {
      const defenseSkill = ((stat?.Defending || 76) - 75) * .012;
      const trackBlock = (100 - r.track.overtaking) * .004;
      lap -= clamp(.36 + defenseSkill + trackBlock, .24, .82);
      if (car.player) events.push(`<strong>${car.name}</strong> defended from ${threatBehind.abbr}.`);
    }
  }
  if (r.safetyActive) lap += 2.2;
  lap += weatherPenalty(car);
  if (stat) {
    lap -= (stat.Pace - 75) * .018;
    if (r.weather.includes("rain")) lap -= (stat.Wet - 70) * .018;
  }

  const wearMult = cmd === "Attack" ? 1.25 : cmd === "Conserve" ? .7 : cmd === "Defend" ? 1.08 : 1;
  const tireMgmt = stat ? (stat.Tire * .74 + state.career.tire * .2 + state.career.floor * .06) : 70;
  const trackHeat = 1 + (r.track.temp - 28) * .008;
  car.wear = clamp(car.wear + tireWearRate(tire, r.length) * wearMult * (r.track.deg / 62) * trackHeat * tire.heat * (1 - (tireMgmt - 70) / 260), 0, 100);
  car.tireAge++;
  car.risk = car.wear > 82 ? "High" : car.wear > 62 || cmd === "Attack" ? "Med" : "Low";

  if (car.pitQueued) {
    const stop = effectivePitLoss() + pitVariance(car);
    lap += stop;
    events.push(`<strong>${car.name}</strong> pit stop: ${stop.toFixed(1)}s, ${car.pitTarget}s fitted.`);
    const pitIncident = pitLaneIncident(car);
    if (pitIncident) {
      lap += pitIncident.loss;
      events.push(`<strong>${car.abbr}</strong> ${pitIncident.text}`);
    }
    car.tire = car.pitTarget; car.usedCompounds.push(car.tire); car.wear = car.tire === "Soft" ? 2 : 1; car.tireAge = 0; car.pitQueued = false; car.stops++;
    if (car.wingDamage && Math.random() < .7) {
      car.wingDamage = false;
      events.push(`<strong>${car.abbr}</strong> repaired front wing damage.`);
    }
  }

  const reliability = car.player ? (state.career.reliability * .82 + state.career.brakeCooling * .18) : car.team.strength - 8;
  const mistakeRisk = (car.wear - 68) * .003 + (cmd === "Attack" ? .025 : 0) - (cmd === "Defend" ? .012 : 0) - ((stat?.Consistency || 72) - 70) * .002 - (reliability - 60) * .0012;
  if (Math.random() < clamp(mistakeRisk, 0, .16)) {
    const loss = .6 + Math.random() * 1.4;
    lap += loss;
    if (Math.random() < .26 && !car.wingDamage) {
      car.wingDamage = true;
      car.incidentNote = "Front wing damage";
      lap += .9;
      events.push(`<strong>${car.name}</strong> picked up front wing damage after contact.`);
    } else if (car.player || Math.random() < .45) {
      events.push(`<strong>${car.name}</strong> lost ${loss.toFixed(1)}s after a lock-up.`);
    }
  }
  const smallIncidentRisk = (cmd === "Attack" ? .014 : .004) + Math.max(0, car.wear - 75) / 5000 + state.race.track.safety / 9000;
  if (!car.wingDamage && Math.random() < smallIncidentRisk) {
    car.wingDamage = true;
    lap += .65;
    events.push(`<strong>${car.abbr}</strong> has minor wing damage.`);
  }
  car.lastLap = lap;
  car.total += lap;
}

function pitLaneIncident(car) {
  const r = state.race;
  const pitSkill = car.player ? state.career.pit : (car.team?.strength || 72) - 10;
  const trafficRisk = r.cars.filter(other => other !== car && other.pitQueued).length * .035;
  const roll = Math.random();
  if (roll < trafficRisk) return { loss: .55 + Math.random() * .7, text: "lost time in pit lane traffic." };
  if (roll > .988 - Math.max(0, 78 - pitSkill) / 2600) {
    car.rulePenalty = (car.rulePenalty || 0) + 5;
    return { loss: 5, text: "unsafe release penalty: +5s." };
  }
  return null;
}

function maybeDnf(car, events) {
  const r = state.race;
  if (car.dnf || r.lap <= 1 || r.lap >= r.length) return;
  const reliability = car.player ? (state.career.reliability * .82 + state.career.brakeCooling * .18) : (car.team?.strength || 72) - 8;
  const incidentTrack = r.track.safety / 5200;
  const wearRisk = Math.max(0, car.wear - 84) / 7000;
  const weatherRisk = r.weather === "Heavy rain" ? .0016 : r.weather === "Light rain" ? .0008 : 0;
  const baseRisk = r.length === 20 ? .0008 : .00045;
  const risk = clamp(baseRisk + incidentTrack + wearRisk + weatherRisk - (reliability - 60) / 32000, .00012, .0038);
  if (Math.random() >= risk) return;
  car.dnf = true;
  car.dnfReason = pick(["Mechanical issue", "Crash damage", "Power unit failure", "Hydraulics failure"], r.lap + car.start + Date.now());
  car.total = 9999 + car.position;
  car.pitQueued = false;
  events.push(`<strong>${car.abbr}</strong> retired: ${car.dnfReason}.`);
}

function weatherPenalty(car) {
  const w = state.race.weather;
  if (w === "Dry" || w === "Cloudy" || w === "Light rain warning") {
    if (car.tire === "Intermediate") return w === "Light rain warning" ? .4 : 1.5;
    if (car.tire === "Wet") return 2.8;
    return 0;
  }
  if (w === "Light rain" || w === "Drying track") {
    if (car.tire === "Intermediate") return -.25;
    if (car.tire === "Wet") return w === "Drying track" ? 1.2 : .55;
    return w === "Drying track" ? .9 : 2.2;
  }
  if (w === "Heavy rain") {
    if (car.tire === "Wet") return -.35;
    if (car.tire === "Intermediate") return 1.15;
    return 4.2;
  }
  return 0;
}

function pitVariance(car) {
  const pit = car.player ? state.career.pit : car.team.strength - 10;
  const roll = Math.random();
  if (roll < .08 + pit / 1400) return -.45;
  if (roll > .94 - (80 - pit) / 1600) return .85;
  return (Math.random() - .5) * .35;
}

function aiStrategy(car, idx) {
  const r = state.race;
  const next = r.weatherPlan[r.lap + 1];
  if (r.weather.includes("Heavy") && car.tire !== "Wet") { car.pitQueued = true; car.pitTarget = "Wet"; return; }
  if ((r.weather.includes("Light") || r.weather === "Drying track") && !["Intermediate","Wet"].includes(car.tire) && Math.random() < .6) {
    car.pitQueued = true; car.pitTarget = "Intermediate"; return;
  }
  if (next && next.includes("rain") && car.team.style === "weather" && car.tire !== "Intermediate") {
    car.pitQueued = true; car.pitTarget = "Intermediate"; return;
  }
  const late = r.length - r.lap <= 2;
  if ((car.wear > (r.length === 20 ? 58 : 68) || r.safetyActive) && r.lap < r.length && !car.pitQueued && Math.random() < .58) {
    car.pitQueued = true;
    car.pitTarget = nextDryCompound(car, late ? "Soft" : pick(["Medium","Hard","Soft"], idx + r.lap));
  }
  if (late && !car.pitQueued && !meetsTireRule(car)) {
    car.pitQueued = true;
    car.pitTarget = nextDryCompound(car, "Soft");
  }
  car.mode = car.team.style === "aggressive" || late ? pick(["Attack","Attack","Balanced"], idx + r.lap) :
    car.team.style === "conserve" ? pick(["Conserve","Balanced","Defend"], idx + r.lap) :
    pick(["Balanced","Attack","Defend"], idx + r.lap);
}

function sortCars() {
  state.race.cars.sort((a, b) => (a.dnf === b.dnf ? a.total - b.total : a.dnf ? 1 : -1));
  state.race.cars.forEach((c, i) => c.position = i + 1);
}

function playerWarnings(events) {
  state.race.cars.filter(c => c.player).forEach(c => {
    if (c.wear > 82) events.push(`<strong>${c.name}</strong> tires are collapsing.`);
    else if (c.wear > 68) events.push(`<strong>${c.name}</strong> tires overheating.`);
    if (state.race.weather.includes("rain") && ["Soft","Medium","Hard"].includes(c.tire)) events.push(`<strong>${c.name}</strong> is losing grip.`);
    if (state.race.length - state.race.lap <= 1 && !meetsTireRule(c)) events.push(`<strong>${c.name}</strong> still needs a stop on a different tire.`);
  });
}

function compoundCount(car) {
  return new Set(car.usedCompounds || [car.tire]).size;
}

function meetsTireRule(car) {
  return car.stops >= 1 && compoundCount(car) >= 2;
}

function nextDryCompound(car, preferred) {
  const dry = ["Soft", "Medium", "Hard"];
  if (preferred !== car.tire) return preferred;
  return dry.find(t => t !== car.tire) || "Medium";
}

function ruleStatus(car) {
  return meetsTireRule(car) ? "Yes" : "No";
}

function finishRace() {
  const r = state.race;
  r.cars.forEach(car => {
    if (car.dnf) return;
    if (!meetsTireRule(car)) {
      car.rulePenalty = (car.stops < 1 ? 10 : 0) + (compoundCount(car) < 2 ? 10 : 0);
      car.total += car.rulePenalty;
    }
  });
  sortCars();
  const p = r.cars.filter(c => c.player);
  p.filter(c => c.rulePenalty).forEach(c => r.feed.push(`<strong>${c.name}</strong> rule penalty: +${c.rulePenalty}s.`));
  const points = p.reduce((sum, c) => sum + pointForPosition(c.position, c), 0);
  const payout = racePayout(points);
  state.career.credits += payout;
  state.career.rep += points > 8 ? 1 : 0;
  if (r.mode === "career") r.careerNotice = applyCareerResult(r, p, points);
  saveCareer();
  r.result = { points, payout, grade: gradeRace(p, points), bestLap: Math.min(...p.map(c => c.lastLap)).toFixed(2) };
  state.view = "results";
  render();
}

function racePayout(points) {
  const multiplier = playerTeam.strength >= 88 ? 115 : playerTeam.strength >= 78 ? 90 : 65;
  return Math.round(350 + points * multiplier);
}

function pointForPosition(position) {
  if (arguments[1]?.dnf) return 0;
  return [25,18,15,12,10,8,6,4,2,1][position - 1] || 0;
}

function applyCareerResult(r, playerCars, playerPoints) {
  r.cars.forEach(car => {
    const pts = pointForPosition(car.position, car);
    if (!pts) return;
    const driverKey = car.abbr;
    const teamKey = car.team?.name || playerTeam.name;
    state.career.driverStandings[driverKey] = (state.career.driverStandings[driverKey] || 0) + pts;
    state.career.constructorStandings[teamKey] = (state.career.constructorStandings[teamKey] || 0) + pts;
  });
  state.career.seasonPlayerPoints = (state.career.seasonPlayerPoints || 0) + playerPoints;
  state.career.round++;
  const checkpointNotice = careerCheckpointNotice();
  if (state.career.round >= tracks.length) finishSeasonBonuses();
  if (state.career.expectationStrikes >= 2) {
    state.career.lastNotice = `${playerTeam.name} released you after missing season expectations. Sign with another team.`;
    state.career.releasedFrom = playerTeam.name;
    state.career.expectationStrikes = 0;
    state.view = "teamSelect";
    return state.career.lastNotice;
  }
  return checkpointNotice;
}

function careerCheckpointNotice() {
  const half = Math.ceil(tracks.length / 2);
  const isHalf = state.career.round === half;
  const isEnd = state.career.round >= tracks.length;
  if (!isHalf && !isEnd) return "";
  const expectation = teamExpectation(playerTeam);
  const expectedTotal = Math.round(expectation.points * state.career.round);
  const actual = state.career.seasonPlayerPoints || 0;
  const checkpoint = isHalf ? "Half-season review" : "End-of-season review";
  if (actual < expectedTotal) {
    state.career.expectationStrikes++;
    state.career.lastNotice = `${checkpoint}: ${actual}/${expectedTotal} pts. Board warning ${state.career.expectationStrikes}/2.`;
  } else {
    state.career.lastNotice = `${checkpoint}: target met with ${actual}/${expectedTotal} pts.`;
  }
  const growthNote = applyChampionshipDriverGrowth();
  if (growthNote) state.career.lastNotice += ` ${growthNote}`;
  return state.career.lastNotice;
}

function finishSeasonBonuses() {
  state.career.completedSeason = true;
  const driverLeader = sortedDriverStandings()[0];
  const constructorLeader = sortedConstructorStandings()[0];
  let bonus = 0;
  if (driverLeader && playerDrivers.some(d => d.abbr === driverLeader.key)) bonus += 5000;
  if (constructorLeader && constructorLeader.key === playerTeam.name) bonus += 8000;
  if (bonus) {
    state.career.credits += bonus;
    state.career.lastNotice = `${state.career.lastNotice ? state.career.lastNotice + " " : ""}Season complete. Championship bonus: ${bonus} RP.`;
  } else {
    state.career.lastNotice = `${state.career.lastNotice ? state.career.lastNotice + " " : ""}Season complete. No championship bonus.`;
  }
  prepareSeasonContracts(driverLeader, constructorLeader, bonus);
}

function currentTeamRetention() {
  const expectation = teamExpectation(playerTeam);
  const seasonTarget = expectation.points * tracks.length;
  const ratio = seasonTarget ? state.career.seasonPlayerPoints / seasonTarget : 1;
  const keepThreshold = playerTeam.strength >= 88 ? .78 : playerTeam.strength >= 80 ? .7 : .58;
  return ratio >= keepThreshold && !state.career.releasedFrom;
}

function prepareSeasonContracts(driverLeader, constructorLeader, bonus) {
  const wonWdc = !!(driverLeader && playerDrivers.some(d => d.abbr === driverLeader.key));
  const wonWcc = !!(constructorLeader && constructorLeader.key === playerTeam.name);
  const seasonPoints = state.career.seasonPlayerPoints || 0;
  const merit = seasonPoints + (state.career.rep || 0) * 18 + (wonWdc ? 70 : 0) + (wonWcc ? 90 : 0);
  const strengthCap = merit >= 430 ? 91 : merit >= 330 ? 90 : merit >= 250 ? 88 : merit >= 180 ? 84 : merit >= 120 ? 80 : 76;
  const currentTeamKeepsYou = currentTeamRetention();
  const offers = [];
  if (currentTeamKeepsYou) {
    offers.push({
      teamIndex: selectedTeamIndex,
      headline: "Renew Current Deal",
      detail: `${playerTeam.name} want to keep you for another season.`,
      demand: contractDemand(playerTeam),
      boardGoal: boardGoal(playerTeam),
      keep: true
    });
  }
  f1Teams
    .map((team, index) => ({ team, index }))
    .filter(({ team, index }) => index !== selectedTeamIndex && team.strength <= strengthCap + 2)
    .sort((a, b) => b.team.strength - a.team.strength)
    .slice(0, currentTeamKeepsYou ? 4 : 5)
    .forEach(({ team, index }) => {
      offers.push({
        teamIndex: index,
        headline: team.strength >= playerTeam.strength ? "Rival Offer" : "Project Offer",
        detail: `${team.name} are willing to talk after your ${seasonPoints}-point season.`,
        demand: contractDemand(team),
        boardGoal: boardGoal(team),
        keep: false
      });
    });
  if (!offers.length) {
    offers.push({
      teamIndex: selectedTeamIndex,
      headline: "Stay Put",
      detail: `${playerTeam.name} remain your only realistic option right now.`,
      demand: contractDemand(playerTeam),
      boardGoal: boardGoal(playerTeam),
      keep: true
    });
  }
  state.career.academyOffer = makeAcademyProspect();
  state.career.offseasonOffers = offers;
  state.career.offseasonStatus = bonus
    ? `Season complete. Championship bonus secured: ${bonus} RP.`
    : "Season complete. No championship bonus secured.";
}

function contractDemand(team) {
  const expectation = teamExpectation(team);
  const patience = team.strength >= 88 ? "low" : team.strength >= 80 ? "medium" : "high";
  return `${expectation.points * tracks.length}+ pts next season, patience ${patience}`;
}

function boardGoal(team) {
  if (team.strength >= 88) return "Win races and fight for WCC";
  if (team.strength >= 80) return "Lead the midfield and score regularly";
  if (team.strength >= 74) return "Reach Q3 moments and convert chaos";
  return "Build reliability, finish races, find points";
}

function makeAcademyProspect() {
  const first = ["Rafael", "Noah", "Mika", "Theo", "Dante", "Kai", "Nico", "Leo"];
  const last = ["Vega", "Moreau", "Keller", "Ishikawa", "Novak", "Silva", "Ward", "Rossi"];
  const seed = Date.now() + (state.career.seasonPlayerPoints || 0);
  const rating = clamp(70 + Math.floor(rand(seed) * 10) + Math.floor((state.career.rep || 0) / 6), 70, 84);
  const name = `${pick(first, seed)} ${pick(last, seed + 9)}`;
  const abbr = name.split(" ").map(part => part[0]).join("").slice(0, 3).toUpperCase() + String(seed).slice(-1);
  return {
    name, abbr,
    stats: {
      Pace: rating + 1,
      Tire: rating,
      Overtaking: rating + 2,
      Defending: rating - 1,
      Wet: rating - 2,
      Consistency: rating - 3,
      Start: rating + 1
    }
  };
}

function championshipDriverRows() {
  return allDrivers()
    .map(driver => ({ key: driver.abbr, points: state.career.driverStandings?.[driver.abbr] || 0 }))
    .sort((a, b) => b.points - a.points || a.key.localeCompare(b.key));
}

function applyChampionshipDriverGrowth() {
  const round = state.career.round;
  const half = Math.ceil(tracks.length / 2);
  if (![half, tracks.length].includes(round) || state.career.lastGrowthRound === round) return "";
  const rows = championshipDriverRows();
  if (!rows.length) return "";
  const notable = [];
  rows.forEach((row, index) => {
    let delta = 0;
    if (index < 3) delta = 2;
    else if (index < 8) delta = 1;
    else if (index >= 18) delta = -2;
    else if (index >= 14) delta = -1;
    if (!delta) return;
    const driver = findDriver(row.key);
    Object.keys(driver.stats).forEach(stat => {
      driver.stats[stat] = clamp(driver.stats[stat] + delta, 60, 99);
    });
    state.career.driverGrowth[row.key] = (state.career.driverGrowth[row.key] || 0) + delta;
    if (notable.length < 4) notable.push(`${row.key} ${delta > 0 ? "+" : ""}${delta}`);
  });
  state.career.lastGrowthRound = round;
  return notable.length ? `Driver market shift: ${notable.join(", ")}.` : "";
}

function gradeRace(players, points) {
  const deltas = players.map(c => c.start - c.position);
  const netGain = deltas.reduce((sum, delta) => sum + delta, 0);
  const worstDelta = Math.min(...deltas);
  const penalties = players.reduce((sum, c) => sum + (c.rulePenalty || 0), 0);
  const destroyedTires = players.filter(c => c.wear > 92).length;
  const finishPositions = players.map(c => c.position).sort((a, b) => a - b);
  if (finishPositions[0] === 1 && finishPositions[1] === 2 && penalties === 0) return ["S", "Perfect Strategy"];
  const eliteFinish = penalties === 0 && destroyedTires === 0 && worstDelta >= 0 && (
    finishPositions[0] === 1 && finishPositions[1] <= 5 ||
    finishPositions[0] <= 2 && finishPositions[1] <= 3 ||
    points >= 33
  );
  const bothFinishedAhead = deltas.every(delta => delta >= 0);
  const pointScorers = players.filter(c => pointForPosition(c.position) > 0).length;
  const expectedSolidPoints = playerTeam.strength >= 88 ? 8 : playerTeam.strength >= 84 ? 6 : playerTeam.strength >= 78 ? 1 : 0;
  let score = points * 2
    + netGain * 4
    + pointScorers * 5
    + (penalties === 0 ? 6 : 0)
    + (bothFinishedAhead ? 8 : 0)
    - (worstDelta < -2 ? Math.abs(worstDelta + 2) * 5 : 0)
    - penalties * 2
    - destroyedTires * 6;
  if (points < expectedSolidPoints) score -= (expectedSolidPoints - points) * 2;
  if (penalties === 0 && destroyedTires === 0 && pointScorers >= 1 && netGain >= 3 && worstDelta >= 0 && points >= expectedSolidPoints) score = Math.max(score, 34);
  if (penalties === 0 && pointScorers >= 1 && netGain >= 1 && worstDelta >= 0) score = Math.max(score, 18);
  if (penalties === 0 && pointScorers === 2 && playerTeam.strength < 88) score = Math.max(score, 18);
  if (penalties === 0 && pointScorers === 2 && playerTeam.strength >= 88) score = Math.max(score, points >= expectedSolidPoints ? 18 : 10);
  if (penalties === 0 && pointScorers >= 1) score = Math.max(score, 10);
  if (penalties === 0 && pointScorers === 2 && worstDelta >= -2) score = Math.max(score, 18);
  if (pointScorers === 2 && penalties === 0 && worstDelta >= -2) score = Math.max(score, 20);
  if (pointScorers === 1 && penalties === 0 && worstDelta >= -2) score = Math.max(score, 16);
  if (pointScorers === 0 && score >= 18) return ["C", "Average"];
  if (score >= 70 && netGain >= 4 && eliteFinish) return ["S", "Perfect Strategy"];
  if (score >= 52 && netGain >= 1 && worstDelta >= -1 && penalties === 0) return ["A", "Excellent"];
  if (score >= 34 && netGain >= -1) return ["B", "Solid"];
  if (score >= 18) return ["C", "Average"];
  if (score >= 4) return ["D", "Poor"];
  return ["F", "Disaster"];
}

function renderResults() {
  const r = state.race;
  const p = r.cars.filter(c => c.player);
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back" onclick="go('menu')">‹</button><h2>Race Results</h2><button class="back" onclick="quickRace(${r.length})">↻</button></div>
    <div class="result-card">
      <div class="result-big">${r.result.grade[0]}</div>
      <h2>${r.result.grade[1]}</h2>
      <p class="muted">Team result: ${r.result.points} points</p>
      <table class="result-table">
        <tr><th>Driver</th><th>Start</th><th>Finish</th><th>Stops</th></tr>
        ${p.map(c => `<tr><td>${c.name}</td><td>P${c.start}</td><td>P${c.position}</td><td>${c.tireAge < r.length ? "Yes" : "No"}</td></tr>`).join("")}
      </table>
    </div>
    <div class="result-card">
      <div class="section-title">Key Moments</div>
      ${r.feed.slice(-9).reverse().map(f => `<div class="feed-line">${f}</div>`).join("")}
    </div>
    <button class="primary-btn race-lap-btn" onclick="quickRace(${r.length})">Race Again</button>
    <button class="ghost-btn race-lap-btn" onclick="go('menu')">Main Menu</button>
  </section>`;
}

function renderCareer() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back" onclick="go('menu')">‹</button><h2>Career</h2><span class="badge">Rank ${state.career.ranking}</span></div>
    <div class="career-card"><h2>Privateer Team</h2><p class="muted">Climb the team table by scoring points, upgrading the car, and signing sharper drivers.</p></div>
    ${careerUpgrade("Car Pace", "car", "Faster lap times across both cars.")}
    ${careerUpgrade("Pit Crew Speed", "pit", "Lower pit loss and more perfect stops.")}
    ${careerUpgrade("Tire Efficiency", "tire", "Reduced wear during attack and defensive laps.")}
    ${careerUpgrade("Strategy Accuracy", "strategy", "Sharper pit rejoin and risk recommendations.")}
    ${careerUpgrade("Reliability", "reliability", "Fewer lock-ups and costly mistakes.")}
    <button class="primary-btn race-lap-btn" onclick="quickRace(10)">Enter Next Event</button>
  </section>`;
}

function careerUpgrade(name, key, desc) {
  const cost = upgradeCost(key);
  const disabled = state.career.credits < cost || state.career[key] >= 99 ? "disabled" : "";
  return `<div class="career-card component-card"><div class="header-row"><div class="driver-market-main"><div class="part-render"></div><div><h3>${name} ${Math.round(state.career[key])} <span class="time-save">${upgradeTimeGain(key)}</span></h3><div class="component-pips">${componentPips(state.career[key])}</div><p class="muted small">${desc}</p></div></div><button class="secondary-btn" ${disabled} onclick="upgrade('${key}')">RP ${cost}</button></div></div>`;
}

function upgradeCost(key) {
  return 700 + Math.floor((state.career[key] - 50) * 42);
}

function upgradeTimeGain(key) {
  const current = state.career[key] || 0;
  if (current >= 99) return "Maxed";
  const step = Math.min(4, 99 - current) / 4;
  const gains = {
    engine: ["lap", .025],
    frontWing: ["lap", .014],
    floor: ["lap", .020],
    brakeCooling: ["lap avg", .030],
    pit: ["stop", .060],
    tire: ["lap late", .040],
    strategy: ["race", .180],
    reliability: ["lap avg", .035],
    car: ["lap", .028]
  };
  const [unit, gain] = gains[key] || ["lap", .02];
  return `Saves ~${(gain * step).toFixed(2)}s/${unit}`;
}

function componentPips(value) {
  const filled = clamp(Math.round((value - 50) / 10), 0, 5);
  return Array.from({ length: 5 }, (_, i) => `<i class="${i < filled ? "on" : ""}"></i>`).join("");
}

function upgrade(key) {
  const cost = upgradeCost(key);
  if (state.career.credits >= cost && state.career[key] < 99) {
    state.career.credits -= cost;
    state.career[key] = clamp(state.career[key] + 4, 1, 99);
    saveCareer();
  }
  render();
}

function driverRating(driver) {
  const values = Object.values(driver.stats);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function driverPrice(driver) {
  const rating = driverRating(driver);
  return Math.max(900, Math.round((rating - 68) * 420 + 1200));
}

function ownsDriver(driver) {
  return signedDriverAbbrs.includes(driver.abbr);
}

function driverMarketCard(driver) {
  const owned = ownsDriver(driver);
  const activeSeat = playerDrivers.findIndex(d => d.abbr === driver.abbr);
  const price = driverPrice(driver);
  const buyDisabled = state.career.credits < price ? "disabled" : "";
  return `<div class="driver-market-card">
    <div class="driver-market-head">
      <div class="driver-market-main"><div><b>${driver.name}</b><small>${driver.teamName} - ${driver.abbr} - Rating ${driverRating(driver)}</small></div></div>
      <span class="badge">${owned ? activeSeat >= 0 ? "Seat " + (activeSeat + 1) : "Owned" : "RP " + price}</span>
    </div>
    <div class="mini-driver-stats">
      <span>PAC<br>${driver.stats.Pace}</span><span>FOC<br>${driver.stats.Consistency}</span><span>OVR<br>${driver.stats.Overtaking}</span><span>DEF<br>${driver.stats.Defending}</span>
    </div>
    <div class="market-actions">
      ${owned
        ? `<button class="secondary-btn" onclick="assignDriver('${driver.abbr}', 0)">Seat 1</button><button class="secondary-btn" onclick="assignDriver('${driver.abbr}', 1)">Seat 2</button>`
        : `<button class="primary-btn" ${buyDisabled} onclick="buyDriver('${driver.abbr}')">Buy Driver</button>`}
    </div>
  </div>`;
}

function teamExpectation(team) {
  const expectations = {
    "McLaren": { label: "Fight for both titles", points: 20 },
    "Red Bull Racing": { label: "Fight for wins every week", points: 18 },
    "Ferrari": { label: "Podiums and strong double points", points: 16 },
    "Mercedes": { label: "Lead the chase and score big", points: 14 },
    "Williams": { label: "Regular double points", points: 7 },
    "Aston Martin": { label: "Consistent points finishes", points: 5 },
    "Racing Bulls": { label: "Score whenever chances open up", points: 4 },
    "Audi": { label: "Push into the points fight", points: 4 },
    "Haas F1 Team": { label: "Steal points on the right days", points: 3 },
    "Alpine": { label: "Recover with opportunistic points", points: 3 },
    "Cadillac": { label: "Finish cleanly and build up", points: 2 }
  };
  return expectations[team.name] || { label: "Finish and develop", points: 3 };
}

function standingsRows(map) {
  return Object.entries(map || {}).map(([key, points]) => ({ key, points })).sort((a, b) => b.points - a.points);
}

function sortedDriverStandings() {
  return standingsRows(state.career.driverStandings);
}

function sortedConstructorStandings() {
  return standingsRows(state.career.constructorStandings);
}

function standingsList(rows, emptyText = "No races completed yet.") {
  if (!rows.length) return `<div class="feed-line">${emptyText}</div>`;
  return rows.slice(0, 10).map((row, index) => `<div class="standings-row"><b>${index + 1}</b><span>${row.key}</span><strong>${row.points}</strong></div>`).join("");
}

function seasonTrackList() {
  return tracks.map((track, index) => {
    const stateClass = index < state.career.round ? "done" : index === state.career.round ? "current" : "";
    return `<div class="calendar-row ${stateClass}"><b>${index + 1}</b><span>${track.country} - ${track.name}</span></div>`;
  }).join("");
}

function buyDriver(abbr) {
  const driver = findDriver(abbr);
  const price = driverPrice(driver);
  if (!ownsDriver(driver) && state.career.credits >= price) {
    state.career.credits -= price;
    signedDriverAbbrs.push(driver.abbr);
    state.career.signedDrivers = signedDriverAbbrs;
    saveCareer();
  }
  render();
}

function assignDriver(abbr, seat) {
  const driver = findDriver(abbr);
  if (!ownsDriver(driver)) return;
  const otherSeat = seat === 0 ? 1 : 0;
  const currentOther = playerDrivers[otherSeat]?.abbr;
  if (currentOther === abbr) return;
  const next = [...playerDrivers.map(d => d.abbr)];
  next[seat] = abbr;
  signedDriverAbbrs = Array.from(new Set([...next, ...signedDriverAbbrs]));
  state.career.signedDrivers = signedDriverAbbrs;
  playerDrivers = next.map(findDriver);
  if (playerDrivers[0].abbr === playerDrivers[1].abbr) playerDrivers[otherSeat] = findDriver(currentOther);
  saveCareer();
  render();
}

function renderGarage() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back" onclick="go('menu')">‹</button><h2>Garage</h2><span class="badge">RP ${state.career.credits}</span></div>
    <div class="career-card"><h2>Team Apex Badge</h2><p class="muted">Original cyan and red racing identity. No licensed liveries, logos, or copied assets.</p><div class="logo-mark"></div></div>
    ${playerDrivers.map(d => `<div class="driver-card"><div class="driver-name">${d.name}</div><div class="bars">${Object.entries(d.stats).map(([k,v]) => statBar(k,v)).join("")}</div></div>`).join("")}
  </section>`;
}

function renderSettings() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back" onclick="go('menu')">‹</button><h2>Settings</h2></div>
    <div class="career-card"><h3>Race Format</h3><p class="muted">Compressed tire wear is always on. Cars slow as tire wear rises, especially past 65% wear.</p></div>
    <div class="career-card"><h3>Audio</h3><p class="muted">No spoken commentary. Race information appears only as clean strategy UI messages.</p></div>
    <button class="primary-btn race-lap-btn" onclick="go('menu')">Done</button>
  </section>`;
}

renderMenu = function() {
  app.innerHTML = cls`
    <section class="screen hero console-home">
      ${speedLines()}
      <div class="home-status">
        <div class="profile-stack"><span>PRINCIPAL</span><b>${userProfile.username}</b></div>
        <div class="rp-stack"><span>RESOURCE POINTS</span><b>RP ${state.career.credits}</b></div>
      </div>
      <div class="title-block">
        <div class="logo-mark"></div>
        <h1>Apex<br>Strategy</h1>
      </div>
      <div class="home-feature">
        <div>
          <span class="feature-kicker">Season Control</span>
          <h2>Race strategy, team politics, development calls.</h2>
          <p>Manage two drivers through compressed Grand Prix battles with tire rules, pit gambles, interviews, standings and contracts.</p>
        </div>
        <div class="feature-meta">
          <span>10 / 20 LAP RACES</span>
          <span>LIVE WEATHER</span>
          <span>TEAM ORDERS</span>
        </div>
      </div>
      <div class="menu-grid">
        <button class="primary-btn career-btn menu-tile" onclick="go('career')"><span>Career</span><small>Continue the championship</small></button>
        <button class="secondary-btn menu-tile" onclick="quickRace(10, 'grandPrix')"><span>Grand Prix</span><small>Choose any team and venue</small></button>
        <button class="ghost-btn menu-tile" onclick="go('settings')"><span>Settings</span><small>Profile and display</small></button>
      </div>
    </section>`;
}

function teamOptionCard(team, index, mode = "choose") {
  const selected = index === selectedTeamIndex;
  const blocked = mode === "choose" && state.career.releasedFrom === team.name;
  const targetView = mode === "choose" ? "menu" : mode === "careerSettings" ? "careerSettings" : "settings";
  return `<button class="team-option ${selected ? "selected" : ""}" ${blocked ? "disabled" : ""} onclick="setPlayerTeam(${index}, '${targetView}')">
    <span class="team-swatch" style="background:${team.color}"></span>
    <span><b>${team.name}</b><small>${blocked ? "Released you - unavailable" : `${teamExpectation(team).label} / ${team.drivers[0].name} + ${team.drivers[1].name}`}</small></span>
  </button>`;
}

function renderSeasonContracts() {
  const offers = state.career.offseasonOffers || [];
  const academy = state.career.academyOffer;
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('career')">Back</button><h2>Season Contracts</h2><span class="badge">Season End</span></div>
    <div class="career-card">
      <h2>Choose Your Next Team</h2>
      <p class="muted">${state.career.offseasonStatus || "The season is over. Decide whether to stay or take a new project."}</p>
    </div>
    <div class="section-title">Contract Table</div>
    <div class="team-list">
      ${offers.map(offer => contractOfferCard(offer)).join("")}
    </div>
    ${academy ? `<div class="section-title">Driver Academy</div>
    <div class="driver-market-card academy-card">
      <div class="driver-market-head">
        <div class="driver-market-main"><div><b>${academy.name}</b><small>${academy.abbr} - Rating ${driverRating(academy)} - Academy prospect</small></div></div>
        <span class="badge">Rookie</span>
      </div>
      <div class="mini-driver-stats">
        <span>PAC<br>${academy.stats.Pace}</span><span>FOC<br>${academy.stats.Consistency}</span><span>OVR<br>${academy.stats.Overtaking}</span><span>DEF<br>${academy.stats.Defending}</span>
      </div>
      <div class="market-actions"><button class="secondary-btn" onclick="promoteAcademyDriver()">Promote To Market</button></div>
    </div>` : ""}
  </section>`;
}

function contractOfferCard(offer) {
  const team = f1Teams[offer.teamIndex];
  return `<div class="driver-market-card">
    <div class="driver-market-head">
      <div class="driver-market-main"><div><b>${team.name}</b><small>${offer.headline} - ${teamExpectation(team).label}</small></div></div>
      <span class="badge">${team.tag}</span>
    </div>
    <div class="feed-line">${offer.detail}</div>
    <div class="contract-meta"><span>Demand: ${offer.demand}</span><span>Board: ${offer.boardGoal}</span></div>
    <div class="market-actions">
      <button class="primary-btn" onclick="acceptSeasonContract(${offer.teamIndex})">${offer.keep ? "Stay" : "Negotiate"}</button>
    </div>
  </div>`;
}

function promoteAcademyDriver() {
  const academy = state.career.academyOffer;
  if (!academy) return;
  state.career.academyDrivers = [...(state.career.academyDrivers || []), academy];
  state.career.signedDrivers = [...new Set([...(state.career.signedDrivers || signedDriverAbbrs), academy.abbr])];
  signedDriverAbbrs = state.career.signedDrivers;
  state.career.academyOffer = null;
  applySignedDrivers();
  saveCareer();
  render();
}

function acceptSeasonContract(teamIndex) {
  resetSeason();
  setPlayerTeam(teamIndex, "career");
}

function renderTeamSelect() {
  app.innerHTML = cls`<section class="screen">
    <div class="title-block compact-title">
      <div class="logo-mark"></div>
      <h1>Apex<br>Strategy</h1>
      <p class="subtitle">Choose the team you want to manage.</p>
    </div>
    <div class="section-title">Team Principal Contract</div>
    <div class="team-list">
      ${f1Teams.map((team, index) => teamOptionCard(team, index, "choose")).join("")}
    </div>
  </section>`;
}

renderSetup = function() {
  const s = state.setup;
  const careerMode = s.mode === "career";
  app.innerHTML = cls`
    <section class="screen">
      <div class="header-row"><button class="back text-back" onclick="go('${careerMode ? "career" : "menu"}')">Back</button><h2>Apex Setup</h2>${careerMode ? `<span class="badge">Locked</span>` : `<button class="back text-back" onclick="randomTrack()">New</button>`}</div>
      <div class="section-title">${careerMode ? `Career Round ${state.career.round + 1}/${tracks.length}` : "Grand Prix Venue"}</div>
      ${trackCard(s.track, s.laps)}
      ${careerMode ? "" : `<select class="track-select" onchange="setTrack(this.value)">
        ${tracks.map((t, i) => `<option value="${i}" ${t === s.track ? "selected" : ""}>${t.country} - ${t.name}</option>`).join("")}
      </select>
      <select class="track-select" onchange="setGrandPrixTeam(this.value)">
        ${f1Teams.map((t, i) => `<option value="${i}" ${i === selectedTeamIndex ? "selected" : ""}>${t.name}</option>`).join("")}
      </select>`}
      <div class="section-title">Race Length</div>
      <div class="segmented">
        <button class="${s.laps === 10 ? "selected" : ""}" onclick="setLaps(10)">10 Laps</button>
        <button class="${s.laps === 20 ? "selected" : ""}" onclick="setLaps(20)">20 Laps</button>
      </div>
      <div class="section-title">Qualifying</div>
      <div class="career-card"><h3>Tyres are selected after qualifying</h3><p class="muted">Run qualifying first, then choose each driver's starting compound from their grid position.</p></div>
      <button class="primary-btn race-lap-btn" onclick="runQualifying()">Run Qualifying</button>
    </section>`;
}

renderTireSelect = function() {
  const s = state.setup;
  app.innerHTML = cls`
    <section class="screen">
      <div class="header-row"><button class="back text-back" onclick="go('setup')">Back</button><h2>Post-Qualifying</h2><span class="badge">${s.laps} laps</span></div>
      ${trackCard(s.track, s.laps)}
      <div class="section-title">Qualifying Result</div>
      <div class="tower full-tower">
        <div class="tower-row tower-head"><b>POS</b><span>DRIVER</span><span>TEAM</span><span></span><span></span></div>
        ${(s.qualifying || []).map(row => `<div class="tower-row"><b>P${row.pos}</b><span>${row.abbr}</span><span>${row.team}</span><span></span><span></span></div>`).join("")}
      </div>
      <div class="section-title">Starting Tyres</div>
      ${setupDriver(1, playerDrivers[0], s.tire1, s.grid?.[0])}
      ${setupDriver(2, playerDrivers[1], s.tire2, s.grid?.[1])}
      <button class="primary-btn race-lap-btn" onclick="startRace()">Start Race</button>
    </section>`;
}

trackCard = function(track, laps) {
  return cls`<div class="track-card compact-track-card">
    <div class="track-head">
      <div><div class="track-name">${track.name}</div><div class="track-country">${track.country}</div></div>
      <div class="badge">${laps} laps</div>
    </div>
    <div class="stat-grid">
      <div class="mini-stat"><b>${track.overtaking}</b><span>Overtaking</span></div>
      <div class="mini-stat"><b>${track.deg}</b><span>Tire Wear</span></div>
      <div class="mini-stat"><b>${track.rain}%</b><span>Rain</span></div>
      <div class="mini-stat"><b>${track.pitLoss.toFixed(1)}s</b><span>Pit Loss</span></div>
      <div class="mini-stat"><b>${[10,20].includes(laps) ? track.safety + "%" : "Off"}</b><span>Safety Car</span></div>
      <div class="mini-stat"><b>${track.temp}C</b><span>Temp</span></div>
    </div>
  </div>`;
}

setupDriver = function(num, driver, tire, gridPosition = null) {
  const stats = driver.stats;
  return cls`<div class="driver-card">
    <div class="driver-top"><div><div class="driver-name">${driver.name}</div><div class="driver-meta">${playerTeam.name} - ${driver.abbr}${gridPosition ? ` - Qualified P${gridPosition}` : ""}</div></div><span class="compound ${tire}">${compounds[tire].short}</span></div>
    <div class="bars">
      ${["Pace","Tire","Overtaking","Defending","Wet","Consistency","Start"].map(k => statBar(k, stats[k])).join("")}
    </div>
    <div class="setup-row single">
      <div><p class="small-label">Starting Tire</p><div class="tire-choice">${["Soft","Medium","Hard"].map(t => `<button class="${t === tire ? "selected" : ""}" onclick="setSetup('tire${num}','${t}')">${compounds[t].short}</button>`).join("")}</div></div>
    </div>
  </div>`;
}

renderRace = function() {
  const r = state.race;
  const p1 = r.cars.find(c => c.driverNum === 1);
  const p2 = r.cars.find(c => c.driverNum === 2);
  const weatherAlert = weatherAlertText();
  app.innerHTML = cls`
    <section class="screen race-screen">
      <div class="topbar ${weatherAlert ? "weather-live" : ""}">
        <div><div class="lap-title">Lap ${Math.min(r.lap, r.length)}/${r.length}</div><div class="weather-pill">${r.track.name} - ${r.weather}${r.safetyActive ? " - Safety Car" : ""}</div></div>
        <div class="small">D1 P${p1.position} - D2 P${p2.position}</div>
      </div>
      ${weatherAlert ? `<div class="weather-banner"><b>${weatherAlert}</b><span>${r.weather.includes("rain") ? "Check intermediate or wet tires now." : "Review tire choice before the next lap."}</span></div>` : ""}
      <div class="standings-shell">${timingTower()}</div>
      <div class="driver-grid">
        ${teamOrdersPanel()}
        ${commandCard(p1)}
        ${commandCard(p2)}
      </div>
      <button class="primary-btn race-lap-btn sticky-action" onclick="simulateLap()">Race Lap</button>
      <div class="feed">${r.feed.slice(-8).reverse().map(f => `<div class="feed-line">${f}</div>`).join("")}</div>
      ${r.pitModal ? pitModal(r.pitModal) : ""}
    </section>`;
}

function teamOrdersPanel() {
  const order = state.race.teamOrder || "Free";
  const options = [
    ["Free", "Free Race"],
    ["Hold", "Hold Station"],
    ["Swap", "Swap Cars"],
    ["BackLead", "Back Lead"]
  ];
  return `<div class="team-orders-panel">
    <div><b>Team Orders</b><span>${order === "Free" ? "Drivers may race" : options.find(o => o[0] === order)?.[1] || order}</span></div>
    <div class="team-order-buttons">
      ${options.map(([key, label]) => `<button class="${order === key ? "selected" : ""}" onclick="setTeamOrder('${key}')">${label}</button>`).join("")}
    </div>
  </div>`;
}

timingTower = function() {
  return `<div class="tower full-tower">
    <div class="tower-row tower-head"><b>POS</b><span>DRIVER</span><span>TEAM</span><span>TIRE</span><span>GAP</span></div>
    ${state.race.cars.map(c => `<div class="tower-row ${c.player ? "player" : ""}" style="--team:${c.team?.color || "#00d2ff"}">
      <b>${c.dnf ? "DNF" : "P" + c.position}</b><span>${c.abbr}</span><span>${c.team?.tag || playerTeam.tag}</span><span class="compound ${c.tire}">${compounds[c.tire].short}</span><span>${c.dnf ? c.dnfReason : gapFor(c, -1)}</span>
    </div>`).join("")}
  </div>`;
}

commandCard = function(car) {
  const rec = pitRecommendation(car);
  const ahead = carAhead(car);
  const behind = carBehind(car);
  const weatherWarning = tireWeatherWarning(car);
  return cls`<div class="command-card">
    <div class="command-top">
      <div><div class="driver-name">${car.name}</div><div class="driver-meta">${car.team?.name || playerTeam.name} - ${car.pitQueued ? "Pit queued for " + car.pitTarget : rec}</div></div>
      <div class="pos-badge">${car.dnf ? "DNF" : "P" + car.position}</div>
    </div>
    <div class="delta-card"><span>Delta ahead</span><b>${ahead ? `${gapFor(car, -1)} to ${ahead.abbr}` : "Leader"}</b></div>
    <div class="delta-card delta-behind"><span>Delta behind</span><b>${behind ? `${gapFor(car, 1)} to ${behind.abbr}` : "Clear"}</b></div>
    ${weatherWarning ? `<div class="weather-card"><span>Weather</span><b>${weatherWarning}</b></div>` : ""}
    ${car.wingDamage ? `<div class="incident-chip"><span>Damage</span><b>Front wing - pace loss</b></div>` : ""}
    <div class="rule-chip"><span>Rule</span><b>${ruleStatus(car)}</b></div>
    <div class="wear-line"><span class="compound ${car.tire}">${compounds[car.tire].short}</span><div class="wearbar"><i style="width:${car.wear}%"></i></div><b>${Math.round(car.wear)}%</b></div>
    <div class="gapline"><span>Behind ${gapFor(car, 1)}</span><span>Last ${car.lastLap ? car.lastLap.toFixed(1) + "s" : "--"}</span><span>Risk ${car.risk}</span></div>
    <div class="commands">
      ${["Attack","Balanced","Defend","Conserve"].map(m => `<button ${car.dnf ? "disabled" : ""} class="${state.race.commands[car.driverNum] === m ? "selected" : ""}" onclick="setCommand(${car.driverNum}, '${m}')">${m}</button>`).join("")}
      <button ${car.dnf ? "disabled" : ""} class="pit-btn" onclick="${car.pitQueued ? `cancelPit(${car.driverNum})` : `openPit(${car.driverNum})`}">${car.pitQueued ? "Cancel Pit" : "Pit"}</button>
    </div>
  </div>`;
}

var carAhead = function(car) {
  return state.race.cars.find(c => c.position === car.position - 1);
}

var carBehind = function(car) {
  return state.race.cars.find(c => c.position === car.position + 1);
}

renderResults = function() {
  const r = state.race;
  const p = r.cars.filter(c => c.player);
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('menu')">Back</button><h2>Race Results</h2><button class="back text-back" onclick="quickRace(${r.length})">Again</button></div>
    <div class="result-card">
      <div class="result-big">${r.result.grade[0]}</div>
      <h2>${r.result.grade[1]}</h2>
      <p class="muted">Team result: ${r.result.points} pts - ${r.result.payout} RP earned</p>
      <table class="result-table">
        <tr><th>Driver</th><th>Start</th><th>Finish</th></tr>
        ${p.map(c => `<tr><td>${c.name}</td><td>P${c.start}</td><td>${c.dnf ? "DNF" : "P" + c.position}</td></tr>`).join("")}
      </table>
    </div>
    <div class="result-card">
      <div class="section-title">Final Standings</div>
      ${r.cars.map(c => `<div class="feed-line"><strong>${c.dnf ? "DNF" : "P" + c.position} ${c.abbr}</strong> - ${c.name} (${c.team?.name || playerTeam.name})${c.dnf ? " - " + c.dnfReason : ""}</div>`).join("")}
    </div>
    ${renderInterview(r)}
    ${nextResultAction(r)}
  </section>`;
}

renderCareer = function() {
  const nextTrack = tracks[state.career.round % tracks.length];
  const expectation = teamExpectation(playerTeam);
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('menu')">Back</button><h2>Career</h2><span class="badge">RP ${state.career.credits}</span></div>
    <div class="career-card"><h2>Next: ${nextTrack.country} - ${nextTrack.name}</h2><p class="muted">${playerTeam.name} expectation: ${expectation.label}.</p></div>
    <button class="primary-btn race-lap-btn" onclick="startCareerRace()">${state.career.completedSeason ? "Start New Season" : "Next Race"}</button>
    <button class="secondary-btn race-lap-btn" onclick="go('development')">Buy Upgrades</button>
    <button class="secondary-btn race-lap-btn" onclick="go('garage')">Driver Market</button>
    <button class="ghost-btn race-lap-btn" onclick="go('careerSettings')">Career Settings</button>
    <div class="section-title">Season Calendar</div>
    <div class="career-card calendar-list">${seasonTrackList()}</div>
    <div class="section-title">Driver Standings</div>
    <div class="career-card">${standingsList(sortedDriverStandings())}</div>
    <div class="section-title">Constructor Standings</div>
    <div class="career-card">${standingsList(sortedConstructorStandings())}</div>
  </section>`;
}

renderDevelopment = function() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('career')">Back</button><h2>Development</h2><span class="badge">RP ${state.career.credits}</span></div>
    <div class="career-card"><h2>${playerTeam.name} Development</h2><p class="muted">Engine and aero improve lap time, pit crew cuts stop loss, tire systems reduce degradation, and cooling/reliability reduce mistakes.</p></div>
    ${careerUpgrade("Efficient Engine", "engine", "More efficient power unit: better acceleration and lower lap time.")}
    ${careerUpgrade("New Front Wing", "frontWing", "Sharper aero balance: stronger attack and cleaner pace.")}
    ${careerUpgrade("Floor Package", "floor", "More downforce and tire stability over a stint.")}
    ${careerUpgrade("Brake Cooling", "brakeCooling", "Lower lock-up risk while attacking or defending.")}
    ${careerUpgrade("Pit Crew Speed", "pit", "Quicker pit stops and more perfect stops.")}
    ${careerUpgrade("Tire Efficiency", "tire", "Reduced wear during attack and defensive laps.")}
    ${careerUpgrade("Strategy Accuracy", "strategy", "Sharper pit rejoin and risk recommendations.")}
    ${careerUpgrade("Reliability", "reliability", "Fewer costly mistakes and mechanical scares.")}
    ${careerUpgrade("Car Pace", "car", "General chassis improvements across both cars.")}
  </section>`;
}

renderGarage = function() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('career')">Back</button><h2>Garage</h2><span class="badge">RP ${state.career.credits}</span></div>
    <div class="career-card"><h2>Race Seats</h2><p class="muted">Buy drivers with RP and assign them to Seat 1 or Seat 2. Bought drivers stay available after refresh.</p></div>
    <div class="seat-grid">
      ${playerDrivers.map((d, i) => `<div class="seat-card"><span>Seat ${i + 1}</span><b>${d.name}</b><small>${d.abbr} - ${driverRating(d)}</small></div>`).join("")}
    </div>
    <div class="section-title">Driver Market</div>
    <div class="driver-market">
      ${allDrivers().map(d => driverMarketCard(d)).join("")}
    </div>
  </section>`;
}

renderSettings = function() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('menu')">Back</button><h2>Settings</h2></div>
    <div class="career-card settings-stack">
      <h3>Username</h3>
      <input class="text-input" type="text" maxlength="24" value="${userProfile.username}" placeholder="Team Principal" oninput="setUsername(this.value)">
      <p class="muted">Used for your save profile.</p>
    </div>
    <div class="career-card settings-stack">
      <h3>Theme</h3>
      <div class="segment-row">
        <button class="segment-btn ${userProfile.theme === "dark" ? "active" : ""}" onclick="setTheme('dark')">Dark Mode</button>
        <button class="segment-btn ${userProfile.theme === "light" ? "active" : ""}" onclick="setTheme('light')">Light Mode</button>
      </div>
    </div>
    <button class="primary-btn race-lap-btn" onclick="go('menu')">Done</button>
  </section>`;
}

renderCareerSettings = function() {
  app.innerHTML = cls`<section class="screen">
    <div class="header-row"><button class="back text-back" onclick="go('career')">Back</button><h2>Career Settings</h2><span class="badge">${playerTeam.tag}</span></div>
    <div class="career-card"><h3>Managed Team</h3><p class="muted">${playerTeam.name}: ${playerDrivers[0].name} and ${playerDrivers[1].name}</p></div>
    <div class="team-list settings-team-list">
      ${f1Teams.map((team, index) => teamOptionCard(team, index, "careerSettings")).join("")}
    </div>
    <button class="primary-btn race-lap-btn" onclick="go('career')">Done</button>
  </section>`;
}

function setUsername(name) {
  userProfile.username = (name || "").trim().slice(0, 24) || "Team Principal";
  saveProfile();
}

function setTheme(theme) {
  userProfile.theme = theme === "light" ? "light" : "dark";
  applyTheme();
  saveProfile();
  render();
}

pitModal = function(num) {
  const car = state.race.cars.find(c => c.driverNum === num);
  const est = estimatePit(car);
  return cls`<div class="modal"><div class="modal-card">
    <div class="header-row"><h2>Pit Strategy</h2><button class="back text-back" onclick="closePit()">Close</button></div>
    <div class="strategy-panel">
      <div>Current: <b>${car.tire}</b>, ${Math.round(car.wear)}% worn</div>
      ${car.pitQueued ? `<div>Queued stop: <b>${car.pitTarget}</b></div>` : ""}
      <div>Pit loss: <b>${est.loss.toFixed(1)}s</b> - Rejoin: <b>P${est.rejoin}</b></div>
      <div>Traffic Risk: <b>${est.traffic}</b> - Undercut Chance: <b>${est.undercut}</b></div>
      <div class="muted small">${weatherHint()}</div>
    </div>
    <div class="pit-options">${Object.keys(compounds).map(t => `<button ${t === car.tire ? "disabled" : ""} onclick="queuePit(${num}, '${t}')"><span class="compound ${t}">${compounds[t].short}</span></button>`).join("")}</div>
    ${car.pitQueued ? `<button class="secondary-btn race-lap-btn cancel-pit-btn" onclick="cancelPit(${num})">Cancel Scheduled Pit</button>` : ""}
    <button class="ghost-btn race-lap-btn" onclick="closePit()">Cancel</button>
  </div></div>`;
}

window.go = go;
window.quickRace = quickRace;
window.startCareerRace = startCareerRace;
window.nextRaceFromResults = nextRaceFromResults;
window.resetSeason = resetSeason;
window.randomTrack = randomTrack;
window.setTrack = setTrack;
window.setGrandPrixTeam = setGrandPrixTeam;
window.setLaps = setLaps;
window.setSetup = setSetup;
window.runQualifying = runQualifying;
window.startRace = startRace;
window.setCommand = setCommand;
window.setTeamOrder = setTeamOrder;
window.openPit = openPit;
window.closePit = closePit;
window.queuePit = queuePit;
window.cancelPit = cancelPit;
window.simulateLap = simulateLap;
window.answerInterview = answerInterview;
window.answerInterviewChoice = answerInterviewChoice;
window.skipInterview = skipInterview;
window.upgrade = upgrade;
window.setPlayerTeam = setPlayerTeam;
window.acceptSeasonContract = acceptSeasonContract;
window.promoteAcademyDriver = promoteAcademyDriver;
window.buyDriver = buyDriver;
window.assignDriver = assignDriver;
window.setUsername = setUsername;
window.setTheme = setTheme;
window.state = state;
window.tracks = tracks;
window.pointForPosition = pointForPosition;
window.gradeRace = gradeRace;

render();
