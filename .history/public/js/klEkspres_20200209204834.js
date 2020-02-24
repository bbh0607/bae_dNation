// Connect to DB (mongoDB)
mongoose
  .set("useUnifiedTopology", true)
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() =>
    console.log(
      `MongoDB Connected with readyState ${mongoose.connection.readyState}`
    )
  )
  .catch(err => console.log(err));
