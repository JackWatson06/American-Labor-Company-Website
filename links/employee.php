<?php
    header("Location: https://americanlaborcompany.com/employee");

    $filePath = getcwd() . "/employee_count.txt";
    $file = @fopen($filePath, "c+");

    //File loaded
    if($file)
    {
        $data = fread($file, filesize($filePath));

        $data = intval($data);
        $data++;

        // Delete then flush.
        ftruncate($file, 0);
        rewind($file);
        fwrite($file, $data);
        fflush($file);

        $file = fclose($file);
    }   

    exit();
?>