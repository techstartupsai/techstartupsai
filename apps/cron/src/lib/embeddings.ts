import OpenAI from 'openai'

const EMBEDDING_MODEL = 'text-embedding-3-small'
const EMBEDDING_DIMENSIONS = 1536

/*
 * Generates a 1536-dimension embedding vector for the given text using OpenAI.
 */
export async function generateEmbedding(text: string): Promise<{
  vector: number[]
  model: string
  dimensions: number
}> {
  // call the openai embeddings api
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  })

  // guard against an empty response
  const embedding = response.data[0]?.embedding
  if (!embedding) {
    throw new Error('OpenAI returned an empty embeddings response')
  }

  // return the vector with its model metadata
  return {
    vector: embedding,
    model: EMBEDDING_MODEL,
    dimensions: EMBEDDING_DIMENSIONS,
  }
}
