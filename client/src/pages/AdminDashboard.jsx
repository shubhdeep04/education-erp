
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* ─── localStorage helpers ─────────────────────────────────── */
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val))

/* ─── Default seed data ─────────────────────────────────────── */
const DEFAULT_STUDENTS = [
  { id: 1, name: "Ananya Sharma",  email: "ananya@edu.in",  phone: "9876543210", course: "JEE Foundation",  status: "active",  fee: "Paid",    attendance: 92, grade: "A", dob: "2007-03-15", parentName: "Ramesh Sharma",  parentPhone: "9876500010", address: "Civil Lines, Khandwa", notes: "Excellent in Physics" },
  { id: 2, name: "Ravi Mishra",    email: "ravi@edu.in",    phone: "9876500001", course: "NEET Prep",        status: "pending", fee: "Pending",  attendance: 75, grade: "B", dob: "2006-07-22", parentName: "Suresh Mishra",  parentPhone: "9876500011", address: "Naya Bazaar, Khandwa", notes: "Fee pending since Jan" },
  { id: 3, name: "Meera Joshi",    email: "meera@edu.in",   phone: "9876500002", course: "Commerce",         status: "active",  fee: "Paid",    attendance: 88, grade: "A+",dob: "2007-11-05", parentName: "Vijay Joshi",    parentPhone: "9876500012", address: "Station Road, Khandwa", notes: "" },
  { id: 4, name: "Arjun Rao",      email: "arjun@edu.in",   phone: "9876500003", course: "Computer Science", status: "active",  fee: "Paid",    attendance: 95, grade: "A", dob: "2006-09-18", parentName: "Mohan Rao",      parentPhone: "9876500013", address: "Gandhi Chowk, Khandwa", notes: "Top performer in CS" },
  { id: 5, name: "Pooja Verma",    email: "pooja@edu.in",   phone: "9876500004", course: "Arts",             status: "inactive",fee: "Pending", attendance: 45, grade: "C", dob: "2007-01-30", parentName: "Dinesh Verma",   parentPhone: "9876500014", address: "Indore Road, Khandwa", notes: "Low attendance - action needed" },
]
const DEFAULT_TEACHERS = [
  { id: 1, name: "Dr. Sunita Patel", email: "sunita@edu.in", phone: "9800000001", subject: "Physics",     qualification: "PhD", status: "active", salary: "45000", joinDate: "2015-06-01", classes: "JEE Foundation, NEET Prep", experience: "12 years", address: "Civil Lines, Khandwa", schedule: "Mon,Wed,Fri - 9AM to 1PM" },
  { id: 2, name: "Mr. Anil Khan",    email: "anil@edu.in",   phone: "9800000002", subject: "Mathematics", qualification: "MSc", status: "active", salary: "38000", joinDate: "2018-07-15", classes: "JEE Foundation, Commerce", experience: "8 years",  address: "Naya Bazaar, Khandwa", schedule: "Tue,Thu,Sat - 10AM to 2PM" },
  { id: 3, name: "Mrs. Rita Gupta",  email: "rita@edu.in",   phone: "9800000003", subject: "Chemistry",   qualification: "MSc", status: "active", salary: "36000", joinDate: "2019-01-10", classes: "NEET Prep",               experience: "6 years",  address: "Station Road, Khandwa", schedule: "Mon,Wed,Fri - 2PM to 6PM" },
  { id: 4, name: "Mr. Deepak Jha",   email: "deepak@edu.in", phone: "9800000004", subject: "English",     qualification: "MA",  status: "active", salary: "32000", joinDate: "2020-03-20", classes: "Arts, Commerce",          experience: "5 years",  address: "Gandhi Chowk, Khandwa", schedule: "Tue,Thu - 9AM to 1PM" },
]
const DEFAULT_COURSES = [
  { id: 1, name: "JEE Foundation",  duration: "18 months", fee: "35000", seats: 60, enrolled: 42, status: "active", teacher: "Dr. Sunita Patel", batchTime: "7:00 AM – 9:00 AM", syllabus: "Physics, Chemistry, Mathematics (PCM)", startDate: "2025-01-01", description: "Comprehensive JEE preparation with focus on concept clarity and problem-solving." },
  { id: 2, name: "NEET Prep",       duration: "18 months", fee: "32000", seats: 60, enrolled: 38, status: "active", teacher: "Mrs. Rita Gupta",  batchTime: "9:00 AM – 11:00 AM",syllabus: "Physics, Chemistry, Biology (PCB)",  startDate: "2025-01-01", description: "Focused NEET preparation with detailed biology and chemistry coverage." },
  { id: 3, name: "Commerce Pro",    duration: "12 months", fee: "15000", seats: 50, enrolled: 28, status: "active", teacher: "Mr. Anil Khan",    batchTime: "11:00 AM – 1:00 PM", syllabus: "Accountancy, Business Studies, Economics", startDate: "2025-02-01", description: "Commerce stream with practical business knowledge and CA foundation exposure." },
  { id: 4, name: "Computer Science",duration: "10 months", fee: "22000", seats: 40, enrolled: 35, status: "active", teacher: "Mr. Deepak Jha",   batchTime: "2:00 PM – 4:00 PM",  syllabus: "C++, Python, DBMS, Networking",     startDate: "2025-01-15", description: "Modern CS curriculum including programming, data structures and networking." },
  { id: 5, name: "Arts & Humanities",duration:"12 months", fee: "12000", seats: 40, enrolled: 19, status: "active", teacher: "Mr. Deepak Jha",   batchTime: "4:00 PM – 6:00 PM",  syllabus: "History, Geography, Political Science, English", startDate: "2025-02-01", description: "Humanities stream with UPSC foundation modules." },
]
const DEFAULT_NOTICES = [
  { id: 1, title: "Annual Sports Day", date: "2025-02-10", expiryDate: "2025-02-16", category: "Event",   content: "Annual Sports Day will be held on 15th February. All students must participate. Registration starts from 5th February.", pinned: true,  views: 142, tags: "sports,compulsory,february" },
  { id: 2, title: "Fee Due Reminder",  date: "2025-01-25", expiryDate: "2025-01-31", category: "Finance", content: "Last date for fee submission is 31st January. Late fee of ₹500 will be charged after that. Contact accounts office for UPI details.", pinned: false, views: 98, tags: "fee,urgent,deadline"   },
  { id: 3, title: "Holiday Notice",    date: "2025-01-20", expiryDate: "2025-01-27", category: "General", content: "School will remain closed on 26th January for Republic Day celebrations. Special flag hoisting ceremony at 8 AM — all invited.", pinned: false, views: 75, tags: "holiday,republic-day"   },
]
const DEFAULT_GALLERY = [
  { id: 1, caption: "Annual Convocation 2024", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=70", category: "Event",   album: "Convocation 2024" },
  { id: 2, caption: "Science Exhibition",      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70", category: "Academic", album: "Academic Events" },
  { id: 3, caption: "Library Reading Hall",    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70", category: "Campus",   album: "Campus Life"    },
  { id: 4, caption: "Sports Day 2024",         url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=70", category: "Sports",   album: "Sports 2024"    },
]
const DEFAULT_FEES = [
  { id: 1, student: "Ananya Sharma", course: "JEE Foundation", amount: "35000", paid: "35000", date: "2025-01-05", status: "Paid",    method: "UPI",  txnId: "TXN001234", remarks: "" },
  { id: 2, student: "Ravi Mishra",   course: "NEET Prep",       amount: "32000", paid: "0",     date: "—",          status: "Pending", method: "—",    txnId: "",           remarks: "Reminder sent on Jan 25" },
  { id: 3, student: "Meera Joshi",   course: "Commerce Pro",    amount: "15000", paid: "15000", date: "2025-01-10", status: "Paid",    method: "Cash", txnId: "CASH-003",   remarks: "" },
  { id: 4, student: "Arjun Rao",     course: "Computer Science",amount: "22000", paid: "11000", date: "2025-01-12", status: "Partial", method: "NEFT", txnId: "NEFT-0089",  remarks: "Balance ₹11000 due by Feb 15" },
  { id: 5, student: "Pooja Verma",   course: "Arts & Humanities",amount:"12000", paid: "0",     date: "—",          status: "Pending", method: "—",    txnId: "",           remarks: "Parent contacted" },
]
const DEFAULT_TIMETABLE = [
  { id: 1, day: "Monday",    subject: "Physics",     teacher: "Dr. Sunita Patel", time: "7:00 AM – 9:00 AM",  room: "Room 101", course: "JEE Foundation"  },
  { id: 2, day: "Monday",    subject: "Chemistry",   teacher: "Mrs. Rita Gupta",  time: "9:00 AM – 11:00 AM", room: "Lab 1",    course: "NEET Prep"       },
  { id: 3, day: "Tuesday",   subject: "Mathematics", teacher: "Mr. Anil Khan",    time: "7:00 AM – 9:00 AM",  room: "Room 102", course: "JEE Foundation"  },
  { id: 4, day: "Wednesday", subject: "English",     teacher: "Mr. Deepak Jha",   time: "2:00 PM – 4:00 PM",  room: "Room 201", course: "Arts & Humanities"},
  { id: 5, day: "Thursday",  subject: "Mathematics", teacher: "Mr. Anil Khan",    time: "11:00 AM – 1:00 PM", room: "Room 103", course: "Commerce Pro"    },
  { id: 6, day: "Friday",    subject: "Physics",     teacher: "Dr. Sunita Patel", time: "9:00 AM – 11:00 AM", room: "Room 101", course: "NEET Prep"       },
  { id: 7, day: "Saturday",  subject: "Computer Sc.",teacher: "Mr. Deepak Jha",   time: "2:00 PM – 4:00 PM",  room: "Lab 2",    course: "Computer Science"},
]
const DEFAULT_EXAMS = [
  { id: 1, title: "JEE Monthly Test – Feb",    date: "2025-02-08", course: "JEE Foundation",   subject: "Physics + Chemistry", duration: "3 hours", maxMarks: "300", status: "Upcoming", room: "Hall A" },
  { id: 2, title: "NEET Mock Test – Feb",       date: "2025-02-10", course: "NEET Prep",        subject: "Full Syllabus",       duration: "3 hours", maxMarks: "720", status: "Upcoming", room: "Hall B" },
  { id: 3, title: "Commerce Unit Test 1",       date: "2025-01-28", course: "Commerce Pro",     subject: "Accountancy",         duration: "2 hours", maxMarks: "100", status: "Completed",room: "Room 101"},
  { id: 4, title: "CS Practical Exam",          date: "2025-02-15", course: "Computer Science", subject: "Python Programming",  duration: "2 hours", maxMarks: "50",  status: "Upcoming", room: "Lab 2"  },
]
const DEFAULT_EVENTS = [
  { id: 1, title: "Annual Sports Day",       date: "2025-02-15", time: "9:00 AM", venue: "School Ground",    type: "Sports",   organizer: "Sports Dept",    status: "Upcoming",   description: "Inter-house sports competition. All students must participate.", registrations: 85 },
  { id: 2, title: "Science Exhibition",      date: "2025-03-05", time: "10:00 AM",venue: "School Hall",      type: "Academic", organizer: "Science Dept",   status: "Upcoming",   description: "Students will showcase science models and experiments.", registrations: 45 },
  { id: 3, title: "Parent-Teacher Meeting",  date: "2025-01-20", time: "11:00 AM",venue: "Main Auditorium",  type: "Meeting",  organizer: "Admin",          status: "Completed",  description: "Monthly PTM for progress discussion.", registrations: 120 },
  { id: 4, title: "Republic Day Celebration",date: "2025-01-26", time: "8:00 AM", venue: "School Ground",    type: "Cultural", organizer: "Cultural Dept",  status: "Completed",  description: "Flag hoisting and cultural programs.", registrations: 200 },
]

/* ─── Default Site Settings ─────────────────────────────────── */
const DEFAULT_SITE = {
  schoolName:    "EduSphere",
  tagline:       "Shape Your Future with Excellence",
  heroDesc:      "EduSphere is where ambition meets opportunity. Join thousands of students on the path to academic mastery and lifelong success.",
  heroBadge:     "Now Enrolling for 2025–26",
  stat1Val:      "5,000+", stat1Label: "Students Enrolled",
  stat2Val:      "120+",   stat2Label: "Courses Offered",
  stat3Val:      "98%",    stat3Label: "Satisfaction Rate",
  stat4Val:      "25+",    stat4Label: "Years of Excellence",
  aboutTitle:    "25 Years of Shaping Minds",
  aboutDesc1:    "Founded in 2000, EduSphere began as a single classroom with a bold vision — to provide world-class education accessible to every aspiring student in central India.",
  aboutDesc2:    "Today, we're a full-scale institution with over 5,000 students, 200+ faculty members, and a legacy of academic excellence that spans two and a half decades.",
  aboutMission:  "Our mission is to provide holistic education that nurtures intellectual curiosity, moral integrity and professional excellence in every student.",
  aboutVision:   "To be the most trusted educational institution in central India, producing leaders who transform communities.",
  feat1Title:    "Expert Faculty",      feat1Desc: "Learn from PhDs and industry professionals with proven teaching excellence.",
  feat2Title:    "Modern Infrastructure",feat2Desc: "State-of-the-art labs, smart classrooms and a fully-stocked library.",
  feat3Title:    "Proven Results",      feat3Desc: "Consistent top-rank holders in JEE, NEET and board examinations.",
  feat4Title:    "Holistic Development",feat4Desc: "Sports, arts, debates and cultural activities alongside academics.",
  address:       "EduSphere Campus, Civil Lines, Khandwa, Madhya Pradesh 450001",
  phone:         "+91 98765 43210",
  phone2:        "+91 73451 00000",
  email:         "info@edusphere.in",
  email2:        "admissions@edusphere.in",
  hours:         "Mon–Sat: 8:00 AM – 6:00 PM",
  mapEmbed:      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.7!2d76.35!3d21.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKhandwa!5e0!3m2!1sen!2sin!4v1",
  ctaTitle:      "Ready to Begin Your Journey?",
  ctaSubtitle:   "Seats are filling fast. Secure your spot today and take the first step toward a brilliant future.",
  ctaBadge:      "Limited Seats Available",
  ctaBtn1:       "Apply Now",
  ctaBtn2:       "Download Brochure",
  logoText:      "EduSphere",
  logoTagline:   "Excellence in Education",
  footerDesc:    "Empowering learners through world-class education. Building tomorrow's leaders, today.",
  footerCopyright:"© 2025 EduSphere. All rights reserved.",
  socialFacebook: "https://facebook.com/edusphere",
  socialInstagram:"https://instagram.com/edusphere",
  socialYoutube:  "https://youtube.com/edusphere",
  socialTwitter:  "https://twitter.com/edusphere",
  loginBg:       "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  loginQuote:    "Education is the most powerful weapon which you can use to change the world.",
  loginAuthor:   "Nelson Mandela",
  loginTitle:    "Welcome Back",
  loginSubtitle: "Sign in to your EduSphere Admin Portal",
  heroImage:     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
  aboutImage:    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  navbarBg:      "rgba(10,10,10,0.95)",
  primaryColor:  "#c9a84c",
  admissionOpen: "true",
  admissionMsg:  "Admissions open for 2025–26 batch. Limited seats available!",
  whatsapp:      "9876543210",
  metaTitle:     "EduSphere – Shape Your Future with Excellence",
  metaDesc:      "EduSphere offers JEE, NEET, Commerce and Arts coaching in Khandwa, MP. Join 5000+ students.",
  // ── Stats Bar
  stat1Val:"5,000+", stat1Label:"Students Enrolled",
  stat2Val:"120+",   stat2Label:"Courses Offered",
  stat3Val:"98%",    stat3Label:"Satisfaction Rate",
  stat4Val:"25+",    stat4Label:"Years of Excellence",
  // ── Counter Stats (6)
  counter1End:"5000",  counter1Suffix:"+", counter1Label:"Students Enrolled",  counter1Icon:"🎓",
  counter2End:"120",   counter2Suffix:"+", counter2Label:"Courses Offered",    counter2Icon:"📚",
  counter3End:"98",    counter3Suffix:"%", counter3Label:"Satisfaction Rate",  counter3Icon:"⭐",
  counter4End:"200",   counter4Suffix:"+", counter4Label:"Faculty Members",    counter4Icon:"👨‍🏫",
  counter5End:"25",    counter5Suffix:"+", counter5Label:"Years of Excellence",counter5Icon:"🏆",
  counter6End:"15000", counter6Suffix:"+", counter6Label:"Alumni Worldwide",   counter6Icon:"🌍",
  // ── Features (6) - icons added
  feat1Icon:"🎓", feat2Icon:"💻", feat3Icon:"🏆", feat4Icon:"🤝", feat5Icon:"📊", feat6Icon:"🌍",
  feat5Title:"Progress Tracking", feat5Desc:"Real-time dashboards to track your academic journey, attendance, and performance.",
  feat6Title:"Global Network",    feat6Desc:"Connect with alumni across the globe and build lifelong professional relationships.",
  // ── Achievements (4)
  ach1Icon:"🥇", ach1Year:"2024", ach1Title:"Best Educational Institution", ach1Body:"Awarded by MP Government for outstanding academic excellence and student development.",
  ach2Icon:"🏅", ach2Year:"2023", ach2Title:"NAAC A++ Accreditation",       ach2Body:"Received highest accreditation grade from National Assessment & Accreditation Council.",
  ach3Icon:"🎖️", ach3Year:"2022", ach3Title:"National Innovation Award",    ach3Body:"Recognized for pioneering digital learning initiatives across central India.",
  ach4Icon:"🌟", ach4Year:"2021", ach4Title:"Top 10 Schools of India",      ach4Body:"Ranked among India's top institutions by Education World magazine.",
  // ── Testimonials (6)
  test1Name:"Priya Sharma",   test1Role:"JEE Advanced Qualifier, IIT Delhi",  test1Avatar:"P", test1Text:"EduSphere completely transformed my approach to learning. The faculty is world-class and the personal mentorship helped me crack JEE Advanced on my first attempt.",
  test2Name:"Rohan Verma",    test2Role:"NEET Qualifier, AIIMS Delhi",         test2Avatar:"R", test2Text:"The structured preparation, mock tests, and doubt-clearing sessions at EduSphere gave me the confidence to achieve my dream of getting into AIIMS.",
  test3Name:"Sneha Patel",    test3Role:"CA Final, Big 4 Firm",                test3Avatar:"S", test3Text:"From commerce foundations to CA Finals — EduSphere was with me every step. The faculty's industry experience made all the difference.",
  test4Name:"Aditya Rao",     test4Role:"Software Engineer, Google",           test4Avatar:"A", test4Text:"The Computer Science program at EduSphere gave me a rock-solid foundation. I credit my placement at Google entirely to the quality of education here.",
  test5Name:"Meera Joshi",    test5Role:"Civil Services (IAS), Batch 2023",    test5Avatar:"M", test5Text:"EduSphere's disciplined environment and expert guidance helped me crack UPSC in my very first attempt. Forever grateful.",
  test6Name:"Arjun Malhotra", test6Role:"MBA, IIM Ahmedabad",                  test6Avatar:"A", test6Text:"The holistic education at EduSphere — academics, personality development, and real-world exposure — prepared me perfectly for IIM.",
  // ── Team (6)
  team1Name:"Dr. Rajesh Kumar",  team1Role:"Principal & Founder",     team1Subject:"Physics",      team1Exp:"30+ yrs", team1Avatar:"R",
  team2Name:"Mrs. Sunita Patel", team2Role:"Head of Science Dept.",   team2Subject:"Chemistry",    team2Exp:"22+ yrs", team2Avatar:"S",
  team3Name:"Mr. Anil Sharma",   team3Role:"Head of Mathematics",     team3Subject:"Mathematics",  team3Exp:"18+ yrs", team3Avatar:"A",
  team4Name:"Dr. Priya Gupta",   team4Role:"Head of Commerce",        team4Subject:"Accountancy",  team4Exp:"15+ yrs", team4Avatar:"P",
  team5Name:"Mr. Rohit Joshi",   team5Role:"CS & Technology Lead",    team5Subject:"Computer Sci.",team5Exp:"12+ yrs", team5Avatar:"R",
  team6Name:"Mrs. Kavita Singh", team6Role:"Head of Languages",       team6Subject:"English",      team6Exp:"20+ yrs", team6Avatar:"K",
  // ── Events (6)
  ev1Date:"15", ev1Month:"Jan", ev1Title:"Annual Science Exhibition",      ev1Time:"10:00 AM", ev1Venue:"Main Hall",    ev1Cat:"Academic",
  ev2Date:"22", ev2Month:"Jan", ev2Title:"JEE/NEET Mock Test Series",      ev2Time:"8:00 AM",  ev2Venue:"Exam Centre",  ev2Cat:"Exam",
  ev3Date:"05", ev3Month:"Feb", ev3Title:"Inter-School Debate Competition", ev3Time:"2:00 PM",  ev3Venue:"Auditorium",   ev3Cat:"Cultural",
  ev4Date:"14", ev4Month:"Feb", ev4Title:"Career Counselling Seminar",     ev4Time:"11:00 AM", ev4Venue:"Seminar Hall", ev4Cat:"Career",
  ev5Date:"28", ev5Month:"Feb", ev5Title:"Annual Sports Day",              ev5Time:"9:00 AM",  ev5Venue:"Sports Ground",ev5Cat:"Sports",
  ev6Date:"10", ev6Month:"Mar", ev6Title:"Parent-Teacher Meeting",         ev6Time:"3:00 PM",  ev6Venue:"All Classes",  ev6Cat:"Meeting",
  // ── Partners
  partners:"IIT Delhi,AIIMS,CBSE Board,ICSE Council,Coursera,Khan Academy,NIT Bhopal,IIM Indore,BYJU'S,Unacademy,TopRankers,Allen Institute",
  // ── FAQ (6)
  faq1Q:"What courses does EduSphere offer?",          faq1A:"We offer programs for Science (PCM/PCB), Commerce, Arts, Computer Science, and entrance exam preparation including JEE, NEET, CA Foundation, and CLAT.",
  faq2Q:"What is the admission process?",              faq2A:"You can apply online or visit our campus. The process includes a registration form, entrance test, counselling session, and document verification. Seats are limited.",
  faq3Q:"Does EduSphere provide hostel facilities?",   faq3A:"Yes, we have separate hostel facilities for boys and girls with 24/7 security, nutritious meals, and a conducive study environment.",
  faq4Q:"Are scholarships available?",                 faq4A:"Yes! We offer merit-based scholarships (up to 100% fee waiver) and need-based financial assistance. Contact our admissions office for details.",
  faq5Q:"What is the student-to-teacher ratio?",       faq5A:"We maintain a low 15:1 student-teacher ratio to ensure personalized attention and quality education for every student.",
  faq6Q:"How can I track my child's academic progress?", faq6A:"Parents can access the student portal using login credentials provided at admission. It shows attendance, grades, assignments, and notices in real-time.",
  // ── Newsletter
  newsletterTitle:"Subscribe to Our",
  newsletterDesc: "Get the latest updates on admissions, events, scholarships, and academic news delivered straight to your inbox.",
  // ── Video
  videoUrl:     "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
  videoHeading: "Experience Campus Life",
  videoDesc:    "Take a virtual tour of our world-class campus, meet our faculty, and see why thousands of students choose EduSphere every year.",
}

/* ─── Reusable Modal ────────────────────────────────────────── */
function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#1a1a1a", border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: 16, padding: 36, width: "100%", maxWidth: wide ? 720 : 520,
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)" }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ─── Field helpers ─────────────────────────────────────────── */
function Field({ label, name, value, onChange, type = "text", options, placeholder }) {
  const style = {
    width: "100%", padding: "11px 14px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14,
    outline: "none", marginBottom: 0, boxSizing: "border-box",
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{label}</label>
      {options ? (
        <select name={name} value={value} onChange={onChange} style={style}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} style={style} placeholder={placeholder || ""} />
      )}
    </div>
  )
}

/* ─── Section Header ────────────────────────────────────────── */
function SectionHeader({ title, subtitle, onAdd, addLabel = "+ Add New" }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
      <div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--cream)", marginBottom: 4 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{subtitle}</div>}
      </div>
      {onAdd && (
        <button className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }} onClick={onAdd}>{addLabel}</button>
      )}
    </div>
  )
}

