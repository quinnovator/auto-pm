import { RunnableConfig } from "@langchain/core/runnables";
import { llm } from "../config";
import { AgentState } from "../graph/state";
import { createAgent } from "../lib/create-agent";
import { tavilyTool } from "../tools/tavily-search";
import { runAgentNode } from "../lib/run-agent-node";

export async function researchNode(
  state: typeof AgentState.State,
  config?: RunnableConfig,
) {
  const researchAgent = await createAgent({
    llm,
    tools: [tavilyTool],
    systemMessage:
      "You should provide accurate data for the chart generator to use.",
  });
  
  return runAgentNode({
    state: state,
    agent: researchAgent,
    name: "Researcher",
    config,
  });
}