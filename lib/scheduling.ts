export interface Room {
  id: string;
  name: string;
  moderatorId?: string;
  moderatorName?: string;
}

export interface Matchup {
  round: number;
  team1Id: string;
  team2Id: string;
  roomId: string;
  roomName: string;
  moderatorId?: string;
  moderatorName?: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Generates a round-robin tournament schedule using the Berger tables algorithm.
 * Automatically handles an odd number of teams by adding a "BYE" round.
 * Maps matchups to available rooms and time slots without double-booking.
 */
export function generateRoundRobinSchedule(
  teamIds: string[],
  rooms: Room[],
  startDate: Date,
  matchDurationMinutes: number = 30
): Matchup[] {
  if (teamIds.length < 2) {
    throw new Error("At least 2 teams are required to generate a schedule.");
  }
  if (rooms.length === 0) {
    throw new Error("At least 1 room is required to generate a schedule.");
  }

  const teams = [...teamIds];
  // If odd number of teams, add a dummy "BYE" team
  if (teams.length % 2 !== 0) {
    teams.push('BYE');
  }

  const numTeams = teams.length;
  const numRounds = numTeams - 1;
  const matchesPerRound = numTeams / 2;

  const schedule: Matchup[] = [];
  
  // Track when each room is next available
  const roomAvailableFrom: Record<string, Date> = {};
  rooms.forEach(r => {
    roomAvailableFrom[r.id] = new Date(startDate);
  });

  // Track when each team is next available
  const teamAvailableFrom: Record<string, Date> = {};
  teams.forEach(t => {
    teamAvailableFrom[t] = new Date(startDate);
  });

  for (let round = 0; round < numRounds; round++) {
    const roundMatches: { team1: string, team2: string }[] = [];
    
    // Generate matchups for this round using Berger algorithm
    for (let i = 0; i < matchesPerRound; i++) {
      const team1 = teams[i];
      const team2 = teams[numTeams - 1 - i];
      
      // Skip the match if one of the teams is the BYE dummy
      if (team1 !== 'BYE' && team2 !== 'BYE') {
        roundMatches.push({ team1, team2 });
      }
    }

    // Assign rooms and times for the matches in this round
    for (const match of roundMatches) {
      // Find the earliest available room
      let earliestRoom = rooms[0];
      let earliestRoomTime = roomAvailableFrom[earliestRoom.id];

      for (let i = 1; i < rooms.length; i++) {
        const r = rooms[i];
        if (roomAvailableFrom[r.id] < earliestRoomTime) {
          earliestRoom = r;
          earliestRoomTime = roomAvailableFrom[r.id];
        }
      }

      // The match can start when BOTH teams and the ROOM are available
      const t1Time = teamAvailableFrom[match.team1];
      const t2Time = teamAvailableFrom[match.team2];
      
      const matchStartTime = new Date(
        Math.max(
          earliestRoomTime.getTime(),
          t1Time.getTime(),
          t2Time.getTime()
        )
      );

      const matchEndTime = new Date(matchStartTime.getTime() + matchDurationMinutes * 60000);

      schedule.push({
        round: round + 1,
        team1Id: match.team1,
        team2Id: match.team2,
        roomId: earliestRoom.id,
        roomName: earliestRoom.name,
        moderatorId: earliestRoom.moderatorId,
        moderatorName: earliestRoom.moderatorName,
        startTime: matchStartTime,
        endTime: matchEndTime,
      });

      // Update availability
      roomAvailableFrom[earliestRoom.id] = matchEndTime;
      teamAvailableFrom[match.team1] = matchEndTime;
      teamAvailableFrom[match.team2] = matchEndTime;
    }

    // Rotate teams for the next round (keep first team fixed, rotate the rest clockwise)
    const fixed = teams[0];
    const last = teams.pop()!;
    teams.splice(1, 0, last);
  }

  // Sort schedule chronologically
  schedule.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  return schedule;
}
