pragma solidity ^0.4.2;

contract ProductStorage {
    address Admin;
    mapping ( address => ProductStruct ) public Products;   // this allows to look up Users by their ethereum address

    struct ProductStruct {
        string name;
        uint price;
    }

    modifier onlyAdmin() {
        require(msg.sender != Admin);
        // Do not forget the "_;"! It will be replaced by the actual function body when the modifier is used.
        _;
    }
    function ProductStorage() payable {  // this is the CONSTRUCTOR (same name as contract) it gets called ONCE only when contract is first deployed
        Admin = msg.sender;  // just set the admin, so they can remove
    }

    function getProduct(address productAddress) constant returns (string,uint) {
        return (Products[productAddress].name, Products[productAddress].price);
    }

    function updateName(address productAddress, string name) returns (bool succes) {
        Products[productAddress].name = name;
        return true;
    }

    function updatePrice(address productAddress, uint price) returns (bool succes) {
        Products[productAddress].price = price;
        return true;
    }

    function removeProduct(address productAddress) onlyAdmin returns (bool success) {
        // No se puede eliminar un struct
        return true;
    }

    function setProduct(string name, uint price) returns (bool succes){
        address thisNewAddress = msg.sender;
        Products[thisNewAddress].name = name ;
        Products[thisNewAddress].price = price;

        return true;
    }
}