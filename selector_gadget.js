
//Iframe Detectが変なページ
//https://onepiece-rental.net/products/detail.php?product_id=4860



// jQuery を再割り当て、他のライブラリなどにドルマークを使われている場合エラーが出るのでそれを回避するため
var $ = window.jQuery;
// グローバル変数として gadgetBox を定義
// 変数の初期値宣言
var uniqueSelector = '';
var CV_id_value = 'AW-1111111111111';
var CV_id_label = 'a_aaaaa_bbbbbbbbb';
var if_option01 = '';
var if_option02 = '';
var cv_content = '';
var testCode = '';
var GTM_mail ='';
var GTM_phone = '';
var GTM_code = '';
var location_if = convertUrlToPath(window.location.href);


// メインのiframeコンテナの作成
var mainIframe = document.createElement('iframe');
mainIframe.style.position = 'fixed';
mainIframe.style.bottom = '0px';
mainIframe.style.right = '0px';
mainIframe.style.height = '68vh';
mainIframe.style.width = '40vw';
mainIframe.style.border = 'none'
mainIframe.style.zIndex = '99999999';
mainIframe.style.borderRadius = '10px 10px 0 0';  // 上側の左右の角を丸める
mainIframe.style.margin = '0';
mainIframe.style.padding = '0';

// 関数外で変数を定義（グローバル変数）
var iframeDocument;
var gadgetBox;
var gadgetHeader;
var gadgetBody;
var ToolBer000;
var gadgetTitle;
var closeButton;
var dialogContent;
var auto_detict_flag = true;

var ifButton;
var ifStatus = false;
var copyButton;
var testCodeBtn;
var GTM_copyBtn;
var Code_template;
var minimizeButton;

