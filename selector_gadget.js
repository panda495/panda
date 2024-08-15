



// jQuery を再割り当て、他のライブラリなどにドルマークを使われている場合エラーが出るのでそれを回避するため
var $ = window.jQuery;
// グローバル変数として gadgetBox を定義
// 変数の初期値宣言
var uniqueSelector = ''
var CV_id_value = 'AW-1111111111111'
var CV_id_label = 'a_aaaaa_bbbbbbbbb'
var if_option01 = ''
var if_option02 = ''
var cv_content = ''

// ダイアログボックスの作成,これだけ関数の外で先に作って、ダイアログボックス内を無視する処理時に未定義エラーを防いでる
var gadgetBox = document.createElement('div');
gadgetBox.id = 'selector-gadget';
gadgetBox.style.position = 'fixed';
gadgetBox.style.bottom = '10px';
gadgetBox.style.right = '10px';
gadgetBox.style.height = '80vh';
gadgetBox.style.width = '40vw';
gadgetBox.style.backgroundColor = '#333';
gadgetBox.style.color = '#fff';
gadgetBox.style.opacity = '0.8';
gadgetBox.style.padding = '10px';
gadgetBox.style.borderRadius = '5px';
gadgetBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
gadgetBox.style.zIndex = '1000';

// updateDialogContent関数で使用するのでグローバルにしてる
// ヘッダーの作成
var gadgetHeader = document.createElement('div');
gadgetHeader.style.display = 'flex';
gadgetHeader.style.justifyContent = 'space-between';
gadgetHeader.style.alignItems = 'center';
gadgetHeader.style.marginBottom = '10px'
gadgetBox.appendChild(gadgetHeader);

var gadgetTitle = document.createElement('span');
gadgetTitle.style.cursor = 'pointer';
gadgetTitle.textContent = 'Selector Gadget';
gadgetTitle.setAttribute('title', 'Click to copy'); // ツールチップ
gadgetHeader.appendChild(gadgetTitle);



var closeButton = document.createElement('button');
closeButton.textContent = '×';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.color = '#fff';
closeButton.style.fontSize = '16px';
closeButton.style.cursor = 'pointer';
closeButton.onclick = function() {
    gadgetBox.style.display = 'none';
    document.removeEventListener('click', setupClickListener);
};
gadgetHeader.appendChild(closeButton);

// ダイアログ内のコンテンツエリア
var dialogContent = document.createElement('div');
dialogContent.id = 'dialogContent';
gadgetBox.appendChild(dialogContent);

// --------メイン関数部分-------------
(function() {    

    making_dialog(gadgetBox);
    // jQueryをロードしてからクリックリスナーを設定

    addCopyEvent_title();

    loadJQuery(function() {
        // jQueryがロードされた後にクリックイベントリスナーを設定
        document.addEventListener('click', setupClickListener);

        detect_iframe();
        var AutoDetects = auto_detict_input(); //戻り値はObject
        
        if (AutoDetects.mail) {
            console.log('fired auto detect input')
            updateDialogContent_autoDetect(AutoDetects.mail,AutoDetects.phone,AutoDetects.type) 
        }else{
            //InputでDetectできなかったらTextで行い、DetectできたらContentのUpdateする
            
            var AutoDetects_text = auto_detict_text();
            if (AutoDetects_text.mail) {
                console.log('fired auto detect text')
                updateDialogContent_autoDetect(AutoDetects_text.mail,AutoDetects_text.phone,AutoDetects_text.type) 
            }
        }


    });

})();
    

// ------- Jquery読み込み,イベント付与関連 -------

// jQueryがロードされていない場合にロードする関数
function loadJQuery(callback) {
    if (window.jQuery) {
        callback();
    } else {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        // script.integrity = 'sha256-KyZXEAg3QhqLMpG8r+Knujsl5/8s1bA25S0deh03hXjs=';
        script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
        script.crossOrigin = 'anonymous';
        script.onload = callback;
        document.head.appendChild(script);
    }
}

// CSS取得実行関数
function setupClickListener(event) {

    // ダイアログボックス内のクリックを無視
    if (gadgetBox.contains(event.target)) {
        return;
    }

    event.preventDefault();  // デフォルトのアクションを防ぐ
    event.stopPropagation(); // イベントのバブリングを停止する

    var $target = $(event.target);
        uniqueSelector = getUniqueSelector($target);


    // ダイアログ内容の更新
    updateDialogContent(uniqueSelector);

    // JS Path形式に変換
    // var jsPath = uniqueSelector && typeof uniqueSelector === 'string'
    //     ? "document.querySelector('" + uniqueSelector.replace(/'/g, "\\'") + "')"
    //     : 'No unique selector found';
    // alert("JS Path: " + jsPath);
}



