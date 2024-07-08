const { DataTypes } = require('sequelize');

module.exports = database => {

    database.define('User', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(255)
        }

    },
    {
      timestamps: false
    }
    )

}