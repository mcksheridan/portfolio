const button = document.querySelector('#theme-toggle')

const updateButton = (theme) => {
  const isDarkMode = theme === 'dark'

  let label = 'Switch to Dark Mode'
  let url = 'dark_mode'

  if (isDarkMode) {
    label = "Switch to Light Mode"
    url = 'light_mode'
  }

  button.setAttribute('class', 'unbutton')
  button.innerHTML = `<img src='/media/icons/${url}.png' title='${label}' class='icon' />`
}

updateButton(document.documentElement.dataset.theme)

button?.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  document.documentElement.dataset.theme = newTheme

  try {
    localStorage.setItem('theme', newTheme)
    updateButton(newTheme)
  } catch (e) {
    console.error(e)
  }
});
