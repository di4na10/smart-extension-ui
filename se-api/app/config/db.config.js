module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "!4ppl3p13",
    DB: "semcip",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
