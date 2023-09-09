const mongoose = require("mongoose")

const logoutSchema = mongoose.Schema(
    {
      token: String,
    },
    {
      versionKey: false,
    }
  );

  const logoutModel = mongoose.model("blacklist", logoutSchema);
  
  module.exports = {
    logoutModel
}