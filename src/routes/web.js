import express from 'express';
import accountController from '../controllers/accountController';
import homeController from '../controllers/homeController';
import winGoController from '../controllers/winGoController';
import userController from '../controllers/userController';
import middlewareController from '../controllers/middlewareController';
import adminController from '../controllers/adminController';
import dailyController from '../controllers/dailyController';
import k5Controller from '../controllers/k5Controller';
import k3Controller from '../controllers/k3Controller';
import paymentController from '../controllers/paymentController';
import trxWingoController from "../controllers/trxWingoController.js";

let router = express.Router();

const initWebRouter = (app) => {
    // page account
    router.get('/keFuMenu', accountController.keFuMenu);
    router.get('/login', accountController.loginPage);
    router.get('/register', accountController.registerPage);
    router.get('/forgot', accountController.forgotPage);
    router.post('/api/sent/otp/verify', accountController.verifyCode);
    router.post('/api/sent/otp/verify/reset', accountController.verifyCodePass);
    router.post('/api/resetPasword', accountController.forGotPassword);

    // page home
    router.get('/', (req, res) => {
        return res.redirect('/home');
    });
    router.get('/home', homeController.homePage);

    router.get('/checkIn', homeController.checkInPage);
    router.get('/activity', homeController.activityPage);
    router.get('/dailytask', homeController.dailytaskPage);
    router.get('/invibonus', homeController.invibonusPage);
    router.get('/rebate', homeController.rebatePage);
    router.get('/jackpot', homeController.jackpotPage);
    router.get('/vip', homeController.vipPage);
    router.get('/checkDes', homeController.checkDes);
    router.get('/checkRecord', homeController.checkRecord);
    router.get('/wallet/transfer', homeController.transfer);

    router.get('/promotion', homeController.promotionPage);
    router.get('/promotion1', homeController.promotion1Page);
    router.get('/promotion/myTeam', homeController.promotionmyTeamPage);
    router.get('/promotion/promotionDes', homeController.promotionDesPage);
    router.get('/promotion/comhistory', homeController.comhistoryPage);
    router.get('/promotion/bethistory', homeController.mybethistoryPage);
    router.get('/promotion/tutorial', homeController.tutorialPage);
    router.get('/promotion/bonusrecord', homeController.bonusRecordPage);

    router.get('/wallet', homeController.walletPage);
    router.get('/wallet/recharge', homeController.rechargePage);
    router.get('/wallet/withdrawal', homeController.withdrawalPage);
    router.get('/wallet/rechargerecord', homeController.rechargerecordPage);
    router.get('/wallet/withdrawalrecord', homeController.withdrawalrecordPage);
    router.get('/wallet/addBank', homeController.addBank);
    router.get('/wallet/transactionhistory', homeController.transactionhistoryPage);
    

    router.get('/wallet/paynow/manual_upi', paymentController.initiateManualUPIPayment); 
    router.get('/wallet/paynow/manual_usdt', paymentController.initiateManualUSDTPayment);
    router.post('/wallet/paynow/manual_upi_request', paymentController.addManualUPIPaymentRequest);
    router.post('/wallet/paynow/manual_usdt_request', paymentController.addManualUSDTPaymentRequest);
    router.get('/wallet/paynow/pipay', paymentController.initiatePiPayment);
    router.post('/wallet/verify/pipay', paymentController.verifyPiPayment);
    router.get('/wallet/verify/pipay', paymentController.verifyPiPayment);
    router.post('/wallet/paynow/upi', paymentController.initiateUPIPayment);
    router.get('/wallet/verify/upi', paymentController.verifyUPIPayment);

    router.get('/mian', homeController.mianPage);
    router.get('/mian/Language', homeController.languegePage);
    router.get('/mian/avatar', homeController.avatarpage);
    router.patch(
      "/api/webapi/change/avatar",
      accountController.updateAvatarAPI,
    ); 

    router.get('/recordsalary', homeController.recordsalary);
    router.post('/getrecord', homeController.getSalaryRecord);
    router.get('/about', homeController.aboutPage);
    router.get('/notification', homeController.notificationPage);
	router.get('/wingochat', homeController.wingochat);
    router.get('/k3chat', homeController.k3chat);
    router.get('/d5chat', homeController.d5chat);
    router.get('/redenvelopes', homeController.redenvelopes);
    router.get('/mian/forgot', homeController.forgot);
    router.get('/newtutorial', homeController.newtutorial);
    router.get('/about/privacyPolicy', homeController.privacyPolicy);
    router.get('/about/riskAgreement', homeController.riskAgreement);
    router.post('/api/betting/get_betting', homeController.d_get_betting);
    router.get('/myProfile', homeController.myProfilePage);



    // BET wingo
    router.get('/win', winGoController.winGoPage);
    router.get('/win/3', winGoController.winGoPage3);
    router.get('/win/5', winGoController.winGoPage5);
    router.get('/win/10', winGoController.winGoPage10);

    // BET K5D
    router.get('/5d', k5Controller.K5DPage);
    router.post('/api/webapi/action/5d/join', k5Controller.betK5D); // register
    router.post('/api/webapi/5d/GetNoaverageEmerdList_Statistics', k5Controller.Stat_listOrderOld);
    router.post('/api/webapi/5d/GetNoaverageEmerdList', k5Controller.listOrderOld); // register
    router.post('/api/webapi/5d/GetMyEmerdList', k5Controller.GetMyEmerdList); // register

    // BET K3
    router.get('/k3', k3Controller.K3Page);

    router.post('/api/webapi/action/k3/join', k3Controller.betK3); // register
    router.post('/api/webapi/k3/GetNoaverageEmerdList', k3Controller.listOrderOld); // register
    router.post('/api/webapi/k3/GetMyEmerdList', k3Controller.GetMyEmerdList); // register


    // login | register 
    router.post('/api/webapi/login', accountController.login); // login
    router.post('/api/webapi/pilogin', accountController.pi_login); // login
    router.post('/api/webapi/register', accountController.register); // register
    router.post('/api/webapi/pi_register', accountController.pi_register_con);
    router.get('/aviator', userController.aviator);
    router.post('/api/webapi/getnotificationCount', userController.getnotificationCount);
    router.post('/api/webapi/updatenotifications', userController.updatenotifications);
    router.post('/api/webapi/getnotifications', userController.getnotifications);
    router.post('/api/webapi/GetUserInfo', userController.userInfo); // get info account
    router.put('/api/webapi/change/userInfo', userController.changeUser); // get info account
    router.put('/api/webapi/change/pass', userController.changePassword); // get info account
    router.post('/api/webapi/getlangdata', userController.getlang_datacall);
    router.post('/api/webapi/getlang', userController.get_lang_data);
    router.post('/api/webapi/setlang', userController.set_lang_data);

    // bet wingo
    router.post('/api/webapi/action/join', winGoController.betWinGo); // register
    router.post('/api/webapi/GetNoaverageEmerdList_Statistics', winGoController.Stat_listOrderOld);
    router.post('/api/webapi/GetNoaverageEmerdList', winGoController.listOrderOld); // register
    router.post('/api/webapi/GetMyEmerdList', winGoController.GetMyEmerdList); // register


    // promotion
    router.post('/api/webapi/promotion', userController.promotion); // register
    router.post('/api/webapi/checkIn', userController.checkInHandling); // register
    router.post('/api/webapi/check/Info', userController.infoUserBank); // register
    router.post('/api/webapi/addBank', userController.addBank); // register
    router.post('/api/webapi/otp', userController.verifyCode); // register
    router.post('/api/webapi/use/redenvelope', userController.useRedenvelope); // register

    // wallet
    router.post('/api/webapi/recharge', userController.recharge);
    router.post('/api/webapi/cancel_recharge', userController.cancelRecharge); // register
    router.post('/wowpay/create', userController.wowpay);
    router.post('/api/webapi/confirm_recharge', userController.confirmRecharge);
    router.post('/api/webapi/myTeam', userController.listMyTeam); // register
    router.post('/api/webapi/recharge/list', userController.listRecharge); // register
    router.post('/api/webapi/withdraw/list', userController.listWithdraw); // register
    router.post('/api/webapi/recharge/check', userController.recharge2); // register
    router.post('/api/webapi/withdrawal', userController.withdrawal3); // register
    router.post('/api/webapi/callback_bank', userController.callback_bank); // register
    router.post('/api/webapi/recharge/update', userController.updateRecharge); // update recharge
    router.post('/api/webapi/transfer', userController.transfer); // register
    router.post('/api/webapi/transfer_history', userController.transferHistory); //
    router.post('/api/webapi/confirm_recharge_usdt', userController.confirmUSDTRecharge); //
    router.post('/api/webapi/confirm_recharge_usdt', userController.confirmUSDTRecharge); //

    router.post('/api/webapi/search', userController.search); // register


    // daily
    router.get('/manager/index', dailyController.middlewareDailyController, dailyController.dailyPage);
    router.get('/manager/listRecharge', dailyController.middlewareDailyController, dailyController.listRecharge);
    router.get('/manager/listWithdraw', dailyController.middlewareDailyController, dailyController.listWithdraw);
    router.get('/manager/members', dailyController.middlewareDailyController, dailyController.listMeber);
    router.get('/manager/profileMember', dailyController.middlewareDailyController, dailyController.profileMember);
    router.get('/manager/settings', dailyController.middlewareDailyController, dailyController.settingPage);
    router.get('/manager/gifts', dailyController.middlewareDailyController, dailyController.giftPage);
    router.get('/manager/support', dailyController.middlewareDailyController, dailyController.support);
    router.get('/manager/member/info/:phone', dailyController.middlewareDailyController, dailyController.pageInfo);

    router.post('/manager/member/info/:phone', dailyController.middlewareDailyController, dailyController.userInfo);
    router.post('/manager/member/listRecharge/:phone', dailyController.middlewareDailyController, dailyController.listRechargeMem);
    router.post('/manager/member/listWithdraw/:phone', dailyController.middlewareDailyController, dailyController.listWithdrawMem);
    router.post('/manager/member/redenvelope/:phone', dailyController.middlewareDailyController, dailyController.listRedenvelope);
    router.post('/manager/member/bet/:phone', dailyController.middlewareDailyController, dailyController.listBet);


    router.post('/manager/settings/list', dailyController.middlewareDailyController, dailyController.settings);
    router.post('/manager/createBonus', dailyController.middlewareDailyController, dailyController.createBonus);
    router.post('/manager/listRedenvelops', dailyController.middlewareDailyController, dailyController.listRedenvelops);

    router.post('/manager/listRecharge', dailyController.middlewareDailyController, dailyController.listRechargeP);
    router.post('/manager/listWithdraw', dailyController.middlewareDailyController, dailyController.listWithdrawP);

    router.post('/api/webapi/statistical', dailyController.middlewareDailyController, dailyController.statistical);
    router.post('/manager/infoCtv', dailyController.middlewareDailyController, dailyController.infoCtv); // get info account
    router.post('/manager/infoCtv/select', dailyController.middlewareDailyController, dailyController.infoCtv2); // get info account
    router.post('/api/webapi/manager/listMember', dailyController.middlewareDailyController, dailyController.listMember); // get info account

    router.post('/api/webapi/manager/buff', dailyController.middlewareDailyController, dailyController.buffMoney); // get info account


    // admin
    router.get('/admin/manager/index', adminController.middlewareAdminController, adminController.adminPage); // get info account
    router.get('/admin/manager/index/3', adminController.middlewareAdminController, adminController.adminPage3); // get info account
    router.get('/admin/manager/index/5', adminController.middlewareAdminController, adminController.adminPage5); // get info account
    router.get('/admin/manager/index/10', adminController.middlewareAdminController, adminController.adminPage10); // get info account

    router.get('/admin/manager/5d', adminController.middlewareAdminController, adminController.adminPage5d); // get info account
    router.get('/admin/manager/k3', adminController.middlewareAdminController, adminController.adminPageK3); // get info account


    router.get('/admin/manager/members', adminController.middlewareAdminController, adminController.membersPage); // get info account
    router.get('/admin/manager/adminChatPage', adminController.middlewareAdminController, adminController.adminChatPage);
    router.get('/admin/manager/k3chatPage', adminController.middlewareAdminController, adminController.k3chatPage);
    router.get('/admin/manager/d5chatPage', adminController.middlewareAdminController, adminController.d5chatPage);
     
    router.get('/admin/manager/createBonus', adminController.middlewareAdminController, adminController.giftPage); // get info account
    router.get('/admin/manager/ctv', adminController.middlewareAdminController, adminController.ctvPage); // get info account
    router.get('/admin/manager/ctv/profile/:phone', adminController.middlewareAdminController, adminController.ctvProfilePage); // get info account

    router.get('/admin/manager/settings', adminController.middlewareAdminController, adminController.settings); // get info account
    router.get('/admin/manager/listRedenvelops', adminController.middlewareAdminController, adminController.listRedenvelops); // get info account
    router.post('/admin/manager/infoCtv', adminController.middlewareAdminController, adminController.infoCtv); // get info account
    router.post('/admin/manager/infoCtv/select', adminController.middlewareAdminController, adminController.infoCtv2); // get info account
    router.post('/admin/manager/settings/bank', adminController.middlewareAdminController, adminController.settingBank); // get info account
    router.post('/admin/manager/settings/cskh', adminController.middlewareAdminController, adminController.settingCskh); // get info account
    router.post('/admin/manager/settings/buff', adminController.middlewareAdminController, adminController.settingbuff); // get info account
    router.post('/admin/manager/create/ctv', adminController.middlewareAdminController, adminController.register); // get info account
    router.post('/admin/manager/settings/get', adminController.middlewareAdminController, adminController.settingGet); // get info account
    router.post('/admin/manager/createBonus', adminController.middlewareAdminController, adminController.createBonus); // get info account

    router.post('/admin/member/listRecharge/:phone', adminController.middlewareAdminController, adminController.listRechargeMem);
    router.post('/admin/member/listWithdraw/:phone', adminController.middlewareAdminController, adminController.listWithdrawMem);
    router.post('/admin/member/redenvelope/:phone', adminController.middlewareAdminController, adminController.listRedenvelope);
    router.post('/admin/member/bet/:phone', adminController.middlewareAdminController, adminController.listBet);


    router.get('/admin/manager/recharge', adminController.middlewareAdminController, adminController.rechargePage); // get info account
    router.get('/admin/manager/withdraw', adminController.middlewareAdminController, adminController.withdraw); // get info account
    // router.get('/admin/manager/level', adminController.middlewareAdminController, adminController.level); // get info account
    router.get('/admin/manager/levelSetting', adminController.middlewareAdminController, adminController.levelSetting);
    router.get('/admin/manager/CreatedSalaryRecord', adminController.middlewareAdminController, adminController.CreatedSalaryRecord);
    router.get('/admin/manager/rechargeRecord', adminController.middlewareAdminController, adminController.rechargeRecord); // get info account
    router.get('/admin/manager/withdrawRecord', adminController.middlewareAdminController, adminController.withdrawRecord); // get info account
    router.get('/admin/manager/statistical', adminController.middlewareAdminController, adminController.statistical); // get info account
    router.get('/admin/member/info/:id', adminController.middlewareAdminController, adminController.infoMember);
    router.get('/api/webapi/admin/getLevelInfo', adminController.middlewareAdminController, adminController.getLevelInfo);
    router.get('/api/webapi/admin/getSalary', adminController.middlewareAdminController, adminController.getSalary);

    router.post('/api/webapi/admin/updateLevel', adminController.middlewareAdminController, adminController.updateLevel); // get info account
    router.post('/api/webapi/admin/CreatedSalary', adminController.middlewareAdminController, adminController.CreatedSalary); // get info account
    router.post('/api/webapi/admin/listMember', adminController.middlewareAdminController, adminController.listMember); // get info account
    router.post('/api/webapi/admin/listctv', adminController.middlewareAdminController, adminController.listCTV); // get info account
    router.post('/api/webapi/admin/withdraw', adminController.middlewareAdminController, adminController.handlWithdraw); // get info account
    router.post('/api/webapi/admin/recharge', adminController.middlewareAdminController, adminController.recharge); // get info account
    router.post('/api/webapi/admin/tranfermode', adminController.middlewareAdminController, adminController.tranfermode); // store transfer mode
    router.get('/api/webapi/admin/gettranfermode', adminController.middlewareAdminController, adminController.gettranfermode); // get transfer mode
    
    router.post('/api/webapi/admin/rechargeDuyet', adminController.middlewareAdminController, adminController.rechargeDuyet); // get info account
    router.post('/api/webapi/admin/member/info', adminController.middlewareAdminController, adminController.userInfo); // get info account
    router.post('/api/webapi/admin/statistical', adminController.middlewareAdminController, adminController.statistical2); // get info account

    router.post('/api/webapi/admin/banned', adminController.middlewareAdminController, adminController.banned); // get info account


    router.post('/api/webapi/admin/totalJoin', adminController.middlewareAdminController, adminController.totalJoin); // get info account
    router.post('/api/webapi/admin/change', adminController.middlewareAdminController, adminController.changeAdmin); // get info account
    router.post('/api/webapi/admin/profileUser', adminController.middlewareAdminController, adminController.profileUser); // get info account

    // admin 5d 
    router.post('/api/webapi/admin/5d/listOrders', adminController.middlewareAdminController, adminController.listOrderOld); // get info account
    router.post('/api/webapi/admin/k3/listOrders', adminController.middlewareAdminController, adminController.listOrderOldK3); // get info account
    router.post('/api/webapi/admin/5d/editResult', adminController.middlewareAdminController, adminController.editResult); // get info account
    router.post('/api/webapi/admin/k3/editResult', adminController.middlewareAdminController, adminController.editResult2); // get info account


    router.post('/api/webapi/xpgain_value', userController.xpgain_value);
    router.post('/api/webapi/check_login', userController.check_login_val);

    router.get(
        "/trx_wingo",
        trxWingoController.trxWingoPage,
      );
      // router.get("/trx_wingo/3", trxWingoController.trxWingoPage3)
      // router.get("/trx_wingo/5", trxWingoController.trxWingoPage3)
      // router.get("/trx_wingo/10", trxWingoController.trxWingoPage10)

      router.get(
        "/trx_block",
        trxWingoController.trxWingoBlockPage,
      );

        // bet TRX wingo
  router.post(
    "/api/webapi/trx_wingo/action/join",
    trxWingoController.betTrxWingo,
  ); // register
  router.post(
    "/api/webapi/trx_wingo/GetNoaverageEmerdList",
    
    trxWingoController.listOrderOld,
  ); // register
  router.post(
    "/api/webapi/trx_wingo/GetNoaverageEmerdList_Statistics",
   
    trxWingoController.Stat_listOrderOld,
  ); 
  router.post(
    "/api/webapi/trx_wingo/GetMyEmerdList",
    
    trxWingoController.GetMyEmerdList,
  ); // register

    return app.use('/', router);
}

module.exports = {
    initWebRouter,
};