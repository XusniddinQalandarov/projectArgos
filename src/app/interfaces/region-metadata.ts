export interface RegionMetadata {
  id: string;
  name: string;
  svgPath: string;

  // User statistics
  totalUsers: number;
  firstEntryDate: string;
  activeUsers: number;
  certificatesIssued: number;
  averageTime: string;

  // Gender distribution
  genderDistribution: {
    male: number;
    female: number;
  };

  // Course completion
  courseCompletion: {
    oneCourse: { percentage: number; count: number };
    twoPlusCourses: { percentage: number; count: number };
    notCompleted: { percentage: number; count: number };
  };

  // Performance metrics
  averageScore: number;
  averagePassRate: number;
}
