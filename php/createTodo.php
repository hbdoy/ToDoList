<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    require("SqlConnect.php");

    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data[content]))
    {
        try 
        {
            $dbconnector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $queryCmd = "
                INSERT INTO `data` (content, status, time)
                VALUES (:content, '0', Now())";
            $queryCmd_id = "
                SELECT MAX(id) AS id FROM data";
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt_id = $dbconnector->prepare($queryCmd_id);
            $stmt->bindParam(':content', $data[content]);
            $stmt->execute();
            $stmt_id->execute();
            $id = $stmt_id->fetch(PDO::FETCH_ASSOC);
            echo json_encode(array('code' => 200, 'id' => $id[id]));
        }
        catch(PDOException $e)
        {
            echo json_encode(array('code' => 404, 'status' => $e->getMessage()));
        }
    }
    $dbconnector = null;
?>