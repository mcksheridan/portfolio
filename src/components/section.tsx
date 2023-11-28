import React from "react";
import type { SectionProps } from "../types";

const Section = ({ title, id, children }: SectionProps) => {
  return (
    <section id={id} className="section-background">
      <div className="section width-container">
        <h2 className="section__heading">{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default Section
