import { FLAGS } from "../../data/flags.js";
import { twoChoice } from "../core.js";

export default {
  id: "flags",
  label: "🚩 Flags",
  newRound() {
    const [a, w] = twoChoice(FLAGS);
    return {
      prompt: "Which country does this flag belong to?",
      stage: '<div class="flag" aria-label="Flag">' + a.emoji + "</div>",
      options: [a.name, w.name],
      answer: a.name
    };
  }
};
