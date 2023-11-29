import * as React from "react";

import type { NavigationProps } from "../types";

const Navigation = ({ sections }: NavigationProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleNav = () => setIsVisible(!isVisible);
  const linkClasses = 'header__link nav-links__link'

  return (
    <div className="header width-container">
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
                  href={section.externalUrl ? section.externalUrl : `#${section.id}`}
                  target={section.externalUrl ? '_blank' : ''}
                  className={section.externalUrl ? linkClasses + ' external-link' : linkClasses}
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {section.title}
                </a>
              </li>
              )
            })}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
