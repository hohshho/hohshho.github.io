---
title: JAVA Comparable, Comparator 사용
date: 2020-11-24
tags: 
  - JAVA
keywords:
  - Comparable
  - Comparator
---

# Comparable
 > 클래스의 기본 정렬 기준을 설정하는 인터페이스


## 1) 특징
 - Comparable 인터페이스 상속 후, compareTo 메소드 오버라이딩
 - compareTo메소드 리턴 값은 음수, 0, 양수가 될 수 있다. **음수가 리턴되면 인자의 순서가 아래로 이동**
 - 자바에서 제공되는 정렬이 가능한 클래스는 모두 Comparable 클래스로 구현되어 있음
 
## 2) 구현 코드

# Comparator
 > 기본 정렬과 다르게 정렬하고 싶을 때 이용하는 클래스
## 1) 특징
 - 보통 구현 되어있는 sort함수의 2번째 인자로 Comparator 타입을 받아(익명함수) compare 메소드 오버라이딩을 통해 배열 정렬 순서 재정의
 - 보통 한번 사용하고 사용하지 않기 때문에 익명객체로 만듬

## 2) 구현 코드

# 관련 백준 문제
 - 11650, 11651, 1181, 10814