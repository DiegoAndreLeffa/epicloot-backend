import "reflect-metadata";
import { AppDataSource } from "./infrastructure/database/data-source";
import app from "./interfaces/http/server";

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
