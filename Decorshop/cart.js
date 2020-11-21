function deleteItem(item) {
    var i = item.parentNode.parentNode.rowIndex;
    document.getElementById("cart-table").deleteRow(i);
}

function countItem(item){
    var x = parseInt(document.getElementById("count1").value);
    var fee = parseInt(document.getElementById("giaItem1").value);
    var cost = fee*x;
    document.getElementById("price-item1").innerHTML = cost+"" ;
}


