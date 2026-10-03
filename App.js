import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, StyleSheet } from 'react-native';

const TOPICS = {
  book:  { icon: '.', title: 'Бүгінгі оқу жоспары', unit: 'тарау', add: '+ Тарау', goal: 8, light: '#7c3aed', dark: '#a78bfa' },
  sport: { icon: '.', title: 'Бүгінгі жаттығу', unit: 'қайталау', add: '+ Қайталау', goal: 8, light: '#ea580c', dark: '#fb923c' },
  focus: { icon: '.', title: 'Фокус сессиялары', unit: 'сессия', add: '+ Сессия', goal: 6, light: '#dc2626', dark: '#f87171' },
};
const T = TOPICS.book;

export default function App() {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);
  const c = dark ? colors.dark : colors.light;
  const accent = dark ? T.dark : T.light;

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      {/* Жоғарғы бөлім: аватар + сәлемдесу */}
      <View style={[s.header, { backgroundColor: accent }]}>
        <View style={s.avatar}>
          <Text style={[s.avatarText, { color: accent }]}>
            {name ? name[0].toUpperCase() : '?'}
          </Text>
        </View>
        <Text style={s.hello}>Сәлем, {name || 'қолданушы'}!</Text>
        <Text style={s.sub}>{T.title}</Text>
      </View>

      {/* Негізгі карточка */}
      <View style={[s.card, { backgroundColor: c.card }]}>
        <TextInput
          style={[s.input, { color: c.text, borderColor: c.track }]}
          placeholder="Атыңызды жазыңыз"
          placeholderTextColor={c.muted}
          value={name}
          onChangeText={setName}
        />

        <Text style={[s.count, { color: c.text }]}>{count} / {T.goal}</Text>

        {/* Прогресс жолағы */}
        <View style={[s.track, { backgroundColor: c.track }]}>
          <View style={[s.fill, { width: `${Math.min(count / T.goal, 1) * 100}%`, backgroundColor: accent }]} />
        </View>

        {/* Белгішелер қатары */}
        <View style={s.icons}>
          {Array.from({ length: T.goal }, (_, i) => (
            <Text key={i} style={{ fontSize: 26, opacity: i < count ? 1 : 0.18 }}>{T.icon}</Text>
          ))}
        </View>

        <Text style={[s.status, { color: c.muted }]}>
          {count >= T.goal ? 'Мақсатқа жеттіңіз!' : `Тағы ${T.goal - count} ${T.unit} қалды`}
        </Text>

        <View style={s.row}>
          <Pressable style={[s.btn, { backgroundColor: c.track }]} onPress={() => setCount(Math.max(0, count - 1))}>
            <Text style={[s.btnText, { color: c.text }]}>−</Text>
          </Pressable>
          <Pressable style={[s.btn, s.btnMain, { backgroundColor: accent }]} onPress={() => setCount(count + 1)}>
            <Text style={[s.btnText, { color: '#fff' }]}>{T.add}</Text>
          </Pressable>
          <Pressable style={[s.btn, { backgroundColor: c.track }]} onPress={() => setCount(0)}>
            <Text style={[s.btnText, { color: c.text }]}>↺</Text>
          </Pressable>
        </View>

        <View style={s.switchRow}>
          <Text style={{ color: c.text, fontSize: 16 }}>Қараңғы режим</Text>
          <Switch value={dark} onValueChange={setDark} />
        </View>
      </View>
    </View>
  );
}

const colors = {
  light: { bg: '#f3f181', card: '#ffffff', text: '#1e1b2e', muted: '#7b7781', track: '#e9e5f2' },
  dark: { bg: '#0f0d1a', card: '#1a1730', text: '#f1f0f9', muted: '#9a96b3', track: '#2b2748' },
};

const s = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingTop: 70, paddingBottom: 90, alignItems: 'center', borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: '800' },
  hello: { fontSize: 26, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 15, color: '#ffffffcc', marginTop: 4 },
  card: {
    marginHorizontal: 20, marginTop: -60, borderRadius: 24, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 6,
  },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 16 },
  count: { fontSize: 44, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  track: { height: 12, borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6 },
  icons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  status: { textAlign: 'center', fontSize: 15, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  btn: { height: 50, minWidth: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnMain: { flex: 1 },
  btnText: { fontSize: 17, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
