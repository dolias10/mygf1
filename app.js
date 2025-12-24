// 앱 상태 관리
const AppState = {
    apiKey: '',
    aiName: '',
    userName: '',
    persona: '',
    chatHistory: []
};

// DOM 요소
const setupScreen = document.getElementById('setup-screen');
const chatScreen = document.getElementById('chat-screen');
const startChatBtn = document.getElementById('start-chat');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const profileBtn = document.getElementById('profile-btn');
const personaModal = document.getElementById('persona-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelEditBtn = document.getElementById('cancel-edit');
const savePersonaBtn = document.getElementById('save-persona');
const aiNameDisplay = document.getElementById('ai-name-display');

// 초기 설정
startChatBtn.addEventListener('click', initializeChat);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 프로필 클릭으로 페르소나 편집
profileBtn.addEventListener('click', () => {
    document.getElementById('edit-ai-name').value = AppState.aiName;
    document.getElementById('edit-persona').value = AppState.persona;
    personaModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    personaModal.classList.remove('active');
});

cancelEditBtn.addEventListener('click', () => {
    personaModal.classList.remove('active');
});

savePersonaBtn.addEventListener('click', () => {
    const newAiName = document.getElementById('edit-ai-name').value.trim();
    const newPersona = document.getElementById('edit-persona').value.trim();
    
    if (newAiName && newPersona) {
        AppState.aiName = newAiName;
        AppState.persona = newPersona;
        aiNameDisplay.textContent = newAiName;
        
        // 로컬 스토리지 업데이트
        localStorage.setItem('aiName', newAiName);
        localStorage.setItem('persona', newPersona);
        
        personaModal.classList.remove('active');
        
        // 채팅 기록 초기화 (페르소나가 변경되었으므로)
        if (confirm('페르소나가 변경되었습니다. 채팅 기록을 초기화할까요?')) {
            AppState.chatHistory = [];
            messagesContainer.innerHTML = '';
            addAiMessage('안녕! 새로운 설정으로 대화를 시작해볼까? 😊');
        }
    }
});

// 모달 외부 클릭시 닫기
personaModal.addEventListener('click', (e) => {
    if (e.target === personaModal) {
        personaModal.classList.remove('active');
    }
});

// 채팅 초기화
function initializeChat() {
    const apiKey = document.getElementById('api-key').value.trim();
    const aiName = document.getElementById('ai-name').value.trim();
    const userName = document.getElementById('user-name').value.trim();
    const persona = document.getElementById('persona').value.trim();
    
    if (!apiKey) {
        alert('API 키를 입력해주세요.');
        return;
    }
    
    if (!aiName) {
        alert('AI 이름을 입력해주세요.');
        return;
    }
    
    if (!userName) {
        alert('내 이름을 입력해주세요.');
        return;
    }
    
    if (!persona) {
        alert('페르소나를 입력해주세요.');
        return;
    }
    
    // 상태 저장
    AppState.apiKey = apiKey;
    AppState.aiName = aiName;
    AppState.userName = userName;
    AppState.persona = persona;
    
    // 로컬 스토리지에 저장 (API 키 제외)
    localStorage.setItem('aiName', aiName);
    localStorage.setItem('userName', userName);
    localStorage.setItem('persona', persona);
    
    // UI 업데이트
    aiNameDisplay.textContent = aiName;
    
    // 화면 전환
    setupScreen.classList.remove('active');
    chatScreen.classList.add('active');
    
    // 환영 메시지
    setTimeout(() => {
        addAiMessage(`안녕! 나는 ${aiName}이야! 만나서 반가워 😊`);
    }, 500);
}

// 메시지 전송
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // 사용자 메시지 추가
    addUserMessage(message);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // 메시지를 채팅 기록에 추가
    AppState.chatHistory.push({
        role: 'user',
        parts: [{ text: message }]
    });
    
    // 전송 버튼 비활성화
    sendBtn.disabled = true;
    
    // 타이핑 인디케이터 표시
    const typingIndicator = showTypingIndicator();
    
    try {
        // Gemini API 호출
        const response = await callGeminiAPI(message);
        
        // 타이핑 인디케이터 제거
        typingIndicator.remove();
        
        // AI 응답 추가
        addAiMessage(response);
        
        // 응답을 채팅 기록에 추가
        AppState.chatHistory.push({
            role: 'model',
            parts: [{ text: response }]
        });
        
    } catch (error) {
        typingIndicator.remove();
        addAiMessage('죄송해요, 지금은 응답할 수 없어요. 잠시 후 다시 시도해주세요. 😢');
        console.error('Error:', error);
    } finally {
        sendBtn.disabled = false;
    }
}

// Gemini API 호출
async function callGeminiAPI(userMessage) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${AppState.apiKey}`;
    
    // 시스템 프롬프트 구성
    const systemPrompt = `${AppState.persona}

중요한 규칙:
- 너의 이름은 "${AppState.aiName}"이야.
- 상대방의 이름은 "${AppState.userName}"이야.
- 항상 설정된 페르소나를 유지하면서 자연스럽게 대화해.
- 한국어로 대화해.`;

    // 대화 기록 구성
    const contents = [
        {
            role: 'user',
            parts: [{ text: systemPrompt }]
        },
        {
            role: 'model',
            parts: [{ text: `알겠어! 나는 ${AppState.aiName}이고, 너는 ${AppState.userName}이네! 설정된 페르소나대로 대화할게 😊` }]
        },
        ...AppState.chatHistory
    ];
    
    const requestBody = {
        contents: contents,
        generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    };
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API 호출 실패');
    }
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('응답 형식이 올바르지 않습니다.');
    }
    
    return data.candidates[0].content.parts[0].text;
}

// 사용자 메시지 추가
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = AppState.userName[0].toUpperCase();
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottom();
}

// AI 메시지 추가
function addAiMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = AppState.aiName[0].toUpperCase();
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottom();
}

// 타이핑 인디케이터 표시
function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = AppState.aiName[0].toUpperCase();
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    content.appendChild(typingDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottom();
    
    return messageDiv;
}

// 스크롤을 맨 아래로
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 텍스트 영역 자동 높이 조절
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// 페이지 로드시 저장된 설정 불러오기
window.addEventListener('load', () => {
    const savedAiName = localStorage.getItem('aiName');
    const savedUserName = localStorage.getItem('userName');
    const savedPersona = localStorage.getItem('persona');
    
    if (savedAiName) document.getElementById('ai-name').value = savedAiName;
    if (savedUserName) document.getElementById('user-name').value = savedUserName;
    if (savedPersona) document.getElementById('persona').value = savedPersona;
});
