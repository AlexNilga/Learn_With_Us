const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const Category = require('../models/Category');

/// <summary>
/// Creates a new category
/// </summary>
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await Category.create({ name: name, description: description });
        res.status(201).json(newCategory);
    } catch (err) {

        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }

        console.error(err);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

/// <summary>
/// Finds a category by ID
/// </summary>
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category was not found' });
        }

        res.status(201).json(category);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the category' });
    }
};
