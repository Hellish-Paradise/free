//后端地址
const backendUrl = "http://10.0.13.99:8080/FreeAPP-1.0-APP";
//弹窗控制
$(function () {
    $("#sig").click(function () {
        $('.ui.basic.modal').modal('show');
    })
});
//登录与注册切换
$(function () {
    $("#ups").click(function () {
        $('.shape').shape('flip over');
    });
    $("#downs").click(function () {
        $('.shape').shape('flip back');
    });
});
//登录与注册表单验证
$(function () {
    $("#verifyLogin").validate({
        rules: {
            account: {
                required: true
            },
            passwordLogin: {
                required: true,
                PasswordRegExp: true
            },
            codeL: {
                required: true
            }
        }, messages: {
            account: {
                required: "请输入您的账户地址"
            },
            passwordLogin: {
                required: "请输入您的密码",
                minlength: "密码最小5位"
            },
            codeL: "请填写人机验证码"
        }, errorElement: "mark",
        errorPlacement: function (error, element) {
            error.css("color", "red");
            error.insertAfter(element);
        },
        highlight: function (element) {
            $(element).css("border", "2px dotted red");
            $(element).css("color", "red");
        },
        unhighlight: function (element) {
            $(element).css("border", "2px dotted green");
            $(element).css("color", "green");
        }
    });
    $("#verifyRegister").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                maxlength: 90
            },
            sex: "required",
            password: {
                required: true,
                PasswordRegExp: true
            },
            confirmPassword: {
                required: true,
                PasswordRegExp: true,
                equalTo: "#password"
            },
            codeR: {
                required: true
            },
            terms: "required"
        }, messages: {
            email: {
                required: "请输入您的Email地址",
                email: "请输入正确的Email地址"
            },
            username: {
                required: "请输入您的用户名",
                maxlength: "用户名最大90字节"
            },
            sex: "请选择性别",
            password: {
                required: "请输入密码",
                minlength: "密码最小5位"
            },
            confirmPassword: {
                required: "请输入确认密码",
                minlength: "密码最小5位",
                equalTo: "俩次密码不一致"
            },
            codeR: "请填写人机验证码",
            terms: "请同意我们的法律条款"
        }, errorElement: "mark",
        errorPlacement: function (error, element) {
            error.css("color", "red");
            error.insertAfter(element);
        },
        highlight: function (element) {
            $(element).css("border", "2px dotted red");
            $(element).css("color", "red");
        },
        unhighlight: function (element) {
            $(element).css("border", "2px dotted green");
            $(element).css("color", "green");
        }
    });
});
//人机验证与结合后端登录与注册
$(function () {
    let code;
    code = createCode();
    $("#myCanvas").click(function () {
        code = createCode();
    })
    $("#login").click(function () {
        if ($("#equal").val() === code) {
            const validateLogin = $("#verifyLogin").validate();
            if (validateLogin.form()) {
                let qs = Qs;
                const account = $("input[name='account']").val();
                const passwordLogin = $("input[name='passwordLogin']").val();
                let data = qs.stringify({
                    'email': account,
                    'password': passwordLogin
                });
                let config = {
                    baseURL: backendUrl,
                    method: 'post',
                    url: '/servletLogin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                    withCredentials: true // 允许携带cookie
                };
                axios(config)
                    .then(function (response) {
                        alert(response.data);
                        if (response.data === "登录成功\r\n") {
                            window.location.href = "/controlPanel";
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            // $("#verifyLogin").submit();
        } else {
            alert("您输入的人机验证码不匹配");
            $("#verifyLogin").submit(function () {
                return false;
            });
        }
    })
})
$(function () {
    let code;
    code = createCodeR();
    $("#myCanvasR").click(function () {
        code = createCodeR();
    })
    $("#register").click(function () {
        if ($("#equalR").val() === code) {
            const validateRegister = $("#verifyRegister").validate();
            if (validateRegister.form()) {
                let qs = Qs;
                const email = $("input[name='email']").val();
                const username = $("input[name='username']").val();
                const sex = $("input[name='sex']:checked").val();
                const confirmPassword = $("input[name='confirmPassword']").val();
                const today = new Date();
                const y = today.getFullYear();
                const month = today.getMonth() + 1;
                const td = today.getDate();
                const h = today.getHours();
                const m = today.getMinutes();
                const s = today.getSeconds();
                const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
                let data = qs.stringify({
                    'email': email,
                    'name': username,
                    'sex': sex,
                    'password': confirmPassword,
                    'create': datetime,
                    'update': datetime
                });
                let config = {
                    baseURL: backendUrl,
                    method: 'post',
                    url: '/api/register',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                    withCredentials: true // 允许携带cookie
                };
                axios(config)
                    .then(function (response) {
                        alert(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            // $("#verifyRegister").submit();
        } else {
            alert("您输入的人机验证码不匹配");
            $("#verifyRegister").submit(function () {
                return false;
            });
        }
    })
})

//人机验证码生成
function createCode() {
    let code = "";
    const codeLength = 4;//验证码的长度，可变
    const canvas = document.getElementById('myCanvas');//获取画布
    const selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//所有候选组成验证码的字符

    for (let i = 0; i < codeLength; i++) {
        const charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 70, 35);
        ctx.font = "20px arial";
        // 创建渐变
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        ctx.strokeStyle = gradient;
        ctx.strokeText(code, 5, 25);//画布上添加验证码
    }
    return code;
}

function createCodeR() {
    let code = "";
    const codeLength = 4;//验证码的长度，可变
    const canvas = document.getElementById('myCanvasR');//获取画布
    const selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//所有候选组成验证码的字符

    for (let i = 0; i < codeLength; i++) {
        const charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 70, 35);
        ctx.font = "20px arial";
        // 创建渐变
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        ctx.strokeStyle = gradient;
        ctx.strokeText(code, 5, 25);//画布上添加验证码
    }
    return code;
}

//返回顶部
$(function () {
    $(function () {
        $(document).scroll(function () {
            let $scroll = $(window).scrollTop();
            if ($scroll >= 150) {
                $("#up").show("1000");
            } else {
                $("#up").hide("1000");
            }
        })
    });
    $('#up').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
    });
});
