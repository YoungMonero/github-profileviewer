
export function getProfile () {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');

  if (!username) {
    profileDiv.innerHTML = '<p>Please enter a GitHub username.</p>';
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(data => {
      profileDiv.innerHTML = `
        <div class="profile-card">
          <img src="${data.avatar_url}" alt="${data.login}'s avatar">
          <div class="profil-detail">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || 'No bio available.'}</p>
          </div>
          <div class="data-ana">
            <div class="data">
              <div class="data-class"><h3>${data.followers}</h3> <p>Followers</p></div>
            </div>
            <div class="data">
              <div class="data-class"><h3>${data.following}</h3> <p>Following</p></div>
            </div>
            <div class="data">
              <div class="data-class"><h3>${data.public_repos}</h3> <p>Repository</p></div>
            </div>
          </div>
          <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        </div>
      `;
    })
    .catch(error => {
      // Properly handle/log the error
      console.error('Error fetching profile:', error);
      profileDiv.innerHTML = `<p>${error.message || 'User not found. Please try again.'}</p>`;
    });
}
