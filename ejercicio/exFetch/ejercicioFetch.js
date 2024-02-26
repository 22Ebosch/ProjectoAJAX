function fetchUserInfo() {
    const username = document.getElementById('usernameInput').value;

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userInfoDiv = document.getElementById('userInfo');
            userInfoDiv.innerHTML = `
                <h2>${data.login}</h2>
                <img src="${data.avatar_url}" alt="Avatar" style="width: 100px; height: 100px;">
                <p>Public Repositories: ${data.public_repos}</p>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
