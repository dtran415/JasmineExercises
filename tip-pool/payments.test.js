describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = '100';
      tipAmtInput.value = '15';
      serverNameInput.value = 'Alice';
      submitServerInfo();
      serverNameInput.value = 'Bob';
      submitServerInfo();
    });
    
    it('should create payment properly', function() {
        const payment = createCurPayment();
        expect(payment).toEqual({billAmt: '100',
            tipAmt: '15',
            tipPercent: 15});
    });
    
    it('it should properly append a payment to the payment table', function() {
      const payment = createCurPayment();
      appendPaymentTable(payment);
      expect(paymentTbody.querySelectorAll('tr').length).toEqual(1);
    });

    it('it should update summary with proper amounts', function() {
      allPayments['payment'+0] = {billAmt: '100', tipAmt: '15', tipPercent: 15};
      allPayments['payment'+1] = {billAmt: '200', tipAmt: '20', tipPercent: 10};
      allPayments['payment'+2] = {billAmt: '300', tipAmt: '50', tipPercent: 16.67};
      updateSummary();
      expect(summaryTds[0].innerHTML).toEqual('$600');
      expect(summaryTds[1].innerHTML).toEqual('$85');
      expect(summaryTds[2].innerHTML).toEqual('14%')
    });

    it('should append to payment table, update server table and update summary when submitPaymentInfo', function() {
      submitPaymentInfo();
      expect(paymentTbody.querySelectorAll('tr').length).toEqual(1);
      expect(summaryTds[0].innerHTML).toEqual('$100');
      expect(summaryTds[1].innerHTML).toEqual('$15');
      expect(summaryTds[2].innerHTML).toEqual('15%');
      let servers = serverTbody.querySelectorAll('tr');
      let server1 = servers[0];
      let server2 = servers[1];
      expect(server1.querySelectorAll('td')[1].innerText).toEqual('$7.50');
      expect(server2.querySelectorAll('td')[1].innerText).toEqual('$7.50');
      billAmtInput.value = '200';
      tipAmtInput.value = '20';
      submitPaymentInfo();
      // need to reselect because the servers are cleared and readded each time
      servers = serverTbody.querySelectorAll('tr');
      server1 = servers[0];
      server2 = servers[1];
      expect(server1.querySelectorAll('td')[1].innerText).toEqual('$17.50');
      expect(server2.querySelectorAll('td')[1].innerText).toEqual('$17.50');
    });

    it('it should not add a payment if bill amount or tip amount is blank', function() {
      billAmtInput.value = '';
      tipAmtInput.value = '15';
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(0);
      billAmtInput.value = '100';
      tipAmtInput.value = '';
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(0);
    });
  
    afterEach(function() {
      paymentTbody.innerHTML = '';
      serverTbody.innerHTML = '';
      billAmtInput.value = '';
      tipAmtInput.value = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML =  '';
      allPayments = {};
      paymentId = 0;
      allServers = {};
    });
  });
  