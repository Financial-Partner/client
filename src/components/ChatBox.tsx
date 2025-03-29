import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const generateAIResponse = () => {
    const responses = [
      "I'm here to help!",
      "That's interesting. Can you tell me more?",
      'I see. What do you think?',
      'Great question! Let me think...',
      'Hmm, let me look into that.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (message.trim() === '') {return;}

    setMessages(prev => [
      ...prev,
      {id: generateUniqueId(), text: message, sender: 'user'},
    ]);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {id: generateUniqueId(), text: generateAIResponse(), sender: 'ai'},
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.chatContainer}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }>
        {messages.map(item => (
          <View
            key={item.id}
            style={[
              styles.chatBubble,
              item.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}>
            <Text style={styles.chatText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Chat Input */}
      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="輸入訊息..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>發送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    width: '90%',
    height: 250,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingBottom: 10,
    bottom: 0,
    left: '5%',
    borderRadius: 10,
  },
  chatList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#fff',
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  chatInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatBox;
