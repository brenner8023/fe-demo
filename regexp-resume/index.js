(function() {
    function test(element, pattern) {
        element.addEventListener('keyup', (e)=>{
            if(pattern.test(e.target.value)) {
                e.target.nextElementSibling.hidden = true;
                return true;
            } else {
                e.target.nextElementSibling.hidden = false;
                return false;
            }
        })
    }

    let resumeTitlePattern = /^简历-[\u4e00-\u9fa5]{1,16}-[\u4e00-\u9fa5]{1,16}-1(3|4|5|6|7|8|9)\d{9}$/;
    test(resumeTitle, resumeTitlePattern);

    let fullNamePattern = /^[\u4e00-\u9fa5]{1,16}$/;
    test(fullName, fullNamePattern);

    let birthdayPattern = /^((19\d{2})|(20(0|1)\d))-((0[1-9])|(1[0-2]))$/
    test(birthday, birthdayPattern);

    let emailPattern = /^[\w_-]+@[\w_-]+.[\w]+$/
    test(email, emailPattern);

    let passwordPattern1 = /^.{8,16}$/;
    let passwordPattern2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    test(password, passwordPattern1);
    test(password, passwordPattern2);
})();