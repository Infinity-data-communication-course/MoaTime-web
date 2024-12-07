export type EventDetailData = {
  id: number;
  hostId: number;
  title: string;
  dates: string[];
  startTime: number;
  endTime: number;
  hostName: string;
  eventJoins: {
    userId: number;
    userName: string;
    availableTimes: {
      date: Date;
      startTime: number;
      endTime: number;
    }[];
  }[];
};

export type AvailableTime = {
  date: Date;
  startTime: number;
  endTime: number;
};

export type eventJoin = {
  userId: number;
  userName: string;
  availableTimes: AvailableTime[];
};
