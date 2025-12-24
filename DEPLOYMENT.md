# 🚀 GitHub Pages 배포 가이드

## chatgfz.kro.kr 도메인으로 배포하기

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 이름 입력 (예: `ai-girlfriend-chatbot`)
4. Public으로 설정
5. "Create repository" 클릭

### 2단계: 파일 업로드

#### 방법 1: GitHub 웹 인터페이스 (간편)

1. 방금 만든 저장소 페이지에서 "uploading an existing file" 클릭
2. chatbot.zip 파일의 압축을 풀고 모든 파일을 드래그 앤 드롭
3. 커밋 메시지 입력 (예: "Initial commit")
4. "Commit changes" 클릭

#### 방법 2: Git 명령어 (고급)

```bash
# 다운로드한 chatbot.zip 압축 해제
unzip chatbot.zip
cd chatbot

# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소와 연결
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. 저장소 페이지에서 "Settings" 탭 클릭
2. 좌측 메뉴에서 "Pages" 클릭
3. Source 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
4. "Save" 클릭
5. 잠시 기다리면 페이지 상단에 배포 URL이 표시됩니다

### 4단계: 커스텀 도메인 설정 (chatgfz.kro.kr)

#### A. GitHub Pages 설정

1. GitHub Pages 설정 페이지에서 "Custom domain" 입력란에 `chatgfz.kro.kr` 입력
2. "Save" 클릭
3. "Enforce HTTPS" 체크박스 활성화 (잠시 후 가능)

#### B. DNS 설정 (kro.kr 제공업체)

kro.kr DNS 설정 페이지로 이동하여 다음 레코드 추가:

**CNAME 레코드 추가:**
```
Type: CNAME
Name: chatgfz (또는 @)
Value: YOUR_USERNAME.github.io
TTL: 3600 (또는 자동)
```

**또는 A 레코드 추가 (CNAME이 안되는 경우):**
```
Type: A
Name: chatgfz (또는 @)
Value: 185.199.108.153
TTL: 3600

추가로 다음 A 레코드들도 추가:
185.199.109.153
185.199.110.153
185.199.111.153
```

### 5단계: DNS 전파 대기

- DNS 설정 후 전파까지 몇 분 ~ 48시간 소요 (보통 10-30분)
- 다음 명령어로 확인 가능:
  ```bash
  nslookup chatgfz.kro.kr
  ```

### 6단계: 접속 확인

1. 브라우저에서 `https://chatgfz.kro.kr` 접속
2. 설정 화면이 나타나면 성공!
3. Gemini API 키를 입력하고 채팅 시작

---

## 📝 업데이트 방법

### 코드 수정 후 재배포:

1. 파일 수정
2. GitHub 저장소에 새 파일 업로드 (기존 파일 덮어쓰기)
3. 또는 Git 사용:
   ```bash
   git add .
   git commit -m "Update chatbot"
   git push
   ```
4. GitHub Pages가 자동으로 재배포 (1-2분 소요)

---

## 🔍 문제 해결

### 1. "404 Not Found" 오류
- GitHub Pages가 활성화되었는지 확인
- 파일이 저장소 루트 디렉토리에 있는지 확인
- `index.html` 파일명이 정확한지 확인

### 2. 커스텀 도메인이 작동하지 않음
- DNS 설정이 올바른지 확인
- DNS 전파 대기 (최대 48시간)
- CNAME 파일이 저장소에 있는지 확인
- GitHub에서 "Enforce HTTPS"가 활성화되었는지 확인

### 3. API 키 오류
- Gemini API 키가 활성화되었는지 확인
- API 키에 공백이 없는지 확인
- [Google AI Studio](https://makersuite.google.com/app/apikey)에서 키 재확인

### 4. 스타일이 깨져 보임
- 브라우저 캐시 삭제 (Ctrl + Shift + R)
- 모든 CSS 파일이 업로드되었는지 확인

---

## 💡 팁

1. **API 키 안전하게 보관**: 
   - API 키를 절대 코드에 포함하지 마세요
   - 항상 사용자가 직접 입력하도록 유지

2. **페르소나 백업**:
   - 마음에 드는 페르소나는 메모장에 백업해두세요
   - 브라우저 데이터 삭제시 페르소나도 사라집니다

3. **모바일 접속**:
   - 모바일에서도 완벽하게 작동합니다
   - 홈 화면에 추가하면 앱처럼 사용 가능

4. **업데이트 알림**:
   - 저장소를 Watch하면 업데이트 알림 받을 수 있습니다

---

## 📞 지원

문제가 있으면 GitHub Issues에 등록하거나 README.md를 참고하세요.

**행운을 빕니다! 🎉**
