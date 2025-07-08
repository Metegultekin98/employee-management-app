/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';
import {readFile} from 'fs/promises';
import {fileURLToPath} from 'url';
import {resolve} from 'path';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const indexHtmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../src/index.html'
);

export default {
  nodeResolve: {
    exportConditions: mode === 'dev' ? ['development'] : [],
  },
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: false,
      },
    }),
  ],
  middleware: [
    async (ctx, next) => {
      await next();

      if (
        ctx.response.status === 404 &&
        !ctx.path.includes('.') &&
        !ctx.path.startsWith('/__')
      ) {
        ctx.response.status = 200;
        ctx.response.body = await readFile(indexHtmlPath, 'utf-8');
      }
    },
  ],
};
