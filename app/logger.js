module.exports = function () {
    if (!process.env.DISABLE_LOGS) {
        console.log.apply(this, arguments);
    }
}