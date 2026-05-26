import {describe, expect, it} from 'vitest';

import viteConfig from './vite.config.js';

describe('Vite configuration', () => {
  it('uses the root path for organization GitHub Pages deployment', () => {
    expect(viteConfig).toMatchObject({
      base: '/',
    });
  });
});
