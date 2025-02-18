var Rules_var='rule_close';

var firstGame = null;
var socket_call = "";
function isNumber(params) {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
}

function ShowListOrder(list_orders) {
    if (list_orders.length == 0) {
        return $(`#list_order`).html(
            `
            <div data-v-a9660e98="" class="van-empty">
                <div class="van-empty__image">
                    <img src="/images/empty-image-default.png" />
                </div>
                <p class="van-empty__description">No data</p>
            </div>
            `
        );
    }
    let htmls = "";
    let result = list_orders.map((list_orders) => {
        let total = String(list_orders.result).split('');
        let total2 = 0;
        for (let i = 0; i < total.length; i++) {
            total2 += Number(total[i]);
        }

        let html2 = '';
        for (let i = 0; i < total.length; i++) {
            html2 += `
                <div data-v-03b808c2="" class="li img${total[i]}"></div>
            `;
        }

        return (htmls += `
            <div data-v-03b808c2="" class="c-tc item van-row">
                <div data-v-03b808c2="" class="van-col van-col--6">
                    <div data-v-03b808c2="" class="c-tc goItem lh">${list_orders.period}</div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--4">
                    <div data-v-03b808c2="" class="c-tc goItem lh"> ${total2} </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--5">
                    <div data-v-03b808c2="" class="c-tc goItem lh">
                        <div data-v-03b808c2="">${(total2 >= 3 && total2 <= 10) ? "Small" : "Big"}</div>
                    </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--4">
                    <div data-v-03b808c2="" class="c-tc goItem lh">
                        <div data-v-03b808c2="">${(total2 % 2 == 0) ? "Even" : "Odd"}</div>
                    </div>
                </div>
                <div data-v-03b808c2="" class="van-col van-col--5">
                    <div data-v-03b808c2="" class="goItem c-row c-tc c-row-between c-row-middle">
                        ${html2}
                    </div>
                </div>
            </div>
        `);
    });
    $('#kd_submit').addClass('confirm');
    $(`#list_order`).html(htmls);
}

function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
}

function timerJoin(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function GetMyEmerdList(list_orders) {
    if (list_orders.length == 0) {
        return $(`#list_order`).html(
            `
            <div data-v-a9660e98="" class="van-empty">
                <div class="van-empty__image">
                    <img src="/images/empty-image-default.png" />
                </div>
                <p class="van-empty__description">No Data</p>
            </div>
            `
        );
    }
    let htmls = "";
    let result = list_orders.map((list_order) => {
        let arr = list_order.result.split('');
        let resultData = ``;
        let total = 0;

        for (let i = 0; i < arr.length; i++) {
            total += Number(arr[i]);
            resultData += `
          <div data-v-42f27458="" class="li circle-black">${arr[i]}</div>
        `;
        }

        let join = '';
        let arr2 = list_order.bet.replace(/[$@%]/g, '').split(',');
        for (let i = 0; i < arr2.length; i++) {
                let check = isNumber(arr2[i].replace("y",""));
            if (check) {
                join += `
          <div data-v-42f27458="" class="my_bet_choose">
              <span data-v-42f27458="" style="color: rgb(0, 0, 0);">
                <span data-v-42f27458="" class="li circle-black" style="color: rgb(0, 0, 0);">${arr2[i].replace("y","")}</span>  
              </span>
          </div>`;
            } else {
                join += `
          <div data-v-42f27458="" class="my_bet_choose">
            <span data-v-42f27458="" style="color: rgb(0, 0, 0);">${(arr2[i] == 'c') ? "Even" : (arr2[i] == 'l') ? 'Odd' : (arr2[i] == 'b') ? 'Big' : 'Small'}</span>
          </div>
          `;
            }
        }
        return (htmls += `
            <div data-v-03b808c2="" class="k3_bet_list">
                <div data-v-03b808c2="" class="k3_item item c-row">
                    <div data-v-03b808c2="" class="c-row c-row-between c-row-middle info">
                        <div data-v-03b808c2="">
                            <div data-v-03b808c2="" class="issueName">
                                ${list_order.stage}
                                <!---->
                                <span data-v-03b808c2="" class="state ${(list_order.status == 1) ? 'green' : 'red'} ${(list_order.status == 0) ? 'd-none' : ''}">${(list_order.status == 1) ? 'Success' : 'Failure'}</span>
                            </div>
                            <div data-v-03b808c2="" class="tiem">${timerJoin(list_order.time)}</div>
                        </div>
                        <div data-v-03b808c2="" class="money ${(list_order.status == 0) ? 'd-none' : ''}">
                            <!---->
                            <span data-v-03b808c2="" class="${(list_order.status == 1) ? 'success' : 'fail'}"> ${(list_order.status == 1) ? '+' : '-'}${(list_order.status == 1) ? list_order.get : list_order.price}.00 </span>
                        </div>
                    </div>
                    
                </div>
                <!---->
                        <div data-v-42f27458="" class="details display-none" >
   <div data-v-42f27458="" class="tit">Details</div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Order Number</div>
      <div data-v-42f27458="" class="tag-read c-row c-row-between c-row-middle">
      ${list_order.id_product}
         <img data-v-42f27458="" data-clipboard-text="${list_order.id_product}" width="18px" height="15px" src="/images/copy.png" class="m-l-5 copy-to-img" />
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Periods</div>
      <div data-v-42f27458="">${list_order.stage}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Spent Amount</div>
      <div data-v-42f27458="">${list_order.money}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Quantity Purchased</div>
      <div data-v-42f27458="">${list_order.amount}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">After Tax Amount</div>
      <div data-v-42f27458="" class="red">${list_order.price}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Tax</div>
      <div data-v-42f27458="">${list_order.fee}.00</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Opening Price</div>
      <div data-v-42f27458="" style="display: ${(list_order.status == 0) ? 'none' : ''};">${list_order.result}</div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Results</div>
      <div data-v-42f27458="" class="c-row" style="display: ${(list_order.status == 0) ? 'none' : ''};">
      ${resultData}
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Choose</div>
      <div data-v-42f27458="" class="c-row c-row-middle">
         <div data-v-42f27458="" class="c-row m-r-5">
            <div data-v-42f27458="">${(list_order.join_bet == 'total') ? "SUM" : list_order.join_bet.toUpperCase()}</div>
         </div>
          ${join}
      </div>
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Status</div>
      <div data-v-42f27458="" class="${(list_order.status == 1) ? 'green' : 'red'}" style="display: ${(list_order.status == 0) ? 'none' : ''};">${(list_order.status == 1) ? 'Success' : 'Fail'}</div>
                  <!---->
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Win Or Loss</div>
      <div data-v-42f27458="" class="${(list_order.status == 1) ? 'green' : 'red'}" style="display: ${(list_order.status == 0) ? 'none' : ''};">${(list_order.status == 1) ? '+' : '-'} ${(list_order.status == 1) ? list_order.get : list_order.price}.00</div>
                  <!---->
   </div>
   <div data-v-42f27458="" class="detailLi c-row c-row-between c-row-middle">
      <div data-v-42f27458="">Purchase Time</div>
      <div data-v-42f27458="">${timerJoin(list_order.time)}</div>
   </div>
</div>  
            </div>

        `);
    });
    $(`#list_order`).html(htmls);
}

$(document).on('click', '#list_order .k3_bet_list', function(e)
{
    e.preventDefault();
    $(this).find('.details').toggleClass("display-none");
});

function totalMoney() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.list-join-ao li');

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin.length);
    $('.result').text(result + '');
}

