// use
var app =  {
    $wrapper :  $wrapper = document.querySelector('#wrapper'),
    init : init,
};
//customer가 사이트 사용
var customer = {
    join_form : join_form,
    join : join,
    login_form : login_form,
    login : login,
    mypage_form : mypage_form,
    mypage : mypage,
    count : count,
    update_form : update_form,
    update : update,
    remove : remove,
    
};

var employee ={
    login : login,
    customer_list : customer_list,
    admin_login : admin_login,
    customer_list_form : customer_list_form,
    
};

var session = {
    set_value : set_value,
    get_value : get_value
};

// customerId, 
// customerName ,ssn,
// phone ,
// city ,
function customer_list_form(){
    return '<h2>고객 목록</h2>'
    +'<table id="customer-table">'
    +'  <tr>'
    +'    <th>아이디</th>'
    +'    <th>고객명</th>'
    +'    <th>주민번호</th>'
    +'    <th>전화번호</th>'
    +'    <th>도시</th>'
    +'  </tr><tbody id="tbody"></tbody>'
    +'</table>'
    
}

function set_value(x){
    sessionStorage.setItem(x.name,x.value);
}

function get_value(x){
    return sessionStorage.getItem(x);
}

    function init (){
        $wrapper.innerHTML = customer.login_form();
        document.querySelector('#join-btn')
            .addEventListener('click',()=>{
            $wrapper.innerHTML = customer.join_form();
        document.getElementById('confirm-btn').addEventListener('click',e=>{
                e.preventDefault();
                alert('조인버튼 클릭');
                customer.join();
            });
        });

        document.querySelector('#login-btn')
                    .addEventListener('click',e=>{
                    e.preventDefault();
                    alert('로그인 버튼 클릭');
                    customer.login({userid : 'customerId',
                                            domain : 'customers'
                });
        });

        document.querySelector('#admin-btn')
                    .addEventListener('click',e=>{
                    e.preventDefault();
                    alert('관리자 버튼 클릭');
                    employee.admin_login();
        });
    }

    function admin_login(){
        let isAdmin = confirm("관리자입니까??");
        if(isAdmin){
            let pass = prompt("관리자 번호를 입력하세요");
            if(pass == 1000){
                employee.customer_list('1');        
            }else{
                alert('입력한 번호가 일치하지 않습니다.');
            }
        }else{
            alert('관리자만 접속이 가능합니다.');
        }
    }

    function create_customer_row(x){
        return "<tr><td>"+x.customerId+"</td><td>"+x.customerName+"</td><td>"+x.ssn+"</td><td>"+x.phone+"</td><td>"+x.city
        +"</td></tr>";
    }

    function customer_list(x){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers/page/'+x, true);
        xhr.onload=()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                let d = JSON.parse(xhr.responseText);
                alert(d[0].customerName);
                let wrapper = document.getElementById('wrapper');
                wrapper.innerHTML = employee.customer_list_form();

                let tbody = document.getElementById('tbody');
                
                let i = 0;
                d.forEach((v, i) => {
                    let row = create_customer_row(v)
                    tbody.innerHTML += row;
                });

                let blocks = document.createElement('div');
                blocks.setAttribute('id', 'blocks');
                wrapper.appendChild(blocks);
                let spans = document.createElement('div');
                span.setAttribute('style','display:inline-block');
                i = 1;
                for(;i<6; i++){
                    // spans += "<span style=display:inline-block;padding-right:20px;border: 1px solid black;'>"+i+"</span>";
                    let span = document.createElement('span')
                    span.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;cursor:poiner');
                    span.setAttribute('class','page-num');
                    span.innerHTML = i;
                    if(x == span.innerHTML){
                        span.style.backgroundColor = "red";
                    }
                    spans.appendChild(span);
                }

                blocks.appendChild(spans);
                let clss = document.getElementsByClassName('page-num');
                var spanList = blocks.children;
                i = 0;
                for(;i<clss.length;i++){
                    (function(i){
                        clss[i].addEventListener('click',function(x){
                               alert(this.innerText)
                               customer_list(this.innerText)
                        })
                    })(i)
                }

                if(d.pxy.existPrev){
                    let prevBlock = document.createElement('span');
                    prevBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;');
                    prevBlock.textContent="<";
                    blocks.prepend(prevBlock);
                }
         
                if(d.pxy.existNext){
                    let nextBlock = document.createElement('span');
                    nextBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;');
                    nextBlock.textContent=">";
                    blocks.appendChild(nextBlock);
                }
        }
    };
    xhr.send();
};
    function join_form(){
        return '<form>'
        +'  아이디<br>'
        +'	<input type="text" name="customerId" id="customerId"><br>'
        +'	비밀번호<br>'
        +'	<input type="password" name="password" id="password"><br>'
        +'	이름<br>'
        +'	<input type="text" name="name" id="customerName"><br>'
        +'  주민번호<br>'
        +'	<input type="text" name="ssn" id="ssn"><br>'
        +'	전화번호<br>'
        +'	<input type="text" name="phone" id="phone"><br>'
        +'	도시<br>'
        +'	<input type="text" name="city" id="city"><br>'
        +'  주소<br>'
        +'	<input type="text" name="address" id="address"><br>'
        +'	우편번호<br>'
        +'	<input type="text" name="postalcode" id="postalcode"><br>'
        +'	<br><br>'
        +'	<input id="confirm-btn" type="submit" value="확인">'
        +'	<input id="cancel-btn" type="reset" value="취소">'
        +'</form>';
    }

    function join(){
        let xhr = new XMLHttpRequest();
        let data = {
            customerId : document.getElementById('customerId').value, 
            customerName : document.getElementById('customerName').value,
            password : document.getElementById('password').value,
            ssn : document.getElementById('ssn').value, 
            phone : document.getElementById('phone').value,
            city : document.getElementById('city').value,
            address : document.getElementById('address').value, 
            postalcode : document.getElementById('postalcode').value
        };
        xhr.open('post','customers',true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8')
        xhr.onload=()=>{
            if(xhr.readyState===4 && xhr.status===200){
                let d = JSON.parse(xhr.responseText);
                if(d.result==='SUCCESS'){
                    alert('회원가입 성공'+d.result);
                    //로그인 폼이 들어옴
                    // app.init();
                }else{
                    alert('회원가입 실패');
                }
            }else{
                alert('AJAX 실패');
            }
        }
        xhr.send(JSON.stringify(data));
    }

    function login_form(){
        return '<form >'
        +'  아이디:<br>'
        +'  <input type="text" id="customerId" name="customerId">'
        +'  <br>'
        +'  비밀번호:<br>'
        +'  <input type="text" id="password" name="password">'
        +'  <br><br>'
        +'  <input id="login-btn" type="button" value="LOGIN">'
        +'  <input id="join-btn" type="button" value="JOIN">'
        +'  <input id="admin-btn" type="button" value="관리자">'
        +'</form> ';
    };

    function login(x){
        id = document.getElementById(x.userid).value;
        pass = document.getElementById('password').value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', x.domain+'/'+id+'/'+pass, true);
        xhr.onload=()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                let d = JSON.parse(xhr.responseText);
                alert('로그인 성공 후 이름 : '+d.customerName)
                alert('세션에 들어간 이름 : ' +d.customerId )
                session.set_value({'name':'userid','value':d.customerId});
                session.set_value({'name':'username','value':d.customerName});
                if(d){
                    if(x.domain==='customers'){
                        customer.mypage(d);
                    }else{
                        employee.customer_list();
                    }
                }else{
                    app.init();
                }
            }
        };
        xhr.send();
    }

    function mypage_form(d){
        return '  아이디<br>'
        +'	<span id="customerId">'+d.customerId+'</span><br>'
        +'	비밀번호<br>'
        +'	<span type="password" name="password" id="password">'+d.password+'</span><br>'
        +'	이름<br>'
        +'	<span type="text" name="name" id="customerName">'+d.customerName+'</span><br>'
        +'  주민번호<br>'
        +'	<span>'+d.ssn+'</span><br>'
        +'	전화번호<br>'
        +'	<span type="text" name="phone" id="phone">'+d.phone+'</span><br>'
        +'	도시<br>'
        +'	<span type="text" name="city" id="city">'+d.city+'</span><br>'
        +'  주소<br>'
        +'	<span type="text" name="address" id="address">'+d.address+'</span><br>'
        +'	우편번호<br>'
        +'	<span type="text" name="postalcode" id="postalcode">'+d.postalcode+'<span><br>'
        +'	<br><br>'
        +'	<input id="update-btn" type="submit" value="수정">'
        +'	<input id="remove-btn" type="reset" value="탈퇴">';
    }

    function mypage (d){
        $wrapper.innerHTML = customer.mypage_form(d);
        alert('마이페이지로 넘어온 객체명 : '+d.customerId);
        document.getElementById('update-btn')
                    .addEventListener('click',e=>{
                    e.preventDefault();
                    alert('세션 테스트 ID : ' + session.get_value('userid'));
                    alert('세션 테스트 NAME : ' + session.get_value('username'));
            // customer.update(d);
        });
        document.querySelector('#remove-btn')
            .addEventListener('click',e=>{
                e.preventDefault();
                alert('탈퇴버튼 클릭'+d.customerId);
                customer.remove(d);
            })
    };
    
    function count (){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers/count', true);
        xhr.onload=()=>{
            if(xhr.readyState===4 && xhr.status === 200){
                alert('성공');
                document.querySelector('#wrapper')
                                .wrapper.innerHTML = '총 고객수 : <h1>'+xhr.responseText+'</h1>'
            }
        }
        xhr.send();
    }

    function update_form(d){
        return '<form>'
        +'  아이디<br>'
        +'	<span id="customerId">'+d.customerId+'</span><br>'
        +'	비밀번호<br>'
        +'	<input type="password" name="password" id="password" value="'+d.password+'"><br>'
        +'	이름<br>'
        +'	<span id="customerName">'+d.customerName+'</span><br>'
        +'  주민번호<br>'
        +'	<span id="ssn">'+d.ssn+'</span><br>'
        +'	전화번호<br>'
        +'	<input type="text" name="phone" id="phone" value="'+d.phone+'"><br>'
        +'	도시<br>'
        +'	<input type="text" name="city" id="city" value="'+d.city+'"><br>'
        +'  주소<br>'
        +'	<input type="text" name="address" id="address" value="'+d.address+'"><br>'
        +'	우편번호<br>'
        +'	<input type="text" name="postalcode" id="postalcode" value="'+d.postalcode+'"><br>'
        +'	<br><br>'
        +'	<input id="updateOk-btn" type="submit" value="수정완료">'
        +'	<input id="cancel-btn" type="reset" value="취소">'
        +'</form>';
    }

    function update(d){
        alert('수정 페이지');
        let wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = customer.update_form(d);
        alert('수정할 아이디: ' +document.getElementById('customerName').innerText);
        document.getElementById('updateOk-btn')
            .addEventListener('click',e=>{
                e.preventDefault();
                let data = {
                    customerId : document.getElementById('customerId').innerText,
                    customerName : document.getElementById('customerName').innerText,
                    password : document.getElementById('password').value,
                    ssn : document.getElementById('ssn').innerText,
                    phone : document.getElementById('phone').value,
                    city : document.getElementById('city').value,
                    address : document.getElementById('address').value, 
                    postalcode : document.getElementById('postalcode').value
                }
                let xhr = new XMLHttpRequest();
                xhr.open('PUT','customers/'+d.customerId,true);
                xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
                xhr.onload=()=>{
                    if(xhr.readyState===4 && xhr.status === 200){
                        let d = JSON.parse(xhr.responseText);
                        customer.mypage(d);
                    }
                }
                xhr.send(JSON.stringify(data));
            });
    };   

    
    function remove(d){
        let customerId = document.getElementById('customerId');
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'customers/'+d.customerId,true);
        xhr.onload = () =>{
            if(xhr.readyState===4 && xhr.status===200){
                alert('탈퇴성공이요');
                app.init();
            }
        };
        xhr.send();
    }
    
