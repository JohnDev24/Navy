
export enum Branch {
  SURFACE = 'Surface Warfare',
  SUBMARINE = 'Submarine Force',
  AVIATION = 'Naval Aviation',
  SPECIAL_OPS = 'Special Operations',
  ENGINEERING = 'Engineering & Tech',
  MEDICAL = 'Medical Corps'
}

export enum ApplicationStatus {
  PENDING = 'Pending Review',
  INTERVIEW = 'Interview Scheduled',
  ACCEPTED = 'Accepted',
  REJECTED = 'Waitlisted'
}

export interface Recruit {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  branch: Branch;
  bio: string;
  status: ApplicationStatus;
  skills: string[];
  appliedDate: string;
}

export interface CareerPath {
  title: string;
  description: string;
  image: string;
  branch: Branch;
}
