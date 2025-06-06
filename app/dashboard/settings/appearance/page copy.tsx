'use client';

import { useState, useEffect, JSX } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Monitor, Moon, Sun, Palette, Check, LucideIcon } from 'lucide-react';

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
type AccentColor = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'pink';

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

interface AccentColorOption {
  name: string;
  color: string;
  value: AccentColor;
}

interface ColorValues {
  primary: string;
  ring: string;
}

interface ThemeOptionProps {
  value: Theme;
  icon: LucideIcon;
  label: string;
  description: string;
  isActive: boolean;
  onClick: (theme: Theme) => void;
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}

export default function AppearanceSettings(): JSX.Element {
  const [language, setLanguage] = useState<Language>('english');
  const [theme, setTheme] = useState<Theme>('system');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');
  const [showAnimations, setShowAnimations] = useState<boolean>(true);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Apply accent color
  useEffect(() => {
    const root = document.documentElement;
    const colors: Record<AccentColor, ColorValues> = {
      blue: { primary: '59 130 246', ring: '59 130 246' },
      green: { primary: '34 197 94', ring: '34 197 94' },
      purple: { primary: '147 51 234', ring: '147 51 234' },
      red: { primary: '239 68 68', ring: '239 68 68' },
      orange: { primary: '249 115 22', ring: '249 115 22' },
      pink: { primary: '236 72 153', ring: '236 72 153' },
    };

    const colorValues = colors[accentColor];
    root.style.setProperty('--accent-primary', colorValues.primary);
    root.style.setProperty('--accent-ring', colorValues.ring);
  }, [accentColor]);

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

  const accentColors: AccentColorOption[] = [
    { name: 'blue', color: 'bg-blue-500', value: 'blue' },
    { name: 'green', color: 'bg-green-500', value: 'green' },
    { name: 'purple', color: 'bg-purple-500', value: 'purple' },
    { name: 'red', color: 'bg-red-500', value: 'red' },
    { name: 'orange', color: 'bg-orange-500', value: 'orange' },
    { name: 'pink', color: 'bg-pink-500', value: 'pink' },
  ];

  const handleLanguageChange = (value: string): void => {
    setLanguage(value as Language);
  };

  const handleThemeChange = (newTheme: Theme): void => {
    setTheme(newTheme);
  };

  const handleAccentColorChange = (color: AccentColor): void => {
    setAccentColor(color);
  };

  const handleAnimationsToggle = (checked: boolean): void => {
    setShowAnimations(checked);
  };

  const handleMotionToggle = (checked: boolean): void => {
    setReduceMotion(checked);
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
      className={`relative flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 w-full text-left ${
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      type='button'
      aria-pressed={isActive}
    >
      <div
        className={`p-2 rounded-md ${
          value === 'system'
            ? 'bg-gradient-to-br from-gray-100 to-gray-800'
            : value === 'light'
            ? 'bg-gray-100'
            : 'bg-gray-800'
        }`}
      >
        <Icon
          className={`w-4 h-4 ${
            value === 'system'
              ? 'text-gray-600'
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

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    label,
    description,
  }) => (
    <label className='flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
      <div>
        <div className='font-medium text-gray-900 dark:text-gray-100'>
          {label}
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </div>
      </div>
      <div className='relative'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.checked)
          }
          className='sr-only'
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors ${
            checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </div>
    </label>
  );

  const getCurrentLanguageLabel = (): string => {
    const currentLang = languages.find((l) => l.value === language);
    return currentLang?.label || 'English';
  };

  const getCapitalizedTheme = (): string => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  const getCapitalizedAccent = (): string => {
    return accentColor.charAt(0).toUpperCase() + accentColor.slice(1);
  };

  return (
    <div className='max-w-2xl p-6 space-y-8 bg-white dark:bg-gray-900 min-h-screen'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
          Appearance Settings
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Customize your experience with language, theme, and color preferences.
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

      {/* Accent Color Section */}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            Accent Color
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Choose your preferred accent color for highlights and interactions.
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          {accentColors.map((color: AccentColorOption) => (
            <button
              key={color.value}
              onClick={() => handleAccentColorChange(color.value)}
              className={`relative w-12 h-12 rounded-lg ${
                color.color
              } transition-all duration-200 ${
                accentColor === color.value
                  ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110'
                  : 'hover:scale-105'
              }`}
              title={color.name}
              type='button'
              aria-label={`Select ${color.name} accent color`}
              aria-pressed={accentColor === color.value}
            >
              {accentColor === color.value && (
                <Check className='w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            Display Options
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Control visual effects and animations.
          </p>
        </div>
        <div className='space-y-4'>
          <ToggleSwitch
            checked={showAnimations}
            onChange={handleAnimationsToggle}
            label='Show animations'
            description='Enable smooth transitions and animations'
          />

          <ToggleSwitch
            checked={reduceMotion}
            onChange={handleMotionToggle}
            label='Reduce motion'
            description='Minimize animations for better performance'
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className='p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
        <h4 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
          Preview
        </h4>
        <div className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
          Current settings: {getCurrentLanguageLabel()} •{' '}
          {getCapitalizedTheme()} theme • {getCapitalizedAccent()} accent
        </div>
        <div className='flex gap-2'>
          <button
            className='px-4 py-2 rounded-md text-white transition-colors'
            style={{ backgroundColor: `rgb(var(--accent-primary))` }}
            type='button'
          >
            Primary Button
          </button>
          <button
            className='px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            type='button'
          >
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
}
