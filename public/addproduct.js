$(() => {
    $.get('/vendor', (data) => {
        for (let vendor of data) {
            $('#vendors').append($("<option />").val(vendor.id).text(vendor.name));        
        }
    })
    
    function refreshList() {      
        $.get('/product', (data) => {
          $('#productlist').empty()
          $('#productlist').append(
            `<tr>
            <th>Name</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Quantity&nbsp&nbsp</th>
            </tr>`
          )
          for (let product of data) {          
            var table = document.getElementById("productlist");
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            let xBtn = document.createElement('button')
            xBtn.innerText = 'X'
            xBtn.onclick = function(event){
              let  productname=event.target.parentElement.childNodes[0].innerText;
              $.ajax({
                url: '/deleteproduct',
                type: 'DELETE',
                data: {"productname" : productname},
                success: function(result) {
                  if (result.success) {
                    refreshList()
                  } else {
                    alert('Some error occurred')
                  }
                }
            })
            }
            cell1.innerText = product.name;
            cell2.innerText = product.price;
            cell3.innerText = product.vendorname;
            cell4.innerText = product.qty;
            row.appendChild(xBtn);       
      }
    })
  }

      refreshList()

      $('#addproduct').click(() => {
        if($.trim( $('#productname').val())==''){
          window.alert("Enter Product Name")
      }
      
      else if ($.trim( $('#price').val())==''){
        window.alert("Enter Product Price")
      }

      else if ($.trim( $('#qty').val())==''){
        window.alert("Enter Product Quantity")
      }
      else if(parseInt($('#qty').val())<1){
        window.alert("Wrong Product Quantity")
      }
      else{
        $.post(
          '/product',
          {
            name: $('#productname').val(),
            price: $('#price').val(),
            qty: $('#qty').val(),
            vendorname: $('#vendors').find('option:selected').text(),
            vendorid: $('#vendors').val()
          },
          (data) => {
            if (data.success) {
              refreshList()
            } else {
              alert('Some error occurred')
            }
          }
        )
      }
       
      })
  })
  