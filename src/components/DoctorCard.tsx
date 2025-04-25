import React from 'react';
import { DoctorCardProps } from '../types/doctor';

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6"
    >
      <div className="flex gap-4">
  
        <div className="flex-shrink-0">
          {doctor.imageUrl ? (
            <img
              src={doctor.imageUrl}
              alt={`Dr. ${doctor.name}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center border-2 border-gray-100">
              <span className="text-2xl font-bold text-blue-600">{doctor.name.charAt(0)}</span>
            </div>
          )}
        </div>

   
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900" data-testid="doctor-name">
            Dr. {doctor.name}
          </h2>
          <p className="text-gray-600 mt-1">{doctor.qualification}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-600" data-testid="doctor-specialty">
              {doctor.speciality.join(', ')}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <div className="flex items-center gap-1" data-testid="doctor-experience">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{doctor.experience} yrs exp.</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{doctor.languages.join(', ')}</span>
            </div>
          </div>
        </div>

       
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900" data-testid="doctor-fee">₹{doctor.fees}</div>
          <div className="text-sm text-gray-500">Consultation Fee</div>
        </div>
      </div>

      {/* Hospital/Clinic Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-3">
          {doctor.clinicLogo && (
            <img 
              src={doctor.clinicLogo} 
              alt={doctor.clinicName}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-900">{doctor.clinicName}</h3>
                <p className="text-gray-600 text-sm">{doctor.fullAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {doctor.consultationType === 'Video Consult' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Consult
            </span>
          )}
          {doctor.consultationType === 'In Clinic' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              In Clinic
            </span>
          )}
        </div>
        
        <button 
          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300 font-medium"
          data-testid="book-appointment"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard; 