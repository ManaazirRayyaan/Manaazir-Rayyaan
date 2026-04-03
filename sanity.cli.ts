import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gjojazpv', // your project ID
    dataset: 'production', // IMPORTANT: use production (not "new")
  },
})