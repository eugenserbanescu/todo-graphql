module.exports = function getUniqueId() {
  return (Math.random() * Date.now()).toString();
}
