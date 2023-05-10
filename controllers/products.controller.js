const getAllProductsStatic = async (req, res) => {
  throw new Error("Tesing async erors");
  res.status(200).json({ msg: "Products teting route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
