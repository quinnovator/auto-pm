import { createClient } from "./clients/server";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings();

export async function storeEmbedding(text: string, metadata: any) {
  const supabase = createClient();
  const [embedding] = await embeddings.embedDocuments([text]);

  const { data, error } = await supabase
    .from('embeddings')
    .insert([{
      content: text,
      embedding: JSON.stringify(embedding),
      metadata: metadata
    }]);

  if (error) throw error;
  return data;
}

export async function searchSimilarEmbeddings(query: string, matchThreshold = 0.7, matchCount = 5) {
  const supabase = createClient();
  const [queryEmbedding] = await embeddings.embedDocuments([query]);

  // This assumes you've created an RPC function named 'match_embeddings'
  const { data, error } = await supabase.rpc('match_embeddings', {
    query_embedding: JSON.stringify(queryEmbedding),
    match_threshold: matchThreshold,
    match_count: matchCount
  });

  if (error) throw error;
  return data;
}