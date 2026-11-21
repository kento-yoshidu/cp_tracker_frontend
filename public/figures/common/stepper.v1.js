/*
 * 解説ページ共通のステップ送り。
 *
 * 前提とするマークアップ（id）:
 *   #step-title, #step-text, #progress, #prev, #next, #reset
 *
 * 使い方:
 *   const stepper = createStepper({
 *     steps: buildSteps(...),            // { title, text, ...状態 } の配列
 *     render(step, { index, steps }) {}, // ページ固有の描画
 *     html: false,                       // true なら step.text を innerHTML で入れる
 *   });
 *   stepper.setSteps(newSteps);          // 入力例の切り替えなど。先頭に戻る
 */
function createStepper({ steps, render, html = false }) {
  const titleEl = document.getElementById("step-title");
  const textEl = document.getElementById("step-text");
  const progressEl = document.getElementById("progress");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const resetButton = document.getElementById("reset");

  let current = steps;
  let index = 0;

  function update() {
    const step = current[index];

    render(step, { index, steps: current });

    titleEl.textContent = step.title;
    if (html) {
      textEl.innerHTML = step.text;
    } else {
      textEl.textContent = step.text;
    }
    progressEl.textContent = `${index + 1} / ${current.length}`;

    prevButton.disabled = index === 0;
    nextButton.disabled = index === current.length - 1;
  }

  function moveTo(nextIndex) {
    index = Math.min(Math.max(nextIndex, 0), current.length - 1);
    update();
  }

  function setSteps(nextSteps) {
    current = nextSteps;
    moveTo(0);
  }

  prevButton.addEventListener("click", () => moveTo(index - 1));
  nextButton.addEventListener("click", () => moveTo(index + 1));
  resetButton.addEventListener("click", () => moveTo(0));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      moveTo(index - 1);
    }

    if (e.key === "ArrowRight") {
      moveTo(index + 1);
    }
  });

  update();

  return { moveTo, setSteps };
}

window.createStepper = createStepper;
