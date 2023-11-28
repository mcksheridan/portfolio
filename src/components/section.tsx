import React from "react";
import type { SectionProps } from "../types";

const Section = ({ title, id, children }: SectionProps) => {
  return (
    <section id={id} className="section">
      <h2 className="section__heading">{title}</h2>
      {children}
    </section>
  )
}

export default Section
