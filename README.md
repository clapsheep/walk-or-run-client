# Walk or Run

<div align="center">
  <a href="https://wor-dashboard.netlify.app" style="text-decoration: none;">
    <div style="max-width: 600px; margin: 32px auto; padding: 24px; border-radius: 12px; border: 1px solid #e1e4e8; background: linear-gradient(180deg, #f6f8fa 0%, #fff 100%);">
      <img src="./public/logo/logo_navy.svg" alt="Walk or Run Logo" style="width: 200px; margin-bottom: 16px;"/>
      <p style="margin: 8px 0; color: #666; font-size: 16px;">운동 데이터 분석 플랫폼</p>
      <div style="background: #fff; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e1e4e8;">
        <p style="margin: 0; color: #24292e; line-height: 1.6;">💪 나만의 운동 데이터를 분석하고<br/>👥 다른 사람들과 함께 운동하세요</p>
      </div>
      <p style="margin: 0; color: #0366d6; font-size: 14px;">wor-dashboard.netlify.app</p>
    </div>
  </a>
</div>

## 👥 팀원 소개

<table>
  <tr>
    <td align="center"><a href="https://github.com/clapsheep"><img src="https://github.com/clapsheep.png" width="100px;" alt=""/><br /><sub><b>박수양</b><br />@clapsheep</sub></a></td>
    <td align="center"><a href="https://github.com/rpeowiqu"><img src="https://github.com/rpeowiqu.png" width="100px;" alt=""/><br /><sub><b>한재서</b><br />@rpeowiqu</sub></a></td>
  </tr>
</table>

## 📋 프로젝트 소개

**Walk or Run**은 삼성 헬스의 운동 데이터를 기반으로 한 혁신적인 운동 분석 및 소셜 챌린지 플랫폼입니다. 개인의 운동 데이터를 과학적으로 분석하여 의미 있는 인사이트를 제공하고, 사용자들 간의 상호작용을 통해 지속적인 운동 동기를 부여하는 것을 목표로 합니다.

### 🔗 프로젝트 링크

