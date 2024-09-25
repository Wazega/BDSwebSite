<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérification des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérification de l'upload de l'image
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '04_Image/';
        $imageName = basename($_FILES['image']['name']);
        $uploadFilePath = $uploadDir . $imageName;

        // Déplacement du fichier téléchargé
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFilePath)) {
            // Récupération des autres données du formulaire
            $titre = htmlspecialchars($_POST['titre']);
            $date = htmlspecialchars($_POST['date']);
            $description = htmlspecialchars($_POST['description']);

            // Chemin relatif de l'image
            $imagePath = $uploadFilePath;

            // Réponse JSON
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Activité ajoutée avec succès !',
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'imagePath' => $imagePath
            ]);
        } else {
            // Erreur lors de l'upload de l'image
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de l\'upload de l\'image.'
            ]);
        }
    } else {
        // Erreur : aucune image ou problème lors de l'upload
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Aucune image téléchargée ou erreur lors de l\'upload.'
        ]);
    }
} else {
    // Requête non valide
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée.'
    ]);
}
?>
