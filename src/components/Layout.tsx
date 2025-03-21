import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {colors} from '../theme/colors';

type LayoutProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const Layout = ({children, scrollable = true}: LayoutProps) => {
  const ContentContainer = scrollable ? ScrollView : View;
  return (
    <View style={styles.container}>
      <Header />
      <ContentContainer style={styles.content}>{children}</ContentContainer>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});

export default Layout;
