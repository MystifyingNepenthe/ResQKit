import aiMockResponses from "../mock/ai";

export async function sendMockAIMessage(messages) {
  const lastMessage =
    messages[messages.length - 1]?.content?.toLowerCase() || "";

  return new Promise((resolve) => {
    setTimeout(() => {
      let reply = aiMockResponses.default;

      if (lastMessage.includes("arsur")) {
        reply = aiMockResponses.burn;
      } else if (
        lastMessage.includes("tăiat") ||
        lastMessage.includes("taiat") ||
        lastMessage.includes("tăietur")
      ) {
        reply = aiMockResponses.cut;
      } else if (lastMessage.includes("prim ajutor")) {
        reply = aiMockResponses.firstAid;
      } else if (
        lastMessage.includes("resqkit") ||
        lastMessage.includes("dispozitiv")
      ) {
        reply = aiMockResponses.checkResQKit;
      }

      resolve({
        reply,
        degraded: false,
        model: "mock",
      });
    }, 900);
  });
}