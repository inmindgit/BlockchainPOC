var StorageUser = artifacts.require("./StorageUser.sol");

contract('StorageUser', function(accounts) {

    it("firts save user", function() {
        var storageUserInstance;

        return StorageUser.deployed().then(function(instance) {
            storageUserInstance = instance;
            return storageUserInstance.registerNewUser("dasdas", "MVD", "MVD",  "UY");
        }).then(function() {
            return storageUserInstance.getUsers.call();
        }).then(function(storedData) {
            assert.equal(storedData, accounts[0], "have 1 user");
        });
    });

    it("check user", function() {
        var storageUserInstance;

        return StorageUser.deployed().then(function(instance) {
            storageUserInstance = instance;
            return storageUserInstance.registerNewUser("dasdas", "MVD", "MVD",  "UY");
        }).then(function() {
            return storageUserInstance.getUser.call(accounts[0]);
        }).then(function(storedData) {
            assert.equal(storedData.length, 4, "have 1 user with 4 properties");
        });
    });

    // it("remove user", function() {
    //     var storageUserInstance;
    //
    //     return StorageUser.deployed().then(function(instance) {
    //         storageUserInstance = instance;
    //         return storageUserInstance.removeUser(accounts[0]);
    //     }).then(function(storedData) {
    //         console.log(storedData);
    //         //assert.equal(storedData.length, 0, "have 0 user");
    //     });
    // });


});
