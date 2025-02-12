const warningSettings ={
  temperature:true,
  soc:true,
  chargeRate:true
}
function isOutOfRange(value, min, max, message) {
  if (value < min || value > max) {
    console.log(message);
    return true;
  }

  return false;
}

function checkingWarnings(value,min,max,tolerance,lowLimMsg,upLimMsg,isEnabled)
{
 if(isEnabled &&((value>=min && value<=min+tolerance)
  ||(value>=max-tolerance && value<=max)))
 {
  console.log(value <= min + tolerance ? lowLimMsg : upLimMsg);
 }

}

function batteryIsOk(temperature, soc, chargeRate) {
  const tempTolerance=2;
  const socTolerance=4;
  const chargeRateTolerance=0.04;

  checkingWarnings(temperature,0,45,tempTolerance,
    'Warning: Approaching lower temperature limit',
    'Warning: Approaching upper temperature limit',
    warningSettings.temperature)

  checkingWarnings(soc,20,80,socTolerance,
    'Warning: Approaching discharge',
    'Warning: Approaching charge-peak',
    warningSettings.soc)

  checkingWarnings(chargeRate,0,0.8,chargeRateTolerance,
    'Warning: Approaching lower chargeRate limit',
    'Warning: Approaching upper chargeRate limit',
    warningSettings.chargeRate)
  
  return !(
    isOutOfRange(temperature, 0, 45, 'Temperature is out of range!') ||
    isOutOfRange(soc, 20, 80, 'State of Charge is out of range!') ||
    isOutOfRange(chargeRate, 0, 0.8, 'Charge rate is out of range!')
  );
}


module.exports = {
  batteryIsOk,
  checkingWarnings,
  warningSettings
};
