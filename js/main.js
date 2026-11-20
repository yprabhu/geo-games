// App shell: renders tabs, stats, and any game that follows the round contract (see CLAUDE.md).
import { GAMES } from "./games/index.js";
import { createScorer, shuffle } from "./core.js";

const $ = id => document.getElementById(id);
const scorer = createScorer();
let game = GAMES[0], locked = false;

function renderTabs() {
  const box = $("tabs");
  box.innerHTML = "";
  GAMES.forEach(g => {
    const b = document.createElement("button");
    b.className = "tab" + (g === game ? " on" : "");
    b.textContent = g.label;
    b.onclick = () => { game = g; renderTabs(); newRound(); };
    box.appendChild(b);
  });
}

function renderStats() {
  const s = scorer.state;
  $("score").textContent = s.score;
  $("streak").textContent = s.streak;
  $("best").textContent = s.best;
}

function newRound() {
  locked = false;
  const round = game.newRound();
  $("msg").textContent = "";
  $("msg").style.color = "";
  $("next").classList.remove("show");
  $("prompt").textContent = round.prompt;
  $("stage").innerHTML = round.stage;
  const box = $("opts");
  box.innerHTML = "";
  shuffle(round.options).forEach(text => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = text;
    b.onclick = () => choose(b, text, round.answer);
    box.appendChild(b);
  });
}

function choose(btn, chosen, answer) {
  if (locked) return;
  locked = true;
  document.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (b.textContent === answer) b.classList.add("ok");
  });
  if (chosen === answer) {
    const gained = scorer.correct();
    $("msg").textContent = "Correct! +" + gained + " points 🎉";
    $("msg").style.color = "var(--ok)";
  } else {
    btn.classList.add("bad");
    scorer.wrong();
    $("msg").textContent = "Not quite. It was " + answer + ".";
    $("msg").style.color = "var(--bad)";
  }
  renderStats();
  $("next").classList.add("show");
}

$("next").onclick = newRound;
renderTabs();
renderStats();
newRound();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
  navigator.serviceWorker.ready.then(() => { $("offline").textContent = "Offline ready ✓"; });
}
