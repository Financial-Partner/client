import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {colors} from '../theme/colors';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} nestedScrollEnabled={true}>
        {children}
      </ScrollView>
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
