import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {

    const User = sequelize.define('User', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        // Encrypt password before create user
        hooks: {

            beforeCreate: user => {

                const salt = bcrypt.genSaltSync();

                user.set('password', bcrypt.hashSync(user.password, salt));
            }
        }
    });

    User.isPassword = (encoded, password) => bcrypt.compareSync(password, encoded);

    return User;
}