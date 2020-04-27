var env = process.env.NODE_ENV ||'development';

//when json file is required it is automatically parses it into a javascript object.
if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// } else if (env === 'production') {
//     process.env.MONGODB_URI = 'mongodb://talshnitzer:ehbujho1@ds147723.mlab.com:47723/todo-app';
// }