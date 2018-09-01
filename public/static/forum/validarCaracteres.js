$(document).ready(function () {
    $('#characterLeft').text('500 caracteres restantes');
    $('#cuerpo').keydown(function () {
        var max = 500;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('Has superado el limite de caracteres');
            $('#characterLeft').addClass('red');
            $('#submit').addClass('disabled');
        } else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' caracteres restantes');
            $('#submit').removeClass('disabled');
            $('#characterLeft').removeClass('red');
        }
    });
});