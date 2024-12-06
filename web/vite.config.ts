import * as dns from 'dns';

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import redwood from '@redwoodjs/vite'


dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood()],
}

export default defineConfig(viteConfig)
