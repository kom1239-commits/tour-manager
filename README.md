# Kim Elena Tour Manager — 배포 가이드

투어/그룹 관리 시스템을 GitHub + Render 로 배포하고 휴대폰에 앱처럼 설치하는 방법입니다.

## 📦 폴더에 있어야 하는 파일 (총 5개)

```
프로젝트폴더/
├── index.html              ← 자동으로 tour_manager.html 로 이동
├── tour_manager.html       ← 메인 앱 (수천 줄)
├── manifest.json           ← PWA 설정 (앱 이름, 색상, 아이콘)
├── service-worker.js       ← 오프라인 캐싱
├── icon.svg                ← 앱 아이콘 (512×512 SVG)
└── README.md               ← 이 파일
```

> ⚠️ **icon-192.png** 와 **icon-512.png** 도 만드는 것을 권장합니다 (일부 안드로이드 기기는 PNG 만 지원).
> SVG 아이콘으로도 작동하지만, 더 정확하게 보이려면:
> 1. icon.svg 파일을 [https://cloudconvert.com/svg-to-png](https://cloudconvert.com/svg-to-png) 에서 변환
> 2. 192×192 와 512×512 두 사이즈로 저장
> 3. 같은 폴더에 `icon-192.png`, `icon-512.png` 로 저장

---

## 🚀 1단계 — GitHub 에 등록

### A. GitHub 계정 + 새 저장소 만들기
1. [github.com](https://github.com) 접속 → 회원가입(이미 계정 있으면 로그인)
2. 우측 상단 **"+ "** → **"New repository"** 클릭
3. Repository name: `tour-manager` (아무거나 가능)
4. Public 또는 Private 선택 (Private 도 무료, Render 와 GitHub Pages 모두 작동)
5. **"Create repository"** 클릭

### B. 파일 업로드 (방법 1 — 웹에서 끌어 놓기, 가장 쉬움)
1. 생성된 빈 저장소 페이지에서 **"uploading an existing file"** 링크 클릭
2. 위 5개 파일을 드래그 앤 드롭
3. 하단 **"Commit changes"** 클릭

### C. 파일 업로드 (방법 2 — GitHub Desktop 사용)
1. [desktop.github.com](https://desktop.github.com) 다운로드 + 설치
2. **File → Clone Repository** → 방금 만든 저장소 선택
3. 폴더 안에 5개 파일 복사
4. GitHub Desktop 에서 **"Commit to main"** → **"Push origin"**

---

## 🌐 2단계 — Render 에 배포 (Static Site)

### A. Render 가입
1. [render.com](https://render.com) 접속 → **Get Started** → GitHub 계정으로 로그인
2. 권한 허용 (Render 가 GitHub 저장소를 읽을 수 있도록)

### B. 새 정적 사이트 생성
1. 대시보드에서 **"+ New"** → **"Static Site"** 클릭
2. GitHub 저장소 목록에서 `tour-manager` 선택 → **"Connect"**
3. 설정:
   - **Name**: tour-manager (URL 의 일부가 됨)
   - **Branch**: `main`
   - **Build Command**: (비워두기)
   - **Publish directory**: `./`
4. **"Create Static Site"** 클릭

### C. 배포 완료
- 1~2분 후 빌드 완료
- URL 이 생성됩니다: `https://tour-manager.onrender.com` (또는 비슷한 이름)
- 클릭하면 시스템이 열립니다

> 💡 **이후 코드를 수정하면**: 파일을 GitHub 에 다시 push 만 하면 자동으로 Render 가 재배포합니다.

---

## 🌐 2단계 (대안) — GitHub Pages 로 배포 (Render 보다 더 간단)

Render 가 너무 복잡하면 GitHub 에서 바로 호스팅 가능합니다.

1. GitHub 저장소 페이지 → **Settings** 탭
2. 좌측 메뉴 **Pages**
3. **Source**: `Deploy from a branch`
4. **Branch**: `main` / `(root)` → **Save**
5. 1~2분 후 URL 생성: `https://[유저명].github.io/tour-manager/`

GitHub Pages 와 Render 둘 다 무료입니다. GitHub Pages 가 단순하지만 Render 는 더 빠릅니다.

---

## 📱 3단계 — 휴대폰에 앱처럼 설치

배포된 URL 을 휴대폰 브라우저에서 열고 아래 절차로 홈화면에 추가하면 일반 앱처럼 됩니다.

### 🍎 iPhone (Safari)
1. **Safari** 로 URL 열기 (Chrome 안 됨, 반드시 Safari)
2. 하단 **공유** 버튼 (네모 + 화살표) 탭
3. 아래로 스크롤 → **"홈 화면에 추가"** 탭
4. 이름 확인 → **추가**
5. 홈 화면에 **투어관리** 아이콘이 생기면 끝

### 🤖 Android (Chrome)
1. **Chrome** 으로 URL 열기
2. 우측 상단 **⋮** (점 3개) 메뉴
3. **"홈 화면에 추가"** 또는 **"앱 설치"** 탭
4. 이름 확인 → **추가** / **설치**
5. 홈 화면에 아이콘이 생기면 끝

### 💻 데스크톱 (PC 에서도 가능)
- Chrome / Edge: 주소창 우측에 **설치** 아이콘이 표시됨 → 클릭 → 설치
- 데스크톱에 일반 앱처럼 등록되며 작업 표시줄/시작 메뉴에서 실행 가능

---

## 💾 데이터 관리

### 데이터는 어디 저장되나?
- 각 기기의 **브라우저 localStorage** 에 저장됩니다
- ⚠️ **휴대폰과 PC 의 데이터는 자동으로 동기화되지 않습니다**

### 기기 간 동기화 방법
1. PC 에서 **[📥 백업]** 버튼 → JSON 파일 다운로드
2. 그 파일을 본인에게 카톡/메일로 보내기
3. 휴대폰에서 그 JSON 파일 다운로드
4. 휴대폰 앱에서 **[📤 복원]** 버튼 → 그 파일 선택

이 작업을 매주 한 번 정도 해 주시면 양쪽 기기 데이터를 일치시킬 수 있습니다.

### 진짜 동기화가 필요하다면
백엔드 서버(Firebase, Supabase 등)와 연동하면 자동 동기화 가능합니다. 별도 작업이 필요하니 원하시면 알려주세요.

---

## 🔄 코드 업데이트 시

코드를 수정하고 GitHub 에 다시 push 하면:
- Render: 자동으로 재배포
- GitHub Pages: 자동으로 재배포

휴대폰에서 새 버전 보려면:
1. 앱 종료 후 다시 실행
2. 안 보이면 브라우저 캐시 삭제 후 재방문

> Service Worker 가 캐시를 가지고 있어서 오프라인에서도 동작하지만, 새 버전을 빨리 받으려면 `service-worker.js` 파일의 `CACHE = 'tour-manager-v3'` 숫자를 v4, v5 로 올려서 push 하면 됩니다.

---

## 🆘 문제 해결

### "manifest.json 이 로드되지 않음" 또는 "앱으로 설치 안 됨"
- HTTPS 가 필요합니다. Render / GitHub Pages 둘 다 자동 HTTPS 제공
- file:// 로 직접 열면 PWA 가 작동 안 함

### 휴대폰에서 라이브러리(워드/PDF/OCR) 빨간 표시
- 인터넷 차단 환경 → 와이파이 변경
- 일정표 가져오기 탭의 "텍스트 직접 붙여넣기" 사용

### 일정 못 봄, 데이터 사라짐
- 브라우저 캐시 삭제, 시크릿 창 사용 → localStorage 가 비워짐
- **반드시 매주 [📥 백업] 으로 JSON 다운로드**

---

## 📞 도움 필요 시

각 단계에서 막히면:
1. GitHub 가입 / 저장소 생성 → GitHub 공식 문서: [docs.github.com](https://docs.github.com)
2. Render 배포 → [render.com/docs/static-sites](https://render.com/docs/static-sites)
3. PWA 설치 → 위 단계대로 안 되면 사용 중인 휴대폰 모델 + 브라우저를 알려주세요
