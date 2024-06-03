//@ts-nocheck
import prompt from 'prompt';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, resolve, extname } from 'path';
import {JSDOM} from 'jsdom';

type FileCallback = (filePath: string) => void;

async function processHTMLString(htmlString) {
    const dom = new JSDOM(htmlString);
    // dom.window.document.body.querySelectorAll('*').forEach(node => {
    //     let id = node.id;
    //     if (id.match(/^i.{2,6}$/)) {
    //         node.removeAttribute('id');
    //     }
    // })
    const processed = dom.window.document.body.innerHTML;
    
    return processed;
}

async function processDirectory(dirPath: string, callback: FileCallback, options: Record<string, any> = {}) {
    try {
        const files = await readdir(dirPath, { withFileTypes: true});
        for (const file of files) {
            
            const fullPath = join(dirPath, file.name);
            if (file.isDirectory() && options.recursive) {
                await processDirectory(fullPath, callback);  // Recurse into subdirectories
            } else {
                if(extname(fullPath) == '.html'){
                    callback(fullPath);
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dirPath}: ${error}`);
    }
}

// Function to handle the completion of the prompt
function onPromptComplete(err: any, result: { directory: string }) {
    if (err) {
        console.error('Error:', err);
        return;
    }

    const directory = resolve(result.directory);
    console.log(`Processing files in: ${directory}`);

    // Define the callback for each file
    const fileCallback: FileCallback = async (filePath) => {
        const content = await readFile(filePath, {encoding: 'utf-8'});
        const html = await processHTMLString(content);
        await writeFile(filePath, html, {encoding: 'utf-8'});
    };

    // Process the directory
    processDirectory(directory, fileCallback);
}

// Setup prompt
prompt.start();
prompt.get({
    properties: {
        directory: {
            description: 'Enter the path to the directory to process',
            type: 'string',
            required: false
        },
        action: {
            description: 'Confirm to process files in the directory',
            type: 'boolean',
            required: true
        },
    }
}, onPromptComplete);