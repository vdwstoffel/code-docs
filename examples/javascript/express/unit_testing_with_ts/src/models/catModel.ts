import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

class Cat extends Model {
  declare id: number;
  declare name: string;
}

Cat.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
export async function createTable(): Promise<void> {
  await Cat.sync();
}

export async function getAllCats(): Promise<Cat[]> {
  return await Cat.findAll();
}

export async function createCat(name: string): Promise<void> {
  console.log("Running")
  await Cat.create({ name: name });
  console.log("Cat created")
}
