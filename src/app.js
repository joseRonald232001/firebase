require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

// Configurar Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Endpoint para obtener todos los documentos
app.get('/api/items', async (req, res) => {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para agregar un nuevo documento
app.post('/api/items', async (req, res) => {
  try {
    const data = req.body;
    const newDoc = await db.collection('items').add(data);
    res.status(201).json({ id: newDoc.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const db = admin.firestore();


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get('/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'Camiseta', precio: 19.99, descripcion: 'Camiseta de algodón de alta calidad' },
    { id: 2, nombre: 'Pantalón', precio: 39.99, descripcion: 'Pantalón de mezclilla cómodo y resistente' },
    { id: 3, nombre: 'Zapatos', precio: 59.99, descripcion: 'Zapatos deportivos para todo tipo de clima' }
  ];

  res.json({ productos });
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
