pragma solidity ^0.4.2;

contract StorageUser {

    address Admin;

    mapping ( address => User ) Users;   // this allows to look up Users by their ethereum address
    address[] usersByAddress;  // this is like a whitepages of all users, by ethereum address

    struct User {
        string handle;
        bytes32 city;
        bytes32 state;
        bytes32 country;
    }

    modifier onlyAdmin() {
        require(msg.sender != Admin);
        // Do not forget the "_;"! It will be replaced by the actual function body when the modifier is used.
        _;
    }
    function StorageUser() payable {  // this is the CONSTRUCTOR (same name as contract) it gets called ONCE only when contract is first deployed
        Admin = msg.sender;  // just set the admin, so they can remove bad users
    }

    function registerNewUser(string handle, bytes32 city, bytes32 state, bytes32 country) returns (bool success) {
        address thisNewAddress = msg.sender;
        // don't overwrite existing entries, and make sure handle isn't null
        if(bytes(Users[msg.sender].handle).length == 0 && bytes(handle).length != 0){
            Users[thisNewAddress].handle = handle;
            Users[thisNewAddress].city = city;
            Users[thisNewAddress].state = state;
            Users[thisNewAddress].country = country;
            usersByAddress.push(thisNewAddress);  // adds an entry for this user to the user 'whitepages'
            return true;
        } else {
            return false; // either handle was null, or a user with this handle already existed
        }
    }

    function getUsers() constant returns (address[]) { return usersByAddress; }

    function removeUser(address badUser) onlyAdmin returns (bool success) {
        delete Users[badUser];
        return true;
    }

    function getUser(address userAddress) constant returns (string,bytes32,bytes32,bytes32) {
        return (Users[userAddress].handle, Users[userAddress].city, Users[userAddress].state, Users[userAddress].country);
    }

}
