import React from "react";
import type { SectionProps } from "../types";

const Section = ({ title, id, children }: SectionProps) => {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Section
