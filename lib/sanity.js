import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'z81otgnr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})