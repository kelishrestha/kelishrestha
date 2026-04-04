const _ = require('lodash');
const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const USERNAME = "kelishrestha";
const REPO = "kelishrestha";
const BRANCH = "main";
const orderedCategories = ['languages', 'frameworks', 'databases', 'applications', 'platforms', 'packages'];

const fileContent = fs.readFileSync('./config.yml', 'utf8');
const data = yaml.load(fileContent);
const featuredRepos = data['featured_repos'];

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
  <h1>Hi, I'm ${data['name']}</h1>
  <h2>
    <img src="${rawUrl("assets/chicken-coder.gif")}" width="30" />&nbsp;
    ${data['role_title']}
    &nbsp;<img src="${rawUrl("assets/chicken-manager.gif")}" width="30" />
  </h2>
  <p>
  <span>${data['role_areas']}</span>
  <br/>
  <span>📍 ${data['location']}</span>
  </p>
</section>

<section id="contact" align="center">
  <p>
    <a href="${data['linkedin_url']}">
      <img src="https://img.shields.io/badge/Linkedin-black?style=social&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDM4MiAzODIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzAwNzdCNzsiIGQ9Ik0zNDcuNDQ1LDBIMzQuNTU1QzE1LjQ3MSwwLDAsMTUuNDcxLDAsMzQuNTU1djMxMi44ODlDMCwzNjYuNTI5LDE1LjQ3MSwzODIsMzQuNTU1LDM4MmgzMTIuODg5DQoJQzM2Ni41MjksMzgyLDM4MiwzNjYuNTI5LDM4MiwzNDcuNDQ0VjM0LjU1NUMzODIsMTUuNDcxLDM2Ni41MjksMCwzNDcuNDQ1LDB6IE0xMTguMjA3LDMyOS44NDRjMCw1LjU1NC00LjUwMiwxMC4wNTYtMTAuMDU2LDEwLjA1Ng0KCUg2NS4zNDVjLTUuNTU0LDAtMTAuMDU2LTQuNTAyLTEwLjA1Ni0xMC4wNTZWMTUwLjQwM2MwLTUuNTU0LDQuNTAyLTEwLjA1NiwxMC4wNTYtMTAuMDU2aDQyLjgwNg0KCWM1LjU1NCwwLDEwLjA1Niw0LjUwMiwxMC4wNTYsMTAuMDU2VjMyOS44NDR6IE04Ni43NDgsMTIzLjQzMmMtMjIuNDU5LDAtNDAuNjY2LTE4LjIwNy00MC42NjYtNDAuNjY2UzY0LjI4OSw0Mi4xLDg2Ljc0OCw0Mi4xDQoJczQwLjY2NiwxOC4yMDcsNDAuNjY2LDQwLjY2NlMxMDkuMjA4LDEyMy40MzIsODYuNzQ4LDEyMy40MzJ6IE0zNDEuOTEsMzMwLjY1NGMwLDUuMTA2LTQuMTQsOS4yNDYtOS4yNDYsOS4yNDZIMjg2LjczDQoJYy01LjEwNiwwLTkuMjQ2LTQuMTQtOS4yNDYtOS4yNDZ2LTg0LjE2OGMwLTEyLjU1NiwzLjY4My01NS4wMjEtMzIuODEzLTU1LjAyMWMtMjguMzA5LDAtMzQuMDUxLDI5LjA2Ni0zNS4yMDQsNDIuMTF2OTcuMDc5DQoJYzAsNS4xMDYtNC4xMzksOS4yNDYtOS4yNDYsOS4yNDZoLTQ0LjQyNmMtNS4xMDYsMC05LjI0Ni00LjE0LTkuMjQ2LTkuMjQ2VjE0OS41OTNjMC01LjEwNiw0LjE0LTkuMjQ2LDkuMjQ2LTkuMjQ2aDQ0LjQyNg0KCWM1LjEwNiwwLDkuMjQ2LDQuMTQsOS4yNDYsOS4yNDZ2MTUuNjU1YzEwLjQ5Ny0xNS43NTMsMjYuMDk3LTI3LjkxMiw1OS4zMTItMjcuOTEyYzczLjU1MiwwLDczLjEzMSw2OC43MTYsNzMuMTMxLDEwNi40NzINCglMMzQxLjkxLDMzMC42NTRMMzQxLjkxLDMzMC42NTR6Ii8+DQo8L3N2Zz4=" />
    </a>&nbsp;
    <a href="${data['website_url']}">
      <img src="https://img.shields.io/badge/Website-black?style=social&logo=gnometerminal" />
    </a>
  </p>
</section>

<img src="${rawUrl("assets/horizontal-line.gif")}" width="100%" />

<section id="about">
  <h2>
    <img src="${rawUrl("assets/paint-splash.gif")}" width="20" />&nbsp;
    <span>Introduction</span>
  </h2>
  <p>
    <span>🌱 I’m currently learning <strong>${data['current_learning']}</strong></span>
    <br/>
    <span>🏅 ${data['certification_title']}</span>
    <br/>
    <span>🤝 I’m available for ${data['available_for']}.</span>
    <br/>
    <span>💬 Ask me about ${data['ask_me_about']}</span>
    <br/>
    <span>🔍 Find my blogs in <a href="${data['blog_url']}" target="_blank">${data['blog_site_name']}</a></span>
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
      <a href="${details.demo_url || details.url}" target="_blank">
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
`;

fs.writeFileSync("README.md", content);
console.log("README generated successfully 🚀");
