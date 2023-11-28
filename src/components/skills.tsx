import React from "react";
import { SkillsProps } from "../types";

const Skills = ({ skills }: SkillsProps) => {
  const categories: string[] = [];
  skills.forEach((skill) => {
    if (!categories.includes(skill.category)) {
      categories.push(skill.category)
    }
  })

  const getSkills = (category: string) => skills.filter((skill) => skill.category === category)

  return(
    categories.length > 0 && categories.map((category) => {
      return (
        <>
          <h4>{category}</h4>
          <ul className="techstack">
            {getSkills(category).map((skill, i) => <li key={i} className="techstack__tech">{skill.name}</li>)}
          </ul>
        </>
      )
    })
  )
}

export default Skills;
