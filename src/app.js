import { removeDuplicateFields, removeDuplicateViews, createNewJsonFile } from "./functions.js";
import jsonData from './data/mock_application.json' assert {type:'json'};

// Execution process
const filteredData = removeDuplicateFields(jsonData);
const newJson = removeDuplicateViews(filteredData);
createNewJsonFile(newJson);





