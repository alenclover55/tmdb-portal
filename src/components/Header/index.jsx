import { NavLink } from 'react-router-dom'
import cl from './Header.module.scss'

function Header() {
  return (
    <div className={cl.header}>
        <div className={'container'+' '+ cl.container}>
            <nav className={cl.nav}>
                <ul>
                    <li><NavLink to={'/'}><img width={154} height={20} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" /></NavLink></li>
                    <li><NavLink to={'/films'}>Фильмы</NavLink></li>
                    <li><NavLink to={'/actors'}>Люди</NavLink></li>
                </ul>
            </nav>
            
        </div>
    </div>
  )
}

export default Header