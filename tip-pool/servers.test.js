describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');

    serverNameInput.value = 'Bob';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(2);
    expect(allServers['server' + serverId].serverName).toEqual('Bob');
  });

  it('should not add a server if server name is blank', function() {
    serverNameInput.value = '';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should create a row for each server', function() {
    submitServerInfo();
    expect(serverTbody.querySelectorAll('tr').length).toEqual(1);
    serverNameInput.value = 'Bob';
    submitServerInfo();
    expect(serverTbody.querySelectorAll('tr').length).toEqual(2);
  });

  afterEach(function() {
    serverNameInput.value = '';
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
