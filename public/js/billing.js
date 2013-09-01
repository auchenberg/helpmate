
$(document).ready(function ($) {

    $('.card-number').on('keyup', function() {
        switch(paymill.cardType($('.card-number').val())){
            case 'Visa':
                $('.card-icon').html('<img src="image/icon_visa.png" >');
                $('.card-icon').show();
                break;
            case 'MasterCard':
                $('.card-icon').html('<img src="image/icon_mastercard.png" >');
                $('.card-icon').show();
                break;
            default:
                $('.card-icon').hide();
                break;
        }
    });

    function PaymillResponseHandler(error, result) {
        if (error) {
            // Zeigt den Fehler überhalb des Formulars an
            $(".payment-errors").text(error.apierror);
            $(".payment-errors").css("display","inline-block");
        } else {
            $(".payment-errors").css("display","none");
            $(".payment-errors").text("");

            var form = $("#payment-form");
            var csrf = form.find('input[name=_csrf]').val();
            var token = result.token;

            var req = $.post('/settings/billing/creditcard', {
                token: token,
                _csrf: csrf
            });

            req.done(function() {
                $('#add-creditcard').modal('hide');
            })

        }

    }


    $("#payment-form").on('submit', function (event) {

        console.log('submit');

        $('.submit-button').attr("disabled", "disabled");
        if (false == paymill.validateCardNumber($('.card-number').val())) {
            // $(".payment-errors").text(formlang]["error"]["invalid-card-number"]);
            $(".payment-errors").css("display","inline-block");
            $(".submit-button").removeAttr("disabled");
        }
        if (false == paymill.validateExpiry($('.card-expiry-month').val(), $('.card-expiry-year').val())) {
            // $('.payment-errors').text(formlang]["error"]["invalid-card-expiry-date");
            $('.payment-errors').css("display","inline-block");
            $('.submit-button').removeAttr("disabled");
        }

        if ($('.card-holdername').val() == '') {
            // $(".payment-errors").text(formlang]["error"]["invalid-card-holdername");
            $(".payment-errors").css("display","inline-block");
            $(".submit-button").removeAttr("disabled");
        }

        paymill.createToken({
            number:     $('.card-number').val(),
            exp_month:  $('.card-expiry-month').val(),
            exp_year:   $('.card-expiry-year').val(),
            cvc:        $('.card-cvc').val(),
            cardholder: $('.card-holdername').val(),
            amount_int: $('.amount').val() * 100,
            currency:   $('.currency').val()
        }, PaymillResponseHandler);
        return false;
    });


});

