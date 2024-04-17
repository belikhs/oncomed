import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from 'utils/LanguageContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const setLanguage = (lang) => {
    if (language !== lang) {
      toggleLanguage();
    }
  };

  // '/movie/:movieId' 패턴에 맞는지 확인하는 정규식
  const isDetailPage = /\/movie\/\d+/.test(pathname);

  return (
    <header className="headerWrap">
      {isDetailPage ? (
        <button onClick={() => navigate(-1)} className="back-button">
          ←
        </button>
      ): <div></div>}
      <div className="language-switcher">
        <span onClick={() => setLanguage('ko-KR')} className={language === 'ko-KR' ? 'language-active' : ''}>
          한국어
        </span>
        |
        <span onClick={() => setLanguage('en-US')} className={language === 'en-US' ? 'language-active' : ''}>
          English
        </span>
      </div>
    </header>
  );
};

export default Header;
