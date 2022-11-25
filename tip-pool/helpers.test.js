describe("Helpers tests", function() {    
    it('should sum payment total properly', function() {
        allPayments['payment'+0] = {billAmt: '100', tipAmt: '15', tipPercent: 15};
        allPayments['payment'+1] = {billAmt: '200', tipAmt: '20', tipPercent: 10};
        allPayments['payment'+2] = {billAmt: '300', tipAmt: '50', tipPercent: 16.67};

        expect(sumPaymentTotal('billAmt')).toEqual(600);
        expect(sumPaymentTotal('tipAmt')).toEqual(85);
        expect(sumPaymentTotal('tipPercent')).toEqual(41.67);
    });
    
    it('should calculate tip percent properly', function() {
        let tipPercent = calculateTipPercent(100, 15);
        expect(tipPercent).toEqual(15);
    });

    it('should append TD to a TR correctly', function() {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'test');
        let tds = newTr.querySelectorAll('td');
        expect(tds.length).toEqual(1);
        expect(tds[0].innerText).toEqual('test');
    });

    it('should append a delete button', function() {
        serverNameInput.value = 'Alice';
        submitServerInfo();
        let servers = serverTbody.querySelectorAll('tr');
        let server1 = servers[0];
        expect(server1.querySelectorAll('td')[2].innerText).toEqual('X');
    });
  });
  