const express = require("express");
const con = require("../db_connection.js");
const crypto = require("crypto");
const app = express();

const multer = require("multer");


 /* var uploadUserImg = function(filename, userId, res) {
    res.redirect("./uploads/users/" + filename);
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      con.query("UPDATE user SET img=? where cin=?", [filename, userId], function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
    });
  
    return res.status(200).end();
  };  */


  var uploadUserImg = function(filename, userId, res) {
    res.redirect("./uploads/users/" + filename);
    console.log(filename);
    con.getConnection(function(err, connection) {
      if (err) throw err;
      let sql ="UPDATE user SET img='fileName' where cin="+userId;
      sql = sql.replace("fileName", filename);
      connection.query(sql,function(err,results,fields){
          if(err) throw err;
          res.end(JSON.stringify(results));
          console.log(res.end(JSON.stringify(results)));
      });
     
    });
  
    return res.status(200).end();
  };


  var uploadArticleImg = function(filename, articletId, res) {
    res.redirect("./uploads/articles/" + filename);
    con.getConnection(function(err, connection) {
      if (err) throw err;
      let sql = "UPDATE article SET imgArticle='filename' WHERE IdArticle="+ articletId;
      sql = sql.replace("filename",filename);
      connection.query(sql,function(err,results,fields){
        if(err) throw err;
        res.end(JSON.stringify(results));
        console.log(res.end(JSON.stringify(results)));
    });

    
    });
  
    return res.status(200).end();
  };
  


 




  module.exports.uploadUserImg = uploadUserImg;
  module.exports.uploadArticleImg=uploadArticleImg;
