$(document).ready(function() {
    $('#reg_form').on('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        $.ajax({
            url: './../backend/auth/authHandler.php', // The PHP file that handles the registration
            type: 'POST',
            data: $(this).serialize(), // Serialize the form data
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    alert(response.message);
                    $('#reg_form')[0].reset(); // Reset the form on success
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
