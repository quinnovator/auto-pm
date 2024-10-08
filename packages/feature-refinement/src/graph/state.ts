import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph/web";

// This defines the object that is passed between each node
// in the graph. We will create different nodes for each agent and tool
export const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x: BaseMessage[], y: BaseMessage | BaseMessage[]) => x.concat(y),
  }),
  sender: Annotation<string>({
    reducer: (x: string | undefined, y: string | undefined): string => y ?? x ?? "user",
    default: (): string => "user",
  }),
})