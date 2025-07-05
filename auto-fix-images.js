/**
 * Automated Image Path Fixer
 * This script will automatically fix hardcoded image paths in your project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to search in
const searchDirs = ['src'];

// Files to exclude
const excludeFiles = [
  'fix-image-paths.js',
  'auto-fix-images.js',
  'imageUtils.js',
  'IMAGE_FIX_GUIDE.md',
  'IMAGE_ISSUES_RESOLVED.md',
  'DEPLOYMENT.md'
];

// Pattern replacements
const replacements = [
  // Replace BASE_URL patterns
  {
    pattern: /\$\{import\.meta\.env\.BASE_URL\}\/img\/([^`'"]*)/g,
    replacement: "getImgPath('$1')"
  },
  // Replace direct /img/ paths in src attributes
  {
    pattern: /src=["']\/img\/([^"']*?)["']/g,
    replacement: 'src={getImgPath("$1")}'
  },
  // Replace direct /img/ paths in other contexts
  {
    pattern: /["']\/img\/([^"']*?)["']/g,
    replacement: 'getImgPath("$1")'
  }
];

function addImportToFile(content, filePath) {
  // Check if import already exists
  if (content.includes('from "@/utils/imageUtils"') || content.includes('from "../../utils/imageUtils"') || content.includes('from "../../../utils/imageUtils"')) {
    return content;
  }

  // Calculate relative path to imageUtils
  const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, 'src/utils')).replace(/\\/g, '/');
  let importPath;
  
  if (relativePath.startsWith('../')) {
    importPath = `${relativePath}/imageUtils`;
  } else {
    importPath = '@/utils/imageUtils';
  }

  // Find the last import statement
  const lines = content.split('\n');
  let insertIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ') && !lines[i].includes('from "react"')) {
      insertIndex = i + 1;
    }
  }

  // Insert the import
  lines.splice(insertIndex, 0, `import { getImgPath } from "${importPath}";`);
  return lines.join('\n');
}

function fixImagePaths(content, filePath) {
  let modifiedContent = content;
  let hasChanges = false;

  // Apply all replacements
  for (const { pattern, replacement } of replacements) {
    const newContent = modifiedContent.replace(pattern, replacement);
    if (newContent !== modifiedContent) {
      hasChanges = true;
      modifiedContent = newContent;
    }
  }

  // Add import if we made changes
  if (hasChanges) {
    modifiedContent = addImportToFile(modifiedContent, filePath);
  }

  return { content: modifiedContent, hasChanges };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, hasChanges } = fixImagePaths(content, filePath);
    
    if (hasChanges) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.log(`Error processing file ${filePath}: ${error.message}`);
    return false;
  }
}

function processDirectory(dir) {
  const results = { processed: 0, modified: 0 };
  
  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (stat.isFile() && (item.endsWith('.jsx') || item.endsWith('.js'))) {
        if (excludeFiles.some(exclude => item.includes(exclude))) {
          continue;
        }
        
        results.processed++;
        if (processFile(fullPath)) {
          results.modified++;
          console.log(`✅ Fixed: ${fullPath}`);
        }
      }
    }
  }
  
  walkDir(dir);
  return results;
}

console.log('🔧 Starting automated image path fixes...\n');

const totalResults = { processed: 0, modified: 0 };

for (const dir of searchDirs) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Processing directory: ${dir}`);
    const results = processDirectory(dir);
    totalResults.processed += results.processed;
    totalResults.modified += results.modified;
    console.log(`   Processed: ${results.processed} files, Modified: ${results.modified} files\n`);
  }
}

console.log('🎉 Automated fixing complete!');
console.log(`📊 Total: ${totalResults.processed} files processed, ${totalResults.modified} files modified`);

if (totalResults.modified > 0) {
  console.log('\n🚀 Next steps:');
  console.log('1. Run "npm run build" to test the changes');
  console.log('2. Run "npm run preview" to test locally');
  console.log('3. Deploy to Vercel when ready');
} else {
  console.log('\n✅ No files needed fixing - all image paths are already using the utility functions!');
}
