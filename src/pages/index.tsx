import * as React from "react"
import Project from "../components/project"
import Section from "../components/section"
import Navigation from "../components/navigation"
import SocialMedia from "../components/socialMedia"
import Seo from "../components/seo"
import PROJECT_DATA from "../data/project"
import SOCIAL_MEDIA_DATA from "../data/socialMedia"
import "../styles/index.css"

import type { SectionProps } from "../types"

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
        experience with headless CMS, Node.js, SQL, Gatsby,
        and Next.js.
      </p>
      <p>
        Feel free to <a href="#contact" className="link">reach
        out</a> and connect. I'm always open to opportunities to
        learn, grow, and collaborate with others.
      </p>
    </>
  },
  {
    title: 'Projects',
    id: 'projects',
    children: PROJECT_DATA.map((project) => <Project {...project} key={project.title} />)
  },
  {
    title: 'Contact',
    id: 'contact',
    children: <>
      <p>Let's start a conversation.</p>
      <SocialMedia socialMedia={SOCIAL_MEDIA_DATA} />
    </>
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
    <>
      <header className="header-background">
        <Navigation sections={SECTION_DATA} />
      </header>
      <main className="content">
        <section className="intro">
          <h1 className="intro__heading">Hello, I'm Sheridan</h1>
          <p className="intro__descr">I'm a front end developer
            <a href={`#${SECTION_DATA[0].id}`} className="link-button intro__cta">Learn More</a>
          </p>
        </section>
        {SECTION_DATA.map((section) => <Section key={section.id} {...section} />)}
      </main>
      <footer className="footer width-container">
        <p>
          Icons from <a href="https://icon8.com" target="_blank" className="link">Icon8</a>
        </p>
        <p>
          © {getYear()} Sheridan McKisick
        </p>
      </footer>
    </>
  )
}
