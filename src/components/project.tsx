import React from "react";
import type { ProjectProps } from "../types";

const Project = ({ title, image, description, techStack, links }: ProjectProps) => {
  return (
    <article>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <h4>Languages/Tools</h4>
        <ul>
          {techStack.map((tech, i) => <li key={i}>{tech}</li>)}
        </ul>
        <div>
          {links.live && <a href={links.live}>See Live</a>}
          <a href={links.code}>Source Code</a>
        </div>
      </div>
      <div>
        <figure><img src={`/${image}`} alt={`Screenshot of ${title}`} /></figure>
      </div>
    </article>
  )
}

export default Project

