<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    require("SqlConnect.php");

    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data[id]) && isset($data[status]))
    {
        try 
        {
            $dbconnector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $queryCmd = "UPDATE `data` SET `status` = :status WHERE `id` = :id";
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->bindParam(':status', $data[status]);
            $stmt->bindParam(':id', $data[id]);
            $stmt->execute();
            echo json_encode(array('code' => 200));
        }
        catch(PDOException $e)
        {
            echo json_encode(array('code' => 404, 'status' => $e->getMessage()));
        }
    }
    elseif(isset($data[id]) && isset($data[content]))
    {
        try 
        {
            $dbconnector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $queryCmd = "UPDATE data SET content = :content where id = :id";
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->bindParam(':content', $data[content]);
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