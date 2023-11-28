import * as React from "react";

import type { NavigationProps } from "../types";

const Navigation = ({ sections }: NavigationProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleNav = () => setIsVisible(!isVisible);

  return (
    <>
      <a href="https://mcksheridan.com" className="header__link">
        <img
          src="/monogram.png"
          className="header__icon"
          alt=""
          height="50px"
        />
        Sheridan McKisick
      </a>
      <button
        type="button"
        className="header__toggle"
        onClick={() => toggleNav()}
      >
        <img
          src={isVisible ? '/svg/close.svg' : '/svg/menu.svg'}
          alt=""
          height="50px"
          aria-label={isVisible ? 'Close Menu' : 'Open Menu'}
        />
      </button>
      <nav className={isVisible ? 'nav' : 'nav nav--closed'}>
        <ul className="nav-links">
          {sections.map((section, i) => {
            return (
              <li key={i} className="nav-links__wrapper">
                <a
                  href={`#${section.id}`}
                  className="header__link nav-links__link"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {section.title}
                </a>
              </li>
              )
            })}
        </ul>
      </nav>
    </>
  )
}

export default Navigation
