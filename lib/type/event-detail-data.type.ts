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
      startTime: Date;
      endTime: Date;
    }[];
  }[];
};
