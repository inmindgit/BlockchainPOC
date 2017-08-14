var ProductStorage = artifacts.require("./ProductStorage.sol");

contract('ProductStorage', function(accounts) {
    it("...should store product", function() {
        var productStorageInstance;
        var name,
            price;
        return ProductStorage.deployed().then(function(instance) {
            productStorageInstance = instance;
            name = "apple";
            price = 250;

            return productStorageInstance.setProduct(name, price);
        }).then(function() {
            return productStorageInstance.getProduct(accounts[0]);
        }).then(function(storedData) {
            assert.equal(storedData[0], name, "The name is the same not stored.");
            assert.equal(storedData[1], price, "The price is the same not stored.");
        });
    });

    it("...should store product and update name", function() {
        var productStorageInstance;
        var name,
            price,
            newName;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstance = instance;
            name = "apple";
            price = 250;

            return productStorageInstance.setProduct(name, price);
        }).then(function() {
            newName = "banana";
            return productStorageInstance.updateName(accounts[0], newName);
        }).then(function() {
            return productStorageInstance.getProduct(accounts[0]);
        }).then(function(storedData) {
            assert.equal(storedData[0], newName, "The name is the same not stored.");
            assert.equal(storedData[1], price, "The price is the same not stored.");
        });
    });

    it("...should store product and update price", function() {
        var productStorageInstance;
        var name,
            price,
            newPrice;

        return ProductStorage.deployed().then(function(instance) {
            productStorageInstance = instance;
            name = "apple";
            price = 250;

            return productStorageInstance.setProduct(name, price);
        }).then(function() {
            newPrice = 200;
            return productStorageInstance.updatePrice(accounts[0], newPrice);
        }).then(function() {
            return productStorageInstance.getProduct(accounts[0]);
        }).then(function(storedData) {
            assert.equal(storedData[0], name, "The name is the same not stored.");
            assert.equal(storedData[1], newPrice, "The price is the same not stored.");
        });
    });
});
