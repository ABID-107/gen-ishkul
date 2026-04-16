export type UserRole = 'admin' | 'teacher' | 'student' | 'guardian';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}

export interface Student extends User {
  role: 'student';
  roll: string;
  class: string;
  section: string;
  group?: 'Science' | 'Commerce' | 'Arts';
  session: string;
  guardianId?: string;
  batchIds: string[];
  enrollments: Enrollment[];
  attendance: Attendance[];
  payments: Payment[];
  results: ExamResult[];
}

export interface Teacher extends User {
  role: 'teacher';
  designation: string;
  subjects: string[];
  qualification: string;
  experience: number;
  institutionId?: string;
  courseIds: string[];
  rating: number;
  totalStudents: number;
}

export interface Guardian extends User {
  role: 'guardian';
  occupation: string;
  relation: 'father' | 'mother' | 'other';
  studentIds: string[];
  monthlyIncome?: number;
}

export interface Institution {
  id: string;
  name: string;
  type: 'school' | 'college' | 'coaching' | 'university';
  division: string;
  district: string;
  upazila: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  established: number;
  adminIds: string[];
}

export type CourseCategory = 
  | 'hsc' 
  | 'ssc' 
  | 'admission' 
  | 'job' 
  | 'skill' 
  | 'university' 
  | 'language';

export interface Course {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: CourseCategory;
  subject: string;
  teacherId: string;
  teacher?: Teacher;
  thumbnail?: string;
  price: number;
  discount?: number;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
  totalClasses: number;
  completedClasses: number;
  enrolledStudents: number;
  rating: number;
  reviewCount: number;
  language: 'bn' | 'en';
  requirements: string[];
  outcomes: string[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  course?: Course;
  teacherId: string;
  teacher?: Teacher;
  startDate: string;
  endDate: string;
  schedule: BatchSchedule[];
  maxStudents: number;
  currentStudents: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  roomNumber?: string;
  onlineLink?: string;
}

export interface BatchSchedule {
  day: 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  startTime: string;
  endTime: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  student?: Student;
  courseId: string;
  course?: Course;
  batchId?: string;
  batch?: Batch;
  enrolledAt: string;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  progress: number;
  completionDate?: string;
  certificateId?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  batchId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  course?: Course;
  batchId?: string;
  teacherId: string;
  type: 'mcq' | 'written' | 'practical' | 'mixed';
  totalMarks: number;
  passingMarks: number;
  duration: number;
  scheduledAt: string;
  endedAt: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'published';
  questions: Question[];
  isPublished: boolean;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  textBn?: string;
  type: 'mcq' | 'short' | 'long';
  marks: number;
  options?: QuestionOption[];
  correctAnswer?: string;
  chapterId?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  textBn?: string;
  isCorrect: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  exam?: Exam;
  studentId: string;
  student?: Student;
  answers: Answer[];
  totalObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'passed' | 'failed';
  submittedAt: string;
  gradedAt?: string;
  feedback?: string;
}

export interface Answer {
  questionId: string;
  answer: string;
  marksObtained?: number;
  isCorrect?: boolean;
  feedback?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  student?: Student;
  courseId?: string;
  course?: Course;
  amount: number;
  discount?: number;
  method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash' | 'Card';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'admission' | 'monthly' | 'exam' | 'certificate' | 'other';
  paidAt?: string;
  dueDate?: string;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'exam' | 'payment' | 'event' | 'holiday';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  publishedBy: string;
  publishedAt: string;
  expiresAt?: string;
  attachments?: string[];
  targetRoles: UserRole[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course?: Course;
  teacherId: string;
  dueDate: string;
  totalMarks: number;
  attachments?: string[];
  submissions: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content?: string;
  attachments?: string[];
  marks?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
}

export interface Certificate {
  id: string;
  studentId: string;
  student?: Student;
  courseId: string;
  course?: Course;
  issuedAt: string;
  certificateNumber: string;
  grade: string;
  verificationCode: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeBatches: number;
  upcomingExams: number;
  pendingPayments: number;
}

export interface AnalyticsData {
  revenueByMonth: { month: string; amount: number }[];
  studentEnrollmentByCategory: { category: string; count: number }[];
  attendanceRate: number;
  examPerformance: { avgScore: number; passRate: number }[];
  topCourses: Course[];
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'enrollment' | 'payment' | 'exam' | 'certificate' | 'assignment';
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface Subject {
  id: string;
  name: string;
  nameBn: string;
  code: string;
  category: CourseCategory;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  titleBn: string;
  order: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  chapterId: string;
  title: string;
  titleBn: string;
  order: number;
  videoUrl?: string;
  duration?: number;
  isCompleted?: boolean;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  student?: Student;
  rating: number;
  comment: string;
  createdAt: string;
  replies: ReviewReply[];
}

export interface ReviewReply {
  id: string;
  reviewId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export type BengaliDivision = 
  | 'Dhaka' 
  | 'Chittagong' 
  | 'Rajshahi' 
  | 'Khulna' 
  | 'Barisal' 
  | 'Sylhet' 
  | 'Rangpur' 
  | 'Mymensingh';

export type EducationBoard = 
  | 'Dhaka' 
  | 'Chittagong' 
  | 'Rajshahi' 
  | 'Khulna' 
  | 'Barisal' 
  | 'Sylhet' 
  | 'Rangpur' 
  | 'Dinajpur' 
  | 'Madrasah' 
  | 'Technical';
