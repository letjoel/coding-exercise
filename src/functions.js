import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Functions

// Function 1. Removes objects fields by name and key fields as id can be different
export const removeDuplicateFields  = (data) => {

    const removedFields = [];

    data.versions.forEach(version => {
        version.objects.forEach(object => {
            const uniqueFields = [];

            object.fields.forEach(field => {
                const existingField = uniqueFields.find(f => f.name === field.name && f.key === field.key);
                if (!existingField) {
                    uniqueFields.push(field);
                }else{
                    removedFields.push(field);
                }
            });
            object.fields = uniqueFields;
        });
    });

    // Showing discarded
    console.log("Removed fields:");
    removedFields.forEach(field => console.table(field))

    return data;

}

// Function 2. Removes scenes views by whole object
export const removeDuplicateViews  = (data) => {

    const removedViews = [];

    data.versions.forEach(version => {
        const uniqueViews = [];
        
        version.scenes.forEach(scene => {
            scene.views.forEach(view => {
                const existingView = uniqueViews.find(v => JSON.stringify(v) === JSON.stringify(view));
                if (!existingView) {
                    uniqueViews.push(view);
                }else{
                    removedViews.push(view);
                }
            });
            scene.views = uniqueViews;
        });
    });

    // Showing discarded
    console.log("Removed views:");
    removedViews.forEach(view => console.table(view))

    return data;

}

// Function 3. Create new json file
export const createNewJsonFile = (newData) => {
    const outputPath = path.join(__dirname, 'output', 'mock_application.json');
    fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2));
    console.log("New depurated json created at: " + outputPath);
}