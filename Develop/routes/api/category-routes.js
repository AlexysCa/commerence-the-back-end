const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
  // find all categories
    const dataCategories = await Category.findAll({
  // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(dataCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
  // find one category by its `id` value
  const dataCategories = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
  include: [{ model: Product }],
    });
  if (!dataCategories) {
    res.status(404).json({ message: 'No category found with that id'});
    return;
  }
    res.status(200).json(dataCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
  // create a new category
  const createCategory = await Category.create({
    category_id: req.body.category_id,
  });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  try {
  // delete a category by its `id` value
    const dataCategories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  if (!dataCategories) {
    res.status(404).json({ message: 'No category found with that id'});
    return;
  }
    res.status(200).json(dataCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
