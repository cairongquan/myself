import { Sun, Moon } from 'lucide-react';
import { useState } from 'react'

export default function ChangeThemeBtn() {
  const [themeMode, setThemeMode] = useState('dark')
  function changeThemeHandle() {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('light-theme')
    } else {
      document.documentElement.classList.remove('light-theme')
    }
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }


  return (<div onClick={changeThemeHandle} className="change-theme-btn">
    <div className={['change-theme-btn__circle', themeMode === 'light' && 'change-theme-btn__circle--light' || ''].join(' ')}>
      <Sun size={18} className={['change-theme-btn__icon', themeMode === 'dark' && 'change-theme-btn__icon--light' || ''].join(' ')}></Sun>
      <Moon size={18} className={['change-theme-btn__icon', themeMode === 'light' && 'change-theme-btn__icon--dark' || ''].join(' ')}></Moon>
    </div>
  </div>)
}
