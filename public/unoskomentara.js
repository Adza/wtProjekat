function get_previoussibling(n){
    x=n.previousSibling;

    while (x.nodeType != 1){
      x=x.previousSibling;
    }
    return x;
}

function get_nextsibling(n){
    x=n.nextSibling;
    while ( x != null && x.nodeType!=1){
      x=x.nextSibling;
    }
    return x;
}

function MoveUp(){
    var table, row = this.parentNode;
    while ( row != null) {
        if ( row.nodeName == 'TR' ) {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    if(document.getElementsByTagName("tr")[1] != row){
    table.insertBefore (row, get_previoussibling(row));
  }
}

function MoveDown(){
    var table, row = this.parentNode;

    while ( row != null ) {
        if ( row.nodeName == 'TR' ) {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    table.insertBefore ( row, get_nextsibling ( get_nextsibling( row ) ) );
}
