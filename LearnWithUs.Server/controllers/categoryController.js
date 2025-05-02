const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const db = require('../models');
const Category = db.Category;

/// <summary>
/// Creates a new category
/// </summary>
exports.createCategory = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, userId } = req.body;

    try {
        const newCategory = await Category.create(
            {
                name: name,
                description: description,
                userId
            }
        );

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

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const category = await Category.findByPk(
            req.params.id, {
            include: {
                model: db.User,
                as: 'creator', // alias for the user who created the category
                attributes: ['id', 'username'] // only fetch selected user fields
            }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category was not found' });
        }

        res.status(201).json(category);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the category' });
    }
};

exports.listCategories = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const categories = await Category.findAll({
            include: {
                model: db.User,
                as: 'creator', // alias for the user who created the category
                attributes: ['id', 'username'] // only fetch selected user fields
            }
        });

        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list categories' });
    }
}
