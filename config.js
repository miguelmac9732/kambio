// Configuración de Kambio. Pega aquí el bloque firebaseConfig de tu proyecto de Firebase.
// Estos datos no son secretos: identifican tu proyecto. La seguridad la dan las reglas de Firestore.
window.KAMBIO_CONFIG = {
  firebase: {
    apiKey: "PEGA_AQUI",
    authDomain: "PEGA_AQUI",
    projectId: "PEGA_AQUI",
    storageBucket: "PEGA_AQUI",
    messagingSenderId: "PEGA_AQUI",
    appId: "PEGA_AQUI"
  },
  // Modelo de IA para analizar fotos y sugerir comidas (Gemini, nivel gratuito)
  model: "gemini-2.5-flash"
};
