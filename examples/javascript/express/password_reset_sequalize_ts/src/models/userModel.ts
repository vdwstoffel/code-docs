import { Sequelize, Model, DataTypes } from "sequelize";
import { createHash } from "crypto";

const sequelize = new Sequelize("sqlite:./test.sqlite");

class User extends Model {
  declare id: number;
  declare userName: string;
  declare password: string;
  declare passwordResetToken: string;
  declare passwordResetTokenExpiry: Date;
  declare lastPasswordReset: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: new DataTypes.STRING(128), allowNull: false },
    password: { type: new DataTypes.STRING(128), allowNull: false },
    passwordResetToken: { type: new DataTypes.STRING(), allowNull: true, defaultValue: null },
    passwordResetTokenExpiry: { type: new DataTypes.DATE(), allowNull: true, defaultValue: null },
    lastPasswordReset: { type: new DataTypes.DATE(), allowNull: true, defaultValue: null },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

User.sync();

export async function createNewuser(userDetails: { userName: string; password: string }): Promise<void> {
  await User.create(userDetails);
}

export async function findUser(username: string): Promise<User> {
  const user: User[] = await User.findAll({ where: { userName: username } });
  return user[0];
}

export async function findUserByResetToken(resetToken: string): Promise<User> {
  const hashedToken = createHash("sha256").update(resetToken).digest("hex");
  const userData: User[] = await User.findAll({ where: { passwordResetToken: hashedToken } });
  return userData[0];
}

export async function updatePasswordReset(userName: string, token: string): Promise<void> {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const expireIn15Min = new Date(Date.now() + 15 * 60 * 1000);
  await User.update(
    { passwordResetToken: hashedToken, passwordResetTokenExpiry: expireIn15Min },
    { where: { userName: userName } }
  );
}

export async function updatePassword(userName: string, password: string): Promise<void> {
  // Add password hasing function here
  await User.update(
    { password: password, passwordResetToken: null, passwordResetTokenExpiry: null, lastPasswordReset: new Date() },
    { where: { userName: userName } }
  );
}
