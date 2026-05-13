document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar('profile');
  translatePage();
  const user = api.getUser();
  if (!user) {
    window.location.href = '/login.html';
    return;
  }
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profileInitials').textContent = getInitials(user.name);
  document.getElementById('profileAvatar').textContent = getInitials(user.name);
  document.getElementById('displayName').value = user.name;
  document.getElementById('displayEmail').value = user.email;
  document.getElementById('memberSince').textContent = user.createdAt ? `Member since ${formatDate(user.createdAt)}` : '';

  try {
    const profile = await api.getProfile();
    if (profile) api.setUser(profile);
  } catch (e) {
    // ignore
  }

  const resumes = await api.getResumes();
  document.getElementById('totalResumesCount').textContent = resumes.length;
});
