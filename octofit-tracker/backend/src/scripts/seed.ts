import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const teamSamples = [
      { name: 'OctoFit Trailblazers', points: 1850 },
      { name: 'OctoFit Wave Riders', points: 1625 },
    ];
    const existingTeams = await Team.find({ name: { $in: teamSamples.map(({ name }) => name) } });
    const teamsByName = new Map<string, (typeof existingTeams)[number]>();
    for (const team of existingTeams) {
      teamsByName.set(team.name, team);
    }
    const teamsToInsert = teamSamples
      .filter(({ name }) => !teamsByName.has(name))
      .map((team) => team);
    const insertedTeams = await Team.insertMany(teamsToInsert);
    for (const team of insertedTeams) {
      teamsByName.set(team.name, team);
    }

    const userSamples = [
      { name: 'Maya Chen', email: 'maya.chen@octofit.test', teamName: 'OctoFit Trailblazers' },
      { name: 'Leo Martin', email: 'leo.martin@octofit.test', teamName: 'OctoFit Trailblazers' },
      { name: 'Amara Okafor', email: 'amara.okafor@octofit.test', teamName: 'OctoFit Wave Riders' },
      { name: 'Noah Silva', email: 'noah.silva@octofit.test', teamName: 'OctoFit Wave Riders' },
    ];
    const existingUsers = await User.find({ email: { $in: userSamples.map(({ email }) => email) } });
    const usersByEmail = new Map<string, (typeof existingUsers)[number]>();
    for (const user of existingUsers) {
      usersByEmail.set(user.email, user);
    }
    const usersToInsert = userSamples
      .filter(({ email }) => !usersByEmail.has(email))
      .map(({ name, email, teamName }) => ({ name, email, team: teamsByName.get(teamName)!._id }));
    const insertedUsers = await User.insertMany(usersToInsert);
    for (const user of insertedUsers) {
      usersByEmail.set(user.email, user);
    }

    for (const teamSample of teamSamples) {
      const memberIds = userSamples
        .filter(({ teamName }) => teamName === teamSample.name)
        .map(({ email }) => usersByEmail.get(email)!._id);
      await Team.updateOne(
        { _id: teamsByName.get(teamSample.name)!._id },
        { $set: { members: memberIds, points: teamSample.points } },
      );
    }

    const activitySamples = [
      { email: 'maya.chen@octofit.test', type: 'Outdoor run', durationMinutes: 38, distanceKm: 5.2, points: 320, completedAt: new Date('2026-09-29T07:30:00Z') },
      { email: 'leo.martin@octofit.test', type: 'Cycling', durationMinutes: 52, distanceKm: 18.4, points: 410, completedAt: new Date('2026-09-30T17:15:00Z') },
      { email: 'amara.okafor@octofit.test', type: 'Strength training', durationMinutes: 45, distanceKm: 0, points: 280, completedAt: new Date('2026-09-30T08:00:00Z') },
      { email: 'noah.silva@octofit.test', type: 'Trail run', durationMinutes: 61, distanceKm: 8.1, points: 465, completedAt: new Date('2026-10-01T06:45:00Z') },
      { email: 'maya.chen@octofit.test', type: 'Yoga', durationMinutes: 30, distanceKm: 0, points: 180, completedAt: new Date('2026-10-01T18:00:00Z') },
    ];
    const activitiesToInsert = [];
    for (const activity of activitySamples) {
      const user = usersByEmail.get(activity.email)!;
      const exists = await Activity.exists({
        user: user._id,
        type: activity.type,
        completedAt: activity.completedAt,
      });
      if (!exists) {
        activitiesToInsert.push({ ...activity, user: user._id });
      }
    }
    await Activity.insertMany(activitiesToInsert);

    const leaderboardSamples = userSamples.map(({ email, teamName }, index) => ({
      user: usersByEmail.get(email)!._id,
      team: teamsByName.get(teamName)!._id,
      points: [920, 760, 845, 780][index],
      period: 'October 2026',
    }));
    const leaderboardToInsert = [];
    for (const entry of leaderboardSamples) {
      const exists = await Leaderboard.exists({ user: entry.user, period: entry.period });
      if (!exists) {
        leaderboardToInsert.push(entry);
      }
    }
    await Leaderboard.insertMany(leaderboardToInsert);

    const workoutSamples = [
      { name: 'Tempo Run', description: 'Steady aerobic intervals with a strong finish.', category: 'cardio', durationMinutes: 35, difficulty: 'moderate' },
      { name: 'Full-body Strength', description: 'A balanced circuit for major muscle groups.', category: 'strength', durationMinutes: 40, difficulty: 'moderate' },
      { name: 'Recovery Flow', description: 'Low-impact mobility and guided stretching.', category: 'mobility', durationMinutes: 25, difficulty: 'easy' },
      { name: 'Hill Repeats', description: 'Short uphill efforts to build power and endurance.', category: 'cardio', durationMinutes: 30, difficulty: 'hard' },
    ];
    const existingWorkouts = await Workout.find({ name: { $in: workoutSamples.map(({ name }) => name) } });
    const existingWorkoutNames = new Set(existingWorkouts.map(({ name }) => name));
    const workoutsToInsert = workoutSamples.filter(({ name }) => !existingWorkoutNames.has(name));
    await Workout.insertMany(workoutsToInsert);

    console.log('Database seeding complete', {
      teams: teamsToInsert.length,
      users: usersToInsert.length,
      activities: activitiesToInsert.length,
      leaderboard: leaderboardToInsert.length,
      workouts: workoutsToInsert.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
