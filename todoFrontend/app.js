const DEFAULT_API_BASE = "http://127.0.0.1:5000/api";
const STORAGE_KEYS = {
  apiBase: "todoApiBase",
  token: "todoAuthToken",
  user: "todoCurrentUser",
  teachingSecret: "todoTeachingSecret",
};

const elements = {
  apiForm: document.querySelector("#apiForm"),
  apiBase: document.querySelector("#apiBase"),
  savedApiBase: document.querySelector("#savedApiBase"),
  openApiLink: document.querySelector("#openApiLink"),
  registerForm: document.querySelector("#registerForm"),
  loginForm: document.querySelector("#loginForm"),
  logoutButton: document.querySelector("#logoutButton"),
  authSection: document.querySelector("#authSection"),
  todoSection: document.querySelector("#todoSection"),
  todoForm: document.querySelector("#todoForm"),
  todoList: document.querySelector("#todoList"),
  refreshButton: document.querySelector("#refreshButton"),
  teachingSecret: document.querySelector("#teachingSecret"),
  resetButton: document.querySelector("#resetButton"),
  seedButton: document.querySelector("#seedButton"),
  snapshotButton: document.querySelector("#snapshotButton"),
  requestLogButton: document.querySelector("#requestLogButton"),
  clearLogButton: document.querySelector("#clearLogButton"),
  scenarioButtons: document.querySelectorAll(".scenario-button"),
  responseMeta: document.querySelector("#responseMeta"),
  requestBody: document.querySelector("#requestBody"),
  responseBody: document.querySelector("#responseBody"),
  statusBadge: document.querySelector("#statusBadge"),
  requestHistory: document.querySelector("#requestHistory"),
  userLabel: document.querySelector("#userLabel"),
};

let state = {
  apiBase: localStorage.getItem(STORAGE_KEYS.apiBase) || DEFAULT_API_BASE,
  token: localStorage.getItem(STORAGE_KEYS.token) || "",
  user: readStoredUser(),
  teachingSecret: localStorage.getItem(STORAGE_KEYS.teachingSecret) || "classroom-secret",
  history: [],
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

function updateConnectionDisplay() {
  const base = state.apiBase.replace(/\/$/, "");
  elements.apiBase.value = base;
  elements.savedApiBase.textContent = `Saved base URL: ${base}`;
  elements.openApiLink.href = `${base}/openapi.json`;
}

function statusFamily(status) {
  if (status >= 200 && status < 300) return "2xx";
  if (status >= 300 && status < 400) return "3xx";
  if (status >= 400 && status < 500) return "4xx";
  if (status >= 500) return "5xx";
  return "unknown";
}

function maskedHeaders(headers) {
  const copy = { ...headers };

  if (copy.Authorization) {
    copy.Authorization = "Bearer <masked-token>";
  }

  return copy;
}

function renderInspector(entry) {
  const family = statusFamily(entry.response.status);
  const ok = entry.response.status >= 200 && entry.response.status < 300;

  elements.responseMeta.textContent = `${entry.request.method} ${entry.request.path} -> HTTP ${entry.response.status}`;
  elements.responseMeta.className = `response-meta ${ok ? "status-ok" : "status-error"} status-${family}`;
  elements.statusBadge.textContent = `HTTP ${entry.response.status}`;
  elements.statusBadge.className = `status-badge family-${family}`;
  elements.requestBody.textContent = JSON.stringify(entry.request, null, 2);
  elements.responseBody.textContent = JSON.stringify(entry.response, null, 2);
  renderHistory();
}

function renderHistory() {
  elements.requestHistory.innerHTML = "";

  for (const entry of state.history.slice(0, 10)) {
    const item = document.createElement("li");
    item.textContent = `${entry.request.method} ${entry.request.path} -> ${entry.response.status}`;
    elements.requestHistory.append(item);
  }
}

function recordSyntheticRequest(method, path, status, body) {
  const entry = {
    request: {
      method,
      path,
      url: path,
      headers: {},
      body: null,
    },
    response: {
      status,
      headers: {},
      body,
    },
  };
  state.history.unshift(entry);
  renderInspector(entry);
}

async function request(method, path, body, needsAuth = false, options = {}) {
  const headers = { ...(options.headers || {}) };
  let requestBody;

  if (body !== undefined) {
    headers["Content-Type"] = options.contentType || "application/json";
    requestBody = options.rawBody === true ? body : JSON.stringify(body);
  }

  if (needsAuth && state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const fullUrl = apiUrl(path);
  const requestRecord = {
    method,
    path,
    url: fullUrl,
    headers: maskedHeaders(headers),
    body: body === undefined ? null : body,
  };

  let response;
  let data = null;
  let text = "";

  try {
    response = await fetch(fullUrl, {
      method,
      headers,
      body: requestBody,
      redirect: options.redirect || "follow",
    });

    text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    const failedEntry = {
      request: requestRecord,
      response: {
        status: 0,
        headers: {},
        body: {
          error: {
            code: "network_or_parse_error",
            message: error.message,
          },
        },
      },
    };
    state.history.unshift(failedEntry);
    renderInspector(failedEntry);
    throw error;
  }

  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  const entry = {
    request: requestRecord,
    response: {
      status: response.status,
      headers: responseHeaders,
      body: data,
    },
  };

  state.history.unshift(entry);
  renderInspector(entry);

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
    checkbox.addEventListener("change", () => {
      runAction(async () => {
        await request("PATCH", `/todos/${todo.id}`, { completed: checkbox.checked }, true);
        await loadTodos();
      });
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
    deleteButton.addEventListener("click", () => {
      runAction(async () => {
        await request("DELETE", `/todos/${todo.id}`, undefined, true);
        await loadTodos();
      });
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

async function runAction(action) {
  try {
    await action();
  } catch (error) {
    console.warn(error.message);
  }
}

function saveTeachingSecret() {
  state.teachingSecret = elements.teachingSecret.value;
  localStorage.setItem(STORAGE_KEYS.teachingSecret, state.teachingSecret);
}

function teachingHeaders(extra = {}) {
  saveTeachingSecret();
  return {
    "X-Teaching-Secret": state.teachingSecret,
    ...extra,
  };
}

function scenarioBody(button) {
  if (!button.dataset.body) {
    return undefined;
  }

  try {
    return JSON.parse(button.dataset.body);
  } catch (error) {
    return undefined;
  }
}

updateConnectionDisplay();
elements.teachingSecret.value = state.teachingSecret;
renderSession();

if (state.token) {
  runAction(async () => {
    await loadTodos();
  });
}

elements.apiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.apiBase = elements.apiBase.value.trim().replace(/\/$/, "");
  localStorage.setItem(STORAGE_KEYS.apiBase, state.apiBase);
  updateConnectionDisplay();
  recordSyntheticRequest("CONFIG", "apiBase", 200, { apiBase: state.apiBase });
});

elements.registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runAction(async () => {
    const body = formData(elements.registerForm);
    await request("POST", "/auth/register", body);
    elements.registerForm.reset();
  });
});

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runAction(async () => {
    const body = formData(elements.loginForm);
    const data = await request("POST", "/auth/login", body);
    saveAuth(data.token, data.user);
    elements.loginForm.reset();
    renderSession();
    await loadTodos();
  });
});

elements.logoutButton.addEventListener("click", () => {
  runAction(async () => {
    try {
      await request("POST", "/auth/logout", undefined, true);
    } finally {
      clearAuth();
      renderSession();
      renderTodos([]);
    }
  });
});

elements.todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runAction(async () => {
    const body = formData(elements.todoForm);
    await request("POST", "/todos", body, true);
    elements.todoForm.reset();
    await loadTodos();
  });
});

