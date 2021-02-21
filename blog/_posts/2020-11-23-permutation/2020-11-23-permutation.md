---
title: 순열 정리, 구현
date: 2020-11-23
tags: 
  - Algorithm
keywords:
  - 순열
  - 조합
  - 부분집합
---

이전부터 자주 헷갈렸던 순열, 조합, 부분집합의 개념 정리와 JAVA를 사용해 구현하는 방법을 정리해 보려고 한다.  

1) 대표적인 구현 방법  
2) 각, 방법의 특징    

두가지 사항으로 정리한다.  

# 순열

  - n개의 원소 중, r개를 일렬로 나열하는 수열  
  - 중복 X / 순서 고려

## 1. next_permutation

### 1) 특징
 - 이게 이해하기 제일 어려웠다.... (나만 어렵나...ㅜㅜ)
 - 무작위 순열의 다음 순열을 구해내는 알고리즘
 - 시작 조건 : 오름차순 / 종료 조건 : 내림차순
```
  순서
  1.Find largest index i such that array[i − 1] < array[i].
  (If no such i exists, then this is already the last permutation.)

  2.Find largest index j such that j ≥ i and array[j] > array[i − 1].

  3.Swap array[j] and array[i − 1].

  4.Reverse the suffix starting at array[i].
```

### 2) 구현 코드
```java
public class num1 {
    public static void main(String[] args) {
    	int[] list = new int[]{5,4,3};
    	// #1 시작 조건에 맞게 list 오름차순 정렬 (시작조건)
    	Arrays.sort(list);
    	permutation(list);
    }
    // #2 처음 list값 print 후, 다음 순열 찾음
    public static void permutation(int[] list) {
        int[] curArray = list;
        while (true) {
        	printArray(curArray);
        	curArray = nextPermutation(curArray);
            if (curArray == null) {
                break;
            }
        }
    }
    
    public static int[] nextPermutation(int[] list) {
    	  // #3 수열의 바로 앞 값 보다 큰 값 중 가장 큰 index 찾는다. 
        // (가장 적은 차이로 순서를 바꾸기 위해서 가장 큰 index를 찾음) 
        int i = list.length -1;
        while(i>0 && list[i-1] >= list[i])
        	i--;
        
        // #6 list가 내림차순으로 정렬되어 있으면 순열을 끝까지 찾은 것 (종료조건)
        if(i<=0)
        	return null;
        
        int j = list.length -1;
        // #4 다음 수열의 특징 : 이전 순열보다 값이 큼
        // -> list[i-1] < list[j] 값을 찾고, 값을 바꿔준다.
        while(list[j] <= list[i-1])
        	j--;
        
        int temp = list[i-1];
        list[i - 1] = list[j];
        list[j] = temp;
        // #5 a[i] 이후 부분을 오름차순으로 셋팅 
        j= list.length-1;
        while (i < j) {
            temp = list[i];
            list[i] = list[j];
            list[j] = temp;
            i++;
            j--;
        }
        
        return list;
    }
    
    public static void printArray(int[] array) {
    	for(int i=0;i<array.length;i++)
    		System.out.print(array[i] + " ");
    	System.out.println();
    }
    
}

```
### 3) 코드 설명

1. 시작 조건에 맞게 list 오름차순 정렬 (시작조건)
2. 처음 list값 print 후, 다음 순열 찾음
3. 수열의 바로 앞 값 보다 큰 값 중 가장 큰 index 찾는다.  
  (가장 적은 차이로 순서를 바꾸기 위해서 가장 큰 index를 찾음)
4. 다음 수열의 특징 : 이전 순열보다 값이 큼 -> list[i-1] < list[j] 값을 찾고, 값을 바꿔준다.
5. a[i] 이후 부분을 오름차순으로 셋팅 
6. list가 내림차순으로 정렬되어 있으면 순열을 끝까지 찾은 것 (종료조건)

### 4) 코드 출력값
```
3 4 5 
3 5 4 
4 3 5 
4 5 3 
5 3 4 
5 4 3 

```

## 2. Swap

### 1) 특징
 - 순열의 순서가 보장되지 않는다. (사전식 X)


### 2) 구현 코드
```java
public class Main {
  public static void main(String[] args) {
  	int[] arr = {1,2,3};
  	permutation(arr,0,3,3);
  	System.out.println(Arrays.toString(arr));
  }

  static void permutation(int[] arr, int depth, int n, int r) {
  	if (depth == r) {
  		arrPrint(arr,r);
  		return;
  	}
  	for (int i=depth; i<n; i++) {
      // #1
  		swap(arr, depth, i);
      // #2
  		permutation(arr, depth + 1, n, r);
      // #3
     	swap(arr, depth, i);
  	}
  }

  static void arrPrint(int[] arr, int r) {
    for (int i=0 ; i<r; i++)
    	System.out.print(arr[i] + " ");
    System.out.println();
  }

  static void swap(int[] arr, int depth, int i) {
    int temp = arr[depth];
    arr[depth] = arr[i];
    arr[i] = temp;
  }
}
```
### 3) 코드 설명

1. 배열의 첫번째 값부터 하나씩 바꾸면서 swap
2. depth를 기준(Inex)으로 depth보다 작은 인데스 값들은 고정, depth보다 큰 값들을 가지고 swap
3. 재귀함수가 종료조건에 의해 return되면 swap을 한번 더 해줘서 이전 상태 유지


### 4) 코드 출력값
```
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 2 1 
3 1 2 
[1, 2, 3]
```

## 3. Visit Index 사용

### 1) 특징
 - DFS, 재귀 함수


### 2) 구현 코드

```java
public class Main {
	public static void main(String[] args) {
	    int n = 3;
	    int[] arr = {1, 2, 3};
      // #1
	    int[] output = new int[n];
	    boolean[] visited = new boolean[n];
	    perm(arr, output, visited, 0, n, 2);
	    System.out.println();
	}

	static void perm(int[] arr, int[] output, boolean[] visited, int depth, int n, int r) {
	    if (depth == r) {
	        print(output, r);
	        return;
	    }

	    for (int i = 0; i < n; i++) {
	        if (visited[i] != true) {
	            visited[i] = true;
              output[depth] = arr[i];
              // #2
	            perm(arr, output, visited, depth + 1, n, r);
              // #3
	            visited[i] = false;
	        }
	    }
	}

	static void print(int[] arr, int r) {
	    for (int i = 0; i < r; i++)
	        System.out.print(arr[i] + " ");
	    System.out.println();
	}
	
}

```
### 3) 코드 설명
1. output : 코드 출력 값 / visited : 방문 여부 체크
2. depth -> output 길이라고 생각
3. 방문 여부 false로 체크 -> 모든 인덱스 방문
   

### 4) 코드 출력값 
```
1 2 
1 3 
2 1 
2 3 
3 1 
3 2 
```

## 관련 백준 문제
> n과m 시리즈 0 ~ 12

# Reference
[BaaaaaaaarkingDog님 블로그](https://blog.encrypted.gg/945?category=773649)  
[뱀귤님 블로그](https://bcp0109.tistory.com/entry/%EC%88%9C%EC%97%B4-Permutation-Java?category=848939)  
[junhok82님 블로그](https://velog.io/@junhok82/>Java%EB%A1%9C-%EC%88%9C%EC%97%B4Permutation-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0>)  
[Crocus님 블로그](https://www.crocus.co.kr/1240)