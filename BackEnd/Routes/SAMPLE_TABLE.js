const express = require("express");
const Result = require("../Database");

const Router = express.Router();



Router.post("/Insert", (req, res) => {
  let Details = req.body;
  console.log(Details);
  Result("SAMPLE_TABLE", "Insert", Details)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.error(err);
    });
});

Router.get("/Read", (req, res) => {
  Result("SAMPLE_TABLE", "Read")
    .then((result) => {
      res.json({ Message: "Read success", Result: result.rows });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.error(err);
    });
});


Router.put("/Update",(req,res)=>{
  let Details = req.body;
  console.log(Details);
  Result("SAMPLE_TABLE", "Update", Details)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.error(err);
    });

})

Router.delete("/Delete",(req,res)=>{

  let Details = req.body;
  console.log(Details);
  Result("SAMPLE_TABLE", "Delete", Details)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.error(err);
    });

})




module.exports = Router;
