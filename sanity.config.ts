import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './schemas/post'

export default defineConfig({
  name: 'nextechoc',
  title: 'NexTech OC',
  projectId: 'z81otgnr',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: [post] },
})