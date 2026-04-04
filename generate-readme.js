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
      <img src="https://img.shields.io/badge/Website-black?style=social&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgY2xhc3M9Imljb24iICB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTk2MCA1MTJjMCAyNDkuNDA4LTIwMy4yIDQ0OC00NDggNDQ4LTI0NC43Nzg2NjcgMC00NDgtMTk4LjU5Mi00NDgtNDQ4UzI2Mi41OTIgNjQgNTEyIDY0czQ0OCAxOTguNTkyIDQ0OCA0NDgiIGZpbGw9IiMyMTk2RjMiIC8+PHBhdGggZD0iTTUwNy41MiA3MTguMDhjMC04Ljk2LTQuNDgtMTMuNDQtMTMuNDQtMTcuOTItMjYuODgtOC45Ni01My43Ni04Ljk2LTc2LjE2LTMxLjM4MTMzMy00LjQ4LTguOTYtNC40OC0xNy45Mi04Ljk2LTI2Ljg4LTguOTYtOC45Ni0zMS4zNi0xMy40NC00NC44LTE3LjkyaC04OS42Yy0xMy40NC00LjQ4LTIyLjQtMjIuNC0zMS4zNi0zNS44NCAwLTQuNDggMC0xMy40NjEzMzMtOC45Ni0xMy40NjEzMzQtOC45Ni00LjQ1ODY2Ny0xNy45MiA0LjUwMTMzMy0yNi44OCAwLTQuNDgtNC40NTg2NjctNC40OC04Ljk2LTQuNDgtMTMuNDE4NjY2IDAtMTMuNDYxMzMzIDguOTYtMjYuOTAxMzMzIDE3LjkyLTM1Ljg2MTMzNCAxMy40NC04Ljk2IDI2Ljg4IDQuNDggNDAuMzIgNC40OCA0LjQ4IDAgNC40OCAwIDguOTYgNC40OCAxMy40NCA0LjQ4IDE3LjkyIDIyLjQgMTcuOTIgMzUuODYxMzM0djguOTZjMCA0LjQ4IDQuNDggNC40OCA4Ljk2IDQuNDggNC40OC0yMi40IDQuNDgtNDQuODIxMzMzIDguOTYtNjcuMiAwLTI2Ljg4IDI2Ljg4LTUzLjc4MTMzMyA0OS4yOC02Mi43MiA4Ljk2LTQuNDU4NjY3IDEzLjQ0IDQuNTAxMzMzIDIyLjQgMCAyNi44OC04Ljk2IDk0LjA4LTM1Ljg0IDgwLjY0LTcxLjY1ODY2Ny04Ljk2LTMxLjM4MTMzMy0zNS44NC02Mi42OTg2NjctNzEuNjgtNTguMjQtOC45NiA0LjUwMTMzMy0xMy40NCA4Ljk2LTIyLjQgMTMuNDYxMzMzLTEzLjQ0IDguOTYtNDAuMzIgMzUuODQtNTMuNzYgMzUuODQtMjIuNC00LjQ4LTIyLjQtMzUuODQtMTcuOTItNDkuMzAxMzMzIDQuNDgtMTcuOTIgNDQuOC03Ni4xMzg2NjcgNzEuNjgtNjcuMTc4NjY3bDE3LjkyIDE3LjkyYzguOTYgNC40OCAyMi40IDQuNDggMzUuODQgNC40OCA0LjQ4IDAgOC45NiAwIDEzLjQ0LTQuNDggNC40OC00LjQ4IDQuNDgtNC40OCA0LjQ4LTguOTYgMC0xMy40NC0xMy40NC0yNi45MDEzMzMtMjIuNC0zNS44NjEzMzNzLTIyLjQtMTcuOTItMzUuODQtMjIuMzc4NjY3Yy00NC44LTEzLjQ2MTMzMy0xMTYuNDggNC40NTg2NjctMTUyLjMyIDM1Ljg0LTM1Ljg0IDMxLjM2LTYyLjcyIDg1LjEyLTgwLjY0IDEyOS45Mi04Ljk2IDI2Ljg4LTE3LjkyIDYyLjY5ODY2Ny0yMi40IDk0LjA4LTQuNDggMjIuNC04Ljk2IDQwLjMyIDQuNDggNjIuNjk4NjY3IDEzLjQ0IDI2Ljg4IDQwLjMyIDUzLjc4MTMzMyA2Ny4yIDcxLjY4IDE3LjkyIDEzLjQ0IDUzLjc2IDEzLjQ0IDcxLjY4IDM1Ljg0IDEzLjQ0IDE3Ljk0MTMzMyA4Ljk2IDQwLjMyIDguOTYgNjIuNzIgMCAyNi44OCAxNy45MiA0OS4yOCAyNi44OCA3MS42NTg2NjcgNC40OCAxMy40NjEzMzMgOC45NiAzMS4zODEzMzMgMTMuNDQgNDQuODIxMzMzIDAgNC40OCA0LjQ4IDMxLjM2IDQuNDggMzUuODQgMjYuODggMTMuNDQgNDkuMjggMjYuOTAxMzMzIDgwLjY0IDM1Ljg2MTMzMyA0LjQ4IDAgMjIuNC0yNi45MDEzMzMgMjIuNC0zMS4zODEzMzMgMTMuNDQtMTMuNDQgMjIuNC0zMS4zNiAzNS44NC00MC4zMiA4Ljk2LTQuNDggMTcuOTItOC45NiAyNi44OC0xNy45NDEzMzMgOC45Ni04Ljk2IDEzLjQ0LTI2Ljg4IDE3LjkyLTQwLjMyIDQuNDgtOC45Mzg2NjcgOC45Ni0yNi44NTg2NjcgNC40OC00MC4yOTg2NjdNNTE2LjQ4IDMwNS45MmM0LjQ4IDAgOC45Ni00LjQ4IDE3LjkyLTguOTYgMTMuNDQtOC45NiAyNi45MDEzMzMtMjIuNCA0MC4zMi0zMS4zNiAxMy40NjEzMzMtOC45NiAyNi45MDEzMzMtMjIuNCAzNS44NjEzMzMtMzEuMzYgMTMuNDQtOC45NiAyMi40LTI2Ljg4IDI2Ljg4LTQwLjM0MTMzMyA0LjQ4LTguOTYgMTcuOTQxMzMzLTI2Ljg4IDEzLjQ0LTQwLjMyLTQuNDgtOC45Ni0yNi44OC0xMy40NC0zNS44NC0xNy45MkM1NzkuMiAxMjYuNjk4NjY3IDU0Ny44NCAxMjIuMjQgNTEyIDEyMi4yNGMtMTMuNDQgMC0zMS4zNiA0LjQ1ODY2Ny0zNS44NCAxNy45Mi00LjQ4IDIyLjQgMTMuNDQgMTcuOTIgMzEuMzYgMjIuNCAwIDAgNC40OCAzNS44NCA0LjQ4IDQwLjMyIDQuNDggMjIuNDIxMzMzLTguOTYgMzUuODQtOC45NiA1OC4yNCAwIDEzLjQ0IDAgMzUuODQgOC45NiA0NC44aDQuNDh6TTg5Mi44IDYxOS41MmM0LjUwMTMzMy04Ljk2IDQuNTAxMzMzLTIyLjQgOC45Ni0zMS4zNiA0LjUwMTMzMy0yMi40MjEzMzMgNC41MDEzMzMtNDQuOCA0LjUwMTMzMy02Ny4yIDAtNDQuOC00LjUwMTMzMy04OS41Nzg2NjctMTcuOTItMTI5LjkyLTguOTYtMTMuNDQtMTMuNDYxMzMzLTI2Ljg4LTE3Ljk0MTMzMy00MC4zNDEzMzMtOC45Ni0yMi4zNzg2NjctMjIuNC00NC44LTQwLjMyLTYyLjY5ODY2Ny0xNy45Mi0yMi40LTQwLjM0MTMzMy04NS4xMi04MC42NC02Ny4yLTEzLjQ0IDQuNTAxMzMzLTIyLjQgMjIuNDIxMzMzLTMxLjM2IDMxLjM4MTMzM2wtMjYuODggNDAuMzJjLTQuNTAxMzMzIDQuNDgtOC45NiAxMy40NC00LjUwMTMzMyAxNy45MiAwIDQuNDggNC41MDEzMzMgNC40OCA4Ljk2IDQuNDggOC45NiA0LjUwMTMzMyAxMy40NjEzMzMgNC41MDEzMzMgMjIuNDIxMzMzIDguOTYgNC40OCAwIDguOTYgNC41MDEzMzMgNC40OCA4Ljk2IDAgMCAwIDQuNTAxMzMzLTQuNDggNC41MDEzMzQtMjIuNDIxMzMzIDIyLjQtNDQuOCA0MC4zMi02Ny4yIDYyLjY5ODY2Ni00LjQ4IDQuNDgtOC45NiAxMy40NC04Ljk2IDE3LjkyczQuNDggNC40OCA0LjQ4IDguOTZjMCA0LjUwMTMzMy00LjQ4IDQuNTAxMzMzLTguOTYgOC45Ni04Ljk2IDQuNTAxMzMzLTE3LjkyIDguOTYtMjIuNCAxMy40NjEzMzQtNC40OCA4Ljk2IDAgMjIuNC00LjQ4IDMxLjM2LTQuNDggMjIuNC0xNy45NDEzMzMgNDAuMzItMjYuOTAxMzMzIDYyLjcyLTguOTYgMTMuNDE4NjY3LTEzLjQxODY2NyAyNi44OC0yMi4zNzg2NjcgNDAuMzIgMCAxNy45Mi00LjUwMTMzMyAzMS4zNiA0LjQ1ODY2NyA0NC44IDIyLjQyMTMzMyAzMS4zNiA2Mi43MiAxMy40NCA5NC4wOCAyNi45MDEzMzMgOC45NiA0LjQ1ODY2NyAxNy45MiA0LjQ1ODY2NyAyMi40MjEzMzMgMTMuNDE4NjY3IDEzLjQxODY2NyAxMy40NjEzMzMgMTMuNDE4NjY3IDM1Ljg2MTMzMyAxNy45MiA0OS4zMDEzMzMgNC40NTg2NjcgMTcuOTIgOC45NiAzNS44NCAxNy45MiA1My43NiA0LjQ4IDIyLjQyMTMzMyAxMy40NCA0NC44MjEzMzMgMTcuOTIgNjIuNzIgNDAuMzQxMzMzLTMxLjM2IDc2LjE2LTY3LjE3ODY2NyAxMDMuMDQtMTEyIDI2Ljg4LTMxLjQyNCA0MC4zNDEzMzMtNjcuMjQyNjY3IDUzLjc2LTEwMy4xMDQiIGZpbGw9IiNDRERDMzkiIC8+PC9zdmc+" />
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
