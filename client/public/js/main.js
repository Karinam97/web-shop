function logout() {
    // Send a logout request to the server
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Receive the HTML content from the response
        return response.text()
    })
    .then(htmlContent => {
        // Update the current page's content with the received HTML content
        document.documentElement.innerHTML = htmlContent

        // Modify the URL to remove "/logout" from the path
        history.replaceState({}, '', '/')
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
