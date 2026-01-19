const fs = require('node:fs')
const path = require('path')

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const monthString = month < 9 ? '0' + month : month
const date = `${year}-${monthString}-${now.getDate()}`
const title = process.argv.slice(2)

const content = (
  '---\n' +
  `title: ${title.join(' ')}\n` + 
  'layout: layouts/post.njk\n' +
  'tags: []\n' +
  `date: ${date}\n` +
  'draft: true\n' +
  'description: ""\n' +
  '---\n\n'
)

const fileName = `src/posts/${year}/${monthString}/${title.join('-').toLowerCase()}.md`

fs.mkdirSync(path.dirname(fileName), { recursive: true })

fs.writeFile(fileName, content, err => {
  if (err) {
    console.error('An error has occured: ', { err })
  } else {
    console.log('File successfully created! ', fileName)
  }
});