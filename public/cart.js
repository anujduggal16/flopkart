$(() => {
  
  if(localStorage.getItem("uid")!=null){
    
      $.post(
        '/login',
        {
          email: localStorage.getItem("uid")
        },
        (data) => { 
            if(data.success){
              $('#login').prop('disabled', true); 
              $('#logout').prop('disabled', false); 
                $.post(
                    '/getcart',
                    {
                      email:localStorage.getItem("uid")
                    },
                    (data) => {
                        $('#productlist').empty()
                        $('#productlist').append(
                          `<tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          </tr>`
                        )
                        if(data.result.length){
                          var total=0;
                          for(var product=0; product<data.result.length;product++){
                            var table = document.getElementById("productlist");
                            var row = table.insertRow();
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            cell1.innerText = (data.result2[product])[0].name
                            cell2.innerText = (data.result2[product])[0].price
                            cell4.innerText =(data.result2[product])[0].price * data.result[product].qty                                
                            cell3.innerText = data.result[product].qty;   
                            total = total + ((data.result2[product])[0].price * data.result[product].qty)                               
                          }
                          $('#total').html('Cart Total =  '+ total)
                        }
                        else
                       window.alert("Empty cart")
                    })

            }                       
            else
            {
            window.alert("Email doesnt exist")
            }
               
            } 
    )

  }

    $('#login').click(() => {
        if($.trim( $('#email').val())==''){
            window.alert("Enter Email id")
        }
        else{
            $.post(
                '/login',
                {
                  email: $('#email').val()
                },
                (data) => { 
                    if(data.success){
                      $('#login').prop('disabled', true);
                      $('#logout').prop('disabled', false);
                        localStorage.setItem("uid",$('#email').val());
                        $.post(
                            '/getcart',
                            {
                              email:localStorage.getItem("uid")
                            },
                            (data) => {
                                $('#productlist').empty()
                                $('#productlist').append(
                                  `<tr>
                                  <th>Name</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                                  </tr>`
                                )
                                if(data.result.length){
                                 var total=0;
                                  for(var product=0; product<data.result.length;product++){
                                    var table = document.getElementById("productlist");
                                    var row = table.insertRow();
                                    var cell1 = row.insertCell(0);
                                    var cell2 = row.insertCell(1);
                                    var cell3 = row.insertCell(2);
                                    var cell4 = row.insertCell(3);
                                    cell1.innerText = (data.result2[product])[0].name
                                    cell2.innerText = (data.result2[product])[0].price
                                    cell4.innerText =(data.result2[product])[0].price * data.result[product].qty                                
                                    cell3.innerText = data.result[product].qty;    
                                    total = total + ((data.result2[product])[0].price * data.result[product].qty)                         
                                  }
                                $('#total').html('Cart Total =  '+ total)
                                  
                                }
                                else
                               window.alert("Empty cart")
                            })

                    }                       
                    else
                    {
                    window.alert("Email doesnt exist")
                    }
                       
                    } 
            )                 
                }
              })

              $('#logout').click(() => {
                $('#login').prop('disabled', false);
                $('#logout').prop('disabled', true);
                localStorage.clear();
                $("#productlist").html("");
                $('#total').html("")
              })
        })
