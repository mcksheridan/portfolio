import React from "react";
import type { SocialMediaCollectionProps } from "../types";

const SocialMedia = ({ socialMedia }: SocialMediaCollectionProps) => {
  return (
    <div className="social-media">
      <ul className="social-media__container">
        {socialMedia.map((media) => {
          return (
            <li key={media.title}>
              <a href={media.url} aria-label={media.icon ? media.title : ''}>
                {media.icon ? <img src={`/${media.icon}`} height="50" alt="" /> : media.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SocialMedia
