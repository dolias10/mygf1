# AI 여자친구 챗봇 (Instagram DM 스타일)

Gemini 2.0 Flash 모델을 활용한 개인 맞춤형 AI 챗봇입니다.
인스타그램 DM과 동일한 깔끔한 UI로 제작되었습니다.

## 🌟 주요 기능

- **완전한 맞춤 설정**: AI의 이름, 성격, 페르소나를 자유롭게 설정
- **실시간 채팅**: Gemini 2.0 Flash 모델 기반의 자연스러운 대화
- **페르소나 변경**: 프로필을 클릭하여 언제든지 AI의 성격 재설정
- **인스타그램 DM UI**: 익숙하고 직관적인 인터페이스
- **반응형 디자인**: 모든 기기에서 완벽한 사용 경험

## 🚀 시작하기

### 1. API 키 설정

**중요**: `app.js` 파일 상단의 API 키를 본인의 키로 변경하세요!

```javascript
// app.js 파일 1-2번째 줄
const GEMINI_API_KEY = '여기에_본인의_API키_입력';
```

Gemini API 키 발급 방법:
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. "Create API Key" 클릭
3. API 키 복사
4. `app.js` 파일에 붙여넣기

### 2. 웹사이트 배포

#### GitHub Pages로 배포하기:

1. GitHub 저장소 생성 (Private 가능)
2. 이 프로젝트의 모든 파일을 저장소에 업로드
3. 저장소 Settings > Pages로 이동
4. Source를 "main" 브랜치로 설정
5. 배포된 URL로 접속

#### 로컬에서 실행하기:

```bash
# 간단한 HTTP 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js의 http-server 사용
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

### 3. 커스텀 도메인 설정 (chatgfz.kro.kr)

CNAME 파일이 이미 포함되어 있습니다.
DNS 설정은 `DEPLOYMENT.md`를 참고하세요.

## 📖 사용 방법

### 초기 설정

1. **AI 이름 설정**: AI의 이름을 입력합니다 (예: 지수, 유나 등)
2. **내 이름 설정**: 본인의 이름을 입력합니다
3. **페르소나 설정**: AI의 성격과 말투를 자유롭게 설정합니다
   ```
   예시:
   너는 밝고 긍정적인 성격의 여자친구야. 
   항상 따뜻하게 대화하고, 내 이야기를 공감하며 들어줘. 
   가끔 귀여운 이모티콘도 사용해줘. 
   애교도 부리고, 나를 '오빠'라고 불러줘.
   ```
4. **시작하기** 버튼 클릭

### 채팅하기

- 메시지를 입력하고 전송 버튼 클릭 또는 Enter 키
- Shift + Enter로 줄바꿈 가능
- 왼쪽 상단의 뒤로가기 버튼으로 설정 화면으로 복귀

### 페르소나 변경

- 상단의 프로필 이미지를 클릭
- AI 이름과 페르소나 수정
- 완료 버튼 클릭

## 🔒 보안 및 개인정보

- **API 키**: `app.js` 파일에 포함되어 있으므로 저장소를 Private으로 설정하세요
- **대화 내용**: 모든 대화는 Gemini API로 직접 전송됩니다
- **로컬 저장**: AI 이름, 사용자 이름, 페르소나만 브라우저의 localStorage에 저장됩니다

## 🛠️ 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (Vanilla)
- **AI 모델**: Google Gemini 2.0 Flash
- **API**: Google Generative Language API
- **디자인**: Instagram DM inspired UI
- **배포**: GitHub Pages (정적 호스팅)

## 📱 반응형 디자인

- 데스크톱, 태블릿, 모바일 모든 기기 지원
- 최대 너비 935px (인스타그램 표준)
- 자동 스크롤 및 적응형 레이아웃

## 📝 파일 구조

```
chatbot/
├── index.html      # 메인 HTML 파일
├── styles.css      # Instagram DM 스타일 CSS
├── app.js          # JavaScript 로직 (API 키 포함!)
├── CNAME           # 커스텀 도메인 설정
├── README.md       # 이 파일
└── DEPLOYMENT.md   # 배포 가이드
```

## ⚠️ 주의사항

1. **API 키 보안**: 
   - `app.js`에 API 키가 포함되어 있습니다
   - 저장소를 **반드시 Private**으로 설정하세요
   - GitHub Pages는 Private 저장소도 배포 가능합니다

2. **API 사용량**:
   - Gemini API의 무료 티어 제한을 확인하세요
   - 과도한 사용시 요금이 부과될 수 있습니다

3. **브라우저 호환성**:
   - 최신 버전의 Chrome, Firefox, Safari, Edge 권장
   - localStorage 및 Fetch API 지원 필요

## 🎨 커스터마이징

### 색상 변경
`styles.css` 파일의 `:root` 섹션에서 색상 변수 수정:

```css
:root {
    --ig-primary: #0095f6;  /* 인스타그램 블루 */
    --ig-border: #dbdbdb;   /* 테두리 색상 */
}
```

### 모델 변경
`app.js`에서 API URL의 모델명 변경:

```javascript
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
```

## 🐛 문제 해결

### API 키 오류
- `app.js` 파일의 API 키가 올바른지 확인
- Google AI Studio에서 API 키 활성화 상태 확인

### 응답이 오지 않는 경우
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- API 사용량 제한 확인
- 네트워크 연결 확인

### 페이지가 제대로 로드되지 않는 경우
- 브라우저 캐시 삭제
- 하드 리프레시 (Ctrl + F5)
- 모든 파일이 올바르게 업로드되었는지 확인

## 📞 지원

문제가 발생하거나 개선 제안이 있으시면 GitHub Issues를 통해 문의해주세요.

## 💡 꿀팁

1. **페르소나 예시**:
   ```
   - 친근한 친구: "너는 친근하고 밝은 친구야. 반말을 사용하고 가끔 농담도 해줘."
   - 다정한 여자친구: "너는 다정하고 따뜻한 여자친구야. 나를 '오빠'라고 부르고 애교도 부려줘."
   - 전문 상담사: "너는 경청을 잘하는 심리 상담사야. 공감하며 조언을 해줘."
   ```

2. **모바일에서 앱처럼 사용**:
   - 모바일 브라우저에서 "홈 화면에 추가" 선택
   - 아이콘으로 바로 실행 가능

3. **여러 페르소나 관리**:
   - 페르소나를 메모장에 백업
   - 상황에 맞게 변경하며 사용

---

**즐거운 대화 되세요! 💕**
