const warningSettings ={
  temperature: true,
  soc: true,
  chargeRate: true,
};

let language='en';

const messages={
  en:{
    tempLow:'Warning: Approaching lower temperature limit',
    tempHigh:'Warning: Approaching upper temperature limit',
    socLow:'Warning: Approaching discharge',
    socHigh: 'Warning: Approaching charge-peak',
    chargeRateLow:'Warning: Approaching lower chargeRate limit',
    chargerateHigh:'Warning: Approaching upper chargeRate limit',
    tempOut:'Temperature is out of range!',
    socOut:'State of Charge is out of range!',
    chargeRateOut:'Charge rate is out of range!'

  },

  ge:
  {
    tempLow:'Warnung: Untere Temperaturgrenze nähert sich',
    tempHigh:'Warnung: Die Temperaturobergrenze nähert sich',
    socLow:'Warnung: Entladung steht kurz bevor',
    socHigh:'Warnung: Ladespitze naht',
    chargeRateLow:'Warnung: Untere Laderatengrenze nähert sich',
    chargerateHigh:'Warnung: Die Obergrenze für die Laderate nähert sich',
    tempOut:'Die Temperatur liegt außerhalb des zulässigen Bereichs!',
    socOut:'Der Ladezustand liegt außerhalb des zulässigen Bereichs!',
    chargeRateOut:'Laderate liegt außerhalb des zulässigen Bereichs!'
  }
}

function isOutOfRange(value, min, max, messagekey) {
  if (value < min || value > max) {
    console.log(messages[language][messagekey]);
    return true;
  }

  return false;
}
function logWarning(value, limit, tolerance, messagekey) {
  if (value >= limit && value <= limit + tolerance) {
    console.log(messages[language][messagekey]);
  }
}

function checkingWarnings(value, min, max, tolerance, lowLimMsg, upLimMsg, isEnabled) {
  if (!isEnabled) return;

  logWarning(value, min, tolerance, lowLimMsg);
  logWarning(value, max - tolerance, tolerance, upLimMsg);
}

function batteryIsOk(temperature, soc, chargeRate) {
  const tempTolerance=2;
  const socTolerance=4;
  const chargeRateTolerance=0.04;

  checkingWarnings(temperature, 0, 45, tempTolerance,
      'tempLow',
      'temphigh',
      warningSettings.temperature);

  checkingWarnings(soc, 20, 80, socTolerance,
      'socLow',
      'socHigh',
      warningSettings.soc);

  checkingWarnings(chargeRate, 0, 0.8, chargeRateTolerance,
      'chargeRateLow',
      'chargeRateHigh',
      warningSettings.chargeRate);

  return !(
    isOutOfRange(temperature, 0, 45, 'tempOut') ||
    isOutOfRange(soc, 20, 80, 'socOut') ||
    isOutOfRange(chargeRate, 0, 0.8, 'chargerateOut')
  );
}


module.exports = {
  batteryIsOk,
  checkingWarnings,
  warningSettings,
};