function totalMoney2() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.purple[data="chon-2-so-phu-hop"] .item.action');
    let listJoin2 = $('.num-box.red[data="chon-1-cap-duy-nhat"] .item.action');
    let listJoin3 = $('.num-box.green[data="chon-1-cap-duy-nhat"] .item.action');
    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin2.length * listJoin3.length + listJoin.length);
    $('.result').text(result + '');
}

function totalMoney3() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.bet-con[game="3"] .item.action');
    let listJoin1 = $('.chon-3-so-giong-nhau .li.action');

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin.length + listJoin1.length);
    $('.result').text(result + '');
}

function totalMoney4() {
    let amount = Number($('.xvalue').val());
    let money = Number($('.amount-box').find('.action').attr("value"));

    let listJoin1 = $('.bet-con[game="4"] .num-box:eq(0) .item.action');
    let listJoinHang1 = listJoin1.length;
    let x1 = 0;
    if (listJoinHang1 >= 3) {
        if (listJoinHang1 == 3) x1 = 1;
        if (listJoinHang1 == 4) x1 = listJoinHang1;
        if (listJoinHang1 == 5) x1 = 10;
        if (listJoinHang1 == 6) x1 = 20;
    }

    let listJoin2 = $('.bet-con[game="4"] .num-box:eq(2) .item.action');

    let listJoinHang2 = listJoin2.length;
    let x2 = 0;
    if (listJoinHang2 >= 2) {
        if (listJoinHang2 <= 3) x2 = 1;
        if (listJoinHang2 == 4) x2 = 6;
        if (listJoinHang2 == 5) x2 = 10;
        if (listJoinHang2 == 6) x2 = 15;
    }

    let listJoin3 = $('.chon-3-so-lien-tiep .li').hasClass('action');
    let x3 = 0;
    if (listJoin3) {
        x3 = 1;
    }

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = amount * (x1 * money + x2 * money + x3 * money);
    $('.result').text(result + '');
}

const socket = io();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function RenderResult(results) {
    for (let i = 0; i < 30; i++) {
        let random1 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${random1}`);
        let random2 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${random2}`);
        let random3 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${random3}`);
        await sleep(50);
    }
    let result = String(results).split('');
    $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${result[0]}`);
    $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${result[1]}`);
    $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${result[2]}`);
    return false;
}

$(".circular .li").click(function (e) {
    e.preventDefault();
    Rules_var = 'rule_open';
    $(".van-overlay, .pop-quytac").fadeIn(300);
    $("body").addClass("van-overflow-hidden");
});


$('.van-overlay').click(function (e) {
    e.preventDefault();
    Rules_var = 'rule_close';
    $(".van-overlay, .pop-quytac, .pop-quytac-buy").fadeOut(300);
});
$(".pop-quytac button, .pop-quytac-buy button").click(function (e) {
    e.preventDefault();
    $(".van-overlay, .pop-quytac, .pop-quytac-buy").fadeOut(300);
    $("body").removeClass("van-overflow-hidden");
});

$('.van-notice-bar__content').css("transition-duration", "42s");
setTimeout(() => {
    $('.van-notice-bar__content').css("transform", "translateX(-1872.29px)");
}, 100);

