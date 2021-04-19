---
title: Spring Rest Api 강의 ing - 백기선(인프런) 
date: 2021-02-21
tags: 
  - Spring
keywords:
  - Spring Rest Api
  - 백기선
---



REST API 스타일은 6가지가 있음
Uniform Interface를 제외한 나머지 5가지는 http를 사용하더라도 쉽게 달성 가능
 -> 세부 사항을 더 살펴볼 필요가 있다.

self-descriptive message, HATEOAS -> **HAL**을 사용해 링크를 제공하는 방법으로 구현  
 -> 본문에 넣어줌 (헤더에 넣을 수 있지만, 브라우저가 지원 안하는 경우가 있다.)

document는 Spring rest docs를 통해 구현

@EqualsAndHashCode에 보통 id값을 넣어서 자바 Bean을 비교 
x
Spring에서 제공하는 어노테이션은 커스텀이 가능
 **Lombok 어노테이션은 불가** -> 메타어노테이션으로 동작하지 않아서 현재는 줄일 수 있는 방법이 없음.

---
Test Code작성 
 - MocMvc를 사용하면 moc으로 만들어져 있는 dispatch servlet에게 상태를 보내고 응답을 확인할 수 있는 test 만들 수 있다.
 - MocMVC는 웹서버를 만들진 않지만 dispatch servlet을 만들기 때문에 단위테스트라고 보긴 어려움

---
DB저장을 위해 클래스에 @Entity 추가 

## Enum 사용시 주의!
@Enumerated 애노테이션에는 두 가지 EnumType이 존재한다. ORDINAL, STRING - ORDINAL은 enum 속성에 따라 숫자값이 저장된다.
추가로 찾아보니 converter를 사용하는게 좋다고 하는데 이부분은 찾아봐야 한다.

## Mock 객체 생성시 주의
 - @WebMvcTest을 붙이면 Web용 bean만 등록이 되어있기 때문에 repository는 bean으로 등록 안해준다 -> mock에 등록시켜줌 (@MockBean)
 - 이렇게 생성시켜준 Mock은 null값이 들어있어서 하드코딩해줘야 함 -> Stub이라고 한다. => Mockito사용!

## Ref
[JPA 어노테이션 설명 잘 되어있는 블로그](https://siyoon210.tistory.com/25)  
[JPA Enum 매핑 시 주의](https://lng1982.tistory.com/280)

[Mock 개념정리](http://www.incodom.kr/Mock)
[Mock Object에 대한 생각](https://medium.com/@SlackBeck/mock-object%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-85159754b2ac)


---
linkTo() 메소드는 컨트롤러나, 핸들러 메소드로부터 URI 정보 읽어올 때 쓰는 메소드  
(스프링 HATEOAS 프로젝트에서 제공하는 유틸리티라고 생각하면 된다.)

---

json serialize deserialize java
(serialize : Json to POJO / deserialize : POJO to Json)

Jackson : Java를 위한 고성능 JSON 라이브러리. Spring에 기본으로 탑재되어 있다.

spring.jackson.deserialization.fail-on-unknown-properties=true  
추가해서 잘못된 값 입력시 Bad Request 보내도록 했다.

---
Event Validation을 만들어주기 위해 EventValidator생성! 

Test Code 설명은
 1) 주석
 2) Custom Annotation
 보통 2가지 방법 사용

---

@Valid 어노테이션 사용해서 검증 후, Errors로 받은 객체는 response.body에 담아서 바로 전송 불가능  
 -> Errors는 JavaBeanSpec을 준수하고 있는 객체가 아니라 ObjectMapper가 변환 시켜주지 못한다.

Serializer 클래스 만들어서 명시해줄 것임
 -> JsonSerializer 상속 받아서 사용
 -> SpringBoot에서 제공해주는 @JsonComponent사용

---
## JAVA 11 version Tip!!
 - isBlank() = str.trim().isEmpty()
![isBlank 설명 stackOverFlow](api_picture_isBlank.PNG)

---

## Spring Boot Tip!!
 - 몇몇 라이브러리는 스프링 부트가 제공하는 자동 설정이 없기 때문에 의존성만 추가한다고 빈으로 자동으로 등록되지 않는다.

 - 2.3버전 이전에는 Web모듈이 Validation모듈 가져왔는데 2.3버전 이후 Validation 모듈 추가해줘야 한다.

---
## JUnit Tip!!
 - 어노테이션을 사용해 params 값을 주기 위해 JUnitParams 의존성 추가
 - JUnit4 기준으로 예제 실행
[파라미터 테스트를 하는 방법 (Junit5 / JUnitParams) 추가 자료](https://velog.io/@ashesglow/%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-Junit5-JUnitParams)
 -> [더 자바, 애플리케이션을 테스트하는 다양한 방법](https://www.inflearn.com/course/the-java-application-test?inst=86d1fbb8#) 강의 보고 소스 한번 더 공부해봐야 겠다.

---

# HATEOS

## Spring Rest Doc 사용!

# 리소스를 만드는 기능
 - 데이터 + 링크
    - **링크**
        - HREF : URL
        - REL : 현재 리소스와의 관계 표현
            - self : 자기 자신
            - profile : 현재 응답된 문서에 대한 링크
            - update-event
            - query-event
            - ...

## ResourceSupport의 문제
현재 Spring HATEOS에서 제공하는 ResourceSupport 기능 사용
  - @RepresentationModel어노테이션을 추가  
    - 응답 메세지가 event 안에 들어가게 된다
        - ObjectMapper가 mapping하는데 serialization할 때, bean Serializer를 사용 
        -> 기본적으로 필드 이름을 사용한다.
        - 해결방법
            - 1) 똑같은 필드 복사해서 값을 모두 채워준다.
            - 2) **JsonUnwrapped** 사용 : mapping된 부분을 꺼내준다.
                - RepresentationModel 대신 EntityModel를 상속 받아 사용해주면 JsonUnwrapped가 붙어있음  

**EventResource는 bean 등록x -> 매번 필요할 때 마다 convert해서 써야하는 객체


RepresentationModel 사용한 코드
```java
package me.sanghyeok.demoinflearnrestapi.events;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.springframework.hateoas.RepresentationModel;

public class EventResource extends RepresentationModel {
    // extends RepresentationModel을 사용한 코드

    @JsonUnwrapped
    private Event event;

    public EventResource(Event event){
        this.event = event;
    }

    public Event getEvent(){
        return event;
    }

}
```

Resource를 사용한 코드
```java
package me.sanghyeok.demoinflearnrestapi.events;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.EntityModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

public class EventResource extends EntityModel<Event> {
    // extends RepresentationModel을 사용한 코드

    public EventResource(Event event, Link... links) {
        super(event,  links);
        add(linkTo(EventController.class).slash(event.getId()).withSelfRel());
    }
}

```

추가 Tip!!
 - ControllerLinkBuilder -> WebMvcLinkBuilder로 바뀜

## JAVA Tip!!
java 가변인자(일정하지 않은 개수의 파라미터)는 ...으로 받는게 가능
**주의할 점!!**
 **-> 가변인자는 항상 맨 뒤에 와야 한다.**
```java
public void myMethod(String... strings){
    for(String whatever : strings){
            // 전달된 객체를 각각 접근
    }

    // 위의 코드와 동일 각각 접근가능 
    for( int i = 0; i < strings.length; i++){
        // strings[i]형식으로 배열에 각각 접근가능
    }
}
```

이렇게 생성하면 adoc파일들 fommating이 안되어 있음
 -> RestDocMockMvc custom해주는 부분이 필요함.

## Asciidoc

Asciidoc plugin을 통해 REST API 생성
 - 1) asciidoc에 들어있는 adoc파일을 html로 문서화 해준다. 
 - 2) maven-resources-plugin : target/generated-docs/index.html 파일을 static/docs/index.html 로 생성 해 준다.


