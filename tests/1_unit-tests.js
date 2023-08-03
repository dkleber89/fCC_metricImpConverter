const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler', function(){
    test('should correctly read a whole number input.', function() {
      assert.equal(convertHandler.getNum('123'), 123);
      assert.equal(convertHandler.getNum('123unit'), 123);
    });

    test('should correctly read a decimal number input.', function() {
      assert.equal(convertHandler.getNum('123.45'), 123.45);
      assert.equal(convertHandler.getNum('123,45'), 123.45);
      assert.equal(convertHandler.getNum('123.45unit'), 123.45);
      assert.equal(convertHandler.getNum('123,45unit'), 123.45);
    });

    test('should correctly read a fractional input.', function() {
      assert.equal(convertHandler.getNum('1/2'), 0.5);
      assert.equal(convertHandler.getNum('1/2unit'), 0.5);
    });

    test('should correctly read a fractional input with a decimal.', function() {
      assert.approximately(convertHandler.getNum('1/2.3'), 0.43478, 0.00001);
      assert.approximately(convertHandler.getNum('1/2,3'), 0.43478, 0.00001);
      assert.approximately(convertHandler.getNum('1.2/3'), 0.40000, 0.00001);
      assert.approximately(convertHandler.getNum('1,2/3'), 0.40000, 0.00001);
      assert.approximately(convertHandler.getNum('1.2/3.4'), 0.35294, 0.00001);
      assert.approximately(convertHandler.getNum('1,2/3,4'), 0.35294, 0.00001);
    });

    test('should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
      assert.equal(convertHandler.getNum('1/2/3'), "invalid number");
      assert.equal(convertHandler.getNum('1/2/3unit'), "invalid number");
    });

    test('should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
      assert.equal(convertHandler.getNum(''), 1);
      assert.equal(convertHandler.getNum('unit'), 1);
    });

    test('should correctly read each valid input unit.', function() {
      assert.equal(convertHandler.getUnit('gal'), 'gal');
      assert.equal(convertHandler.getUnit('gaL'), 'gal');
      assert.equal(convertHandler.getUnit('1gal'), 'gal');
      assert.equal(convertHandler.getUnit('1Gal'), 'gal');

      assert.equal(convertHandler.getUnit('l'), 'L');
      assert.equal(convertHandler.getUnit('L'), 'L');
      assert.equal(convertHandler.getUnit('1l'), 'L');
      assert.equal(convertHandler.getUnit('1L'), 'L');

      assert.equal(convertHandler.getUnit('lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('lbS'), 'lbs');
      assert.equal(convertHandler.getUnit('1lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('1Lbs'), 'lbs');

      assert.equal(convertHandler.getUnit('kg'), 'kg');
      assert.equal(convertHandler.getUnit('kG'), 'kg');
      assert.equal(convertHandler.getUnit('1kg'), 'kg');
      assert.equal(convertHandler.getUnit('1Kg'), 'kg');

      assert.equal(convertHandler.getUnit('mi'), 'mi');
      assert.equal(convertHandler.getUnit('mI'), 'mi');
      assert.equal(convertHandler.getUnit('1mi'), 'mi');
      assert.equal(convertHandler.getUnit('1Mi'), 'mi');

      assert.equal(convertHandler.getUnit('km'), 'km');
      assert.equal(convertHandler.getUnit('kM'), 'km');
      assert.equal(convertHandler.getUnit('1km'), 'km');
      assert.equal(convertHandler.getUnit('1Km'), 'km');
    });

    test('should correctly return an error for an invalid input unit.', function() {
      assert.equal(convertHandler.getUnit(''), "invalid unit");
      assert.equal(convertHandler.getUnit('unit'), "invalid unit");
    });

    test('should return the correct return unit for each valid input unit.', function() {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    test('should correctly return the spelled-out string unit for each valid input unit.', function() {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    });
    
    test('should correctly convert gal to L.', function() {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
      assert.equal(convertHandler.convert(1.2, 'gal'), 4.54249);

      assert.equal(convertHandler.getString(1, 'gal', convertHandler.convert(1, 'gal'), 'L'), '1 gallons converts to 3.78541 liters')
    });

    test('should correctly convert L to gal.', function() {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417);
      assert.equal(convertHandler.convert(1.2, 'L'), 0.31701);

      assert.equal(convertHandler.getString(1, 'L', convertHandler.convert(1, 'L'), 'gal'), '1 liters converts to 0.26417 gallons')
    });

    test('should correctly convert mi to km.', function() {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
      assert.equal(convertHandler.convert(1.2, 'mi'), 1.93121);

      assert.equal(convertHandler.getString(1, 'mi', convertHandler.convert(1, 'mi'), 'km'), '1 miles converts to 1.60934 kilometers')
    });

    test('should correctly convert km to mi', function() {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137);
      assert.equal(convertHandler.convert(1.2, 'km'), 0.74565);

      assert.equal(convertHandler.getString(1, 'km', convertHandler.convert(1, 'km'), 'mi'), '1 kilometers converts to 0.62137 miles')
    });

    test('should correctly convert lbs to kg.', function() {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
      assert.equal(convertHandler.convert(1.2, 'lbs'), 0.54431);

      assert.equal(convertHandler.getString(1, 'lbs', convertHandler.convert(1, 'lbs'), 'kg'), '1 pounds converts to 0.45359 kilograms')
    });

    test('should correctly convert kg to lbs.', function() {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
      assert.equal(convertHandler.convert(1.2, 'kg'), 2.64555);

      assert.equal(convertHandler.getString(1, 'kg', convertHandler.convert(1, 'kg'), 'lbs'), '1 kilograms converts to 2.20462 pounds')
    });
  });
});