setInterval(() => {
    $('.van-notice-bar__content').css("transition-duration", "0s");
    $('.van-notice-bar__content').css("transform", "translateX(0px)");
    setTimeout(() => {
        $('.van-notice-bar__content').css("transition-duration", "42s");
        $('.van-notice-bar__content').css("transform", "translateX(-1872.29px)");
    }, 100);
}, 42000);

$('.multiple-box .li').click(function (e) {
    e.preventDefault();
    let value = $(this).attr("value");
    $('.xvalue').val(value);
    $('.multiple-box .li').removeClass('action');
    $(this).addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
    let value2 = $('.xvalue').val();
    if (value2 > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
});

$('.amount-box .li').click(function (e) {
    e.preventDefault();
    $('.amount-box .li').removeClass('action');
    $(this).addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
    let value2 = $('.xvalue').val();
    if (value2 > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
});



$('.minus-plus .minus').click(function (e) {
    e.preventDefault();
    let value = Number($('.xvalue').val());
    value -= 1;
    if (value <= 1) {
        value = 1;
        $(this).removeClass('action');
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});



$('.xvalue').on('input', () => {
    let value = $('.xvalue').val();
    if (value == "") {
        $('.minus-plus .minus').removeClass('action');
    } else if (value <= 0) {
        value = 1;
        $('.minus-plus .minus').removeClass('action');
    } else if (value > 100) {
        value = 100;
    }
    if (value > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});

$('.minus-plus .plus').click(function (e) {
    e.preventDefault();
    let value = Number($('.xvalue').val());
    value += 1;
    if (value > 100) {
        value = 100;
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    $('.minus-plus .minus').addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});

$('.txt-qu-ytac').click(function (e) {
    e.preventDefault();
    Rules_var='rule_open';
    $('.pop-quytac-buy').fadeIn(200);
    $('.van-overlay').fadeIn(200);
});

$(".canned").click(function (e) {
    e.preventDefault();
    dropDown();
});

function dropDown() {
    $('.Bet-box li').remove();
    $(".list-join-total .item").find('.li .icon').remove();
    $(".list-join-total .item").find('.li').removeClass('action');
    $(".pop-total").css("transform", "translateY(400px)");
    $('.c-row[game="2_2"], .list-join-ao span[game="2_1"]').addClass('d-none');
    $('.c-row[game="2_2"]').html('');
    $('.Bet-box span').addClass('d-none');
    $('.bet-con[game="2"] .item, .chon-3-so-giong-nhau .li').removeClass('action');
    $('.bet-con[game="3"] .item').removeClass('action');
    $('.bet-con[game="4"] .item').removeClass('action');
    $('.actionBtn').addClass('d-none');
    $('.chon-3-so-lien-tiep .li').removeClass('action');
    $('.confirm').removeClass('block-click');
    $('.result').text('1');
    $('.betting-mark .amount-box .li').removeClass('action');
    $('.betting-mark .amount-box .li:eq(0)').addClass('action');
    $('.betting-mark .multiple-box .li').removeClass('action');
    $('.betting-mark .multiple-box .li:eq(0)').addClass('action');
    $('.xvalue').val(1);
    $('.num-box').find('.icon').remove();
}

var audio1 = new Audio("/audio/di1.da40b233.mp3");
var audio2 = new Audio("/audio/di2.317de251.mp3");

var clicked = false;

function openAudio() {
    audio1.muted = true;
    audio1.play();
    audio2.muted = true;
    audio2.play();
}

$("body").click(function (e) {
    e.preventDefault();
    if (clicked) return;
    openAudio();
    clicked = true;
});

function playAudio1() {
    audio1.muted = false;
    audio1.play();
}

function playAudio2() {
    audio2.muted = false;
    audio2.play();
}

function cownDownTimer() {
    let countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    $('#kd_submit').addClass('confirm');
    setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        let checkData = Number($('html').attr('data-dpr'));
        let minute = Math.ceil(minutes % checkData);
        let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        $(".flex-row-end .li-item:eq(1)").text(minute);
        $(".flex-row-end .li-item:eq(2)").text(seconds1);
        $(".flex-row-end .li-item:eq(3)").text(seconds2);

        if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
            $('.mark-box').show();
            $('.mark-box .item:eq(1)').text(seconds2);
            $('.mark-box').show();
            dropDown();
        }
        if (minute >= 0 && seconds1 >= 1 && seconds2 <= 9) {
            $('.mark-box').hide();
        }
    }, 0);
    setInterval(function () {
        let now = new Date().getTime();//.toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let checkData = Number($('html').attr('data-dpr'));
        let minute = Math.ceil(minutes % checkData);
        let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        const check_volume = localStorage.getItem('volume');

        if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
            if (clicked) {
                if (check_volume == 'on') {
                    playAudio1();
                }
            }
        }

        if (minute == (checkData - 1) && seconds1 == 5 && seconds2 >= 9) {
            if (clicked) {
                if (check_volume == 'on') {
                    playAudio2();
                }
            }
        }
    }, 1000);
}

cownDownTimer();

const issetVolume = localStorage.getItem('volume');
if (issetVolume == null) {
    localStorage.setItem('volume', 'on');
}

if (issetVolume == 'on') {
    $('.item-volume').attr('src', '/images/volume-up-line.webp');
} else if (issetVolume == 'off') {
    $('.item-volume').attr('src', '/images/volume-off-outline.webp');
} else {
    localStorage.setItem('volume', 'on');
}

$('.item-volume').click(function (e) {
    e.preventDefault();
    const check_volume = localStorage.getItem('volume');
    if (check_volume == 'on') {
        $(this).attr('src', '/images/volume-off-outline.webp');
        localStorage.setItem('volume', 'off');
    } else {
        $(this).attr('src', '/images/volume-up-line.webp');
        localStorage.setItem('volume', 'on');
    }
});



$('.bet-tab .item').click(function (e) {
    e.preventDefault();
    $('.bet-tab .item').removeClass('action');
    $(this).addClass('action');
    let game = $(this).attr('game');

    $('.bet-mark .bet-con').addClass('d-none');
    $('.bet-mark').find(`[game='${game}']`).removeClass('d-none');

    $('.list-join-ao span').addClass('d-none');
    $('.bet-tab .item').removeClass('block-click');
    $(this).addClass('block-click');
    $('#kd_submit').addClass('confirm');
    dropDown();
});

// Tổng số
$(".list-join-total .item").click(function (e) {
    e.preventDefault();
    //$('#kd_submit').removeClass('block-click');
    $("#k3_check").click();
    $('.list-join-ao span[game="1"]').removeClass('d-none');
    $(".pop-total").css("transform", "translateY(0px)");
    let check = $(this).find('.li').hasClass('action');
    if (check == true) {
        $(this).find('.li').removeClass('action');
        $(this).find('.li .icon').remove();

        let html = $(this).find('.li').attr('data-join');
        $('.list-join-ao').find(`[value='${html}']`)[0].remove();
        let count = $('.list-join-ao').find('li');
        if (count.length == 0) {
            dropDown();
        }
        totalMoney();
        return false;
    }
    let html = $(this).find('.li').attr('data-join');
    if (html == "Big"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #ffa82e">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Small"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #6da7f4">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Odd"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Even"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 3){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 4){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 5){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 6){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 7){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 8){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 9){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 10){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 11){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 12){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 13){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 14){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 15){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 16){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 17){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 18){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    $(`.list-join-ao`).removeClass('d-none');
    $(this).find('.li').addClass('action');
    $(this).find('.li').append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
    totalMoney();
});

// 2 số trùng nhau
$('.bet-con[game="2"] .purple[data="chon-2-so-phu-hop"] .item').click(function (e) { // Hàng 1
    e.preventDefault();
    $(".pop-total").css("transform", "translateY(0px)");

    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.list-join-ao li[data=${data}]`).remove();
        $(this).removeClass('action');

        let game = $(this).attr('game');
        let count = $(`.list-join-ao li`);
        let count2 = $(`.c-row[game=2_2] li`);
        if (count.length <= 0 && count2.length <= 0) {
            $(`.list-join-ao span[game=${game}]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        } else if (count.length <= 0) {
            $(`.list-join-ao span[game=${game}]`).addClass('d-none');
        }
        totalMoney2();
        $(this).find('.icon').remove();
        return false;
    }

    let game = $(this).attr('game');
    let data = $(this).attr('data');

    $(`.list-join-ao`).removeClass('d-none');
    $(`.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

    $(`.list-join-ao span[game=${game}]`).removeClass('d-none');

    $(this).addClass('action');
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

function handlingGame2() {
    let hang1 = $('.num-box[hang="1"] .action');
    let hang2 = $('.num-box[hang="2"] .action');
    let html = '';
    let numberHang1 = '';
    let number = '';
    if (hang1.length > 0 && hang2.length > 0) {
        for (let i = 0; i < hang1.length; i++) {
            numberHang1 = hang1[i].innerText;
            for (let i = 0; i < hang2.length; i++) {
                number += String(hang2[i].innerText) + ',';
            }
            number = number.slice(0, -1);
            html += `
                <li data-v-03b808c2="" class="actionRedGreen" data="${numberHang1}">${numberHang1}|${number}</li>
            `;
            numberHang1 = '';
            number = '';
        }
        $(`.c-row[game=2_2]`).html(html);
        $(`.c-row[game=2_2]`).prepend(`<span data-v-03b808c2="">Choose a unique pair of numbers：</span>`);
    }
    if (hang1.length <= 0 || hang2.length <= 0) {
        $(`.c-row[game=2_2]`).html('');
        // $(`.c-row[game=2_2]`).prepend(`<span data-v-03b808c2="">Chọn một cặp số duy nhất：</span>`);
    }
}

$('.bet-con[game="2"] .num-box[data="chon-1-cap-duy-nhat"] .item').click(async function (e) {  // Hàng 2
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.c-row[game=2_2] li[data=${data}]`).remove();
        $(this).removeClass('action');
        let game = $(this).attr('game');
        await handlingGame2();
        let count = $(`.list-join-ao li`);
        let count2 = $(`.c-row[game=2_2] li`);
        if (count.length <= 0 && count2.length <= 0) {
            $(`.c-row[game=2_2]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        } else if (count2.length <= 0) {
            $(`.c-row[game=2_2]`).addClass('d-none');
        }
        totalMoney2();
        $(this).find('.icon').remove();
        return false;
    }

    let number = $(this).attr('number');
    let hang = $(this).parent().attr('hang');
    if (hang == 1) {
        let element = $('.num-box[hang="2"]').find(`[number=${number}]`);
        let check = element.hasClass('action');
        if (check) {
            $('.num-box[hang="2"]').find(`[number=${number}]`).removeClass('action');
            $('.num-box[hang="2"]').find(`[number=${number}]`).find('.icon').remove();
        }
    } else {
        let element = $('.num-box[hang="1"]').find(`[number=${number}]`);
        let check = element.hasClass('action');
        if (check) {
            $('.num-box[hang="1"]').find(`[number=${number}]`).removeClass('action');
            $('.num-box[hang="1"]').find(`[number=${number}]`).find('.icon').remove();
        }
    }

    let game = $(this).attr('game');
    $(`.c-row[game=${game}]`).removeClass('d-none');
    $(`.list-join-ao`).removeClass('d-none');
    $(this).addClass('action');

    let countHang1 = $('.num-box[hang="1"] .action').length;
    let countHang2 = $('.num-box[hang="2"] .action').length;
    if (countHang1 >= 1 && countHang2 >= 1) {
        $(".pop-total").css("transform", "translateY(0px)");
    }
    handlingGame2();
    let count = $(`.list-join-ao li`);
    let count2 = $(`.c-row[game=2_2] li`);
    if (count.length <= 0 && count2.length <= 0) {
        $(`.c-row[game=2_2]`).addClass('d-none');
        $(".pop-total").css("transform", "translateY(400px)");
    }
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

// 3 số trùng nhau
$('.bet-con[game="3"] .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.list-join-ao li`);
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        }
        if (count.length <= 0) {
            $(`.list-join-ao span[game="3"]`).addClass('d-none');
        }
        totalMoney3();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    let game = $(this).parent().parent().attr('game');
    $(`.Bet-box ul span[game=${game}]`).removeClass('d-none');
    $(`.list-join-ao`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box .list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney3();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.chon-3-so-giong-nhau .li').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        $(this).removeClass('action');
        $('.actionBtn').addClass('d-none');

        let count = $(`.list-join-ao li`);
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        }
        totalMoney3();
        $(this).find('.icon').remove();
        return false;
    }
    $('.actionBtn').text('Choose 3 identical numbers');
    $('.actionBtn').removeClass('d-none');
    $(this).addClass('action');
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney3();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

// Khác số
$('.bet-con[game="4"] .num-box:eq(0) .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box .list-join-ao li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.list-join-ao li`).length;
        let count2 = $(`.Bet-box ul[game="4"] li`).length;
        let check = $('.chon-3-so-lien-tiep .li').hasClass('action');
        if (count < 3 && count2 < 2 && !check) {
            $(`.list-join-ao`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        if (count < 3) {
            $(`.list-join-ao`).addClass('d-none');
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    let game = $(this).parent().parent().attr('game');
    $(`.list-join-ao`).addClass('d-none');
    $(`.Bet-box ul span[game=${game}]`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box ul.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
    let count = $(`.Bet-box ul.list-join-ao li`).length;
    if (count >= 3) {
        $(`.list-join-ao`).removeClass('d-none');
        $(".pop-total").css("transform", "translateY(0px)");
    }
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.chon-3-so-lien-tiep .li').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        $(this).removeClass('action');
        $('.actionBtn').addClass('d-none');

        let count = $(`.list-join-ao li`);
        let count2 = $(`.Bet-box ul[game="4"] li`).length;
        let count3 = $(`.list-join-ao li`).length;
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && count2 < 2 && count3 < 3 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    $('.actionBtn').text('Choose 3 consecutive numbers');
    $('.actionBtn').removeClass('d-none');
    $(this).addClass('action');
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.bet-con[game="4"] .num-box:eq(2) .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box ul[game="4"] li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.Bet-box ul[game="4"] li`).length;
        let count2 = $(`.list-join-ao li`).length;
        let check = $('.chon-3-so-lien-tiep .li').hasClass('action');
        if (count < 2 && count2 < 3 && !check) {
            $(`.Bet-box ul[game="4"]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        if (count < 2) {
            $(`.Bet-box ul[game="4"]`).addClass('d-none');
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    $(`.Bet-box ul[game="4"]`).removeClass('d-none');
    $(`.Bet-box ul[game="4"] span`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box ul[game="4"]`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

    let count = $(`.Bet-box ul[game="4"] li`).length;
    if (count >= 2) {
        $(".pop-total").css("transform", "translateY(0px)");
    }
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Đặt cược
function alertMess(mess) {
    $('body').append(
        `
      <div data-v-1dcba851="" class="msg">
        <div data-v-1dcba851="" class="msg-content v-enter-active v-enter-to" style=""> ${mess} </div>
      </div>
      `
    );
    setTimeout(() => {
        $('.msg .msg-content').removeClass('v-enter-active v-enter-to');
        $('.msg .msg-content').addClass('v-leave-active v-leave-to');
        setTimeout(() => {
            $('.msg').remove();
        }, 100);
    }, 1000);
}


function tdOnclick(e) {
    if($(e).find('input[type=checkbox]').is(':checked') == false)
    {
     $(e).find('input[type=checkbox]').prop('checked', true);
     $(e).find('.checkmark1').html('&#10004;');
     $(e).find('.checkmark1').css('background-color', '#171b3f');
     $(e).find('.checkmark1').css('border', 'white 2px solid');
     $('#kd_submit').removeClass('kdisablesub-button');
     $('#kd_submit').removeClass('confirm');
     $('#kin_submit').removeClass('kspan_db');
    }
    else{
     $(e).find('input[type=checkbox]').prop('checked', false);
     $(e).find('.checkmark1').html('');
     $(e).find('.checkmark1').css('background-color', 'white');
     $(e).find('.checkmark1').css('border', '#171b3f 2px solid');
     $('#kd_submit').addClass('kdisablesub-button');
     $('#kd_submit').addClass('confirm');
     $('#kin_submit').addClass('kspan_db');
    }
 }


const Pi = window.Pi;
Pi.init({ version: "2.0", sandbox: '<%=sandbox%>' });
async function auth() {
  try {
      
      const scopes = ['username', 'payments', 'wallet_address'];
      function onIncompletePaymentFound(payment) {
          console.log("incomplete Transaction");
      }; 

      Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth) {
          var username = auth.user.username;
          var password = auth.user.uid;
          var auth_token = auth.accessToken;
          var firstGame = null;
          var socket_call = "";
          $(document).ready(function(){
            callAjaxMeJoin();
          });
           function reload_money() {
                      $.ajax({
                          type: "POST",
                          url: "/api/webapi/GetUserInfo",
                          data: {
                            authtoken:auth_token,
                          },
                          dataType: "json",
                          success: function (response) {
                            $(".Loading").fadeOut(0);
                            if (response.status === false) {
                            return false;
                            }
                            $(".num .moneyU").text(`₹ ${response.data.money_user} `);
                          }
                        });
                  }
                  reload_money();
                  
                  $('#reload_money').click( function (e) {
                      e.preventDefault();
                      $(".Loading").fadeIn(0);
                      $(this).addClass("block-click");
                      setTimeout(() => {
                          $(this).removeClass("block-click");
                      }, 2500);
                      reload_money();
                  });
                  
        $('.game-minutes .img, .game-minutes .txt').click(function (e) {
            e.preventDefault();
            let parent = $(this).parent();
        
            $('.game-minutes .item').removeClass('action');
            parent.addClass('action');
        
            $('.game-minutes .item .img .van-image-1').fadeOut(0);
            $('.game-minutes .item .img .van-image-2').fadeIn(0);
            $('.game-minutes .item .img, .game-minutes .item .txt').removeClass('block-click');
            parent.find('.img .van-image:eq(0)').fadeIn(0);
            parent.find('.img .van-image:eq(1)').fadeOut(0);
        
            parent.find('.img').addClass('block-click');
            parent.find('.txt').addClass('block-click');
        
            let data = $(this).attr('data');
            $('html').attr('data-dpr', data);
            $('#history').click();
            $('#kd_submit').addClass('confirm');
           callAjaxMeJoin();
            callListOrder();
        });
        function sendGame1() {
            let join = '';
            let countwe = $('.bet-con[game="1"] .list-join-total .item .action');
            for (let i = 0; i < countwe.length; i++) {
                join += countwe[i].attributes[2].value + ',';
            }
            let listJoin = join.slice(0, -1);
            let xvalue = $('.info-bet').attr("xvalue");
            let money = $('.info-bet').attr("money");
            $.ajax({
                type: "POST",
                url: "/api/webapi/action/k3/join",
                data: {
                    listJoin: listJoin,
                    game: $('html').attr('data-dpr'),
                    gameJoin: 1,
                    xvalue: xvalue,
                    money: money,
                    authtoken:auth_token,
                },
                dataType: "json",
                success: function (response) {
                    alertMess(response.message);
                    let change = String(response.change);
                    if (response.status) {
                        $('.moneyU').text(response.money + '');
                        socket.emit('data-server-3', { change, gameJoin: 1, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
                    }
                    dropDown();
                }
            });
        }
        
        function sendGame2() {
            let join2 = '';
            let count2 = $('.list-join-ao li');
            for (let i = 0; i < count2.length; i++) {
                join2 += count2[i].innerText + ',';
            }
            let listJoin1 = join2.slice(0, -1);
        
            let join = '';
            let countwe = $('.Bet-box ul[game="2_2"] .actionRedGreen');
            for (let i = 0; i < countwe.length; i++) {
                join += countwe[i].innerText + '&';
            }
        
            let listJoin2 = join.slice(0, -1);
        
            let listJoin = listJoin1 + '@' + listJoin2;
        
            let xvalue = $('.info-bet').attr("xvalue");
            let money = $('.info-bet').attr("money");
            $.ajax({
                type: "POST",
                url: "/api/webapi/action/k3/join",
                data: {
                    listJoin: listJoin,
                    game: $('html').attr('data-dpr'),
                    gameJoin: 2,
                    xvalue: xvalue,
                    money: money,
                    authtoken:auth_token,
                },
                dataType: "json",
                success: function (response) {
                    alertMess(response.message);
                    let change = String(response.change);
                    if (response.status) {
                        $('.moneyU').text(response.money + '');
                        socket.emit('data-server-3', { change, gameJoin: 2, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
                    }
                    dropDown();
                }
            });
        }
        
        function sendGame3() {
            let join = '';
            let countwe = $('.list-join-ao li');
            for (let i = 0; i < countwe.length; i++) {
                join += countwe[i].innerText + ',';
            }
            let listJoin = join.slice(0, -1);
        
            let check = $('.actionBtn').hasClass('d-none');
            let threeNum = '';
            if (!check) {
                threeNum = '3';
            }
            listJoin = listJoin + '@' + threeNum;
            let xvalue = $('.info-bet').attr("xvalue");
            let money = $('.info-bet').attr("money");
            $.ajax({
                type: "POST",
                url: "/api/webapi/action/k3/join",
                data: {
                    listJoin: listJoin,
                    game: $('html').attr('data-dpr'),
                    gameJoin: 3,
                    xvalue: xvalue,
                    money: money,
                    authtoken:auth_token,
                },
                dataType: "json",
                success: function (response) {
                    alertMess(response.message);
                    let change = String(response.change);
                    if (response.status) {
                        $('.moneyU').text(response.money + '');
                        socket.emit('data-server-3', { change, gameJoin: 3, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
                    }
                    dropDown();
                }
            });
        }
        
        function sendGame4() {
            let join = '';
            let countwe = $('.list-join-ao li');
            if (countwe.length >= 3) {
                for (let i = 0; i < countwe.length; i++) {
                    join += countwe[i].innerText + ',';
                }
            }
            let join2 = 'y';
            let countwe2 = $('.actionBtn').hasClass('d-none');
            if (!countwe2) {
                join2 = 'u';
            }
        
            let join3 = '';
            let countwe3 = $('.Bet-box .c-row[game="4"] li');
            if (countwe3.length >= 2) {
                for (let i = 0; i < countwe3.length; i++) {
                    join3 += countwe3[i].innerText + ',';
                }
            }
        
            let listJoin = join.slice(0, -1) + '@' + join2 + '@' + join3.slice(0, -1);
            let xvalue = $('.info-bet').attr("xvalue");
            let money = $('.info-bet').attr("money");
            $.ajax({
                type: "POST",
                url: "/api/webapi/action/k3/join",
                data: {
                    listJoin: listJoin,
                    game: $('html').attr('data-dpr'),
                    gameJoin: 4,
                    xvalue: xvalue,
                    money: money,
                    authtoken:auth_token,
                },
                dataType: "json",
                success: function (response) {
                    alertMess(response.message);
                    let change = String(response.change);
                    if (response.status) {
                        $('.moneyU').text(response.money + '');
                        socket.emit('data-server-3', { change, gameJoin: 4, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
                    }
                    dropDown();
                }
            });
        }
        $('.confirm').click(async function (e) {
            if($('.container1').find('input[type=checkbox]').is(':checked') == true)
            {
            e.preventDefault();
            $(this).addClass('confirm');
            let game = $('.bet-tab .action').attr('game');
        
            if (game == 1) {
                await sendGame1();
            } else if (game == 2) {
                await sendGame2();
            } else if (game == 3) {
                await sendGame3();
            } else if (game == 4) {
                await sendGame4();
            }
            setTimeout(
                function() 
                {
                    callAjaxMeJoin();
                }, 2000);
            }
            });
            
            function callListOrder() {
                $.ajax({
                    type: "POST",
                    url: "/api/webapi/k3/GetNoaverageEmerdList",
                    data: {
                        gameJoin: $('html').attr('data-dpr'),
                        pageno: "0",
                        pageto: "10",
                        authtoken:auth_token,
                    },
                    dataType: "json",
                    success: function (response) {
                        let list_orders = response.data.gameslist;
                        $("#period").text(response.period);
                        $("#number_result").text("1/" + response.page);
                        if (firstGame && firstGame.stage == list_orders[0].period) {
                            if(socket_call == "called"){
                            var modal = document.getElementById("myModal_k3");
                            modal.style.display = "block";
                            var myModalheader = document.getElementById("myModal_header");
                            var myModal_result = document.getElementById("myModal_result");
                            var lottery_result = document.getElementById("lottery_result");
                            var myModal_result_Period = document.getElementById("myModal_result_Period");
                            if (firstGame.get == 0) {
                                myModalheader.innerHTML = "Try Again";
                                myModal_result.innerHTML = "LOSS :" + firstGame.money;
                            } else {
                                myModalheader.innerHTML = "congratulations";
                                myModal_result.innerHTML = "WIN :" + firstGame.get;
                            }
                            myModal_result_Period.innerHTML = "Period :K "+$('html').attr('data-dpr')+"min " + firstGame.stage;
                            var count1=0;
                            var a_result1 = list_orders[0].result.toString().split("");
                            var dice_txt = '';
                            for (var i=a_result1.length; i--;) {
                              count1+= parseInt(a_result1[i]);
                              dice_txt += '<div data-v-2d418cc5="" class="n'+(i+1)+'"></div>,'
                            }
                            $("#modal_dice").html(dice_txt.slice(0,-1));
                            let color;
                            let type;
                    
                            if (count1 >= 2 && count1 <= 10) {
                                type = "S";
                            } else if (count1 >= 11 && count1 <= 20) {
                                type = "B";
                            }
                            if (count1 % 2 == 0) {
                                color = "Even";
                            } else {
                                color = "Odd";
                            }
                            $("#modal_sum").html(count1);
                            $("#modal_bsmll").html(type);
                            $("#modal_oddev").html(color);
                        }
                        }
                        ShowListOrder(list_orders);
                        $('.Loading').fadeOut(0);
                        let result = String(list_orders[0].result).split('');
                        $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${result[0]}`);
                        $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${result[1]}`);
                        $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${result[2]}`);
                    },
                });
            }
            
            callListOrder();
            function callAjaxMeJoin() {
                $.ajax({
                    type: "POST",
                    url: "/api/webapi/k3/GetMyEmerdList",
                    data: {
                        gameJoin: $('html').attr('data-dpr'),
                        pageno: "0",
                        pageto: "10",
                        authtoken:auth_token,
                    },
                    dataType: "json",
                    success: function (response) {
                        let data = response.data.gameslist;
                        $("#number_result").text("1/" + response.page);
                        var modal = document.getElementById("myModal_k3");
                        modal.style.display = "none";
                        // Set the value of firstGame to the first game in the gameslist
                        firstGame = data[0];
                        console.log(firstGame);
                        GetMyEmerdList(data);
                        $('.Loading').fadeOut(0);
                    },
                });
            }
            
            
            
            
            $('#history').click(function (e) { 
                e.preventDefault();
                callListOrder();
                $('.header-history').removeClass('d-none');
                $(this).addClass('block-click action');
                $('#myBet').removeClass('block-click action');
                $('#number_result').attr('data-select', 'all');
                pageno = 0;
                limit = 10;
                page = 1;
                $("#next").removeClass("block-click");
                $("#next").addClass("action");
                $("#next .van-icon-arrow").css("color", "#fff");
                $("#previous").addClass("block-click");
                $("#previous").removeClass("action");
                $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
            });
            
            $('#myBet').click(function (e) { 
                e.preventDefault();
                callAjaxMeJoin();
                $('.header-history').addClass('d-none');
                $(this).addClass('block-click action');
                $('#history').removeClass('block-click action');
                $('#number_result').attr('data-select', 'mybet');
                pageno = 0;
                limit = 10;
                page = 1;
                $("#next").removeClass("block-click");
                $("#next").addClass("action");
                $("#next .van-icon-arrow").css("color", "#fff");
                $("#previous").addClass("block-click");
                $("#previous").removeClass("action");
                $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
            });
            
            
            var pageno = 0;
            var limit = 10;
            var page = 1;
            $("#next").click(function (e) {
                e.preventDefault();
                let check = $('#number_result').attr('data-select');
                $('.Loading').fadeIn(0);
                $("#previous").removeClass("block-click");
                $("#previous").addClass("action");
                $("#previous .van-icon-arrow-left").css("color", "#fff");
                pageno += 10;
                let pageto = limit;
                let url = '';
                if (check == 'all') {
                    url = "/api/webapi/k3/GetNoaverageEmerdList";
                } else {
                    url = "/api/webapi/k3/GetMyEmerdList";
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        gameJoin: $('html').attr('data-dpr'),
                        pageno: pageno,
                        pageto: pageto,
                        authtoken:auth_token,
                    },
                    dataType: "json",
                    success: async function (response) {
                        $('.Loading').fadeOut(0);
                        if (response.status === false) {
                            pageno -= 10;
                            $("#next").addClass("block-click");
                            $("#next").removeClass("action");
                            $("#next .van-icon-arrow").css("color", "#7f7f7f");
                            alertMess(response.msg);
                            return false;
                        }
                        let list_orders = response.data.gameslist;
                        $("#period").text(response.period);
                        $("#number_result").text(++page + "/" + response.page);
                        if (check == 'all') {
                            ShowListOrder(list_orders);
                        } else {
                            GetMyEmerdList(list_orders);
                        }
                    },
                });
            });
            $("#previous").click(function (e) {
                e.preventDefault();
                let check = $('#number_result').attr('data-select');
                $('.Loading').fadeIn(0);
                $("#next").removeClass("block-click");
                $("#next").addClass("action");
                $("#next .van-icon-arrow").css("color", "#fff");
                pageno -= 10;
                let pageto = limit;
                let url = '';
                if (check == 'all') {
                    url = "/api/webapi/k3/GetNoaverageEmerdList";
                } else {
                    url = "/api/webapi/k3/GetMyEmerdList";
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        gameJoin: $('html').attr('data-dpr'),
                        pageno: pageno,
                        pageto: pageto,
                        authtoken:auth_token,
                    },
                    dataType: "json",
                    success: async function (response) {
                        $('.Loading').fadeOut(0);
                        if (page - 1 < 2) {
                            $("#previous").addClass("block-click");
                            $("#previous").removeClass("action");
                            $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
                        }
                        if (response.status === false) {
                            pageno = 0;
                            $("#previous .arr:eq(0)").addClass("block-click");
                            $("#previous .arr:eq(0)").removeClass("action");
                            $("#previous .van-icon-arrow-left").css("color", "#7f7f7f");
                            alertMess(response.msg);
                            return false;
                        }
                        let list_orders = response.data.gameslist;
                        $("#period").text(response.period);
                        $("#number_result").text(--page + "/" + response.page);
                        if (check == 'all') {
                            ShowListOrder(list_orders);
                        } else {
                            GetMyEmerdList(list_orders);
                        }
                    },
                });
                
            });
            socket.on("data-server-k3", function (msg) {
                if (msg) {
                    let checkData = $('html').attr('data-dpr');
                    if (checkData == msg.game) {
                        pageno = 0;
                        limit = 10;
                        page = 1;
                        let notResult = msg.data[0];
                        let Result = msg.data[1];
                        socket_call = "called";
                        let check = $('#number_result').attr('data-select');
                        console.log(check);
                        if (check == 'all') {
                            reload_money();
                            callListOrder();
                            RenderResult(Result.result);
                        } else {
                            reload_money();
                            callAjaxMeJoin();
                            RenderResult(Result.result);
                        }
                        $('#period').text(notResult.period);
                        $("#previous").addClass("block-click");
                        $("#previous").removeClass("action");
                        $("#previous .van-icon-arrow").css("color", "#7f7f7f");
                        $("#next").removeClass("block-click");
                        $("#next").addClass("action");
                        $("#next .van-icon-arrow").css("color", "#fff");
                        $('.container1').click();
                    }
                    $(".Loading").fadeOut(0);
                }
            });
        });
        
    }
    catch (err) {
      alert(err);
    }
  }
auth();