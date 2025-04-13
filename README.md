# 자판기 시뮬레이션

브라우저에서 실행되는 가상 자판기 시뮬레이션입니다.
사용자는 음료를 선택하고 결제하는 음료수를 얻기까지의 매커니즘을 구현했습니다.

## 기술 스택 및 개발 환경

### 언어 : TypeScript

### 패키지 매니저: pnpm

### 빌드 툴: Vite

## 실행 방법

1. 레포지토리 클론

   ```bash
   git clone https://github.com/madisonrubylee/hyunjoo-vending-machine.git
   cd hyunjoo-vending-machine
   ```

2. 관련 패키지 설치

   ```bash
   pnpm install
   ```

3. 프로그램 실행

```bash
pnpm dev
```

`http://localhost:5173`

## 폴더 구조

- `src/`
  - `app.ts` - 앱 진입점
  - `classes` - 자판기 클래스 정의
  - `handlers` - 이벤트 핸들러 로직 정의
  - `ui` - ui 관련 로직 정의
  - `constants` - 상수 정의
  - `utils` - 유틸함수 정의

## 기능 구현

- 음료 선택 및 구매
- 카드 및 현금 결제 방식 지원
- 잔돈 반환 처리
- 허용되지 않는 금액(10,50,50000원)에 대한 안내 메시지
- 잔액/재고에 따른 음료 활성화 표시

### 음료 관리

- 실시간 재고 확인
- 재고에 따른 음료 선택 버튼 활성화/비활성화
- 구매 가능한 음료만 표시
- 음료별 이모지 표시로 직관적인 UI

### 사용자 피드백

- 모든 동작에 대한 상태 메시지 표시 (로그)
- 오류 상황 알림
  - 잔액 부족
  - 재고 부족
  - 카드 승인 실패
  - 잘못된 금액 투입

![image](https://github.com/user-attachments/assets/5cf7b8de-bfbe-403d-b501-84866886dd92)