mainIframe.onload = function() {
    iframeDocument = mainIframe.contentDocument || mainIframe.contentWindow.document;

    // CSSスタイルを定義（gadgetHeader内のbuttonにスタイルを適用）
    var style = iframeDocument.createElement('style');
    style.textContent = `
    body {
            margin: 0;
            padding: 0; /* 必要に応じて */
    }
    #ToolBer000 button {
        background-color: #78bd78;
        color: #ffffff;
        border: 2px solid #ccc;
        padding: 4px 8px;
        margin: 0px 10px 0 0; /* 上、右、下、左の順で設定 */
        font-size: 14px;
        font-weight: bold;
        border-radius: 3px;
        cursor: pointer;
    }
    #ToolBer000 select {
        background-color: #78bd78;
        color: #ffffff;
        border: 2px solid #ccc;
        padding: 4px 8px;
        margin: 0px 10px 0 0; /* 上、右、下、左の順で設定 */
        font-size: 14px;
        font-weight: bold;
        border-radius: 3px;
        cursor: pointer;
        appearance: none; /* デフォルトの矢印を非表示に */
    }
    #gadgetHeader button {
        background-color: transparent; /* 修正 */
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        border: none;
    }
    `;    
    // iframeの<head>にスタイルを追加
    iframeDocument.head.appendChild(style);


    // ダイアログボックスの作成、全体のコンテナー
    gadgetBox = document.createElement('div');
    gadgetBox.id = 'selector-gadget';
    gadgetBox.style.height = '94%';
    gadgetBox.style.width = '94%';
    gadgetBox.style.backgroundColor = '#333';
    gadgetBox.style.color = '#fff';
    gadgetBox.style.opacity = '0.8';
    gadgetBox.style.padding = '10px';
    gadgetBox.style.borderRadius = '5px';
    gadgetBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    gadgetBox.style.zIndex = '1000';

//------ ヘッダー部分の作成
gadgetHeader = document.createElement('div');
gadgetHeader.id = 'gadgetHeader';
gadgetHeader.style.display = 'flex';
gadgetHeader.style.justifyContent = 'space-between';
gadgetHeader.style.alignItems = 'center';
gadgetHeader.style.marginBottom = '10px';
gadgetHeader.style.position = 'relative'; // ボタンの位置固定のために追加
gadgetBox.appendChild(gadgetHeader);

// Header内のタイトルの作成
gadgetTitle = document.createElement('span');
gadgetTitle.style.cursor = 'pointer';
gadgetTitle.textContent = 'Selector Gadget';
gadgetTitle.setAttribute('title', 'Click to copy');
gadgetHeader.appendChild(gadgetTitle);

addCopyEvent(gadgetTitle, gadgetTitle); //クリックしたらコピーするイベントを追加
// `document.querySelector('${uniqueSelector}')`;
// 最小化ボタンの作成
minimizeButton = document.createElement('button');
minimizeButton.textContent = '-';
minimizeButton.style.position = 'absolute';
minimizeButton.style.right = '40px'; // 右側から20px内側
minimizeButton.addEventListener('click', function() {
    if (mainIframe.style.height === '50px') {
        mainIframe.style.height = '68vh';
        minimizeButton.textContent = '-';
    } else {
        mainIframe.style.height = '50px';
        minimizeButton.textContent = '+';
    }
});
gadgetHeader.appendChild(minimizeButton);

// 閉じるボタンの作成
closeButton = document.createElement('button');
closeButton.textContent = '×';
closeButton.style.position = 'absolute';
closeButton.style.right = '0px'; // 右側から10px内側
closeButton.onclick = function() {
    gadgetBox.style.display = 'none';
    document.removeEventListener('click', setupClickListener);

    last_greenBorder.forEach(function(element) {
        element.style.border = ''; // 緑枠を削除
    });

    //iframe ditectで検出した赤色の枠を削除
    var all_iframe = document.querySelectorAll('iframe');
    all_iframe.forEach(function(iframe) {
        if (iframe.style.border === '5px solid red') {
            iframe.style.border = '';
        }
    });
};
gadgetHeader.appendChild(closeButton);



//----------- ボディ部分の作成
gadgetBody = document.createElement('div');
gadgetBody.style.marginTop = '10px';


//----------- ツールバー部分の作成
    ToolBer000 = document.createElement('div');
    ToolBer000.id = 'ToolBer000';
    ToolBer000.style.marginBottom = '10px';
    gadgetBody.appendChild(ToolBer000);

    // OnOffボタン
    var OnOffButton = document.createElement('button');
    OnOffButton.textContent = 'ON';  // 初期状態を 'ON' に設定


    // ボタンの状態を保持するフラグ（初期状態を true に設定）
    var isOn = true;

    // OnOffボタンのクリックイベント
    OnOffButton.addEventListener('click', function() {
        if (isOn) {
            // 現在 ON なら OFF にする
            OnOffButton.textContent = 'OFF';
            OnOffButton.style.backgroundColor = 'gray';
            isOn = false;
            document.removeEventListener('click', setupClickListener);
        } else {
            // 現在 OFF なら ON にする
            OnOffButton.textContent = 'ON';
            OnOffButton.style.backgroundColor = '#78bd78';  // 緑色に変更
            isOn = true;
            document.addEventListener('click', setupClickListener);
        }
    });


    // Ifボタン
    ifButton = document.createElement('button');
    ifButton.textContent = 'IF';
    ifButton.style.backgroundColor = 'gray';

    ifButton.addEventListener('click', ifUpdate);

    function ifUpdate(event) {
        if (ifStatus) {
            ifStatus = false;
            if_option01 = '';
            if_option02 = '';
            ifButton.style.backgroundColor = 'gray';
        } else {
            ifStatus = true;
            if_option01 = `if(window.location.href.includes("${location_if}")) {\n`;
            if_option02 = '}\n';
            ifButton.style.backgroundColor = '#78bd78';
        }
        updateDialogContent(uniqueSelector, event);
    }

    // コピーボタン
    // copyButton = document.createElement('button');
    // copyButton.textContent = 'Copy';

    // if (dialogContent) {
    //     addCopyEvent(copyButton, dialogContent);
    // } else {
    //     console.error('dialogContent is not defined or not found.');
    // }

    // テストコードボタン
    testCodeBtn = document.createElement('button');
    testCodeBtn.textContent = 'Test';

    testCodeBtn.addEventListener('click', function(event) {
        navigator.clipboard.writeText(testCode)
            .then(function() {
                showToast(event.target);
            })
            .catch(function(err) {
                console.error('Could not copy text: ', err);
            });
    });

    // GTMコピーボタン
    GTM_copyBtn = document.createElement('button');
    GTM_copyBtn.textContent = 'GTM';


    GTM_copyBtn.addEventListener('click', function(event) {
        navigator.clipboard.writeText(GTM_code)
            .then(function() {
                showToast(event.target);
            })
            .catch(function(err) {
                console.error('Could not copy text: ', err);
            });
    });

    // よくあるコード集
    Code_template = document.createElement('select');

    // 最初に表示されるプレースホルダーオプションを追加
    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'コードテンプレ';
    defaultOption.disabled = true;  // 選択不可にする
    defaultOption.selected = true;  // デフォルトで選択状態にする

    // オプションを追加
    var option1 = document.createElement('option');
    option1.textContent = 'EC global Tag';
    option1.value = `<!-- Google tag (gtag.js) RenSato0611-->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-xxxxxxxxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-xxxxxxxxxxx', {'allow_enhanced_conversions':true});
</script>
`;

    var option2 = document.createElement('option');
    option2.textContent = 'Cross domain';
    option2.value =`<!-- Global site tag (gtag.js)  -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-xxxxxxxxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('set', 'linker', { 'domains': ['example.com', 'example.co.jp'], 'decorate_forms': true });
  gtag('js', new Date());

  gtag('config', 'AW-xxxxxxxxxxxxx');
</script>`;

    var option3 = document.createElement('option');
    option3.textContent = '電話クリック';
    option3.value =`<script>
    window.addEventListener("DOMContentLoaded", function() {
       document.querySelectorAll('a[href*="tel:"]').forEach(function(element) {
            element.addEventListener('click', function(){
                gtag('event', 'conversion', {'send_to': 'AW-111111111/xxxxxxxxxxxx'});
            });
        });
    });
</script>`;

    var option4 = document.createElement('option');
    option4.textContent = 'LINEクリック';
    option4.value =`<script>
    window.addEventListener("DOMContentLoaded", function() {
       document.querySelectorAll('a[href*="lin.ee"]').forEach(function(element) {
            element.addEventListener('click', function(){
                gtag('event', 'conversion', {'send_to': 'AW-111111111/xxxxxxxxxxxx'});
            });
        });
    });
</script>`;

    

    Code_template.appendChild(defaultOption);
    Code_template.appendChild(option1);
    Code_template.appendChild(option2);
    Code_template.appendChild(option3);
    Code_template.appendChild(option4);

    // セレクトボックスの変更イベントにコピー機能を追加
    Code_template.addEventListener('change', function() {
        var selectedValue = Code_template.value;

        // クリップボードにコピー
        navigator.clipboard.writeText(selectedValue).then(function() {
            showToast(Code_template)
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });



    ToolBer000.appendChild(OnOffButton);
    // ToolBer000.appendChild(copyButton);
    ToolBer000.appendChild(testCodeBtn);
    ToolBer000.appendChild(GTM_copyBtn);
    ToolBer000.appendChild(ifButton);
    ToolBer000.appendChild(Code_template);

// --------ダイアログ内のコンテンツエリア
    dialogContent = document.createElement('div');
    dialogContent.id = 'dialogContent';
    dialogContent.textContent = '';

    gadgetBody.appendChild(dialogContent);
    gadgetBox.appendChild(gadgetBody);


    iframeDocument.body.appendChild(gadgetBox);
};


document.body.appendChild(mainIframe);


// 緑枠の変数
var last_greenBorder = [];






// --------メイン関数部分-------------
(function() {    

    // making_dialog(gadgetBox);

    loadJQuery(function() {
        // jQueryがロードされた後にクリックイベントリスナーを設定
        document.addEventListener('click', setupClickListener);

        // detect_iframe();

        // auto_detictをInputで探してもしもなかったらauto_detict_text()で探している
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
    // if (gadgetBox.contains(event.target) || event.target.classList.contains('StopEvent000')) {
    //     return;
    // }


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


//  ----- GTMやGtagのコード関連-------


// 初期のcode_gtagを生成する関数
function generateCodeGtag(event) {

    var clickedElement = event.target;
    var type = 'innerText'
    // クリックされた要素が input 要素かどうかを確認
    if (clickedElement.tagName.toLowerCase() === 'input') {
        type = 'value'
    }

    // 変数の更新、クリップボードにコピーするよう
    GTM_mail = `function (){
    return document.querySelector('${uniqueSelector}').${type};
}`;

    GTM_phone = `function (){
    return document.querySelector('${uniqueSelector}').${type}.replace(/[^0-9]/g,'').replace('0','+81');  
}`;
    
    GTM_code=`${location_if}
GTMメール
${GTM_mail}

GTM電話
${GTM_phone}
    `
    
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
${GTM_mail}

GTM電話
${GTM_phone}

`;
        }


//テスト用のコードを作成する関数
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

    var iframeDocument = mainIframe.contentDocument || mainIframe.contentWindow.document;
    var dialogContent = iframeDocument.querySelector('#dialogContent');

    if (dialogContent) {
        dialogContent.innerHTML = `<pre style="font-size: 13px; font-family: monospace; overflow-x: auto; white-space: pre;">${code_gtag_display}</pre>`;
    }

    // gadgetTitle.textContent = `document.querySelector('${uniqueSelector}')`;
    gadgetTitle.textContent = uniqueSelector;
    addGreenBorder(uniqueSelector);    

    // テスト用のコードを更新
    testCode = generateTestCode();
    

        
}


// AutoDetectのContentを作成する関数
function generateAutoDetectCode(mail_selector,phone_selector,type) {
    GTM_code=`${location_if}
GTMメール
function (){
    return document.querySelector('${mail_selector}').${type};
}

GTM電話
function (){
    return document.querySelector('${phone_selector}').${type}.replace(/[^0-9]/g,'').replace('0','+81');  
} 
`

    return `
<script>
    var ec_mail = document.querySelector('${mail_selector}').${type};
    var ec_phone = document.querySelector('${phone_selector}').${type};
    gtag('set', 'user_data', {
        "email": ec_mail, 
        "phone_number": ec_phone
    });
</script>

${GTM_code}

`;
}



// AutoDetectが発火したときにダイアログボックス内のコンテンツを更新する関数
function updateDialogContent_autoDetect(mail_selector,phone_selector,type) {
    var auto_detictContent = generateAutoDetectCode(mail_selector,phone_selector,type);
    var auto_detictContent_display = auto_detictContent
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

        
    var iframeDocument = mainIframe.contentDocument || mainIframe.contentWindow.document;
    var dialogContent = iframeDocument.querySelector('#dialogContent');

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

// テキスト要素からメールアドレスと電話番号を取得
function auto_detict_text() {
    // すべての要素を取得
    var allElements = document.querySelectorAll('*');

    var target_selector = null;
    var targetElement = null;
    var mail_selector = null;
    var phone_selector = null;    
    var phone_regex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/; // 電話番号の正規表現
    var mail_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var ECphone_number = '09012345678' ;
    var type = 'innerText' ;


    function find_phone_mail(searchText){
        // 各要素をループして、テキスト内容からターゲットの文字列を探す
        allElements.forEach(function(element) {
            var textContent = element.textContent;

            if (searchText instanceof RegExp) {
                // 正規表現の場合
                if (searchText.test(textContent)) {
                    targetElement = $(element); // jQuery オブジェクトに変換
                    target_selector = getUniqueSelector(targetElement); // jQuery オブジェクトを渡す
                    return false;  // 目的の要素を見つけたらループを終了
                }
            } else {
                // 通常の文字列の場合
                if (textContent.includes(searchText)) {
                    targetElement = $(element); // jQuery オブジェクトに変換
                    target_selector = getUniqueSelector(targetElement); // jQuery オブジェクトを渡す
                    return false;  // 目的の要素を見つけたらループを終了
                }
            }
        });

        return target_selector;
    }


    //test@test.comで探して見つからなければ正規表現で検索
    var mail_selector = find_phone_mail('test@test.com') || find_phone_mail(mail_regex);

    //メールが見つかったらPhoneを探す
    if(mail_selector){
        var phone_selector = find_phone_mail(ECphone_number) || find_phone_mail(phone_regex);

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
       

