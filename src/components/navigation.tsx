import React from "react";
import { NavigationProps } from "../types";

const Navigation = ({ sections }: NavigationProps) => {
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
