# prerequisite

Node.js v14.16.0+

## Stack: React + Typescript

사용자의 돈을 관리해주는 앱인 만큼 안정성이 중요하다 생각했습니다.

하여 타입체크를 통해 오류를 줄일 수 있도록 Typescript를 사용했습니다.

## Directory strategy

Clean architecture에 기반한 예시들을 살펴보고 현재 요구사항을 대입해보았습니다.

당장 기능의 복잡도가 `use case`나 `interactor`를 사용할 정도로 높지는 않다고 생각하여 단수하게 구성했습니다.

## 개선사항

렌더링 최적화가 필요합니다. `CalendarCell`이 불필요하게 새로 그려지고 있습니다.

- 모달 열고 닫을 때
- 캘린더 이동시(이전달, 다음달) 캘린더를 그릴때 한번, 데이터를 불러와서 또 한번 렌더링
    - 데이터를 불러오기 전까지 캘린더 렌더링을 지연시커나 데이터 fetching과 동기화가 필요함

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).