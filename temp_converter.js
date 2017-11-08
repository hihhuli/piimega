function celsiusToKelvin(temp) {
  return temp + 237.15;
}

function kelvinToCelsius(temp) {
  return temp - 237.15;
}

function celsiusToFahrenheit(temp) {
  return temp * 1.8 + 32;
}

function fahrenheitToCelsius(temp) {
  return (temp - 32) / 1.8;
}

function setInputValue(inputId, val) {
  document.getElementById(inputId).value = val;
}

function updateTempsUsingCelsius(tempStr) {
  const temp = parseFloat(tempStr);
  setInputValue("kelvin", celsiusToKelvin(temp));
  setInputValue("fahrenheit", celsiusToFahrenheit(temp));
}

function updateTempsUsingFahrenheit(tempStr) {
  const celsius = fahrenheitToCelsius(parseFloat(tempStr));
  setInputValue("celsius", celsius);
  setInputValue("kelvin", celsiusToKelvin(celsius));
}

function updateTempsUsingKelvin(tempStr) {
  const celsius = kelvinToCelsius(parseFloat(tempStr));
  setInputValue("celsius", celsius);
  setInputValue("fahrenheit", celsiusToFahrenheit(temp));
}
