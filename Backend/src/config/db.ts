import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require`;

const sequelize = new Sequelize(DATABASE_URL,{
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

// Función para probar la conexión
const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ Conexión a la base de datos establecida correctamente.");
    } catch (error) {
      console.error("❌ Error al conectar a la base de datos:", error);
      process.exit(1); // Detiene la aplicación si la conexión falla
    }
};

export { sequelize, connectDB };