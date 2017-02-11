<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    require("SqlConnect.php");

    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data[id]))
    {
        try 
        {
            $dbconnector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $queryCmd = "DELETE FROM `data` WHERE `id` = :id";
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->bindParam(':id', $data[id]);
            $stmt->execute();
            echo json_encode(array('code' => 200));
        }
        catch(PDOException $e)
        {
            echo json_encode(array('code' => 404, 'status' => $e->getMessage()));
        }
    }
    $dbconnector = null;
?>