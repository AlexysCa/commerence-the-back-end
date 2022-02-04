const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
  // find all tags
    const dataTags = await Tag.findAll({
  // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    res.status(200).json(dataTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
  // find a single tag by its `id`
  const dataTags = await Product.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{ model: Product }]
    });
  if (!dataTags) {
    res.status(404).json({ message: 'No tag found with that id'});
    return;
  }
    res.status(200).json(dataTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
  // create a new tag
    const createTag = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateTag) => {
      res.json(updateTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  try {
  // delete on tag by its `id` value
    const dataTags = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
  if (!dataTags) {
    res.status(404).json({ message: 'No tag found with that id'});
    return;
  }
    res.status(200).json(dataTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
