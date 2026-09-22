const fs = require('fs');
const path = require('path');

// We will load the actual articles from files to check their links
const indexFiles = [
    { name: 'Technological_Catalogs', file: 'src/codex/articles/Technological_Catalogs_Index.ts' },
    { name: 'Nations', file: 'src/codex/articles/Nations_Index.ts' },
    { name: 'Places', file: 'src/codex/articles/Places_Index.ts' },
    { name: 'People', file: 'src/codex/articles/People_Index.ts' },
    { name: 'Corporations', file: 'src/codex/articles/Corporations_Index.ts' },
    { name: 'History', file: 'src/codex/articles/History_Index.ts' },
    { name: 'Economics', file: 'src/codex/articles/Economics_Index.ts' },
    { name: 'Races', file: 'src/codex/articles/Races_Index.ts' },
    { name: 'Scientific_Principles', file: 'src/codex/articles/Scientific_Principles_Index.ts' },
    { name: 'Engineering_Systems', file: 'src/codex/articles/Engineering_Systems_Index.ts' },
    { name: 'Architectural_Achievements', file: 'src/codex/articles/Architectural_Achievements_Index.ts' },
    { name: 'Tactics_and_Treatises', file: 'src/codex/articles/Tactics_and_Treatises_Index.ts' }
];

console.log('Index files to check:', indexFiles.length);
