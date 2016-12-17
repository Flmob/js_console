var scr_b = document.getElementById('scr_body');

var win = document.getElementById('win_sim');
var win_h = document.getElementById('win_head');
var win_b = document.getElementById('win_body');

var cont = document.getElementById('content_text');
var win_inp = document.getElementById('inpLine');
var win_ok = document.getElementById('enterBtn');
var size_changer = document.getElementById('win_resize');
var tabl = document.getElementById('myTable');

var w_norm1 = document.getElementById('norm1')
var w_right1 = document.getElementById('right1');
var w_down1 = document.getElementById('down1');

var CurrWinStyle = GetCurrStyle(win);
var IsNorm = true,
    IsSided = false;

WinCorrection();

w_norm1.onclick = NormSide;
w_down1.onclick = DownSide;
w_right1.onclick = RightSide;

function GetCurrStyle(from) {
    var tmp = {};

    tmp.top = from.getBoundingClientRect().top;
    tmp.left = from.getBoundingClientRect().left;
    tmp.height = from.getBoundingClientRect().height;
    tmp.width = from.getBoundingClientRect().width;

    return tmp;
}

function NormSide() {
    win.style.top = CurrWinStyle.top + 'px';
    win.style.left = CurrWinStyle.left + 'px';
    win.style.height = CurrWinStyle.height + 'px';
    win.style.width = CurrWinStyle.width + 'px';

    IsNorm = true;
    IsSided = false;

    WinCorrection();
}

function RightSide() {
    if (IsNorm) {
        CurrWinStyle = GetCurrStyle(win);
        IsNorm = false;
    }

    win.style.height = scr_b.offsetHeight + 'px';
    win.style.width = (scr_b.offsetWidth / 5) + 'px';
    win.style.left = (scr_b.offsetWidth - win.offsetWidth) + 'px';
    win.style.top = '0';
    win.style.right = '0';

    IsSided = true;
    IsNorm = false;

    WinCorrection();
};

function DownSide() {
    if (IsNorm) {
        CurrWinStyle = GetCurrStyle(win);
        IsNorm = false;
    }

    win.style.height = (scr_b.offsetHeight / 4) + 'px';
    win.style.top = (scr_b.offsetHeight - win.offsetHeight) + 'px';
    win.style.width = scr_b.offsetWidth + 'px';
    win.style.left = '0';

    IsSided = true;
    IsNorm = false;

    WinCorrection();
}

function FullSide() {
    if (IsNorm) {
        CurrWinStyle = GetCurrStyle(win);
        IsNorm = false;
    }

    win.style.top = '0';
    win.style.left = '0';
    win.style.height = scr_b.offsetHeight + 'px';
    win.style.width = scr_b.offsetWidth + 'px';

    IsSided = true;
    IsNorm = false;

    WinCorrection();
}

function WinCorrection() {
    win_b.style.width = win.offsetWidth + 'px';
    win_b.style.height = (win.offsetHeight - win_h.offsetHeight) + 'px';
    win_b.style.left = 0;
    win_inp.style.width = win_b.offsetWidth - (win_ok.offsetWidth + size_changer.offsetWidth) + 'px';
    cont.style.height = (win_b.offsetHeight - win_inp.offsetHeight) + 'px';
    cont.style.width = (win_b.offsetWidth - 4) + 'px';
}

win_h.onmousedown = function MouseWork(e) {
    var NewX, NewY;
    var maxX, maxY;
    var IsMove = false;
    var win_h_pos;

    FindXaY(e);

    document.ondragstart = function() {
        return false;
    };

    function FindXaY(e) {
        win_h_pos = win_h.getBoundingClientRect();
        maxX = scr_b.getBoundingClientRect().width;
        maxY = scr_b.getBoundingClientRect().height;

        if (IsSided) {
            NewX = Math.ceil(CurrWinStyle.width / 2);
        } else NewX = e.pageX - win_h_pos.left;

        NewY = e.pageY - win_h_pos.top;
    }

    function moveAt(e) {
        win_h.style.cursor = 'move';

        var newL = (e.pageX - NewX);
        var newT = (e.pageY - NewY);

        if (newL < 0) {
            newL = 0;
        } else if (newL > maxX - CurrWinStyle.width) {
            newL = maxX - CurrWinStyle.width;
        }

        if (newT < 0) {
            newT = 0;
        } else if (newT > maxY - win.getBoundingClientRect().height) {
            newT = maxY - win.getBoundingClientRect().height;
        }

        win.style.left = newL + 'px';
        win.style.top = newT + 'px';

        WinCorrection();
    }

    document.onmousemove = function(e) {
        if (!IsMove) {
            NormSide();
            IsMove = false;
        }
        win_h.style.cursor = 'move';
        moveAt(e);
    }

    document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        win_h.style.cursor = 'default';

        if (e.pageX >= scr_b.getBoundingClientRect().width - 3) {
            IsNorm = false;
            RightSide();
        } else if (e.pageY >= scr_b.getBoundingClientRect().height - 3) {
            IsNorm = false;
            DownSide();
        }

        if (!IsSided) CurrWinStyle = GetCurrStyle(win);

        IsMove = false;
    }
}

size_changer.onmousedown = function win_resize() {
    // -ms-user-select!!!

    if(IsSided) return;

    scr_b.style.cursor = 'se-resize';

    document.ondragstart = function() {
        return false;
    };

    document.onmousemove = function(e) {
        win.style.width = e.pageX - CurrWinStyle.left + Math.ceil(size_changer.offsetWidth / 2) + 'px';
        win.style.height = e.pageY - CurrWinStyle.top + Math.ceil(size_changer.offsetHeight / 2) + 'px';

        if (e.pageY >= scr_b.offsetHeight) win.style.height = scr_b.offsetHeight - GetCurrStyle(win).top + 'px';
        if (e.pageX >= scr_b.offsetWidth) win.style.width = scr_b.offsetWidth - GetCurrStyle(win).left + 'px';

        WinCorrection();
    }

    document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;

        CurrWinStyle = GetCurrStyle(win);
        scr_b.style.cursor = 'auto';
    }
}
