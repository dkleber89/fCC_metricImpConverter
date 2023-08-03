function ConvertHandler() {
  this.validUnitPairs = [['gal', 'L'], ['lbs', 'kg'], ['mi', 'km']];
  
  this.getNum = function(input) {
    let result;


    const beginningOfUnit = input.search(/[a-zA-Z]+/);     
    const inputNumber = beginningOfUnit >= 0 ? input.slice(0, beginningOfUnit) : input;
    
    if (inputNumber.includes('/')) {
      const numberElements = inputNumber.split('/');

      if (numberElements.length >= 3) {
        result = "invalid number";
      } else {
        const numbers = numberElements.map(numberElement => {
          if (numberElement.includes('.') || numberElement.includes(',')) {
            return parseFloat(numberElement.replace(',', '.'));
          }

          return parseInt(numberElement);
        });

        if (isNaN(numbers[0]) || isNaN(numbers[1])) {
          result = "invalid number";
        } else {
          result = numbers[0] / numbers[1];
        }
      }
    } else if (inputNumber.includes('.') || inputNumber.includes(',')) {
      result = parseFloat(inputNumber.replace(',', '.'));
    } else {
      const number = parseInt(inputNumber);

      if (isNaN(number)) {
        result = 1;
      } else {
        result = number;
      }
    }

    return result;
  };

  this.getUnit = function(input) {
    let result;

    const beginningOfUnit = input.search(/[a-zA-Z]+/);  

    const inputUnit = beginningOfUnit >= 0 ? input.slice(beginningOfUnit) : input;

    const unit = this.validUnitPairs.flat().find(validUnit => validUnit.toLowerCase() === inputUnit.toLowerCase());

    if (unit) {
      result = unit;
    } else {
      result = "invalid unit";
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    const unitPair = this.validUnitPairs.find(validUnitPair => validUnitPair[0] === initUnit || validUnitPair[1] === initUnit);
    if (unitPair[0] === initUnit) {
      result = unitPair[1];
    } else {
      result = unitPair[0]
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    const unitSpellOuts = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };

    result = unitSpellOuts[unit];
    
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    switch (initUnit) {
      case "gal":
        result = Math.round(initNum * galToL * 100000) / 100000;
        break;
      case "L":
        result = Math.round(initNum / galToL * 100000) / 100000;
        break;
      case "lbs":
        result = Math.round(initNum * lbsToKg * 100000) / 100000;
        break;
      case "kg":
        result = Math.round(initNum / lbsToKg * 100000) / 100000;
        break;
      case "mi":
        result = Math.round(initNum * miToKm * 100000) / 100000;
        break;
      case "km":
        result = Math.round(initNum / miToKm * 100000) / 100000;
        break;
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
