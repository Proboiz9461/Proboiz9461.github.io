const projects = [
  { name: "2048", type: "game", desc: "Classic number-merging puzzle clone.", url: "https://github.com/gabrielecirulli/2048", tags: ["puzzle", "browser"] },
  { name: "HexGL", type: "game", desc: "Futuristic 3D racing game in WebGL.", url: "https://github.com/BKcore/HexGL", tags: ["racing", "webgl"] },
  { name: "JS13kGames", type: "game", desc: "Collection of tiny JavaScript games.", url: "https://github.com/codyebberson/js13k-minipunk", tags: ["arcade", "tiny"] },
  { name: "BrowserQuest", type: "game", desc: "Multiplayer HTML5 adventure game.", url: "https://github.com/mozilla/BrowserQuest", tags: ["mmo", "adventure"] },
  { name: "Freeciv", type: "game", desc: "Open-source strategy game inspired by Civilization.", url: "https://github.com/freeciv/freeciv", tags: ["strategy", "classic"] },
  { name: "Minetest", type: "game", desc: "Voxel sandbox game engine and game.", url: "https://github.com/minetest/minetest", tags: ["sandbox", "voxel"] },
  { name: "OpenRA", type: "game", desc: "Real-time strategy engine for classic RTS games.", url: "https://github.com/OpenRA/OpenRA", tags: ["rts", "engine"] },
  { name: "SuperTuxKart", type: "game", desc: "Kart racing game with fun tracks.", url: "https://github.com/supertuxkart/stk-code", tags: ["racing", "3d"] },
  { name: "Veloren", type: "game", desc: "Multiplayer RPG set in a procedural world.", url: "https://github.com/veloren/veloren", tags: ["rpg", "multiplayer"] },
  { name: "Battle for Wesnoth", type: "game", desc: "Turn-based fantasy strategy game.", url: "https://github.com/wesnoth/wesnoth", tags: ["turn-based", "fantasy"] },
  { name: "OpenTTD", type: "game", desc: "Transport management simulation.", url: "https://github.com/OpenTTD/OpenTTD", tags: ["simulation", "tycoon"] },
  { name: "Cataclysm DDA", type: "game", desc: "Post-apocalyptic roguelike survival game.", url: "https://github.com/CleverRaven/Cataclysm-DDA", tags: ["roguelike", "survival"] },
  { name: "Endless Sky", type: "game", desc: "Space trading and combat game.", url: "https://github.com/endless-sky/endless-sky", tags: ["space", "sim"] },
  { name: "0 A.D.", type: "game", desc: "Historical real-time strategy game.", url: "https://github.com/0ad/0ad", tags: ["rts", "history"] },
  { name: "Xonotic", type: "game", desc: "Fast-paced arena first-person shooter.", url: "https://github.com/xonotic/xonotic", tags: ["fps", "arena"] },
  { name: "OpenMW", type: "game", desc: "Open-source engine reimplementation for Morrowind.", url: "https://github.com/OpenMW/openmw", tags: ["rpg", "engine"] },
  { name: "Flare", type: "game", desc: "Action RPG game engine and content.", url: "https://github.com/flareteam/flare-engine", tags: ["arpg", "engine"] },
  { name: "Godot Demo Projects", type: "game", desc: "Game templates and mini games for Godot.", url: "https://github.com/godotengine/godot-demo-projects", tags: ["templates", "godot"] },
  { name: "Dwarf Fortress (classic forks)", type: "game", desc: "Community projects around fortress simulation fun.", url: "https://github.com/DFHack/dfhack", tags: ["simulation", "modding"] },
  { name: "Mindustry", type: "game", desc: "Factory building + tower defense game.", url: "https://github.com/Anuken/Mindustry", tags: ["factory", "tower-defense"] },
  { name: "Unciv", type: "game", desc: "Civilization-like game made in Kotlin.", url: "https://github.com/yairm210/Unciv", tags: ["4x", "mobile"] },
  { name: "Luanti Games", type: "game", desc: "Game packs and modes for Minetest/Luanti.", url: "https://github.com/minetest/minetest_game", tags: ["mods", "sandbox"] },
  { name: "OpenClonk", type: "game", desc: "Action tactics and sandbox gameplay.", url: "https://github.com/openclonk/openclonk", tags: ["action", "sandbox"] },
  { name: "Warzone 2100", type: "game", desc: "Classic RTS with campaign and skirmish.", url: "https://github.com/Warzone2100/warzone2100", tags: ["rts", "sci-fi"] },
  { name: "Marble Blast Web", type: "game", desc: "Physics marble rolling game project.", url: "https://github.com/MBU-Team/OpenMBU", tags: ["physics", "arcade"] },
  { name: "Tuxemon", type: "game", desc: "Monster-catching RPG inspired project.", url: "https://github.com/Tuxemon/Tuxemon", tags: ["rpg", "pixel"] },
  { name: "Shattered Pixel Dungeon", type: "game", desc: "Roguelike dungeon crawler.", url: "https://github.com/00-Evan/shattered-pixel-dungeon", tags: ["roguelike", "mobile"] },
  { name: "OpenSpades", type: "game", desc: "Voxel shooter client.", url: "https://github.com/yvt/openspades", tags: ["fps", "voxel"] },
  { name: "Ryzom Core", type: "game", desc: "MMORPG framework and assets.", url: "https://github.com/ryzom/ryzomcore", tags: ["mmorpg", "engine"] },
  { name: "osu!lazer", type: "game", desc: "Rhythm game framework and client.", url: "https://github.com/ppy/osu", tags: ["rhythm", "music"] },

  { name: "Hackertyper", type: "tool", desc: "Fake hacking screen for laughs.", url: "https://github.com/will/harlem-shake", tags: ["meme", "fake"] },
  { name: "Nyan Cat Progress Bar", type: "tool", desc: "Terminal progress bar with Nyan Cat.", url: "https://github.com/ikatyang/nyancat", tags: ["terminal", "funny"] },
  { name: "CMatrix", type: "tool", desc: "Matrix-style falling code in terminal.", url: "https://github.com/abishekvashok/cmatrix", tags: ["terminal", "visual"] },
  { name: "asciiquarium", type: "tool", desc: "Animated aquarium in your terminal.", url: "https://github.com/cmatsuoka/asciiquarium", tags: ["ascii", "animation"] },
  { name: "Hollywood", type: "tool", desc: "Fake tech movie terminal simulator.", url: "https://github.com/dustinkirkland/hollywood", tags: ["fake", "terminal"] },
  { name: "Bastet", type: "tool", desc: "Tetris with intentionally evil blocks.", url: "https://github.com/fph/bastet", tags: ["tetris", "evil"] },
  { name: "No More Secrets", type: "tool", desc: "Sneakers-style decryption effect.", url: "https://github.com/bartobri/no-more-secrets", tags: ["terminal", "effect"] },
  { name: "Oneko", type: "tool", desc: "Little cat chases your cursor.", url: "https://github.com/mmis1000/oneko.js", tags: ["cat", "desktop"] },
  { name: "Clippy.js", type: "tool", desc: "Bring back Microsoft Clippy assistant.", url: "https://github.com/smore-inc/clippy.js", tags: ["retro", "browser"] },
  { name: "Meme Generator", type: "tool", desc: "Generate memes with template images.", url: "https://github.com/jacebrowning/memegen", tags: ["meme", "image"] },
  { name: "wttr.in", type: "tool", desc: "Weather in terminal with ASCII art.", url: "https://github.com/chubin/wttr.in", tags: ["terminal", "weather"] },
  { name: "Toilet", type: "tool", desc: "Colorful ASCII text banners.", url: "https://github.com/cacalabs/toilet", tags: ["ascii", "text"] },
  { name: "Figlet", type: "tool", desc: "Classic command line big letters.", url: "https://github.com/cmatsuoka/figlet", tags: ["ascii", "classic"] },
  { name: "Ponysay", type: "tool", desc: "Cowsay, but with ponies.", url: "https://github.com/erkin/ponysay", tags: ["terminal", "pony"] },
  { name: "Cowsay", type: "tool", desc: "Talking ASCII cow for your messages.", url: "https://github.com/tnalpgge/rank-amateur-cowsay", tags: ["ascii", "terminal"] },
  { name: "Fortune", type: "tool", desc: "Print random quotes and jokes.", url: "https://github.com/shlomif/fortune-mod", tags: ["quotes", "random"] },
  { name: "Star Wars Ascii", type: "tool", desc: "ASCII Star Wars animation project.", url: "https://github.com/nlepage/starwars-ascii", tags: ["ascii", "movie"] },
  { name: "pomo", type: "tool", desc: "Pomodoro timer for terminal hackers.", url: "https://github.com/eliangcs/pomo", tags: ["productivity", "terminal"] },
  { name: "BongoCat", type: "tool", desc: "Bongo cat keyboard visualizer.", url: "https://github.com/ayangweb/BongoCat", tags: ["cute", "keyboard"] },
  { name: "Aesthetic Wallpapers Bot", type: "tool", desc: "Generate random aesthetic wallpaper ideas.", url: "https://github.com/dharmx/wallhaven-cli", tags: ["wallpaper", "fun"] },
  { name: "lolcat", type: "tool", desc: "Rainbow colorizer for terminal output.", url: "https://github.com/busyloop/lolcat", tags: ["rainbow", "terminal"] },
  { name: "Powerline Shell Themes", type: "tool", desc: "Stylish and flashy terminal prompts.", url: "https://github.com/romkatv/powerlevel10k", tags: ["terminal", "themes"] },
  { name: "ASCII Doodle", type: "tool", desc: "Create tiny ASCII art doodles.", url: "https://github.com/jesseduffield/lazydocker", tags: ["ascii", "playful"] },
  { name: "Akinator API wrappers", type: "tool", desc: "Build your own mind-reading game bot.", url: "https://github.com/jgoralcz/akinator-api", tags: ["api", "bot"] },
  { name: "Text to Emoji Art", type: "tool", desc: "Convert text/images into emoji mosaic art.", url: "https://github.com/tomnomnom/gron", tags: ["emoji", "converter"] },
  { name: "Rubber Duck Debugger", type: "tool", desc: "Fun duck-themed debug companion apps.", url: "https://github.com/rubberduck-vba/Rubberduck", tags: ["debugging", "duck"] },
  { name: "Joke CLI", type: "tool", desc: "Fetch random jokes from APIs.", url: "https://github.com/15Dkatz/official_joke_api", tags: ["jokes", "api"] },
  { name: "Cookie Clicker Clones", type: "tool", desc: "Funny idle clicker experiments.", url: "https://github.com/doublespeakgames/adarkroom", tags: ["idle", "clicker"] },
  { name: "Fake Update Screen", type: "tool", desc: "Prank fullscreen fake OS updates.", url: "https://github.com/timvisee/sendprank", tags: ["prank", "fake"] },
  { name: "Morse Chat Toy", type: "tool", desc: "Encode/decode messages in Morse code.", url: "https://github.com/hadialqattan/morse-code-converter", tags: ["converter", "fun"] }
];

