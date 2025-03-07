const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Configuration d'Express pour utiliser EJS
app.set('view engine', 'ejs');

// Définition du dossier contenant les fichiers statiques (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('index');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
const fs = require('fs');

// Route pour afficher la page avec les véhicules dynamiques
app.get('/', (req, res) => {
    fs.readFile('./vehicles.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur lors de la lecture du fichier JSON:", err);
            return res.status(500).send("Erreur serveur");
        }
        const vehicles = JSON.parse(data).vehicles;
        res.render('index', { vehicles });
    });
});