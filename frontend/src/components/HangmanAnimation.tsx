import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HangmanAnimation = ({ wrongGuesses }: { wrongGuesses: number }) => {
    const refs = useRef<(SVGGElement | null)[]>([]);

    useEffect(() => {
        // Set initial opacity to 20% for all parts except the base
        refs.current.slice(1).forEach(ref => {
            if (ref) {
                gsap.set(ref, { opacity: 0.2 });
            }
        });

        // Ensure base is always visible
        if (refs.current[0]) {
            gsap.to(refs.current[0], { opacity: 1 });
        }

        // Handle other parts
        refs.current.slice(1).forEach((ref, index) => {
            if (ref) {
                if (index + 1 === wrongGuesses) {
                    gsap.fromTo(ref,
                        {
                            opacity: 1,
                            y: 150,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'bounce.out',
                        });
                } else if (index + 1 < wrongGuesses) {
                    gsap.to(ref, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0 });
                }
            }
        });
    }
        , [wrongGuesses]);




    return (
        <svg data-testid="hangman-animation" viewBox="0 0 410 692" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative p-2 w-full h-64 lg:h-[300px] xl:h-[350px] 2xl:h-[400px] 2k:h-[500px]">
            {/* Group 1: Base */}
            <g ref={el => refs.current[0] = el}>
                <path d="M217.5 692C212.806 692 209 688.194 209 683.5C209 678.806 212.806 675 217.5 675H401.5C406.194 675 410 678.806 410 683.5C410 688.194 406.194 692 401.5 692H217.5Z" fill="black" />
            </g>

            {/* Group 2: Pole */}
            <g ref={el => refs.current[1] = el}>
                <path d="M322 8.5C322 3.80558 325.806 0 330.5 0C335.194 0 339 3.80558 339 8.5V674.5C339 679.194 335.194 683 330.5 683C325.806 683 322 679.194 322 674.5V8.5Z" fill="black" />
            </g>

            {/* Group 3: Stab */}
            <g ref={el => refs.current[2] = el}>
                <path d="M178.61 35.1101L189.37 24.3498L337.476 172.456L326.716 183.216L178.61 35.1101Z" fill="black" />
            </g>

            {/* Group 4: Cell */}
            <g ref={el => refs.current[3] = el}>
                <path d="M7.00657 24C3.13695 24 0 27.134 0 31C0 34.866 3.13694 38 7.00657 38H84.7313V30.4615H94.6247V38H402.993C406.863 38 410 34.866 410 31C410 27.134 406.863 24 402.993 24H7.00657Z" fill="black" />
            </g>

            {/* Group 5: All Ropes */}
            <g ref={el => refs.current[4] = el}>
                <path d="M87.7282 193.905C90.2341 186.59 91.9896 178.953 93.2178 167.718L83.0326 168.598C82.0649 176.54 80.8802 182.222 79.3046 187.477C82.3937 189.289 85.1602 191.491 87.7282 193.905Z" fill="black" />
                <path d="M118.476 213.224C109.953 193.445 106.498 187.763 104.129 166.762L94.1792 167.631C96.6231 189.816 100.959 198.005 109.296 217.201C111.864 223.107 113.228 229.292 113.228 234.801C113.228 240.887 111.585 245.981 108.601 249.406C105.797 252.582 101.635 254.729 94.9297 255.039C92.6037 258.575 89.8496 261.733 86.7109 264.5C88.9067 264.928 91.2328 265.151 93.6892 265.133C93.7822 265.133 93.8442 265.133 93.8442 265.133C103.477 265.133 111.219 261.708 116.15 255.938C121.149 250.162 123.196 242.606 123.196 234.808C123.19 227.698 121.497 220.272 118.476 213.224Z" fill="black" />
                <path d="M121.683 93.2695L118.383 85.3781C112 88.052 107.181 91.3897 103.949 94.0264C105.599 96.0489 106.988 98.7229 107.826 101.999C110.369 99.7093 115.064 96.0427 121.683 93.2695ZM93.9311 95.5464V31H85.3649V96.2661L93.6148 95.5402C93.714 95.534 93.807 95.5464 93.9311 95.5464ZM103.918 126.386L82.1456 128.285C79.7947 128.49 78.0516 130.568 78.2439 132.919C78.4362 135.153 80.3095 136.828 82.5053 136.828C82.6294 136.828 82.7473 136.822 82.8837 136.822L104.637 134.929C107.007 134.725 108.756 132.634 108.551 130.283C108.341 127.937 106.269 126.188 103.918 126.386ZM103.918 136.431L82.1456 138.329C79.7947 138.534 78.0516 140.612 78.2439 142.976C78.4362 145.197 80.3095 146.866 82.5053 146.866C82.6356 146.866 82.7597 146.866 82.8837 146.86L104.637 144.961C107.007 144.757 108.756 142.691 108.551 140.339C108.347 137.988 106.269 136.226 103.918 136.431ZM82.5053 106.689C82.6356 106.689 82.7597 106.689 82.8837 106.683L94.4956 105.671C96.8465 105.479 98.5895 103.394 98.391 101.037C98.1801 98.6918 96.0897 96.9361 93.7388 97.1532L82.1518 98.1645C79.8009 98.3692 78.0578 100.435 78.2501 102.793C78.4424 105.02 80.3157 106.689 82.5053 106.689ZM103.918 106.304L82.1456 108.19C79.7947 108.401 78.0516 110.479 78.2439 112.831C78.4362 115.064 80.3095 116.733 82.5053 116.733C82.6356 116.733 82.7597 116.733 82.8837 116.721L104.637 114.828C107.007 114.618 108.756 112.545 108.551 110.188C108.341 107.843 106.269 106.093 103.918 106.304ZM103.918 116.348L82.1456 118.241C79.7947 118.458 78.0516 120.53 78.2439 122.869C78.4362 125.108 80.3095 126.777 82.5053 126.777C82.6356 126.777 82.7597 126.777 82.8837 126.777L104.637 124.873C107.007 124.668 108.756 122.602 108.551 120.238C108.347 117.875 106.269 116.15 103.918 116.348ZM103.918 146.494L82.1456 148.367C79.7947 148.572 78.0516 150.65 78.2439 153.014C78.4362 155.235 80.3095 156.923 82.5053 156.923C82.6356 156.923 82.7597 156.904 82.8837 156.892L104.637 155.006C107.007 154.801 108.756 152.722 108.551 150.359C108.341 148.02 106.269 146.27 103.918 146.494ZM103.918 156.513L82.1456 158.412C79.7947 158.616 78.0516 160.701 78.2439 163.058C78.4362 165.279 80.3095 166.967 82.5053 166.967C82.6356 166.967 82.7597 166.948 82.8837 166.948L104.637 165.056C107.007 164.851 108.756 162.773 108.551 160.409C108.341 158.052 106.269 156.315 103.918 156.513ZM99.9728 100.9C100.122 102.513 99.551 104.009 98.5771 105.163L103.763 104.704C104.842 104.61 105.897 104.84 106.79 105.28C106.064 99.2316 103.322 95.1183 100.543 92.8725C98.5275 91.2222 96.648 90.5025 95.5253 90.1675V95.7263C97.901 96.3095 99.7557 98.3258 99.9728 100.9Z" fill="black" />
            </g>

            {/* Group 6: Head */}
            <g ref={el => refs.current[5] = el}>
                <path d="M97.8824 233.958C95.0042 257.607 73.5669 274.402 49.8842 271.517C26.2697 268.644 9.44734 247.197 12.3193 223.547C15.1416 199.941 36.6533 183.091 60.2617 185.957C83.9382 188.855 100.736 210.351 97.8824 233.958Z" fill="black" />
            </g>

            {/* Group 7: Body */}
            <g ref={el => refs.current[6] = el}>
                <path d="M124.245 525.986L146.55 632.335L179.389 621.925L145.521 515.191L141.073 423.999C141.532 421.722 141.774 419.383 141.737 416.951L139.777 300.936C139.461 282.504 124.4 268.117 105.841 268.129C87.4118 268.446 72.7295 283.639 73.0459 302.065L74.578 392.06L83.4792 362.852L88.8013 298.895L88.1252 364.279L61.099 452.903L83.4482 461.043L121.05 373.169C121.708 371.351 122.049 369.434 122.08 367.53L122.706 307.587L126.937 367.17C126.906 370.117 126.472 372.53 125.622 374.832L107.305 417.646L107.038 418.254L86.1092 467.172L75.0618 463.158L74.8819 527.612C74.8695 528.964 74.9812 530.31 75.2045 531.638L95.5687 651.4L140.503 643.769L120.48 525.999L120.653 461.39L124.245 525.986Z" fill="black" />
            </g>
        </svg>
    );
};

export default HangmanAnimation;
