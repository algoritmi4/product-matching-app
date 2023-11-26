import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <a className="header__logo-link" rel="noreferrer" target="_blank" href="https://prosept.ru/">
        <img className="logo" />
      </a>
      <nav className="header__nav">
        <Link to="/statistics" className="header__button">
          Статистика
        </Link>
      </nav>
    </header>
  );
}

export default Header;
