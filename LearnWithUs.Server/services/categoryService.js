const db = require('../models');
const Category = db.Category;
const Content = db.Content;

const contentService = require('../services/contentService');

async function findDescendantCategories(categoryId, allCategories) {
    const children = allCategories.filter(c => c.parentId === categoryId);
    let descendants = [];

    for (const child of children) {
        descendants.push(child);
        const subDescendants = await findDescendantCategories(child.id, allCategories);
        descendants = descendants.concat(subDescendants);
    }

    return descendants;
}

async function deleteCategoryAndContents(category) {
    // Find all content associated with the category
    const contents = await Content.findAll({
        where: {
            categoryId: category.id
        }
    });

    // Delete each content
    for (const content of contents) {
        await contentService.deleteContent(content);
    }

    // Delete the category itself
    await category.destroy();
}

/// <summary>
/// Deletes content
/// </summary>
exports.deleteCategory = async (category) => {

    const allCategories = await Category.findAll();
    
    let categoriesToDelete = await findDescendantCategories(category.id, allCategories);
    
    categoriesToDelete = categoriesToDelete.reverse(); // Reverse to delete children first
    categoriesToDelete.push(category);

    for (const cat of categoriesToDelete) {
        console.log('Category to delete:', cat.id + ' - ' + cat.name);
        await deleteCategoryAndContents(cat);
    }
};