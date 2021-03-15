const express = require("express");
const con = require("../db_connection.js");
const { addArticle } = require("./article.js");
const app = express();

app.use(express.json());


var addToPanier = function(panier, response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "INSERT INTO panier(idClient,ArticleName,price,quantity,imageArticle,idarticle) VALUES('idUser','name','Price','Quantity','img','IdArticle')";
  
      sql = sql.replace("idUser", panier.idClient);
      sql = sql.replace("name", panier.ArticleName);
      sql = sql.replace("Price", panier.price);
      sql = sql.replace("Quantity", panier.quantity);
      sql = sql.replace("img", panier.imageArticle);
      sql = sql.replace("IdArticle", panier.idarticle);
    
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          panierInformations: "Article added to wishlist",
          panier: result.insertId
        });
      });
    });
  };


  var getWishlist = function(idClient,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT * FROM panier WHERE idClient="+idClient;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          wishlistInformations: "Wishlist retrieved",
          wishlist: result
        });
      });
    });
  };

  var getTotalwhishList = function(idClient,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT SUM(price*quantity) AS 'Total' FROM panier WHERE idClient="+idClient;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          TotalwishlistInformations: "Total Wishlist retrieved",
          Total: result
        });
      });
    });
  };


  var DeleteWishList = function(idArticle,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "DELETE FROM panier WHERE idarticle="+idArticle;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          wishlistInformations: "Article removed from wishlist",
        });
      });
    });
  };



  var UpdateWishList = function(idArticle,Quantity,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "UPDATE panier set quantity='updatedQuantity' WHERE idarticle="+idArticle;
        sql = sql.replace("updatedQuantity",Quantity);
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          wishlistInformations: "Wishlist article updated with success",
        });
      });
    });
  };


  var getTrends = function(response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT p.idarticle ,a.name, a.imgArticle, u.firstName ,u.img FROM panier as p INNER JOIN article as a on a.IdArticle = p.idarticle  INNER JOIN user as u on u.cin=a.idUser GROUP BY p.idarticle ORDER By p.quantity AND p.idarticle LIMIT 5";
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          TrendsInformations: "articles trends retrieved",
          Trends: result
        });
      });
    });
  };



  var getNotifWishlist = function(idStore,idClient,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT p.idPanier,p.idClient,p.ArticleName,p.price,p.quantity,p.imageArticle,p.idarticle FROM panier AS p INNER JOIN article AS a ON a.IdArticle = p.idarticle INNER JOIN user as u ON u.cin = a.idUser INNER JOIN user as c ON c.cin = p.idClient WHERE u.cin=" + idStore + " AND c.cin ="+idClient;
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          wishlistInformations: "Wishlist retrieved",
          wishlist: result
        });
      });
    });
  };


  var getTotalSinglewhishList = function(idStore,idClient,response) {
    con.getConnection(function(err, connection) {
      if (err) throw err;
  
      let sql =
        "SELECT DISTINCT  SUM(p.price*p.quantity) AS 'Total' FROM panier AS p INNER JOIN article AS a ON a.IdArticle = p.idarticle INNER JOIN user as u ON u.cin = a.idUser INNER JOIN user as c ON c.cin = p.idClient WHERE (u.cin="+idStore +" AND u.role=0 ) AND (c.cin ="+idClient+" AND c.role=1)";
  
      connection.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        response.json({
          TotalwishlistInformations: "Total Wishlist retrieved",
          Total: result
        });
      });
    });
  };















  module.exports.addToPanier = addToPanier;
  module.exports.getWishlist = getWishlist;
  module.exports.getTotalwhishList=getTotalwhishList;
  module.exports.DeleteWishList=DeleteWishList;
  module.exports.UpdateWishList=UpdateWishList;
  module.exports.getTrends=getTrends;
  module.exports.getNotifWishlist=getNotifWishlist;
  module.exports.getTotalSinglewhishList=getTotalSinglewhishList;

  