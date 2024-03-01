module.exports = {
  // Type check and Lint TypeScript files
  '**/*.(ts|tsx)': (filenames) => [
    'npx tsc --noEmit',
    `eslint --max-warnings=0 --fix ${filenames.join(' ')}`,
  ],

  // Lint JS files
  '**/*.(js)': (filenames) => `eslint --fix ${filenames.join(' ')}`,

  // Prettify TS, JS, Markdown and JSON files
  '**/*.(ts|tsx|js|json|md)': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
};
