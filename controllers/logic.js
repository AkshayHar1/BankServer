const users = require("../models/userModel");
const jwt = require('jsonwebtoken');

//account creation logic
register = (req, res) => {
  //destructuring
  const { acno, psw, uname } = req.body;
  console.log(req.body);
  users.findOne({ acno }).then((user) => {
    if (user) {
      //insted of res.send we used res.json because to convert js response to json format and send respond
      res.status(400).json({
        message: "user already exist",
        status: false,
        statusCode: 400,
      });
    } else {
      let newUser = new users({
        acno,
        psw,
        uname,
        balance: 0,
        transcation: [],
      });
      newUser.save();
      res.status(201).json({
        message: "account created successfully",
        status: true,
        statusCode: 201,
      });
    }
  });
};

login = (req, res) => {
  const { acno, psw } = req.body;
  users.findOne({ acno, psw }).then((user) => {
    if (user) {
      //token generation
      const token=jwt.sign({acno},'secretkey123')

      res.status(200).json({
        message: "login success",
        status: true,
        statuscode: 200,
        currentUser: user.uname,
        token
      });
    } else {
      res.status(404).json({
        message: "Incorrect account number or passward",
        status: false,
        statuscode: 404,
      });
    }
  });
};

getBalance = (req, res) => {
  //access acno from request parm
  const { acno } = req.params;
  users.findOne({ acno }).then((user) => {
    if (user) {
      res.status(200).json({
        message: user.balance,
        status: true,
        statuscode: 200,
      });
    } else {
      res.status(404).json({
        message: "user not found",
        status: false,
        statuscode: 404,
      });
    }
  });
};

moneyTransfer = (req, res) => {
  const { sAcno, rAcno, amount, spsw, date } = req.body;
  var amnt = parseInt(amount);
  users.findOne({ acno: sAcno, psw: spsw }).then((suser) => {
    if (suser) {
      users.findOne({ acno: rAcno }).then((ruser) => {
        if (ruser) {
          //check balance of sender and receiver is greater than amount to be transferred
          if (amnt <= suser.balance) {
            //update sender object
            suser.balance = suser.balance - amnt;
            suser.transcations.push({
              tacno: rAcno,
              amount: amnt,
              type: "DEBIT",
              date,
            });
            suser.save();

            //update reciver object
            ruser.balance += amnt;
            ruser.transcations.push({
              tacno: sAcno,
              amount: amnt,
              type: "CREDIT",
              date,
            });
            ruser.save();

            res.status(200).json({
              message: "transaction success!!",
              status: true,
              statuscode: 200,
            });
          } else {
            res.status(406).json({
              message: "insufficient balance",
              status: false,
              statuscode: 406,
            });
          }
        } else {
          res.status(404).json({
            message: "Invalid credit credentials",
            status: false,
            statuscode: 404,
          });
        }
      });
    } else {
      res.status(404).json({
        message: "Invalid debit credentials",
        status: false,
        statuscode: 404,
      });
    }
  });
};

accountStatement = (req, res) => {
  const { acno } = req.params;
  users.findOne({ acno }).then((user) => {
    if (user) {
      res.status(200).json({
        message: user.transcations,
        status: true,
        statuscode: 200,
      });
    } else {
      res.status(404).json({
        message: "user not found",
        status: false,
        statuscode: 404,
      });
    }
  });
};

accountDelete = (req, res) => {
  const { acno } = req.params;
  users.deleteOne({ acno }).then(
    (data => {
      if(data) {
        res.status(200).json({
          message: "Account deleted successfully",
          status: true,
          statuscode: 200,
        });
      }
    })
  );
};

module.exports = {
  register,
  login,
  getBalance,
  moneyTransfer,
  accountStatement,
  accountDelete
};
