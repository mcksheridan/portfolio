import React from "react";

const SEO_DATA = {
  title: 'Sheridan McKisick\'s Portfolio',
  author: 'Sheridan McKisick',
  description: 'The portfolio of Sheridan McKisick, a front end developer with a focus on JavaScript, TypeScript, and React',
}

const Seo = () => {
  return (
    <>
      <title>{SEO_DATA.title}</title>
      <meta name="description" content={SEO_DATA.description} />
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:description" content={SEO_DATA.description} />
      <meta property="og:type" content="website" />
    </>
  )
}

export default Seo;
