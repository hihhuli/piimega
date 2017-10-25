const DAYS_DISPLAYED = 0;
const MONTHS_DISPLAYED = 1;
const YEARS_DISPLAYED = 2;
const DAY_SLOTS_N = 37;
const YEAR_SLOTS_N = 12;

let displayed = DAYS_DISPLAYED;
let selectedDate = new Date();

function showElement(elemId, visibleClass) {
    let elem = document.getElementById(elemId);
    elem.className = visibleClass;
}

function showDateSelectables(elemId) {
    showElement(elemId, "date-selectables");
}

function hideElement(elemId) {
    let elem = document.getElementById(elemId);
    elem.className = "display-none";
}

function showDays() {
    showElement("weekdays", "weekdays");
    showDateSelectables("days");
    hideElement("months");
    hideElement("years");
}

function hideDays() {
    hideElement("days");
    hideElement("weekdays");
}

function showMonths() {
    showDateSelectables("months");
    hideDays();
    hideElement("years");
}

function showYears() {
    showDateSelectables("years");
    hideDays();
    hideElement("months");
}

function populateDays(date) {
    const year = date.getYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month);
    const lastDay = new Date(year, month, 0);
    const calDaysStart = firstDay.getDay();
    const calDaysEnd = lastDay.getDate() + calDaysStart - 1;
    
    for (let i = 0; i < DAY_SLOTS_N; i++) {
        const dayIndex = i + 1;
        const day = dayIndex - calDaysStart + 1;
        const elemId = "day-button" + dayIndex;
        let dayButton = document.getElementById(elemId);
        
        if (dayIndex < calDaysStart || dayIndex > calDaysEnd) {
            dayButton.value = "";
            dayButton.innerHTML = "";
            dayButton.disabled = true;
        } else {
            dayButton.value = day;
            dayButton.innerHTML = day;
            dayButton.disabled = false;
        }
    }
}

function populateYears(date) {
    const lastYear = date.getFullYear();
    const firstYear = lastYear - YEAR_SLOTS_N;
    for (let i = 0; i < YEAR_SLOTS_N; i++) {
        const yearIndex = i + 1;
        const elemId = "year-button" + yearIndex;
        let yearButton = document.getElementById(elemId);
        yearButton.value = firstYear + i;
        yearButton.innerHTML = firstYear + i;
    }
}

function selectDay(day) {
    for (let i = 0; i < DAY_SLOTS_N; i++) {
        const dayIndex = i + 1;
        const elemId = "day-button" + dayIndex;
        let dayButton = document.getElementById(elemId);
        if (dayButton.value === day) {
            dayButton.className = "date-selected";
        } else {
            dayButton.className = "date-unselected";
        }
    }
}

function selectMonth(month) {
    showDays();
}

function selectYear(year) {
    showMonths();
}

function switchToMonthView() {
    showMonths();
}

function switchToYearView() {
    populateYears(selectedDate);
    showYears();
}

function initCalendar() {
    populateDays(selectedDate);
    selectDay(selectedDate.getDate().toString());
}
