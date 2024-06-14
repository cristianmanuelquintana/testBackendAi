#1
a) Esa información nos indica que uno de los 3 nodos que levantamos hace casi 6 días entro en un loop de reiniciarse. Al momento de la captura estaba esperando el tiempo de gracia para volver a reiniciarse.
b) Que probablemente lleve un tiempo largo reiniciandose ya que lleva 1615 reinicios, con el tiempo de gracia que va aumentando con un tope en 5 min(por la cantidad de reinicios ya podemos suponer que llevo a este tope asi que le faltarían casi 4 minutos para el proximo)
c) Luego de conseguir la descripción del pod abriría el archivo de deployment para arrancar descartando problemas de configuración y luego abriría el log del pod con el mismo enfoque. Si no es problema de configuracion ni de argumentos tendría que debuggear que intenta hacer la aplicación al inciarse.

#2
a) Los deployments son los archivos de configuracion los que nos permiten crear o modificar las instancias de los pods y de las replicas. 
b) Es la unidad basica de k8s. La que pueda estar formada por uno o mas contenedores.
c) Es un objeto de configuración donde se guarda información no confidencial. Por ejemplo un pod podría consumir este objeto como variable de entorno con cierta configuracion para el entorno de prueba y otra distinta para nuestro entorno local.
d) Es una forma de exponer una red para uno o mas pods. Nos permitiria conseguir una abstracción en una aplicación con frontend y backend. Donde el primero pueda hacer peticiones a un endpoint del backend que tenga varias replicas manejadas por k8s, y que esta comunicación sea transparente para el front sin tener que saber a que replica se está dirigiendo. 

#3
NS	.priv	.priv
SOA	.priv	.priv
A	conta.priv	10.0.0.52
A	contb.priv	10.0.0.81
A	contc.priv	10.0.0.11

#4
Lo normal sería implementar un sistema de colas en el que se procesen de a 1000 solicitudes a la vez controlando que no se vuelvan a agregar otras 1000 en menos de un minuto para respetar el limite impuesto por el proveedor de correos. Para lograr esto tenemos varias herramientas como Kafka, RabbitMQ o si queremos usar NodeJs tenemos BullMQ. Las dos primeras soluciones son más robustas y tienen mayor procentaje de adopción, por lo que tienen una comunidad más grande que es util a la hora de solucionar problemas. Para administrar los trabajos fallidos la cola tendría que tener un contador de reintentos. Una vez que un trabajo falla, este volvería a la cola original de los 8000 a espera de volver a ser procesado. Si el mismo vuelve a fallar una determinada cantidad de veces no debería procesarse más y se tendría que levantar alguna alerta para que algun desarrollador o persona de soporte pueda solucionar el mismo asi no queda en un loop infinito. 

#5
a) La temperatura es el parametro con el cual podemos modificar el comportamiento del modelo a la hora de darnos una respuesta. Siendo un extremo la creatividad y el otro la certeza. Normalmente temperatura más alta quiere decir más creativo.
b) Los tokens son la unidad basica de ingreso y egreso en un modelo de lenguaje. Normalmente representan palabras, subpalabras o caracteres que el modelo usa para dividir el input y predecir el output. Al hacer uso de cualquier LLM se suele cruzar este termino cuando una consulta excede la cantidad tokens permitida por el modelo o nuestro usuario.
c) Los documentos de contexto sirven para propocionarle información adicional al modelo asi este puede proporcionar respuestas mas acertadas. Por ejemplo hace unos meses se creo un "bot" usando los custom chatgpt para que analice el DNU con todas las leyes que contenía y que permitiera al usuario hacerle preguntas relacionadas al mismo. 
d) Lo dividiría en dos partes. Prompts de usuarios y la ingeniería de prompts. Las primeras son las instrucciones que le da un usuario al modelo para obtener el resultado que desea. Estas tienen ciertas técnicas que puede se pueden aplicar para lograr que el LLM responda más acorde a lo que uno espera. La segunda sería el resto de la verdadera prompt que encapsula la del usuario final. Esta puede contener ciertas instrucciones como indicarle al LLM que es un experto en programación, podría agregar el contexto del punto c) e incluir las interaciones previas del usuario además del espacio para la petición actual. La ingeniería busca que el usuario pueda obtener los mejores resultados posibles sin necesidad que este escriba las mejores prompts (aunque siempre es recomendable esa practica)

#6 
Como mencione antes, una de las cosas que se pueden incluir en las prompts son los mensajes anterior para que el modelo pueda proveer una mejor respuesta. Esto lo podemos lograr almacenando los mensajes y respuestas en alguna estructura de datos. Por ejemplo, después de cada intereacción podríamos guardar el mensaje del usuario y del modelo en una lista. La proxima vez que el usuario haga una consulta consultariamos la misma y concatenaríamos ambos mensajes antes de la nueva solicitud de tal forma que el modelo pueda distinguir cuales mensajes fueron provenientes del usuario y cuales del LLM. Obviamente esto tendŕia un limite por la cantidad de tokens que se pueda manejar en cada nueva interacción. Al estar agregando el historial limitaríamos la longitud de cada nueva consulta. Esto podríamos solucionarlo resumiendo la conversación anterior para limitar el crecimiento del contexto. Aunque la solución mas sencilla de implementar teniendo una lista sería ir borrando las interacciones más viejas a medida que vaya avanzando la conversación.