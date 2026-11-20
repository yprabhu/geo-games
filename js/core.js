// Shared helpers and scoring. Every game uses these, so scoring stays consistent.
const KEY = "geo-games:v1";

export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);

// Returns [answer, wrong] - two different items from the pool.
export function twoChoice(pool) {
  const answer = pick(pool);
  let wrong;
  do { wrong = pick(pool); } while (wrong === answer);
  return [answer, wrong];
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}
function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
}

export function createScorer() {
  let score = 0, streak = 0, best = load().best || 0;
  return {
    get state() { return { score, streak, best }; },
    correct() {
      streak++;
      const gained = 10 + 2 * streak;
      score += gained;
      if (streak > best) { best = streak; save({ best }); }
      return gained;
    },
    wrong() { streak = 0; }
  };
}
