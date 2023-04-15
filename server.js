const { app } = require('./app');
const { db } = require('./utils/db.utils'); //* DB
const { initModels } = require('./models/initModels.model');

const startServer = async () => {
  try {
    await db.authenticate();

    initModels();

    await db.sync({ force: false });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`AcademiaHabilidadesServer is Runnig!!! on PORT: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
