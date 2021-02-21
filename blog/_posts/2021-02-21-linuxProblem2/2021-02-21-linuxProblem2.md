---
title: Linux 문제 풀이2
date: 2021-02-21
tags: 
  - Linux
keywords:
  - linux
  - Linux
---

1.소유자가 george이고 그룹이 others일때 data파일의 소유자와 그룹을 동시에 변경하시오.

```bash
$ chown georage:others data
```

2.현재 로그인한 사용자의 목록에서 2016­01­07에 접속한 사용자를 출력하시오.

```bash
$ who | grep '2016-01-07'
```

3.접근권한이 755인 data 디렉토리를 생성하시오(명령어 1개 이용).

```bash
$ mkdir -m 755 data
```

4.현재 디렉토리에서 링크파일만 찾는 lnfind란 alias를 생성하시오.

```bash
$ alias lnfind='find ./ -type l'
```

5.현재 디렉토리에서 24시간 내에 수정된 파일을 찾으시오.

```bash
$ find ./ -mtime -1
```

6.현재 디렉토리에서 test로 시작하는 디렉토리만 찾아 삭제하시오.

```bash
$ rm -r `find -name 'test*' -type d`
```

7.ssh를 이용하여 kumquat란 서버에 /test2란 디렉토리를 생성하시오.

```bash
$ ssh root@kumquat mkdir /test2
```

8.test1과 test2의 내용을 비교하는 명령어를 작성하시오.

```bash
$ diff test1 test2
```

9.test1 test2 test3을 리다이렉트를 이용하여 test4의 파일로 합치시오.

```bash
$ cat test1 test2 test3 > test4
```

10.test5 파일의 마지막 10개의 행을 출력하시오.

```bash
$ tail test5
```

11./etc/group과 /etc/passwd에서 root가 있는 라인의 개수를 출력하시오.

```bash
$ grep -c 'root' /etc/group/* /etc/etc/password/*
```

12.test6파일에서 시작문자가 a, 마지막 문자가 z로 끝나는 문장을 출력하시오.

```bash
$ grep -E '^a.*z$' test 6
```

13.test6파일에서 mail이 나오는 행과 plug가 나오는 행 사이의 모든 행을 출력하시오.

```bash
$ sed -e '/mail/, /plug/' test6
```

14.test7파일을 gzip으로 압축하시오.

```bash
$ gzip test7
```

15.test8파일의 가장 긴 줄의 길이를 출력하시오.

```bash
$ wc -L test8
```

16.vi ex에서 10행부터 파일의 끝까지를 test9로 저장하시오.

```bash
:10,$ w test9
```

17.vi ex에서 help 또는 Help라는 단어를 모두 HELP로 변경하시오.

```bash
:%s/[Hh]elp/HELP/g
```

18.dd를 사용하여 블록사이즈가 2바이트이고 10블록으로 null(/dev/zero)문자로 채워진 test10파일을 생성하시오.

```bash
$ dd if=/dev/zero of=test10 bs=2 count=10
```

19.test11파일의 3번째 필드를 기준으로 정렬하시오.

```bash
$ sort -k 3 test11
```

20.test12파일을 역순으로 정렬하고 중복되는 라인을 제거하고 출력하시오.

```bash
$ sort -ur test12
```

21.월요일마다 새벽 4시 30분에 /bin/date를 실행하는 cron문을 작성하시오.

```bash
$ 30 4 * * 1 /bin/date
```

22.최근에 사용한 명령 20개를 출력하시오.

```bash
$ history 20
```

23.cut명령어로 test14파일의 "_"를 구분자로 지정하여 두번째 필드를 출력하시오.

```bash
$ cut -d"_" -f2
```

24.touch명령어를 이용하여 test15파일을 2016년 1월 1일로 변경하시오.

```bash
$ touch -t 201601010000 test15
```

25.nginx프로세스에 대한 정보를 출력하시오.

```bash
$ ps -ef | grep nginx
```

26.2342의 pid를 가진 프로세스를 종료하시오.

```bash
$ kill -9 2342
```

27.ls를 백그라운드로 동작시키시오.

```bash
$ ls &
```

28.백그라운듸 작업목록을 출력하시오.

```bash
$ jobs
```

29.test16의 파일을 test.tar로 압축하시오.

```bash
$ tar -cvf test.tar test16
```

30.일정한 크기를 가진 여러 개의 작은 파일로 분할하는 명령어를 이용하여 test17파일을 20행씩 분할하시오.

```bash
$ split -l 20 test17
```

31.memory의 상세정보를 볼수있는 파일의 위치를 작성하시오.

```bash
$ which free

=> /usr/bin/free
```

32.명령어의 위치를 찾을 수 있는 명령어를 작성하시오.

```bash
$ which
$ whereis
```

33.60초동안 대기하는 명령어를 작성하시오.

```bash
$ sleep 60
```

34./dev/sda5를 /mnt에 마운트하는 명령어를 작성하시오.

```bash
$ mount /dev/sda5 /mnt
```

35.작업 중인 터미널창이 종료 되더라도 실행 중인 프로세스를 백그라운드 프로세스로 계속 작업할 수 있도록 하는 명령어를 작성하시오.

```bash
$ nohup {실행}&
```


36.apt­get 명령이 패키지 관련 정보를 확인하기 위해 참조하는 파일의 위치를 작성하시오.

```bash
$ /etc/apt/sources.list
```

37.yum을 이용하여 nginx 패키지를 제거하는 명령어를 작성하시오.

```bash
$ yum remove nginx
```

38.커널에 로드되어 있는 모듈을 확인하는 명령어를 작성하시오.

```bash
$ lsmod
```

39.현재 파일시스템들의 사용량을 MB단위로 출력하시오.

```bash
$ df -m
```

40./home/test18읠 디렉토리의 사용량을 KB단위로 출력하시오.

```bash
$ du -k ./home/test18
```

41.awk를 이용하여 test19파일의 필드 개수를 출력하시오.

```bash
$ awk '{print NF}' test19
```

42.awk를 이용하여 test20파일의 "_"를 구분자로 하는 첫번째와 세번째 필드를 출력하시오.

```bash
$ awk -F_ '{print $1, $3}' test20
```

43.cat nofile의 표준에러를 표준출력으로 리다이렉트하시오.

```bash
$ awk -F_ '{print $1, $3}' test19
```

44.basename /home/mkel/bin/test.sh 의 결과값을 작성하시오.

```bash
$ test.sh
```

45.test21의 계정의 로그인 쉘을 sh로 변경하시오.

```bash
$ vi /etc/passwd

test21의 7번째 필드 값을 sh로 변경
```

46.시스템을 부팅 시 자동으로 마운트되게 하기 위해 설정해야 하는 파일의 위치를 작성하시오.

```bash
/etc/fstab
```

47.호스트끼리 메일 메시지를 주고받기 위한 간단하고 확장성이 있는 프롤토콜은 무엇인가?

```bash
$ SMTP(Simple Mail Transfer Protocol) 프로토콜
```

48.mailplug.co.kr의 DNS 질의를 할 수 있는 명령어를 작성하시오.

```bash
$ nslookup mailplug.co.kr
```

49.listen되고 있는 포트의 네트워크 정보상태를 출력하시오.

```bash
$ netstat -tnlp
```

50.bash에서 2MB보다 큰 파일을 만들지 못하게 하는 명령어를 작성하시오.

```bash
$ ulimit -f 2000
```

