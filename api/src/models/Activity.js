const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('activity', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        season: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: true,
        },


    },
        { timestamps: false }
    );
}