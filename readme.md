#LitmusBioLabs XDKAppController

![icon](https://raw.githubusercontent.com/wjuni/W5-Intel-IoT/master/images/icon.png)

#시스템 소개

## 1. 검사 이유

## 2. 기존 검사법

## 3. 새로운 검사 시스템의 개발

## 4. 논문 링크
    개발된 시스템에 대해 더 자세히 알고 싶으신 분은 Sensor 학술지에 발표한 논문
    (http://www.mdpi.com/1424-8220/15/5/10569) 을 참고해 주세요.

    작동 동영상 또한 준비되어 있습니다. (하단 참조)


#사용법

## 0. App 빌드

    `git clone` 한 다음 Intel XDK IoT edition을 킨 후 App 폴더 밑의 프로젝트 파일을 import 하면 됩니다.

## 1. 웹캠 스트림 서버 셋업

    필요한 패키지들을 설치합니다.
    ```
    opkg install git
    opkg install kernel-module-uvcvideo
    ```

    Arduino expansion 보드의 스위치를 USB 허브 쪽으로 밀어줍니다. 
    `ls /dev` 를 실행해서 `/dev/uvcvideo0` 가 있는지를 확인합니다. 없으면 uvc 지원이 되는 웹캠이 필요합니다.

    `git clone https://github.com/drejkim/edi-cam.git` 을 실행합니다.

    `./edi-cam/bin`에 있는 `install_ffmpeg.sh` 스크립트를 실행해서 ffmpeg을 설치합니다.
 
    `./edi-cam/web/server`에서 `npm install` 실행합니다.

    `./edi-cam/web/client/index.html` 에서 `var wsUrl = 'ws://myedison.local:8084/';` 부분의 `myedison`을 
     hostname으로 수정합니다. `(default edison)`
     
     `node ./edi-cam/web/server/server.js ||  ./edi-cam/web/client/do_ffmpeg.sh` 를 실행시켜 서버를 작동시킵니다.

     에러가 날 경우 세션을 하나 더 열어서 서버-클라이언트를 따로 실행시켜 줍니다.

     서버가 작동하면 웹 브라우저에서 `http://edisonipaddr:8080` 으로 접속하면 실시간 웹캠 스트림을 받을 수 있습니다.



