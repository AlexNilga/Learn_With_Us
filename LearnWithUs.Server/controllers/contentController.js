const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const db = require('../models');
const Content = db.Content;

const { v4: uuidv4 } = require('uuid');

/// <summary>
/// Creates a new content
/// </summary>
exports.createContent = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = uuidv4();
    const { name, description, categoryId } = req.body;
    const path = categoryId + '/' + id;

    try {
        const newContent = await Content.create(
            {
                id: id,
                name: name,
                description: description,
                userId: req.user.id,
                categoryId: categoryId,
                path: path
            }
        );

        res.status(201).json(newContent);
    } catch (err) {

        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }

        console.error(err);
        res.status(500).json({ error: 'Failed to create content' });
    }
};

/// <summary>
/// Finds a category by ID
/// </summary>
exports.getContent = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const content = await Content.findByPk(
            req.params.id, {
            include: {
                model: db.User,
                as: 'creator', // alias for the user who created the category
                attributes: ['id', 'username'] // only fetch selected user fields
            }
        });

        if (!content) {
            return res.status(404).json({ error: 'Content was not found' });
        }

        res.status(200).json(category);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the content' });
    }
};

exports.listContents = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { categoryId, userId } = req.query;

    // Build the where clause based on the provided query parameters
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (userId) where.userId = userId;

    try {
        const contents = await Content.findAll(
            {
                where: where,
                include: [
                    {
                        model: db.User,
                        as: 'creator', // alias for the user who created the category
                        attributes: ['id', 'username'] // only fetch selected user fields
                    },
                    {
                        model: db.Category,
                        as: 'category', // alias for the category
                        attributes: ['id', 'name'] // only fetch selected category fields
                    }
                ]
            }
        );

        res.status(200).json(contents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list ccontents' });
    }
};

/// <summary>
/// Updates a category
/// </summary>
// exports.updateCategory = async (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const { name, description, parentId } = req.body;

//     try {
//         const category = await Category.findByPk(
//             req.params.id,
//             {
//                 include: {
//                     model: db.User,
//                     as: 'creator', // alias for the user who created the category
//                     attributes: ['id', 'username'] // only fetch selected user fields
//                 }
//             });

//         if (!category) {
//             return res.status(404).json({ error: 'Category was not found' });
//         }

//         if (category.userId !== req.user.id && !req.user.isAdmin) {
//             return res.status(403).json({ error: 'You are not authorized to update this category' });
//         }

//         category.name = name;
//         category.description = description;
//         category.parentId = parentId;

//         await category.save();

//         res.status(200).json(category);
//     } catch (err) {

//         if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
//             const errors = err.errors.map(e => e.message);
//             return res.status(400).json({ errors });
//         }

//         console.error(err);
//         res.status(500).json({ error: 'Failed to update the category' });
//     }
// };

/// <summary>
/// Deletes a category by ID
/// </summary>
// exports.deleteCategory = async (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     try {
//         const category = await Category.findByPk(req.params.id);

//         if (!category) {
//             return res.status(404).json({ error: 'Category was not found' });
//         }

//         if (category.userId !== req.user.id && !req.user.isAdmin) {
//             return res.status(403).json({ error: 'You are not authorized to delete this category' });
//         }

//         await category.destroy();

//         res.status(204).send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to delete the category' });
//     }
// };

