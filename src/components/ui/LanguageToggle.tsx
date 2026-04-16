'use client';

import { useLanguage } from '@/lib/language';
import { Language } from '@/lib/language';

interface LanguageToggleProps {
  variant?: 'default' | 'compact' | 'switch';
  showLabel?: boolean;
  className?: string;
}

export function LanguageToggle({ 
  variant = 'default', 
  showLabel = true,
  className = '' 
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`
          inline-flex items-center justify-center rounded-lg
          px-2 py-1.5 text-sm font-medium
          border border-input bg-background
          hover:bg-accent hover:text-accent-foreground
          transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${className}
        `}
        aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় সুইচ করুন'}
      >
        <span className={`transition-opacity duration-200 ${language === 'bn' ? 'opacity-100' : 'opacity-50'}`}>
          BN
        </span>
        <span className="mx-1 text-xs text-muted-foreground">|</span>
        <span className={`transition-opacity duration-200 ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
          EN
        </span>
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleLanguage}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          border border-input bg-background
          transition-colors duration-300 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${className}
        `}
        role="switch"
        aria-checked={language === 'en'}
        aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় সুইচ করুন'}
      >
        <span
          className={`
            inline-flex h-5 w-5 items-center justify-center rounded-full
            bg-primary text-primary-foreground text-xs font-bold
            shadow-sm transition-transform duration-300 ease-in-out
            ${language === 'en' ? 'translate-x-5' : 'translate-x-0.5'}
          `}
        >
          {language === 'bn' ? 'BN' : 'EN'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`
        inline-flex items-center gap-2 rounded-lg
        border border-input bg-background px-3 py-1.5
        text-sm font-medium hover:bg-accent hover:text-accent-foreground
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${className}
      `}
      aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় সুইচ করুন'}
    >
      <svg 
        className="h-4 w-4 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
        />
      </svg>
      {showLabel && (
        <span className="font-medium">
          {language === 'bn' ? 'EN' : 'বাংলা'}
        </span>
      )}
    </button>
  );
}

interface MobileLanguageToggleProps {
  className?: string;
}

export function MobileLanguageToggle({ className = '' }: MobileLanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex w-full items-center gap-3 rounded-lg
        px-3 py-2.5 text-sm font-medium
        text-muted-foreground hover:bg-accent hover:text-accent-foreground
        transition-colors duration-150
        ${className}
      `}
    >
      <svg 
        className="h-5 w-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
        />
      </svg>
      <span className="flex-1 text-left">
        {language === 'bn' ? 'English' : 'বাংলা'}
      </span>
      <span className={`
        inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full
        text-xs font-semibold
        ${language === 'bn' 
          ? 'bg-primary/10 text-primary' 
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}
      `}>
        {language === 'bn' ? 'EN' : 'বাংলা'}
      </span>
    </button>
  );
}
