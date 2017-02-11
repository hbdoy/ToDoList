//Create close span btn
    $("#Content_todolist_ul li").each(function() {
        $span = document.createElement("SPAN");
        $txt = document.createTextNode("\u00D7");
        $span.className = "close";
        $span.appendChild($txt);
        this.appendChild($span);
    });

//Click close span btn
    $(".close").click(function() {
        event.stopPropagation();
        $target = this.parentElement;
        $id = $target.getAttribute('id');
        $data = JSON.stringify({ id: $id })
        $.ajax({
            type: "POST",
            // url: "/php/deleteTodo.php",
            url: "http://163.22.17.215/php/deleteTodo.php",
            datatype: "json",
            data: $data,
            success: function () {
                $target.className = 'del';
                $target.style.display = "none";
            }
        });
    });

    //Click on list
        $("#Content_todolist_ul li").click(function() {
            if(this.classList != 'checked'){
                this.classList.remove('todo');
                this.classList.toggle('checked');
                $id = this.getAttribute('id');
                $data = JSON.stringify({ id: $id, status: 1})
                $.ajax({
                    type: "POST",
                    url: "http://163.22.17.215/php/editTodo.php",
                    datatype: "json",
                    data: $data,
                    success: function () {
                    }
                });
            }else{
                this.classList.remove('checked');
                this.classList.toggle('todo');
                $id = this.getAttribute('id');
                $data = JSON.stringify({ id: $id, status: 0})
                $.ajax({
                    type: "POST",
                    url: "http://163.22.17.215/php/editTodo.php",
                    datatype: "json",
                    data: $data,
                    success: function () {
                    }
                });
            }
        });

    //Create new todo
        $("#Content_control_bar_container_btn").click(function() {
            $value = $("#Content_control_bar_container_input").val();
            if($value == ""){
                alert("Please type somthing to do!");
            }else{
                $data = JSON.stringify({ content: $value})
                $.ajax({
                    type: "POST",
                    url: "http://163.22.17.215/php/createTodo.php",
                    datatype: "json",
                    data: $data,
                    success: function(result) {
                        $object = $.parseJSON(result);
                        $newli = document.createElement("li");
                        $newli.setAttribute('class', 'todo');
                        $newli.setAttribute('id', $object.id);
                        $text = document.createTextNode($value);
                        $newli.appendChild($text);
                        $($newli).click(function() {
                            $li = this;
                            $id = $li.getAttribute('id');
                            if(this.classList != 'checked'){
                                $data = JSON.stringify({ id: $id, status: 1})
                                $.ajax({
                                    type: "POST",
                                    url: "http://163.22.17.215/php/editTodo.php",
                                    datatype: "json",
                                    data: $data,
                                    success: function (resultcode) {
                                        $li.classList.remove('todo');
                                        $li.classList.toggle('checked');
                                    }
                                });
                            }else{
                                $data = JSON.stringify({ id: $id, status: 0})
                                $.ajax({
                                    type: "POST",
                                    url: "http://163.22.17.215/php/editTodo.php",
                                    datatype: "json",
                                    data: $data,
                                    success: function (resultcode) {
                                        $li.classList.remove('checked');
                                        $li.classList.toggle('todo');
                                    }
                                });
                            }
                        });
                        $span = document.createElement("SPAN");
                        $txt = document.createTextNode("\u00D7");
                        $span.className = "close";
                        $span.appendChild($txt);
                        $($span).click(function() {
                            event.stopPropagation();
                            $target = this.parentElement;
                            $id = $target.getAttribute('id');
                            $data = JSON.stringify({ id: $id })
                            $.ajax({
                                type: "POST",
                                url: "http://163.22.17.215/php/deleteTodo.php",
                                datatype: "json",
                                data: $data,
                                success: function () {
                                    $target.className = 'del';
                                    $target.style.display = "none";
                                }
                            });
                        });
                        $newli.appendChild($span);
                        $("#Content_todolist_ul").append($newli);
                        $("#Content_control_bar_container_input").val("");
                    }
                });
            }
        });

    $("#Content_control_bar_container_input").keydown(function(e) {
        $value = $("#Content_control_bar_container_input").val();
        if($value == "" && e.keyCode == 13){
            alert("Please type somthing to do!");
        }else if(e.keyCode == 13 && $value != ""){
            $data = JSON.stringify({ content: $value})
            $.ajax({
                type: "POST",
                url: "http://163.22.17.215/php/createTodo.php",
                datatype: "json",
                data: $data,
                success: function(result) {
                    $object = $.parseJSON(result);
                    $newli = document.createElement("li");
                    $newli.setAttribute('class', 'todo');
                    $newli.setAttribute('id', $object.id);
                    $text = document.createTextNode($value);
                    $newli.appendChild($text);
                    $($newli).click(function() {
                        $li = this;
                        $id = $li.getAttribute('id');
                        if(this.classList != 'checked'){
                            $data = JSON.stringify({ id: $id, status: 1})
                            $.ajax({
                                type: "POST",
                                url: "http://163.22.17.215/php/editTodo.php",
                                datatype: "json",
                                data: $data,
                                success: function (resultcode) {
                                    $li.classList.remove('todo');
                                    $li.classList.toggle('checked');
                                }
                            });
                        }else{
                            $data = JSON.stringify({ id: $id, status: 0})
                            $.ajax({
                                type: "POST",
                                url: "http://163.22.17.215/php/editTodo.php",
                                datatype: "json",
                                data: $data,
                                success: function (resultcode) {
                                    $li.classList.remove('checked');
                                    $li.classList.toggle('todo');
                                }
                            });
                        }
                    });
                    $span = document.createElement("SPAN");
                    $txt = document.createTextNode("\u00D7");
                    $span.className = "close";
                    $span.appendChild($txt);
                    $($span).click(function() {
                        event.stopPropagation();
                        $target = this.parentElement;
                        $id = $target.getAttribute('id');
                        $data = JSON.stringify({ id: $id })
                        $.ajax({
                            type: "POST",
                            url: "http://163.22.17.215/php/deleteTodo.php",
                            datatype: "json",
                            data: $data,
                            success: function () {
                                $target.className = 'del';
                                $target.style.display = "none";
                            }
                        });
                    });
                    $newli.appendChild($span);
                    $("#Content_todolist_ul").append($newli);
                    $("#Content_control_bar_container_input").val("");
                }
            });
        }
    });

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
            if(tmp[i].className === 'checked'){
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
