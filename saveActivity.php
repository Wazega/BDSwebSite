<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier si tous les champs sont envoyés
    if (!empty($_POST['titre']) && !empty($_POST['date']) && !empty($_POST['description']) && !empty($_FILES['image'])) {
        $titre = $_POST['titre'];
        $date = $_POST['date'];
        $description = $_POST['description'];
        $image = $_FILES['image'];

        // Sauvegarder l'image sur le serveur
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($image["name"]);
        if (move_uploaded_file($image["tmp_name"], $target_file)) {
            // Sauvegarder les informations dans un fichier JSON ou une base de données
            $activity = [
                'id' => uniqid(),  // ID unique pour chaque activité
                'titre' => $titre,
                'date' => $date,
                'description' => $description,
                'imagePath' => $target_file,
            ];

            // Sauvegarder dans un fichier JSON
            $activities = json_decode(file_get_contents('activities.json'), true);
            $activities[] = $activity;
            file_put_contents('activities.json', json_encode($activities));

            // Retourner une réponse JSON au client
            echo json_encode(['status' => 'success', 'activity' => $activity]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'upload de l\'image']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Tous les champs sont obligatoires']);
    }
}
?>
