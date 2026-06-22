# Raghu Driving School - Landing Page

## Project Overview
This repository contains the source code for the high-conversion, front-end landing page for Raghu Driving School. Tailored specifically for the local Bengaluru market, the application provides a highly polished, interactive experience designed to guide prospective students through pricing, training timelines, and seamless lead registration.

## Tech Stack
The project was built with a strict emphasis on performance and a lean, dependency-free core:
* **HTML5**: Semantic markup for accessible, SEO-optimized structure.
* **Vanilla CSS3**: Custom-authored stylesheets utilizing modern Flexbox/Grid layouts and native CSS variables, entirely independent of bloated CSS frameworks.
* **Vanilla JavaScript (ES6+)**: Custom DOM manipulation, form validation, and event handling.
* **GSAP (GreenSock Animation Platform)**: The sole external library, utilized to orchestrate complex, scroll-triggered SVG animations and fluid timeline sequences for the vehicle training process.

## Architecture
The application employs a highly efficient **serverless, stateless design**. 
By removing the backend infrastructure and database layer entirely, we leverage the WhatsApp API for direct, end-to-end encrypted lead capture. When a user submits the "Apply Now" modal, their details are parsed and securely routed directly to the business owner's WhatsApp client, effectively eliminating backend maintenance and database overhead.

## Security Posture
Adhering to strict deployment guidelines, the application implements robust client-side protections:
* **Zero-Storage Data Policy**: No sensitive user data is ever stored on our servers.
* **Content Security Policy (CSP)**: A strict CSP restricts asset execution strictly to `'self'` and trusted CDNs, mitigating Cross-Site Scripting (XSS) vectors.
* **Anti-Clickjacking Headers**: `X-Frame-Options` is set to `DENY` and `X-Content-Type-Options` explicitly enforces `nosniff`.
* **Referrer-Policy**: Locked to `strict-origin-when-cross-origin` to prevent data leakage across non-secure domains.

## Local Setup
To run and inspect this project locally, no complex build tools or node installations are required:
1. Clone the repository to your local machine.
2. Open the `index.html` file directly in your preferred web browser.
3. *Optional but recommended*: For the best development experience (particularly when testing GSAP triggers), serve the directory using a lightweight local web server such as VS Code's "Live Server" extension or Python's `http.server`.
