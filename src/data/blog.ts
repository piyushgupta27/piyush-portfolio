export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    title:
      "Building Realtime Messaging Infrastructure for 50M+ Concurrent Users",
    excerpt:
      "How we built realtime messaging at Disney+ Hotstar — sub-second latency, 25M+ concurrency baseline from the 2019 Cricket World Cup.",
    date: "Feb 2024",
    tag: "Distributed Systems",
    url: "https://piyushguptaece.medium.com/building-realtime-messaging-infrastructure-for-50m-concurrent-users-with-sub-second-latency-741d0ea04235",
  },
  {
    title: "Capturing A Billion Emo(j)i-ons",
    excerpt:
      "Bringing the stadium-energy emoji reactions in-house at Hotstar — performance, stability, and cost we couldn't get from a third-party.",
    date: "Feb 2024",
    tag: "Architecture",
    url: "https://piyushguptaece.medium.com/capturing-a-billion-emo-j-i-ons-a6b5a1d39e96",
  },
  {
    title: "Why I enjoyed working at Disney!",
    excerpt:
      "A reflection on engineering culture and craft from my time at Disney+ Hotstar.",
    date: "Aug 2019",
    tag: "Culture",
    url: "https://piyushguptaece.medium.com/why-i-enjoyed-working-disney-plus-c8ef83791334",
  },
  {
    title: "Scheduling tasks in Android made easy",
    excerpt:
      "Picking the right Android scheduling API across versions — AlarmManager, JobScheduler, GcmNetworkManager — and why we built Smart Scheduler.",
    date: "Dec 2016",
    tag: "Android",
    url: "https://medium.com/hypertrack/scheduling-tasks-in-android-made-easy-231ca8178e38",
  },
];
