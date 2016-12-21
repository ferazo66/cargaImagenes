<?php
$file = $_FILES["file"]["name"];
if($file && unlink($_FILES["file"]["tmp_name"], "assets/".$file))
{
	echo $file;
}
