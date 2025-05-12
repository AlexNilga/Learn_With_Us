
'use strict';

const { v4: uuidv4 } = require('uuid');

const fileStorage = require('fs');
const path = require('path');

const {
    ValidationError,
    UniqueConstraintError
} = require('sequelize');

const db = require('../models');
const Content = db.Content;
const ContentComment = db.ContentComment;

const contentService = require('../services/contentService');


/// <summary>
/// Creates a new content
/// </summary>
exports.createContent = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = uuidv4();
    const { description, categoryId } = req.body;

    // Create category directory if it doesn't exist
    const dir = path.join(__dirname, '../uploads', categoryId);
    if (!fileStorage.existsSync(dir)) {
        fileStorage.mkdirSync(dir, { recursive: true });
    }

    const finalPath = path.join(dir, id);

    try {
        const newContent = await Content.create(
            {
                id: id,
                name: file.originalname,
                description: description,
                userId: req.user.id,
                categoryId: categoryId,
                path: finalPath,
                mimeType: file.mimetype,
                size: file.size
            }
        );

        // Move/rename file
        fileStorage.renameSync(file.path, finalPath);

        res.status(201).json(newContent);
    } catch (err) {

        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const error = err.errors[0].message;
            return res.status(400).json({ error });
        }

        console.error(err);
        res.status(500).json({ error: 'Failed to create content' });
    }
};

/// <summary>
/// Finds content metadata by ID
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

/// <summary>
/// Finds content metadata by ID
/// </summary>
exports.getContentFile = async (req, res) => {

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

        if (!fileStorage.existsSync(content.path)) {
            return res.status(404).json({ error: 'File not found on disk' });
        }

        res.set({
            'Content-Type': content.mimeType,
            'Content-Disposition': `inline; filename="${content.name}"`,
          });

        res.sendFile(content.path);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to find the content' });
    }
};

exports.listContents = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Build the where clause based on the provided query parameters
    const { categoryId, userId } = req.query;
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
/// Updates content metadata
/// </summary>
exports.updateContent = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, categoryId } = req.body;

    try {
        const content = await Content.findByPk(
            req.params.id,
            {
                include: {
                    model: db.User,
                    as: 'creator', // alias for the user who created the category
                    attributes: ['id', 'username'] // only fetch selected user fields
                }
            });

        if (!content) {
            return res.status(404).json({ error: 'Content was not found' });
        }

        if (content.userId !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ error: 'You are not authorized to update this content' });
        }

        content.name = name;
        content.description = description;
        content.categoryId = categoryId;

        await content.save();

        res.status(200).json(content);
    }
    catch (err) {

        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            return res.status(400).json({ error: err.errors[0].message });
        }

        console.error(err);
        res.status(500).json({ error: 'Failed to update the content metadata' });
    }
};

/// <summary>
/// Deletes content
/// </summary>
exports.deleteContent = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const content = await Content.findByPk(req.params.id);

        if (!content) {
            return res.status(404).json({ error: 'Content was not found' });
        }

        if (content.userId !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ error: 'You are not authorized to delete this content' });
        }

        await contentService.deleteContent(content);

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the content' });
    }
};

/// <summary>
/// Creates a new comment for the content
/// </summary>
exports.createContentComment = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const contentId = req.params.contentId;
    const userId = req.user.id;

    const { text } = req.body;

    try {
        const content = await Content.findByPk(contentId);

        if (!content) {
            return res.status(404).json({ error: 'Content was not found' });
        }

        const comment = await ContentComment.create({
            contentId: contentId,
            text: text,
            userId: userId
        });

        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}

