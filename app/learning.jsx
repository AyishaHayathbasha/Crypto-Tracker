import React, { useState, useEffect } from "react";
import {  
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfettiCannon from "react-native-confetti-cannon";
import { lessons as initialLessons } from "../src/data/lessons.ts";
const STORAGE_KEY = "learning_progress";
const LEADERBOARD_KEY = "leaderboard_data";
const STREAK_KEY = "daily_streak";

export default function LearningScreen() {
  const [lessons, setLessons] = useState(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [xp, setXp] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [streak, setStreak] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = lessons.filter((l) => l.completed).length;
  const progress = completedCount / lessons.length;

  const badges = [
    { name: "Crypto Rookie", xp: 20 },
    { name: "Blockchain Pro", xp: 50 },
    { name: "Crypto Master", xp: 150 },
    { name: "Crypto Legend", xp: 300 },
  ];

  const getBadge = () => {
    let unlocked = badges.filter(b => xp >= b.xp);
    return unlocked.length ? unlocked[unlocked.length - 1].name : "New Learner";
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const savedLeaderboard = await AsyncStorage.getItem(LEADERBOARD_KEY);
        const savedStreak = await AsyncStorage.getItem(STREAK_KEY);

        if (saved) {
          const { lessons: savedLessons, xp: savedXp } = JSON.parse(saved);
          if (savedLessons) setLessons(savedLessons);
          if (savedXp) setXp(savedXp);
        }
        if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));

        // Streak logic
        const today = new Date().toDateString();
        const lastLogin = savedStreak ? JSON.parse(savedStreak).lastLogin : null;
        let newStreak = 1;
        if (lastLogin) {
          const diff =
            (new Date(today) - new Date(lastLogin)) / (1000 * 3600 * 24);
          if (diff === 1) newStreak = JSON.parse(savedStreak).streak + 1;
          else if (diff === 0) newStreak = JSON.parse(savedStreak).streak;
        }
        setStreak(newStreak);
        await AsyncStorage.setItem(
          STREAK_KEY,
          JSON.stringify({ lastLogin: today, streak: newStreak })
        );

        // Bonus XP for streak
        if (newStreak > 1) setXp(prev => prev + newStreak * 5);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ lessons, xp }));
      AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    }
  }, [lessons, xp, leaderboard, isLoading]);

  const updateLeaderboard = () => {
    const player = { name: "You", xp, badge: getBadge() };
    const updated = [player, ...leaderboard.filter((p) => p.name !== "You")];
    updated.sort((a, b) => b.xp - a.xp);
    setLeaderboard(updated);
  };

  const handleAnswer = (question, option, correct, hint) => {
    setAnswers((prev) => ({ ...prev, [question]: option }));
    if (option === correct) {
      setXp((prev) => prev + 10);
      updateLeaderboard();
    } else if (hint) {
      Alert.alert("Hint", hint);
    }
  };

  const handleMarkComplete = () => {
    const updatedLessons = lessons.map((l) =>
      l.id === selectedLesson.id ? { ...l, completed: true } : l
    );
    setLessons(updatedLessons);
    setXp((prev) => prev + 20);
    updateLeaderboard();
    setSelectedLesson(null);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleResetProgress = async () => {
    Alert.alert("Reset Progress", "Are you sure you want to reset all progress?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          const resetLessons = initialLessons.map((l) => ({
            ...l,
            completed: false,
          }));
          setLessons(resetLessons);
          setXp(0);
          setLeaderboard([]);
          await AsyncStorage.multiRemove([
            STORAGE_KEY,
            LEADERBOARD_KEY,
            STREAK_KEY,
          ]);
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </SafeAreaView>
    );
  }

  const filteredLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      {showConfetti && <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} fadeOut />}
      {selectedLesson ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
          <Text style={styles.lessonTitle}>{selectedLesson.title}</Text>
          {selectedLesson.videoUrl && (
            <View style={styles.videoContainer}>
              <WebView
                source={{ uri: selectedLesson.videoUrl }}
                allowsFullscreenVideo
                javaScriptEnabled
                domStorageEnabled
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                mixedContentMode="always"
                style={{ height: 220, borderRadius: 10 }}
              />
            </View>
          )}
          {selectedLesson.content && (
            <Text style={styles.lessonContent}>{selectedLesson.content}</Text>
          )}
          {selectedLesson.quiz && (
            <View style={styles.quizContainer}>
              <Text style={styles.quizHeader}>🧠 Quick Quiz</Text>
              {selectedLesson.quiz.map((q, i) => (
                <View key={i} style={styles.quizQuestion}>
                  <Text style={styles.questionText}>{q.question}</Text>
                  {q.options.map((opt, j) => (
                    <TouchableOpacity
                      key={j}
                      style={[
                        styles.optionButton,
                        answers[q.question] === opt && styles.selectedOption,
                      ]}
                      onPress={() => handleAnswer(q.question, opt, q.answer, q.hint)}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                  {answers[q.question] && (
                    <Text style={styles.feedbackText}>
                      {answers[q.question] === q.answer
                        ? "✅ Correct! +10 XP"
                        : `❌ Incorrect. Right answer: ${q.answer}`}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
          {!selectedLesson.completed && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleMarkComplete}
            >
              <Text style={styles.completeButtonText}>
                Mark as Completed ✅ (+20 XP)
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedLesson(null)}
          >
            <Text style={styles.backButtonText}>⬅ Back to Lessons</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text style={styles.header}>Crypto Learning Hub</Text>
          <TextInput
            placeholder="Search lessons..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9aa0b1"
          />
          <Animatable.View animation="pulse" iterationCount="infinite">
            <Text style={styles.xpText}>XP: {xp}</Text>
          </Animatable.View>
          <Text style={styles.badgeText}>{getBadge()}</Text>
          <Text style={styles.streakText}>🔥 Daily Streak: {streak} days</Text>

          <Progress.Bar
            progress={progress}
            width={null}
            color="#3b82f6"
            borderWidth={0}
            unfilledColor="#1e293b"
            height={12}
            borderRadius={10}
          />
          <Text style={styles.progressText}>
            {completedCount}/{lessons.length} lessons completed
          </Text>

          <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardHeader}>Leaderboard</Text>
            {leaderboard.map((p, i) => (
              <Text key={i} style={styles.leaderboardText}>
                {i + 1}. {p.name} — {p.xp} XP {p.badge}
              </Text>
            ))}
          </View>

          {filteredLessons.map((item) => (
            <Animatable.View
              animation={item.completed ? "bounceIn" : undefined}
              key={item.id}
            >
              <TouchableOpacity
                style={[
                  styles.lessonCard,
                  item.completed && styles.completedLesson,
                  !lessons[item.id - 2]?.completed && item.id > 1 ? { opacity: 0.5 } : {},
                ]}
                disabled={item.id > 1 && !lessons[item.id - 2]?.completed} // Unlockable lessons
                onPress={() => setSelectedLesson(item)}
              >
                <Text style={styles.lessonTitle}>{item.title}</Text>
                <Text style={styles.lessonDesc}>{item.description}</Text>
                {item.completed && <Text style={styles.completedText}>✔ Completed</Text>}
                {/* Per lesson progress bar */}
        
              </TouchableOpacity>
            </Animatable.View>
          ))}

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetProgress}
          >
            <Text style={styles.resetButtonText}>Reset My Progress</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  header: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  xpText: { color: "#3b82f6", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  badgeText: { color: "#fbbf24", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  streakText: { color: "#22c55e", textAlign: "center", marginVertical: 8 },
  progressText: { color: "#9aa0b1", marginVertical: 12, textAlign: "center" },
  videoContainer: { height: 220, borderRadius: 10, overflow: "hidden", backgroundColor: "#000", marginVertical: 10 },
  lessonCard: { backgroundColor: "#131c2e", padding: 16, borderRadius: 12, marginBottom: 12 },
  completedLesson: { borderColor: "#3b82f6", borderWidth: 1 },
  lessonTitle: { color: "white", fontSize: 18, fontWeight: "600" },
  lessonDesc: { color: "#9aa0b1", marginTop: 4 },
  completedText: { color: "#22c55e", marginTop: 6, fontWeight: "600" },
  lessonContent: { color: "#cbd5e1", marginTop: 12, lineHeight: 22 },
  completeButton: { marginTop: 20, padding: 12, backgroundColor: "#22c55e", borderRadius: 8, alignItems: "center" },
  completeButtonText: { color: "white", fontWeight: "600" },
  backButton: { marginTop: 20, padding: 12, backgroundColor: "#2563eb", borderRadius: 8, alignItems: "center" },
  backButtonText: { color: "white", fontWeight: "600" },
  quizContainer: { marginTop: 20, backgroundColor: "#1E293B", padding: 12, borderRadius: 8 },
  quizHeader: { color: "#fff", fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  quizQuestion: { marginBottom: 12 },
  questionText: { color: "#E2E8F0", marginBottom: 6 },
  optionButton: { backgroundColor: "#334155", padding: 10, borderRadius: 8, marginBottom: 6 },
  selectedOption: { backgroundColor: "#3b82f6" },
  optionText: { color: "#fff" },
  feedbackText: { marginTop: 4, color: "#22c55e", fontStyle: "italic" },
  leaderboardContainer: { backgroundColor: "#1E293B", padding: 12, borderRadius: 10, marginBottom: 20 },
  leaderboardHeader: { color: "#facc15", fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  leaderboardText: { color: "#E2E8F0", marginVertical: 3 },
  resetButton: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 8, alignItems: "center", marginTop: 20 },
  resetButtonText: { color: "white", fontWeight: "bold" },
  loadingText: { color: "white", fontSize: 18, textAlign: "center", marginTop: 100 },
  searchInput: { backgroundColor: "#1E293B", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 12 },
});