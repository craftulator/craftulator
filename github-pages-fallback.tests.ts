import {readFile} from 'node:fs/promises';

import {describe, expect, it} from 'vitest';

describe('GitHub Pages fallback', () => {
  it('stores the requested path and redirects to the root application entry', async () => {
    const fallbackHtml = await readFile('public/404.html', 'utf8');

    expect(fallbackHtml).toContain('sessionStorage.setItem');
    expect(fallbackHtml).toContain('craftulator:redirect');
    expect(fallbackHtml).toContain('window.location.replace');
    expect(fallbackHtml).toContain("window.location.origin + '/'");
  });

  it('restores the requested path before the app mounts', async () => {
    const indexHtml = await readFile('index.html', 'utf8');

    expect(indexHtml).toContain('sessionStorage.getItem');
    expect(indexHtml).toContain('craftulator:redirect');
    expect(indexHtml).toContain('window.history.replaceState');
  });
});
