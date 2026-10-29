/* Single source of truth for the training programs and the pages that make up each one. */

export type ExamQuestion = { q: string; options: string[]; answer: number };

export type ProgramPage = { key: "overview" | "register" | "exam" | "coordinator" | "extra"; label: string; href: string; text: string; icon: string };

export type Program = {
  slug: string;
  name: string;
  short: string;
  /** base path of the program's overview (hub) page */
  base: string;
  description: string;
  highlights: string[];
  audience: string;
  step: string; // position in the growth journey
  registerLabel: string;
  registerText: string;
  /** the person who heads the program (photo goes in packages/shared/public/trainings/<slug>.jpg and is set here) */
  head: { name: string; title: string; photo?: string };
  prerequisites: string[];
  /** when the next class starts (shown on the program's general page) */
  nextClass: string;
  exam: { minutes: number; passMark: number; questions: ExamQuestion[] };
  extraPages?: { label: string; href: string; text: string; icon: string }[];
};

const EXAM_NOTE = "Sample questions — replace with the official question bank.";

export const PROGRAMS: Program[] = [
  {
    slug: "believers-class",
    name: "Believers Class",
    short: "BC",
    base: "/trainings/believers-class",
    description:
      "The first stage for every new believer. The Believers Class gets you up to speed with accurate, scripture-based teaching that creates a strong foundation for your spiritual growth, before you go on to the other stages.",
    highlights: ["The first step for a new believer", "Scripture-based foundation teaching", "Opens the way to the other stages"],
    audience: "Every new believer, and anyone who wants a solid foundation in the faith.",
    step: "Step 1",
    registerLabel: "Register",
    registerText: "Sign up for the next Believers Class.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["A decision to follow Jesus Christ", "A willingness to learn and attend every class"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 10,
      passMark: 60,
      questions: [
        { q: "What does it mean to be born again?", options: ["Joining a church", "Receiving new life in Christ by faith", "Being baptised as a child", "Keeping the law"], answer: 1 },
        { q: "Which Scripture says 'For God so loved the world…'?", options: ["John 3:16", "Psalm 23", "Romans 3:23", "Acts 2:38"], answer: 0 },
        { q: "How are we saved?", options: ["By good works", "By grace through faith", "By age", "By church attendance only"], answer: 1 },
        { q: "What is the Bible?", options: ["A history book only", "The inspired Word of God", "A book of stories", "A church rulebook"], answer: 1 },
        { q: "What should a new believer do to keep growing?", options: ["Pray, read the Word and fellowship", "Stay away from church", "Wait for a sign", "Do nothing"], answer: 0 },
      ],
    },
  },
  {
    slug: "water-baptism",
    name: "Water Baptism",
    short: "WB",
    base: "/trainings/water-baptism",
    description:
      "Take the step of public declaration of your faith in Jesus Christ through water baptism as commanded in scripture.",
    highlights: ["Open to all believers", "Biblical foundation class", "Certificate of baptism"],
    audience: "Every believer who has given their life to Christ.",
    step: "Step 2",
    registerLabel: "Register",
    registerText: "Sign up for the next water baptism class and service.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["A personal decision to follow Jesus Christ", "Attendance at a Believers Class (recommended)"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 10,
      passMark: 60,
      questions: [
        { q: "Who baptised Jesus in the River Jordan?", options: ["John the Baptist", "Peter", "Paul", "Philip"], answer: 0 },
        { q: "Which Scripture records the Great Commission, including baptism?", options: ["John 3:16", "Matthew 28:19", "Acts 1:8", "Romans 10:9"], answer: 1 },
        { q: "Baptism by immersion symbolises…", options: ["Joining a church", "Death, burial and resurrection with Christ", "Becoming a minister", "A cultural tradition"], answer: 1 },
        { q: "According to Acts 2:38, what should come with baptism?", options: ["Repentance", "Payment", "A certificate", "A sacrifice"], answer: 0 },
        { q: "Who is qualified for water baptism?", options: ["Only pastors", "Only the elderly", "Anyone who has believed in Jesus", "Only church workers"], answer: 2 },
      ],
    },
  },
  {
    slug: "workers-in-training",
    name: "Workers in Training (WIT)",
    short: "WIT",
    base: "/trainings/workers-in-training",
    description:
      "Equip yourself for effective ministry service within the local church and beyond through structured training.",
    highlights: ["Leadership development", "Ministry placement", "Mentorship program"],
    audience: "Members ready to serve in a church department.",
    step: "Step 3",
    registerLabel: "Register",
    registerText: "Apply to join the next Workers in Training class.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["Born again and baptised in water", "Completed the Believers Class", "A regular, committed member of the church"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 10,
      passMark: 60,
      questions: [
        { q: "Which act of Jesus models servant leadership (John 13)?", options: ["Feeding the five thousand", "Washing the disciples' feet", "Cleansing the temple", "Calming the storm"], answer: 1 },
        { q: "According to 1 Corinthians 4:2, what is required of stewards?", options: ["Eloquence", "Wealth", "Faithfulness", "Popularity"], answer: 2 },
        { q: "In Acts 6, the seven chosen to serve were to be…", options: ["Full of the Holy Spirit and wisdom", "The oldest members", "The wealthiest members", "Related to the apostles"], answer: 0 },
        { q: "Colossians 3:23 teaches us to work as unto…", options: ["Our leaders", "The Lord", "The congregation", "Ourselves"], answer: 1 },
        { q: "A worker's first quality in church service is…", options: ["Faithfulness and punctuality", "Fame", "Seniority", "Wealth"], answer: 0 },
      ],
    },
  },
  {
    slug: "school-of-disciples",
    name: "School of Disciples (SOD)",
    short: "SOD",
    base: "/trainings/school-of-disciples",
    description:
      "A discipleship training program designed to ground believers in the Word of God and prepare them for life-long ministry.",
    highlights: ["In-depth Bible study", "Spiritual formation", "Practical ministry training"],
    audience: "Believers who want to be grounded in the Word.",
    step: "Step 4",
    registerLabel: "Register",
    registerText: "Complete the School of Disciples application form.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["Born again", "Completed the Believers Class", "A desire to be grounded in the Word"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 10,
      passMark: 60,
      questions: [
        { q: "“All Scripture is God-breathed” is found in…", options: ["2 Timothy 3:16", "John 1:1", "Psalm 23", "Romans 12:2"], answer: 0 },
        { q: "A disciple is best described as…", options: ["A spectator", "A learner and follower of Jesus", "A church visitor", "A choir member"], answer: 1 },
        { q: "Which book records the growth of the early church?", options: ["Leviticus", "Acts", "Jude", "Ruth"], answer: 1 },
        { q: "Which of these is a spiritual discipline?", options: ["Prayer", "Gossip", "Procrastination", "Comparison"], answer: 0 },
        { q: "The Lord's Prayer is recorded in…", options: ["Matthew 6", "Genesis 1", "Acts 2", "Hebrews 11"], answer: 0 },
      ],
    },
  },
  {
    slug: "school-of-ministry",
    name: "School of Ministry (SOM)",
    short: "SOM",
    base: "/trainings/school-of-ministry",
    description:
      "A comprehensive ministry training school for those called to full-time or part-time pastoral and ministerial work.",
    highlights: ["Theology & doctrine", "Preaching & teaching", "Pastoral care skills"],
    audience: "Those called to pastoral and ministerial work.",
    step: "Step 5",
    registerLabel: "Register",
    registerText: "Apply for the School of Ministry.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["Born again and baptised in water", "A regular, committed member of the church", "A recommendation from your pastor or department head"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 15,
      passMark: 60,
      questions: [
        { q: "“Sound doctrine” refers to…", options: ["Healthy, biblical teaching", "A church building", "A style of music", "A leadership title"], answer: 0 },
        { q: "Which passage lists the qualities of an overseer?", options: ["1 Timothy 3", "Genesis 3", "Psalm 119", "Revelation 4"], answer: 0 },
        { q: "“Preach the word; be prepared in season and out of season” is from…", options: ["2 Timothy 4:2", "Ephesians 6:1", "James 1:5", "1 John 2:1"], answer: 0 },
        { q: "In John 21:15-17 Jesus told Peter to…", options: ["Feed my sheep", "Build a temple", "Fast forty days", "Write a gospel"], answer: 0 },
        { q: "The Great Commission calls us to…", options: ["Make disciples of all nations", "Build large churches", "Avoid other cultures", "Wait indefinitely"], answer: 0 },
      ],
    },
  },
  {
    slug: "rila",
    name: "RILA",
    short: "RILA",
    base: "/trainings/rila",
    description:
      "The Redeemed International Leadership Academy — advanced leadership formation for ministers and church leaders.",
    highlights: ["Advanced leadership training", "International certification", "Network of leaders"],
    audience: "Ministers and church leaders.",
    step: "Step 6",
    registerLabel: "Apply",
    registerText: "Complete the RILA application form.",
    extraPages: [
      { label: "Pastor attestation", href: "/trainings/rila/pastor", text: "Your pastor completes this from the link sent with your application.", icon: "✍️" },
      { label: "Sponsor form", href: "/trainings/rila/sponsor", text: "Your sponsor completes this from the link sent with your application.", icon: "🤝" },
    ],
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["A minister or church leader", "A recommendation from your pastor", "Completed the earlier training steps"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 15,
      passMark: 60,
      questions: [
        { q: "Proverbs 11:14 says there is safety in…", options: ["Many counsellors", "Silence", "Wealth", "Travel"], answer: 0 },
        { q: "How long did Nehemiah take to rebuild the wall (Neh 6:15)?", options: ["52 days", "7 days", "40 years", "3 months"], answer: 0 },
        { q: "Jethro advised Moses (Exodus 18) to…", options: ["Delegate leadership", "Leave Egypt", "Stop teaching", "Build an army"], answer: 0 },
        { q: "RILA is designed for…", options: ["Ministers and church leaders", "Children only", "Visitors only", "Musicians only"], answer: 0 },
        { q: "Servant leadership puts first the…", options: ["Needs of others", "Leader's comfort", "Leader's title", "Leader's income"], answer: 0 },
      ],
    },
  },
  {
    slug: "csr",
    name: "CSR Program",
    short: "CSR",
    base: "/csr",
    description:
      "The Christian Social Responsibility (CSR) centre equips people with practical skills — from make-up and gele tying to digital marketing and fashion design.",
    highlights: ["Hands-on vocational training", "Certification on completion", "Free registration"],
    audience: "Anyone who wants a practical skill.",
    step: "Skills",
    registerLabel: "Register your interest",
    registerText: "Tell us the skill you want to learn.",
    head: { name: "To be announced", title: "Head of program" },
    prerequisites: ["No prior experience needed", "A willingness to learn and attend every class", "Registration is free; tuition is ₦10,000 per course"],
    nextClass: "To be announced — check back soon",
    exam: {
      minutes: 10,
      passMark: 60,
      questions: [
        { q: "CSR in this programme stands for…", options: ["Christian Social Responsibility", "Church Sunday Roster", "Central Study Room", "Community Savings Record"], answer: 0 },
        { q: "Which of these is a CSR skill?", options: ["Digital marketing", "Space travel", "Deep-sea diving", "Aircraft repair"], answer: 0 },
        { q: "CSR training is aimed at…", options: ["Empowering people with skills", "Collecting offerings", "Printing programmes", "Choir rehearsals"], answer: 0 },
        { q: "A practical skill helps a person to…", options: ["Create income and serve others", "Avoid work", "Stay unknown", "Skip training"], answer: 0 },
        { q: "Certification is given…", options: ["On completing a course", "On registering", "Before attending", "Only to staff"], answer: 0 },
      ],
    },
  },
];

