# AI 여자친구 챗봇

Gemini 2.0 Flash 모델을 활용한 개인 맞춤형 AI 챗봇입니다.

## 🌟 주요 기능

- **완전한 맞춤 설정**: AI의 이름, 성격, 페르소나를 자유롭게 설정
- **실시간 채팅**: Gemini 2.0 Flash 모델 기반의 자연스러운 대화
- **페르소나 변경**: 프로필을 클릭하여 언제든지 AI의 성격 재설정
- **반응형 디자인**: 모든 기기에서 완벽한 사용 경험
- **보안**: API 키는 브라우저에만 저장되며 서버로 전송되지 않음

## 🚀 시작하기

### 1. Gemini API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. "Create API Key" 클릭
3. API 키 복사

### 2. 웹사이트 배포

#### GitHub Pages로 배포하기:

1. GitHub 저장소 생성
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

## 📖 사용 방법

### 초기 설정

1. **API 키 입력**: Gemini API 키를 입력합니다
   - ⚠️ API 키는 절대 클라우드에 저장되지 않습니다
   - 브라우저의 메모리에만 임시 저장됩니다

2. **AI 이름 설정**: AI의 이름을 입력합니다 (예: 지수, 유나 등)

3. **내 이름 설정**: 본인의 이름을 입력합니다

4. **페르소나 설정**: AI의 성격과 말투를 자유롭게 설정합니다
   ```
   예시:
   너는 밝고 긍정적인 성격의 여자친구야. 
   항상 따뜻하게 대화하고, 내 이야기를 공감하며 들어줘. 
   가끔 귀여운 이모티콘도 사용해줘. 
   애교도 부리고, 나를 '오빠'라고 불러줘.
   ```

5. **채팅 시작하기** 버튼 클릭

### 채팅하기

- 메시지를 입력하고 전송 버튼 클릭 또는 Enter 키
- Shift + Enter로 줄바꿈 가능

### 페르소나 변경

- 상단의 프로필 이미지를 클릭
- AI 이름과 페르소나 수정
- 저장 버튼 클릭

## 🔒 보안 및 개인정보

- **API 키**: 브라우저 메모리에만 저장되며, 절대 서버나 클라우드로 전송되지 않습니다
- **대화 내용**: 모든 대화는 Gemini API로 직접 전송되며, 중간 서버를 거치지 않습니다
- **로컬 저장**: AI 이름, 사용자 이름, 페르소나만 브라우저의 localStorage에 저장됩니다

## 🛠️ 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (Vanilla)
- **AI 모델**: Google Gemini 2.0 Flash
- **API**: Google Generative Language API
- **배포**: GitHub Pages (정적 호스팅)

## 📱 반응형 디자인

- 데스크톱, 태블릿, 모바일 모든 기기 지원
- 최대 너비 600px로 최적화된 채팅 인터페이스
- 자동 스크롤 및 적응형 레이아웃

## 📝 파일 구조

```
chatbot/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── app.js          # JavaScript 로직
└── README.md       # 이 파일
```

## ⚠️ 주의사항

1. **API 키 보안**: 
   - API 키를 절대 공개된 저장소에 포함하지 마세요
   - 코드에 직접 하드코딩하지 마세요
   - 사용자가 직접 입력하도록 구현되어 있습니다

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
    --primary-color: #e91e63;  /* 메인 색상 */
    --user-bubble: #e91e63;    /* 사용자 말풍선 색상 */
    --ai-bubble: #f0f0f0;      /* AI 말풍선 색상 */
}
```

### 모델 변경
`app.js`에서 API URL의 모델명 변경:

```javascript
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${AppState.apiKey}`;
```

## 🐛 문제 해결

### API 키 오류
- API 키가 올바른지 확인
- Google AI Studio에서 API 키 활성화 상태 확인

### 응답이 오지 않는 경우
- 인터넷 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인
- API 사용량 제한 확인

### 페이지가 제대로 로드되지 않는 경우
- 브라우저 캐시 삭제
- 하드 리프레시 (Ctrl + F5)

## 📞 지원

문제가 발생하거나 개선 제안이 있으시면 GitHub Issues를 통해 문의해주세요.

## 📄 라이선스

이 프로젝트는 개인 사용 목적으로 자유롭게 사용 가능합니다.

---

**즐거운 대화 되세요! 💕**
