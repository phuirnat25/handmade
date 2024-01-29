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
    $('#add_product').click(function (event) {
        event.preventDefault(); // ป้องกันการ submit แบบฟอร์มแบบปกติ
        alert('Click Add Product');
        add_product();
    });

    let product = [];
    $(document).on('click', '#add_products', function (event) {
        event.preventDefault(); // ป้องกันการ submit แบบฟอร์มแบบปกติ

        
        let titleValue = $('#textarea1').val(); // อ่านค่าจาก textarea

        if (titleValue.trim() === '') {
            alert('Please enter a title.');
            return; // หยุดการทำงานหากไม่มีข้อความใน textarea
        }

        $.ajax({
            url: 'https://dummyjson.com/products/1',
            type: 'PUT',
            dataType: "json",
            data: {
                title: titleValue
            },
            success: function (response) {
                alert('Click Add Product');
                if (response) {
                    let responseString = JSON.stringify(response, null, 2);
                    console.log("Add_Product: " + responseString);
                    show_product_when_add(response.title, response.images);
                }

            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                alert('Error in login');
            }
        });

    });


    function add_product() {
        let = addhtml = '';
        addhtml += `
        <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Textarea</label>
            </div>
          </div>
          <a class="btn-floating btn-large waves-effect waves-light red" id="add_products"><i class="material-icons">+</i></a>
        </form>
        <p class="flow-text">Add Product : <span id="show_product_when_add">Please Enter Product</span></p>
        </div>
        <div class="image">
            <img class="materialboxed" id="image01" width="650" src="">
        </div>
      `;
      let element = document.getElementById('show_add_product');
        if(element) {
            element.innerHTML = addhtml;
        } else {
            console.error('Element with ID "show_add_product" not found.');
        }
    
        // document.querySelector('.show_add_product').innerHTML = addhtml;
    }

    function show_product_when_add(title, image) {
        let element = document.getElementById('show_product_when_add');
        if(element) {
            element.innerHTML = title; // แสดง title ในองค์ประกอบ
        } else {
            console.error('Element with ID "show_product_when_add" not found.');
        }

        let images = document.getElementById('image01');
        if(images) {
            images.src = image[2];
        } else {
            console.error('Element with ID "image01" not found.');
        }
    
        // document.querySelector('.show_add_product').innerHTML = addhtml;
    }

    

    
});