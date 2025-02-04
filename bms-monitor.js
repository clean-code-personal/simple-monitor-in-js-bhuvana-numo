function isOutOfRange(value, min, max, message) {
  if (value < min || value > max) {
    console.log(message);
    return true;
  }
  return false;
}

function batteryIsOk(temperature, soc, chargeRate) {
  return !(
    isOutOfRange(temperature, 0, 45, 'Temperature is out of range!') ||
    isOutOfRange(soc, 20, 80, 'State of Charge is out of range!') ||
    isOutOfRange(chargeRate, 0, 0.8, 'Charge rate is out of range!')
  );
}


module.exports = {
  batteryIsOk,
};
