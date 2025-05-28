module.exports = async (req, res, next) => {
    const delay = Math.floor(Math.random() * 1000);

    setTimeout(() => next(), delay);
}