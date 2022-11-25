it('should calculate the monthly rate correctly', function () {
  let values = {amount: 100000, years: 10, rate: 0.05};
  expect(calculateMonthlyPayment(values)).toEqual('1060.66');
  values = {amount: 200000, years: 20, rate: 0.07};
  expect(calculateMonthlyPayment(values)).toEqual('1550.60');
});


it("should return a result with 2 decimal places", function() {
  let values = {amount: 100000, years: 10, rate: 0.05};
  expect(calculateMonthlyPayment(values).toString()).toMatch(/^\d+\.\d\d$/);
});