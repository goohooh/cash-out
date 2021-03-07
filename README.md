# prerequisite

Node.js v14.16.0+

## React + Typescript

사용자의 돈을 관리해주는 앱인 만큼 안정성이 중요하다 생각했습니다.

타입체크를 통해 오류를 줄일 수 있도록 Typescript를 사용했습니다.

## Directory strategy

React에서 Clean architecture를 적용한 사례들을 살펴보고 현재 프로젝트에 맞게 변형해서 적용했습니다.

(아직 프로젝트 크기가 매우 크지는 않기 때문에 package by layer 형태로 구성했습니다)

- data: 실제 데이터를 불러올 구현체가 있습니다.
- entity: 
    - model: 비지니스 로직에 필요한 객체 정의
    - structure: 어플리케이션 로직에 필요한 객체 정의
- repo: 데이터를 불리오기 위한 인터페이스 입니다. 실제 구현(HTTP, LocalStorage)에 대해서는 모릅니다
- web: 리액트로 구성된 웹 어플리케이션 로직이 담겨 있습니다.
    - common: 유틸리티
    - component: UI 컴포넌트
    - hook: 커스텀 react hook

_references_
- https://github.com/RostislavDugin/clean-architecture-react-typescript
- https://github.com/falsy/react-with-clean-architecture
- https://github.com/eduardomoroni/react-clean-architecture

## Global CSS + CSS-Module

CRA v2에서 쉽게 적용할 수 있도록 바뀐 덕분에

이름이 같지만 스타일은 다른 경우에도 큰 고민 없이 편리하게 스타일링 할 수 있었습니다.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).