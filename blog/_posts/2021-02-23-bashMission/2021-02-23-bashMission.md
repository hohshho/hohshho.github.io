---
title: bash 문제 풀이
date: 2021-02-23
tags: 
  - Linux
keywords:
  - linux
  - Linux
---

bash 20문제 풀이

## 풀이

1. 현재 자기신의 pc(linux기준)의 cpu모델명, Os 종류 및 버전, kernel 버전을 출력하시오.

```bash
cat /proc/cpuinfo | egrep  'model name'
cat /etc/issue
uname -r
```

2. 매주 일요일, 새벽4시 30분과 낮12시 30분에, /tmp/* 를 삭제하는 crontab 
예) * * * * * 실행문

```bash
cat <(crontab -l) <(echo "30 4,12 * * * rm /tmp/*") | crontab
crontab -l
```

3. 정수인자 2개를 받아 인자 개수 검증 후 4칙연산별 함수를 구현하여 결과값을 모두 

```bash
function add(){
	let value=$1+$2
	echo "$1 + $2 : ${value}"
}

function minus(){
	let value=$1-$2
	echo "$1 - $2 : ${value}"
}

function multiply(){
	let value=$1*$2
	echo "$1 * $2 : ${value}"
}

function divide(){
	let value=$1/$2
	echo "$1 / $2 : ${value}"
}

add $1 $2
minus $1 $2
multiply $1 $2
divide $1 $2
```

4. 2초마다 현재시간을 출력하는 스크립트를 작성하세요.

(3번 실행되도록 작성)

```bash
number=0

while [ $number -le 2 ]
do
	date
	((number++))
	sleep 2
done
```

5. 첨부파일 lastlog를 이용하여 한번도 로그인한 적 없는 사용자를 삭제하는 명령어를 문자열로 아래와 같이 출력.

```bash
while read A B C D E F G H I
do
	if [[ "$B" =~ "**Never" ]]; then
		echo "userdel -r " $A
	fi
done < lastlog
```

6. 첨부파일 lastlog를 이용하여 로그인한 적 없는 사용자를 제외하고 년 월 일 시간 사용자계정 순서로 아래와 같이 출력 i

```bash
while read A B C D E F G H I
do
	if [[ "$B" =~ "pts" ]]; then
		echo ${I:0:-1} $E $F $G $A
	fi
done < lastlog
```

7. 첨부파일 lastlog를 이용하여 ntp와 firenwo user 라인사이에 ‘end of system user’라인 삽입.

```bash
sed -i'' -r -e "/ntp/a\end of system user" lastlog
cat lastlog
```

8. 첨부파일 checkpassword를 이용하여 09:59:57부터 10:21:45까지의 라인만 출력

```bash
cat checkpassword | awk '/[9]:59:5[7-9]/'
cat checkpassword | awk '/[10]:[0-1][0-9]:[0-5][0-9]/'
cat checkpassword | awk '/[10]:2[0-1]:[0-3][0-9]/'
cat checkpassword | awk '/[10]:21:4[0-5]/'
```

9.  첨부파일 checkpassword를 이용하여 121.156.118.254를 pop3.mailplug.co.kr로, 14.36.253.67는 office.ip.wiro.kr로 치환하여 출력

```bash
cat checkpassword | sed 's/121.156.118.254/pop3.mailplug.co.kr/g' | sed 's/14.36.253.67/office.ip.wiro.kr/g' checkpassword
```

10. 첨부파일 maillog를 이용하여 root@ma10.mailplug.co.kr에서 수신된 메일의 수를 출력

```bash
index=0

while read line
do
	if [[ "$line" =~ "from <root@ma10.mailplug.co.kr>" ]]; then
		let value=$index+1
		index=$value
	fi
done < maillog

echo $index
```

11. 첨부파일 maillog를 이용하여 시간별 총 용량만 아래와 같이 출력(bytes)

```bash
while read time byte
do
	echo "$time $byte"
done < maillog | grep bytes | awk '{print $3":"$11}' | awk -F ":" '{arr[$1]+=$4} END { for (i in arr) {print i "\t" arr[i]}}' | sort | awk '{ if($1~"(0[0-9])") {sub(/0/,"")} print $1 "시\t" $2}'
```

12. 첨부파일 conf를 이용하여 ; 로된 주석라인과 공백라인을 제외한 라인 출력

```bash
cat conf | egrep -v ^[[:space:]]*$ | grep -v ";"
```

13. ps 명령어를 이용하여 pid값이 낮은순에서 높은순으로 정렬하여 출력

```bash
ps -ef --sort=+pid 
```

14. 첨부파일 nginx를 이용하여 접근을 한 국가별 카운트와 국가명 출력.

```bash
while read A B C D E F line
do
	geoiplookup $F >> ip
done < nginx

grep '' ip | awk '{print $1,$2,$3,$4,$5,$6,$7}' | sort | uniq -c > 14result
cat 14result
rm ip
```

15. 첨부파일 nginx를 이용하여 3번 이상 접근한 국가별 카운트와 국가명 출력

```bash
cat 14result | awk '{if ($1>3) {print $0}}'
```

16. 반복문을 이용하여 1M의 용량을 가진 파일부터 10M까지의 총 10개 파일 생성(1M씩 증가)

```bash
for time in {01..10}
do
	truncate -s ${time}M ./${time}file
done

find ./ -name "*file"
```

17. 16번에서 생성한 파일 중 5M이상의 파일의 생성시간을 2017년 12월 31일로 변경

```bash
find ./ -type f -size +5M -exec touch -t "201712310000" {} \;
```

18. 17번에서 만든 파일 중 2017년 12월 31일 이후에 만들어진 파일을 찾아 해당파일명.new로 변경

```bash
find -type f -newermt '2017-12-31' | grep file | xargs rename 's/file/file.new/'
```

19. 아래 그림을 test.c 파일로 작성 후 result.exe란 파일로 컴파일하여 실행하고 출력값을 test.txt로 저장

```bash
gcc -o result test.c
./result > test.txt
echo "test.txt 파일 내용"
cat test.txt
```

20. 121.156.118.15서버의 오픈 된 포트를 확인 후 해당 포트로 통신이 가능한지 모니터링하는 스크립트를 작성

```bash
while :
do
	nmap -sT 121.156.118.15
	sleep 5
done
```

모든 bash 파일 실행

result.bash
```bash
for i in {1..19}
do
	bash $i.bash 5 5
	echo " "
done
rm 01file.new 02file.new 03file.new 04file.new 05file.new 06file 07file 08file 09file 10file

bash 20.bash
```

## 배운 부분

2번
 - 매주 일요일 부분을 빠트림

6번
 - Window와 Linux는 개행 방식이 다르다.

|window|Unix(Linux 및 Mac)|
|------|-------|
| \r\n | \n |

**vscode같은 곳에서 연결해서 사용한다면 관련된 설정 해줘야 한다.**

17번
 - 문제를 보면 5M이상임. -size +4M으로 작성해야 한다.

주의할점
 - dd 명령어 사용 시 input / output에 주의해라!
 - chown 명령어 사용 시 -R 옵션 줄 때 ./* 같이 경로를 정확히 사용 (/ 이렇게 주면 큰일난다.)

중요한 명령어와 개념
 - find, ls, du, awk, sed, free, chown, chmod, 리눅스 권한부분은 상당히 중요!