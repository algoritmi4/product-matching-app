import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src="https://prosept.ru/images/prosept-logo.svg" className="logo" alt="Логотип" />
      </Link>
      <nav className="header__nav">
        <Link to="/statistics" className="header__button">
          Статистика
        </Link>
      </nav>
    </header>
  );
}

export default Header;
