import React from "react";
import type { ProjectProps } from "../types";

const Project = ({ title, image, description, techStack, links }: ProjectProps) => {
  return (
    <article className="project">
      <h3>{title}</h3>
        <figure className="project__image-wrapper">
          <img src={`/${image}`} alt={`Screenshot of ${title}`} className="project__image" />
        </figure>
        <p>{description}</p>
        <h4 className="project__subheading">Languages/Tools</h4>
        <ul className="techstack">
          {techStack.map((tech, i) => <li key={i} className="techstack__tech">{tech}</li>)}
        </ul>
        <div className="project__links">
          {links.live && <a href={links.live} className="link-button">See Live</a>}
          <a href={links.code} className="link">Source Code</a>
        </div>
    </article>
  )
}

export default Project

