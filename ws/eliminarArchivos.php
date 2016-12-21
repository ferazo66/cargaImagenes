<?php
$file = $_FILES["file"]["name"];
if(!is_dir("assets/"))
	mkdir("assets/", 0777);
if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "assets/".$file))
{
	echo $file;
}