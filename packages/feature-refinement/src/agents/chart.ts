import { AgentState } from "../graph/state";
import { createAgent } from "../lib/create-agent";
import { runAgentNode } from "../lib/run-agent-node";
import { llm } from "../config";

export async function chartNode(state: typeof AgentState.State) {
  const chartAgent = await createAgent({
    llm,
    tools: [],
    systemMessage: "Any charts you display will be visible by the user.",
  });
  
  return runAgentNode({
    state: state,
    agent: chartAgent,
    name: "ChartGenerator",
  });
}