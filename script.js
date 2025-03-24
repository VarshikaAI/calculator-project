let display = document.getElementById("display");

// Function to append values to the display
function appendValue(value) {
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = "";
}

// Function to delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Function to calculate the result
function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;

        // Save to history
        saveToHistory(expression + " = " + result);
    } catch {
        display.value = "Error";
    }
}

// Function to calculate square of a number
function square() {
    try {
        let num = parseFloat(display.value);
        display.value = num * num;
        saveToHistory(num + "² = " + display.value);
    } catch {
        display.value = "Error";
    }
}

// Function to save calculation history
function saveToHistory(entry) {
    let historyList = document.getElementById("historyList");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = entry;

    // Add the new item at the top
    historyList.prepend(listItem);

    // Limit history to last 5 calculations
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Function to toggle dark mode
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save user preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Load user preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }
});

// Add Keyboard Support
document.addEventListener("keydown", function (event) {
    if ("0123456789+-*/.%".includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});