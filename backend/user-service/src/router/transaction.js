const Express = require("express");
const router = Express.Router();
const {
  sendPublicTransaction,
  sendPrivateTransaction,
} = require("../utils/sendTransaction");
const auth = require("../middleware/auth");

// Need to authenticate
router.post("/send", auth, async (req, res) => {
  try {
    const tx = {
      data: req.body.data,
      to: req.body.to,
    };
    const receipt = await sendPublicTransaction(req.userAccount, tx, req.body.url);
    res.send({ receipt });
  } catch (error) {
    res.status(401).send({ error });
  }
});

router.post("/sendPrivate", auth, async (req, res) => {
  try {
    const tx = {
      data: req.body.data,
      to: req.body.to,
    };
    const receipt = await sendPrivateTransaction(
      req.userAccount,
      tx,
      req.body.privateFrom,
      req.body.privateFor,
      req.body.url,
      req.body.tessera
    );
    res.send({ receipt });
  } catch (error) {
    res.status(401).send({ error });
  }
});

module.exports = router;
