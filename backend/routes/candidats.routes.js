const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assure-toi que ce fichier connecte bien à ta base MySQL

// Créer un candidat
router.post('/candidats', (req, res) => {
    const {
        numElecteur,
        email,
        telephone,
        partiPolitique,
        slogan,
        photo,
        couleur1,
        couleur2,
        couleur3,
        urlInfo,
        codeSecurite
    } = req.body;

    const query = `
        INSERT INTO candidat 
        (numElecteur, email, telephone, partiPolitique, slogan, photo, couleur1, couleur2, couleur3, urlInfo, codeSecurite) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
        numElecteur, email, telephone, partiPolitique, slogan, photo,
        couleur1, couleur2, couleur3, urlInfo, codeSecurite
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du candidat', error: err });
        }
        res.status(201).json({ message: 'Candidat ajouté avec succès', id: numElecteur });
    });
});

// Lire tous les candidats
router.get('/candidats', (req, res) => {
    const query = 'SELECT * FROM candidats';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des candidats', error: err });
        }
        res.json(results);
    });
});

// Mettre à jour un candidat
router.put('/candidats/:numElecteur', (req, res) => {
    const { numElecteur } = req.params;
    const {
        email, telephone, partiPolitique, slogan, photo,
        couleur1, couleur2, couleur3, urlInfo, codeSecurite
    } = req.body;

    const query = `
        UPDATE candidats 
        SET email = ?, telephone = ?, partiPolitique = ?, slogan = ?, photo = ?, 
            couleur1 = ?, couleur2 = ?, couleur3 = ?, urlInfo = ?, codeSecurite = ?
        WHERE numElecteur = ?`;

    db.query(query, [
        email, telephone, partiPolitique, slogan, photo,
        couleur1, couleur2, couleur3, urlInfo, codeSecurite, numElecteur
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour du candidat', error: err });
        }
        res.json({ message: 'Candidat mis à jour avec succès' });
    });
});

// Supprimer un candidat
router.delete('/candidats/:numElecteur', (req, res) => {
    const { numElecteur } = req.params;
    const query = 'DELETE FROM candidats WHERE numElecteur = ?';

    db.query(query, [numElecteur], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la suppression du candidat', error: err });
        }
        res.json({ message: 'Candidat supprimé avec succès' });
    });
});

module.exports = router;
