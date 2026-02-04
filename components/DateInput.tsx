import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface DateInputProps extends Omit<TextInputProps, 'onChangeText'> {
  /**
   * Callback called when text changes.
   * Returns the formatted string (DD/MM/YYYY).
   */
  onChangeText: (text: string) => void;
  /**
   * The current value of the input.
   */
  value: string;
  /**
   * Optional label to display above the input.
   */
  label?: string;
  /**
   * Optional error message to display below the input.
   */
  error?: string;
}

export const DateInput = ({ value, onChangeText, label, error, style, ...props }: DateInputProps) => {
    
    const handleChangeText = (text: string) => {
        // 1. Remove any non-numeric characters
        const clean = text.replace(/[^0-9]/g, '');
        
        let formatted = clean;
        
        // 2. Insert slashes at correct positions based on length
        if (clean.length > 2) {
            formatted = `${clean.slice(0, 2)}/${clean.slice(2)}`;
        }
        if (clean.length > 4) {
            formatted = `${formatted.slice(0, 5)}/${clean.slice(4)}`;
        }

        // 3. Auto-append slash if user is typing (not deleting) and reached a segment end
        // We compare current text length with previous value length to detect deletion
        const isDeleting = text.length < (value || '').length;
        
        if (!isDeleting) {
            // If we have exactly 2 digits (Day), add slash
            if (clean.length === 2) {
                formatted += '/';
            } 
            // If we have exactly 4 digits (Day + Month), add slash
            else if (clean.length === 4) {
                formatted += '/';
            }
        }
        
        // 4. Limit to 10 characters (DD/MM/YYYY)
        if (formatted.length <= 10) {
            onChangeText(formatted);
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                value={value}
                onChangeText={handleChangeText}
                keyboardType="numeric"
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                maxLength={10}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
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
    inputError: {
        borderColor: Colors.primary,
    },
    errorText: {
        fontFamily: 'DMSans_400Regular',
        fontSize: 12,
        color: Colors.primary,
        marginTop: 4,
    }
});
