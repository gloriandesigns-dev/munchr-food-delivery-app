import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  const handleVerify = () => {
    if (isOtpComplete) {
      router.push('/enter-details');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.black} />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>We’ve sent a 6-digit code to +1 555-012-3456</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : null,
                // Highlight current input if needed, or keep simple
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.verifyButton, !isOtpComplete && styles.verifyButtonDisabled]} 
          onPress={handleVerify}
          disabled={!isOtpComplete}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend code</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 28,
    color: Colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'DMSans_500Medium',
    color: Colors.black,
    backgroundColor: '#FAFAFA',
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  verifyButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonDisabled: {
    backgroundColor: '#FFB3B3', // Lighter red for disabled state
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 18,
    color: Colors.white,
  },
  resendContainer: {
    padding: 10,
  },
  resendText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'underline',
  },
});
