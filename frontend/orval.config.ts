import { defineConfig } from 'orval'

export default defineConfig({
	client: {
		input: 'http://localhost:4000/openapi.yaml',
		output: {
			schemas: './src/api/generated'
		}
	}
})
