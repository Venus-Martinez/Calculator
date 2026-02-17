/* Division By Zero Calculator App - JavaScript Logic
* Author: Venus Martinez
* Date: February 16, 2026
* This script implements the core functionality of the Division By Zero Calculator App,
* including handling user input, performing calculations, and managing the safe division mode.
* It ensures that users can perform basic arithmetic operations while providing a unique
* approach to division by zero when safe mode is enabled.
*/

let current = "0";
let stored = null;
let operator = null;
let safeDivisionEnabled = true;


function setDisplay(text, noteText = "") {
    document.getElementById("display").textContent = text;
    document.getElementById("note").textContent = noteText;
}

function allClear() {
    current = "0";
    stored = null;
    operator = null;
    setDisplay("0", "");
}

function press(char) {
    if (char === "." && current.includes(".")) return;

    if (current === "0" && char !== ".") current = char;
    else current += char;

    setDisplay(current, "");
}

function chooseOperator(nextOperator) {
    stored = Number(current);
    operator = nextOperator;
    current = "0";
    setDisplay(current, `Operator: ${operator}`);
}

/* Safe division helper that returns quotient and remainder */
function divideWithRemainder(dividend, divisor) {
    if (divisor === 0) {
        return { q: 0, r: dividend, safe: true };
    }

    const q = Math.trunc(dividend / divisor);
    const r = dividend - (q * divisor);
    return { q, r, safe: false };
}

function equals() {
    if (stored === null || operator === null) return;

    const a = stored;
    const b = Number(current);

    let result;

    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;

    if (operator === "/") {
        if (b !== 0) {
            result = a / b;
            current = String(result);
            stored = null;
            operator = null;
            setDisplay(current, "");
            return;
        }

        // b is 0 here
        if (safeDivisionEnabled) {
            const { q, r } = divideWithRemainder(a, b);
            stored = null;
            operator = null;
            current = "0";
            setDisplay(`q=${q}, r=${r}`, "Safe mode: divisor was 0, remainder preserved");
            return;
        }

        // Safe Division disabled: normal calculator behavior
        stored = null;
        operator = null;
        current = "0";
        setDisplay("Error", "Cannot divide by 0");
        return;
    }


    current = String(result);
    stored = null;
    operator = null;
    setDisplay(current, "");
}

function toggleSafeDivision(isEnabled) {
    safeDivisionEnabled = isEnabled;

    const status = document.getElementById("safeStatus");
    status.textContent = safeDivisionEnabled ? "Enabled" : "Disabled";

    if (safeDivisionEnabled) {
        status.textContent = "Enabled";
        status.classList.remove("status-disabled");
        status.classList.add("status-enabled");
    } else {
        status.textContent = "Disabled";
        status.classList.remove("status-enabled");
        status.classList.add("status-disabled");
    }

    // Optional: clear the “safe mode” note when turning off
    setDisplay(current, safeDivisionEnabled ? "" : "Go ahead, create an error");
}
