import sequelize from '../config/db'

import { DataTypes, Model, type Optional } from 'sequelize'

interface MessageAttributes {
  id?: number
  content: string
  subject: string
  isRead: boolean
  fromUserID: number
  toUserID: number
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number
  public subject!: string
  public content!: string
  public isRead!: boolean
  public fromUserID!: number
  public toUserID!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    subject: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    content: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    isRead: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false
    },
    fromUserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toUserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'messages',
    sequelize
  }
)

Message.sync({ alter: true })
  .then(() => {})
  .catch((err: Error) => {
    console.error('Error creating Event table:', err)
  })

export { Message, type MessageCreationAttributes, type MessageAttributes }
