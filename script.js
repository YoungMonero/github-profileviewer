function getProfile() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
  
    if (!username) {
      profileDiv.innerHTML = '<p>Please enter a GitHub username.</p>';
      return;
    }
  
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then(data => {
        profileDiv.innerHTML = `
          <div class="profile-card">
            <img src="${data.avatar_url}" alt="${data.login}'s avatar">
            <div class = 'profil-detail'>
              <h2>${data.name || data.login}</h2>
            <p>${data.bio || 'No bio available.'}</p>
          </div>
          <div class = 'data-ana'>
            <div class= 'data'>
              <div class = 'data-class'><h3>${data.followers}</h3> <p>Followers</P></div>
            </div>
            <div class= 'data'>
              <div class = 'data-class'><h3>${data.following}</h3> <p>Following</P></div>
            </div>
            <div class= 'data'>
              <div class = 'data-class'><h3>${data.public_repos}</h3> <p>Repository</P></div>
            </div>
          </div>
          <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
          
        `;
      })
      .catch(error => {
        profileDiv.innerHTML = `<p>User not found. Please try again.</p>`;
      });
  }
  