elements.refreshButton.addEventListener("click", () => {
  runAction(loadTodos);
});

elements.scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    runAction(async () => {
      const headers = {};

      if (button.dataset.ifNoneMatch) {
        headers["If-None-Match"] = button.dataset.ifNoneMatch;
      }

      await request(
        button.dataset.method,
        button.dataset.path,
        scenarioBody(button),
        button.dataset.auth === "true",
        {
          headers,
          redirect: button.dataset.path.includes("302-latest-docs") ? "manual" : "follow",
        },
      );
    });
  });
});

elements.resetButton.addEventListener("click", () => {
  runAction(async () => {
    await request("POST", "/teaching/reset", { userId: "student1" }, false, {
      headers: teachingHeaders(),
    });
  });
});

elements.seedButton.addEventListener("click", () => {
  runAction(async () => {
    await request(
      "POST",
      "/teaching/seed",
      {
        userId: "student1",
        password: "password123",
        displayName: "Student One",
        todos: [
          {
            title: "Learn APIs",
            description: "Created by the seed endpoint.",
          },
          {
            title: "Learn HTTP status codes",
            description: "Inspect status codes in Postman and the UI.",
          },
        ],
      },
      false,
      { headers: teachingHeaders() },
    );
  });
});

elements.snapshotButton.addEventListener("click", () => {
  runAction(async () => {
    await request("GET", "/teaching/snapshot?userId=student1", undefined, false, {
      headers: teachingHeaders(),
    });
  });
});

elements.requestLogButton.addEventListener("click", () => {
  runAction(async () => {
    await request("GET", "/teaching/request-log", undefined, false, {
      headers: teachingHeaders(),
    });
  });
});

elements.clearLogButton.addEventListener("click", () => {
  runAction(async () => {
    await request("DELETE", "/teaching/request-log", undefined, false, {
      headers: teachingHeaders(),
    });
  });
});
