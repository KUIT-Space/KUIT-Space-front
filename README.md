# React + TypeScript + Vite with swc
- `npm run dev` 이후 localhost:~ 주소 접속

- 뭔가 이상하면 `npm install` 했는지 확인하기

## eslint, prettier, github issue/PR template 적용 완료

### <기본 브랜치 전략>
각자 기능 구현 시,
1. 어떤 기능을 구현해야 하는지 설명하는 issue 생성하기  
2. 해당하는 issue 번호에 맞는 branch 생성하기  
  ex) feat#12-signup
3. 해당 브랜치에서 작업 후, 결과물 main branch에 pr 날리기  
4. 1인 이상 approve review 후 merge
5. review 완료되었고 문제 없으면 issue close

### <추가 사항>
- PR review는 두 명 이상 approve review 받고, PR 올린 사람이 merge 하기
- 360px 기준으로 개발하되, **반응형**을 위해 width 등은 %를 최대한 사용하고, 나머지 px들(padding, margin, font)은 rem 단위를 사용할 것!!
- color 는 변수화를 위해 hex color만 넣지 말고, 최소한 `background: var(--Foundation-Gray-gray900_background, #171719);` 이런 방식으로 넣기
  - 시간 나면 다크모드, 추가 color style 대응을 위한 styled-compoent의 {theme} => theme.color... 방식 사용하기

## 기본 폴더 구조 (src/)
- assets : 이미지 파일들이 들어가는 곳입니다. 특정 페이지/컴포넌트에서만 쓰이는 것은 폴더로 묶어주세요.
- components : 여러 페이지에 공통으로 쓰이는 컴포넌트가 들어가는 곳입니다.   
  - figma > assets 에 정리된 컴포넌트, figma > 2차 와프_작업중 페이지에 정리된 컴포넌트를 기반으로 합니다.
- pages : 각각의 페이지를 구분하는 곳입니다. 큰 기능으로 먼저 구분하고, 상세 페이지는 하위 폴더로 구분해 주세요.
- utils : 중복되는 로직(일반 JavaScript 함수)을 공통으로 정의해서 사용합니다.
- apis : fetch 등 서버와 정보를 주고받는 중복 로직을 정리합니다.
- hooks : 중복되는 로직(React JSX에서 쓰이는 로직 - 상태 관리, 라이프사이클 관련)을 커스텀 user hook으로 만듭니다.  
  
<추후 필요하면 추가>  
- styles : css, button 등 공통 디자인을 정의합니다.
- context/store : 전역 상태 관리가 필요할 때 사용합니다.

## Routing
- App.tsx에 router도 함께 정의되어 있습니다.
- children : [] 안에 원하는 경로와 보여줄 component를 작성합니다.
- 
