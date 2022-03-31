const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.status(202).send({
    msg: "ALL FINE",
  });
});

module.exports = router;
