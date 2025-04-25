import axios from 'axios';
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await axios.get(API_URL);
    
   
    const transformedData: Doctor[] = response.data.map((item: any) => {

      const experienceYears = parseInt(item.experience?.split(' ')?.[0]) || 0;
      

      const feesNumber = parseInt(item.fees?.replace('₹', '')?.trim()) || 0;
      
 
      const consultationType = item.video_consult && !item.in_clinic 
        ? 'Video Consult' 
        : !item.video_consult && item.in_clinic 
          ? 'In Clinic'
          : 'Video Consult';

      return {
        id: item.id || String(Math.random()),
        name: item.name?.replace('Dr. ', '') || '',
        speciality: item.specialities?.map((s: any) => s.name) || [],
        experience: experienceYears,
        fees: feesNumber,
        consultationType,
        qualification: item.doctor_introduction?.split(',')?.[1]?.trim() || 'MBBS',
        clinicName: item.clinic?.name || 'Private Clinic',
        location: item.clinic?.address?.locality || '',
        imageUrl: item.photo || undefined,
        languages: item.languages || [],
        fullAddress: [
          item.clinic?.address?.address_line1,
          item.clinic?.address?.locality,
          item.clinic?.address?.city
        ].filter(Boolean).join(', '),
        introduction: item.doctor_introduction || '',
        clinicLogo: item.clinic?.address?.logo_url
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}; 