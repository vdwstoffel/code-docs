import { Sequelize, Model, DataTypes } from "sequelize";
import { Cast } from "sequelize/types/utils";

const sequelize = new Sequelize("sqlite::memory:");

class Cat extends Model {
  declare id: number;
  declare name: string;
  declare preferredName: string | null;
}

Cat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "cats",
    sequelize, // passing the `sequelize` instance is required
  }
);

// Create Table
Cat.sync();

export async function getAllCats(): Promise<Cat[]> {
  return await Cat.findAll();
}

export async function createCat(name: string): Promise<void> {
  await Cat.create({ name: name });
}
