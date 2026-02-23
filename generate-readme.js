const _ = require('lodash');
const fs = require("fs");
const path = require("path");

const USERNAME = "kelishrestha";
const REPO = "kelishrestha";
const BRANCH = "main";
const orderedCategories = ['languages', 'frameworks', 'databases', 'applications', 'platforms', 'packages'];
const featuredRepos = [{
        name: "Lyrics viewer",
        url: "https://github.com/kelishrestha/lyrics-viewer",
        description: "View lyrics and translations for songs with Genius API and lyrics API",
        languages: ["Typescript"],
        image: 'assets/applications/lyrics-viewer-logo.png',
    },
    {
        name: 'Character coding',
        url: 'https://github.com/kelishrestha/character-coding',
        description: 'Creating characters with neural networks',
        languages: ["Python"],
        image: ''
    },
    {
        name: 'Audit Tracker (ruby gem)',
        url: 'https://github.com/kelishrestha/audit_tracker',
        description: 'Auditing github PRs for security audits',
        languages: ["Ruby"],
        image: ''
    },
    {
        name: 'Opentok Insights',
        url: 'https://github.com/kelishrestha/ot_insights_api_react',
        description: 'Opentok Insights API with React',
        languages: ["React"],
        image: ''
    },
    {
        name: 'POEditor Viewer',
        url: 'https://github.com/kelishrestha/poeditor_app',
        description: 'View translations with POEditor API',
        languages: ["Sinatra"],
        image: ''
    },
    {
        name: 'API Documentation',
        url: 'https://github.com/kelishrestha/postman-doc-gen',
        description: 'Creating api documentation with postman and swagger specs',
        languages: ["Python", "Shell"],
        image: ''
    }
]

const iconsDirectory = path.join(process.cwd(), "icons");
const categories = fs.readdirSync(iconsDirectory)
    .filter(folder => fs.statSync(path.join(iconsDirectory, folder)).isDirectory())
    .map(folder => {
        const files = fs.readdirSync(path.join(iconsDirectory, folder))
            .filter(file => file.endsWith(".svg"));
        return { folder, files };
    });

const categoryMap = new Map(categories.map(cat => [cat.folder, cat]));
const orderedCategoriesWithFiles = orderedCategories
    .map(category => categoryMap.get(category))
    .filter(Boolean);

const rawUrl = (filePath) =>
    `https://raw.githubusercontent.com/${USERNAME}/${REPO}/${BRANCH}/${filePath}`;

let content = `
<section id="banner" align="center">
  <img src="${rawUrl("assets/cat-wave.gif")}" width="25%" />
  <h1>Hi, I'm Kelina</h1>
  <h2>
    <img src="${rawUrl("assets/chicken-coder.gif")}" width="30" />&nbsp;
    Software Engineer | Project Manager
    &nbsp;<img src="${rawUrl("assets/chicken-manager.gif")}" width="30" />
  </h2>
  <p>
  <span>🔐 Application Security | Backend Engineering | Scrum Master | Web Developer</span>
  <br/>
  <span>📍 Nepal</span>
  </p>
</section>

<img src="${rawUrl("assets/horizontal-line.gif")}" width="100%" />

<section id="about">
  <h2>
    <img src="${rawUrl("assets/paint-splash.gif")}" width="20" />&nbsp;
    <span>Introduction</span>
  </h2>
  <p>
    <span>🌱 I’m currently learning <strong>Artificial Intelligence</strong></span>
    <br/>
    <span>🏅 Certified Scrum Master since 2020</span>
    <br/>
    <span>🤝 I’m available for freelancing.</span>
    <br/>
    <span>💬 Ask me about Ruby/Rails, ReactJS, Project Management, Scrum</span>
    <br/>
    <span>🔍 Find my blogs in <a href="https://kleenash.medium.com/" target="_blank">Medium</a></span>
  </p>
</section>
<section id="github-profile">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
</section>
<section id="specialization">
  <h3>Specialization Languages/Frameworks</h3>
  <p>
    <img src="https://img.shields.io/badge/ruby-red?logo=ruby&style=for-the-badge" />&nbsp;
    <img src="https://img.shields.io/badge/rails-red?logo=rubyonrails&style=for-the-badge" />&nbsp;
    <img src="https://img.shields.io/badge/typescript-green?logo=typescript&style=for-the-badge" />&nbsp;
    <img src="https://img.shields.io/badge/reactjs-blue?logo=react&style=for-the-badge" />&nbsp;
  </p>
</section>
<section id="featured-repos">
  <h3>Featured Repositories</h3>
  <ul>`

featuredRepos.forEach(details => {
    content += `<li>
      <a href="${details.url}" target="_blank">
        ${details.name}
      </a>
      &nbsp; in ${_.join(details.languages, ', ')}
    </li>`;
});

content += `</ul></section>\n`;
content += `
---

<section id="tech-stacks">
  <h2>
    <img src="${rawUrl("assets/code-animated.gif")}" width="20"/>&nbsp;
    <span>Technical stacks I have worked with</span>
  </h2>
`;

orderedCategoriesWithFiles.forEach(category => {
            content += `\n
  <h3>${_.capitalize(_.replace(category.folder), /-/g, ' ')}</h3>
  \n
  <section>\n`;
            category.files.forEach(file => {
                        content += `<img src="${rawUrl(`icons/${category.folder}/${file}`)}" width="50" />&nbsp;&nbsp;\n`;
  });
  content += `</section>\n\n`;
});

content += `
</section>

---

<section id="github-stats">
  <h2>
    <img src="${rawUrl("assets/bar-colored.gif")}" width="30"/>&nbsp;
    <span>Github Statistics</span>
  </h2>
  <p align="center">
    <img src="https://streak-stats.demolab.com?user=${USERNAME}&theme=radical&hide_border=true&border_radius=10" alt="GitHub Streak" />
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
    <br/>
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
  </p>
</section>

---

<section id="activity-graph">
  <h2>
    <img src="${rawUrl("assets/robot-create.gif")}" width="30"/>&nbsp;
    <span>Activity Graph</span>
  </h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=synthwave-84" />
</section>

---

<section id="contact">
  <h2>
    <img src="${rawUrl("assets/world.gif")}" width="30"/>&nbsp;
    <span>Connect</span>
  </h2>
  <p>
    <a href="https://www.linkedin.com/in/kelishrestha/">
      <img src="https://img.shields.io/badge/LinkedIn-Professional-blue?logo=linkedin&style=for-the-badge" />
    </a>&nbsp;
    <a href="https://www.kelinashrestha.com.np">
      <img src="https://img.shields.io/badge/Website-Professional-blue?logo=website&style=for-the-badge" />
    </a>
  </p>
</section>
`;

fs.writeFileSync("README.md", content);
console.log("README generated successfully 🚀");
