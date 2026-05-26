import {access, readFile} from 'node:fs/promises';

import {describe, expect, it} from 'vitest';

const themeLogoNames = [
  'alchemical',
  'animal',
  'biological',
  'engineering',
  'esoteric',
  'fantasy',
  'futuristic',
  'general',
  'medieval',
  'precise',
  'space',
];

describe('static branding assets', () => {
  it('sets the Craftulator document title and favicon links', async () => {
    const indexHtml = await readFile('index.html', 'utf8');

    expect(indexHtml).toContain('<title>Craftulator</title>');
    expect(indexHtml).toContain('href="/favicon.ico"');
    expect(indexHtml).toContain('href="/favicon-32x32.png"');
    expect(indexHtml).toContain('href="/apple-touch-icon.png"');
    expect(indexHtml).toContain('href="/site.webmanifest"');
  });

  it('publishes generated favicon assets', async () => {
    await expect(access('public/favicon.ico')).resolves.toBeUndefined();
    await expect(access('public/favicon-16x16.png')).resolves.toBeUndefined();
    await expect(access('public/favicon-32x32.png')).resolves.toBeUndefined();
    await expect(access('public/apple-touch-icon.png')).resolves.toBeUndefined();
    await expect(access('public/icon-192.png')).resolves.toBeUndefined();
    await expect(access('public/icon-512.png')).resolves.toBeUndefined();
    await expect(access('public/site.webmanifest')).resolves.toBeUndefined();
  });

  it('keeps theme logo assets source-only for future explicit component imports', async () => {
    await Promise.all(
      themeLogoNames.flatMap((themeLogoName) => [
        expect(access(`assets/themes/images/${themeLogoName}.png`)).resolves.toBeUndefined(),
        expect(access(`public/theme-logos/${themeLogoName}.png`)).rejects.toMatchObject({
          code: 'ENOENT',
        }),
      ]),
    );
  });
});
