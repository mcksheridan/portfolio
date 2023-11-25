import React from "react";
import type { SectionType } from "../types";

const Section = ({ headingLevel, title, id, children }: SectionType) => {
  return (
    <section id={id}>
      {headingLevel === 'h1' ? <h1>{title}</h1> : <h2>{title}</h2>}
      {children}
    </section>
  )
}

export default Section
