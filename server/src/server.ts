import app from "./app";
import myDataSource from "./Loader/MySQL.Loader";
import connectMongoDB from "./Loader/Mongo.Loader";

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

connectMongoDB();

app.listen(process.env.PORT);
