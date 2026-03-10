const fs = require('fs');
const content = fs.readFileSync('restructure.cjs', 'utf-8');
const match = content.match(/function AuthPage.*?return/s);
if (match) {
  console.log(match[0]);
} else {
  console.log("No match found.");
}
