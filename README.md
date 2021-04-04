# prerequisite

Node.js v14.16.0+

# Tech Stack

## Create React App

CRA를 통해 Configuration을 벗어나 개발에만 집중할 수 있게 도와줍니다.

물론 설정 변경시 eject 해야하면 어쩌나 싶은 걱정도 있지만, 이정도 규모의 프로젝트라면 부담없이 할 수 있을거라 생각했고,

필요하다면  `react-rewired` 같은 라이브러리로 수정 가능하기 때문에 선택했습니다.

typescript 설정도 프로젝트 생성시 옵션으로 간편히 만들 수 있습니다.

## Global CSS + CSS-Module

CRA를 사용한 만큼 추가 라이브러리 설치 없이 이 이점을 활용하고 싶었습니다.

이름이 같지만 스타일은 다른 경우에도 큰 고민 없이 편리하게 스타일링 할 수 있었습니다.

## Typescript

사용자의 돈을 관리해주는 앱인 만큼 안정성이 중요하다 생각했습니다.

타입체크를 통해 오류를 줄일 수 있도록 Typescript를 사용했습니다.

# Libraries

## date-fns

* moment.js보다 가볍습니다
* moment.js와 달리 Date객체를 리턴해 줌으로써 순수성이 보장됩니다
* 함수명이 직관적입니다

## fontawesome

* 네트워크 요청없이 바로 svg를 로드할 수 있습니다
* 트리 쉐이킹 가능합니다
* 사용해보고 싶었습니다!

# Directory strategy

React에서 Clean architecture를 적용한 사례들을 살펴보고 현재 프로젝트에 맞게 심플하게 적용했습니다.

(아직 프로젝트 크기가 매우 크지는 않기 때문에 package by layer 형태로 구성했습니다)

- **adapter**: _외부(비지니스 바깥) 통신 구현체_
- **domain**:  _entity는 소분류로 볼 수 있다(수정 근거)_
    - lineitem
      - targeting
      - fc
      - allocation
      - creative id
      - budget
        - daily bd
      - repo
    - creative
    - **entity**: 비지니스 로직에 필요한 객체 정의 _비지니스객체 구현체, vo와 다르게 id가 있음_
    - **value-object**: 어플리케이션 함직에 필요한 객체 정의 _이런걸 vo라고 함, entity와 다르게 id가 없음_
    - **repo**: 데이터를 불리오기 위한 인터페이스 입니다. 실제 구현(HTTP, LocalStorage)에 대해서는 모릅니다. 요구사항 중 추후(실제 프로젝트로 사용한다는 가정 하에) 제일 먼저 변경될 것으로 보이는 부분이 json파일을 로드하는 부분이었습니다. 그말인 즉슨 실제 구현 부분이 바뀔 가능성이 크다는 뜻입니다. 그때 구현체가 repo interface를 만족한다면 변경으로 인한 오류를 방지할 수 있습니다.
- **web**: 리액트로 구성된 웹 어플리케이션 로직이 담겨 있습니다. _(DTO가 들어갈 수 있음)_
    - **common**: 유틸리티
    - **component**: UI 컴포넌트
    - **hook**: 커스텀 react hook

_references_
- https://github.com/RostislavDugin/clean-architecture-react-typescript
- https://github.com/falsy/react-with-clean-architecture
- https://github.com/eduardomoroni/react-clean-architecture

# Test

jest + react-testing-library를 사용 했습니다.

- CRA에서 기본으로 세팅해 줍니다.
  - 현재 제약된 시간 안에서 사용하기 가장 최적입니다
- jest는 다양한 기능을 제공합니다. 
  - 일례로 mocha를 사용할 경우 별도 라이브러리를 설치해야 합니다
  - DOM 테스트가 가능합니다. 역시나 mocha의 경우 별도 설치를 해야합니다
- react-testing-library
  - 컴포넌트의 상태보다 화면에 보이는 부분, 실제 동작 방식을 테스트 합니다
  - 사실 유저는 컴포넌트 내부구현은 신경 쓰지 않고, 실제 동작만을 확인합니다
  - 이에 test또한 그런식으로 이루어져야 한다는 BDD 스타일을 따르고 있고, 저 또한 Codecept.JS를 이용한 E2E 시스템을 만들면서 BDD 스타일에 만은 영향을 받았습니다.
  - Enzyme의 경우 컴포넌트의 내부 구현을 테스트하게 되는데, 사실 이는 유저 입장에서 제대로 보이는지와는 별개의 테스트입니다.


---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).