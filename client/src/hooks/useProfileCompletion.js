import { useState, useEffect } from 'react';
import api from '../lib/api';

export function useProfileCompletion() {
  const [profileStatus, setProfileStatus] = useState({
    isComplete: false,
    missingFields: [],
    loading: true,
    error: null
  });

  const checkProfileStatus = async () => {
    try {
      setProfileStatus(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.get('/profile/status');
      setProfileStatus({
        isComplete: response.data.isComplete,
        missingFields: response.data.missingFields || [],
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to check profile status:', error);
      setProfileStatus({
        isComplete: false,
        missingFields: ['age', 'gender', 'location', 'medicalHistory'],
        loading: false,
        error: error.message
      });
    }
  };

  useEffect(() => {
    checkProfileStatus();
  }, []);

  return {
    ...profileStatus,
    refetch: checkProfileStatus
  };
}

export default useProfileCompletion;