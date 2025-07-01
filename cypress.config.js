import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/',
    env: { apiUrl: 'https://serverest.dev' },
    fixturesFolder: false
  }
})
