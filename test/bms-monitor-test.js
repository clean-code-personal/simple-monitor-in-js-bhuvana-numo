const {expect} = require('chai');
const sinon = require('sinon');
const {batteryIsOk,warningSettings} = require('../bms-monitor');

describe('BMS monitor', ()=> {
let consoleSpy;

beforeEach(()=>{
consoleSpy=sinon.spy(console,'log');
});

afterEach(()=>{
consoleSpy.restore();
});


  it('reports ok when all parameters are in range', ()=> {
    expect(batteryIsOk(25, 70, 0.6)).to.be.true;
    expect(consoleSpy.called).to.be.false;
  });

  it('reports not ok when temperature is high and out of range', ()=> {
    expect(batteryIsOk(50, 85, 1)).to.be.false;
    expect(consoleSpy.calledWith('Temperature is out of range!')).to.be.true;
   
  });

  it('reports not ok when temperature is too low and out of range', () => {
    expect(batteryIsOk(-5, 70, 0.5)).to.be.false;
    expect(consoleSpy.calledWith('Temperature is out of range!')).to.be.true;
  
  });

  it('should warn but still be ok when temperature is near upper limit',()=>{
    expect(batteryIsOk(44,70,0.6)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching upper temperature limit')).to.be.true;
  });

  it('should warn but still be ok when temperature is near lower limit',()=>{
    expect(batteryIsOk(1,56,0.6)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching lower temperature limit')).to.be.true;
  });

  it('should warn but still be ok when soc is near upper limit',()=>{
    expect(batteryIsOk(8,79,0.6)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching charge-peak')).to.be.true;
  });

  it('should warn but still be ok when soc is near lower limit',()=>{
    expect(batteryIsOk(42,21,0.3)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching discharge')).to.be.true;
  });
  
  it('should warn but still be ok when chargerate is near upper limit',()=>{
    expect(batteryIsOk(8,79,0.8)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching charge-peak')).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching upper chargeRate limit')).to.be.true;
  });
  
  it('should warn but still be ok when chargerate is near lower limit',()=>{
    expect(batteryIsOk(42,21,0)).to.be.true;
    expect(consoleSpy.calledWith('Warning: Approaching lower chargeRate limit')).to.be.true;
  });

  
});
