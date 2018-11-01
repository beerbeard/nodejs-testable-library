export default {

    // SQLite 
    database: 'library',
    username: '',
    password: '',

    // Sequelize
    params: {
        dialect: 'sqlite',

        // Using one database for tests and another for real process    
        storage: process.env.NODE_ENV
            ? `library-${process.env.NODE_ENV}.sqlite`
            : 'library.sqlite',
        operatorsAliases: false,
        freezeTableName: true,
        define: {
            underscored: true
        }
    },

    // JWT
    secret: 'no-one-knows',
    session: false
}