"use strict";

const THURSDAY = 4;
const answerElement = document.getElementById("answer");

const isItThursdayYet = () => new Date().getDay() === THURSDAY;

const render = () => {
    answerElement.textContent = isItThursdayYet() ? "Yes" : "No";
};

const msUntilNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return nextMidnight - now;
};

const scheduleNextRender = () => {
    // +50ms buffer so we never fire a hair before midnight and render the old day
    setTimeout(() => {
        render();
        scheduleNextRender();
    }, msUntilNextMidnight() + 50);
};

render();
scheduleNextRender();

// Timers can be throttled or paused when a tab is backgrounded or the device sleeps,
// so re-check whenever the tab becomes visible again.
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) render();
});