$(() => {

   
    function createProductCard (product) {
        return $(`
    <div class="col-sm-4" style=" margin-bottom: 28px ;">
        <div class="card text-center" style=" box-shadow: 1px 1px 3px #888; border: 1px solid gray; vpadding: 10px;" >
        <div class="center" >
        </div>
        <div class="card-body">
            <h5 class="card-title" style="color:black;">${product.name}</h5>
            <p class="card-text" style="color:black;"><b>Rs. ${product.price}</b></p>
            <p class="card-text" style="color:black;">${product.vendorname}</p>
            <div class="text-center">
                <button class="btn btn-warning btn-lg btn-block " id="${product.id}">Buy</button> 
                </div>
            </div>
        </div>
        </div>`
            )
    }

    if(localStorage.getItem("uid")!=null){
      $('#login').prop('disabled', true); 
      $('#logout').prop('disabled', false);  
      $.post(
        '/user',
        {
          email: localStorage.getItem("uid")
        },
        (data) => {
            $.get('/product', (data) => {              
                let productList = $('#productlist')   
                productList.empty()
                for(product of data){
                    productList.append(createProductCard(product))
                }
                $("#productlist").on('click','button',function(){
                    $.post(
                        '/addtocart',
                        {
                          pid: this.id,
                          uid: localStorage.getItem("uid"),                                
                        },
                        (data) => {
                          if (data.success) {                                  
                          } else {
                            alert('Some error occurred')
                          }
                        }
                      )
                    window.alert("Product added to cart")
                })
            })
        }
      )
    }
    $('#login').click(() => {
        if($.trim( $('#email').val())==''){
            window.alert("Enter Email id")
        }
        else{
          $('#login').prop('disabled', true);
          $('#logout').prop('disabled', false);  
            localStorage.setItem("uid",$('#email').val());
            $.post(
                '/user',
                {
                  email: $('#email').val()
                },
                (data) => {
                    $.get('/product', (data) => {              
                        let productList = $('#productlist')   
                        productList.empty()
                        for(product of data){
                            productList.append(createProductCard(product))
                        }
                        $("#productlist").on('click','button',function(){
                            $.post(
                                '/addtocart',
                                {
                                  pid: this.id,
                                  uid: localStorage.getItem("uid"),                                
                                },
                                (data) => {
                                  if (data.success) {                                  
                                  } else {
                                    alert('Some error occurred')
                                  }
                                }
                              )
                            window.alert("Product added to cart")
                        })
                    })
                }
              )

        }
 
    })

    $('#logout').click(() => {
      $('#login').prop('disabled', false);
      $('#logout').prop('disabled', true);
      localStorage.clear();
      $("#productlist").html("");
    })
  
  })
  