/* ─── Action Buttons ────────────────────────────────────────── */
function ActionBtn({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: color ? color + "18" : "rgba(201,168,76,0.12)",
      border: `1px solid ${color ? color + "55" : "rgba(201,168,76,0.3)"}`,
      color: color || "var(--gold)", borderRadius: 6, padding: "5px 12px",
      fontSize: 12, fontWeight: 600, cursor: "pointer", marginRight: 6,
      fontFamily: "'DM Sans',sans-serif",
    }}>{label}</button>
  )
}

/* ─── Info Row ──────────────────────────────────────────────── */
function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 14 }}>
      <span style={{ color: "var(--gold)", fontWeight: 600, minWidth: 140, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      <span style={{ color: "var(--text)" }}>{value || "—"}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════════════ */

/* ── Overview ── */
function Overview({ students, teachers, courses, notices, fees, exams, events }) {
  const totalCollected = fees.filter(f => f.status === "Paid").reduce((a, f) => a + Number(f.paid), 0)
  const upcomingExams = exams.filter(e => e.status === "Upcoming").length
  const upcomingEvents = events.filter(e => e.status === "Upcoming").length
  const stats = [
    { icon: "👥", val: students.length,  label: "Total Students",  change: `${students.filter(s => s.status === "active").length} active` },
    { icon: "📖", val: courses.length,   label: "Active Courses",  change: `${courses.reduce((a, c) => a + Number(c.enrolled), 0)} enrolled` },
    { icon: "🧑‍🏫", val: teachers.length, label: "Faculty Members", change: `${teachers.filter(t => t.status === "active").length} active` },
    { icon: "📢", val: notices.length,   label: "Notices",          change: `${notices.filter(n => n.pinned).length} pinned` },
  ]
  const avgAttendance = students.length ? Math.round(students.reduce((a, s) => a + (s.attendance || 0), 0) / students.length) : 0
  return (
    <>
      <div className="dashboard-greeting fade-up">
        <div className="greeting-sub">Admin Panel</div>
        <div className="greeting-name">Welcome back, <em style={{ color: "var(--gold)" }}>Administrator</em> 👋</div>
      </div>
      <div className="stat-cards" style={{ marginBottom: 40 }}>
        {stats.map((c, i) => (
          <div key={i} className={`card stat-card fade-up delay-${i + 1}`}>
            <div className="stat-card-icon">{c.icon}</div>
            <div className="stat-card-val">{c.val}</div>
            <div className="stat-card-label">{c.label}</div>
            <div className="stat-card-change">{c.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Stats Grid */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 16 }}>📊 Financial Overview</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {[
            { label: "Fee Collected",    val: "₹" + totalCollected.toLocaleString() },
            { label: "Pending Students", val: fees.filter(f => f.status === "Pending").length + " students" },
            { label: "Partial Payment",  val: fees.filter(f => f.status === "Partial").length + " students" },
            { label: "Collection Rate",  val: Math.round((fees.filter(f => f.status === "Paid").length / (fees.length || 1)) * 100) + "%" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--gold)", fontFamily: "'Playfair Display',serif" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance + Upcoming */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--cream)", marginBottom: 16 }}>📈 Attendance Overview</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gold)", marginBottom: 8 }}>{avgAttendance}%</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Average across all students</div>
          {[
            { label: "Above 90%", count: students.filter(s => s.attendance >= 90).length, color: "#4ade80" },
            { label: "75–89%",    count: students.filter(s => s.attendance >= 75 && s.attendance < 90).length, color: "var(--gold)" },
            { label: "Below 75%", count: students.filter(s => s.attendance < 75).length, color: "#f87171" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.count} students</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--cream)", marginBottom: 16 }}>📅 Upcoming Schedule</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Exams ({upcomingExams})</div>
            {exams.filter(e => e.status === "Upcoming").slice(0, 2).map(e => (
              <div key={e.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px", marginBottom: 6 }}>
                <div style={{ fontSize: 13, color: "var(--cream)", fontWeight: 600 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{e.date} · {e.course}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Events ({upcomingEvents})</div>
            {events.filter(e => e.status === "Upcoming").slice(0, 2).map(e => (
              <div key={e.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px", marginBottom: 6 }}>
                <div style={{ fontSize: 13, color: "var(--cream)", fontWeight: 600 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{e.date} · {e.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seat Occupancy */}
      <div className="card" style={{ padding: 28 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 20 }}>🏫 Course Seat Occupancy</div>
        {courses.map(c => {
          const pct = Math.round((Number(c.enrolled) / Number(c.seats)) * 100)
          return (
            <div key={c.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "var(--cream)", fontWeight: 500 }}>{c.name}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.enrolled}/{c.seats} seats · {pct}%</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 100, height: 6, overflow: "hidden" }}>
                <div style={{ width: pct + "%", height: "100%", background: pct > 85 ? "#f87171" : pct > 60 ? "var(--gold)" : "#4ade80", borderRadius: 100, transition: "width 0.8s ease" }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ── Students ── */
function Students({ data, setData }) {
  const empty = { name: "", email: "", phone: "", course: "JEE Foundation", status: "active", fee: "Pending", attendance: "0", grade: "B", dob: "", parentName: "", parentPhone: "", address: "", notes: "" }
  const [modal, setModal] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [search, setSearch] = useState("")
  const [filterCourse, setFilterCourse] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [form, setForm] = useState(empty)
  const courses = ["All", ...new Set(data.map(s => s.course))]
  let filtered = data
  if (search) filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
  if (filterCourse !== "All") filtered = filtered.filter(s => s.course === filterCourse)
  if (filterStatus !== "All") filtered = filtered.filter(s => s.status === filterStatus)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("students", u) }
    else { const u = data.map(s => s.id === modal.item.id ? { ...form, id: s.id } : s); setData(u); save("students", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this student?")) return; const u = data.filter(s => s.id !== id); setData(u); save("students", u) }
  const attColor = v => v >= 90 ? "#4ade80" : v >= 75 ? "var(--gold)" : "#f87171"
  return (
    <>
      <SectionHeader title="Students" subtitle={`${data.length} total · ${data.filter(s => s.status === "active").length} active`} onAdd={openAdd} addLabel="+ Add Student" />
      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Search by name, email or course…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "11px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none" }} />
        <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
          style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, outline: "none" }}>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, outline: "none" }}>
          {["All", "active", "pending", "inactive"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {/* Summary chips */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: `✅ Active: ${data.filter(s => s.status === "active").length}`, color: "#4ade80" },
          { label: `⏳ Pending: ${data.filter(s => s.status === "pending").length}`, color: "var(--gold)" },
          { label: `❌ Inactive: ${data.filter(s => s.status === "inactive").length}`, color: "#f87171" },
          { label: `⚠️ Low Attendance: ${data.filter(s => s.attendance < 75).length}`, color: "#f87171" },
        ].map((c, i) => (
          <span key={i} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 100, background: c.color + "18", color: c.color, border: "1px solid " + c.color + "44", fontWeight: 600 }}>{c.label}</span>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead><tr><th>Name</th><th>Course</th><th>Attendance</th><th>Grade</th><th>Status</th><th>Fee</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ color: "var(--cream)", fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.email}</div>
                </td>
                <td>{s.course}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ width: (s.attendance || 0) + "%", height: "100%", background: attColor(s.attendance || 0), borderRadius: 100 }} />
                    </div>
                    <span style={{ fontSize: 12, color: attColor(s.attendance || 0), fontWeight: 600 }}>{s.attendance || 0}%</span>
                  </div>
                </td>
                <td><span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>{s.grade || "—"}</span></td>
                <td><span className={`status-badge status-${s.status}`}>{s.status}</span></td>
                <td><span className={`status-badge ${s.fee === "Paid" ? "status-active" : s.fee === "Partial" ? "status-pending" : "status-done"}`}>{s.fee}</span></td>
                <td>
                  <ActionBtn label="View" color="#60a5fa" onClick={() => setViewModal(s)} />
                  <ActionBtn label="Edit" onClick={() => openEdit(s)} />
                  <ActionBtn label="Delete" color="#f87171" onClick={() => del(s.id)} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>No students found</td></tr>}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewModal && (
        <Modal title="Student Profile" onClose={() => setViewModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Personal Info</div>
              <InfoRow label="Full Name" value={viewModal.name} />
              <InfoRow label="Email" value={viewModal.email} />
              <InfoRow label="Phone" value={viewModal.phone} />
              <InfoRow label="Date of Birth" value={viewModal.dob} />
              <InfoRow label="Address" value={viewModal.address} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Academic Info</div>
              <InfoRow label="Course" value={viewModal.course} />
              <InfoRow label="Status" value={viewModal.status} />
              <InfoRow label="Fee Status" value={viewModal.fee} />
              <InfoRow label="Attendance" value={(viewModal.attendance || 0) + "%"} />
              <InfoRow label="Grade" value={viewModal.grade} />
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Parent / Guardian</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <InfoRow label="Parent Name" value={viewModal.parentName} />
              <InfoRow label="Parent Phone" value={viewModal.parentPhone} />
            </div>
          </div>
          {viewModal.notes && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(201,168,76,0.08)", borderRadius: 8, border: "1px solid rgba(201,168,76,0.2)" }}>
              <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Notes: </span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{viewModal.notes}</span>
            </div>
          )}
        </Modal>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Student" : "Edit Student"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Full Name"       name="name"        value={form.name}        onChange={handle} />
            <Field label="Email"           name="email"       value={form.email}       onChange={handle} type="email" />
            <Field label="Phone"           name="phone"       value={form.phone}       onChange={handle} />
            <Field label="Date of Birth"   name="dob"         value={form.dob}         onChange={handle} type="date" />
            <Field label="Course"          name="course"      value={form.course}      onChange={handle} options={["JEE Foundation", "NEET Prep", "Commerce Pro", "Computer Science", "Arts & Humanities"]} />
            <Field label="Status"          name="status"      value={form.status}      onChange={handle} options={["active", "pending", "inactive"]} />
            <Field label="Fee Status"      name="fee"         value={form.fee}         onChange={handle} options={["Paid", "Pending", "Partial"]} />
            <Field label="Attendance (%)"  name="attendance"  value={form.attendance}  onChange={handle} type="number" />
            <Field label="Grade"           name="grade"       value={form.grade}       onChange={handle} options={["A+", "A", "B+", "B", "C+", "C", "D", "F"]} />
            <Field label="Parent Name"     name="parentName"  value={form.parentName}  onChange={handle} />
            <Field label="Parent Phone"    name="parentPhone" value={form.parentPhone} onChange={handle} />
          </div>
          <Field label="Address" name="address" value={form.address} onChange={handle} />
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Notes / Remarks</label>
            <textarea name="notes" value={form.notes} onChange={handle} rows={2}
              style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Add Student" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}

/* ── Teachers ── */
function Teachers({ data, setData }) {
  const empty = { name: "", email: "", phone: "", subject: "Physics", qualification: "MSc", status: "active", salary: "", joinDate: "", classes: "", experience: "", address: "", schedule: "" }
  const [modal, setModal] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [form, setForm] = useState(empty)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("teachers", u) }
    else { const u = data.map(t => t.id === modal.item.id ? { ...form, id: t.id } : t); setData(u); save("teachers", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this teacher?")) return; const u = data.filter(t => t.id !== id); setData(u); save("teachers", u) }
  const totalSalary = data.reduce((a, t) => a + Number(t.salary || 0), 0)
  return (
    <>
      <SectionHeader title="Teachers / Faculty" subtitle={`${data.length} members · Monthly payroll ₹${totalSalary.toLocaleString()}`} onAdd={openAdd} addLabel="+ Add Teacher" />
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead><tr><th>Name</th><th>Subject</th><th>Qualification</th><th>Experience</th><th>Salary (₹)</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id}>
                <td>
                  <div style={{ color: "var(--cream)", fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.email}</div>
                </td>
                <td>{t.subject}</td>
                <td>{t.qualification}</td>
                <td>{t.experience || "—"}</td>
                <td style={{ color: "var(--gold)", fontWeight: 600 }}>₹{Number(t.salary || 0).toLocaleString()}</td>
                <td><span className={`status-badge status-${t.status}`}>{t.status}</span></td>
                <td>
                  <ActionBtn label="View" color="#60a5fa" onClick={() => setViewModal(t)} />
                  <ActionBtn label="Edit" onClick={() => openEdit(t)} />
                  <ActionBtn label="Delete" color="#f87171" onClick={() => del(t.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewModal && (
        <Modal title="Teacher Profile" onClose={() => setViewModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Personal Info</div>
              <InfoRow label="Full Name" value={viewModal.name} />
              <InfoRow label="Email" value={viewModal.email} />
              <InfoRow label="Phone" value={viewModal.phone} />
              <InfoRow label="Address" value={viewModal.address} />
              <InfoRow label="Join Date" value={viewModal.joinDate} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Professional Info</div>
              <InfoRow label="Subject" value={viewModal.subject} />
              <InfoRow label="Qualification" value={viewModal.qualification} />
              <InfoRow label="Experience" value={viewModal.experience} />
              <InfoRow label="Monthly Salary" value={"₹" + Number(viewModal.salary || 0).toLocaleString()} />
              <InfoRow label="Status" value={viewModal.status} />
            </div>
          </div>
          {viewModal.classes && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <InfoRow label="Assigned Classes" value={viewModal.classes} />
              <InfoRow label="Schedule" value={viewModal.schedule} />
            </div>
          )}
        </Modal>
      )}

      {modal && (
        <Modal title={modal.mode === "add" ? "Add Teacher" : "Edit Teacher"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Full Name"       name="name"          value={form.name}          onChange={handle} />
            <Field label="Email"           name="email"         value={form.email}         onChange={handle} type="email" />
            <Field label="Phone"           name="phone"         value={form.phone}         onChange={handle} />
            <Field label="Subject"         name="subject"       value={form.subject}       onChange={handle} options={["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Commerce", "History", "Geography"]} />
            <Field label="Qualification"   name="qualification" value={form.qualification} onChange={handle} options={["PhD", "MSc", "MA", "MCom", "BTech", "BSc", "BA"]} />
            <Field label="Experience"      name="experience"    value={form.experience}    onChange={handle} placeholder="e.g. 5 years" />
            <Field label="Monthly Salary (₹)" name="salary"    value={form.salary}        onChange={handle} type="number" />
            <Field label="Join Date"       name="joinDate"      value={form.joinDate}      onChange={handle} type="date" />
            <Field label="Status"          name="status"        value={form.status}        onChange={handle} options={["active", "inactive"]} />
          </div>
          <Field label="Address"           name="address"       value={form.address}       onChange={handle} />
          <Field label="Assigned Classes"  name="classes"       value={form.classes}       onChange={handle} placeholder="e.g. JEE Foundation, NEET Prep" />
          <Field label="Teaching Schedule" name="schedule"      value={form.schedule}      onChange={handle} placeholder="e.g. Mon,Wed,Fri - 9AM to 1PM" />
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Add Teacher" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}

/* ── Courses ── */
// function Courses({ data, setData, teachers }) {
//   const empty = { name: "", duration: "12 months", fee: "", seats: "40", enrolled: "0", status: "active", teacher: "", batchTime: "", syllabus: "", startDate: "", description: "" }
//   const [modal, setModal] = useState(null)
//   const [viewModal, setViewModal] = useState(null)
//   const [form, setForm] = useState(empty)
//   const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
//   const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
//   const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
//   const submit = () => {
//     if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("courses", u) }
//     else { const u = data.map(c => c.id === modal.item.id ? { ...form, id: c.id } : c); setData(u); save("courses", u) }
//     setModal(null)
//   }
//   const del = id => { if (!confirm("Delete this course?")) return; const u = data.filter(c => c.id !== id); setData(u); save("courses", u) }
//   const teacherOptions = ["—", ...teachers.map(t => t.name)]
//   return (
//     <>
//       <SectionHeader title="Courses" subtitle={`${data.length} courses · ${data.reduce((a, c) => a + Number(c.enrolled), 0)} total enrolled`} onAdd={openAdd} addLabel="+ Add Course" />
//       <div className="card" style={{ overflowX: "auto" }}>
//         <table className="activity-table">
//           <thead><tr><th>Course Name</th><th>Teacher</th><th>Duration</th><th>Fee (₹)</th><th>Batch Time</th><th>Seats</th><th>Status</th><th>Actions</th></tr></thead>
//           <tbody>
//             {data.map(c => {
//               const pct = Math.round((Number(c.enrolled) / Number(c.seats)) * 100)
//               return (
//                 <tr key={c.id}>
//                   <td>
//                     <div style={{ color: "var(--cream)", fontWeight: 500 }}>{c.name}</div>
//                     <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.syllabus}</div>
//                   </td>
//                   <td style={{ fontSize: 13 }}>{c.teacher || "—"}</td>
//                   <td>{c.duration}</td>
//                   <td>₹{Number(c.fee).toLocaleString()}</td>
//                   <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.batchTime || "—"}</td>
//                   <td>
//                     <div style={{ fontSize: 12 }}>{c.enrolled}/{c.seats}</div>
//                     <div style={{ width: 50, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 100, marginTop: 4 }}>
//                       <div style={{ width: pct + "%", height: "100%", background: pct > 85 ? "#f87171" : "var(--gold)", borderRadius: 100 }} />
//                     </div>
//                   </td>
//                   <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
//                   <td>
//                     <ActionBtn label="View" color="#60a5fa" onClick={() => setViewModal(c)} />
//                     <ActionBtn label="Edit" onClick={() => openEdit(c)} />
//                     <ActionBtn label="Delete" color="#f87171" onClick={() => del(c.id)} />
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>

//       {viewModal && (
//         <Modal title="Course Details" onClose={() => setViewModal(null)} wide>
//           <InfoRow label="Course Name" value={viewModal.name} />
//           <InfoRow label="Duration" value={viewModal.duration} />
//           <InfoRow label="Fee" value={"₹" + Number(viewModal.fee).toLocaleString()} />
//           <InfoRow label="Batch Time" value={viewModal.batchTime} />
//           <InfoRow label="Start Date" value={viewModal.startDate} />
//           <InfoRow label="Teacher" value={viewModal.teacher} />
//           <InfoRow label="Total Seats" value={viewModal.seats} />
//           <InfoRow label="Enrolled" value={viewModal.enrolled} />
//           <InfoRow label="Syllabus" value={viewModal.syllabus} />
//           <InfoRow label="Status" value={viewModal.status} />
//           {viewModal.description && (
//             <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
//               <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Description</div>
//               <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{viewModal.description}</div>
//             </div>
//           )}
//         </Modal>
//       )}

//       {modal && (
//         <Modal title={modal.mode === "add" ? "Add Course" : "Edit Course"} onClose={() => setModal(null)} wide>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
//             <Field label="Course Name"   name="name"      value={form.name}      onChange={handle} />
//             <Field label="Duration"      name="duration"  value={form.duration}  onChange={handle} options={["3 months", "6 months", "10 months", "12 months", "18 months", "24 months"]} />
//             <Field label="Fee (₹)"       name="fee"       value={form.fee}       onChange={handle} type="number" />
//             <Field label="Total Seats"   name="seats"     value={form.seats}     onChange={handle} type="number" />
//             <Field label="Enrolled"      name="enrolled"  value={form.enrolled}  onChange={handle} type="number" />
//             <Field label="Start Date"    name="startDate" value={form.startDate} onChange={handle} type="date" />
//             <Field label="Batch Time"    name="batchTime" value={form.batchTime} onChange={handle} placeholder="e.g. 7:00 AM – 9:00 AM" />
//             <Field label="Assigned Teacher" name="teacher" value={form.teacher}  onChange={handle} options={teacherOptions} />
//             <Field label="Status"        name="status"    value={form.status}    onChange={handle} options={["active", "inactive"]} />
//           </div>
//           <Field label="Syllabus Topics" name="syllabus" value={form.syllabus} onChange={handle} placeholder="e.g. Physics, Chemistry, Mathematics" />
//           <div style={{ marginBottom: 16 }}>
//             <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Course Description</label>
//             <textarea name="description" value={form.description} onChange={handle} rows={3}
//               style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
//           </div>
//           <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
//             {modal.mode === "add" ? "Add Course" : "Save Changes"}
//           </button>
//         </Modal>
//       )}
//     </>
//   )
// }


function Courses({ data, setData, teachers }) {
  const empty = {
    name: "", duration: "12 months", fee: "", seats: "40", enrolled: "0",
    status: "active", teacher: "", batchTime: "", syllabus: "", startDate: "",
    description: "",
    // Public page ke liye extra fields
    thumb: "", badge: "Science", level: "Beginner", mode: "Offline", rating: "4.8"
  }

  const [modal, setModal] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [form, setForm] = useState(empty)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }

  const submit = () => {
    if (modal.mode === "add") {
      const u = [...data, { ...form, id: Date.now() }]
      setData(u); save("courses", u)
    } else {
      const u = data.map(c => c.id === modal.item.id ? { ...form, id: c.id } : c)
      setData(u); save("courses", u)
    }
    setModal(null)
  }

  const del = id => {
    if (!confirm("Delete this course?")) return
    const u = data.filter(c => c.id !== id)
    setData(u); save("courses", u)
  }

  const teacherOptions = ["—", ...teachers.map(t => t.name)]

  return (
    <>
      <SectionHeader
        title="Courses"
        subtitle={`${data.length} courses · ${data.reduce((a, c) => a + Number(c.enrolled), 0)} total enrolled`}
        onAdd={openAdd}
        addLabel="+ Add Course"
      />

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Teacher</th>
              <th>Duration</th>
              <th>Fee (₹)</th>
              <th>Batch Time</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(c => {
              const pct = Math.round((Number(c.enrolled) / Number(c.seats)) * 100)
              return (
                <tr key={c.id}>
                  <td>
                    <div style={{ color: "var(--cream)", fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.syllabus}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{c.teacher || "—"}</td>
                  <td>{c.duration}</td>
                  <td>₹{Number(c.fee).toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.batchTime || "—"}</td>
                  <td>
                    <div style={{ fontSize: 12 }}>{c.enrolled}/{c.seats}</div>
                    <div style={{ width: 50, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 100, marginTop: 4 }}>
                      <div style={{ width: pct + "%", height: "100%", background: pct > 85 ? "#f87171" : "var(--gold)", borderRadius: 100 }} />
                    </div>
                  </td>
                  <td><span className={`status-badge status-${c.status}`}>{c.status}</span></td>
                  <td>
                    <ActionBtn label="View" color="#60a5fa" onClick={() => setViewModal(c)} />
                    <ActionBtn label="Edit" onClick={() => openEdit(c)} />
                    <ActionBtn label="Delete" color="#f87171" onClick={() => del(c.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── View Modal ── */}
      {viewModal && (
        <Modal title="Course Details" onClose={() => setViewModal(null)} wide>
          <InfoRow label="Course Name"  value={viewModal.name} />
          <InfoRow label="Duration"     value={viewModal.duration} />
          <InfoRow label="Fee"          value={"₹" + Number(viewModal.fee).toLocaleString()} />
          <InfoRow label="Batch Time"   value={viewModal.batchTime} />
          <InfoRow label="Start Date"   value={viewModal.startDate} />
          <InfoRow label="Teacher"      value={viewModal.teacher} />
          <InfoRow label="Total Seats"  value={viewModal.seats} />
          <InfoRow label="Enrolled"     value={viewModal.enrolled} />
          <InfoRow label="Syllabus"     value={viewModal.syllabus} />
          <InfoRow label="Status"       value={viewModal.status} />
          <InfoRow label="Category"     value={viewModal.badge} />
          <InfoRow label="Level"        value={viewModal.level} />
          <InfoRow label="Mode"         value={viewModal.mode} />
          <InfoRow label="Rating"       value={viewModal.rating} />
          {viewModal.thumb && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Thumbnail Preview</div>
              <img src={viewModal.thumb} alt="thumb" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8, opacity: 0.85 }} />
            </div>
          )}
          {viewModal.description && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Description</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{viewModal.description}</div>
            </div>
          )}
        </Modal>
      )}

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Course" : "Edit Course"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Course Name"      name="name"      value={form.name}      onChange={handle} />
            <Field label="Duration"         name="duration"  value={form.duration}  onChange={handle} options={["3 months","6 months","10 months","12 months","18 months","24 months"]} />
            <Field label="Fee (₹)"          name="fee"       value={form.fee}       onChange={handle} type="number" />
            <Field label="Total Seats"      name="seats"     value={form.seats}     onChange={handle} type="number" />
            <Field label="Enrolled"         name="enrolled"  value={form.enrolled}  onChange={handle} type="number" />
            <Field label="Start Date"       name="startDate" value={form.startDate} onChange={handle} type="date" />
            <Field label="Batch Time"       name="batchTime" value={form.batchTime} onChange={handle} placeholder="e.g. 7:00 AM – 9:00 AM" />
            <Field label="Assigned Teacher" name="teacher"   value={form.teacher}   onChange={handle} options={teacherOptions} />
            <Field label="Status"           name="status"    value={form.status}    onChange={handle} options={["active","inactive"]} />
            <Field label="Rating"           name="rating"    value={form.rating}    onChange={handle} placeholder="e.g. 4.9" />
            <Field label="Category / Badge" name="badge"     value={form.badge}     onChange={handle} options={["Science","Commerce","Technology","Arts","Language","Entrance"]} />
            <Field label="Level"            name="level"     value={form.level}     onChange={handle} options={["Beginner","Intermediate","Advanced"]} />
            <Field label="Mode"             name="mode"      value={form.mode}      onChange={handle} options={["Offline","Online","Hybrid"]} />
          </div>

          <Field label="Syllabus Topics" name="syllabus" value={form.syllabus} onChange={handle} placeholder="e.g. Physics, Chemistry, Mathematics" />

          <Field label="Thumbnail URL" name="thumb" value={form.thumb} onChange={handle} placeholder="https://images.unsplash.com/..." />
          {form.thumb && (
            <div style={{ marginBottom: 16 }}>
              <img src={form.thumb} alt="preview" style={{ width: "100%", maxHeight: 140, objectFit: "cover", borderRadius: 8, opacity: 0.8 }} />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
              Course Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle}
              rows={3}
              style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
            onClick={submit}
          >
            {modal.mode === "add" ? "Add Course" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}































/* ── Timetable ── */
function Timetable({ data, setData }) {
  const empty = { day: "Monday", subject: "", teacher: "", time: "", room: "", course: "" }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const [filterDay, setFilterDay] = useState("All")
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("timetable", u) }
    else { const u = data.map(t => t.id === modal.item.id ? { ...form, id: t.id } : t); setData(u); save("timetable", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this entry?")) return; const u = data.filter(t => t.id !== id); setData(u); save("timetable", u) }
  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayColor = { Monday: "#60a5fa", Tuesday: "#a78bfa", Wednesday: "#4ade80", Thursday: "var(--gold)", Friday: "#fb923c", Saturday: "#f472b6" }
  const filtered = filterDay === "All" ? data : data.filter(t => t.day === filterDay)
  return (
    <>
      <SectionHeader title="Timetable / Schedule" subtitle={`${data.length} class entries`} onAdd={openAdd} addLabel="+ Add Class" />
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {days.map(d => (
          <button key={d} onClick={() => setFilterDay(d)} style={{
            padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: filterDay === d ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filterDay === d ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filterDay === d ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{d}</button>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead><tr><th>Day</th><th>Subject</th><th>Teacher</th><th>Time</th><th>Course</th><th>Room</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td><span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: (dayColor[t.day] || "var(--gold)") + "20", color: dayColor[t.day] || "var(--gold)", fontWeight: 700 }}>{t.day}</span></td>
                <td style={{ color: "var(--cream)", fontWeight: 500 }}>{t.subject}</td>
                <td>{t.teacher}</td>
                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.time}</td>
                <td>{t.course}</td>
                <td style={{ fontSize: 12 }}>{t.room}</td>
                <td>
                  <ActionBtn label="Edit" onClick={() => openEdit(t)} />
                  <ActionBtn label="Delete" color="#f87171" onClick={() => del(t.id)} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>No entries for this day</td></tr>}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Class Entry" : "Edit Class Entry"} onClose={() => setModal(null)}>
          <Field label="Day"     name="day"     value={form.day}     onChange={handle} options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]} />
          <Field label="Subject" name="subject" value={form.subject} onChange={handle} />
          <Field label="Teacher" name="teacher" value={form.teacher} onChange={handle} />
          <Field label="Time"    name="time"    value={form.time}    onChange={handle} placeholder="e.g. 9:00 AM – 11:00 AM" />
          <Field label="Course"  name="course"  value={form.course}  onChange={handle} />
          <Field label="Room"    name="room"    value={form.room}    onChange={handle} placeholder="e.g. Room 101, Lab 2" />
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Add Entry" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}

/* ── Exams ── */
function Exams({ data, setData }) {
  const empty = { title: "", date: new Date().toISOString().split("T")[0], course: "", subject: "", duration: "3 hours", maxMarks: "100", status: "Upcoming", room: "" }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("exams", u) }
    else { const u = data.map(e => e.id === modal.item.id ? { ...form, id: e.id } : e); setData(u); save("exams", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this exam?")) return; const u = data.filter(e => e.id !== id); setData(u); save("exams", u) }
  const statusColor = { Upcoming: "#60a5fa", Completed: "#4ade80", Cancelled: "#f87171" }
  return (
    <>
      <SectionHeader title="Exams & Tests" subtitle={`${data.filter(e => e.status === "Upcoming").length} upcoming · ${data.filter(e => e.status === "Completed").length} completed`} onAdd={openAdd} addLabel="+ Schedule Exam" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Exams",    val: data.length,                                   color: "var(--gold)" },
          { label: "Upcoming",       val: data.filter(e => e.status === "Upcoming").length,   color: "#60a5fa" },
          { label: "Completed",      val: data.filter(e => e.status === "Completed").length,  color: "#4ade80" },
          { label: "Cancelled",      val: data.filter(e => e.status === "Cancelled").length,  color: "#f87171" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color, fontFamily: "'Playfair Display',serif" }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead><tr><th>Exam Title</th><th>Course</th><th>Subject</th><th>Date</th><th>Duration</th><th>Max Marks</th><th>Room</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {data.map(e => (
              <tr key={e.id}>
                <td style={{ color: "var(--cream)", fontWeight: 500 }}>{e.title}</td>
                <td>{e.course}</td>
                <td style={{ fontSize: 12 }}>{e.subject}</td>
                <td>{e.date}</td>
                <td style={{ fontSize: 12 }}>{e.duration}</td>
                <td style={{ color: "var(--gold)", fontWeight: 600 }}>{e.maxMarks}</td>
                <td style={{ fontSize: 12 }}>{e.room}</td>
                <td><span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: (statusColor[e.status] || "var(--gold)") + "20", color: statusColor[e.status] || "var(--gold)", fontWeight: 700 }}>{e.status}</span></td>
                <td>
                  <ActionBtn label="Edit" onClick={() => openEdit(e)} />
                  <ActionBtn label="Delete" color="#f87171" onClick={() => del(e.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === "add" ? "Schedule Exam" : "Edit Exam"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Exam Title"   name="title"    value={form.title}    onChange={handle} />
            <Field label="Date"         name="date"     value={form.date}     onChange={handle} type="date" />
            <Field label="Course"       name="course"   value={form.course}   onChange={handle} />
            <Field label="Subject"      name="subject"  value={form.subject}  onChange={handle} />
            <Field label="Duration"     name="duration" value={form.duration} onChange={handle} options={["1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours"]} />
            <Field label="Max Marks"    name="maxMarks" value={form.maxMarks} onChange={handle} type="number" />
            <Field label="Exam Room"    name="room"     value={form.room}     onChange={handle} placeholder="e.g. Hall A, Room 101" />
            <Field label="Status"       name="status"   value={form.status}   onChange={handle} options={["Upcoming", "Completed", "Cancelled"]} />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Schedule Exam" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}

/* ── Events ── */
function Events({ data, setData }) {
  const empty = { title: "", date: new Date().toISOString().split("T")[0], time: "", venue: "", type: "Academic", organizer: "", status: "Upcoming", description: "", registrations: "0" }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("events", u) }
    else { const u = data.map(e => e.id === modal.item.id ? { ...form, id: e.id } : e); setData(u); save("events", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this event?")) return; const u = data.filter(e => e.id !== id); setData(u); save("events", u) }
  const typeColor = { Sports: "#4ade80", Academic: "#60a5fa", Cultural: "#f472b6", Meeting: "var(--gold)", Holiday: "#fb923c" }
  return (
    <>
      <SectionHeader title="Events & Activities" subtitle={`${data.filter(e => e.status === "Upcoming").length} upcoming events`} onAdd={openAdd} addLabel="+ Add Event" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => (
          <div key={e.id} className="card" style={{ padding: 24, borderLeft: `3px solid ${typeColor[e.type] || "var(--gold)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: typeColor[e.type] || "var(--gold)" }}>{e.type}</span>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: e.status === "Upcoming" ? "rgba(96,165,250,0.15)" : "rgba(74,222,128,0.15)", color: e.status === "Upcoming" ? "#60a5fa" : "#4ade80", fontWeight: 700 }}>{e.status}</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--cream)", fontSize: 16, marginBottom: 4 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                  📅 {e.date} · ⏰ {e.time} · 📍 {e.venue} · 👤 {e.organizer}
                </div>
                {e.description && <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{e.description}</div>}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--gold)", textAlign: "center", marginBottom: 4 }}>{e.registrations}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginBottom: 10 }}>Registrations</div>
                <ActionBtn label="Edit" onClick={() => openEdit(e)} />
                <ActionBtn label="Delete" color="#f87171" onClick={() => del(e.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Event" : "Edit Event"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Event Title"   name="title"         value={form.title}         onChange={handle} />
            <Field label="Date"          name="date"          value={form.date}          onChange={handle} type="date" />
            <Field label="Time"          name="time"          value={form.time}          onChange={handle} placeholder="e.g. 9:00 AM" />
            <Field label="Venue"         name="venue"         value={form.venue}         onChange={handle} />
            <Field label="Event Type"    name="type"          value={form.type}          onChange={handle} options={["Academic", "Sports", "Cultural", "Meeting", "Holiday", "Other"]} />
            <Field label="Organizer"     name="organizer"     value={form.organizer}     onChange={handle} />
            <Field label="Status"        name="status"        value={form.status}        onChange={handle} options={["Upcoming", "Completed", "Cancelled"]} />
            <Field label="Registrations" name="registrations" value={form.registrations} onChange={handle} type="number" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows={3}
              style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Add Event" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}

/* ── Notices ── */
function Notices({ data, setData }) {
  const empty = { title: "", date: new Date().toISOString().split("T")[0], expiryDate: "", category: "General", content: "", pinned: false, views: 0, tags: "" }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const [filterCat, setFilterCat] = useState("All")
  const handle = e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now(), views: 0 }]; setData(u); save("notices", u) }
    else { const u = data.map(n => n.id === modal.item.id ? { ...form, id: n.id } : n); setData(u); save("notices", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this notice?")) return; const u = data.filter(n => n.id !== id); setData(u); save("notices", u) }
  const togglePin = id => { const u = data.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n); setData(u); save("notices", u) }
  const catColor = { Event: "#60a5fa", Finance: "var(--gold)", General: "#a78bfa", Exam: "#4ade80", Holiday: "#f87171" }
  const categories = ["All", "General", "Event", "Finance", "Exam", "Holiday"]
  const filtered = filterCat === "All" ? data : data.filter(n => n.category === filterCat)
  return (
    <>
      <SectionHeader title="Notices & Announcements" subtitle={`${data.length} notices · ${data.filter(n => n.pinned).length} pinned`} onAdd={openAdd} addLabel="+ New Notice" />
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{
            padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filterCat === c ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.sort((a, b) => b.pinned - a.pinned).map(n => (
          <div key={n.id} className="card" style={{ padding: 24, borderLeft: n.pinned ? "3px solid var(--gold)" : "3px solid transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: catColor[n.category] || "var(--gold)" }}>{n.category}</span>
                  {n.pinned && <span style={{ fontSize: 11, background: "rgba(201,168,76,0.15)", color: "var(--gold)", padding: "2px 8px", borderRadius: 100 }}>📌 Pinned</span>}
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>👁 {n.views || 0} views</span>
                  {n.expiryDate && <span style={{ fontSize: 11, color: "#f87171" }}>⏳ Expires: {n.expiryDate}</span>}
                </div>
                <div style={{ fontWeight: 600, color: "var(--cream)", fontSize: 16, marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{n.date}</div>
              </div>
              <div>
                <ActionBtn label={n.pinned ? "Unpin" : "Pin"} onClick={() => togglePin(n.id)} />
                <ActionBtn label="Edit" onClick={() => openEdit(n)} />
                <ActionBtn label="Delete" color="#f87171" onClick={() => del(n.id)} />
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: n.tags ? 10 : 0 }}>{n.content}</div>
            {n.tags && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {n.tags.split(",").map(tag => tag.trim()).filter(Boolean).map((tag, i) => (
                  <span key={i} style={{ fontSize: 11, padding: "2px 10px", borderRadius: 100, background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)" }}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal.mode === "add" ? "New Notice" : "Edit Notice"} onClose={() => setModal(null)}>
          <Field label="Title"       name="title"      value={form.title}      onChange={handle} />
          <Field label="Date"        name="date"       value={form.date}       onChange={handle} type="date" />
          <Field label="Expiry Date" name="expiryDate" value={form.expiryDate} onChange={handle} type="date" />
          <Field label="Category"    name="category"   value={form.category}   onChange={handle} options={["General", "Event", "Finance", "Exam", "Holiday"]} />
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Content</label>
            <textarea name="content" value={form.content} onChange={handle} rows={4}
              style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <Field label="Tags (comma-separated)" name="tags" value={form.tags} onChange={handle} placeholder="e.g. urgent, exam, fee" />
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-muted)", marginBottom: 20, cursor: "pointer" }}>
            <input type="checkbox" name="pinned" checked={form.pinned} onChange={handle} style={{ accentColor: "var(--gold)", width: 16, height: 16 }} />
            Pin this notice
          </label>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
            {modal.mode === "add" ? "Post Notice" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}













/* ── Gallery ── */
// function Gallery({ data, setData }) {
//   const empty = { caption: "", url: "", category: "Event", album: "" }
//   const [modal, setModal] = useState(null)
//   const [form, setForm] = useState(empty)
//   const [filterCat, setFilterCat] = useState("All")
//   const [lightbox, setLightbox] = useState(null)
//   const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
//   const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
//   const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
//   const submit = () => {
//     if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("gallery", u) }
//     else { const u = data.map(g => g.id === modal.item.id ? { ...form, id: g.id } : g); setData(u); save("gallery", u) }
//     setModal(null)
//   }
//   const del = id => { if (!confirm("Delete this image?")) return; const u = data.filter(g => g.id !== id); setData(u); save("gallery", u) }
//   const categories = ["All", ...new Set(data.map(g => g.category))]
//   const filtered = filterCat === "All" ? data : data.filter(g => g.category === filterCat)
//   const albums = [...new Set(data.map(g => g.album).filter(Boolean))]
//   return (
//     <>
//       <SectionHeader title="Gallery" subtitle={`${data.length} images · ${albums.length} albums`} onAdd={openAdd} addLabel="+ Add Image" />
//       <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
//         {categories.map(c => (
//           <button key={c} onClick={() => setFilterCat(c)} style={{
//             padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer",
//             background: filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.05)",
//             color: filterCat === c ? "var(--dark)" : "var(--text-muted)",
//             border: "1px solid " + (filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.1)"),
//             fontFamily: "'DM Sans',sans-serif",
//           }}>{c}</button>
//         ))}
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
//         {filtered.map(g => (
//           <div key={g.id} className="card" style={{ overflow: "hidden" }}>
//             <div onClick={() => setLightbox(g)} style={{ height: 150, backgroundImage: `url('${g.url}')`, backgroundSize: "cover", backgroundPosition: "center", cursor: "zoom-in", position: "relative" }}>
//               <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s" }} className="gallery-hover" />
//             </div>
//             <div style={{ padding: "14px 16px" }}>
//               <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)", marginBottom: 2 }}>{g.caption}</div>
//               <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 1, textTransform: "uppercase", marginBottom: g.album ? 2 : 10 }}>{g.category}</div>
//               {g.album && <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>📁 {g.album}</div>}
//               <div>
//                 <ActionBtn label="Edit" onClick={() => openEdit(g)} />
//                 <ActionBtn label="Delete" color="#f87171" onClick={() => del(g.id)} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Lightbox */}
//       {lightbox && (
//         <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setLightbox(null)}>
//           <div style={{ textAlign: "center" }} onClick={e => e.stopPropagation()}>
//             <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth: "80vw", maxHeight: "70vh", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }} />
//             <div style={{ fontSize: 15, color: "var(--cream)", marginTop: 16 }}>{lightbox.caption}</div>
//             <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{lightbox.album} · {lightbox.category}</div>
//             <button onClick={() => setLightbox(null)} style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "var(--text-muted)", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Close</button>
//           </div>
//         </div>
//       )}

//       {modal && (
//         <Modal title={modal.mode === "add" ? "Add Image" : "Edit Image"} onClose={() => setModal(null)}>
//           <Field label="Caption"     name="caption"  value={form.caption}  onChange={handle} />
//           <Field label="Image URL"   name="url"      value={form.url}      onChange={handle} />
//           <Field label="Category"    name="category" value={form.category} onChange={handle} options={["Event", "Academic", "Sports", "Campus", "Cultural", "Other"]} />
//           <Field label="Album Name"  name="album"    value={form.album}    onChange={handle} placeholder="e.g. Convocation 2024" />
//           {form.url && (
//             <div style={{ marginBottom: 16, borderRadius: 8, overflow: "hidden", height: 140, backgroundImage: `url('${form.url}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(201,168,76,0.2)" }} />
//           )}
//           <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
//             {modal.mode === "add" ? "Add Image" : "Save Changes"}
//           </button>
//         </Modal>
//       )}
//     </>
//   )
// }


function Gallery({ data, setData }) {
  const empty = { caption: "", url: "", category: "Events", album: "", year: new Date().getFullYear().toString() }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const [filterCat, setFilterCat] = useState("All")
  const [lightbox, setLightbox] = useState(null)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }

  const submit = () => {
    let u
    if (modal.mode === "add") {
      u = [...data, { ...form, id: Date.now() }]
    } else {
      u = data.map(g => g.id === modal.item.id ? { ...form, id: g.id } : g)
    }
    setData(u)
    // Direct localStorage save — key "gallery" pe
    localStorage.setItem("gallery", JSON.stringify(u))
    setModal(null)
  }

  const del = id => {
    if (!confirm("Delete this image?")) return
    const u = data.filter(g => g.id !== id)
    setData(u)
    localStorage.setItem("gallery", JSON.stringify(u))
  }

  const categories = ["All", ...new Set(data.map(g => g.category))]
  const filtered = filterCat === "All" ? data : data.filter(g => g.category === filterCat)
  const albums = [...new Set(data.map(g => g.album).filter(Boolean))]

  return (
    <>
      <SectionHeader
        title="Gallery"
        subtitle={`${data.length} images · ${albums.length} albums`}
        onAdd={openAdd}
        addLabel="+ Add Image"
      />

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{
            padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filterCat === c ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filterCat === c ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {filtered.map(g => (
          <div key={g.id} className="card" style={{ overflow: "hidden" }}>
            <div
              onClick={() => setLightbox(g)}
              style={{ height: 150, backgroundImage: `url('${g.url}')`, backgroundSize: "cover", backgroundPosition: "center", cursor: "zoom-in", position: "relative" }}
            >
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s" }} />
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)", marginBottom: 2 }}>{g.caption}</div>
              <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{g.category}</div>
              {g.year  && <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>📅 {g.year}</div>}
              {g.album && <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>📁 {g.album}</div>}
              <div style={{ marginTop: 8 }}>
                <ActionBtn label="Edit" onClick={() => openEdit(g)} />
                <ActionBtn label="Delete" color="#f87171" onClick={() => del(g.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setLightbox(null)}
        >
          <div style={{ textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth: "80vw", maxHeight: "70vh", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }} />
            <div style={{ fontSize: 15, color: "var(--cream)", marginTop: 16 }}>{lightbox.caption}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{lightbox.category} · {lightbox.year} {lightbox.album ? `· 📁 ${lightbox.album}` : ""}</div>
            <button
              onClick={() => setLightbox(null)}
              style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "var(--text-muted)", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
            >Close</button>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Image" : "Edit Image"} onClose={() => setModal(null)}>
          <Field label="Caption"    name="caption"  value={form.caption}  onChange={handle} />
          <Field label="Image URL"  name="url"      value={form.url}      onChange={handle} />
          <Field label="Category"   name="category" value={form.category} onChange={handle} options={["Events","Academic","Sports","Campus","Cultural","Other"]} />
          <Field label="Year"       name="year"     value={form.year}     onChange={handle} options={["2025","2024","2023","2022","2021","2020"]} />
          <Field label="Album Name" name="album"    value={form.album}    onChange={handle} placeholder="e.g. Convocation 2024" />
          {form.url && (
            <div style={{ marginBottom: 16, borderRadius: 8, overflow: "hidden", height: 140, backgroundImage: `url('${form.url}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(201,168,76,0.2)" }} />
          )}
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
            {modal.mode === "add" ? "Add Image" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}















 
/* ── Fees ── */
function Fees({ data, setData, students, courses }) {
  const empty = { student: "", course: "", amount: "", paid: "0", date: new Date().toISOString().split("T")[0], status: "Pending", method: "Cash", txnId: "", remarks: "" }
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)
  const [filter, setFilter] = useState("All")
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const openAdd = () => { setForm(empty); setModal({ mode: "add" }) }
  const openEdit = item => { setForm({ ...item }); setModal({ mode: "edit", item }) }
  const submit = () => {
    if (modal.mode === "add") { const u = [...data, { ...form, id: Date.now() }]; setData(u); save("fees", u) }
    else { const u = data.map(f => f.id === modal.item.id ? { ...form, id: f.id } : f); setData(u); save("fees", u) }
    setModal(null)
  }
  const del = id => { if (!confirm("Delete this fee record?")) return; const u = data.filter(f => f.id !== id); setData(u); save("fees", u) }
  const filtered = filter === "All" ? data : data.filter(f => f.status === filter)
  const totalCollected = data.filter(f => f.status === "Paid").reduce((a, f) => a + Number(f.paid), 0)
  const totalPending = data.filter(f => f.status !== "Paid").reduce((a, f) => a + (Number(f.amount) - Number(f.paid)), 0)
  const printReceipt = (f) => {
    const w = window.open("", "_blank")
    w.document.write(`<html><head><title>Fee Receipt</title><style>body{font-family:Arial;padding:40px;max-width:500px;margin:auto}h2{color:#c9a84c}table{width:100%;border-collapse:collapse}td{padding:10px;border:1px solid #ddd}tr:first-child td{background:#f5f5f5;font-weight:bold}.footer{margin-top:40px;border-top:1px solid #ddd;padding-top:20px;font-size:12px;color:#888}</style></head><body>
      <h2>Fee Receipt</h2><p>Receipt Date: ${new Date().toLocaleDateString()}</p>
      <table><tr><td>Student</td><td>${f.student}</td></tr><tr><td>Course</td><td>${f.course}</td></tr><tr><td>Total Fee</td><td>₹${Number(f.amount).toLocaleString()}</td></tr><tr><td>Amount Paid</td><td>₹${Number(f.paid).toLocaleString()}</td></tr><tr><td>Payment Method</td><td>${f.method || "—"}</td></tr><tr><td>Transaction ID</td><td>${f.txnId || "—"}</td></tr><tr><td>Payment Date</td><td>${f.date}</td></tr><tr><td>Status</td><td>${f.status}</td></tr></table>
      <div class="footer"><p>This is a computer-generated receipt. No signature required.</p><p>EduSphere – Excellence in Education</p></div>
      </body></html>`)
    w.document.close(); w.print()
  }
  return (
    <>
      <SectionHeader title="Fee Management" subtitle={`₹${totalCollected.toLocaleString()} collected · ₹${totalPending.toLocaleString()} pending`} onAdd={openAdd} addLabel="+ Add Record" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Collected", val: "₹" + totalCollected.toLocaleString(),                               color: "#4ade80" },
          { label: "Pending Amount",  val: "₹" + totalPending.toLocaleString(),                                 color: "#f87171" },
          { label: "Paid Students",   val: data.filter(f => f.status === "Paid").length,                        color: "#4ade80" },
          { label: "Partial Paid",    val: data.filter(f => f.status === "Partial").length,                     color: "var(--gold)" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'Playfair Display',serif" }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", "Paid", "Pending", "Partial"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filter === f ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filter === f ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filter === f ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{f}</button>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="activity-table">
          <thead><tr><th>Student</th><th>Course</th><th>Total (₹)</th><th>Paid (₹)</th><th>Balance</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id}>
                <td>
                  <div style={{ color: "var(--cream)", fontWeight: 500 }}>{f.student}</div>
                  {f.txnId && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>TXN: {f.txnId}</div>}
                </td>
                <td>{f.course}</td>
                <td>₹{Number(f.amount).toLocaleString()}</td>
                <td style={{ color: "#4ade80", fontWeight: 600 }}>₹{Number(f.paid).toLocaleString()}</td>
                <td style={{ color: Number(f.amount) - Number(f.paid) > 0 ? "#f87171" : "#4ade80", fontWeight: 600 }}>
                  ₹{(Number(f.amount) - Number(f.paid)).toLocaleString()}
                </td>
                <td style={{ fontSize: 12 }}>{f.method || "—"}</td>
                <td>{f.date}</td>
                <td><span className={`status-badge ${f.status === "Paid" ? "status-active" : f.status === "Partial" ? "status-pending" : "status-done"}`}>{f.status}</span></td>
                <td>
                  <ActionBtn label="Receipt" color="#4ade80" onClick={() => printReceipt(f)} />
                  <ActionBtn label="Edit" onClick={() => openEdit(f)} />
                  <ActionBtn label="Delete" color="#f87171" onClick={() => del(f.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.mode === "add" ? "Add Fee Record" : "Edit Fee Record"} onClose={() => setModal(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Student Name"      name="student" value={form.student} onChange={handle} options={students.length ? students.map(s => s.name) : ["—"]} />
            <Field label="Course"            name="course"  value={form.course}  onChange={handle} options={courses.length ? courses.map(c => c.name) : ["—"]} />
            <Field label="Total Fee (₹)"     name="amount"  value={form.amount}  onChange={handle} type="number" />
            <Field label="Amount Paid (₹)"   name="paid"    value={form.paid}    onChange={handle} type="number" />
            <Field label="Payment Date"      name="date"    value={form.date}    onChange={handle} type="date" />
            <Field label="Payment Method"    name="method"  value={form.method}  onChange={handle} options={["Cash", "UPI", "NEFT", "RTGS", "Cheque", "DD", "Card"]} />
            <Field label="Transaction ID"    name="txnId"   value={form.txnId}   onChange={handle} placeholder="e.g. TXN001234" />
            <Field label="Status"            name="status"  value={form.status}  onChange={handle} options={["Paid", "Pending", "Partial"]} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Remarks</label>
            <textarea name="remarks" value={form.remarks} onChange={handle} rows={2}
              style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={submit}>
            {modal.mode === "add" ? "Add Record" : "Save Changes"}
          </button>
        </Modal>
      )}
    </>
  )
}


















// const DEFAULT_SITE_DATA = DEFAULT_SITE
// function SiteSettings({ data, setData }) {
//   const [form, setForm] = useState({ ...data })
//   const [saved, setSaved] = useState(false)
//   const [activeTab, setTab] = useState("home")
//   const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
//   const submit = () => {
//     setData(form); save("siteSettings", form)
//     setSaved(true); setTimeout(() => setSaved(false), 3000)
//   }

// const saveAll = () => {
//     setData(form);
//     save("siteSettings", form);        // localStorage mein save
//     alert("✅ Changes Saved! Refresh the Home Page to see updates.");
// };



//   const reset = () => {
//     if (!confirm("Reset all settings to default?")) return
//     setData(DEFAULT_SITE_DATA); setForm({ ...DEFAULT_SITE_DATA }); save("siteSettings", DEFAULT_SITE_DATA)
//   }
//   const tabs = [
//     { key: "home",    label: "🏠 Home"       },
//     { key: "about",   label: "ℹ️ About"      },
//     { key: "contact", label: "📞 Contact"    },
//     { key: "general", label: "⚙️ General"    },
//     { key: "features",label: "✨ Features"   },
//     { key: "social",  label: "🔗 Social"     },
//     { key: "images",  label: "🖼️ Images"    },
//     { key: "seo",     label: "🔍 SEO"        },
//   ]
//   const TA = ({ label, name, rows = 3 }) => (
//     <div style={{ marginBottom: 16 }}>
//       <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{label}</label>
//       <textarea name={name} value={form[name] || ""} onChange={handle} rows={rows}
//         style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
//     </div>
//   )
//   const IN = ({ label, name, placeholder }) => <Field label={label} name={name} value={form[name] || ""} onChange={handle} placeholder={placeholder} />
//   return (
//     <>
//       <SectionHeader title="Website Settings" subtitle="Edit all public website content — changes apply instantly on save" />
//       {saved && (
//         <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "12px 18px", marginBottom: 20, color: "#4ade80", fontSize: 14 }}>
//           ✅ All changes saved! Reload the public website to see updates.
//         </div>
//       )}
//       <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
//         {tabs.map(t => (
//           <button key={t.key} onClick={() => setTab(t.key)} style={{
//             padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer",
//             background: activeTab === t.key ? "var(--gold)" : "rgba(255,255,255,0.05)",
//             color: activeTab === t.key ? "var(--dark)" : "var(--text-muted)",
//             border: "1px solid " + (activeTab === t.key ? "var(--gold)" : "rgba(255,255,255,0.1)"),
//             fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
//           }}>{t.label}</button>
//         ))}
//       </div>
//       <div className="card" style={{ padding: 32 }}>
//         {activeTab === "home" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>🏠 Home Page Content</div>
//             <IN label="Admission Badge Text"  name="heroBadge"  placeholder="e.g. Now Enrolling for 2025–26" />
//             <IN label="Main Hero Heading"     name="tagline"    />
//             <TA label="Hero Description"      name="heroDesc"   />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <IN label="Admission Status (true/false)" name="admissionOpen" />
//               <IN label="Admission Banner Message" name="admissionMsg" />
//             </div>
//             <IN label="CTA Section Badge"     name="ctaBadge"    />
//             <IN label="CTA Section Title"     name="ctaTitle"    />
//             <TA label="CTA Section Subtitle"  name="ctaSubtitle" rows={2} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <IN label="CTA Button 1 Text"   name="ctaBtn1" />
//               <IN label="CTA Button 2 Text"   name="ctaBtn2" />
//             </div>
//             <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)", margin: "20px 0 16px" }}>📊 Stats Bar</div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <IN label="Stat 1 Value" name="stat1Val" />
//               <IN label="Stat 1 Label" name="stat1Label" />
//               <IN label="Stat 2 Value" name="stat2Val" />
//               <IN label="Stat 2 Label" name="stat2Label" />
//               <IN label="Stat 3 Value" name="stat3Val" />
//               <IN label="Stat 3 Label" name="stat3Label" />
//               <IN label="Stat 4 Value" name="stat4Val" />
//               <IN label="Stat 4 Label" name="stat4Label" />
//             </div>
//           </>
//         )}
//         {activeTab === "about" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>ℹ️ About Page</div>
//             <IN label="Section Heading"      name="aboutTitle" />
//             <TA label="First Paragraph"      name="aboutDesc1" rows={3} />
//             <TA label="Second Paragraph"     name="aboutDesc2" rows={3} />
//             <TA label="Mission Statement"    name="aboutMission" rows={2} />
//             <TA label="Vision Statement"     name="aboutVision"  rows={2} />
//           </>
//         )}
//         {activeTab === "features" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>✨ Why Choose Us (Features Section)</div>
//             {[1, 2, 3, 4].map(n => (
//               <div key={n} style={{ marginBottom: 20, padding: "16px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
//                 <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 12 }}>Feature {n}</div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//                   <IN label={`Title`}       name={`feat${n}Title`} />
//                   <IN label={`Description`} name={`feat${n}Desc`}  />
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//         {activeTab === "contact" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>📞 Contact Details</div>
//             <TA label="Full Address" name="address" rows={2} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <IN label="Primary Phone"  name="phone"  />
//               <IN label="Secondary Phone" name="phone2" />
//               <IN label="Primary Email"  name="email"  />
//               <IN label="Secondary Email" name="email2" />
//             </div>
//             <IN label="Office Hours"   name="hours"   />
//             <IN label="WhatsApp Number (digits only)" name="whatsapp" placeholder="e.g. 9876543210" />
//             <TA label="Google Maps Embed URL" name="mapEmbed" rows={2} />
//           </>
//         )}
//         {activeTab === "general" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>⚙️ General Branding</div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <IN label="School / Brand Name" name="schoolName"  />
//               <IN label="Logo Text"           name="logoText"    />
//             </div>
//             <IN label="Logo Tagline"          name="logoTagline" />
//             <TA label="Footer Description"    name="footerDesc"  rows={2} />
//             <IN label="Footer Copyright Text" name="footerCopyright" />
//             <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)", margin: "20px 0 16px" }}>🔐 Login Page</div>
//             <IN label="Login Page Title"    name="loginTitle"    />
//             <IN label="Login Page Subtitle" name="loginSubtitle" />
//             <TA label="Inspirational Quote" name="loginQuote"    rows={2} />
//             <IN label="Quote Author"        name="loginAuthor"   />
//           </>
//         )}
//         {activeTab === "social" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>🔗 Social Media Links</div>
//             <IN label="Facebook URL"  name="socialFacebook"  placeholder="https://facebook.com/yourpage" />
//             <IN label="Instagram URL" name="socialInstagram" placeholder="https://instagram.com/yourpage" />
//             <IN label="YouTube URL"   name="socialYoutube"   placeholder="https://youtube.com/yourchannel" />
//             <IN label="Twitter / X URL" name="socialTwitter" placeholder="https://twitter.com/yourhandle" />
//           </>
//         )}
//         {activeTab === "images" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 8 }}>🖼️ Page Images & Backgrounds</div>
//             <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>Paste any public image URL (Unsplash, Google Drive public link, Cloudinary, etc.)</p>
//             {[
//               { label: "Hero Background Image", name: "heroImage"  },
//               { label: "About Page Image",       name: "aboutImage" },
//               { label: "Login Page Background",  name: "loginBg"   },
//             ].map(({ label, name }) => (
//               <div key={name} style={{ marginBottom: 24 }}>
//                 <IN label={label} name={name} />
//                 {form[name] && (
//                   <div style={{ height: 120, borderRadius: 8, backgroundImage: `url('${form[name]}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(201,168,76,0.2)", marginTop: 8 }} />
//                 )}
//               </div>
//             ))}
//           </>
//         )}
//         {activeTab === "seo" && (
//           <>
//             <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>🔍 SEO & Meta Settings</div>
//             <IN label="Page Title (for browser tab)" name="metaTitle" placeholder="EduSphere – Shape Your Future" />
//             <TA label="Meta Description (for Google)"  name="metaDesc"  rows={3} />
//             <div style={{ padding: "12px 16px", background: "rgba(96,165,250,0.08)", borderRadius: 8, border: "1px solid rgba(96,165,250,0.2)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
//               ℹ️ These values are read by the website frontend to set <code style={{ color: "#60a5fa" }}>&lt;title&gt;</code> and <code style={{ color: "#60a5fa" }}>&lt;meta name="description"&gt;</code>. Make sure your website reads from <code style={{ color: "#60a5fa" }}>localStorage("siteSettings")</code>.
//             </div>
//           </>
//         )}

//         <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
//           <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={submit}>💾 Save All Changes</button>
//           <button className="btn-outline" style={{ justifyContent: "center" }} onClick={reset}>↺ Reset to Default</button>
//         </div>
//       </div>

//       {/* Live Preview snippet */}
//       <div className="card" style={{ padding: 24, marginTop: 20 }}>
//         <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "var(--cream)", marginBottom: 12 }}>👁️ Live Preview — Current Values</div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
//           {[
//             { label: "School Name", val: form.schoolName },
//             { label: "Tagline",     val: form.tagline },
//             { label: "Admission",   val: form.admissionOpen === "true" ? "🟢 Open" : "🔴 Closed" },
//             { label: "Phone",       val: form.phone },
//             { label: "Email",       val: form.email },
//             { label: "Address",     val: form.address },
//           ].map((r, i) => (
//             <div key={i} style={{ fontSize: 13, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
//               <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{r.label}: </span>
//               <span style={{ color: "var(--text-muted)" }}>{r.val || "—"}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }







const SS_TABS = [
  { key:"hero",label:"🏠 Hero"},{ key:"counters",label:"🔢 Counters"},
  { key:"features",label:"✨ Features"},{ key:"achievements",label:"🏆 Achievements"},
  { key:"testimonials",label:"💬 Testimonials"},{ key:"team",label:"👨‍🏫 Team"},
  { key:"events",label:"📅 Events"},{ key:"faq",label:"❓ FAQ"},
  { key:"partners",label:"🤝 Partners"},{ key:"video",label:"🎬 Video"},
  { key:"newsletter",label:"📬 Newsletter"},{ key:"cta",label:"📣 CTA Banner"},
  { key:"about",label:"ℹ️ About"},{ key:"contact",label:"📞 Contact"},
  { key:"general",label:"⚙️ General"},{ key:"social",label:"🔗 Social"},
  { key:"images",label:"🖼️ Images"},{ key:"seo",label:"🔍 SEO"},
]
function SSField({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:6 }}>{label}</label>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder||""}
        style={{ width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", boxSizing:"border-box" }} />
    </div>
  )
}
function SSTA({ label, name, value, onChange, rows=3 }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:6 }}>{label}</label>
      <textarea name={name} value={value||""} onChange={onChange} rows={rows}
        style={{ width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
    </div>
  )
}
function SSCard({ children }) {
  return <div style={{ marginBottom:20, padding:"16px 20px", background:"rgba(255,255,255,0.03)", borderRadius:10, border:"1px solid rgba(255,255,255,0.06)" }}>{children}</div>
}
function SSHead({ children }) {
  return <div style={{ fontSize:14, fontWeight:700, color:"var(--cream)", margin:"24px 0 16px", paddingBottom:8, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{children}</div>
}
function SiteSettings({ data, setData }) {
  const [form, setForm] = useState({ ...data })
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState("hero")
  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const IN = ({ label, name, placeholder }) => <SSField label={label} name={name} value={form[name]||""} onChange={h} placeholder={placeholder} />
  const TA = ({ label, name, rows }) => <SSTA label={label} name={name} value={form[name]||""} onChange={h} rows={rows} />
  const Two = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>{children}</div>
  const submit = () => { setData(form); save("siteSettings", form); setSaved(true); setTimeout(()=>setSaved(false),3000) }
  const reset = () => { if(!confirm("Reset all settings to default?"))return; setData(DEFAULT_SITE); setForm({...DEFAULT_SITE}); save("siteSettings",DEFAULT_SITE) }
  return (
    <>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:28 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>Website Settings</div>
          <div style={{ fontSize:13, color:"var(--text-muted)" }}>Edit all public website content — save to apply changes on the Home page</div>
        </div>
      </div>
      {saved && <div style={{ background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:8, padding:"12px 18px", marginBottom:20, color:"#4ade80", fontSize:14 }}>✅ All changes saved! Reload the public website to see updates.</div>}
      <div style={{ display:"flex", gap:6, marginBottom:28, flexWrap:"wrap" }}>
        {SS_TABS.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} style={{ padding:"8px 14px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", background:tab===t.key?"var(--gold)":"rgba(255,255,255,0.05)", color:tab===t.key?"var(--dark)":"var(--text-muted)", border:"1px solid "+(tab===t.key?"var(--gold)":"rgba(255,255,255,0.1)"), fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>{t.label}</button>
        ))}
      </div>
      <div className="card" style={{ padding:32 }}>
        {tab==="hero" && (<>
          <SSHead>🏠 Hero Section</SSHead>
          <IN label="Admission Badge Text" name="heroBadge" placeholder="Now Enrolling for 2025–26" />
          <IN label="Hero Heading (before 'Future')" name="tagline" placeholder="Shape Your" />
          <TA label="Hero Description" name="heroDesc" rows={3} />
          <Two><IN label="Admission Open? (true/false)" name="admissionOpen" /><IN label="Admission Banner Message" name="admissionMsg" /></Two>
          <SSHead>📊 Stats Bar</SSHead>
          <Two>
            <IN label="Stat 1 Value" name="stat1Val" /><IN label="Stat 1 Label" name="stat1Label" />
            <IN label="Stat 2 Value" name="stat2Val" /><IN label="Stat 2 Label" name="stat2Label" />
            <IN label="Stat 3 Value" name="stat3Val" /><IN label="Stat 3 Label" name="stat3Label" />
            <IN label="Stat 4 Value" name="stat4Val" /><IN label="Stat 4 Label" name="stat4Label" />
          </Two>
        </>)}
        {tab==="counters" && (<>
          <SSHead>🔢 Animated Counter Stats (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Counter {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"0 12px" }}>
                <IN label="End Number" name={`counter${n}End`} placeholder="5000" />
                <IN label="Suffix" name={`counter${n}Suffix`} placeholder="+" />
                <IN label="Icon" name={`counter${n}Icon`} placeholder="🎓" />
                <IN label="Label" name={`counter${n}Label`} placeholder="Students Enrolled" />
              </div>
            </SSCard>
          ))}
        </>)}
        {tab==="features" && (<>
          <SSHead>✨ Feature Cards (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Feature {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 2fr", gap:"0 12px" }}>
                <IN label="Icon" name={`feat${n}Icon`} placeholder="🎓" />
                <IN label="Title" name={`feat${n}Title`} placeholder="Expert Faculty" />
                <IN label="Description" name={`feat${n}Desc`} placeholder="Short description..." />
              </div>
            </SSCard>
          ))}
        </>)}
        {tab==="achievements" && (<>
          <SSHead>🏆 Achievements (4)</SSHead>
          {[1,2,3,4].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Achievement {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"80px 80px 1fr", gap:"0 12px" }}>
                <IN label="Icon" name={`ach${n}Icon`} placeholder="🥇" />
                <IN label="Year" name={`ach${n}Year`} placeholder="2024" />
                <IN label="Title" name={`ach${n}Title`} placeholder="Best Institution" />
              </div>
              <TA label="Description" name={`ach${n}Body`} rows={2} />
            </SSCard>
          ))}
        </>)}
        {tab==="testimonials" && (<>
          <SSHead>💬 Testimonials (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Testimonial {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 60px", gap:"0 12px" }}>
                <IN label="Name" name={`test${n}Name`} placeholder="Priya Sharma" />
                <IN label="Role" name={`test${n}Role`} placeholder="JEE Qualifier, IIT Delhi" />
                <IN label="Avatar (initial)" name={`test${n}Avatar`} placeholder="P" />
              </div>
              <TA label="Testimonial Text" name={`test${n}Text`} rows={3} />
            </SSCard>
          ))}
        </>)}
        {tab==="team" && (<>
          <SSHead>👨‍🏫 Team Members (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Member {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 12px" }}>
                <IN label="Full Name" name={`team${n}Name`} placeholder="Dr. Rajesh Kumar" />
                <IN label="Role" name={`team${n}Role`} placeholder="Principal & Founder" />
                <IN label="Subject" name={`team${n}Subject`} placeholder="Physics" />
                <IN label="Experience" name={`team${n}Exp`} placeholder="30+ yrs" />
              </div>
              <IN label="Avatar Initial" name={`team${n}Avatar`} placeholder="R" />
            </SSCard>
          ))}
        </>)}
        {tab==="events" && (<>
          <SSHead>📅 Events (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>Event {n}</div>
              <div style={{ display:"grid", gridTemplateColumns:"60px 60px 1fr", gap:"0 12px" }}>
                <IN label="Date" name={`ev${n}Date`} placeholder="15" />
                <IN label="Month" name={`ev${n}Month`} placeholder="Jan" />
                <IN label="Title" name={`ev${n}Title`} placeholder="Science Exhibition" />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0 12px" }}>
                <IN label="Time" name={`ev${n}Time`} placeholder="10:00 AM" />
                <IN label="Venue" name={`ev${n}Venue`} placeholder="Main Hall" />
                <IN label="Category" name={`ev${n}Cat`} placeholder="Academic" />
              </div>
            </SSCard>
          ))}
        </>)}
        {tab==="faq" && (<>
          <SSHead>❓ FAQ (6)</SSHead>
          {[1,2,3,4,5,6].map(n=>(
            <SSCard key={n}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)", marginBottom:12 }}>FAQ {n}</div>
              <IN label="Question" name={`faq${n}Q`} placeholder="What courses does EduSphere offer?" />
              <TA label="Answer" name={`faq${n}A`} rows={3} />
            </SSCard>
          ))}
        </>)}
        {tab==="partners" && (<>
          <SSHead>🤝 Partners & Affiliates</SSHead>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:16, lineHeight:1.6 }}>Enter partner names separated by commas. These scroll in the marquee strip.</p>
          <SSTA label="Partner Names (comma-separated)" name="partners" value={form.partners||""} onChange={h} rows={4} />
          <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:8 }}>Example: <em style={{ color:"var(--gold)" }}>IIT Delhi, AIIMS, CBSE Board, Coursera</em></div>
        </>)}
        {tab==="video" && (<>
          <SSHead>🎬 Video Section</SSHead>
          <IN label="Section Heading" name="videoHeading" placeholder="Experience Campus Life" />
          <TA label="Section Description" name="videoDesc" rows={3} />
          <IN label="YouTube Embed URL" name="videoUrl" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
          <div style={{ padding:"12px 16px", background:"rgba(96,165,250,0.08)", borderRadius:8, border:"1px solid rgba(96,165,250,0.2)", fontSize:13, color:"var(--text-muted)", lineHeight:1.7, marginTop:8 }}>
            ℹ️ Use embed URL: <code style={{ color:"#60a5fa" }}>https://www.youtube.com/embed/VIDEO_ID</code> — not the regular watch URL.
          </div>
        </>)}
        {tab==="newsletter" && (<>
          <SSHead>📬 Newsletter Section</SSHead>
          <IN label="Heading (before 'Newsletter')" name="newsletterTitle" placeholder="Subscribe to Our" />
          <TA label="Description Text" name="newsletterDesc" rows={3} />
        </>)}
        {tab==="cta" && (<>
          <SSHead>📣 CTA Banner</SSHead>
          <IN label="Badge Text" name="ctaBadge" placeholder="Limited Seats Available" />
          <IN label="Main Heading" name="ctaTitle" placeholder="Ready to Begin Your Journey?" />
          <Two>
            <IN label="Button 1 Text" name="ctaBtn1" placeholder="Apply Now →" />
            <IN label="Button 2 Text" name="ctaBtn2" placeholder="Talk to Us" />
          </Two>
        </>)}
        {tab==="about" && (<>
          <SSHead>ℹ️ About Page</SSHead>
          <IN label="Section Heading" name="aboutTitle" />
          <TA label="First Paragraph" name="aboutDesc1" rows={3} />
          <TA label="Second Paragraph" name="aboutDesc2" rows={3} />
          <TA label="Mission Statement" name="aboutMission" rows={2} />
          <TA label="Vision Statement" name="aboutVision" rows={2} />
          <IN label="About Page Image URL" name="aboutImage" />
          {form.aboutImage && <div style={{ height:120, borderRadius:8, backgroundImage:`url('${form.aboutImage}')`, backgroundSize:"cover", backgroundPosition:"center", border:"1px solid rgba(201,168,76,0.2)", marginTop:8 }} />}
        </>)}
        {tab==="contact" && (<>
          <SSHead>📞 Contact Details</SSHead>
          <TA label="Full Address" name="address" rows={2} />
          <Two>
            <IN label="Primary Phone" name="phone" /><IN label="Secondary Phone" name="phone2" />
            <IN label="Primary Email" name="email" /><IN label="Secondary Email" name="email2" />
          </Two>
          <IN label="Office Hours" name="hours" />
          <IN label="WhatsApp Number (digits only)" name="whatsapp" placeholder="9876543210" />
          <TA label="Google Maps Embed URL" name="mapEmbed" rows={2} />
        </>)}
        {tab==="general" && (<>
          <SSHead>⚙️ General Branding</SSHead>
          <Two>
            <IN label="School / Brand Name" name="schoolName" />
            <IN label="Logo Text" name="logoText" />
          </Two>
          <IN label="Logo Tagline" name="logoTagline" />
          <TA label="Footer Description" name="footerDesc" rows={2} />
          <IN label="Footer Copyright Text" name="footerCopyright" />
          <SSHead>🔐 Login Page</SSHead>
          <IN label="Login Page Title" name="loginTitle" />
          <IN label="Login Page Subtitle" name="loginSubtitle" />
          <TA label="Inspirational Quote" name="loginQuote" rows={2} />
          <IN label="Quote Author" name="loginAuthor" />
        </>)}
        {tab==="social" && (<>
          <SSHead>🔗 Social Media Links</SSHead>
          <IN label="Facebook URL" name="socialFacebook" placeholder="https://facebook.com/yourpage" />
          <IN label="Instagram URL" name="socialInstagram" placeholder="https://instagram.com/yourpage" />
          <IN label="YouTube URL" name="socialYoutube" placeholder="https://youtube.com/yourchannel" />
          <IN label="Twitter / X URL" name="socialTwitter" placeholder="https://twitter.com/yourhandle" />
        </>)}
        {tab==="images" && (<>
          <SSHead>🖼️ Images & Backgrounds</SSHead>
          <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:20, lineHeight:1.6 }}>Paste any public image URL (Unsplash, Cloudinary, etc.)</p>
          {[{label:"Hero Background Image",name:"heroImage"},{label:"Login Page Background",name:"loginBg"}].map(({label,name})=>(
            <div key={name} style={{ marginBottom:24 }}>
              <SSField label={label} name={name} value={form[name]||""} onChange={h} />
              {form[name] && <div style={{ height:120, borderRadius:8, backgroundImage:`url('${form[name]}')`, backgroundSize:"cover", backgroundPosition:"center", border:"1px solid rgba(201,168,76,0.2)", marginTop:8 }} />}
            </div>
          ))}
        </>)}
        {tab==="seo" && (<>
          <SSHead>🔍 SEO & Meta</SSHead>
          <IN label="Page Title (browser tab)" name="metaTitle" placeholder="EduSphere – Shape Your Future" />
          <TA label="Meta Description (Google)" name="metaDesc" rows={3} />
        </>)}
        <div style={{ display:"flex", gap:12, marginTop:32, flexWrap:"wrap" }}>
          <button className="btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={submit}>💾 Save All Changes</button>
          <button className="btn-outline" style={{ justifyContent:"center" }} onClick={reset}>↺ Reset to Default</button>
        </div>
      </div>
      <div className="card" style={{ padding:24, marginTop:20 }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"var(--cream)", marginBottom:12 }}>👁️ Live Preview</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10 }}>
          {[
            {label:"School Name", val:form.schoolName},
            {label:"Tagline", val:form.tagline},
            {label:"Admission", val:form.admissionOpen==="true"?"🟢 Open":"🔴 Closed"},
            {label:"Phone", val:form.phone},
            {label:"Email", val:form.email},
            {label:"Features", val:[1,2,3,4,5,6].map(n=>form[`feat${n}Title`]).filter(Boolean).join(", ")},
            {label:"Partners", val:(form.partners||"").split(",").length+" partners"},
            {label:"FAQ Count", val:[1,2,3,4,5,6].filter(n=>form[`faq${n}Q`]).length+" questions"},
            {label:"Video", val:form.videoUrl?"✅ Set":"❌ Not set"},
            {label:"Hero Image", val:form.heroImage?"✅ Set":"❌ Not set"},
          ].map((r,i)=>(
            <div key={i} style={{ fontSize:13, padding:"10px 14px", background:"rgba(255,255,255,0.03)", borderRadius:8 }}>
              <span style={{ color:"var(--gold)", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:0.5 }}>{r.label}: </span>
              <span style={{ color:"var(--text-muted)" }}>{r.val||"—"}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}




/* ══════════════════════════════════════════════════════════════
   MAIN AdminDashboard
══════════════════════════════════════════════════════════════ */
const MENU = [
  { key: "overview",   icon: "📊", label: "Overview"         },
  { key: "students",   icon: "👥", label: "Students"         },
  { key: "teachers",   icon: "🧑", label: "Teachers"       },
  { key: "courses",    icon: "📚", label: "Courses"          },
  { key: "timetable",  icon: "🗓️", label: "Timetable"       },
  { key: "exams",      icon: "📝", label: "Exams & Tests"    },
  { key: "events",     icon: "🎉", label: "Events"           },
  { key: "notices",    icon: "📢", label: "Notices"          },
  { key: "gallery",    icon: "🖼️", label: "Gallery"          },
  { key: "fees",       icon: "💰", label: "Fees"             },
  { key: "settings",   icon: "⚙️", label: "Website Settings" },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [active,    setActive]    = useState("overview")
  const [students,  setStudents]  = useState(() => load("students",  DEFAULT_STUDENTS))
  const [teachers,  setTeachers]  = useState(() => load("teachers",  DEFAULT_TEACHERS))
  const [courses,   setCourses]   = useState(() => load("courses",   DEFAULT_COURSES))
  const [notices,   setNotices]   = useState(() => load("notices",   DEFAULT_NOTICES))
  const [gallery,   setGallery]   = useState(() => load("gallery",   DEFAULT_GALLERY))
  const [fees,      setFees]      = useState(() => load("fees",      DEFAULT_FEES))
  const [timetable, setTimetable] = useState(() => load("timetable", DEFAULT_TIMETABLE))
  const [exams,     setExams]     = useState(() => load("exams",     DEFAULT_EXAMS))
  const [events,    setEvents]    = useState(() => load("events",    DEFAULT_EVENTS))
  const [site,      setSite]      = useState(() => load("siteSettings", DEFAULT_SITE))
  const [sideOpen,  setSideOpen]  = useState(false)

  const [user, setUser] = useState(null)

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      const data = await res.json()
      if (data.success) setUser(data.user)
      else navigate("/login")
    } catch {
      navigate("/login")
    }
  }
  fetchUser()
}, [])

  const menuItem = (item) => (
    <div key={item.key}
      onClick={() => { setActive(item.key); setSideOpen(false) }}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "11px 12px", borderRadius: 8, marginBottom: 2,
        cursor: "pointer", fontSize: 14, fontWeight: 500,
        background: active === item.key ? "rgba(201,168,76,0.12)" : "transparent",
        color:      active === item.key ? "var(--gold)"            : "var(--text-muted)",
        transition: "all 0.25s",
      }}
    >
      <span style={{ fontSize: 17, width: 24, textAlign: "center" }}>{item.icon}</span>
      {item.label}
    </div>
  )

  const sidebar = (
    <div style={{ padding: "0 16px" }}>
     <div style={{ padding: "0 4px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>
  <div
    onClick={() => setActive("overview")}
    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
    title="Go to Dashboard"
  >
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "rgba(201,168,76,0.15)",
      border: "1.5px solid rgba(201,168,76,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, color: "var(--gold)", flexShrink: 0
    }}>👤</div>
    <div>
      <div style={{ fontWeight: 700, color: "var(--gold)", fontSize: 14 }}>{user?.name || "Admin"}</div>
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)" }}>Admin Portal</div>
    </div>
  </div>
</div>
      {MENU.map(menuItem)}
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
       <div onClick={async () => { await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" }); navigate("/login") }}
          style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "#f87171" }}>
          <span style={{ fontSize: 17, width: 24, textAlign: "center" }}>🚪</span>Sign Out
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh", paddingTop: "var(--nav-h)" }}>
      {/* Desktop Sidebar */}
      <div style={{ background: "var(--dark2)", borderRight: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, position: "sticky", top: 0, height: "calc(100vh - var(--nav-h))", overflowY: "auto" }}>
        {sidebar}
      </div>
      {/* Mobile sidebar overlay */}
      {sideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 5000, display: "flex" }}>
          <div style={{ width: 260, background: "var(--dark2)", paddingTop: 80, borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto" }}>
            {sidebar}
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.6)" }} onClick={() => setSideOpen(false)} />
        </div>
      )}
      {/* Main */}
      <div style={{ padding: "40px 36px 60px", background: "var(--dark)", minWidth: 0 }}>
        <button onClick={() => setSideOpen(true)}
          style={{ display: "none", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 8, padding: "8px 14px", color: "var(--gold)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}
          className="mobile-menu-btn">
          ☰ Menu
        </button>
        {active === "overview"  && <Overview  students={students} teachers={teachers} courses={courses} notices={notices} fees={fees} exams={exams} events={events} />}
        {active === "students"  && <Students  data={students}  setData={setStudents} />}
        {active === "teachers"  && <Teachers  data={teachers}  setData={setTeachers} />}
        {active === "courses"   && <Courses   data={courses}   setData={setCourses}  teachers={teachers} />}
        {active === "timetable" && <Timetable data={timetable} setData={setTimetable} />}
        {active === "exams"     && <Exams     data={exams}     setData={setExams}    />}
        {active === "events"    && <Events    data={events}    setData={setEvents}   />}
        {active === "notices"   && <Notices   data={notices}   setData={setNotices}  />}
        {active === "gallery"   && <Gallery   data={gallery}   setData={setGallery}  />}
        {active === "fees"      && <Fees      data={fees}      setData={setFees}     students={students} courses={courses} />}
        {active === "settings"  && <SiteSettings data={site} setData={setSite} />}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  )
}