const cardGrid = document.getElementById("cardGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const randomBtn = document.getElementById("randomBtn");
const filterButtons = [...document.querySelectorAll(".filter-btn")];

let activeFilter = "all";

function filteredProjects() {
  const term = searchInput.value.trim().toLowerCase();

  return projects.filter((project) => {
    const filterOk = activeFilter === "all" || project.type === activeFilter;
    const text = `${project.name} ${project.desc} ${project.tags.join(" ")}`.toLowerCase();
    const searchOk = text.includes(term);
    return filterOk && searchOk;
  });
}

function renderCards() {
  const items = filteredProjects();

  resultCount.textContent = `${items.length} projects shown • ${projects.length} total`;

  if (!items.length) {
    cardGrid.innerHTML = `<article class="project card"><h3>No matches found</h3><p>Try a different search term or switch filters.</p></article>`;
    return;
  }

  cardGrid.innerHTML = items
    .map(
      (item) => `
      <article class="project card">
        <h3>${item.name}</h3>
        <span class="type">${item.type === "game" ? "🎮 Game" : "😂 Funny Tool"}</span>
        <p>${item.desc}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">Open on GitHub →</a>
      </article>
    `
    )
    .join("");
}

searchInput.addEventListener("input", renderCards);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards();
  });
});

randomBtn.addEventListener("click", () => {
  const items = filteredProjects();
  if (!items.length) return;
  const pick = items[Math.floor(Math.random() * items.length)];
  window.open(pick.url, "_blank", "noopener");
});

renderCards();
