import {readFile} from 'node:fs/promises';

import {describe, expect, it} from 'vitest';

describe('package metadata', () => {
  it('describes Craftulator and the target GitHub Pages repository', async () => {
    const packageJson = JSON.parse(await readFile('package.json', 'utf8')) as {
      bugs?: {
        url?: string;
      };
      description?: string;
      homepage?: string;
      keywords?: string[];
      name?: string;
      repository?: {
        url?: string;
      };
    };

    expect(packageJson.name).toBe('craftulator');
    expect(packageJson.description).toBe('Universal production-chain calculator for games.');
    expect(packageJson.repository?.url).toBe('git+https://github.com/craftulator/craftulator.github.io.git');
    expect(packageJson.bugs?.url).toBe('https://github.com/craftulator/craftulator.github.io/issues');
    expect(packageJson.homepage).toBe('https://craftulator.github.io/');
    expect(packageJson.keywords).toContain('production-chain-calculator');
  });
});
