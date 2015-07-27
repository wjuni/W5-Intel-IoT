#LitmusBioLabs XDKAppController

![](https://raw.githubusercontent.com/wjuni/W5-Intel-IoT/master/images/w5_logo.png)

#시스템 소개

## 1. 검사 이유

## 2. 기존 검사법

## 3. 새로운 검사 시스템의 개발

## 4. 논문 링크
개발된 시스템에 대해 더 자세히 알고 싶으신 분은 Sensor 학술지에 발표한 논문(http://www.mdpi.com/1424-8220/15/5/10569) 을 참고해 주세요.

작동 동영상 또한 준비되어 있습니다. (하단 참조)


#사용법
## 0. App 빌드
```
git clone --recursive https://github.com/~~.git
```
Git Clone 후 Intel XDK IoT edition - [Start A New Project]에서 App 폴더 아래의 프로젝트 파일을 import 하면 됩니다.

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
hostname으로 수정합니다. (default edison)

`node ./edi-cam/web/server/server.js ||  ./edi-cam/web/client/do_ffmpeg.sh` 를 실행시켜 서버를 작동시킵니다.

에러가 날 경우 세션을 하나 더 열어서 서버-클라이언트를 따로 실행시켜 줍니다.

서버가 작동하면 웹 브라우저에서 `http://edisonipaddr:8080` 으로 접속하면 실시간 웹캠 스트림을 받을 수 있습니다.


## 2. WiFi 모드 셋업

[영상](https://www.youtube.com/watch?v=6PUfcXDWjFY)을 참조해서 무선공유기 에 Edison 을 연결합니다.

`index.html` 를 Edison 내부로 다운로드합니다. 

`LB_server.py` 를 Edison 내부로 다운로드합니다. 

## 3. WiFi 모드 사용법

`python LB_server.py`를 실행합니다.

App을 켜고 WiFi 모드 탭을 클릭합니다.

App의 주소창에 `http://edisonipaddr:8081` 을 입력하고 버튼을 누르면 해당 모터가 작동합니다.

웹 브라우저로 `http://edisonipaddr:8081` 에 접속할 경우 웹 제어 패널 (`index.html`) 이 작동합니다.

## 4. BT 모드 셋업

필요한 패키지들을 설치합니다.  
```
opkg install bluez5-dev
opkg install bluez5-testtools
``` 

`/usr/lib/bluez/test/simple-agent` 의 내용 중 `def RequestPinCode(self, device):`의 내용을 아래와 같이 바꿔 줍니다.

```
def RequestPinCode(self, device):
print("RequestPinCode (%s)" % (device))
return "1234"
```

`chmod +x /usr/lib/bluez/test/simple-agent` 를 실행합니다.

[페어링 영상](https://www.youtube.com/watch?v=yuTXnxI4UWc)을 참고해서 Edison을 스마트폰과 페어링 합니다.

`LB_BTserver.py` 를 `Edison` 내부로 다운로드합니다. 

## 5. BT 모드 사용법

```
python LB_BTserver.py &
rfkill ublock bluetooth
hciconfig hci0 up
hciconfig hci0 piscan
hciconfig hci0 sspmode 0
/usr/lib/bluez/test/simple-agent &
sdptool add --channel=22 SP
rfcomm listen /dev/rfcomm0 22
```

앱을 BT 모드로 바꾸고 Init_BT를 누릅니다. 

주변 장치 검색 목록이 뜨면 Connect 버튼을 클릭합니다.

버튼을 누르면 해당 모터가 작동합니다.

# 플랫폼

Intel Edison 과 Arduino expansion 보드를 사용하였으며,
추가 Arduino 와 직접 개발한 회로 시스템을 사용했습니다.

앱은 Intel XDK IoT Edition을 이용하여 개발되었습니다.

Android 4.4.2 (kernel 3.4.0) LG G2 폰에서 테스트 되었습니다.

# 개발예정사항

시스템 전원을 넣은 후 필요한 setup을 자동화시키고자 계획중입니다.
표준 식수 대장균 검사법에 맞는 검사량을 처리하고 
충분히 긴 시간 동안 독립적으로 작동 가능하도록 시스템 용량을 늘릴 계획입니다.

# Demo 동영상

