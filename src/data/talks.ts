export interface Talk {
  title: string;
  event: string;
  date: string;
  description: string;
  tags: string[];
  links: {
    label: string;
    href: string;
  }[];
}

export const talks: Talk[] = [
  {
    title: "PubSub Realtime Messaging Service @ Hotstar",
    event: "RootConf Delhi 2020",
    date: "January 2020",
    description:
      "How Hotstar built an MQTT-based PubSub system to handle 50M concurrent socket connections during the 2019 cricket season. Covers the architecture, failure modes, and how the system delivered 250B+ messages at peak concurrency.",
    tags: ["Infrastructure", "Distributed Systems", "MQTT", "Scale"],
    links: [
      {
        label: "Talk page",
        href: "https://hasgeek.com/rootconf/2020-delhi/sub/pubsub-realtime-messaging-service-hotstar-LP7A7b7ZVu6ibfgYFAcvXZ",
      },
      {
        label: "Blog post",
        href: "https://blog.hotstar.com/building-pubsub-for-50m-concurrent-socket-connections-5506e3c3dabf",
      },
    ],
  },
];
