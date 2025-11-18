let checkThursdayIntervalId;
let answerElement;
let diffMillis;
const today = new Date();
const thursdayNumber = 4;

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function checkIfThursdayInterval(intervalInMinutes = 1) {
    console.log("Checking again in " + intervalInMinutes + " minute(s).");
    const timeoutInMilli = intervalInMinutes * 1000 * 60;
    checkThursdayIntervalId = setInterval(checkIfThursday, timeoutInMilli);
}

function checkIfThursday() {
    console.log("Checking if Thursday");

    // Is it Thursday yet?
    return today.getDay() === thursdayNumber;
}

/**
 * Returns how many milliseconds are from firstDate to the midnight of the passed in dayOfWeek.
 * @param firstDate
 * @param dayOfWeek
 * @returns {number}
 */
function timeUntilDayOfWeek(firstDate, dayOfWeek) {
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
    const isItThursdayYet = checkIfThursday();

    if (isItThursdayYet) {
        clearInterval(checkThursdayIntervalId);
        setText("Yes");

        return;
    }

    diffMillis = timeUntilDayOfWeek(today, thursdayNumber);
    const checkInMinutes = diffMillis / 1000;

    checkIfThursdayInterval(checkInMinutes);

    const countDownIntervalId = setInterval(() => {
        const days = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMillis / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMillis / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMillis / 1000) % 60);

        let daysText;
        if (days === 1) {
            daysText = days + " day, ";
        } else {
            daysText = days + " days, ";
        }

        let hoursText;
        if (hours === 1) {
            hoursText = hours + " hour, ";
        } else {
            hoursText = hours + " hours, ";
        }

        let minutesText;
        if (minutes === 1) {
            minutesText = minutes + " minute, and ";
        } else {
            minutesText = minutes + " minutes, and ";
        }

        let secondsText;
        if (seconds === 1) {
            secondsText = seconds + " second ";
        } else {
            secondsText = seconds + " seconds ";
        }

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            clearInterval(countDownIntervalId);
            setText("Yes");
        } else {
            setText(daysText + hoursText + minutesText + secondsText + " until Thursday");
        }

        diffMillis = diffMillis - 1000;
    }, 1000);
});
