const { Inventory } = require('../index');

exports.createInventory = async (payload) => {
  const res = await Inventory.create(payload);
  return res;
};
