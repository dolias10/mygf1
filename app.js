// ⚠️ API 키 설정 (여기에 본인의 API 키를 입력하세요)
const GEMINI_API_KEY = 'AIzaSyBq-RH58gOcO9thePsjmxPaMXJqyUUG05Y';

// 앱 상태 관리
const AppState = {
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
const savePersonaBtn = document.getElementById('save-persona');
const aiNameDisplay = document.getElementById('ai-name-display');
const backBtn = document.getElementById('back-btn');

// 이벤트 리스너
startChatBtn.addEventListener('click', initializeChat);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 뒤로가기 버튼
backBtn.addEventListener('click', () => {
    if (confirm('채팅을 종료하고 설정 화면으로 돌아가시겠습니까?')) {
        chatScreen.classList.remove('active');
        setupScreen.classList.add('active');
        messagesContainer.innerHTML = '';
        AppState.chatHistory = [];
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

savePersonaBtn.addEventListener('click', () => {
    const newAiName = document.getElementById('edit-ai-name').value.trim();
    const newPersona = document.getElementById('edit-persona').value.trim();
    
    if (newAiName && newPersona) {
        AppState.aiName = newAiName;
        AppState.persona = newPersona;
        aiNameDisplay.textContent = newAiName;
        
        localStorage.setItem('aiName', newAiName);
        localStorage.setItem('persona', newPersona);
        
        personaModal.classList.remove('active');
        
        if (confirm('페르소나가 변경되었습니다. 채팅 기록을 초기화할까요?')) {
            AppState.chatHistory = [];
            messagesContainer.innerHTML = '';
            addAiMessage('안녕! 새로운 설정으로 대화를 시작해볼까? 😊');
        }
    } else {
        alert('모든 항목을 입력해주세요.');
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
    const aiName = document.getElementById('ai-name').value.trim();
    const userName = document.getElementById('user-name').value.trim();
    const persona = document.getElementById('persona').value.trim();
    
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
    AppState.aiName = aiName;
    AppState.userName = userName;
    AppState.persona = persona;
    
    // 로컬 스토리지에 저장
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
        console.error('API Error:', error);
        
        // 에러 메시지를 더 자세히 표시
        let errorMessage = '죄송해요, 응답할 수 없어요. 😢';
        
        if (error.message.includes('API key')) {
            errorMessage = 'API 키가 유효하지 않아요. 개발자에게 문의해주세요.';
        } else if (error.message.includes('quota')) {
            errorMessage = 'API 사용량이 초과되었어요. 잠시 후 다시 시도해주세요.';
        } else if (error.message.includes('network')) {
            errorMessage = '네트워크 연결을 확인해주세요.';
        }
        
        addAiMessage(errorMessage);
    } finally {
        sendBtn.disabled = false;
    }
}

// Gemini API 호출
async function callGeminiAPI(userMessage) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
    
    // 시스템 프롬프트 구성
    const systemPrompt = `${AppState.persona}

중요한 규칙:
- 너의 이름은 "${AppState.aiName}"이야.
- 상대방의 이름은 "${AppState.userName}"이야.
- 항상 설정된 페르소나를 유지하면서 자연스럽게 대화해.
- 한국어로 대화해.
- 친근하고 따뜻한 말투를 사용해.`;

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
            maxOutputTokens: 2048,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
            }
        ]
    };
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Response Error:', errorData);
        throw new Error(errorData.error?.message || `API 호출 실패 (${response.status})`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.candidates || data.candidates.length === 0) {
        throw new Error('응답을 생성할 수 없습니다.');
    }
    
    const candidate = data.candidates[0];
    
    if (candidate.finishReason === 'SAFETY') {
        throw new Error('안전 필터에 의해 응답이 차단되었습니다.');
    }
    
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error('응답 내용이 없습니다.');
    }
    
    return candidate.content.parts[0].text;
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
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
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
