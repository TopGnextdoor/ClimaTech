const esbuild = require('esbuild');
const fs = require('fs');

async function test() {
  const code = fs.readFileSync('src/ClimaTech.jsx', 'utf8');
  try {
    const result = await esbuild.transform(code, {
      loader: 'jsx',
      logLevel: 'error'
    });
    console.log("No syntax errors found.");
  } catch (e) {
    console.error(e.message);
  }
}
test();
