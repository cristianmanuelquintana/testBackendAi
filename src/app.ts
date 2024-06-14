import OpenAI from "openai";
import { PaymentQuota, PaymentQuotaStatus, StudentProfile, ExampleProfiles } from "../objects/example.profiles";
import readline from "readline";

const openai = new OpenAI({
  apiKey: "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",
});

// Define the type for conversation messages based on OpenAI API requirements
type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

let conversationHistory: Array<ChatCompletionRequestMessage> = [];

const agentNames = ["Juan", "Maria", "Carlos", "Lucia", "Pedro"];

/**
 * Replaces placeholders in the prompt with actual values.
 *
 * @param {string} prompt The original prompt with placeholders.
 * @param {Record<string, string>} keys The keys and values to replace in the prompt.
 * @returns {string} The final prompt with placeholders replaced by values.
 */
function buildPrompt(prompt: string, keys: Record<string, string>): string {
  return prompt.replace(/{{(.*?)}}/g, (_, key) => keys[key]);
}

/**
 * Constructs the value for the `student_payments` placeholder in the final prompt.
 *
 * @param {Array<PaymentQuota>} payments The student's payment quotas.
 * @returns {string} The value for the `student_payments` placeholder.
 */
function buildStudentPayments(payments: Array<PaymentQuota>): string {
  return payments
    .map(
      (payment) =>
        `- Cuota ${payment.sequence}: (Monto: ${payment.amount}) (Estado: ${payment.status}) ${
          payment.status !== PaymentQuotaStatus.COMPLETE
            ? `(Vencimiento: ${payment.due_date})`
            : ""
        }`
    )
    .join("\n");
}

/**
 * Creates the prompt to be sent to the OpenAI API.
 *
 * @param {StudentProfile} alumno The student's profile.
 * @param {string} consulta The student's query.
 * @param {string} agentName The name of the agent.
 * @returns {string} The final prompt with all placeholders replaced by values.
 */
function createPrompt(alumno: StudentProfile, consulta: string, agentName: string): string {
  const studentPayments = buildStudentPayments(alumno.payments);

  const promptBase = `
    Perfil del alumno:
    - Nombre: {{nombre_alumno}}
    - Edad: {{edad}}
    - Carrera: {{carrera}}
    - Estado Académico: {{estado_academico}}
    
    Plan de pagos:
    {{student_payments}}
    
    Consulta del alumno:
    {{consulta}}
  `;

  const claves = {
    nombre_alumno: alumno.name,
    nombre_agente: agentName,
    edad: alumno.age.toString(),
    carrera: alumno.career,
    estado_academico: alumno.status,
    student_payments: studentPayments,
    consulta: consulta,
  };

  return buildPrompt(promptBase, claves);
}

/**
 * Fetches the response from the OpenAI API based on the conversation history.
 *
 * @returns {Promise<string>} The response from the OpenAI API.
 */
async function obtenerRespuesta(): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: conversationHistory,
    temperature: 1.3,
  });

  if (!completion || !completion.choices || !completion.choices[0].message?.content) {
    throw new Error("Failed to get a valid response from the OpenAI API");
  }

  return completion.choices[0].message.content.trim();
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Ingrese el número de teléfono del alumno(no se olvide el +): ", (telefono) => {
    const alumno = ExampleProfiles.find((profile: { phone: string }) => profile.phone === telefono);

    if (!alumno) {
      console.log("No se encontró un perfil de alumno con ese número de teléfono.");
      rl.close();
      return;
    }

    const agentName = agentNames[Math.floor(Math.random() * agentNames.length)];
    const greeting = `Hola, un gusto conversar contigo ${alumno.name}. Mi nombre es ${agentName}, soy un asesor academico de FRVM, ¿cómo puedo ayudarte hoy?\n`;

    conversationHistory.push({
      role: "system",
      content:
        "You are a helpful assistant that is the voice of the instution and your purpose is to help students with payment related questions, you always have to answer something and can't derive the student to someone else. You can fill in numbers if the information asked by the student wasn't given to you.",
    });
    conversationHistory.push({ role: "user", content: greeting });

    console.log(greeting);

    const askQuestion = async () => {
      rl.question("Ingrese su consulta (o escriba 'salir' para terminar el chat): ", async (consulta) => {
        if (consulta.toLowerCase() === "salir") {
          console.log("Gracias por usar el servicio. ¡Hasta luego!");
          rl.close();
          return;
        }

        const initialPrompt = createPrompt(alumno, consulta, agentName);

        conversationHistory.push({ role: "user", content: initialPrompt });

        try {
          const respuesta = await obtenerRespuesta();

          conversationHistory.push({ role: "assistant", content: respuesta });

          console.log('\n', respuesta, '\n');
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error al obtener la respuesta del modelo:", error.message);
          } else {
            console.error("Error desconocido:", error);
          }
        }

        askQuestion(); 
      });
    };

    askQuestion();
  });
}

main();
