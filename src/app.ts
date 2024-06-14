import OpenAI from "openai";
import { PaymentQuota, PaymentQuotaStatus, StudentProfile, ExampleProfiles } from "../objects/example.profiles";
import readline from "readline";

const openai = new OpenAI({
  apiKey: "insertekey",
});


type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

let conversationHistory: Array<ChatCompletionRequestMessage> = [];

const agentNames = ["Cristian", "Manuel", "Martin", "Lucia", "Sebastian"];

/**
 * Construye el prompt final con las claves y valores dados.
 *
 * Cada clave se denota como `{clave}` en el prompt y se reemplaza por el valor correspondiente.
 *
 * @param {string} prompt El prompt original con las claves provistas.
 * @param {Record<string, string>} keys Las claves y valores a reemplazar en el prompt.
 *
 * @returns {string} El prompt final con las claves reemplazadas por los valores.
 */
function buildPrompt(prompt: string, keys: Record<string, string>): string {
  return prompt.replace(/{{(.*?)}}/g, (_, key) => keys[key]);
}

/**
 * Construye el valor de la clave `student_payments` para el prompt final.
 *
 * Si la cuota esta completada, no se agrega la fecha de vencimiento.
 *
 * @param {Array<PaymentQuota>} payments Las cuotas del alumno.
 *
 * @returns {string} El valor de la clave `student_payments` para el prompt final.
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
 * Arma el prompt con la informacion del usuario
 *
 * @param {StudentProfile} alumno 
 * @param {string} consulta 
 * @param {string} agentName 
 * @returns {string} consulta con los valores reemplazados
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
 * Obtiene la respuesta de la API usando el historial de conversacion
 *
 * @returns {Promise<string>} la repuesta de OpenAI
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
