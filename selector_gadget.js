
//Iframe Detectが変なページ
//https://onepiece-rental.net/products/detail.php?product_id=4860



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
var testCode = ''

// ダイアログボックスの作成,これだけ関数の外で先に作って、ダイアログボックス内を無視する処理時に未定義エラーを防いでる
var gadgetBox = document.createElement('div');
gadgetBox.id = 'selector-gadget';
gadgetBox.style.position = 'fixed';
gadgetBox.style.bottom = '10px';
gadgetBox.style.right = '10px';
gadgetBox.style.height = '68vh';
gadgetBox.style.width = '40vw';
gadgetBox.style.backgroundColor = '#333';
gadgetBox.style.color = '#fff';
gadgetBox.style.opacity = '0.8';
gadgetBox.style.padding = '10px';
gadgetBox.style.borderRadius = '5px';
gadgetBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
gadgetBox.style.zIndex = '1000';
document.body.appendChild(gadgetBox);



// updateDialogContent関数で使用するのでグローバルにしてる
// ヘッダーの作成
var gadgetHeader = document.createElement('div');
gadgetHeader.style.display = 'flex';
gadgetHeader.style.justifyContent = 'space-between';
gadgetHeader.style.alignItems = 'center';
gadgetHeader.style.marginBottom = '10px'
gadgetBox.appendChild(gadgetHeader);

// ボディ部分の作成
var gadgetBody = document.createElement('div');
gadgetBody.style.marginTop = '10px';

// ツールバーの追加
var ToolBer000 = document.createElement('div');
ToolBer000.id = 'ToolBer000';
ToolBer000.style.marginBottom = '10px';
gadgetBody.appendChild(ToolBer000);

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

    //選択したところの緑を消してる
    last_greenBorder.forEach(function(element) {
        element.style.border = ''; // 緑枠を削除
    });

    //Iframeの赤い枠とオーバーレイ消してる
    var all_iframe = document.querySelectorAll('iframe');

    all_iframe.forEach(function(iframe) {
        if (iframe.style.border === '5px solid red') {
            iframe.style.border = '';
        }
    });

    
    
    
};
gadgetHeader.appendChild(closeButton);

// ダイアログ内のコンテンツエリア
var dialogContent = document.createElement('div');
dialogContent.id = 'dialogContent';
dialogContent.textContent = ''
gadgetBody.appendChild(dialogContent);

// 緑枠の変数
var last_greenBorder = [];

var auto_detict_flag = true;


