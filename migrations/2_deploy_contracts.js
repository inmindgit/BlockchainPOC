var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var StorageUser = artifacts.require("./StorageUser.sol");
var ProductStorage = artifacts.require("./ProductStorage.sol");




module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(SimpleStorage);
  deployer.deploy(StorageUser);
  deployer.deploy(ProductStorage);
};
