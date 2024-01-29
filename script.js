$(document).ready(function () {
    let login_response = [];
    $('#login_button').click(function (event) {
        event.preventDefault(); // ป้องกันการ submit แบบฟอร์มแบบปกติ

        $.ajax({
            url: 'https://dummyjson.com/auth/login',
            type: 'POST',
            dataType: "json",
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function (response) {
                let token = [];
                login_response = response;
                token = login_response.token;
                alert('Login successful');
                if (response) {
                    login_success(token);
                }

            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                alert('Error in login');
            }
        });

    });

    function login_success(token) {
        $.ajax({
            url: 'https://dummyjson.com/auth/me',
            type: 'GET',
            dataType: "json",
            headers: {
                'Authorization': token,
            },
            success: function (response) {
                let firstName = [];
                let responseString = JSON.stringify(response, null, 2);
                firstName = response;
                console.log("firstName: ", responseString);
                alert('GET successful');
                window.location.href = 'login_success.html';
                localStorage.setItem('firstName', firstName.firstName); // เก็บ firstName ใน Local Storage
                
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                alert('GET error');
            }
        });

    }
});