# 최종 수정 완료 버전

## ✅ 수정된 내용

### 1. API 모델 변경
- `gemini-2.0-flash-exp` → `gemini-1.5-flash`
- 무료 할당량: 일일 1,500회 요청

### 2. 안전 필터 수정
- `BLOCK_NONE` → `BLOCK_ONLY_HIGH`
- API 호환성 문제 해결

### 3. UI 텍스트 변경
- "활성" → "현재 활동중"

## 🚀 사용 방법

### 1단계: API 키 설정
`app.js` 파일의 **2번째 줄**에 본인의 API 키 입력:

```javascript
const GEMINI_API_KEY = '여기에_본인의_API키_입력';
```

### 2단계: 파일 업로드
- GitHub에 모든 파일 업로드
- Private 저장소 권장 (API 키 포함)

### 3단계: GitHub Pages 배포
1. Settings > Pages
2. Source: main 브랜치
3. Save

### 4단계: 도메인 연결 (선택)
- CNAME 파일이 포함되어 있음 (chatgfz.kro.kr)
- DNS 설정: DEPLOYMENT.md 참고

## ⚠️ API 사용량 초과시

### 원인
1. 일일 무료 할당량 초과 (1,500회)
2. API 키가 제한됨

### 해결 방법
1. **다음 날까지 대기** (자정 UTC 기준 리셋)
2. **새 API 키 발급**:
   - [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 기존 키 삭제 → 새 키 생성
   - `app.js`에 새 키 입력

### 할당량 확인
- [Google AI Studio](https://aistudio.google.com/app/apikey)
- 우측 상단 "Quota" 또는 "Usage" 메뉴

## 🔧 추가 문제 해결

### 에러 메시지가 계속 나올 때
1. F12 눌러서 Console 탭 확인
2. 정확한 에러 메시지 확인
3. 다음 항목 체크:
   - API 키 올바르게 입력되었는지
   - 인터넷 연결 확인
   - 브라우저 캐시 삭제 (Ctrl+Shift+Delete)

### 채팅이 느릴 때
- 정상입니다. AI 응답 생성에 2-5초 소요
- 타이핑 인디케이터(...)가 표시됨

## 📊 모델 정보

### gemini-1.5-flash 무료 할당량
- **분당**: 15회 요청
- **일일**: 1,500회 요청  
- **월간**: 150만 토큰

**참고**: 일반적인 대화는 대화당 50-200 토큰 사용

## 💡 사용 팁

1. **페르소나 예시**:
   ```
   너는 밝고 긍정적인 성격의 여자친구야. 
   항상 따뜻하게 대화하고, 내 이야기를 공감하며 들어줘. 
   가끔 귀여운 이모티콘도 사용해줘. 
   나를 '오빠'라고 불러줘.
   ```

2. **Private 저장소 사용**:
   - API 키가 코드에 포함되어 있음
   - 반드시 Private으로 설정
   - GitHub Pages는 Private도 배포 가능

3. **백업**:
   - 마음에 드는 페르소나는 따로 저장
   - 브라우저 데이터 삭제시 설정도 사라짐

---

**모든 문제가 해결되었습니다. 즐거운 대화 되세요! 💕**
