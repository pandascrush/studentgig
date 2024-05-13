import jwt from "jsonwebtoken";

const Verification = async (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    if (!accessToken) {
      res.json({ status: false, msg: "token_expired" });
    } else {
      const token = jwt.verify(accessToken, "secretkey");
      next();
    }
  } catch (err) {
    res.json({ msg: "catch_error" });
  }
}

export default Verification;
