import assert from 'node:assert';
import test from "node:test";
import { removeDuplicateFields, removeDuplicateViews, createNewJsonFile } from './functions.js';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  test('should remove duplicate objects fields', () => {

    const mockData = {
      "versions": [
        {
          "objects": [
            {
              "fields": [
                { "name": "A name", "key": "field_x" },
                { "name": "A name", "key": "field_x" }
              ]
            }
          ]
        }
      ]
    };

    const expectedMockData = {
      "versions": [
        {
          "objects": [
            {
              "fields": [
                { "name": "A name", "key": "field_x" }
              ]
            }
          ]
        }
      ]
    };    

    assert.deepEqual(removeDuplicateFields(mockData), expectedMockData);
  });

  test('should remove duplicate scenes views', () => {

    const mockData = {
      "versions": [
        {
          "scenes": [
            {
              "views": [
                { "_id": "163453451234234" },
                { "_id": "163453451234234" }
              ]
            }
          ]
        }
      ]
    };

    const expectedMockData = {
      "versions": [
        {
          "scenes": [
            {
              "views": [
                { "_id": "163453451234234" }
              ]
            }
          ]
        }
      ]
    };   

    assert.deepEqual(removeDuplicateViews(mockData), expectedMockData);
  });

  test('should create a new JSON file at the output path', () => {
    const data = { name: 'joel' };
    const expectedContent = JSON.stringify(data, null, 2);
    
    createNewJsonFile(data);
    const expectedPath = path.join(__dirname, 'output', 'mock_application.json');
    const fileContent = fs.readFileSync(expectedPath, 'utf-8');
    
    assert.deepEqual(fileContent, expectedContent);

    fs.unlinkSync(expectedPath); 
  });