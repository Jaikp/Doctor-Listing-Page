import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorCard from './components/DoctorCard';
import { Doctor, FilterState } from './types/doctor';
import { fetchDoctors } from './services/api';

const initialFilters: FilterState = {
  search: '',
  consultationType: '',
  specialities: [],
  sortBy: '',
  sortOrder: 'asc',
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<FilterState>(() => {
    const search = searchParams.get('search') || '';
    const consultationType = (searchParams.get('consultationType') as 'Video Consult' | 'In Clinic') || '';
    const specialities = searchParams.get('specialities')?.split(',') || [];
    const sortBy = (searchParams.get('sortBy') as 'fees' | 'experience') || '';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';

    return {
      search,
      consultationType,
      specialities,
      sortBy,
      sortOrder,
    };
  });

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchDoctors();
      setDoctors(data);
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.consultationType) params.set('consultationType', filters.consultationType);
    if (filters.specialities.length) params.set('specialities', filters.specialities.join(','));
    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
      params.set('sortOrder', filters.sortOrder);
    }
    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    let result = [...doctors];

    // Apply search filter
    if (filters.search) {
      result = result.filter((doctor) =>
        doctor.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter((doctor) => doctor.consultationType === filters.consultationType);
    }

    // Apply specialities filter
    if (filters.specialities.length > 0) {
      result = result.filter((doctor) =>
        doctor.speciality.some((speciality) => filters.specialities.includes(speciality))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return filters.sortOrder === 'asc' ? a.fees - b.fees : b.fees - a.fees;
        } else {
          return filters.sortOrder === 'asc' ? a.experience - b.experience : b.experience - a.experience;
        }
      });
    }

    setFilteredDoctors(result);
  }, [doctors, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const uniqueSpecialities = Array.from(
    new Set(doctors.flatMap((doctor) => doctor.speciality))
  ).sort();

  const suggestions = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .map((doctor) => doctor.name)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
          <p className="mt-2 text-gray-600">Search and book appointments with top specialists</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar
            value={filters.search}
            onChange={(value) => handleFilterChange({ search: value })}
            suggestions={suggestions}
            onSuggestionClick={(suggestion) => handleFilterChange({ search: suggestion })}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              specialities={uniqueSpecialities}
            />
          </div>
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
              </h2>
              {filters.sortBy && (
                <div className="text-sm text-gray-500">
                  Sorted by: <span className="font-medium">{filters.sortBy === 'fees' ? 'Fees' : 'Experience'}</span>
                </div>
              )}
            </div>
            
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Doctor Listing Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
