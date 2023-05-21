import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import schemas from './schemas/schema';
import deskStructure from './deskStructure';
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy';

export default defineConfig({
  title: 'Tables for Two App Admin',
  projectId: 'abidi91x',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
    vercelDeployTool(),
  ],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev;
    }
    return prev.filter((tool) => tool.name !== 'vision');
  },
  schema: {
    types: schemas,
  },
});
