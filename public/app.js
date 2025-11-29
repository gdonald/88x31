const PAGE_SIZE = 100;
const iconEntries = icons.map((name) => { return { name, lower: name.toLowerCase() }; });
const imageBase = "./i";
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const meta = document.getElementById("meta");
const pagination = document.getElementById("pagination");
const total = iconEntries.length;
let filtered = iconEntries;
let currentPage = 1;

const updateMeta = (visible) => {
  meta.textContent = `Showing ${visible} of ${filtered.length} (total ${total})`;
};

const renderIcons = (page) => {
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = filtered.slice(start, end);
  slice.forEach(({ name }) => {
    const figure = document.createElement("figure");
    figure.className = "icon";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = `${imageBase}/${encodeURIComponent(name)}`;
    img.alt = name;

    const caption = document.createElement("figcaption");
    caption.textContent = name;

    figure.append(img, caption);
    fragment.appendChild(figure);
  });
  grid.appendChild(fragment);
  updateMeta(slice.length);
};

const renderPagination = (page, totalPages) => {
  pagination.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const addButton = (label, targetPage) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      currentPage = targetPage;
      renderPage();
    });
    fragment.appendChild(btn);
  };

  if (totalPages <= 1) {
    pagination.appendChild(fragment);
    return;
  }

  if (page > 1) {
    addButton("Start", 1);
    addButton("Back", page - 1);
  }

  const startPage = Math.max(1, page - 3);
  const endPage = Math.min(totalPages, page + 3);

  for (let i = startPage; i <= endPage; i++) {
    if (i === page) {
      const span = document.createElement("span");
      span.className = "current";
      span.textContent = i;
      fragment.appendChild(span);
    } else {
      addButton(String(i), i);
    }
  }

  if (page < totalPages) {
    addButton("Next", page + 1);
    addButton("End", totalPages);
  }

  pagination.appendChild(fragment);
};

const renderPage = () => {
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
  renderIcons(currentPage);
  renderPagination(currentPage, totalPages);
};

const filter = () => {
  const query = search.value.trim().toLowerCase();
  if (!query) {
    filtered = iconEntries;
  } else {
    filtered = iconEntries.filter((entry) => entry.lower.includes(query));
  }
  currentPage = 1;
  renderPage();
};

search.addEventListener("input", filter);
renderPage();
