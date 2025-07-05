/**
 * Script to find and list all remaining hardcoded image paths
 * Run with: node fix-image-paths.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to search for
const patterns = [
  /src=["'][^"']*\/img\/[^"']*["']/g,
  /\${import\.meta\.env\.BASE_URL}\/img\/[^`]*/g,
  /["']\/img\/[^"']*["']/g
];

// Directories to search in
const searchDirs = ['src'];

// Files to exclude
const excludeFiles = [
  'fix-image-paths.js',
  'imageUtils.js',
  'IMAGE_FIX_GUIDE.md',
  'IMAGE_ISSUES_RESOLVED.md',
  'DEPLOYMENT.md'
];

function searchDirectory(dir) {
  const results = [];
  
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
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          for (const pattern of patterns) {
            const matches = content.match(pattern);
            if (matches) {
              results.push({
                file: fullPath,
                matches: matches
              });
            }
          }
        } catch (error) {
          console.log(`Error reading file ${fullPath}: ${error.message}`);
        }
      }
    }
  }
  
  walkDir(dir);
  return results;
}

console.log('🔍 Searching for hardcoded image paths...\n');

const allResults = [];
for (const dir of searchDirs) {
  if (fs.existsSync(dir)) {
    const results = searchDirectory(dir);
    allResults.push(...results);
  }
}

if (allResults.length === 0) {
  console.log('✅ No hardcoded image paths found! All images are using the utility functions.');
} else {
  console.log('📋 Found hardcoded image paths in the following files:\n');
  
  for (const result of allResults) {
    console.log(`📁 ${result.file}`);
    for (const match of result.matches) {
      console.log(`   - ${match}`);
    }
    console.log('');
  }
  
  console.log(`\n🔧 Total files to fix: ${allResults.length}`);
  console.log('\n💡 To fix these files:');
  console.log('1. Add: import { getImgPath } from "@/utils/imageUtils";');
  console.log('2. Replace: src="/img/..." with src={getImgPath("...")}');
  console.log('3. Replace: ${import.meta.env.BASE_URL}/img/... with getImgPath("...")');
}

console.log('\n🚀 Run "npm run build" after fixing to test the changes.');