- **클라이언트 저장소**: [walk-or-run-client](https://github.com/clapsheep/walk-or-run-client)
- **서버 저장소**: [walk-or-run-server](https://github.com/clapsheep/walk-or-run-server)
- **API 문서**: [Swagger UI](https://walk-or-run.com/swagger-ui/index.html)
- **배포 URL**: [https://wor-dashboard.netlify.app](https://wor-dashboard.netlify.app)

### 🏗 시스템 아키텍처

#### Frontend
- Vue.js 3 + TypeScript
- TailwindCSS
- Chart.js
- Pinia (상태 관리)

#### Backend
- Spring Boot
- MyBatis
- MySQL
- RESTful API
- Swagger (API 문서화)

#### Infrastructure
- GitHub Actions (CI/CD)
- Docker (컨테이너화)
- AWS ECS (컨테이너 오케스트레이션)
- AWS EC2 (서버 호스팅)
- Nginx (웹 서버)
- Netlify (프론트엔드 배포)

## 🛠 기술 스택

<div align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=Tailwind-CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chart.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white"/>
  <br />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=Spring-Boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/MyBatis-000000?style=flat-square&logo=MyBatis&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=black"/>
  <br />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=GitHub-Actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_ECS-FF9900?style=flat-square&logo=Amazon-AWS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat-square&logo=Amazon-AWS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=Nginx&logoColor=white"/>
</div>

## 🌟 기술 하이라이트 및 아키텍처 특징

### 💻 기술 스택 및 설계 특징
- **TypeScript**: 정적 타입 시스템을 통한 안정적인 코드베이스 구축
- **Vue 3 Composition API**: 재사용 가능한 로직 분리와 효율적인 상태 관리
- **Atomic Design Pattern**: 일관된 UI/UX와 재사용 가능한 컴포넌트 설계
- **Domain-Driven Design**: 도메인 중심의 설계로 비즈니스 로직 모듈화

### 🏗 아키텍처 특징
- **관심사 분리 (Separation of Concerns)**
  - View Layer: 화면 렌더링과 사용자 상호작용 처리
  - Business Layer: 도메인별 비즈니스 로직 캡슐화
  - Data Layer: API 통신과 데이터 관리
- **컴포넌트 설계**
  - Atomic Design 기반의 계층화된 컴포넌트 구조
  - 재사용성과 유지보수성 향상
- **상태 관리 전략**
  - Pinia를 활용한 전역 상태 관리
  - Composables를 통한 로직 재사용

### ⚡️ 성능 최적화
- **코드 스플리팅**: 라우트 기반 지연 로딩 구현
- **컴포넌트 최적화**: Skeleton UI를 통한 로딩 경험 개선
- **반응형 디자인**: TailwindCSS를 활용한 모바일 퍼스트 디자인

### 🔄 개발 프로세스
- **타입 안정성**: TypeScript를 통한 런타임 에러 방지
- **일관된 코드 스타일**: ESLint, Prettier 설정
- **지속적 배포**: Netlify를 통한 자동화된 배포 프로세스

## 💡 핵심 가치
- **데이터 기반 분석**: 삼성 헬스의 운동 데이터를 심층적으로 분석하여 사용자의 운동 패턴, 강도, 효율성을 다각도로 시각화
- **맞춤형 인사이트**: 개인별 운동 데이터를 기반으로 최적화된 운동 가이드 제공
- **소셜 챌린지**: 사용자들과 함께하는 운동 챌린지를 통해 동기부여와 성취감 제공
- **실시간 날씨 정보**: Weather API 연동을 통한 운동하기 좋은 환경 정보 제공

## ⭐️ 주요 특징
- 직관적인 데이터 시각화
- 커뮤니티 기반 동기부여
- 과학적인 운동 분석
- 실시간 날씨 연동
- 목표 설정 및 달성 관리

## 📁 프로젝트 구조

프로젝트는 함수형 프로그래밍을 지향하며, 관심사 분리를 통해 다음과 같이 구성되어 있습니다:

```
src/
├── core/              # 핵심 비즈니스 로직
│   ├── auth/         # 인증 관련
│   ├── challenge/    # 챌린지 관련
│   ├── comment/      # 댓글 관련
│   ├── goal/         # 목표 관련
│   ├── record/       # 운동 기록 관련
│   ├── user/         # 사용자 관련
│   └── weather/      # 날씨 관련
├── components/        # 컴포넌트
│   ├── atoms/        # 기본 UI 컴포넌트
│   ├── molecules/    # 복합 컴포넌트
│   ├── organisms/    # 고수준 컴포넌트
│   ├── charts/       # 차트 컴포넌트
│   └── skeletons/    # 로딩 UI
├── views/            # 페이지 컴포넌트
│   ├── account/      # 계정 관련 페이지
│   └── admin/        # 관리자 페이지
├── stores/           # 상태 관리 (Pinia)
├── layouts/          # 레이아웃 컴포넌트
├── router/           # 라우팅 설정
├── plugins/          # 플러그인 설정
├── utils/            # 유틸리티 함수
└── assets/           # 정적 리소스
```

### 주요 디렉토리 설명

- **core**: 비즈니스 로직을 담당하는 핵심 모듈
  - API 통신, 타입 정의, composables, services로 구성
  - 도메인별로 분리하여 관리 (auth, challenge, comment 등)
  
- **components**: Atomic Design 패턴을 적용한 컴포넌트 구조
  - atoms: 버튼, 입력창 등 기본 UI 요소
  - molecules: 기본 요소를 조합한 복합 컴포넌트
  - organisms: 복잡한 UI 섹션을 구성하는 고수준 컴포넌트
  - charts: 데이터 시각화를 위한 차트 컴포넌트
  
- **views**: 실제 페이지를 구성하는 컴포넌트
  - account: 사용자 계정 관련 페이지
  - admin: 관리자 기능 페이지

## ⭐️ 주요 기능

### 🔐 인증 (Auth)
[이미지 공간]
- 로그인, 회원가입, 아이디 찾기, 비밀번호 찾기 구현
- OAuth 도입 예정
- JWT 토큰 기반 인증 (로컬 스토리지 관리)
- Pinia를 활용한 전역 상태 관리로 유저 정보 관리

### 📊 대시보드
[이미지 공간]
- 삼성헬스 운동 데이터(CSV) 분석
- 제공 정보:
  - 운동 거리 추이
  - 시간대별 운동 분포
  - 페이스 구간별 분석
  - 운동 통계
  - 평균 케이던스 추이
  - 심박수와 속도 관계
  - 심박존 분석
- Weather API 연동으로 실시간 날씨 정보 제공

### 🎯 챌린지
[이미지 공간]
- 운영자 주도의 챌린지 시스템
- 목표 인원 달성도 확인
- 자동 스케줄링을 통한 정기 챌린지
- 관리자 페이지를 통한 챌린지 관리 (ADMIN 권한)
  - 생성
  - 수정
  - 종료
- 사용자 간 응원 댓글 기능

### 👥 유저 찾기
[이미지 공간]
- 닉네임/이메일 기반 사용자 검색
- 팔로잉 기능
- 향후 커뮤니티 기능 확장 예정

## 🚀 실행 방법

### 요구사항
- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/walk-or-run-client.git
cd walk-or-run-client
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 프로덕션 빌드
```bash
npm run build
```

### 환경 변수 설정
```env
VITE_API_URL=your_api_url
VITE_WEATHER_API_KEY=your_weather_api_key
```

## 🤝 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다. 대규모 변경사항의 경우, 먼저 이슈를 등록해 주세요.