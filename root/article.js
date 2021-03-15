const express = require("express");
const con = require("../db_connection.js");
const app = express();

app.use(express.json());






var addArticle = function(article, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "INSERT INTO article(IdArticle,name,color,quantity,price,dispo,imgArticle,idUser) VALUES('ArticleId','ArticleName','ArticleColor','ArticleQuantity','ArticlePrice','ArticleDispo','ArticleImg','ArticleUser')";
  
      sql = sql.replace("ArticleId", article.IdArticle);
      sql = sql.replace("ArticleName", article.name);
      sql = sql.replace("ArticleColor", article.color);
      sql = sql.replace("ArticleQuantity", article.quantity);
      sql = sql.replace("ArticlePrice", article.price);
      sql = sql.replace("ArticleDispo", article.dispo);
      sql = sql.replace("ArticleImg", article.imgArticle);
      sql = sql.replace("ArticleUser", article.idUser);
    
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          articleInformations: "Article added",
          article: result.insertId
        });
      });
    });
  };


  var getArticles = function(response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT * FROM article ";
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          articleInformations: "Articles retrieved",
          articles: result
        });
      });
    });
  };

  var getUserArticle = function(user, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT * FROM article  WHERE idUser=" +
        user;
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          articleInformations: "User articles retrieved",
          articles: result
        });
      });
    });
  };


  var getArticleByID = function(idArticle, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT color,dispo FROM article  WHERE IdArticle=" +
        idArticle;
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          articleInformations: "article retrieved",
          article: result
        });
      });
    });
  };


  var getArticleByID2 = function(idArticle, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT * FROM article  WHERE IdArticle=" +
        idArticle;
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          articleInformations: "article retrieved",
          article: result
        });
      });
    });
  };


  var DeleteArticle = function(idArticle,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "DELETE FROM article WHERE IdArticle="+idArticle;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          wishlistInformations: "Article removed",
        });
      });
    });
  };



  var UpdateArticle = function(idArticle,name,color,quantity,price,dispo,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "UPDATE article set name='Name', color='Color', quantity='Quantity', price='Price', dispo='Dispo' WHERE IdArticle="+idArticle;
        sql = sql.replace("Name",name);
        sql = sql.replace("Color",color);
        sql = sql.replace("Quantity",quantity);
        sql = sql.replace("Price",price);
        sql = sql.replace("Dispo",dispo);  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          ArticleInformations: "article updated with success",
        });
      });
    });
  };















  module.exports.addArticle=addArticle;
  module.exports.getArticles=getArticles;
  module.exports.getUserArticle=getUserArticle;
  module.exports.getArticleByID=getArticleByID;
  module.exports.getArticleByID2=getArticleByID2;
  module.exports.DeleteArticle=DeleteArticle;
  module.exports.UpdateArticle=UpdateArticle;
