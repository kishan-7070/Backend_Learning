import {Router} from "express";
import {changeCurrentPassword, forgotPasswordRequest, getCurrentUser, login, logoutUser, registerUser, resendEmailVerification, resetForgotPassword, verfyEmail} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator, userLoginValidator, userForgotPasswordValidator, userResetForgotPasswordValidator, userChangeCurrentPasswordValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router();



router.route("/register").
    post(userRegisterValidator(),validate,registerUser);

router.route("/login").
    post(userLoginValidator(),validate,login);

router 
    .route("/verify-email/:verificationToken")
    .get(verfyEmail);

router 
    .route("/refresh-token")
    .post(refreshAccessToken);


router 
    .route("/forgot-password")
    .get(userForgotPasswordValidator(),validate,forgotPasswordRequest);

router 
    .route("/reset-password/:resetToken")
    .post(userResetForgotPasswordValidator(),validate,resetForgotPassword);

//secure routes

router.route("/logout").
    post(verifyJWT,logoutUser);

router 
    .route("/current-user")
    .post(verifyJWT,getCurrentUser);

router 
    .route("/change-password")
    .post(verifyJWT,userChangeCurrentPasswordValidator(),validate,changeCurrentPassword);

router 
    .route("/resend-email-verification")
    .post(verifyJWT,resendEmailVerification); 

export default router;
