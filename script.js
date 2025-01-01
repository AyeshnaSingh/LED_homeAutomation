document.getElementById('toggleLight').addEventListener('click', function() {
    fetch('/toggle-light')
        .then(response => response.json())
        .then(data => {
            document.getElementById('status').innerText = data.status;
        });
});
