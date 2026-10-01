import colors from '@/constants/colors';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);

        const{data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(error) {
            Alert.alert('Erro', 'Usuário ou senha inválidos');
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(panel)/profile/page')

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>
                    <Text style={{ color: colors.brand500 }}>Animalia Cash</Text>
                </Text>
                <Text style={styles.slogan}>
                    Soluções Financeiras
                </Text>
            </View>

        <View style={styles.form}>
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

            <Pressable style={styles.button}onPress={handleSignIn}>
                <Text style={styles.buttonText}>
                    {loading ? 'Carregando...' : 'Acessar'}
                </Text>
            </Pressable>

            <Link href='/(auth)/Signup/page'style={styles.link}>
            <Text>Ainda não possui uma conta? Cadastre-se </Text>
            </Link>

        </View>
        </View>
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

    link: {
        marginTop: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },


});