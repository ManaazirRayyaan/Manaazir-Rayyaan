import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './sanity/schemaTypes' // ✅ IMPORTANT
import {structure} from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'gjojazpv',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: schema, // 🔥 THIS WAS MISSING
})