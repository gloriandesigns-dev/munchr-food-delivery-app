import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function EnterDetailsScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Validation: Check if all fields are filled and age is a valid positive number
  const isFormValid = fullName && gender && age && email && address && !isNaN(Number(age)) && Number(age) > 0;

  const handleContinue = () => {
    if (isFormValid) {
      // Navigate to onboarding with age data included in context/params if needed
      router.push('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fill in your bio</Text>
        <View style={{width: 40}} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>This data will be displayed in your account profile for security</Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
            />
        </View>

        {/* Gender */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
                {['Male', 'Female', 'Non-binary'].map((option) => (
                    <TouchableOpacity 
                        key={option}
                        style={[styles.genderOption, gender === option && styles.genderOptionSelected]}
                        onPress={() => setGender(option)}
                    >
                        <Text style={[styles.genderText, gender === option && styles.genderTextSelected]}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Age Input */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter your age</Text>
            <TextInput 
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#999"
                value={age}
                onChangeText={(text) => {
                    // Only allow numeric input
                    if (/^\d*$/.test(text)) {
                        setAge(text);
                    }
                }}
                keyboardType="number-pad"
                maxLength={3}
            />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
        </View>

        {/* Address */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Street address, City, State, ZIP"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={address}
                onChangeText={setAddress}
                textAlignVertical="top"
            />
        </View>
        
        {/* Spacer for bottom button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
            style={[styles.primaryButton, !isFormValid && styles.primaryButtonDisabled]} 
            onPress={handleContinue}
            disabled={!isFormValid}
        >
            <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    color: Colors.black,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  sectionTitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: Colors.black,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  genderOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#666',
  },
  genderTextSelected: {
    color: Colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    backgroundColor: '#FFB3B3',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 18,
    color: Colors.white,
  },
});
