$(document).ready(function(){
    var $num = $('#boxNum'),
        $list = $('#boxList'),
        $btn = $('#btn'),
        $cancel = $('#btnCancel'),
        $next = $('#btnNext'),
        $total = $('#boxTotal'),
        $done = $('#done'),
        $hundred = $('#hundred'),
        $ten = $('#ten'),
        $single = $('#single'),
        $waiting = $('#boxWaitingNum'),
        $restart = $('#boxRestart'),
        all = 150,
        waiting = all,
        newNum,
        ary = [],
        doneNum = 0;

    //get a new lucky number
    function getNewNum(){
        newNum = Math.floor( Math.random()*all + 1 );
        if (ary.indexOf(newNum) >= 0){
            console.log(newNum+ ' again');
            getNewNum();
        } else {
            ary.push(newNum);
            $waiting.text(--waiting);
            if (newNum < 10){
                newNum = '00' + newNum;
            } else if (newNum < 100){
                newNum = '0' + newNum;
            } else {
                newNum += '';
            }
        }
    }

    //cancel the previous number
    function cancelPrev(){
        if ($total.text() === '0') return;
        $list.children('li:last').remove();
        ary.pop();
        console.log('after cancel: ' + ary);
        $total.text(ary.length - doneNum);
        $waiting.text(++waiting);
        if ($total.text() === '0'){
            $cancel.addClass('na');
            $next.addClass('na');
        }
    }

    //begin next round
    function nextRound(){
        if ($total.text() === '0') return;
        $list.clone().attr('class', 'done-list').removeAttr('id').insertAfter('#done p');
        $done.slideDown();
        doneNum += parseInt($total.text());
        $total.text('0');
        $list.empty();
        $cancel.addClass('na');
        $next.addClass('na');
        console.log('after next: ' + ary);
        console.log('doneNum:'+doneNum);
    }

    //set the number board to zero
    function setZero(){
        $hundred.text('0');
        $ten.text('0');
        $single.text('0');
    }

    //"luck" button click event
    $btn.click(function(){
        getNewNum();
        console.log('after get: ' + ary);
        $hundred.text(newNum.substr(0, 1));
        $ten.text(newNum.substr(1, 1));
        $single.text(newNum.substr(2, 1));
        $total.text(ary.length - doneNum);
        $list.append('<li>' + newNum + '</li>')
        $cancel.removeClass('na');
        $next.removeClass('na');
    });

    //"cancel" button click event
    $cancel.click(function(){
        cancelPrev();
        setZero();
    });

    //"next" button click event
    $next.click(function(){
        nextRound();
        setZero();
    });

    //“restart” link click event
    $restart.click(function(){
        location.reload();
    });
});
