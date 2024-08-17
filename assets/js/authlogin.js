$(document).ready(function() {
    $('#login_form').on('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        $.ajax({
            url: './backend/auth/login.php', 
            type: 'POST',
            data: $(this).serialize(), // Serialize the form data
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    alert(response.message);
                    // Redirect to another page, for example
                    window.location.href = './templates/index.php'; 
                } else {
                    alert(response.message);
                }
            },
            error: function() {
                alert('There was an error processing your request.');
            }
        });
    });
});