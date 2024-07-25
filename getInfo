javascript:(function() {
document.addEventListener('click', function Get_Elements9876(event) {

    event.preventDefault(); // デフォルトのクリック動作を防止

    // クリックされた要素が rerunButton であれば処理を終了
    if (event.target.id === 'dontRun9876') {
        return;
    }
    


// ------------------------変数宣言-----------------------//
    // 全要素を取得、取得したClassなどがいくつあるかカウントするのに使う
    var allElements = document.querySelectorAll('*');

    // クリックされた要素を取得
    var clickedElement = event.target; //クリックされた要素
    var clickedElementHTML = clickedElement.outerHTML; //クリックされた要素のHTML
    var parentElement = clickedElement.parentElement;
    var clickedElementHTML_Text = escapeHtml(clickedElementHTML)
    // HTMLエスケープ用関数
    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }


    // IDを取得
    var clickedID = clickedElement.id;
    var parentID = parentElement ? parentElement.id : '';
    var clickedID_count = count_the_element('id', clickedID);
    var parentID_count = parentID ? count_the_element('id', parentID) : '';

    // Name を取得
    var clickedName = clickedElement.getAttribute('name');
    var parentName = parentElement ? parentElement.getAttribute('name') : '';
    var clickedName_count = count_the_element('name', clickedName);
    var parentName_count = parentName ? count_the_element('name', parentName) : '';

    // クラスを取得
    var clickedClass = clickedElement.className;
    var parentClasses = parentElement ? parentElement.className : '';
    var clickedClass_count = count_the_element('class', clickedClass);
    var parentClasses_count = parentClasses ? count_the_element('class', parentClasses) : '';

    // hrefを取得
    var hrefValue = clickedElement.getAttribute('href');
    var hrefValue_count = count_the_element('href', hrefValue);
    var parentHrefValue = parentElement ? parentElement.getAttribute('href') : '';
    var parentHrefValue_count = parentHrefValue ? count_the_element('href', parentHrefValue) : '';


    function count_the_element(attribute, value) {
        var count = 0;
    
        allElements.forEach(function(element) {
            if (attribute === 'class') {
                // element.classListを使ってクラス名をチェック
                if (element.classList.contains(value)) {
                    count++;
                }
            } else {
                // 他の属性の場合
                if (element.getAttribute(attribute) === value) {
                    count++;
                }
            }
        });
        return count;
    }
    

//------------------ ダイアログ関連 -------------------//

    //ダイアログの後ろを半透明の黒にするやつ
    var dialogOverlay = document.createElement('div');
    dialogOverlay.style.position = 'fixed';
    dialogOverlay.style.top = '0';
    dialogOverlay.style.left = '0';
    dialogOverlay.style.width = '100%';
    dialogOverlay.style.height = '100%';
    dialogOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dialogOverlay.style.zIndex = '999';
    
    //ダイアログ自体の設定
    var dialog = document.createElement('div');
    dialog.id = 'dontRun9876';
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.width = '100%';
    dialog.style.maxWidth = '80vw'; // 最大幅をページ幅の80%に設定
    

    dialog.style.height = 'auto';
    dialog.style.backgroundColor = 'white';
    dialog.style.padding = '10px';
    dialog.style.border = '1px solid #ccc';
    dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    dialog.style.zIndex = '1000';
    dialog.style.boxSizing = 'border-box';
    dialog.style.overflow = 'hidden'; // 確保のために追加
    dialog.style.borderRadius = '15px'; // 角を丸める

    // ダイアログの中に表示する文字の設定
    var dialogContent = document.createElement('div');
    dialogContent.style.maxHeight = '300px'; // 高さを制限
    
    // dialogContent.style.overflow = 'auto'; // 縦のスクロールを可能に
    dialogContent.style.textOverflow = 'ellipsis'; // 省略記号を表示
    dialogContent.style.whiteSpace = 'nowrap'; // テキストを1行に制限
    dialogContent.style.overflow = 'auto';

    // テキストエリア
    var textarea = document.createElement('textarea');
    textarea.rows = 15; // 高さを設定、10文字分という意味
    textarea.style.width = '100%'; // 幅を設定
    
    // テキストエリアの初期値
    var selector5555 = 'a[href*="tel:"]'
    var CV_id_value = 'AW-1111111111111'
    var CV_id_label = 'a_aaaaa-bbbbbbbbZEMy6i4'
    var if_option01 = ''
    var if_option02 = ''

    // スクリプトコードの変数
     textarea.value  = `<script>
${if_option01}window.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('${selector5555}').forEach(function(element) {
            element.addEventListener('click', function(){
                gtag('event', 'conversion', {'send_to': '${CV_id_value}/${CV_id_label}'});
            });
        });
    });
${if_option02}</script>
    `;




// --------------------ダイアログの Option欄-------------------//
    var optionArea = document.createElement('div');

    // Flexboxコンテナとしてのスタイルを設定
    optionArea.style.display = 'flex';
    optionArea.style.justifyContent = 'space-between';
    optionArea.style.gap = '10px'; // 入力欄の間に10pxの間隔を設定
    optionArea.style.marginBottom = '10px';
    optionArea.style.whiteSpace = 'nowrap'; // 改行しないようにする
    // input欄、CV IDとCV label用
    var input_CV_ID = document.createElement('input');
    input_CV_ID.placeholder = 'CV ID'; // プレースホルダーを追加
    input_CV_ID.id = 'CV_input'; //IDを追加
    input_CV_ID.style.flex = '1'; // 横幅を均等に分割

    var input_CV_label = document.createElement('input');
    input_CV_label.placeholder = 'CV Label'; // プレースホルダーを追加
    input_CV_label.id = 'CV_input'; //IDを追加
    input_CV_label.style.flex = '1'; // 横幅を均等に分割



    // 情報をクッキーに保存するボタン
    var cookie_button = document.createElement('button');
    cookie_button.textContent = 'クッキーに保存'; // ボタンのテキストを設定
    cookie_button.id = 'dontRun9876'; // event 追加しないためにIDを設定
    cookie_button.style.marginTop = '10px';
    cookie_button.style.marginRight = '10px';
    cookie_button.style.padding = '5px 10px';
    cookie_button.style.backgroundColor = '#28a745'; // 緑色
    cookie_button.style.color = 'white';
    cookie_button.style.border = 'none';
    cookie_button.style.cursor = 'pointer';
    cookie_button.style.borderRadius = '8px'; // 角を丸める

    // クッキー用ダイアログの作成
    var cookie_dialog = document.createElement('div');
    cookie_dialog.style.display = 'none'; // 初期状態で非表示
    cookie_dialog.style.position = 'fixed';
    cookie_dialog.style.top = '50%';
    cookie_dialog.style.left = '50%';
    cookie_dialog.style.transform = 'translate(-50%, -50%)';
    cookie_dialog.style.backgroundColor = '#fff';
    cookie_dialog.style.padding = '20px';
    cookie_dialog.style.border = '1px solid #ccc';
    cookie_dialog.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)';
    cookie_dialog.style.zIndex = '1010'; // ダイアログを最前面に表示
    cookie_dialog.textContent = 'ダイアログの内容';

    // クッキー用ダイアログを閉じるためのボタン
    var cooki_close = document.createElement('button');
    cooki_close.textContent = '閉じる';
    cooki_close.style.marginTop = '10px';
    cooki_close.style.backgroundColor = '#dc3545'; // 赤色
    cooki_close.style.color = 'white';
    cooki_close.style.border = 'none';
    cooki_close.style.cursor = 'pointer';
    cooki_close.style.borderRadius = '4px';
    cooki_close.addEventListener('click', function() {
        cookie_dialog.style.display = 'none'; // ダイアログを非表示にする
    });

    // ダイアログに閉じるボタンを追加
    cookie_dialog.appendChild(cooki_close);

    // ボディにダイアログを追加
    document.body.appendChild(cookie_dialog);

    // ボタンにクリックイベントリスナーを追加
    cookie_button.addEventListener('click', function() {
        cookie_dialog.style.display = 'block'; // ダイアログを表示
    });



    // IF文追加するかどうかのチェックボックスの作成
    var checkbox9876 = document.createElement('input');
    checkbox9876.type = 'checkbox';
    checkbox9876.id = 'myCheckbox12345';

    // チェックボックスのラベルの作成
    var checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'myCheckbox12345';
    checkboxLabel.textContent = 'if文を追加';


    // チェックボックスとラベルのスタイル設定（オプション）
    checkbox9876.style.marginRight = '10px';


    // input欄をOption欄に追加
    optionArea.appendChild(input_CV_ID);
    optionArea.appendChild(input_CV_label);
    optionArea.appendChild(cookie_button);
    optionArea.appendChild(checkboxLabel);
    optionArea.appendChild(checkbox9876);


// --------------------ダイアログのコンテント設定-------------------//

    // コンテンツに挿入するタグ部分を設定
    var TagSetting = '<a href="#" class="css3456" id="dontRun9876" style="white-space: normal;">';
    var TagBasic = '<a href="#" class="css3456" id="dontRun9876" ';
    var tagClass = TagBasic + 'data-attribute="class">';
    var tagAtag = TagBasic + 'data-attribute="Atag" >';
    var tagID   = TagBasic + 'data-attribute="id">';
    var tagName   = TagBasic + 'data-attribute="name">';

    // ダイアログのコンテンツを設定
    dialogContent.innerHTML = 'クリックした要素のHTML' + '<br>'+ TagSetting + clickedElementHTML_Text 
        // + clickedElementHTML 
        + '</a>' +
        '<br>ID: ' + tagID + clickedID + (clickedID_count ? ' (' + clickedID_count + ')' : '') + '</a>' +
        '<br>親要素のID: ' + tagID + parentID + (parentID_count ? ' (' + parentID_count + ')' : '') + '</a>' +
        '<br>クラス: ' + tagClass + clickedClass + (clickedClass_count ? ' (' + clickedClass_count + ')' : '') + '</a>' +
        '<br>親要素のクラス: ' + tagClass + parentClasses + (parentClasses_count ? ' (' + parentClasses_count + ')' : '') + '</a>' +
        '<br>aタグ: ' + tagAtag + hrefValue + (hrefValue_count ? ' (' + hrefValue_count + ')' : '') + '</a>' +
        '<br>親要素のaタグ: ' + tagAtag + parentHrefValue + (parentHrefValue_count ? ' (' + parentHrefValue_count + ')' : '') + '</a>' +
        '<br>Name: ' + tagName + clickedName + (clickedName_count ? ' (' + clickedName_count + ')' : '') + '</a>' +
        '<br>親要素のName: ' + tagName + parentName + (parentName_count ? ' (' + parentName_count + ')' : '') + '</a>';

// --------------------ボタン設定-------------------//

    // Closeボタンの作成        
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.id = 'dontRun9876'; // event 追加しないためにIDを設定
    closeButton.style.marginTop = '10px';
    closeButton.style.marginRight = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '8px'; // 角を丸める

    // Closeボタン押したらダイアログとオーバーレイを削除
    closeButton.addEventListener('click', function() {
        document.body.removeChild(dialogOverlay);
        document.body.removeChild(dialog);
    });

    
    // 再実行ボタンの作成
    var rerunButton = document.createElement('button');
    rerunButton.textContent = 'Re-run';
    rerunButton.id = 'dontRun9876'; // event 追加しないためにIDを設定
    rerunButton.style.marginTop = '10px';
    rerunButton.style.marginRight = '10px';
    rerunButton.style.padding = '5px 10px';
    rerunButton.style.backgroundColor = '#28a745'; // 緑色
    rerunButton.style.color = 'white';
    rerunButton.style.border = 'none';
    rerunButton.style.cursor = 'pointer';
    rerunButton.style.borderRadius = '8px'; // 角を丸める

    // 再実行ボタンのクリックイベントリスナー
    rerunButton.addEventListener('click', function() {
        
        document.body.removeChild(dialogOverlay);
        document.body.removeChild(dialog);

        // 再実行する
        document.addEventListener('click', Get_Elements9876); // 新しいリスナーを追加
    });


    dialog.appendChild(dialogContent);
    dialog.appendChild(optionArea);
    dialog.appendChild(textarea); 
    dialog.appendChild(rerunButton);
    dialog.appendChild(closeButton);
    document.body.appendChild(dialogOverlay);
    document.body.appendChild(dialog);


//--------------ダイアログボックスに表示されている抽出したClassなどをクリックするとコードに内容を反映させる部分--------------

    // クラスやURLをクリックしたさいにイベントが起こるように追加
    document.querySelectorAll('.css3456').forEach(function(element) {
        element.addEventListener('click', function(event) {
            
            event.preventDefault(); // リンクのデフォルト動作を防ぐ


            // クリックされた要素のテキストを取得
            var selectorValue = event.target.textContent.trim();
            
            // 後ろから（で検索してそれ以降の文字を消す
            var index09877 = selectorValue.lastIndexOf("(");
            if (index09877 !== -1) {
                selectorValue = selectorValue.substring(0, index09877).trim();
            }

            // クリックされた要素のdata-attributeを取得してIFで処理を変えてる
            var attributeType = event.target.getAttribute('data-attribute');

            if (attributeType === 'class') {
                selector5555 = `.` + selectorValue;
            } else if (attributeType === 'id') {
                selector5555 = `#` + selectorValue;
            } else if (attributeType === 'Atag') {
                // URLをPathに変換
                selectorValue = convertUrlToPath(selectorValue)
                selector5555 = 'a[href*="' + selectorValue + '"]';
            }else if (attributeType === 'name') {
                selector5555 = '[name="' + selectorValue + '"]';
            }

            updateTextarea(); // テキストエリアの内容を更新
        });
    });


    // input欄に入力されたらそれがTextareaに反映される関数
    input_CV_ID.addEventListener('input', function(event) {
        CV_id_value = event.target.value;
        updateTextarea(); // テキストエリアの内容を更新
    });

    input_CV_label.addEventListener('input', function(event) {
        CV_id_label = event.target.value;
        updateTextarea(); // テキストエリアの内容を更新
    });

    // if文のチェックボックスで発火するIf文を追加する関数
    checkbox9876.addEventListener('change', function(event) {
        if (event.target.checked) {
            // チェックボックスがチェックされた場合の処理
            var location_if = convertUrlToPath(window.location.href);
            if_option01 = `if(window.location.href.includes("${location_if}")) {\n` ;
            if_option02 = '}\n' ;
        } else {
            // チェックボックスがチェック外された場合の処理
            if_option01 = '' ;
            if_option02 = '' ;
        }
        
        updateTextarea(); // テキストエリアの内容を更新
    });


    //Textareaないをupdateして最新の状態にする関数
    function updateTextarea() {
        textarea.value  = `<script>
${if_option01}window.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('${selector5555}').forEach(function(element) {
            element.addEventListener('click', function(){
                gtag('event', 'conversion', {'send_to': '${CV_id_value}/${CV_id_label}'});
            });
        });
    });
${if_option02}</script>
    `;
    }
    
    // イベントを削除
    document.removeEventListener('click', Get_Elements9876);
});
})();


//URL stringからホストとPathnameにする
function convertUrlToPath(urlString) {
    try {
        var url = new URL(urlString);
        var host = url.host;
        var pathname = url.pathname;
        return host + pathname;
    } catch (e) {
        console.error('Invalid URL:', urlString);
        return null;
    }
}




// クッキーにデータを保存する関数
function setCookie( cvId, cvLabel, cvName) {
    var days = 30 //保存期間
    var Cookie_name = 'ads'
    var expires = "";
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // ミリ秒に変換
        expires = "; expires=" + date.toUTCString();
    }

    var cookieValue = JSON.stringify({
        cvName: cvName,
        cvId: cvId,
        cvLabel: cvLabel
        
    });
    document.cookie = Cookie_name + "=" + encodeURIComponent(cookieValue) + expires + "; path=/";
}

setCookie('444444','fffffffffff','こんばーじょん')

// クッキーからデータを取得する関数
function getCookie() {
    var Cookie_name = 'ads'
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// クッキーからデータを取得してパースする関数
function getCookieData(name) {
    var cookieValue = getCookie(name);
    if (cookieValue) {
        return JSON.parse(cookieValue);
    }
    return null;
}



