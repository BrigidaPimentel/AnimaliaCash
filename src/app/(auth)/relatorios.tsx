import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router'; // <-- Adicionado aqui
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Paleta de cores do projeto
const COLORS = {
  brand50: '#ebf8f2',
  brand100: '#cdeedf',
  brand500: '#00a868',
  brand600: '#00915a',
  brand700: '#007849',
  ink: '#0b2545',
  inkLight: '#16345f',
  white: '#FFFFFF',
  border: '#E5E7EB',
  danger: '#DC2626',
  grayText: '#6B7280',
};

export default function RelatoriosScreen() {
  const [periodo, setPeriodo] = useState<'mes' | 'trimestre' | 'ano'>('mes');

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuração para remover/ajustar o cabeçalho nativo que mostra o caminho (auth/relatorios) */}
      <Stack.Screen
        options={{
          headerShown: false, // Esconde a barra nativa do Expo com o nome da pasta
          title: 'Relatórios Financeiros',
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header / Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Relatórios Financeiros</Text>
            <Text style={styles.headerSubtitle}>
              Acompanhe o desempenho e métricas da sua clínica
            </Text>
          </View>
        </View>

        {/* Filtro de Período */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterBtn, periodo === 'mes' && styles.filterBtnActive]}
            onPress={() => setPeriodo('mes')}
          >
            <Text style={[styles.filterText, periodo === 'mes' && styles.filterTextActive]}>
              Mês Atual
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterBtn, periodo === 'trimestre' && styles.filterBtnActive]}
            onPress={() => setPeriodo('trimestre')}
          >
            <Text style={[styles.filterText, periodo === 'trimestre' && styles.filterTextActive]}>
              Trimestre
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterBtn, periodo === 'ano' && styles.filterBtnActive]}
            onPress={() => setPeriodo('ano')}
          >
            <Text style={[styles.filterText, periodo === 'ano' && styles.filterTextActive]}>
              Ano
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cards de Métricas Rápidas */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: COLORS.brand50 }]}>
              <Ionicons name="trending-up-outline" size={20} color={COLORS.brand500} />
            </View>
            <Text style={styles.metricLabel}>Faturamento</Text>
            <Text style={styles.metricValue}>R$ 47.500</Text>
            <Text style={styles.metricSubtext}>+12% vs mês anterior</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="trending-down-outline" size={20} color={COLORS.danger} />
            </View>
            <Text style={styles.metricLabel}>Despesas</Text>
            <Text style={styles.metricValue}>R$ 23.460</Text>
            <Text style={styles.metricSubtext}>-4% vs mês anterior</Text>
          </View>
        </View>

        {/* Categoria com Maior Receita */}
        <Text style={styles.sectionTitle}>Distribuição por Categoria</Text>
        <View style={styles.card}>
          <View style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: COLORS.brand500 }]} />
              <Text style={styles.categoryName}>Consultas e Exames</Text>
            </View>
            <Text style={styles.categoryValue}>R$ 21.375 (45%)</Text>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressBar, { width: '45%', backgroundColor: COLORS.brand500 }]} />
          </View>

          <View style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: COLORS.inkLight }]} />
              <Text style={styles.categoryName}>Cirurgias e Procedimentos</Text>
            </View>
            <Text style={styles.categoryValue}>R$ 16.625 (35%)</Text>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressBar, { width: '35%', backgroundColor: COLORS.inkLight }]} />
          </View>

          <View style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: COLORS.brand600 }]} />
              <Text style={styles.categoryName}>Vacinas e Insumos</Text>
            </View>
            <Text style={styles.categoryValue}>R$ 9.500 (20%)</Text>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressBar, { width: '20%', backgroundColor: COLORS.brand600 }]} />
          </View>
        </View>

        {/* Resumo da Margem de Lucro */}
        <Text style={styles.sectionTitle}>Margem e Performance</Text>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Ticket Médio por Atendimento</Text>
            <Text style={styles.rowValue}>R$ 237,50</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Margem de Lucro Líquida</Text>
            <Text style={[styles.rowValue, { color: COLORS.brand500 }]}>32.4%</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Total de Atendimentos</Text>
            <Text style={styles.rowValue}>200 consultas</Text>
          </View>
        </View>

        {/* Botão de Exportar */}
        <TouchableOpacity style={styles.exportBtn}>
          <Ionicons name="download-outline" size={20} color={COLORS.white} />
          <Text style={styles.exportBtnText}>Exportar Relatório em PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.ink,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.inkLight,
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.brand50,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  filterBtnActive: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 13,
    color: COLORS.inkLight,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.brand700,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.inkLight,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.ink,
  },
  metricSubtext: {
    fontSize: 10,
    color: COLORS.grayText,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.ink,
    marginBottom: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 13,
    color: COLORS.ink,
    fontWeight: '500',
  },
  categoryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.ink,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginTop: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rowLabel: {
    fontSize: 13,
    color: COLORS.inkLight,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.ink,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 6,
  },
  exportBtn: {
    backgroundColor: COLORS.brand500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
    marginBottom: 24,
  },
  exportBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});