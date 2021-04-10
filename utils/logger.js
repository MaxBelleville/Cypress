// # Logger Class

// # Import Dependencies
const moment = require('moment');
const colors = require('chalk');

const Logger = function Logger() {}

Logger.prototype.green = function success(message) {
    console.log(`${getDateString()} ` + colors.green(message));
};

Logger.prototype.red = function error(message) {
    console.log(`${getDateString()} ` + colors.red(message));
};

Logger.prototype.blue = function won(message) {
    console.log(`${getDateString()} ` + colors.blue(message));
};

Logger.prototype.normal = function info(message) {
    console.log(`${getDateString()} ${message}`);
};

Logger.prototype.yellow = function caution(message) {
    console.log(`${getDateString()} ` + colors.yellow(message));
};

Logger.prototype.black = function caution(message) {
    console.log(`${getDateString()} ` + colors.black(message));
}

function getDateString() {
    return "[" + moment().format("hh:mm:ss.SSS") + "]";
};

// export for use elsewhere
module.exports = function () {
    return new Logger();
};