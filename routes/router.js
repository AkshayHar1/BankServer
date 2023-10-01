const express=require('express');
const { register,login,getBalance,moneyTransfer,accountStatement, accountDelete} = require('../controllers/logic');
const { jwtMidlleware } = require('../middlewares/jwtMiddleware');

//router object
const router=new express.Router()


router.post("/bankuser/create_account",register)

router.post('/bankuser/login',login)

router.get('/bankuser/balance/:acno',jwtMidlleware,getBalance)

router.post('/bankuser/money-transfer',jwtMidlleware,moneyTransfer)

router.get('/bankuser/account-statement/:acno',jwtMidlleware,accountStatement)

router.delete('/bankuser/delete-account/:acno',jwtMidlleware,accountDelete)


module.exports=router;