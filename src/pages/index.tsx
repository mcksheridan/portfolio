import * as React from "react"
import Project from "../components/project"
import Section from "../components/section"
import Navigation from "../components/navigation"
import SocialMedia from "../components/socialMedia"
import Seo from "../components/seo"
import PROJECT_DATA from "../data/project"
import SOCIAL_MEDIA_DATA from "../data/socialMedia"
import SKILLS_DATA from "../data/skills"
import "../styles/index.css"

import type { SectionProps } from "../types"
import Skills from "../components/skills"
import { Link } from "../components/Link"

const SECTION_DATA: SectionProps[] = [
  {
    title: 'About Me',
    id: 'about',
    children: <>
      <p>
        I'm a full stack developer with a focus primarily on
        front end technologies. I frequently work with
        JavaScript, TypeScript, and React.js. I'm also a
        Certified Contentful Developer and have professional
        experience with headless CMS, Node.js, SQL, and Next.js.
      </p>
      <p>
        Feel free to <a href="#contact" className="link">reach
        out</a> and connect. I'm always open to opportunities to
        learn, grow, and collaborate with others.
      </p>
      <h3>My Skills</h3>
      <Skills skills={SKILLS_DATA} />
    </>
  },
  {
    title: 'Projects',
    id: 'projects',
    children: <>
      <p>These are some of my personal projects. For more information on my professional
        projects, please visit my <a href="https://linkedin.com/in/sheridanm"
        className="link">LinkedIn</a>.
      </p>
      <p>
        <strong>Note: </strong>
        Some projects might be "sleeping" and require a longer time to load initially.
      </p>
      {PROJECT_DATA.map((project) => <Project {...project} key={project.title} />)}
    </>
  },
  {
    title: 'Contact',
    id: 'contact',
    children: <>
      <p>Let's start a conversation.</p>
      <SocialMedia socialMedia={SOCIAL_MEDIA_DATA} />
    </>
  },
  {
    title: 'Blog',
    id: 'blog',
    externalUrl: 'https://www.blog.mcksheridan.com',
    children: '',
  }
]

const getYear = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  return year.toString();
}

export const Head = () => <Seo />

export default function Home() {
  return (
    <div className='home-layout width-container'>
      <header className='header'>
        <h1 className='header_text'>
        Sheridan Mehta-McKisick
        </h1>
      </header>

      <main className='main'>
        <div className='main_outer-border'>
          <div className='main_inner-container'>
            <p>
              Hello, my name is Sheridan,
              and I'm a front-end software engineer.
              I create applications using React.js and TypeScript,
              and I'm about passionate about accessibility.
              I'm also a graduate student pursuing a Master's in Computer Science
              with a specialization in Human-Computer Interaction
              and Artificial Intelligence.
            </p>
            
            <ul>
              <li>
                <Link url="https://blog.mcksheridan.com" title="Blog" />
              </li>
              <li>
                <Link url="https://github.com/mcksheridan" title="GitHub" isExternal />
              </li>
              <li>
                <Link url="https://linkedin.com/sheridanm" title="LinkedIn" isExternal />
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="footer width-container">
        <p>
          Icons from <a href="https://icons8.com" target="_blank" className="link">Icons8</a>
        </p>
        <p>
          © {getYear()} Sheridan Mehta-McKisick
        </p>
      </footer>
    </div>
  )
}
