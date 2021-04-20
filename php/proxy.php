<?php

define('API_TOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjcwMTAxNWJjODE5NWVlMDgzM2I1M2FmYzFhYjNlMjg2ZWJhNGRjOGYyZDc3YzY4YmM5NjJlYjM1YzVhNGI0MGJkMjRmNmM2NWIxZDA4MDYiLCJpYXQiOiIxNjE2OTUxNTc4LjU1MzkwNiIsIm5iZiI6IjE2MTY5NTE1NzguNTUzOTA5IiwiZXhwIjoiMTY0ODQ4NzU3OC41NDczNjgiLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.fhDGh75Nk4rYirB44v6IRmywFYSR3hP2yl8FPVhhlMVlt8g7yhaLlyigLg4HM91ipqstrAHpSB41tOQBE0U0mkbrG362K3PNYTKKYCLFeX74aYaoaBhrXQqr9Xb_GAIP6o17Drf8ngG7m5h2J6ld1FTj7PfNsGwYEZ-fuG9m6_1VDKdRXDLKeqwFW-GYWCB9NcDIZ4eoaaCTDTF6806DoG-D2SLIXqeKGrBaDPnf7g7gRM2RphiU9Li1O127JB9G-MyUOu1CZf79uMPAxWA_3-1yxQjEL6fwfzHFKcec7wqGptS8ER-UWbitTW7kSGSgnIe_Fh3qVXQWdg7WNlIt1TkxnU-Rpboj9YA7KrvVm7t4PTIo8Kdzw8SJJ_nnewASF7CV8wctU7JkhipMvCEz-zQJNFYKp02q-aeKw96x2dAH0wJzmNvvTw6M619jnzUF0wuBFxs1g0jf7D9jvRmmDM_LDhh7I2fawqU5l19NS8GZdnBnkP8V7PI2cEFzxZ0g95r_J6GTi9QBAiYF3EpxZQXso8ovYCFWb9oCG_RD-1ZfUkjJnSPCwAIQ3ZoHmFi1kZHWfPedeU0Fns1NKC8KsfPWo0NNyfEZhtSBiUFgwg2rveSN3_Ur7BhasbhqefHAJ9UX09sTLW9HJwV1ymdZTP_my2siZ775GhHPPx2Rpz0'); 
define('API_URL', 'http://740215875ae1.ngrok.io/api');
define('CERTIFICATE_PATH', 'C:\MAMP\cacert-2021-01-19.pem');

function postUser()
{
    postRequest("/users", $_POST);
}


function postCompany()
{
    postRequest("/companies", $_POST);
}

function postEmployee()
{
    postRequest("/employees", $_POST);
}

function postDocument()
{
    $curlFile = curl_file_create($_FILES["file"]["tmp_name"]);
    $_POST["file"] = $curlFile;

    postRequest("/documents", $_POST);
}


function postRequest($endpoint, $data)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, API_URL . $endpoint);
    curl_setopt($ch, CURLOPT_CAINFO, CERTIFICATE_PATH);
    curl_setopt($ch, CURLOPT_CAPATH, CERTIFICATE_PATH);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_FAILONERROR,true);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: application/json',
        'Authorization: Bearer ' . API_TOKEN
    ));

    $result = curl_exec($ch);

    http_response_code(curl_getinfo($ch, CURLINFO_HTTP_CODE));
    header("Content-Type: application/json");

    if(curl_errno($ch))
    {
        returnErrorFromProxy("Could not load data! Please reach out to bugs.americanlaborcompany@gmail.com. We apologize for the inconvenience.");
    }
    else
    {
        echo $result;
    }
        
    curl_close($ch);
}


function route(string $mode)
{
    switch($mode)
    {
        case "user":
            postUser();
            break;
        case "company":
            postCompany();
            break;
        case "employee":
            postEmployee();
            break;
        case "document":
            postDocument();
            break;
        default:
            break;
    
    }
}

function routeIfPostParamExists()
{

    if($_GET["mode"])
    {
        route($_GET["mode"]);
    }
    else
    {
        returnErrorFromProxy("No URL mode selected!");
    }

}

function returnErrorFromProxy(string $message)
{
    echo "ERROR: " . $message;
}


routeIfPostParamExists();