//----------- セレクターを特定する関数--------------------

// セレクタがユニークかどうかを判断する関数
// quaryselectorAllして数が１つならTrue、違うとFalse返す
function isUniqueSelector(selector) {
    // セレクタに無効な部分が含まれていないかを検証
    try {
        var elements = document.querySelectorAll(selector);
        return elements.length === 1;
    } catch (e) {
        console.error("Invalid selector: " + selector);
        return false;
    }
}


// クリックされた要素のユニークなセレクターを生成する関数
//引数Elementとなっているが実際はjQuery オブジェクトとしてラップされたDOM 要素
function getUniqueSelector(element) {
    var tagName = element.prop("tagName").toLowerCase();
    var id = element.attr("id");
    var name = element.attr("name");
    var className = element.attr("class");
    var dataAttributes = Array.from(element[0].attributes)
                                .filter(attr => attr.name.startsWith('data-'))
                                .map(attr => `[${attr.name}="${attr.value}"]`);
    var title = element.attr("title");
    var alt = element.attr("alt");
    var placeholder = element.attr("placeholder");
    var value = element.val();
    var href = element.attr("href");
    var src = element.attr("src");
    var form = element.attr("form");

    var attributes = [
        { value: id, selector: id ? `#${id}` : null },
        { value: name, selector: name ? `[name="${name}"]` : null },
        { 
            value: className, 
            selector: className && className.trim() ? `.${className.trim().replace(/\s+/g, '.')}` : null 
          },
        ...dataAttributes,
        { value: title, selector: title ? `[title="${title}"]` : null },
        { value: alt, selector: alt ? `[alt="${alt}"]` : null },
        { value: placeholder, selector: placeholder ? `[placeholder="${placeholder}"]` : null },
        { value: value, selector: value ? `[value="${value}"]` : null },
        { value: href, selector: href ? `[href="${href}"]` : null },
        { value: src, selector: src ? `[src="${src}"]` : null },
        { value: form, selector: form ? `[form="${form}"]` : null }
    ];

    // クリックされた要素自身のセレクターを最初にチェック
    for (var attr of attributes) {
        if (attr.value && attr.selector) {
            var selector = attr.selector;
            if (isUniqueSelector(selector)) {
                return selector;
            }
        }
}

    // 親要素の中でのインデックスを取得し、nth-childセレクタを作成
    function findUniqueSelector(element) {
        var tagName = element.prop("tagName").toLowerCase();
        var parent = element.parent();

        if (parent.length) {
            var tagName = element.prop("tagName").toLowerCase();
            var id = element.attr("id");
            var name = element.attr("name");
            var className = element.attr("class");
            var form = element.attr("form");
            var dataAttributes = Array.from(element[0].attributes)
                                        .filter(attr => attr.name.startsWith('data-'))
                                        .map(attr => `[${attr.name}="${attr.value}"]`);
            var attributes = [
                id ? `#${id}` : null,
                name ? `[name="${name}"]` : null,
                className ? `.${className.replace(/\s+/g, '.')}` : null,
                ...dataAttributes,
                form ? `[form="${form}"]` : null
            ].filter(Boolean);

            
        // 要素のインデックスを取得（1-based）
        var index = element.index() + 1;

        // 各セレクターで nth-child セレクタを作成し、ユニーク性をチェック
        for (var atr of attributes) {
            var nthChildSelector = `${atr}:nth-child(${index})`; // 修正: 親セレクタに '>' は不要

            if (isUniqueSelector(nthChildSelector)) {
                return nthChildSelector;
            }
        }

        // タグでユニークなのが作れるか試す
        if(tagName){
            var nthChildSelector = `${tagName}:nth-child(${index})`;
            if (isUniqueSelector(nthChildSelector)) {
                return nthChildSelector;
            }

        }

            // 親要素を遡って再帰的にチェック
            var parentSelector = findUniqueSelector(parent);
            return parentSelector ? `${parentSelector} > ${tagName}:nth-child(${index})` : null;
        }

        // ユニークなセレクタが見つからなかった場合、最小限のセレクタを返す
        // return `${tagName}:nth-child(${element.index() + 1})`;
    }

    return findUniqueSelector(element);
}

