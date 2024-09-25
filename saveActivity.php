<?php
// Activation des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérification des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    echo "<pre>";
    print_r($_FILES);
    echo "</pre>";

    // Vérification de l'upload de l'image
    if (isset($_FILES['image'])) {
        // Debug: afficher le tableau $_FILES pour voir son contenu
        echo "Tableau des fichiers : ";
        print_r($_FILES['image']); // Affichage des détails de l'upload
        echo "<br>"; // Saut de ligne pour une meilleure lisibilité

        if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            switch ($_FILES['image']['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $message = "Le fichier est trop grand.";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $message = "Aucun fichier téléchargé.";
                    break;
                default:
                    $message = "Erreur inconnue lors de l'upload.";
                    break;
            }
            echo json_encode(['success' => false, 'message' => $message]);
            exit;
        }
    } else {
        // Erreur : aucune image ou problème lors de l'upload
        echo json_encode([
            'success' => false,
            'message' => 'Aucune image téléchargée ou erreur lors de l\'upload.'
        ]);
        exit;
    }

    // Si l'image a été uploadée sans erreur
    if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = './uploads/'; // Changer le dossier de destination
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
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de l\'upload de l\'image.'
            ]);
        }
    }
} else {
    // Requête non valide
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée.'
    ]);
}

echo "<pre>";
print_r($_POST);
print_r($_FILES);
echo "</pre>";
exit;
?>

