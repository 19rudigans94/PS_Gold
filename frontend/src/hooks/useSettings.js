import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSettings,
  selectIsLoading,
  selectError,
  selectIsInitialized,
  fetchSettings,
  updateSettings,
  resetSettings,
  selectMaintenanceMode,
  selectMaintenanceMessage,
  selectSiteName,
  selectContactEmail,
  selectDeliverySettings,
  selectNotificationSettings,
} from '../store/slices/settingsSlice';

export const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isInitialized = useSelector(selectIsInitialized);

  const maintenanceMode = useSelector(selectMaintenanceMode);
  const maintenanceMessage = useSelector(selectMaintenanceMessage);
  const siteName = useSelector(selectSiteName);
  const contactEmail = useSelector(selectContactEmail);
  const deliverySettings = useSelector(selectDeliverySettings);
  const notificationSettings = useSelector(selectNotificationSettings);

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(fetchSettings());
    }
  }, [dispatch, isInitialized, isLoading]);

  const updateSettingsData = async (data) => {
    try {
      await dispatch(updateSettings(data)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetSettingsData = () => {
    dispatch(resetSettings());
  };

  return {
    settings,
    isLoading,
    error,
    isInitialized,
    maintenanceMode,
    maintenanceMessage,
    siteName,
    contactEmail,
    deliverySettings,
    notificationSettings,
    updateSettings: updateSettingsData,
    resetSettings: resetSettingsData,
  };
};
