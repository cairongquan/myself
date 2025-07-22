import { Plus } from 'lucide-react'
import ChangeThemeBtn from '../components/change-theme';

export default function Editor() {
  return <div className='editor-container'>
    <header className="editor-container__header">
      <h1>Editor</h1>
      <div className="header__button-group">
        <ChangeThemeBtn></ChangeThemeBtn>
        <button className="header__button">
          <Plus size={14} /><span>新增</span>
        </button>
      </div>
    </header>
  </div>;
}
