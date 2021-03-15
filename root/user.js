const express = require("express");
const con = require("../db_connection.js");
const crypto = require("crypto");
const app = express();

var algorithm = "aes256";
var key = "password";
app.use(express.json());


 // Add User

 var addUser = function(user, response){
     con.getConnection(function(err, connection){
         if(err) throw err;

         let sql = "SELECT * FROM user WHERE cin='"+ user.cin + "'";
         connection.query(sql, function(err, result, fields){
             if(err) throw err;

             if(result.length > 0){
                 response.json({
                     userInformation :"this user cin exists"
                 });

             }else{
                 let sql = "SELECT * FROM user WHERE login='"+ user.login + "'";
                 connection.query(sql, function(err, result, fields){
                     if(err) throw err;

                     if(result.length > 0){
                         response.json({
                             userInformation: "this user exists"
                         });
                     }else{
                          
                        let encryptedPass = encryptPass(user.password);
                        let sql = "INSERT INTO user VALUES('userCin','userFirstName','userLastName','userLogin','userPassword','userImg',userRole,'uerBlueMac')";

                        sql= sql.replace("userCin",user.cin);
                        sql= sql.replace("userFirstName",user.firstName);
                        sql= sql.replace("userLastName",user.lastName);
                        sql= sql.replace("userLogin",user.login);
                        sql= sql.replace("userPassword",encryptedPass);
                        sql= sql.replace("userImg",user.img);
                        sql= sql.replace("userRole",user.role);
                        sql= sql.replace("uerBlueMac",user.bluetoothMac);

                        connection.query(sql, function(err,result, fields){
                            if(err) throw err;

                            response.json({
                                userInformation: "User added"
                            });
                        });

                     }
                 })
             }
         })
     })
 };


// Login User


var loginUser = function(userLogin, userPass, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql = "SELECT * FROM user WHERE login='" + userLogin + "'";
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        if (result.length == 0) {
          response.json({
            userInformations: "Wrong username"
          });
        } else {
          let pass = decryptPass(result[0].password + "");
  
          if (pass == userPass) {
            response.json({
              userInformations: "Connection success",
              user: result[0]
            });
          } else {
            response.json({
              userInformations: "Wrong credentials"
            });
          }
        }
  
        // return result;
      });
    });
  
    //return "{ no records found}";
  };


// User Details


var getUserDetails = function(user, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql = "SELECT * FROM user WHERE cin='" + user + "'";
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          userInformations: "User retrieved",
          user: result[0]
        });
  
        // return result;
      });
    });
  
    //return "{ no records found}";
  };


  var getStores = function(response){
      con.getConnection(function(err,connection){
          if(err) throw err;

          let sql = "SELECT * FROM user WHERE role= 0 ";
          connection.query(sql,function(err,result, fields){
              if(err) throw err;
              response.json({   
                  storeInformation:"Stores retrieved",
                  stores:result
              });

          });
      });
  };



  var getBluetoothStore = function(userID,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT u.bluetoothMac,u.firstName, u.cin FROM user AS u INNER JOIN article AS a ON a.idUser=u.cin INNER JOIN panier AS p on p.idarticle = a.IdArticle INNER JOIN user AS c on c.cin=p.idClient WHERE c.cin = "+userID;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          BluetoothInformations: "Stores bluetooth retrieved",
          Bluetooth: result
        });
      });
    });
  };
  





















 var encryptPass = function(userPass) {
    var cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(userPass, "utf8", "hex") + cipher.final("hex");
  
    return encrypted;
  };
  
  var decryptPass = function(userPass) {
    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted =
      decipher.update(userPass, "hex", "utf8") + decipher.final("utf8");
  
    return decrypted;
  };

  var UpdateStoreBT = function(cin,bluetoothMac,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "UPDATE user set bluetoothMac='updatedBTMac' WHERE cin="+cin;
        sql = sql.replace("updatedBTMac",bluetoothMac);
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          storeInformations: "User article updated with success",
        });
      });
    });
  };



  module.exports.addUser = addUser;
  module.exports.loginUser= loginUser;  
  module.exports.getUserDetails= getUserDetails;
  module.exports.getStores=getStores;
  module.exports.UpdateStoreBT=UpdateStoreBT;
  module.exports.getBluetoothStore=getBluetoothStore;
