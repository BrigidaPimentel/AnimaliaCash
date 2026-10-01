import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { setAuth } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error', 'Erro ao sair da conta.');
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Perfil</Text>

      {/* Opções de Navegação */}
      <View style={styles.menuContainer}>
        {/* Botão de Relatórios Financeiros */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/relatorios')}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="bar-chart-outline" size={22} color="#4F46E5" />
            <Text style={styles.menuText}>Relatórios Financeiros</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Botão de Apuração Financeira */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/apuracao')}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="calculator-outline" size={22} color="#059669" />
            <Text style={styles.menuText}>Apuração Financeira</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  menuContainer: {
    gap: 12,
    marginBottom: 32,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    gap: 8,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 15,
  },
});