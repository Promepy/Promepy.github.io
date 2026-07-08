const DEFAULT_API_BASE = "http://127.0.0.1:5000/api";
const STORAGE_KEYS = {
  apiBase: "todoApiBase",
  token: "todoAuthToken",
  user: "todoCurrentUser",
};

const elements = {
  apiForm: document.querySelector("#apiForm"),
  apiBase: document.querySelector("#apiBase"),
  registerForm: document.querySelector("#registerForm"),
  loginForm: document.querySelector("#loginForm"),
  logoutButton: document.querySelector("#logoutButton"),
  authSection: document.querySelector("#authSection"),
  todoSection: document.querySelector("#todoSection"),
  todoForm: document.querySelector("#todoForm"),
  todoList: document.querySelector("#todoList"),
  refreshButton: document.querySelector("#refreshButton"),
  responseMeta: document.querySelector("#responseMeta"),
  responseBody: document.querySelector("#responseBody"),
  userLabel: document.querySelector("#userLabel"),
};

let state = {
  apiBase: localStorage.getItem(STORAGE_KEYS.apiBase) || DEFAULT_API_BASE,
  token: localStorage.getItem(STORAGE_KEYS.token) || "",
  user: readStoredUser(),
};

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || "null");
  } catch (error) {
    return null;
  }
}

function saveAuth(token, user) {
  state.token = token;
  state.user = user;
  localStorage.setItem(STORAGE_KEYS.token, token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function clearAuth() {
  state.token = "";
  state.user = null;
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
}

function apiUrl(path) {
  return `${state.apiBase.replace(/\/$/, "")}${path}`;
}

function setResponse(method, path, status, body) {
  const ok = status >= 200 && status < 300;
  elements.responseMeta.textContent = `${method} ${path} -> HTTP ${status}`;
  elements.responseMeta.className = `response-meta ${ok ? "status-ok" : "status-error"}`;
  elements.responseBody.textContent = body ? JSON.stringify(body, null, 2) : "";
}

async function request(method, path, body, needsAuth = false) {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (needsAuth && state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  setResponse(method, path, response.status, data);

  if (!response.ok) {
    throw new Error(data?.error?.message || `HTTP ${response.status}`);
  }

  return data;
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function renderSession() {
  const isLoggedIn = Boolean(state.token && state.user);

  elements.authSection.hidden = isLoggedIn;
  elements.todoSection.hidden = !isLoggedIn;
  elements.logoutButton.hidden = !isLoggedIn;
  elements.userLabel.textContent = isLoggedIn
    ? `Logged in as ${state.user.displayName || state.user.userId}`
    : "";
}

function renderTodos(todos) {
  elements.todoList.innerHTML = "";

  if (!todos.length) {
    const empty = document.createElement("li");
    empty.className = "todo-item";
    empty.textContent = "No todos yet.";
    elements.todoList.append(empty);
    return;
  }

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark ${todo.title} complete`);
    checkbox.addEventListener("change", async () => {
      await request("PATCH", `/todos/${todo.id}`, { completed: checkbox.checked }, true);
      await loadTodos();
    });

    const content = document.createElement("div");
    const title = document.createElement("div");
    title.className = "todo-title";
    title.textContent = todo.title;
    content.append(title);

    if (todo.description) {
      const description = document.createElement("p");
      description.className = "todo-description";
      description.textContent = todo.description;
      content.append(description);
    }

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const deleteButton = document.createElement("button");
    deleteButton.className = "secondary danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await request("DELETE", `/todos/${todo.id}`, undefined, true);
      await loadTodos();
    });

    actions.append(deleteButton);
    item.append(checkbox, content, actions);
    elements.todoList.append(item);
  }
}

async function loadTodos() {
  const data = await request("GET", "/todos", undefined, true);
  renderTodos(data.todos);
}

elements.apiBase.value = state.apiBase;
renderSession();

if (state.token) {
  loadTodos().catch(() => {
    clearAuth();
    renderSession();
  });
}

elements.apiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.apiBase = elements.apiBase.value.trim().replace(/\/$/, "");
  localStorage.setItem(STORAGE_KEYS.apiBase, state.apiBase);
  setResponse("CONFIG", "apiBase", 200, { apiBase: state.apiBase });
});

elements.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body = formData(elements.registerForm);
  await request("POST", "/auth/register", body);
  elements.registerForm.reset();
});

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body = formData(elements.loginForm);
  const data = await request("POST", "/auth/login", body);
  saveAuth(data.token, data.user);
  elements.loginForm.reset();
  renderSession();
  await loadTodos();
});

elements.logoutButton.addEventListener("click", async () => {
  try {
    await request("POST", "/auth/logout", undefined, true);
  } finally {
    clearAuth();
    renderSession();
    renderTodos([]);
  }
});

elements.todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body = formData(elements.todoForm);
  await request("POST", "/todos", body, true);
  elements.todoForm.reset();
  await loadTodos();
});

elements.refreshButton.addEventListener("click", () => {
  loadTodos();
});
