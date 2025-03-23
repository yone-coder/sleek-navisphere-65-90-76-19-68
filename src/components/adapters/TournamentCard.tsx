
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Card } from './CoreComponents';

// This is a simplified version of the tournament card adapted for React Native
// You'll need to adapt all your components following a similar pattern

interface TournamentCardProps {
  tournament: {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    status: "upcoming" | "in-progress" | "closed" | "completed";
    prize_pool: number;
    max_participants: number;
    current_participants: number;
    banner_url: string;
    game: string;
  };
  onPress?: () => void;
}

export const AdaptiveTournamentCard = ({ tournament, onPress }: TournamentCardProps) => {
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const statusColors = {
    'in-progress': '#10b981',
    'upcoming': '#3b82f6',
    'closed': '#ef4444',
    'completed': '#6b7280',
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'Live';
      case 'upcoming': return 'Upcoming';
      case 'closed': return 'Closed';
      case 'completed': return 'Completed';
      default: return 'Upcoming';
    }
  };

  const statusColor = statusColors[tournament.status] || '#3b82f6';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: tournament.banner_url }}
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
              <Text style={styles.badgeText}>
                {formattedDate(tournament.start_date)} - {formattedDate(tournament.end_date)}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: statusColor }]}>
              <Text style={styles.badgeText}>
                {getStatusText(tournament.status)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {tournament.title}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Prize Pool</Text>
              <Text style={styles.statValue}>${tournament.prize_pool.toLocaleString()}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Participants</Text>
              <Text style={styles.statValue}>
                {tournament.current_participants}/{tournament.max_participants}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(tournament.current_participants / tournament.max_participants) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {tournament.max_participants - tournament.current_participants} slots left
            </Text>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    padding: 0,
  },
  bannerContainer: {
    height: 150,
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    gap: 5,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#4b5563',
    fontWeight: '600',
  },
});
