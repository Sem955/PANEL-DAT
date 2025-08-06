// admin.js

const allowedAdminEmail = "admin@domain.com";

async function initAdminPanel() { const { data: { user }, error } = await supabase.auth.getUser();

if (error || !user) { alert("Silakan login terlebih dahulu."); return location.href = "../index.html"; }

if (user.email !== allowedAdminEmail) { alert("Kamu bukan admin!"); return location.href = "../index.html"; }

document.getElementById("adminEmail").textContent = user.email; await loadUsers(); await loadWithdraws(); }

async function loadUsers() { const { data, error } = await supabase.from("users").select("email, name, phone, total_rewards, last_claim");

if (error) return alert("Gagal mengambil data user: " + error.message);

const tbody = document.getElementById("userList"); tbody.innerHTML = "";

data.forEach(user => { const tr = document.createElement("tr"); tr.innerHTML = <td>${user.name}</td> <td>${user.email}</td> <td>${user.phone}</td> <td>${user.total_rewards || 0}</td> <td>${user.last_claim ? new Date(user.last_claim).toLocaleString() : "-"}</td>; tbody.appendChild(tr); }); }

async function loadWithdraws() { const { data, error } = await supabase.from("withdraws").select("email, jumlah, nomor_dana, created_at").order("created_at", { ascending: false });

if (error) return alert("Gagal mengambil withdraws: " + error.message);

const tbody = document.getElementById("withdrawList"); tbody.innerHTML = "";

data.forEach(item => { const tr = document.createElement("tr"); tr.innerHTML = <td>${item.email}</td> <td>${item.jumlah}</td> <td>${item.nomor_dana}</td> <td>${new Date(item.created_at).toLocaleString()}</td>; tbody.appendChild(tr); }); }

initAdminPanel();

  
