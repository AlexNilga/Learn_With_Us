const express = require('express');
const router = express.Router();

const multer = require('multer');
const path  = require('path');

const authenticateToken = require('../middlewares/authenticateToken');
const contentController = require('../controllers/contentController');

const uploadDir = path.join(__dirname, '../uploads');
const tmpDir = path.join(uploadDir, 'tmp');

const fileUploader = multer({ dest: tmpDir }); // temporary folder


/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management endpoints
 */

/**
 * @swagger
 * /content:
 *   post:
 *     summary: Create a new content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - categoryId
 *               - file
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Content description"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Content created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
    '/',
    authenticateToken,
    fileUploader.single('file'),
    async (req, res) => { contentController.createContent(req, res) });

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Content]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the content to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content metadata retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 */
router.get('/:id', authenticateToken, (req, res) => { contentController.getContent(req, res) });

/**
 * @swagger
 * /content/{id}/file:
 *   get:
 *     summary: Get content file by content ID
 *     tags: [Content]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the content
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 */
router.get('/:id/file', authenticateToken, (req, res) => { contentController.getContentFile(req, res) });

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Get all contents
 *     tags: [Content]
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         required: false
 *         description: Optional filter by category ID
 *         schema:
 *           type: integer
 *       - name: userId
 *         in: query
 *         required: false
 *         description: Optional filter by user ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contents
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, (req, res) => { contentController.listContents(req, res) });

/**
 * @swagger
 * /content/{id}:
 *   patch:
 *     summary: Update a content by ID
 *     tags: [Content]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the content to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               parentId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content updated successfully
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 *       404:
 *        description: Content not found
 *       400:
 *        description: Validation error
 * 
 */
router.patch('/:id', authenticateToken, (req, res) => { contentController.updateContent(req, res) });

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Delete content
 *     tags: [Content]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the content to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */
router.delete('/:id', authenticateToken, (req, res) => { contentController.deleteContent(req, res) });

/**
 * @swagger
 * /content/{contentId}/comment:
 *   post:
 *     summary: Create a new comment to a content
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the content to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Content comment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
    '/:contentId/comment',
    authenticateToken,
    fileUploader.single('file'),
    async (req, res) => { contentController.createContentComment(req, res) });

module.exports = router;