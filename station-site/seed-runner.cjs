
require('ts-node').register({
  moduleTypes: {
    '**': 'cjs',
  },
  
  esModuleInterop: false, 
  
  project: './tsconfig.json'
});

require('./prisma/seed.ts');