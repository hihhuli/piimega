const DAYS_DISPLAYED = 0;
const MONTHS_DISPLAYED = 1;
const YEARS_DISPLAYED = 2;

const DAYS_IN_WEEK = 7;
const DAY_SLOTS_N = 37;
const YEAR_SLOTS_N = 12;

const BROWSE_LEFT = -1;
const BROWSE_RIGHT = 1;

const FIRST_MONTH = 0;
const LAST_MONTH = 11;
const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let displayed = DAYS_DISPLAYED;
let selectedDate = new Date();

function populateDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month);
    const lastDay = new Date(year, month + 1, 0);
    const calDaysStart = (firstDay.getDay() + DAYS_IN_WEEK - 1) % DAYS_IN_WEEK + 1;
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
    const firstYear = lastYear - YEAR_SLOTS_N + 1;
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
        if (parseInt(dayButton.value) === parseInt(day)) {
            dayButton.className = "date-selected";
        } else {
            dayButton.className = "date-unselected";
        }
    }
}

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

function setMonthTitle(month) {
    let monthTitle = document.getElementById("month-title");
    monthTitle.innerHTML = MONTH_NAMES[month];
}

function setYearTitles(year) {
    let yearTitle = document.getElementById("year-title");
    let yearSubtitle = document.getElementById("year-subtitle");
    yearTitle.innerHTML = year;
    yearSubtitle.innerHTML = year;
}

function switchToDayView() {
    showDays();
    hideElement("year-title");
    showElement("month-title", "");
    showElement("year-subtitle", "");
    displayed = DAYS_DISPLAYED;
}

function switchToMonthView() {
    showMonths();
    hideElement("month-title");
    hideElement("year-subtitle");
    showElement("year-title", "");
    displayed = MONTHS_DISPLAYED;
}

function switchToYearView() {
    populateYears(selectedDate);
    showYears();
    hideElement("month-title");
    hideElement("year-subtitle");
    hideElement("year-title");
    displayed = YEARS_DISPLAYED;
}

function selectYear(year) {
    selectedDate = new Date(year, 1);
    switchToMonthView();    
    setYearTitles(selectedDate.getFullYear());
}

function selectMonth(month) {
    selectedDate = new Date(selectedDate.getFullYear(), month);
    switchToDayView();
    populateDays(selectedDate);
    selectDay(selectedDate.getDate());
    setMonthTitle(selectedDate.getMonth());
    setYearTitles(selectedDate.getFullYear());
}

function browse(direction) {
    if (displayed === DAYS_DISPLAYED) {
        let month = selectedDate.getMonth();
        selectMonth(month + direction);
    } else if (displayed === MONTHS_DISPLAYED) {
        let year = selectedDate.getFullYear();
        selectYear(year + direction);
    } else {
        selectedDate = new Date(selectedDate.getFullYear() + YEAR_SLOTS_N * direction, 1);
        populateYears(selectedDate);
    }
}

function selectPrevious() {
    browse(BROWSE_LEFT);
}

function selectNext() {
    browse(BROWSE_RIGHT);
}

function initCalendar() {
    populateDays(selectedDate);
    selectDay(selectedDate.getDate().toString());
    setMonthTitle(selectedDate.getMonth());
    setYearTitles(selectedDate.getFullYear());
}
