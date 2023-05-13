const Product = require("../models/products.model");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(4)
    .skip(1);
  res.status(200).json({ nombre: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  // else {
  //   result = result.sort("createdAt");
  // }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log("Albanie ::: " + skip);

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nombre: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
