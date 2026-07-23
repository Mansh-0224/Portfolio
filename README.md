# Manvi Sharma | Cybersecurity & Full-Stack Portfolio

A responsive personal portfolio for Manvi Sharma, a B.Tech learner building practical experience in cybersecurity, cloud technologies, and Java full-stack development.

## Features

- Responsive, mobile-first layout with a futuristic cybersecurity visual theme
- Sections for profile, skills, certificates, projects, and contact
- Certificates covering CyberOps, AWS Cloud Practitioner, and Wipro Full Stack Java training
- GitHub and email links, plus a Formspree-ready contact form
- Vanilla JavaScript for mobile navigation, smooth scrolling, active links, theme switching, sticky navigation, and scroll-to-top
- Static-host configuration for Netlify and Vercel

## Folder structure

```text
Portfolio/
|-- assets/
|   |-- icons/                # Reserved for local SVG/icon assets
|   `-- images/               # Reserved for avatar and project image assets
|-- css/
|   |-- responsive.css        # Mobile-first breakpoints
|   `-- style.css             # Theme, layout, and component styles
|-- js/
|   `-- script.js             # Vanilla JavaScript interactions
|-- .gitignore
|-- index.html
|-- LICENSE
|-- netlify.toml              # Netlify publishing and security headers
|-- vercel.json               # Vercel clean URLs and security headers
`-- README.md
```

## Technologies used

- HTML5
- CSS3 with Flexbox, Grid, CSS variables, and media queries
- Vanilla JavaScript (ES6+)
- Google Fonts: DM Sans and JetBrains Mono
- Formspree (optional contact-form delivery)

## Run locally

This is a static website, so no package installation or build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/Mansh-0224/Portfolio.git
   ```

2. Open the project folder and launch `index.html` in a browser.

For the best local testing experience, use a static server such as the VS Code Live Server extension.

## Configure the contact form

The contact form is connected to [Formspree](https://formspree.io/) using Manvi's configured form endpoint. Formspree will deliver form submissions to the recipient address set in the Formspree dashboard.

Never commit API keys or secrets to this repository.

## Deploy to Netlify

1. Push the project to GitHub.
2. In Netlify, select **Add new site** then **Import an existing project**.
3. Choose the GitHub repository.
4. Leave the build command empty and set the publish directory to `.`.
5. Select **Deploy site**.

The included `netlify.toml` already sets the publish directory and basic security headers.

## Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel, choose **Add New** then **Project**.
3. Import the GitHub repository.
4. Select **Other** as the framework preset.
5. Leave the build command blank and the output directory unset.
6. Select **Deploy**.

The included `vercel.json` enables clean URLs and basic security headers.

## GitHub release checklist

- Replace the placeholder Formspree ID before expecting contact submissions.
- Add a real LinkedIn URL if you want the LinkedIn profile linked.
- Test the website at mobile and desktop widths.
- Confirm all external links open the intended pages.
- Commit and push all changes:

  ```bash
  git add .
  git commit -m "Prepare portfolio for deployment"
  git push origin main
  ```

## License

This project is available under the [MIT License](LICENSE).
