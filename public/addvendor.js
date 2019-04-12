$(() => {

  function refreshList() {
    $.get('/vendor', (data) => {
      $('#vendorlist').empty()
      $('#vendorlist').append(
        `<tr>
        <th>VendorName&nbsp&nbsp</th>
        </tr>`
      )
      for (let vendor of data) {
        var table = document.getElementById("vendorlist");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        let xBtn = document.createElement('button')
        xBtn.innerText = 'X'
        xBtn.onclick = function(event){
          let vendorName = event.target.parentElement.childNodes[0].innerText
          $.ajax({
            url: '/deletevendor',
            type: 'DELETE',
            data: {"vendorname" : vendorName},
            success: function(result) {
              if (result.success) {
                refreshList()
              } else {
                alert('Some error occurred')
              }
            }
        })
        }
        cell1.innerText = vendor.name;
        row.appendChild(xBtn);  
      }
    })
  }

  refreshList()

  $('#addvendor').click(() => {
    if($.trim( $('#vendorname').val())==''){
      window.alert("Enter Vendor Name")
  }
  else{
    $.post(
      '/vendor',
      {
        name: $('#vendorname').val()
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
