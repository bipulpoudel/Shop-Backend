const Yup = require("yup");
const { default: slugify } = require("slugify");
//modal imports
const Category = require("../models/category");

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find().select([
      "-createdAt",
      "-updatedAt",
    ]);

    res.json(categories);
  } catch (err) {
    //return if error occurs
    return res.status(500).json({
      errors: [{ message: "Internal Server Error" }],
    });
  }
};

const addCategories = async (req, res) => {
  const { name } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
  });

  try {
    //validation of the schema
    await schema.validate({
      name,
    });

    let category = await Category.findOne({
      name,
    });

    if (category) {
      return res.status(400).json({
        errors: [{ message: "Category with this name already exists" }],
      });
    }

    category = new Category({
      name,
      slug: slugify(name, {
        remove: undefined,
        lower: true,
        strict: true,
      }),
    });

    await category.save();

    res.json(category);
  } catch (err) {
    if (err.type === "required") {
      return res
        .status(400)
        .json({ errors: [{ message: err.message || "no success" }] });
    }

    return res.status(500).json({
      errors: [{ message: "Internal Server Error" }],
    });
  }
};

const updateCategories = async (req, res) => {};

module.exports = { fetchCategories, addCategories, updateCategories };
