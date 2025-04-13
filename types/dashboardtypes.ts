

/**
 * Represents a single attendance record for a class session.
 */
  interface AttendanceRecord {
  date: string;          // Date of the class session (e.g., "2024-01-15")
  attended: boolean;     // Whether the student attended
  hoursAttended: number; // Hours the student was present for this session
  totalHours: number;    // Total possible hours for this session
}

/**
 * Represents a single score entry (quiz, homework, exam, etc.).
 */
interface DailyScore {
  date: string;          // Date the score was recorded (e.g., "2024-01-16")
  type: string;          // Type of score (e.g., "Quiz", "Homework", "Exam", "Lab")
  score: number;         // Score received by the student
  total: number;         // Total possible score for this item
}

/**
 * Represents detailed information about a single class a student is enrolled in.
 */
export interface ClassInfo {
  classId: string;         // Unique identifier for the class (e.g., "c201")
  className: string;       // Name of the class (e.g., "Mathematics 101") - **This is the field you asked for**
  teacherName: string;     // Name of the teacher (e.g., "Mr. Brown")
  finalScore: number;      // Overall final score achieved in the class
  totalScore: number;      // Total possible score for the entire class
  finalPercentage: number; // Final percentage calculated from scores
  totalPercentage: number; // Overall percentage achieved (might be same as finalPercentage or calculated differently)
  attendance: AttendanceRecord[]; // Array of attendance records for this class
  dailyScores: DailyScore[];      // Array of daily/exam scores for this class
}

/**
 * Represents a single student and their associated classes.
 */
export interface Student {
  id: string;              // Unique identifier for the student (e.g., "s1001")
  name: string;            // Full name of the student (e.g., "Alice Smith")
  classes: ClassInfo[];    // Array of classes the student is taking
}

/**
 * Represents the root structure of the entire JSON data.
 */
export interface StudentData {
  students: Student[];     // Array of all students
}

// --- Example Usage (Conceptual) ---

/*
 Assuming you have fetched the JSON data and parsed it into a variable `studentData`
 of type `StudentData`:

 // Get all class names for the first student
 const firstStudentClasses = studentData.students[0]?.classes || [];
 const firstStudentClassNames = firstStudentClasses.map(cls => cls.className);
 console.log(firstStudentClassNames); // Output: ["Mathematics 101", "History 101"] (for Alice)

 // Get all unique class names across all students
 const allClassNames = new Set<string>();
 studentData.students.forEach(student => {
   student.classes.forEach(cls => {
     allClassNames.add(cls.className);
   });
 });
 console.log(Array.from(allClassNames)); // Output: ["Mathematics 101", "History 101", "Physics 101"]
*/
