const fs = require('node:fs')

const now = new Date()
const month = now.getMonth() + 1
const date = `${now.getFullYear()}-${month < 9 ? '0' + month : month}-${now.getDate()}`
const title = process.argv.slice(2)[0]

const content = (
  '---\n' +
  `title: ${title}\n` + 
  'layout: layouts/post.njk\n' +
  'tags: []\n' +
  `date: ${date}\n` +
  'draft: true\n' +
  'description: ""\n' +
  '---\n\n'
)

fs.writeFile(`src/posts/${date}--${title.toLowerCase()}.md`, content, err => {
  if (err) {
    console.error('An error has occured: ', { err })
  } else {
    console.log('File successfully created!')
  }
});