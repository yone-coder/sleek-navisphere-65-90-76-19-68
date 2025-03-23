
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Create adaptable components that can be used across platforms
export const Container = ({ children, style, ...props }: any) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

export const Heading = ({ children, level = 1, style, ...props }: any) => {
  const fontSize = {
    1: 24,
    2: 20,
    3: 18,
    4: 16,
    5: 14,
    6: 12,
  }[level] || 24;

  return (
    <Text style={[{ fontSize, fontWeight: 'bold', marginBottom: 10 }, style]} {...props}>
      {children}
    </Text>
  );
};

export const Button = ({ children, onPress, variant = 'primary', style, ...props }: any) => {
  const buttonStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
    ghost: styles.ghostButton,
  }[variant] || styles.primaryButton;

  const textStyle = {
    primary: styles.primaryButtonText,
    secondary: styles.secondaryButtonText,
    outline: styles.outlineButtonText,
    ghost: styles.ghostButtonText,
  }[variant] || styles.primaryButtonText;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, buttonStyle, style]} 
      {...props}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export const Card = ({ children, style, ...props }: any) => (
  <View style={[styles.card, style]} {...props}>
    {children}
  </View>
);

export const PageContainer = ({ children, style, ...props }: any) => (
  <ScrollView 
    contentContainerStyle={[styles.pageContainer, style]} 
    {...props}
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outlineButtonText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  ghostButtonText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  pageContainer: {
    padding: 16,
    minHeight: '100%',
  },
});
