import { createServer } from "node:http";

import {
  BuiltInAgent,
  CopilotRuntime,
} from "@copilotkit/runtime/v2";

import {
  createCopilotNodeListener,
} from "@copilotkit/runtime/v2/node";

import { createOpenAI } from "@ai-sdk/openai";


const ollama = createOpenAI({
  baseURL: "http://127.0.0.1:11434/v1",
  apiKey: "ollama",
});


const agent = new BuiltInAgent({
  model: ollama.chat("llama3.1:8b"),

  prompt: `
Ești ResQ AI, asistentul aplicației ResQKit.

Răspunde în limba română.
Răspunde clar și concis.
Ajută utilizatorul să folosească aplicația ResQKit.

Nu pretinde că ai acces la informații despre dispozitiv,
vehicul sau senzori dacă acestea nu ți-au fost furnizate.
`,
});


const runtime = new CopilotRuntime({
  agents: {
    default: agent,
  },
});


const port = 8200;

createServer(
  createCopilotNodeListener({
    runtime,
    basePath: "/api/copilotkit",
    cors: true,
  })
).listen(port, "0.0.0.0", () => {
  console.log(
    `ResQ AI Runtime: http://localhost:${port}/api/copilotkit`
  );
});