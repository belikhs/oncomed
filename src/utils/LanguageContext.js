import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko-KR'); // 기본 언어를 한국어로 설정

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ko-KR' ? 'en-US' : 'ko-KR'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
