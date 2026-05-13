document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  translatePage();
  document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    try {
      const data = await api.forgotPassword({ email });
      showAlert(document.getElementById('successAlert'), data.message, 'success');
      hideAlert(document.getElementById('errorAlert'));
    } catch (err) {
      showAlert(document.getElementById('errorAlert'), err.message);
    }
  });
});
