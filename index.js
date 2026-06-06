"use strict";

let answerElement;
let millisUntil;
const today = new Date();
const thursdayNumber = 4;

const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn, false);
    }
}

function isItThursdayYet() {
    // Is it Thursday yet?
    return today.getDay() === thursdayNumber;
}

/**
 * Returns how many milliseconds are from firstDate to the midnight of the passed in dayOfWeek.
 * @param firstDate
 * @param dayOfWeek
 * @returns {number}
 */
function millisUntilDayOfWeek(firstDate, dayOfWeek) {
    const daysUntilDayOfWeek = (dayOfWeek - firstDate.getDay() + 7) % 7 || 7;
    const nextDayOfWeek = new Date();

    // Set to midnight
    nextDayOfWeek.setHours(0, 0, 0, 0);
    // Move forward that many days
    nextDayOfWeek.setDate(firstDate.getDate() + daysUntilDayOfWeek);

    return nextDayOfWeek.getTime() - firstDate.getTime();
}

function setText(text) {
    answerElement.innerText = text;
}

docReady(() => {
    answerElement = document.getElementById("answer");

    if (isItThursdayYet()) {
        setText("Yes");
        return;
    }

    millisUntil = millisUntilDayOfWeek(today, thursdayNumber);

    const countDownIntervalId = setInterval(() => {
        if (isItThursdayYet()) {
            clearInterval(countDownIntervalId);
            setText("Yes");
        } else {
            setText("No");

            millisUntil = millisUntil - 1000;
        }
    }, 1000);
});