function making_dialog(gadgetBox) {



    // ボディ部分の作成
    var gadgetBody = document.createElement('div');
    gadgetBody.style.marginTop = '10px';

    // トグルボタンの作成
    var toggleArea = document.createElement('div');
    toggleArea.style.margin = 'auto';
    toggleArea.style.width = '60px';

    var toggleCheckbox = document.createElement('input');
    toggleCheckbox.type = 'checkbox';
    toggleCheckbox.id = 'toggleCheckbox';
    toggleCheckbox.checked = true; // 初期状態はオン
    toggleCheckbox.style.display = 'none'; // チェックボックス自体は非表示

    var toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'toggleCheckbox';
    toggleLabel.style.display = 'block';
    toggleLabel.style.boxSizing = 'border-box';
    toggleLabel.style.textAlign = 'center';
    toggleLabel.style.border = '2px solid #ccc';
    toggleLabel.style.borderRadius = '3px';
    toggleLabel.style.height = '60px';
    toggleLabel.style.fontSize = '18px';
    toggleLabel.style.lineHeight = '60px';
    toggleLabel.style.fontWeight = 'bold';
    toggleLabel.style.background = '#eee';
    toggleLabel.style.boxShadow = '3px 3px 6px #888';
    toggleLabel.style.transition = '.3s';
    toggleLabel.style.cursor = 'pointer';

    var toggleSpan = document.createElement('span');
    toggleSpan.style.display = 'inline-block';
    toggleSpan.style.width = '100%';
    toggleSpan.style.height = '100%';
    toggleSpan.style.lineHeight = '60px'; // 中央揃え
    toggleLabel.style.background = '#78bd78';
    toggleLabel.style.boxShadow = 'none';
    toggleSpan.textContent = 'ON';
    toggleSpan.style.color = '#fff';

    toggleLabel.appendChild(toggleSpan);
    toggleArea.appendChild(toggleCheckbox);
    toggleArea.appendChild(toggleLabel);

    gadgetBody.appendChild(toggleArea);
    gadgetBox.appendChild(gadgetBody);

    document.body.appendChild(gadgetBox);

    // トグルボタンのスタイルを更新
    function updateToggleButton() {
        if (toggleCheckbox.checked) {
            toggleLabel.style.background = '#78bd78';
            toggleLabel.style.boxShadow = 'none';
            toggleSpan.textContent = 'ON';
            toggleSpan.style.color = '#fff';
            document.addEventListener('click', setupClickListener);

        } else {
            toggleLabel.style.background = '#eee';
            toggleLabel.style.boxShadow = '3px 3px 6px #888';
            toggleSpan.textContent = 'OFF';
            toggleSpan.style.color = '#aaa';
            document.removeEventListener('click', setupClickListener);
        }
    }

    // チェックボックスの変更時にトグルボタンのスタイルを更新
    toggleCheckbox.addEventListener('change', updateToggleButton);

    gadgetBody.appendChild(toggleLabel);
    gadgetBox.appendChild(gadgetBody);

    document.body.appendChild(gadgetBox);


    // 最小化ボタンの作成
    var minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '5px';
    minimizeButton.style.right = '40px'; // Closeボタンの左側に配置
    minimizeButton.style.backgroundColor = '#555';
    minimizeButton.style.color = '#fff';
    minimizeButton.style.border = 'none';
    minimizeButton.style.padding = '5px';
    minimizeButton.style.borderRadius = '3px';
    minimizeButton.style.cursor = 'pointer';
    gadgetHeader.appendChild(minimizeButton);

    // ダイアログ内のコンテンツエリア
    var dialogContent = document.createElement('div');
    dialogContent.id = 'dialogContent';
    gadgetBox.appendChild(dialogContent);

    // 最小化ボタンのクリックイベント
    minimizeButton.addEventListener('click', function() {
        if (dialogContent.style.display === 'none') {
            dialogContent.style.display = 'block';
            gadgetBox.style.height = '80vh';
            minimizeButton.textContent = '-';
        } else {
            dialogContent.style.display = 'none';
            gadgetBox.style.height = '30px';
            minimizeButton.textContent = '+';
        }
    });
    
}  

//  ----- GTMやGtagのコード関連-------






// 初期のcode_gtagを生成する関数
function generateCodeGtag() {
    return `
&lt;script&gt;
    ${if_option01}window.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('${uniqueSelector}').forEach(function(element) {
            element.addEventListener('click', function(){
                gtag('event', 'conversion', {'send_to': '${CV_id_value}/${CV_id_label}'${cv_content}});
            });
        });
    });
${if_option02}&lt;/script&gt;

GTMメール
function (){
    return document.querySelector('${uniqueSelector}').value;
}

GTM電話
function (){
    return document.querySelector('${uniqueSelector}').value.replace(/[^0-9]/g,'').replace('0','+81');  
}`;
        }

