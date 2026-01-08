async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 403) {
    // 🔥 User was blocked
    localStorage.removeItem("token");
    alert("Your account has been blocked by admin");
    window.location.href = "login.html";
    return;
  }

  return res;
}
