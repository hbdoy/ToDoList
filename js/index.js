//Create close span btn
$("#list_ul li").each(function() {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    this.appendChild(span);
});

//Click close span btn
$(".close").click(function() {
    event.stopPropagation();
    let target = this.parentElement;
    let id = target.getAttribute('id');
    let data = JSON.stringify({ id: id })
    $.ajax({
        type: "POST",
            // url: "/php/deleteTodo.php",
            url: "http://163.22.17.215/php/deleteTodo.php",
            datatype: "json",
            data: data,
            success: function () {
                target.className = 'del';
                target.style.display = "none";
            }
        });
});

//Click on list
$("#list_ul li").click(function() {
    if(this.classList != 'checked'){
        this.classList.remove('todo');
        this.classList.toggle('checked');
        let id = this.getAttribute('id');
        let data = JSON.stringify({ id: id, status: 1})
        $.ajax({
            type: "POST",
            url: "http://163.22.17.215/php/editTodo.php",
            datatype: "json",
            data: data,
            success: function () {
            }
        });
    }else{
        this.classList.remove('checked');
        this.classList.toggle('todo');
        let id = this.getAttribute('id');
        let data = JSON.stringify({ id: id, status: 0})
        $.ajax({
            type: "POST",
            url: "http://163.22.17.215/php/editTodo.php",
            datatype: "json",
            data: data,
            success: function () {
            }
        });
    }
});

//Create new todo by add
$("#Commit_add").click(function() {
    let value = $("#Commit_input").val();
    if(value == ""){
        alert("Please type somthing to do!");
    }else{
        let data = JSON.stringify({ content: value})
        $.ajax({
            type: "POST",
            url: "http://163.22.17.215/php/createTodo.php",
            datatype: "json",
            data: data,
            success: function(result) {
                let object = JSON.parse(result);
                let newli = document.createElement("li");
                newli.setAttribute('class', 'todo');
                newli.setAttribute('id', object.id);
                let text = document.createTextNode(value);
                newli.appendChild(text);
                $(newli).click(function() {
                    let li = this;
                    let id = this.getAttribute('id');
                    if(this.classList != 'checked'){
                        let data = JSON.stringify({ id: id, status: 1})
                        $.ajax({
                            type: "POST",
                            url: "http://163.22.17.215/php/editTodo.php",
                            datatype: "json",
                            data: data,
                            success: function (resultcode) {
                                li.classList.remove('todo');
                                li.classList.toggle('checked');
                            }
                        });
                    }else{
                        let data = JSON.stringify({ id: id, status: 0})
                        $.ajax({
                            type: "POST",
                            url: "http://163.22.17.215/php/editTodo.php",
                            datatype: "json",
                            data: data,
                            success: function (resultcode) {
                                li.classList.remove('checked');
                                li.classList.toggle('todo');
                            }
                        });
                    }
                });
                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                $(span).click(function() {
                    event.stopPropagation();
                    let target = this.parentElement;
                    let id = target.getAttribute('id');
                    let data = JSON.stringify({ id: id })
                    $.ajax({
                        type: "POST",
                        url: "http://163.22.17.215/php/deleteTodo.php",
                        datatype: "json",
                        data: data,
                        success: function () {
                            target.className = 'del';
                            target.style.display = "none";
                        }
                    });
                });
                newli.appendChild(span);
                $("#list_ul").append(newli);
                $("#Commit_input").val("");
            }
        });
    }
});

//Create new todo by enter
$("#Commit_input").keydown(function(e) {
    let value = $("#Commit_input").val();
    if(value == "" && e.keyCode == 13){
        alert("Please type somthing to do!");
    }else if(e.keyCode == 13 && value != ""){
        let data = JSON.stringify({ content: value})
        $.ajax({
            type: "POST",
            url: "http://163.22.17.215/php/createTodo.php",
            datatype: "json",
            data: data,
            success: function(result) {
                let object = JSON.parse(result);
                let newli = document.createElement("li");
                newli.setAttribute('class', 'todo');
                newli.setAttribute('id', object.id);
                let text = document.createTextNode(value);
                newli.appendChild(text);
                $(newli).click(function() {
                    let li = this;
                    let id = this.getAttribute('id');
                    if(this.classList != 'checked'){
                        let data = JSON.stringify({ id: id, status: 1})
                        $.ajax({
                            type: "POST",
                            url: "http://163.22.17.215/php/editTodo.php",
                            datatype: "json",
                            data: data,
                            success: function (resultcode) {
                                li.classList.remove('todo');
                                li.classList.toggle('checked');
                            }
                        });
                    }else{
                        let data = JSON.stringify({ id: id, status: 0})
                        $.ajax({
                            type: "POST",
                            url: "http://163.22.17.215/php/editTodo.php",
                            datatype: "json",
                            data: data,
                            success: function (resultcode) {
                                li.classList.remove('checked');
                                li.classList.toggle('todo');
                            }
                        });
                    }
                });
                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                $(span).click(function() {
                    event.stopPropagation();
                    let target = this.parentElement;
                    let id = target.getAttribute('id');
                    let data = JSON.stringify({ id: id })
                    $.ajax({
                        type: "POST",
                        url: "http://163.22.17.215/php/deleteTodo.php",
                        datatype: "json",
                        data: data,
                        success: function () {
                            target.className = 'del';
                            target.style.display = "none";
                        }
                    });
                });
                newli.appendChild(span);
                $("#list_ul").append(newli);
                $("#Commit_input").val("");
            }
        });
    }
});

//Select buttons
$("#All").click(function() {
    const tmp = $('li');
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'ActHide'){
            tmp[i].style.display = '';
            tmp[i].className = 'todo';
        }else if(tmp[i].className === 'ComHide'){
            tmp[i].style.display = '';
            tmp[i].className = 'checked';
        }
    }
});

$("#Active").click(function() {
    const tmp = $('li');
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'ActHide'){
            tmp[i].style.display = '';
            tmp[i].className = 'todo';
        }
    }
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'checked'){
            tmp[i].style.display = 'none';
            tmp[i].className = 'ComHide';
        }
    }
});

$("#Completed").click(function() {
    const tmp = $('li');
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'ComHide'){
            tmp[i].style.display = '';
            tmp[i].className = 'checked';
        }
    }
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'todo'){
            tmp[i].style.display = 'none';
            tmp[i].className = 'ActHide';
        }
    }
});

$("#Clear").click(function() {
    const tmp = $('li');
    for(let i=0; i<tmp.length; i++){
        if(tmp[i].className === 'checked' || tmp[i].className === 'ComHide'){
            event.stopPropagation();
                // $target = tmp[i];
                let id = tmp[i].getAttribute('id');
                let data = JSON.stringify({ id: id })
                $.ajax({
                    type: "POST",
                    // url: "/php/deleteTodo.php",
                    url: "http://163.22.17.215/php/deleteTodo.php",
                    datatype: "json",
                    data: data,
                    success: function () {
                        tmp[i].style.display = "none";
                        tmp[i].className = 'del';
                    }
                });
            }
        }
    });
