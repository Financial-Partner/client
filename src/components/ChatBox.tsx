import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {useAppSelector} from '../store';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const dinoImages: {[key: string]: ImageSourcePropType} = {
  blue_1: require('../assets/characters/blue_1.png'),
  blue_2: require('../assets/characters/blue_2.png'),
  green_1: require('../assets/characters/green_1.png'),
  green_2: require('../assets/characters/green_2.png'),
  green_3: require('../assets/characters/green_3.png'),
  main_character: require('../assets/characters/main_character.png'),
  pink_1: require('../assets/characters/pink_1.png'),
  yellow_1: require('../assets/characters/yellow_1.png'),
  yellow_2: require('../assets/characters/yellow_2.png'),
};

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [dinoImage, setDinoImage] = useState<ImageSourcePropType>(
    dinoImages.main_character,
  );
  const {selectedDino} = useAppSelector(state => state.settings);

  const responses = useMemo(
    () => [
      '最近吃的有點多? 主人吃了甚麼好吃的',
      '哇 ! 賽克希也想嚐嚐看 !',
      '主人好厲害 ! 最近投資報酬率很高喔~ ',
      '主人別灰心 ! 投資有風險~ 試試看其他的吧?',
      '這週的開銷比上週少了1000元，請繼續加油喔 !',
    ],
    [],
  );

  const generateAIResponse = useCallback(() => {
    return responses[Math.floor(Math.random() * responses.length)];
  }, [responses]);

  useEffect(() => {
    if (selectedDino && dinoImages[selectedDino]) {
      setDinoImage(dinoImages[selectedDino]);
    }
  }, [selectedDino]);

  useEffect(() => {
    // set a render message when the component mounts
    const initialMessage: Message = {
      id: generateUniqueId(),
      text: generateAIResponse(),
      sender: 'ai',
    };
    setMessages(prev => [...prev, initialMessage]);
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [generateAIResponse]);

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

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
        {messages.map(item =>
          item.sender === 'user' ? (
            <View key={item.id} style={[styles.chatBubble, styles.userBubble]}>
              <Text style={styles.chatText}>{item.text}</Text>
            </View>
          ) : (
            <View key={item.id} style={styles.aiContainer}>
              <View style={styles.avatarContainer}>
                <Image source={dinoImage} style={styles.avatar} />
              </View>
              <View style={[styles.chatBubble, styles.aiBubble]}>
                <Text style={styles.aiChatText}>{item.text}</Text>
              </View>
            </View>
          ),
        )}
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
    // alignSelf: 'flex-start',
  },
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  chatText: {
    color: '#fff',
    fontSize: 16,
  },
  aiChatText: {
    color: '#333',
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
  avatarContainer: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  avatar: {
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default ChatBox;