// ダイアログボックス内のコンテンツを更新する関数
function updateDialogContent(uniqueSelector) {
    var code_gtag = generateCodeGtag();
    var code_gtag_display = code_gtag
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    var dialogContent = document.querySelector('#dialogContent');
    if (dialogContent) {
        dialogContent.innerHTML = `<pre style="font-size: 13px; font-family: monospace; overflow-x: auto; white-space: pre;">${code_gtag_display}</pre>`;
    }

    gadgetTitle.textContent = `document.querySelector('${uniqueSelector}')`;
    addGreenBorder(uniqueSelector);    
        
}


// AutoDetectのContentを作成する関数
function generateAutoDetectCode(mail_selector,phone_selector,type) {

    return `
<script>
gtag('set', 'user_data', {
    var ec_mail = document.querySelector('${mail_selector}').${type};
    var ec_phone = document.querySelector('${phone_selector}').${type};
    "email": var ec_mail, 
    "phone_number": var ec_phone
});
</script>

GTMメール
function (){
    return document.querySelector('${mail_selector}').${type};
}

GTM電話
function (){
    return document.querySelector('${phone_selector}').${type}.replace(/[^0-9]/g,'').replace('0','+81');  
}`;
}


// AutoDetectが発火したときにダイアログボックス内のコンテンツを更新する関数
function updateDialogContent_autoDetect(mail_selector,phone_selector,type) {
    var auto_detictContent = generateAutoDetectCode(mail_selector,phone_selector,type);
    var auto_detictContent_display = auto_detictContent
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    var dialogContent = document.querySelector('#dialogContent');
    if (dialogContent) {
        dialogContent.innerHTML = `<pre style="font-size: 13px; font-family: monospace; overflow-x: auto; white-space: pre;">${auto_detictContent_display}</pre>`;
    }

  
    gadgetTitle.textContent = '自動検出が成功しました';
    

            
}


function auto_detict_text() {
    // すべての要素を取得
    var allElements = document.querySelectorAll('*');

    var targetElement = null;
    var mail_selector = null;
    var phone_selector = null;    
    var phone_regex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/; // 電話番号の正規表現


    // 各要素をループして、テキスト内容からtest@test.comを探す
    allElements.forEach(function(element) {
        if (element.textContent.includes('test@test.com')) {
            targetElement = $(element); // jQuery オブジェクトに変換
            mail_selector = getUniqueSelector(targetElement); // jQuery オブジェクトを渡す

            return;  // 目的の要素を見つけたらループを終了
        }
    });
    //メールが見つかったらPhoneも探す
    if(mail_selector){
        allElements.forEach(function(element) {
            if (phone_regex.test(element.textContent)) {
                targetElement = $(element); // jQuery オブジェクトに変換
                phone_selector = getUniqueSelector(targetElement); // jQuery オブジェクトを渡す
                return;  // 目的の要素を見つけたらループを終了
            }
        });
    }


    return {
        mail: mail_selector,
        phone: phone_selector,
        type: 'innerText'
    };
}


function auto_detict_input() {
    // inputでClassやID、Placeholderなどからメールアドレスと判断できるものを取得
    var mail_words = [
        '@',
        'mail',
        'メール'
    ];
    
    var phone_words = [
        'phone',
        'tel',
        '電話'
    ];

    var mail_input = null;
    var phone_input = null;
    var mail_selector = null;
    var phone_selector = null;

    mail_input = check_key_list_fromInput(mail_words)


    if (mail_input) {
        mail_selector = getUniqueSelector(mail_input); // jQuery オブジェクトを渡す

        // メールが見つかったときだけ電話の自動検出を行う
        phone_input = check_key_list_fromInput(phone_words)
        phone_selector = getUniqueSelector(phone_input); // jQuery オブジェクトを渡す

    }
    

    return {
        mail: mail_selector,
        phone: phone_selector,
         type: 'value'
    };
}



