let amtElement, yearElement, rateElement, monthlyElement;

window.addEventListener('DOMContentLoaded', function() {
  amtElement = document.querySelector('#loan-amount');
  yearElement = document.querySelector('#loan-years');
  rateElement = document.querySelector('#loan-rate');
  monthlyElement = document.querySelector('#monthly-payment');
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(amtElement.value),
    years: +(yearElement.value),
    rate: +(rateElement.value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  amtElement.value = "100000";
  yearElement.value = "10";
  rateElement.value = "0.05";
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const periodicRate = values.rate / 12;
  const numPayments = values.years * 12;
  const monthly = (values.amount * periodicRate)/(1-(1+periodicRate) ** (-numPayments));
  return monthly.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  monthlyElement.innerText = monthly;
}