export const EXAM_DISCLAIMER = EXAM_NOTE;

export function getProgram(slug: string): Program {
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) throw new Error("Unknown program " + slug);
  return p;
}

/** The pages that make up a program (used by the tab strip, the hub cards, the menu and Quick Links). */
export function programPages(p: Program): ProgramPage[] {
  const registerHref = p.slug === "csr" ? "/csr#register" : p.slug === "rila" ? "/trainings/rila/apply" : p.slug === "believers-class" ? "/membership-class" : `${p.base}/register`;
  const pages: ProgramPage[] = [
    { key: "overview", label: "Overview", href: p.base, text: "About the program and how it works.", icon: "📘" },
    { key: "register", label: p.registerLabel, href: registerHref, text: p.registerText, icon: "📝" },
  ];
  (p.extraPages ?? []).forEach((e) => pages.push({ key: "extra", ...e }));
  pages.push(
    { key: "exam", label: "Online timed exam", href: `${p.base}/exam`, text: "Take your timed online exam.", icon: "⏱️" },
    { key: "coordinator", label: "Coordinator", href: `${p.base}/coordinator`, text: "For program coordinators: students, attendance, scores and remarks.", icon: "🧑‍🏫" },
  );
  return pages;
}


/** The two entries each training shows in menus and tab strips: its general page, and online registration. */
export function programMenu(p: Program): { label: string; href: string }[] {
  const registerHref = p.slug === "csr" ? "/csr#register" : p.slug === "rila" ? "/trainings/rila/apply" : p.slug === "believers-class" ? "/membership-class" : `${p.base}/register`;
  return [
    { label: "Home", href: p.base },
    { label: "Register online", href: registerHref },
  ];
}
