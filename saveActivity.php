<?php
if (isset($_FILES['image'])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Vérifier si le fichier est une image réelle
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check === false) {
        die("Erreur : Le fichier n'est pas une image.");
    }

    // Vérifier si le fichier existe déjà
    if (file_exists($target_file)) {
        die("Erreur : L'image existe déjà.");
    }

    // Vérifier la taille du fichier
    if ($_FILES["image"]["size"] > 5000000) {
        die("Erreur : La taille de l'image est trop grande.");
    }

    // Autoriser certains formats de fichier
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        die("Erreur : Seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.");
    }

    // Tentative de déplacement du fichier uploadé
    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        die("Erreur lors de l'upload de l'image : " . $_FILES['image']['error']);
    }
} else {
    die("Erreur : Aucune image envoyée.");
}

// Ajouter les détails de l'activité à activities.json
$activity = [
    "titre" => $_POST['titre'],
    "date" => $_POST['date'],
    "description" => $_POST['description'],
    "image" => $target_file
];

$activities_file = 'data/activities.json';
$activities = json_decode(file_get_contents($activities_file), true);
$activities[] = $activity;
file_put_contents($activities_file, json_encode($activities));

echo "Activité ajoutée avec succès !";
?>