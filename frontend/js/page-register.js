document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const data = await api.register({ name, email, password });
      api.setToken(data.token);
      api.setUser({ _id: data._id, name: data.name, email: data.email });
      window.location.href = '/dashboard.html';
    } catch (err) {
      showAlert(document.getElementById('errorAlert'), err.message);
    }
  });
});
