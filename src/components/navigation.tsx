import React from "react";
import { NavigationType } from "../types";

const Navigation = ({ sections }: NavigationType) => {
  return (
    <nav>
      <ul>
        {sections.map((section, i) => {
          return (
            <li key={i}><a href={`#${section.id}`}>{section.title}</a></li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
