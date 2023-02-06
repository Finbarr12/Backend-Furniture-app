import mongoose from "mongoose";

const Uri = "mongodb://localhost/Athentication";

mongoose.connect(Uri);

mongoose.connection.on("open", () => [console.log(`Db is on`)]);