function check_key_list_fromInput(key_list) {
    // すべての input タグを取得
    var all_inputs = document.querySelectorAll('input');

    // type が hidden でない input 要素のみを取得
    var inputs = Array.from(all_inputs).filter(function(input) {
        return input.type !== 'hidden';
    });

    var key_input = null;
    // キーワードリストからそのリストに入った言葉の要素を取得
    inputs.some(function(inputElement) {
        var id = inputElement.id || '';
        var classList = Array.from(inputElement.classList).join(' ');
        var name = inputElement.name || '';
        var placeholder = inputElement.placeholder || '';
    
        // key_list のいずれかにマッチするかを確認
        for (var word of key_list) {
            if (id.includes(word) || classList.includes(word) || name.includes(word) || placeholder.includes(word)) {
                key_input = $(inputElement); // jQuery オブジェクトに変換
                return true; // ループを終了
            }
        }
        return false;
    });

    return key_input; // ここで key_input を返す
}


function detect_iframe() {
    var all_iframe = document.querySelectorAll('iframe');

    all_iframe.forEach(function(iframe) {
        iframe.style.border = '5px solid red';  // 太い赤のボーダー

        var overlay000 = document.createElement('div');
        overlay000.style.position = 'absolute';
        overlay000.style.top = 0;
        overlay000.style.left = 0;
        overlay000.style.width = '100%';
        overlay000.style.height = '100%';
        overlay000.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';  // 透明度50%の赤
        overlay000.style.pointerEvents = 'none';  // クリックを透過させる

        // IframeのOriginを取得して表示するための要素を作成
        var originText = document.createElement('div');
        originText.style.position = 'absolute';
        originText.style.bottom = '10px';
        originText.style.right = '10px';
        originText.style.color = 'white';
        originText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        originText.style.padding = '5px';
        originText.style.fontSize = '12px';
        originText.style.borderRadius = '3px';

        // iframeのURLを取得
        try {
            var iframeURL = iframe.src;
            originText.textContent = iframeURL;
        } catch (e) {
            originText.textContent = 'Unknown URL';
        }


        overlay000.appendChild(originText);  // Originを表示する要素をオーバーレイに追加

        iframe.parentElement.style.position = 'relative';  // 親要素を相対位置に
        iframe.parentElement.appendChild(overlay000);  // iframeの上にオーバーレイを追加
    });
}

// コピー後にメッセージが出る関数
function showToast(message) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '5px 10px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    toast.style.zIndex = '1000';
    toast.style.whiteSpace = 'nowrap'; // メッセージが折り返さないようにする
    toast.style.opacity = '0'; // 初期状態で透明にする
    toast.style.transition = 'opacity 0.5s'; // フェードイン・フェードアウトの効果

    // 位置を設定するためにgadgetTitleの位置を取得
    var rect = gadgetTitle.getBoundingClientRect();

    toast.style.top = `${rect.top + rect.height / 2}px`; // gadgetTitleの中央に合わせる
    toast.style.left = `${rect.left + rect.width / 2}px`; // gadgetTitleの中央に合わせる
    toast.style.transform = 'translate(-50%, -50%)'; // 中央に位置合わせする

    document.body.appendChild(toast);

    // フェードイン
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 0);

    // フェードアウトと削除
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500); // フェードアウトの時間
    }, 700); // メッセージの表示時間
}



// gadgetTitleにクリックしたら textContent をコピーするイベントを追加
function addCopyEvent_title() {
    gadgetTitle.addEventListener('click', function() {
        var textToCopy = gadgetTitle.textContent;
        
        // クリップボードにコピー
        navigator.clipboard.writeText(textToCopy).then(function() {
            showToast('copied');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });
}

var last_greenBorder = [];

function addGreenBorder(selector) {
    // 以前の緑枠をリセット
    last_greenBorder.forEach(function(element) {
        element.style.border = ''; // 緑枠を削除
    });
    last_greenBorder = []; // リストをクリア

    var elements = document.querySelectorAll(selector);
    elements.forEach(function(element) {
        element.style.border = '5px solid lightgreen'; // 緑の太枠を設定
        last_greenBorder.push(element); // 最新の緑枠要素をリストに追加
    });
}





        // スクリプトコードの変数
//         var code_gtag  = `
// &lt;script&gt;
// ${if_option01}window.addEventListener("DOMContentLoaded", function() {
//     document.querySelectorAll('${uniqueSelector}').forEach(function(element) {
//         element.addEventListener('click', function(){
//             gtag('event', 'conversion', {'send_to': '${CV_id_value}/${CV_id_label}'${cv_content}});
//         });
//     });
// });
// ${if_option02}&lt;/script&gt;
//         `;
        
//         gadgetBody.insertAdjacentHTML('beforeend', `
//             <pre style="font-size: 14px; font-family: monospace; overflow-x: auto; white-space: pre;">${code_gtag}</pre>
//             `);
       

