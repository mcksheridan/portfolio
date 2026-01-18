import React from "react";

const SEO_DATA = {
  title: 'Sheridan Mehta-McKisick',
  author: 'Sheridan Mehta-McKisick',
  description: 'Sheridan Mehta-McKisick is a front end software engineer with a focus on React, TypeScript, and accessibility.',
}

const Seo = () => {
  return (
    <>
    <html lang="en" />
      <title>{SEO_DATA.title}</title>
      <meta name="description" content={SEO_DATA.description} />
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:description" content={SEO_DATA.description} />
      <meta property="og:type" content="website" />
    </>
  )
}

export default Seo;
