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
