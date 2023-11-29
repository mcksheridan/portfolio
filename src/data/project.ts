import type { ProjectProps } from "../types"

const PROJECT_DATA: ProjectProps[] = [
  {
    title: 'Stretch Timer',
    description: `Users can create timed exercise routines and use the
    built-in timer to run through their own routines, as
    well as routines from other users.`,
    techStack: ['JavaScript', 'Express.js', 'Pug', 'SCSS', 'PostgreSQL'],
    links: {
      live: 'https://stretch-timer.onrender.com',
      code: 'https://github.com/mcksheridan/stretches',
    },
    image: 'project__stretches.jpg'
  },
  {
    title: 'Idioms',
    description: `This web application creates a web scraping REST API
    on the server side and consumes it on the client side to display
    information about the weather and Japanese idioms.`,
    techStack: ['HTML', 'CSS/Sass', 'JavaScript', 'Express.js'],
    links: {
      live: 'https://idioms.onrender.com',
      code: 'https://github.com/mcksheridan/idioms',
    },
    image: 'project__idioms.jpg'
  },
  {
    title: 'Page Counter',
    description: `This is a bilingual page counter that operates in both
    English and Japanese. Users input text and receive an estimate of how
    many pages the text would occupy, based on either a word count (English)
    or a character count (Japanese).`,
    techStack: ['HTML', 'CSS/Sass', 'JavaScript'],
    links: {
      live: 'https://mcksheridan.github.io/word_counter/',
      code: 'https://github.com/mcksheridan/word_counter',
    },
    image: 'project__page-counter.jpg'
  },
  {
    title: 'Duplicate Word Checker',
    description: `Command line tool to examine an Excel document for duplicate
    entries in a column`,
    techStack: ['Python', 'openpyxl', 'CLI'],
    links: {
      live: 'https://replit.com/@mcksheridan/avoidduplicates',
      code: 'https://github.com/mcksheridan/avoid_duplicates',
    },
    image: 'project__avoid-duplicates.jpg'
  }
]

export default PROJECT_DATA
