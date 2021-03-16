---
title: CI + SQLite + React를 사용한 게시판 구현
date: 2021-02-26
tags: 
  - Project
keywords:
  - PHP
  - Nginx
  - PHP + Nginx
---



| 분류 | 이름 | 버전 | 
|-----|------|------|
| OS | Ubuntu | 18.04x|
| Language | PHP-fpm | 7.2x|
| Web Server | Nginx | TODO |
| Backend | Codeigniter3 | 3.1 |
| Frontend | React | |
| RDBMS | MySQL | |


cors 해결 방법 

react -> ci 보낼 때 axios를 사용하면 json 형태로 와서 decoding 해줘야 한다.


세션을 사용하기 위해서는 우선 세션 라이브러리 클래스를 로드 해야 한다. 세션은 서비스 전역에서 사용되는 기능성이기 때문에 application/config/autoload.php 파일의 libraries를 아래와 같이 수정한다. 

$autoload['libraries'] = array('session');