// --------メイン関数部分-------------
(function() {    

    making_dialog(gadgetBox);

    overridePreCssRules();//外部CSSでPre要素についての言及があったときに、Dialog内の表示がおかしくなるので、ルールを上書き

    loadJQuery(function() {
        // jQueryがロードされた後にクリックイベントリスナーを設定
        document.addEventListener('click', setupClickListener);

        detect_iframe();

        // auto_detictをInputで探してもしもなかったらtest@test.comという文字列があるかを
        // auto_detict_text()で探している
        auto_detict_input();
        if(auto_detict_flag){
            auto_detict_text();
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
    if (gadgetBox.contains(event.target) || event.target.classList.contains('StopEvent000')) {
        return;
    }


    event.preventDefault();  // デフォルトのアクションを防ぐ
    event.stopPropagation(); // イベントのバブリングを停止する

    var $target = $(event.target);
        uniqueSelector = getUniqueSelector($target);


    // ダイアログ内容の更新
    updateDialogContent(uniqueSelector,event);

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

    }

    return findUniqueSelector(element);
}

function making_dialog(gadgetBox) {




    //ツールバーの中身作成
    // ToolBer000.style.backgroundColor = 'red';


    // Ifボタン
    var ifButton = document.createElement('button');
    ifButton.textContent = 'IF';
    ifButton.style.display = 'inline-block';
    ifButton.style.padding = '4px 9px';
    ifButton.style.fontSize = '16px';
    ifButton.style.fontWeight = 'bold';
    ifButton.style.color = '#ffffff';
    ifButton.style.backgroundColor = 'gray';
    ifButton.style.border = '2px solid #ccc';
    ifButton.style.borderRadius = '3px';
    ifButton.style.cursor = 'pointer';
    var ifStatus = false;

    ifButton.addEventListener('click', ifUpdate);

    function ifUpdate(event){
        var location_if = convertUrlToPath(window.location.href);
        if(ifStatus){
            ifStatus = false;  // ifStatusをfalseに設定
            if_option01 = '' ;
            if_option02 = '' ;
            ifButton.style.backgroundColor = 'gray';
        }else{
            ifStatus = true;  // ifStatusをtrueに設定
            if_option01 = `if(window.location.href.includes("${location_if}")) {\n` ;
            if_option02 = '}\n' ;
            ifButton.style.backgroundColor = '#78bd78';
        }
        updateDialogContent(uniqueSelector, event); 
    }

    // コピーボタン
    var copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.display = 'inline-block';
    copyButton.style.padding = '4px 9px';
    copyButton.style.fontSize = '16px';
    copyButton.style.fontWeight = 'bold';
    copyButton.style.color = '#ffffff';
    copyButton.style.backgroundColor = '#78bd78';
    copyButton.style.border = '2px solid #ccc';
    copyButton.style.borderRadius = '3px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.marginRight = '10px';



    // addCopyEvent(copyButton,dialogContent);

    if (dialogContent) {
        addCopyEvent(copyButton, dialogContent);
    } else {
        console.error('dialogContent is not defined or not found.');
    }
    
    // テストコードボタン
    var testCodeBtn = document.createElement('button');
    testCodeBtn.textContent = 'Test';
    testCodeBtn.style.display = 'inline-block';
    testCodeBtn.style.padding = '4px 9px';
    testCodeBtn.style.fontSize = '16px';
    testCodeBtn.style.fontWeight = 'bold';
    testCodeBtn.style.color = '#ffffff';
    testCodeBtn.style.backgroundColor = '#78bd78';
    testCodeBtn.style.border = '2px solid #ccc';
    testCodeBtn.style.borderRadius = '3px';
    testCodeBtn.style.cursor = 'pointer';
    testCodeBtn.style.marginRight = '10px';

    
    testCodeBtn.addEventListener('click', function(event) {
        navigator.clipboard.writeText(testCode)
            .then(function() {
                showToast(event.target)
            })
            .catch(function(err) {
                console.error('Could not copy text: ', err);
            });
    });



    ToolBer000.appendChild(copyButton);
    ToolBer000.appendChild(testCodeBtn);
    ToolBer000.appendChild(ifButton);


    // ToolBer000.appendChild(IfBtnSpan);
    // ToolBer000.appendChild(IfBtnLabel);


    // var IfBtn000 = document.createElement('input');
    // IfBtn000.type = 'checkbox';
    // IfBtn000.id = 'ifBtn000';
    // IfBtn000.checked = false; // 初期状態はオフ
    // IfBtn000.style.display = 'none'; // チェックボックス自体は非表示
    
    // var IfBtnLabel = document.createElement('label');
    // IfBtnLabel.htmlFor = 'ifBtn000'; // Corrected the 'for' attribute to match 'id'
    // IfBtnLabel.style.display = 'block';
    // IfBtnLabel.style.boxSizing = 'border-box';
    // IfBtnLabel.style.textAlign = 'center';
    // IfBtnLabel.style.border = '2px solid #ccc';
    // IfBtnLabel.style.borderRadius = '3px';
    // IfBtnLabel.style.height = '60px';
    // IfBtnLabel.style.fontSize = '18px';
    // IfBtnLabel.style.lineHeight = '60px';
    // IfBtnLabel.style.fontWeight = 'bold';
    // IfBtnLabel.style.background = '#eee';
    // IfBtnLabel.style.boxShadow = '3px 3px 6px #888';
    // IfBtnLabel.style.transition = '.3s';
    // IfBtnLabel.style.cursor = 'pointer';
    
    // var IfBtnSpan = document.createElement('span');
    // IfBtnSpan.style.display = 'inline-block';
    // IfBtnSpan.style.width = '100%';
    // IfBtnSpan.style.height = '100%';
    // IfBtnSpan.style.lineHeight = '60px'; // 中央揃え
    // IfBtnLabel.style.background = '#78bd78';
    // IfBtnLabel.style.boxShadow = 'none';
    // IfBtnSpan.textContent = 'ON';
    // IfBtnSpan.style.color = '#fff';
    
    // IfBtnLabel.appendChild(IfBtnSpan);
    
    // // IfBtn000のスタイルを更新
    // function updateIfBtnButton() {
    //     if (IfBtn000.checked) {
    //         IfBtnLabel.style.background = '#78bd78';
    //         IfBtnLabel.style.boxShadow = 'none';
    //         IfBtnSpan.textContent = 'ON';
    //         IfBtnSpan.style.color = '#fff';
    //         document.addEventListener('click', setupClickListener); // 必要に応じてリスナーを追加
    
    //     } else {
    //         IfBtnLabel.style.background = '#eee';
    //         IfBtnLabel.style.boxShadow = '3px 3px 6px #888';
    //         IfBtnSpan.textContent = 'OFF';
    //         IfBtnSpan.style.color = '#aaa';
    //         document.removeEventListener('click', setupClickListener); // 必要に応じてリスナーを削除
    //     }
    // }
    
    // // チェックボックスの変更時にIfBtnLabelのスタイルを更新
    // IfBtn000.addEventListener('change', updateIfBtnButton);

    // トグルボタンの作成
    var toggleArea = document.createElement('div');
    toggleArea.style.margin = 'auto';
    toggleArea.style.marginTop = '10px';
    // toggleArea.style.width = '60px';

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


    // // ダイアログ内のコンテンツエリア
    // var dialogContent = document.createElement('div');
    // dialogContent.id = 'dialogContent';


    // 最小化ボタンのクリックイベント
    minimizeButton.addEventListener('click', function() {
        if (gadgetBody.style.display === 'none') {
            gadgetBody.style.display = 'block';
            gadgetBox.style.height = ''; // もとのサイズに戻すためにheightをクリア
            gadgetBox.style.height = '68vh'; 
            minimizeButton.textContent = '-';
        } else {
            gadgetBody.style.display = 'none';
            gadgetBox.style.height = '50px';
            minimizeButton.textContent = '+';
        }
    });

    addCopyEvent(gadgetTitle,gadgetTitle); //タイトルクリックしたらコピーするイベントを追加

    // 各要素をBodyに追加
    // gadgetBox.appendChild(gadgetBody);
    // gadgetBox.appendChild(dialogContent);

    gadgetHeader.appendChild(minimizeButton);
    gadgetBox.appendChild(gadgetBody);
    gadgetBody.appendChild(toggleArea);
    gadgetBody.appendChild(toggleLabel);
    toggleArea.appendChild(toggleCheckbox);
    toggleArea.appendChild(toggleLabel);
    toggleLabel.appendChild(toggleSpan);

}  

//  ----- GTMやGtagのコード関連-------


// 初期のcode_gtagを生成する関数
function generateCodeGtag(event) {

    var clickedElement = event.target;
    var type = 'innerText'
    // クリックされた要素が input 要素かどうかを確認
    if (clickedElement.tagName.toLowerCase() === 'input') {
        type = 'value'
    }
    
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
    return document.querySelector('${uniqueSelector}').${type};
}

GTM電話
function (){
    return document.querySelector('${uniqueSelector}').${type}.replace(/[^0-9]/g,'').replace('0','+81');  
}`;
        }


function generateTestCode() {  
    return  `${if_option01}document.querySelectorAll('${uniqueSelector}').forEach(function(element) {
    element.addEventListener('click', function(){
        alert('テスト成功');
    });
});
${if_option02}`
            ;
}

// ダイアログボックス内のコンテンツを更新する関数
function updateDialogContent(uniqueSelector,event) {
    var code_gtag = generateCodeGtag(event);
    var code_gtag_display = code_gtag
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    var dialogContent = document.querySelector('#dialogContent');
    if (dialogContent) {
        dialogContent.innerHTML = `<pre style="font-size: 13px; font-family: monospace; overflow-x: auto; white-space: pre;">${code_gtag_display}</pre>`;
    }

    gadgetTitle.textContent = `document.querySelector('${uniqueSelector}')`;
    addGreenBorder(uniqueSelector);    

    // テスト用のコードを更新
    testCode = generateTestCode();
        
}


// AutoDetectのContentを作成する関数
function generateAutoDetectCode(mail_selector,phone_selector,type) {

    return `
<script>
    var ec_mail = document.querySelector('${mail_selector}').${type};
    var ec_phone = document.querySelector('${phone_selector}').${type};
    gtag('set', 'user_data', {
        "email": ec_mail, 
        "phone_number": ec_phone
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

    last_greenBorder = []; // リストをクリア

    // mail_selector と phone_selector から要素を取得し、緑の枠を設定
    var mailElement = document.querySelector(mail_selector);
    var phoneElement = document.querySelector(phone_selector);

    if (mailElement) {
        mailElement.style.border = '5px solid lightgreen'; // 緑の太枠を設定
        last_greenBorder.push(mailElement); // 最新の緑枠要素をリストに追加
    }

    if (phoneElement) {
        phoneElement.style.border = '5px solid lightgreen'; // 緑の太枠を設定
        last_greenBorder.push(phoneElement); // 最新の緑枠要素をリストに追加
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
    var type = 'innerText'

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

        // コンテント内容をUpdate
        updateDialogContent_autoDetect(mail_selector,phone_selector,type)
    }

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
    var type =  'value';

    mail_input = check_key_list_fromInput(mail_words)


    if (mail_input) {
        mail_selector = getUniqueSelector(mail_input); // jQuery オブジェクトを渡す

        // メールが見つかったときだけ電話の自動検出を行う
        phone_input = check_key_list_fromInput(phone_words)
        if (phone_input) {
            phone_selector = getUniqueSelector(phone_input); // jQuery オブジェクトを渡す
        }

        // コンテント内容をUpdate
        updateDialogContent_autoDetect(mail_selector,phone_selector,type)
        auto_detict_flag = false;
    }
    
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
        var id = (inputElement.id || '').toLowerCase();
        var classList = Array.from(inputElement.classList).join(' ').toLowerCase();
        var name = (inputElement.name || '').toLowerCase();
        var placeholder = (inputElement.placeholder || '').toLowerCase();
    
        // key_list を小文字に変換
        var lowerCaseKeyList = key_list.map(function(word) {
            return word.toLowerCase();
        });

        // key_list のいずれかにマッチするかを確認
        for (var word of lowerCaseKeyList) {
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
        // iframeの親要素にposition: relativeを設定
        var parent = iframe.parentElement;
        parent.style.position = 'relative';

        // iframeに赤の太いボーダーを設定
        iframe.style.border = '5px solid red';  

        // オーバーレイを作成
        var overlay000 = document.createElement('div');
        overlay000.style.position = 'absolute';
        overlay000.style.top = '-5px';  // ボーダーの外側に配置
        overlay000.style.left = '-5px';  // ボーダーの外側に配置
        overlay000.style.width = `calc(100% + 10px)`;  // ボーダー分の幅を追加
        overlay000.style.height = `calc(100% + 10px)`;  // ボーダー分の高さを追加
        overlay000.style.backgroundColor = 'rgba(255, 0, 0, 0)';  // 透明度50%の赤
        overlay000.style.pointerEvents = 'none';  // クリックを透過させる

        // // オーバーレイをiframeの親要素に追加
        parent.appendChild(overlay000);
    
        // IframeのOriginを取得して表示するための要素を作成
        var originText = document.createElement('div');
        originText.classList.add('StopEvent000');
        originText.style.position = 'absolute';
        originText.style.bottom = '10px';
        originText.style.right = '10px';
        originText.style.color = 'white';
        originText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        originText.style.padding = '5px';
        originText.style.fontSize = '12px';
        originText.style.borderRadius = '3px';
        originText.style.maxWidth = '300px';  // 最大幅を設定
        originText.style.whiteSpace = 'nowrap';  // テキストを1行で表示
        originText.style.overflow = 'hidden';  // 溢れた部分を非表示に
        originText.style.textOverflow = 'ellipsis';  // 溢れた部分を省略記号で表示

        // iframeのURLを取得
        var iframeURL = iframe.getAttribute('data-src') || iframe.src ;
        if (iframeURL) {
            var link = document.createElement('a');
            link.href = iframeURL;
            link.target = '_blank';
            link.textContent = iframeURL;
            originText.appendChild(link);
        } else {
            originText.textContent = 'Unknown URL';
        }



        overlay000.appendChild(originText);  // Originを表示する要素をオーバーレイに追加

        iframe.parentElement.style.position = 'relative';  // 親要素を相対位置に
        iframe.parentElement.appendChild(overlay000);  // iframeの上にオーバーレイを追加
    });
}



// コピー後にメッセージが出る関数
function showToast(Eventobject) {
    var toast = document.createElement('div');
    toast.textContent = 'Copied';
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

    // 位置を設定するためにEventobjectの位置を取得
    var rect = Eventobject.getBoundingClientRect();

    toast.style.top = `${rect.top + rect.height / 2}px`; // Eventobjectの中央に合わせる
    toast.style.left = `${rect.left + rect.width / 2}px`; // Eventobjectの中央に合わせる
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
function addCopyEvent(Eventobject,copyContent) {
    Eventobject.addEventListener('click', function() {
        var textToCopy = copyContent.textContent;
        
        // クリップボードにコピー
        navigator.clipboard.writeText(textToCopy).then(function() {
            showToast(Eventobject);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });
}



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


function overridePreCssRules() {
    // 新しいスタイル要素を作成
    const style = document.createElement('style');
    style.textContent = `
        pre {
            color: white;
            font-style: monospace;
            line-height: 110%;
            text-align: left;
            /* 他のスタイルも必要に応じてここに追加 */
        }
    `;

    // <head> 内にスタイル要素を追加
    document.head.appendChild(style);
}

//URL stringからホストとPathnameにする
//URLじゃない文字列のときには？を検索してそれ以降の文字を消す（パラメーターを消してる
function convertUrlToPath(urlString) {
    try {
        var url = new URL(urlString);
        var host = url.host;
        var pathname = url.pathname;
        return host + pathname;
    } catch (e) {
        var index = urlString.indexOf('?');
        if (index !== -1) {
            return urlString.substring(0, index);
        }

        return urlString;
    }
}
       

