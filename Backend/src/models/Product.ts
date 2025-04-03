import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    category_id: number;
    supplier_id: number;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ProductCreationAttributes extends Optional<IProduct, "id" | "createdAt" | "updatedAt"> {}

// Definimos el modelo extendiendo Sequelize.Model
class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
    public id!: number;
    public name!: string;
    public description!: string;
    public category_id!: number;
    public supplier_id!: number;
    public price!: number;
    public stock!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

// Inicializamos el modelo
Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize, // Conexión a la base de datos
      modelName: "Product",
      tableName: "products",
      timestamps: true, // Habilita los campos createdAt y updatedAt automáticamente
    }
);


  
export default Product;