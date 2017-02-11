<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    require("SqlConnect.php");

    //網址解析
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    //預設查詢指令
    $queryCmd = 'SELECT * FROM `data`';

    switch ($request[0]) {
        case 'active':
            //Select where status = 0
            $queryCmd.=' where status = 0';
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->execute();
            $result = $stmt->fetchAll();
            echo json_encode($result);
            break;
        case 'complete':
            //Select where status = 1
            $queryCmd.=' where status = 1';
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->execute();
            $result = $stmt->fetchAll();
            echo json_encode($result);
            break;
        default:
            //Default select all
            $stmt = $dbconnector->prepare($queryCmd);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;
    }
    $dbconnector = null;
?>