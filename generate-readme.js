const _ = require('lodash');
const fs = require("fs");
const path = require("path");

const USERNAME = "kelishrestha";
const REPO = "kelishrestha";
const BRANCH = "main";
const orderedCategories = ['languages', 'frameworks', 'applications', 'platforms', 'packages'];

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
  <h2>Software Engineer</h2>
  <p style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
  <span>🔐 Application Security | Backend Engineering | Scrum Master | Web Developer</span>
  <span>📍 Nepal</span>
  </p>
</section>

<img src="${rawUrl("assets/horizontal-line.gif")}" width="100%" />

<section id="about">
  <h2 style={{ gap: 5, display: 'flex', alignItems: 'center' }}>
    <img src="${rawUrl("assets/paint-splash.gif")}" width="5%" style={{ verticalAlign: 'middle'}} />
    <span>Introduction</span>
  </h2>
  <p style={{ gap: 6, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <span>🌱 I’m currently learning <strong>Artificial Intelligence</strong></span>
    <span>💬 Ask me about Ruby/Rails & ReactJS</span>
    <span>🤝 I’m available for freelancing.</span>
    <span>🔍 Find my blogs in <a href="https://kleenash.medium.com/" target="_blank">Medium</a></span>
  </p>
</section>
<section id="github-profile">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
</section>

---

<section id="tech-stacks">
  <h2 style={{ gap: 5, display: 'flex', alignItems: 'center' }}>
    <img src="${rawUrl("assets/code-animated.gif")}" width="5%" style={{ verticalAlign: 'middle'}} />
    <span>Technical Stacks</span>
  </h2>
`;

orderedCategoriesWithFiles.forEach(category => {
            content += `
  \n
  <h3>${_.capitalize(category.folder)}</h3>
  \n
  <section style={{ display: 'flex', gap: 4, alignItems: 'center', verticalAlign: 'middle', flexWrap: 'wrap' }}>\n`;
            category.files.forEach(file => {
                        content += `<img src="${rawUrl(`icons/${category.folder}/${file}`)}" width="50" />\n`;
  });
  content += `</section>\n\n`;
});

content += `
</section>

---

<section id="github-stats">
  <h2 style={{ gap: 5, display: 'flex', alignItems: 'center' }}>
    <img src="${rawUrl("assets/bar-colored.gif")}" width="5%" style={{ verticalAlign: 'middle'}} />
    <span>Github Statistics</span>
  </h2>
  <div style={{ display: 'flex', gap: 10, flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', flexWrap: 'wrap' }}>
    <img src="https://streak-stats.demolab.com?user=kelishrestha&theme=synthwave&hide_border=true&border_radius=10" alt="GitHub Streak" />
    <div style={{ display: 'flex', gap: 5, flexDirection: 'row', alignItems: 'center', verticalAlign: 'middle' }}>
      <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
      <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
    </div>
    <div style={{ display: 'flex', gap: 5, flexDirection: 'row', alignItems: 'center', verticalAlign: 'middle' }}>
      <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${USERNAME}&theme=radical&layout=compact&hide_border=true" />
    </div>
  </div>
</section>

---

<section id="activity-graph">
  <h2 style={{ gap: 5, display: 'flex', alignItems: 'center' }}>
    <img src="${rawUrl("assets/robot-create.gif")}" width="5%" style={{ verticalAlign: 'middle'}} />
    <span>Activity Graph</span>
  </h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=synthwave-84" />
</section>

---

<section id="contact">
  <h2 style={{ gap: 5, display: 'flex', alignItems: 'center' }}>
    <img src="${rawUrl("assets/world.gif")}" width="5%" style={{ verticalAlign: 'middle'}} />
    <span>Connect</span>
  </h2>
  <p style={{ display: 'flex', gap: 4, alignItems: 'center', verticalAlign: 'middle', flexWrap: 'wrap' }}>
    You can find me on &nbsp;
    <a href="https://www.linkedin.com/in/kelishrestha/">
      <img src="https://img.shields.io/badge/LinkedIn-Professional-blue?logo=linkedin&style=for-the-badge" />
    </a>
  </p>
</section>
`;

fs.writeFileSync("README.md", content);
console.log("README generated successfully 🚀");
