import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Sheridan McKisick | Full Stack Dev', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'Sheridan McKisick is a full stack developer with a focus on JavaScript', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hello, my name is',
  name: 'Sheridan',
  subtitle: "I'm a Full Stack Developer",
  cta: 'Learn more',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'I started studying web development in elementary school, after I decided I wanted to make a website. I started by learning HTML and CSS and kept this up as a hobby for years. In college, I took several computer science classes and began learning JavaScript. More recently, I transitioned into working with both the front end and the back end to become a full stack developer.',
  paragraphTwo:
    'In January 2021, I began working as a Full Stack Apprentice. Becoming a member of a team after years of being a solo hobbyist has been incredibly energizing. Some of the valuable lessons I have learned so far include using git and source control, relying less on GUI and more on the command line, refactoring existing code, handling technical debt, and understanding programming paradigms like functional programming and object oriented programming.',
  paragraphThree:
    'The apprenticeship, as well as my work, relies primarily on JavaScript. My work features HTML, CSS (with BEM and Sass), and JavaScript (including Nodejs and Express).',
  // resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'project__stretches.jpg',
    title: 'Stretch Timer',
    info:
      'Users can create timed exercise routines and use the built-in timer to run through their own routines, as well as routines from other users.',
    info2: 'JavaScript, Express.js, Pug, SCSS, Heroku',
    url: 'http://stretches.mcksheridan.com/',
    repo: 'https://github.com/mcksheridan/stretches', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project__idioms.jpg',
    title: 'Idioms',
    info:
      'This web application creates a web scraping REST API on the server side and consumes it on the client side to display information about the weather and Japanese idioms.',
    info2: 'HTML, CSS/Sass, JavaScript, Express.js, Heroku',
    url: 'https://idioms.mcksheridan.com/',
    repo: 'https://github.com/mcksheridan/idioms', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project__page-counter.jpg',
    title: 'Page Counter',
    info:
      'This is a bilingual page counter that operates in both English and Japanese. Users input text and receive an estimate of how many pages the text would occupy, based on either a word count (English) or a character count (Japanese).',
    info2: 'HTML, CSS/Sass, JavaScript, FTP',
    url: 'https://mcksheridan.com/projects/word_counter/',
    repo: 'https://github.com/mcksheridan/word_counter', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project__avoid-duplicates.jpg',
    title: 'Duplicate Word Checker',
    info: 'Command line tool to examine an Excel document for duplicate entries in a column',
    info2: 'Python, openpyxl, CLI',
    url: 'https://replit.com/@mcksheridan/avoidduplicates',
    repo: 'https://github.com/mcksheridan/avoid_duplicates', // if no repo, the button will not show up
  },
  // {
  //   id: nanoid(),
  //   img: 'project__tiktokvideoinfo.jpg',
  //   title: 'TikTok Video Information API',
  //   info:
  //     'This API builds off of the existing official TikTok API to serve users information about the date a video was added and its ID number',
  //   info2: 'NodeJs, Express, JavaScript',
  //   url: 'https://tiktok-video-info.herokuapp.com/',
  //   repo: 'https://github.com/mcksheridan/tiktok-video-info', // if no repo, the button will not show up
  // },
];

// CONTACT DATA
export const contactData = {
  cta: "Feel free to reach out with any inquiries. Let's start a conversation.",
  btn: 'Email Me',
  email: 'mcksheridan@gmail.com',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'codepen',
      url: 'https://codepen.io/mcksheridan',
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/sheridanm/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/mcksheridan',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
