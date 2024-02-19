import * as React from "react";

import type { IntroProps } from "../types";

const Intro = ({ link }: IntroProps) => {
    const [animatedHeadingText, setAnimatedHeadingText] = React.useState("");
    const [headingAnimationComplete, setHeadingAnimationComplete] = React.useState(false);

    const heading = "Hello, I'm Sheridan";
    const headingCharacters = heading.split("");

    let i = 0;

    const addLetter = () => {
        setTimeout(() => {
            setAnimatedHeadingText(headingCharacters.slice(0, i + 1).join(""));
            i += 1;
            if (i < headingCharacters.length) {
                if (headingCharacters[i].match(/\s/)) {
                    i += 1;
                }
                addLetter();
            } else {
                setHeadingAnimationComplete(true);
            }
        }, 100)
    }

    React.useEffect(() => {
        addLetter()
    }, [])

    return (
        <section className="intro">
            <h1 className="intro__heading">{animatedHeadingText}</h1>
            {headingAnimationComplete && (
                <p className="intro__descr">I'm a <span className="highlighted-text">web developer</span>.
                    <a href={`#${link}`} className="intro__cta">
                        <img src="/down-arrow-icon.png" alt="Down arrow" height="50" aria-label="Learn More" />
                    </a>
                </p>
            )}
        </section>
    )
}

export default Intro;