## SPRING REST API CYCLE
```
 1. Mock 객체를 통해 adoc 파일 생성
 2. asciidoctor-maven-plugin을 통해 html로 문서화
 3. maven-resources-plugin을 사용해 localhost:8080/docs/index.html 실행 가능
```

## Spring test용 DB와 설정 분리
[강의참고](https://www.inflearn.com/course/spring_rest-api/lecture/16432?tab=note&speed=1.5)

---

 - 모든 API는 진입점이 있음
  -> 여기에 해당하는 인덱스를 만듬.  

 - 에러가 발생하면 보통 index로 가는 링크 필요
  -> 여기에 해당하는 link정보 생성해서 주면된다. 

추가 Errors Serialization 문제 해결
[Jackson 라이브러리가 더이상 Array부터 만드는걸 허용하지 않습니다. 관련 내용](https://www.inflearn.com/questions/72123) 

---
### fetchType 을 EAGER로 설정한 이유 ?

1:N 관계 이기때문에 기본 fetch Type은 Lazy 이다.
하지만 Role의 개수가 적기도하고, 매번 권한이 필요하기 때문에 EAGER Fetch 사용
   -> 여기부분 JPA 강의보고 확인해보자

---

# Spring Security
 1. 웹 시큐리티(Filter 기반 시큐리티)
 2. 메소드 시큐리티

## Spring Security 흐름
 1. 사용자가 요청을 보낸다.
    1.1 GET /api/events
 2. Servlet Filter 가 요청을 가로챈다.
 3. Security Filter Interceptor 로 요청을 보낸다.
    3.1 Security Filter를 적용 유무 확인
 4. SecuriyContextHolder에서 인증 정보 확인
    4.1 ThreadLocal (한 쓰레드 내의 공유 저장소 / 한 스레드면 ThreadLocal에 넣어두고 쓰면된다.)
 5. 인증된 사용자가 없음
    - AuthenticationManager
        - 로그인을 시도한다.
        - AuthenticationManager가 사용하는 핵심 Interface
            - UserDetailsService
            - PasswordEncoder
        - 인증방법(다양)
            - BasicAuthentication 사용해서 구현
                - 인증 요청헤더
                - Basic
                - Authentication
                - username
                - password
                - 조합하여 인코딩 한 문자열을 가지고 입력을 받음.
            - UserDetailsService 인터페이스를 사용해서 입력받은 Username 에 해당한 사용자를 DB에서 찾아옴
            - PasswordEncoder를 사용하여 Password가 동일한지 확인.
            - Password가 일치한다면 Authentication 객체 생성후 SecurityContextHolder에 저장
6. 인증된 사용자는 권한 확인
    - AccessDecisionManager
        - 권한 체크
        - Account의 Role을 확인하여 체크를 한다.

---

## SpringSecurity




---

## OAUTH2

Grant Type : Password 사용!
서비스 제공자가 만든 클라이언트에서 사용하는 Grant Type



---