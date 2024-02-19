import * as React from "react";

import type { NavigationProps } from "../types";

const Navigation = ({ sections }: NavigationProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const linkClasses = 'header__link nav-links__link'

  const closeNavigation = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 250)
  }

  const getNavigationClassNames = () => {
    if (isClosing) {
      return "nav--closing";
    }

    if (isVisible) {
      return "nav";
    }

    return "nav--closed";
  }

  return (
    <div className="header width-container">
      <a href="https://www.mcksheridan.com" className="header__link">
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
        onClick={() => isVisible ? closeNavigation() : setIsVisible(true)}
      >
        <img
          src="/svg/menu.svg"
          alt=""
          height="35px"
          aria-label={isVisible ? 'Close Menu' : 'Open Menu'}
        />
      </button>
      <nav className={getNavigationClassNames()}>
        <ul className="nav-links">
          {sections.map((section, i) => {
            return (
              <li key={i} className="nav-links__wrapper">
                <a
                  href={section.externalUrl ? section.externalUrl : `#${section.id}`}
                  target={section.externalUrl ? '_blank' : ''}
                  className={section.externalUrl ? linkClasses + ' external-link' : linkClasses}
                  onClick={() => closeNavigation()}
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
