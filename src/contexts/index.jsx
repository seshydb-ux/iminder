import React, { createContext, useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';

export const AuthContext = createContext();
export const SettingsContext = createContext();
export const ChildContext = createContext();
export const NotificationContext = createContext();

export const AppProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(getStorage('authUser'));
  const [settings, setSettings] = useState(getStorage('notificationSettings'));
  const [childList, setChildList] = useState(getStorage('children'));
  const [notifications, setNotifications] = useState(getStorage('inAppNotifications'));

  useEffect(() => {
    setStorage('authUser', authUser);
  }, [authUser]);

  useEffect(() => {
    setStorage('notificationSettings', settings);
  }, [settings]);

  useEffect(() => {
    setStorage('children', childList);
  }, [childList]);

  useEffect(() => {
    setStorage('inAppNotifications', notifications);
  }, [notifications]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <ChildContext.Provider value={{ childList, setChildList }}>
          <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
          </NotificationContext.Provider>
        </ChildContext.Provider>
      </SettingsContext.Provider>
    </AuthContext.Provider>
  );
};
