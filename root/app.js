var express = require('express');
var userModel = require("./user.js");
var imageModel = require("./image.js");
var articleModel = require("./article.js");
var panierModel = require("./panier.js");


var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const crypto = require("crypto");
var path = require("path");
const fs = require("fs");

const multer = require("multer");
var storage;

storageUser = multer.diskStorage({
  destination: "./uploads/users/",
  filename: function (req, file, cb) {
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(
        null,
        "" + raw.toString("hex") + path.extname(file.originalname)
      );
    });
  }
});

storageArticle = multer.diskStorage({
  destination: "./uploads/articles/",
  filename: function (req, file, cb) {
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(
        null,
        "" + raw.toString("hex") + path.extname(file.originalname)
      );
    });
  }
});


// Add User

app.post("/SignUp", function (request, response) {

  request.setTimeout(3600);

  let cin = request.body.cin;
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let login = request.body.login;
  let password = request.body.password;
  let img = request.body.img;
  let role = request.body.role;
  let bluetoothMac = request.body.bluetoothMac;

  let user = {
    cin: cin,
    firstName: firstName,
    lastName: lastName,
    login: login,
    password: password,
    img: img,
    role: role,
    bluetoothMac: bluetoothMac
  };

  userModel.addUser(user, response);
});

// Login User


app.post("/Login", function (request, response) {
  request.setTimeout(3600);
  let user = request.body.login;
  let pass = request.body.password;

  // let userInfo = userModel.testUser(user, response);
  userModel.loginUser(user, pass, response);
  /*
    response.json({
      userInformations: userInfo
    });
    */
});


// get User Details


app.post("/getuserdetails", function (request, response) {
  request.setTimeout(3600);

  let user = request.body.cin;

  userModel.getUserDetails(user, response);
});



app.post(
  "/uploadUserImg/:id",
  multer({
    storage: storageUser
  }).single("upload"),
  function (req, res) {
    req.setTimeout(3600);

    let filename = req.file.filename;
    let userId = req.params.id;
    imageModel.uploadUserImg(filename, userId, res);
  }
);


app.get("/uploads/users/:upload", function (req, res) {
  req.setTimeout(3600);

  file = req.params.upload;
  var img = fs.readFileSync(__dirname + "/../uploads/users/" + file);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});


app.post("/getStores", function (request, response) {
  request.setTimeout(3600);

  //let user = request.body.cin;

  userModel.getStores(response);
});


app.post("/addArticle", function (request, response) {
  request.setTimeout(3600);

  let IdArticle = request.body.IdArticle;
  let name = request.body.name;
  let color = request.body.color;
  let quantity = request.body.quantity;
  let price = request.body.price;
  let dispo = request.body.dispo;
  let imgArticle = request.body.imgArticle;
  let idUser = request.body.idUser;

  let article = {
    IdArticle: IdArticle,
    name: name,
    color: color,
    quantity: quantity,
    price: price,
    dispo: dispo,
    imgArticle: imgArticle,
    idUser: idUser,
  };

  // let userInfo = userModel.testUser(user, response);
  articleModel.addArticle(article, response);

  /*
    response.json({
      userInformations: userInfo
    });
    */
});

app.get("/getArticles", function (request, response) {
  request.setTimeout(3600);

  articleModel.getArticles(response);
});

app.post("/getuserArticles", function (request, response) {
  request.setTimeout(3600);

  let user = request.body.cin;

  articleModel.getUserArticle(user, response);
});



app.post(
  "/uploadArticleImg/:id",
  multer({
    storage: storageArticle
  }).single("upload"),
  function (req, res) {
    req.setTimeout(3600);

    let filename = req.file.filename;
    let articleId = req.params.id;
    imageModel.uploadArticleImg(filename, articleId, res);
  }
);

app.get("/uploads/articles/:upload", function (req, res) {
  req.setTimeout(3600);

  file = req.params.upload;
  var img = fs.readFileSync(__dirname + "/../uploads/articles/" + file);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});



app.post("/AddToPanier", function (request, response) {

  request.setTimeout(3600);

  let idClient = request.body.idClient;
  let ArticleName = request.body.ArticleName;
  let price = request.body.price;
  let quantity = request.body.quantity;
  let idArticle = request.body.idarticle;
  let imageArticle = request.body.imageArticle;

  let panier = {
    idClient: idClient,
    ArticleName: ArticleName,
    price: price,
    quantity: quantity,
    imageArticle: imageArticle,
    idarticle: idArticle

  };

  panierModel.addToPanier(panier, response);
});


app.post("/getUserWishlist", function (request, response) {
  request.setTimeout(3600);

  let idClient = request.body.idClient;

  panierModel.getWishlist(idClient, response);
});


app.post("/getUserTotalWishlist", function (request, response) {
  request.setTimeout(3600);

  let idClient = request.body.idClient;

  panierModel.getTotalwhishList(idClient, response);

});


app.post("/DeleteWishList", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.idarticle;

  panierModel.DeleteWishList(idArticle, response);

});

app.post("/UpdateWishList", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.idarticle;
  let Quantity = request.body.quantity;

  panierModel.UpdateWishList(idArticle, Quantity, response);

});

app.post("/getArticleByID", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.IdArticle;

  articleModel.getArticleByID(idArticle, response);
});



app.post("/getArticleByID2", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.IdArticle;

  articleModel.getArticleByID2(idArticle, response);
});


app.post("/UpdatArticle", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.idarticle;
  let name = request.body.name;
  let color = request.body.color;
  let quantity = request.body.quantity;
  let price = request.body.price;
  let dispo = request.body.dispo;
  articleModel.UpdateArticle(idArticle, name, color, quantity, price, dispo, response);

});


app.post("/DeleteArticle", function (request, response) {
  request.setTimeout(3600);

  let idArticle = request.body.idarticle;

  articleModel.DeleteArticle(idArticle, response);

});


app.post("/getTrends", function (request, response) {
  request.setTimeout(3600);

  panierModel.getTrends(response);
});

app.post("/UpdateStoreBT", function (request, response) {
  request.setTimeout(3600);

  let cin = request.body.cin;
  let bluetoothMac = request.body.bluetoothMac;

  userModel.UpdateStoreBT(cin, bluetoothMac, response);

});

app.post("/getStoreBluetooth", function (request, response) {
  request.setTimeout(3600);

  let userID = request.body.cin;

  userModel.getBluetoothStore(userID, response);
});


app.post("/getNotifWishlist", function (request, response) {
  request.setTimeout(3600);
  let idStore = request.body.cinStore;
  let idClient = request.body.cinClient;
  panierModel.getNotifWishlist(idStore, idClient, response);
});


app.post("/getTotalSinglewhishList", function (request, response) {
  request.setTimeout(3600);
  let idStore = request.body.cinStore;
  let idClient = request.body.cinClient;
  panierModel.getTotalSinglewhishList(idStore, idClient, response);

});



app.listen(3001);