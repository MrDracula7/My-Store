async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 403) {
    alert("Your account has been blocked by admin");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  return res.json();
}

setInterval(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}, 60000);

