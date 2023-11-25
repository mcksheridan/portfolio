import type { ReactElement, ReactNode } from "react"

export type ProjectType = {
  title: string,
  image: string,
  description: string,
  techStack: string[],
  links: {
    live?: string,
    code: string,
  },
}

export type SectionType = {
  headingLevel?: 'h1' | 'h2',
  title: string,
  id: string,
  children: ReactNode,
}
