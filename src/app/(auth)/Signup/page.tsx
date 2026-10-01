import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';

function validatePassword(pass: string): string | null {
    if (pass.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
    if (!/[a-z]/.test(pass)) return 'A senha deve conter pelo menos uma letra minúscula.';
    if (!/[A-Z]/.test(pass)) return 'A senha deve conter pelo menos uma letra maiúscula.';
    if (!/[0-9]/.test(pass)) return 'A senha deve conter pelo menos um número.';
    if (!/[^A-Za-z0-9]/.test(pass)) return 'A senha deve conter pelo menos um símbolo (!@#$%...).';
    return null;
}

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        if (!name.trim() || !email.trim() || !password) {
    Alert.alert('Atenção', 'Preencha todos os campos.');
    return;
}

const passwordError = validatePassword(password);
if (passwordError) {
    Alert.alert('Senha inválida', passwordError);
    return;
}

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data:{
                    name: name
                }
            }

        })

        if (error) {
            Alert.alert('Error', error.message)
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/')

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.brand50 }}>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <Pressable style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.brand100} />
                        </Pressable>

                        <Text style={styles.logoText}>
                            <Text style={{ color: colors.brand500 }}>Animalia Cash</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Nome completo</Text>
                            <TextInput
                                placeholder="Nome completo..."
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />

                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha"
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                        </View>

                        <Pressable style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Cadastrar</Text>   
                        </Pressable>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.ink,
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.brand100,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 20,
        color: colors.brand100,
        marginBottom: 34,

    },
    form: {
        flex: 1,
        backgroundColor: colors.brand50,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.inkLight,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.inkLight,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.brand700,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    buttonText: {
        color: colors.brand50,
        fontSize: 16,
        fontWeight: 'bold',
    },

    backButton: {
        backgroundColor: colors.brand50,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },


});