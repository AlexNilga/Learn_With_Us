const fs = require('fs');

/// <summary>
/// Deletes content
/// </summary>
exports.deleteContent = async (content) => {

    fs.unlink(content.path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });

    await content.destroy();
};