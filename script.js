const categories = [
  "Algebra", "Geometry", "Calculus", "Statistics",
  "Trigonometry", "Number Theory", "Linear Algebra", "Finance Maths"
];

const toolNames = [
  "Solver", "Simplifier", "Generator", "Visualizer", "Calculator",
  "Explorer", "Analyzer", "Converter", "Comparator", "Optimizer"
];

const descriptions = [
  "Fast and precise computation for daily math workflows.",
  "Interactive helper for learning and problem solving.",
  "Realtime output with clean futuristic interface.",
  "Great for students, teachers, and professionals.",
  "Built for speed, clarity, and accuracy."
];

const tools = Array.from({ length: 200 }, (_, i) => {
  const category = categories[i % categories.length];
  const name = `${category} ${toolNames[i % toolNames.length]} ${String(i + 1).padStart(3, "0")}`;
  return {
    id: i + 1,
    name,
    category,
    description: descriptions[i % descriptions.length]
  };
});

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const toolGrid = document.getElementById("toolGrid");
const cardTemplate = document.getElementById("cardTemplate");
const resultsText = document.getElementById("resultsText");

for (const category of categories) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.append(option);
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = tools.filter((tool) => {
    const matchesSearch = !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  toolGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (const tool of filtered) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector("h3").textContent = tool.name;
    card.querySelector(".category").textContent = tool.category;
    card.querySelector(".desc").textContent = tool.description;
    card.querySelector("button").addEventListener("click", () => {
      alert(`${tool.name} is coming online soon in MathVerse.`);
    });
    fragment.append(card);
  }

  toolGrid.append(fragment);
  resultsText.textContent = `Showing ${filtered.length} tools`;
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
render();
