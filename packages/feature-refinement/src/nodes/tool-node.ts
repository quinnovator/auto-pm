import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tavilyTool } from "../tools/tavily-search";
import { AgentState } from "../graph/state";

const tools = [tavilyTool];

export const toolNode = new ToolNode<typeof AgentState.State>(tools);