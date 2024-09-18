const otpGenerate = () => {
  const otp = Math.floor((Math.random() + 1) * 1000) * 5;
  return otp;
};

module.exports = otpGenerate;
