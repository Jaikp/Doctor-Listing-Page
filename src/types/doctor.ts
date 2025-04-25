export interface Doctor {
  id: string;
  name: string;
  speciality: string[];
  experience: number;
  fees: number;
  consultationType: 'Video Consult' | 'In Clinic';
  imageUrl?: string;
  qualification: string;
  clinicName: string;
  location: string;
  languages: string[];
  fullAddress: string;
  introduction: string;
  clinicLogo?: string;
}

export interface FilterState {
  search: string;
  consultationType: 'Video Consult' | 'In Clinic' | '';
  specialities: string[];
  sortBy: 'fees' | 'experience' | '';
  sortOrder: 'asc' | 'desc';
}

export interface DoctorCardProps {
  doctor: Doctor;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  specialities: string[];
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
} 