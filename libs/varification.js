import transporter from "../utils/mailTransporter";

export const sendOTPCreateAccout = (sender, email, code) => {
    const options = {
        from: sender,
        to: email,
        subject: `[CashBook] ${code} is your OTP to Create Account`,
        html: `<div style="
        box-sizing: border-box;
        background: #4863d4;
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
      ">
        <div style="
          background: #ffffff;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          border-radius: 5px;
        ">
            <div style="background: #f5f5f5; padding: 24px; border-radius: 5px 5px 0px 0px">
                <img
                    src="https://res.cloudinary.com/dwe1p24zb/image/upload/f_auto,q_auto/v1/cashbook/ixdggzto5jld6mlmx0cc" />
                <p style="font-size: 20px">
                    Create Account with One Time Password (OTP)
                </p>
            </div>
            <div style="padding: 24px">
                <p>
                    <span>Hi</span>
                    <span style="color : #4863d4">
                    ${email} ,
                    </span>
                </p>
                <p>Below is your verification code for the email address</p>
                <p>
                    <span style="color : #4863d4">
                        ${email} ,
                        </span>
                        <span> to create CashBook account. This OTP is valid for 10 mins.
                        </span>
                </p>
                <div
                    style="padding: 5px 0px;"
                >
                    <p
                        style="width: 100px; padding: 8px 4px; border: 1px solid #4863d4; text-align: center; font-size: 25px; border-style: dashed; border-radius: 5px;margin-left: auto;
                        margin-right: auto;"
                    >
                        ${code}
                    </p>
                </div>
                <p>If this was not you then please ignore this email so that your account & data will be safe and secure.</p>
                <p>Regards,</p>
                <p>CashBook App</p>
            </div>
            <div style="background: #f5f5f5; padding: 24px; border-radius: 0px 0px 5px 5px;display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <img
                    src="https://res.cloudinary.com/dwe1p24zb/image/upload/f_auto,q_auto/v1/cashbook/ixdggzto5jld6mlmx0cc" 
                    style="height: 30px;"/>
                <p style="font-size: 16px">
                    team@cashbook.in
                </p>
            </div>
        </div>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

export const sendOTPLoginAccout = (sender, email, code) => {
    const options = {
        from: sender,
        to: email,
        subject: `[CashBook] ${code} is your OTP to Login`,
        html: `<div style="
        box-sizing: border-box;
        background: #4863d4;
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
      ">
        <div style="
          background: #ffffff;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          border-radius: 5px;
        ">
            <div style="background: #f5f5f5; padding: 24px; border-radius: 5px 5px 0px 0px">
                <img
                    src="https://res.cloudinary.com/dwe1p24zb/image/upload/f_auto,q_auto/v1/cashbook/ixdggzto5jld6mlmx0cc" />
                <p style="font-size: 20px">
                    Create Account with One Time Password (OTP)
                </p>
            </div>
            <div style="padding: 24px">
                <p>
                    <span>Hi</span>
                    <span style="color : #4863d4">
                    ${email} ,
                    </span>
                </p>
                <p>Below is your verification code for the email address</p>
                <p>
                    <span style="color : #4863d4">
                        ${email} ,
                        </span>
                        <span> to create CashBook account. This OTP is valid for 10 mins.
                        </span>
                </p>
                <div
                    style="padding: 5px 0px;"
                >
                    <p
                        style="width: 100px; padding: 8px 4px; border: 1px solid #4863d4; text-align: center; font-size: 25px; border-style: dashed; border-radius: 5px;margin-left: auto;
                        margin-right: auto;"
                    >
                        ${code}
                    </p>
                </div>
                <p>If this was not you then please ignore this email so that your account & data will be safe and secure.</p>
                <p>Regards,</p>
                <p>CashBook App</p>
            </div>
            <div style="background: #f5f5f5; padding: 24px; border-radius: 0px 0px 5px 5px;display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <img
                    src="https://res.cloudinary.com/dwe1p24zb/image/upload/f_auto,q_auto/v1/cashbook/ixdggzto5jld6mlmx0cc" 
                    style="height: 30px;"/>
                <p style="font-size: 16px">
                    team@cashbook.in
                </p>
            </div>
        </div>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

export const sendVerificaion = (sender, userEmail, name, code) => {
    const options = {
        from: sender,
        to: userEmail,
        subject: "CashBook Account Verifcaion",
        html: `<div style="background: #e7e0e0;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center;">CASHBOOK</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Your account verification code is :  <span style="font-size: 20px;font-weight: 600;">${code}</span></p>
        <p>This code will be expire after 06 hours laters.</p>
        <h3>Thanks</h3>
        <p><strong>CashBook Teams</strong></p>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

export const sendSuccessful = (sender, userEmail, name) => {
    const options = {
        from: sender,
        to: userEmail,
        subject: "Congratulations CashBook Account successfully verified",
        html: `<div style="background: #e7e0e0;padding: 12px; border-radius: 10px;">
        <h1 style="text-align: center;">CASHBOOK</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p style="line-height: 20px;">Welcome to cashbook family.Your account suceessfully verified.Insallah we try to give the best service to our customer.If you feel any problem to use our service insallah you will notice us to use our cusotomer support service.Our team always ready to provide service to our valuable customer.</p>
        <h3>Thanks</h3>
        <p><strong>CashBook Teams</strong></p>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

export const sendForgetPassword = (sender, userEmail, name, code) => {
    const options = {
        from: sender,
        to: userEmail,
        subject: "CashBook forget password",
        html: `<div style="background: #e7e0e0;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center;">CASHBOOK</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Your account password recovery code is :  <span style="font-size: 20px;font-weight: 600;">${code}</span></p>
        <p>This code will be expire after 06 hours laters.</p>
        <h3>Thanks</h3>
        <p><strong>CashBook Teams</strong></p>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

export const passwordChangeSuccessfull = (sender, userEmail, name) => {
    const options = {
        from: sender,
        to: userEmail,
        subject: "CashBook password changed successfully",
        html: `<div style="background: #e7e0e0;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center;">CASHBOOK</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Your account password has been changed successfully</p>
        <p>Stay with us.</p>
        <h3>Thanks</h3>
        <p><strong>CashBook Teams</strong></p>
    </div>`,
    };
    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};
