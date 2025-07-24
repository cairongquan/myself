import { connect } from "mongoose";

export default function connectDB() {
  return connect("mongodb://47.121.133.92:27017/mySelf", {
    authSource: "admin",
    user: "cai",
    pass: "201031",
  });
}
