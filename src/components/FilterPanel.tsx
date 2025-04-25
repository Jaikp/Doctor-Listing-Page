import React from 'react';
import { FilterPanelProps } from '../types/doctor';

const AVAILABLE_SPECIALTIES = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian/Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleConsultationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ consultationType: event.target.value as 'Video Consult' | 'In Clinic' | '' });
  };

  const handleSpecialityChange = (speciality: string) => {
    const newSpecialities = filters.specialities.includes(speciality)
      ? filters.specialities.filter((s) => s !== speciality)
      : [...filters.specialities, speciality];
    onFilterChange({ specialities: newSpecialities });
  };

  const handleSortChange = (value: 'fees' | 'experience' | '') => {
    onFilterChange({
      sortBy: value,
      sortOrder: value === 'fees' ? 'asc' : 'desc',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" data-testid="filter-header-moc">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Consultation Mode
        </h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="consultationType"
              value=""
              checked={filters.consultationType === ''}
              onChange={handleConsultationTypeChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="filter-all-consult"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">All</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="consultationType"
              value="Video Consult"
              checked={filters.consultationType === 'Video Consult'}
              onChange={handleConsultationTypeChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="filter-video-consult"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">Video Consult</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="consultationType"
              value="In Clinic"
              checked={filters.consultationType === 'In Clinic'}
              onChange={handleConsultationTypeChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="filter-in-clinic"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">In Clinic</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" data-testid="filter-header-speciality">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Speciality
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {AVAILABLE_SPECIALTIES.map((speciality) => (
            <label key={speciality} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.specialities.includes(speciality)}
                onChange={() => handleSpecialityChange(speciality)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                data-testid={`filter-specialty-${speciality.replace('/', '-')}`}
              />
              <span className="ml-3 text-gray-700 group-hover:text-gray-900">{speciality}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" data-testid="filter-header-sort">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort By
        </h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="sortBy"
              value=""
              checked={filters.sortBy === ''}
              onChange={() => handleSortChange('')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="sort-none"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">None</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="sortBy"
              value="fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="sort-fees"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">Fees (Low to High)</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="sortBy"
              value="experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="sort-experience"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 