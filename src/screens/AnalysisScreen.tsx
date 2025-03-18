import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Layout from '../components/Layout';
import ExpensePieChart from '../components/ExpensePieChart';
import DurationSelector from '../components/input/DurationSelector';
import TypeSelector from '../components/input/TypeSelector';
import {Duration} from '../components/input/DurationSelector';

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

const AnalysisScreen = () => {
  const [duration, setDuration] = useState<Duration>(Duration.OneMonth);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    // Add user message with a unique id
    setMessages(prevMessages => [
      ...prevMessages,
      {id: generateUniqueId(), text: message, sender: 'user'},
    ]);
    setMessage('');

    // Simulate an AI response after a short delay
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: generateUniqueId(), text: generateAIResponse(), sender: 'ai'},
      ]);
    }, 1000);
  };

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

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <TypeSelector />
        <DurationSelector duration={duration} setDuration={setDuration} />

        <View style={styles.chart}>
          <ExpensePieChart />
        </View>
      </View>

      {/* Chat Box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={true} // Enables scrollbar
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chart: {
    marginTop: 10,
    width: '90%',
  },
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

export default AnalysisScreen;
