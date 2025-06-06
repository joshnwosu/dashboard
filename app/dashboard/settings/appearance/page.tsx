'use client';

import { useState, JSX } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Monitor, Moon, Sun, Palette, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

// Type definitions
type Language =
  | 'english'
  | 'spanish'
  | 'french'
  | 'german'
  | 'chinese'
  | 'japanese'
  | 'korean'
  | 'portuguese';
type Theme = 'light' | 'dark' | 'system';

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

interface ThemeOptionProps {
  value: Theme;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  isActive: boolean;
  onClick: (theme: Theme) => void;
}

export default function AppearanceSettings(): JSX.Element {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState<Language>('english');

  const languages: LanguageOption[] = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'spanish', label: 'Español', flag: '🇪🇸' },
    { value: 'french', label: 'Français', flag: '🇫🇷' },
    { value: 'german', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'chinese', label: '中文', flag: '🇨🇳' },
    { value: 'japanese', label: '日本語', flag: '🇯🇵' },
    { value: 'korean', label: '한국어', flag: '🇰🇷' },
    { value: 'portuguese', label: 'Português', flag: '🇵🇹' },
  ];

  const handleLanguageChange = (value: string): void => {
    setLanguage(value as Language);
  };

  const handleThemeChange = (newTheme: Theme): void => {
    setTheme(newTheme);
  };

  const ThemeOption: React.FC<ThemeOptionProps> = ({
    value,
    icon: Icon,
    label,
    description,
    isActive,
    onClick,
  }) => (
    <button
      onClick={() => onClick(value)}
      className={`relative flex items-center gap-3 p-4 rounded-lg transition-all duration-200 w-full text-left ${
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-sidebar'
          : 'border hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      type='button'
      aria-pressed={isActive}
    >
      <div
        className={`p-2 rounded-md ${
          value === 'system' ? '' : value === 'light' ? 'bg-white' : 'bg-black'
        }`}
        style={
          value === 'system'
            ? { background: 'linear-gradient(135deg, white 50%, black 50%)' }
            : {}
        }
      >
        <Icon
          className={`w-4 h-4 ${
            value === 'system'
              ? 'text-gray-400'
              : value === 'light'
              ? 'text-gray-800'
              : 'text-white'
          }`}
        />
      </div>
      <div className='flex-1'>
        <div className='font-medium text-gray-900 dark:text-gray-100'>
          {label}
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </div>
      </div>
      {isActive && (
        <div className='absolute top-2 right-2'>
          <Check className='w-5 h-5 text-blue-500' />
        </div>
      )}
    </button>
  );

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Appearance Settings
        </h3>
        <p className='text-gray-600 dark:text-gray-400'>
          Customize your experience with language and theme preferences.
        </p>
      </div>

      {/* Language Section */}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            Language
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Choose your preferred language for the interface.
          </p>
        </div>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className='w-full h-12'>
            <SelectValue placeholder='Select Language' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Available Languages</SelectLabel>
              {languages.map((lang: LanguageOption) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className='flex items-center gap-2'>
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Theme Section */}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            Theme
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Choose how the interface should appear.
          </p>
        </div>
        <div className='grid gap-3'>
          <ThemeOption
            value='light'
            icon={Sun}
            label='Light'
            description='Clean and bright interface'
            isActive={theme === 'light'}
            onClick={handleThemeChange}
          />
          <ThemeOption
            value='dark'
            icon={Moon}
            label='Dark'
            description='Easy on the eyes in low light'
            isActive={theme === 'dark'}
            onClick={handleThemeChange}
          />
          <ThemeOption
            value='system'
            icon={Monitor}
            label='System'
            description='Adapts to your system preference'
            isActive={theme === 'system'}
            onClick={handleThemeChange}
          />
        </div>
      </div>
    </div>
  );
}
