<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these values with your actual MySQL server credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "new_sample_db";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



// API endpoint to get all data from the wp_simple_history table
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['api_path'] === 'get_battle_spells') {
    $result = $conn->query("SELECT * FROM battle_spell");

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'No records found.'));
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['api_path'] === 'get_emblems') {
    $result = $conn->query("SELECT * FROM emblems");

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'No records found.'));
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['api_path'] === 'get_equipments') {
    $result = $conn->query("SELECT * FROM equipments");

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'No records found.'));
    }
}

// Close the connection
$conn->close();

?>


