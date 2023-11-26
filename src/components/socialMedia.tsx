import React from "react";
import type { SocialMediaCollectionProps } from "../types";

const SocialMedia = ({ socialMedia }: SocialMediaCollectionProps) => {
  return (
    <div>
      <ul>
        {socialMedia.map((media) => {
          return (
            <li key={media.title}>
              <a href={media.url} aria-label={media.icon ? media.title : ''}>{media.icon ?? media.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SocialMedia
