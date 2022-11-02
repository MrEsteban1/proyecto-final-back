const logs = require('log4js');

logs.configure({
    appenders: {
        miLoggerConsole:{type:"console"},
        miLoggerWarn: {type: "file", filename:"warn.log"},
        miLoggerError: {type: "file", filename:"error.log"},
    },
    categories: {
        default: {appenders:["miLoggerConsole"], level:"info"},
        consola: {appenders:["miLoggerConsole"], level:"trace"},
        warning: {appenders:["miLoggerWarn", "miLoggerConsole"], level:"warn"},
        error: {appenders:["miLoggerError", "miLoggerConsole"], level:"error"},
    }
})
const loggerConsola = logs.getLogger("consola");
const loggerWarn = logs.getLogger("warning");
const loggerError = logs.getLogger("error");

module.exports = {logs, loggerConsola, loggerError,loggerWarn}