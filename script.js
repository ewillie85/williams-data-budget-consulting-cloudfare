
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Interactive sample dashboard.
// All figures are illustrative and do not represent real client data.
const dashboard = document.querySelector(".dashboard-card");

if (dashboard) {
  const columns = document.querySelectorAll("#chart-columns .chart-column > span");

  // Create clearly labeled controls for exploring the example.
  const controls = document.createElement("div");
  controls.className = "dashboard-controls";
  controls.innerHTML = `
    <label class="dashboard-control">
      <span>Monthly income</span>
      <strong id="income-value">$5,000</strong>
      <input id="income-slider" type="range" min="2000" max="12000"
        step="250" value="5000" aria-label="Sample monthly income">
    </label>
    <label class="dashboard-control">
      <span>Monthly savings goal</span>
      <strong id="goal-value">$750</strong>
      <input id="goal-slider" type="range" min="0" max="4000"
        step="50" value="750" aria-label="Sample monthly savings goal">
    </label>
    <p class="dashboard-disclaimer">
      Example figures for demonstration only. Adjust the sliders to explore.
    </p>
  `;

  const chartHeading = dashboard.querySelector(".chart-heading");
  chartHeading.insertAdjacentElement("afterend", controls);

  const incomeSlider = document.getElementById("income-slider");
  const goalSlider = document.getElementById("goal-slider");
  const incomeValue = document.getElementById("income-value");
  const goalValue = document.getElementById("goal-value");
  const savingsDisplay = document.getElementById("savings-display");
  const rateDisplay = document.getElementById("rate-display");

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  function updateDashboard() {
    const income = Number(incomeSlider.value);
    const goal = Number(goalSlider.value);
    const rate = income > 0 ? (goal / income) * 100 : 0;

    incomeValue.textContent = money.format(income);
    goalValue.textContent = money.format(goal);
    savingsDisplay.textContent = money.format(goal);
    rateDisplay.textContent = `${rate.toFixed(1)}%`;

    // Illustrative chart values that respond to the selected goal.
    const baseValues = [0.48, 0.62, 0.53, 0.77, 0.68, 0.91];
    const goalFactor = goal / 750;
    const incomeFactor = income / 5000;

    columns.forEach((bar, index) => {
      const variation = baseValues[index] * incomeFactor;
      const savingsEffect = goalFactor * 0.12;
      const height = Math.max(
        8,
        Math.min(100, (variation + savingsEffect) * 65)
      );

      bar.style.height = `${height}%`;
      bar.style.background = index === 5 ? "#D39A62" : "";
    });

    goalSlider.max = String(Math.min(4000, income));
    if (Number(goalSlider.value) > Number(goalSlider.max)) {
      goalSlider.value = goalSlider.max;
      updateDashboard();
    }
  }

  incomeSlider.addEventListener("input", updateDashboard);
  goalSlider.addEventListener("input", updateDashboard);

  updateDashboard();
}
