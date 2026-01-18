import React from "react";
import { LinkProps } from "../types";

export const Link = (props: LinkProps) => {
    const { isExternal, opensInNewWindow, title, url } = props

    return (
        <a
            href={url}
            className={isExternal ? 'link external-link' : 'link'}
            target={opensInNewWindow || isExternal ? '_blank' : '_self'}
        >
            {title}
            {isExternal ? (
                <img
                    src={'svg/externalLink.svg'}
                    height="50"
                    title='Opens in a new window'
                />
            ) : null}
        </a>
    )
}