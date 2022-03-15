const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//applications/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extension: true }));

//applications/json 타입으로 된 것을 분석해서 가져올 수 있게
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sumi-0011:nemo0408@boiler-plate.tsurp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Mongoose Connect...."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body); //정보들을 user모델에 저장해준다.

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    //status 200 : 성공했다는 표시
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
