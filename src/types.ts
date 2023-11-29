import type { ReactElement, ReactNode } from "react"

export type ProjectProps = {
  title: string,
  image: string,
  description: string,
  techStack: string[],
  links: {
    live?: string,
    code: string,
  },
}

export type SectionProps = {
  title: string,
  id: string,
  externalUrl?: string,
  children: ReactNode,
}

export type NavigationProps = {
  sections: SectionProps[],
}

export type SocialMediaProps = {
  title: string,
  url: string,
  icon?: string,
}

export type SocialMediaCollectionProps = {
  socialMedia: SocialMediaProps []
}

export type SkillProps = {
  category: 'Tech' | 'Project Management' | 'Communication',
  name: string,
}

export type SkillsProps = {
  skills: SkillProps[],
}
