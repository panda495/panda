
// ブックマークレット用の１行バージョン 0811
// javascript:(function(){function clearInputsWithin(element){var inputs=element.querySelectorAll('input');inputs.forEach(function(input){if(input.type!=='hidden'){input.value='';}});}function showDialog(){var dialog=document.createElement('div');dialog.style.position='fixed';dialog.style.top='50%';dialog.style.left='50%';dialog.style.transform='translate(-50%, -50%)';dialog.style.backgroundColor='rgba(0, 0, 0, 0.5)';dialog.style.color='white';dialog.style.padding='20px';dialog.style.borderRadius='10px';dialog.style.zIndex='1000';dialog.style.textAlign='center';dialog.style.fontSize='16px';dialog.style.opacity='1';dialog.style.transition='opacity 0.5s ease-out';dialog.innerText='クリックした要素以下のValueをClearします';document.body.appendChild(dialog);return dialog;}function setupClickListener(){var dialog=showDialog();function handleClick(event){var clickedElement=event.target;clearInputsWithin(clickedElement);setTimeout(function(){dialog.style.opacity='0';setTimeout(function(){document.body.removeChild(dialog);},500);},0);document.removeEventListener('click',handleClick);}document.addEventListener('click',handleClick);}setupClickListener();})();


// クリックされた要素の下にあるすべての input 要素の値を空にする関数
function clearInputsWithin(element) {
    // 子要素の input 要素の値を空にする
    var inputs = element.querySelectorAll('input');
    inputs.forEach(function(input) {
        if (input.type !== 'hidden') { // hiddenタイプのinputはスキップ
            input.value = '';
        }
    });
}

// ダイアログを作成して表示する関数
function showDialog() {
    var dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dialog.style.color = 'white';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '10px';
    dialog.style.zIndex = '1000';
    dialog.style.textAlign = 'center';
    dialog.style.fontSize = '16px';
    dialog.style.opacity = '1';
    dialog.style.transition = 'opacity 0.5s ease-out';
    dialog.innerText = 'クリックした要素以下のValueをClearします';

    document.body.appendChild(dialog);

    return dialog;
}

// クリックイベントリスナーを追加する関数
function setupClickListener() {

    // ダイアログを表示
    var dialog = showDialog();
    function handleClick(event) {
        var clickedElement = event.target;



        // クリックされた要素の下にあるすべての input 要素の値を空にする
        clearInputsWithin(clickedElement);

        // ダイアログをクリックされた要素以下の値をクリアした後にフェードアウトして削除
        setTimeout(function() {
            dialog.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(dialog);
            }, 500); // ダイアログのフェードアウト時間と一致させる
        }, 0); // ダイアログの表示から即時フェードアウト

        // 一度発火した後にすべてのクリックイベントリスナーを削除する
        document.removeEventListener('click', handleClick);
    }

    // 一度だけ発火するようにイベントリスナーを設定
    document.addEventListener('click', handleClick);
}

// イベントリスナーを設定
setupClickListener();
