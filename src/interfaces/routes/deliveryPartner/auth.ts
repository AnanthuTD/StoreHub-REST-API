import express from 'express';
import upload from '../../middleware/uploadMiddleware';
import DeliveryPartnerController from '../../controllers/deliveryPartner/auth/DeliveryPartnerController';
import VerifyOTPController from '../../controllers/deliveryPartner/auth/VerifyOTPController';
const partnerRouter = express.Router();

partnerRouter.post('/signup', upload.any(), DeliveryPartnerController.signup);

partnerRouter.post('/otp/verify', VerifyOTPController.handle);

partnerRouter.get('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.send();
});

export default partnerRouter;
