import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/verify-otp');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBackground}>
             {/* Red base */}
            <View style={{...StyleSheet.absoluteFillObject, backgroundColor: Colors.primary}} />
            
            {/* Food Pattern Overlay - Simulating the collage */}
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop' }}
                style={[styles.foodImage, { top: 50, left: -50, transform: [{rotate: '-15deg'}] }]}
            />
             <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop' }}
                style={[styles.foodImage, { top: 40, right: -60, transform: [{rotate: '15deg'}] }]}
            />
             <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop' }}
                style={[styles.foodImage, { bottom: -40, right: 20, transform: [{rotate: '0deg'}] }]}
            />
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1780&auto=format&fit=crop' }}
                style={[styles.foodImage, { bottom: -20, left: 20, transform: [{rotate: '-10deg'}] }]}
            />
            
            {/* Gradient overlay to blend images into red if needed */}
            <LinearGradient
                colors={[Colors.primary + 'AA', Colors.primary + 'EE']}
                style={StyleSheet.absoluteFill}
            />
        </View>

        <Text style={styles.headerLogo}>munchr</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>America's #1 Food Delivery{'\n'}and Dining App</Text>

        <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Log in or sign up</Text>
            <View style={styles.line} />
        </View>

        <Text style={styles.loginOrSignupText}>Log in or sign up</Text>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
            <View style={styles.countrySelector}>
                <Image 
                    source={{ uri: 'https://flagcdn.com/w80/us.png' }}
                    style={styles.flag}
                />
                <AntDesign name="down" size={10} color="black" style={{marginLeft: 4}} />
            </View>
            <Text style={styles.countryCode}>+1</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
            />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
                <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
                    style={styles.socialIcon}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="apple1" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>
        </View>

        {/* Footer Terms */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                By continuing, you agree to our{'\n'}
                <Text style={styles.linkText}>Terms of Service</Text>  <Text style={styles.linkText}>Privacy Policy</Text>  <Text style={styles.linkText}>Content Policies</Text>
            </Text>
        </View>
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
    height: height * 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
  },
  foodImage: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80, // Circular images
    opacity: 0.9,
  },
  headerLogo: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 48,
    color: Colors.white,
    letterSpacing: -1,
    zIndex: 10,
    marginTop: -20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -30, 
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 24,
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    opacity: 0.6,
    display: 'none', 
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  loginOrSignupText: {
     fontFamily: 'DMSans_500Medium',
     fontSize: 16,
     color: '#333',
     marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    height: '60%',
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    marginRight: 4,
  },
  countryCode: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: Colors.black,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: Colors.black,
    height: '100%',
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 18,
    color: Colors.white,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  orText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    fontFamily: 'DMSans_500Medium',
    color: '#333',
    textDecorationLine: 'underline',
  }
});
