---
title: nginx controller 경로 안타는 문제
date: 2021-03-02
tags: 
  - nginx
keywords:
  - PHP
---
nginx + CI3 개발환경을 구축하면서 생긴 문제점이다.


```
if (!-e $request_filename ) {
    rewrite ^(.*)$ /index.php last;
}
```