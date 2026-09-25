const questions = [
  { word: "FACILITATE", question: "The new online platform will ______ collaboration between researchers across different universities.", answers: ["make easier", "make more difficult", "measure precisely", "replace entirely"], correct: 0, explanation: "Facilitate means to make an action or process easier.", tip: "Facilitate means to make an action or process easier." },
  { word: "MITIGATE", question: "Planting trees in urban areas can help ______ the effects of extreme summer heat.", answers: ["intensify", "reduce or lessen", "predict", "document"], correct: 1, explanation: "Mitigate means to reduce the severity, seriousness, or painfulness of something.", tip: "Mitigate is about making a problem less severe—not removing it completely." },
  { word: "EXACERBATE", question: "Poorly designed policies may ______ existing inequalities rather than resolve them.", answers: ["celebrate", "explain", "make worse", "balance"], correct: 2, explanation: "Exacerbate means to make a problem, situation, or negative feeling worse.", tip: "Exacerbate is the opposite of mitigate: it makes a difficult situation worse." },
  { word: "FACILITATE", question: "Clear headings and transition phrases ______ a reader’s understanding of a complex argument.", answers: ["facilitate", "exacerbate", "contradict", "postpone"], correct: 0, explanation: "Clear structure facilitates understanding by making the argument easier to follow.", tip: "A person, tool, or condition can facilitate a process." },
  { word: "MITIGATE", question: "The researchers introduced a larger sample size to ______ the risk of drawing a biased conclusion.", answers: ["mitigate", "exacerbate", "imitate", "justify"], correct: 0, explanation: "A larger sample can mitigate, or lessen, the risk of bias.", tip: "Common collocations include mitigate risk, mitigate damage, and mitigate effects." },
  { word: "EXACERBATE", question: "Ignoring the early warning signs would likely ______ the public health crisis.", answers: ["facilitate", "exacerbate", "mitigate", "illustrate"], correct: 1, explanation: "Ignoring warning signs would exacerbate the crisis by making it worse.", tip: "Exacerbate is often used with problems, tensions, conflicts, and crises." }
];
let current = 0, score = 0, selected = null, answered = false;
const $ = (id) => document.getElementById(id);
const answersEl = $("answers"), nextButton = $("next-button");
function renderQuestion() {
  const q = questions[current]; selected = null; answered = false;
  $("question-count").textContent = `QUESTION ${String(current + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  $("score-label").textContent = `${score} correct`;
  $("progress-bar").style.width = `${((current + 1) / questions.length) * 100}%`;
  $("question-word").textContent = q.word; $("question-heading").textContent = q.question;
  $("feedback").textContent = ""; $("feedback").className = "feedback"; nextButton.disabled = true; nextButton.innerHTML = "Check answer <span>→</span>";
  answersEl.innerHTML = q.answers.map((answer, i) => `<label class="answer"><input type="radio" name="answer" value="${i}"><span class="answer-marker">${String.fromCharCode(65 + i)}</span><span>${answer}</span></label>`).join("");
  answersEl.querySelectorAll(".answer").forEach((label) => label.addEventListener("click", () => { if (answered) return; selected = Number(label.querySelector("input").value); answersEl.querySelectorAll(".answer").forEach(x => x.classList.remove("selected")); label.classList.add("selected"); nextButton.disabled = false; }));
  $("tip-text").textContent = q.tip;
}
nextButton.addEventListener("click", () => {
  const q = questions[current];
  if (!answered) { answered = true; const labels = answersEl.querySelectorAll(".answer"); labels[q.correct].classList.add("correct"); if (selected !== q.correct) { labels[selected].classList.add("incorrect"); $("feedback").textContent = `Not quite. ${q.explanation}`; $("feedback").className = "feedback error"; } else { score++; $("feedback").textContent = `Correct! ${q.explanation}`; } $("score-label").textContent = `${score} correct`; nextButton.innerHTML = current === questions.length - 1 ? "See results <span>→</span>" : "Next question <span>→</span>"; return; }
  if (current === questions.length - 1) showResults(); else { current++; renderQuestion(); }
});
function showResults() { $("quiz-view").hidden = true; $("results-view").hidden = false; $("results-copy").textContent = `You answered ${score} out of ${questions.length} questions correctly.`; $("results-score").textContent = `${Math.round(score / questions.length * 100)}%`; $("progress-bar").style.width = "100%"; }
$("restart-button").addEventListener("click", () => { current = 0; score = 0; $("results-view").hidden = true; $("quiz-view").hidden = false; renderQuestion(); });
renderQuestion();
