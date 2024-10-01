<?php
    $filename = '../05_json/planning.json';

    if (file_exists($filename)) {
        echo file_get_contents($filename);
    } else {
        echo json_encode([]);
    }
?>
