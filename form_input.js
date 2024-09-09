//https://blog.s0014.com/posts/2016-08-17-js-dummy-input-form/


//------------------- 変数宣言----------------
// 固定で入力したい値
// var values = {
//   textarea : 'Googleによるテスト送信です', 
//   input : {
//     'text'           : 'テスト',
//     'tel'            : '09012345678', 
//     'email'          : 'test@test.com',
//     'number'         : '', // 入力が無ければinputのmax属性の値が入る
//     'range'          : '', // 入力が無ければinputのmax属性の値が入る
//   }
// };

// ClassやID、Name,placeholderなどの検索に使う言葉
var text_list = {
  '@': 'test@test.com', 
  'mail': 'test@test.com',
  'メール': 'test@test.com',
  'phone': '09012345678',
  'tel': '09012345678',
  '電話': '09012345678',
  'name': 'テスト',
  // 'addres': '3730012',機能しないこと多いのでコメントアウト26Aug2024
  'zip': '3730012',
  '郵便': '3730012',
  '住所': 'テスト',
  '年齢': '25',
  'パスワード':'test123456'
};

var phoneKeys = ['tel', 'phone', '電話'];

// 正規表現のリスト、正規表現はKeyとValueを取得するにはMapにする必要ある
var regex_map = new Map([
  [/\d{2,4}-\d{2,4}-\d{4}/, '09012345678'],  // ハイフン付きの電話番号
  [/\d{10,11}/, '09012345678'], // 10桁または11桁の数字の並び
  [/\d{3}-\d{4}/, '3730012'],  // 郵便番号
  [/\d{7}/, '3730012']  // 7桁の数字並び、郵便番号
]);


// 各処理関数を配列に格納
var checkFunctions = [
  CheckInput_inputType,
  CheckInput_placeholer,
  CheckInput_label,
  CheckInput_attribute,
  CheckInput_parentElement,
  CheckInput_siblingElement,
  CheckInput_cousinElement,
  CheckInput_MaxLength
];


var formElements = {
  textareas : document.getElementsByTagName('textarea'),
  selects   : document.getElementsByTagName('select'),
  inputs    : document.getElementsByTagName('input')
};


  // --------メイン関数------------

(function () {

  processTextareas(formElements.textareas); //テキストエリアの処理
  processSelects(formElements.selects); //セレクトタグの処理
  processInputs(formElements.inputs); //インプットタグの処理、メイン処理

})();

  

// -----------関数宣言---------------

//---Text areaの処理----
function processTextareas(){
  var textareas = formElements.textareas;
  for (var textarea of textareas) {
    textarea.value = 'Googleによるテスト送信です';
  }
}

//----selectタグの処理-----
function processSelects(){
    var selects = formElements.selects;
    for (var select of selects) {
      var options = select.getElementsByTagName('option');
      if (options.length > 0) {
        select.value = options[options.length - 1].value;
      }
    }
}
      
//----inputタグの処理-----
function processInputs(){
    // すべての input タグを取得
    var all_inputs = formElements.inputs;

    // type が hidden でない input 要素のみを取得
    var inputs = Array.from(all_inputs).filter(function(input) {
        return input.type !== 'hidden';
    });

    //required属性をチェックして、もしあればそれでフィルターかけてる
    inputs = check_required_attr(inputs)

    //requiredという文字列がClass Listに含まれているかをチェックして、もしあればフィルターかけてる（主にWPCF7フォーム用
    inputs = check_classList_required(inputs)
  
//-----メインの処理-------
    for (var input of inputs) {
      //処理の段階でまだチェックしてないInputにValueが入ることがあるのでチェックしてる
      //CheckboxとRadioはValueが設定されてることあるので条件に入れてる
      if ((input.type === 'checkbox' || input.type === 'radio') || !input.value) {


        // 各関数をまわしてInputタグのValueを埋めていく
        for (var checkFunc of checkFunctions) {
          if (checkFunc(input)) {
            console.log(checkFunc + ':' + input)
            break;  // 成功したらループを終了して次のinputへ
          }
        }
        
        // 上記どれでもヒットしないときにはテストと入力
        if(!input.value){
          input.value = 'テスト';
        }
      }
    }
}


function CheckInput_MaxLength(inputElement){
  if (inputElement.maxLength === 7) {
    inputElement.value = '3730012';
  }

  else if(inputElement.maxLength === 11){
    inputElement.value = '09012345678';
  }

  else if (inputElement.maxLength === 4) {
    inputElement.value = new Date().getFullYear();  // 現在の西暦を設定
  }

  return !!inputElement.value;  // valueが設定されているかを返す
}

function CheckInput_attribute(inputElement) {
  // 属性の値を取得
  var id = (inputElement.id || '').toLowerCase();
  var classList = Array.from(inputElement.classList).join(' ').toLowerCase();
  var name = (inputElement.name || '').toLowerCase();
  var placeholder = (inputElement.placeholder || '').toLowerCase();
  

  // text_list のキーがどれかに含まれているかチェック
  for (var key in text_list) {
    if (text_list.hasOwnProperty(key)) {
      if (id.includes(key) || classList.includes(key) || name.includes(key) || placeholder.includes(key)) {
        // Keyが電話番号ならPhoneに関するInputが3つあるかチェック
        if (phoneKeys.includes(key)) {
          Phone_3inputs();
          if(inputElement.value){
            break;
          }
        }

        inputElement.value = text_list[key];
        break;
      }
    }
  }

  return !!inputElement.value;  // valueが設定されているかを返す

}


function CheckInput_inputType(inputElement) {
  //-----TypeがRadioかCheckboxのときの処理---------
  if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
      inputElement.checked = true;
  } 
  //-----Typeがrangeかnumberのときの処理---------
  else if (inputElement.type === 'range' || inputElement.type === 'number') {
      var max = inputElement.max; // 最大値を取得

      // 最大値が存在する場合は最大値を入力、それ以外はデフォルト値を設定
      inputElement.value = max ? max : 100;  // デフォルト値は100として設定
  }

  //-----Typeがpasswordのときの処理---------
  else if (inputElement.type === 'password') {
    inputElement.value = 'test123456'
  }

  //-----Typeがemailのときの処理---------
  else if (inputElement.type === 'email') {
    inputElement.value = 'test@test.com'
  }

  return !!inputElement.value;  // valueが設定されているかを返す
}



function CheckInput_placeholer(inputElement){
  if (inputElement.hasAttribute('placeholder')) {
    var placeholder = inputElement.getAttribute('placeholder') || '';
    placeholder = placeholder.toLowerCase();
    
    // text_listの各キーがplaceholderに含まれているかチェック
    applyTextListValue(placeholder,inputElement)
  
    if (inputElement.value) {
        return true;
    }

    //Map でチェック
    for (var [regex, value] of regex_map) {
      if (regex.test(placeholder)) {
        inputElement.value = value;  // 正規表現にマッチする場合、値を設定
        break;  // その時点でループを中断
      }
    }
  }

  return !!inputElement.value;  // valueが設定されているかを返す
}

// 親の兄弟要素のTextContentを取得し、文字列として返す
function CheckInput_cousinElement(inputElement) {
  var cousinContents = [];

  // 親要素を取得
  var parentElement = inputElement.parentElement;

  // 親要素が存在しない場合は空の文字列を返す
  if (!parentElement) {
    return '';
  }

  // 親要素の親要素を取得
  var grandParentElement = parentElement.parentElement;

  // 親要素の兄弟要素を取得
  var siblingElement = grandParentElement.firstElementChild;

  // 親要素の兄弟要素のテキストを取得
  while (siblingElement) {
    if (siblingElement !== parentElement) {
      cousinContents.push(siblingElement.textContent.trim());
    }
    siblingElement = siblingElement.nextElementSibling;
  }

  // 配列を1つの文字列に変換して返す
  var cousin_text =  cousinContents.join(' ');
  cousin_text = cousin_text.toLowerCase();

  if(cousin_text){
    // text_listの各キーがlabelに含まれているかチェック
    applyTextListValue(cousin_text,inputElement)
  }
  
  return !!inputElement.value;  // valueが設定されているかを返す
}




// 兄弟要素のTextContentを取得
function CheckInput_siblingElement(inputElement) {
  var siblingContents = [];
  
  // 次の兄弟要素を取得し、テキストを追加
  var nextSibling = inputElement.nextElementSibling;
  while (nextSibling) {
    siblingContents.push(nextSibling.textContent.trim());
    nextSibling = nextSibling.nextElementSibling;
  }

  // 前の兄弟要素を取得し、テキストを追加
  var prevSibling = inputElement.previousElementSibling;
  while (prevSibling) {
    siblingContents.push(prevSibling.textContent.trim());
    prevSibling = prevSibling.previousElementSibling;
  }

  var sibling_text = siblingContents.join(' ');
  sibling_text = sibling_text.toLowerCase();

  if(sibling_text){
    // text_listの各キーがlabelに含まれているかチェック
    applyTextListValue(sibling_text,inputElement)
  }
  
  return !!inputElement.value;  // valueが設定されているかを返す
}

// 親要素のTextContentを取得
function CheckInput_parentElement(inputElement) {
  // 親要素を取得
  var parent_element = inputElement.parentElement;
  
  if(parent_element){
    var parent_text = parent_element.textContent.trim();
    parent_text = parent_text.toLowerCase();
    // text_listの各キーがlabelに含まれているかチェック
    applyTextListValue(parent_text,inputElement)
  }

  return !!inputElement.value;  // valueが設定されているかを返す

}


function applyTextListValue(text,input){
  for (var key in text_list) {
    if (text.includes(key)) {

      //電話番号がヒットしたときに兄弟要素が3つあるかチェック
      if (phoneKeys.includes(key)) {
        // 親要素を取得
        var parentElement = input.parentElement;

        // 親要素が存在しない場合は false を返す
        if (!parentElement) {
          return false;
        }

        // 親要素の子要素をすべて取得
        var siblingInputs = parentElement.querySelectorAll('input');
        
        // Inputが3つ以上あるかチェック
        if(siblingInputs.length == 3){
          siblingInputs[0].value = '090';
          siblingInputs[1].value = '1234';
          siblingInputs[2].value = '5678';
          return;
        }
      }

      //郵便がヒットしたときに兄弟要素が2つあるかチェック
      if (key == '郵便') {
        // 親要素を取得
        var parentElement = input.parentElement;

        // 親要素が存在しない場合は false を返す
        if (!parentElement) {
          return false;
        }

        // 親要素の子要素をすべて取得
        var siblingInputs = parentElement.querySelectorAll('input');
        
        // Inputが3つ以上あるかチェック
        if(siblingInputs.length == 2){
          siblingInputs[0].value = '373';
          siblingInputs[1].value = '0012';
          return;
        }
      }

        input.value = text_list[key];  // 含まれていたら、inputのvalueを設定
        return;  // この時点でkeyループを中断
    }
}
}


function CheckInput_label(inputElement) {
  var inputId = inputElement.id;

  // ID 属性が設定されていない場合は null を返す
  if (!inputId) {
    return false;
  }

  // ID 属性を持つ label 要素の最初にヒットした要素を取得
  var target_label = document.querySelector('label[for="' + inputId + '"]');
  
  // target_label が存在するかチェック
  if (target_label) {
    var label_text = target_label.textContent;
  } else {
    var label_text = ''; // ラベルが見つからない場合の処理
  }

  if(label_text){
    // text_listの各キーがlabelに含まれているかチェック
    applyTextListValue(label_text,inputElement)
  }

  return !!inputElement.value;  // valueが設定されているかを返す
}


// Required属性をチェック
function check_required_attr(inputs) {
    var filteredInputs = []; // 新しい配列を作成
    var hasRequired = false;

    // InputにRequiredが使用されているかチェックし、条件を満たす要素を追加
    for (var i = 0; i < inputs.length; i += 1) {
        // type が radio または checkbox の場合は無条件で追加
        if (inputs[i].type === 'radio' || inputs[i].type === 'checkbox') {
            filteredInputs.push(inputs[i]);
        }
        // required 属性がある場合も追加
        else if (inputs[i].hasAttribute('required')) {
            filteredInputs.push(inputs[i]);
            
        }
    }
    // フラグを立てる：filteredInputs が inputs の 4 分の 3 以上の場合に true にする
    if (filteredInputs.length >= inputs.length * 3 / 4) {
      hasRequired = true;
    }


    // Required属性がある要素があれば、それを返す。なければ元の inputs を返す。
    return hasRequired ? filteredInputs : inputs;
}


// クラス名に 'required' が含まれるか、または type が 'radio' または 'checkbox' の場合をチェック
function check_classList_required(inputs) {
    var filteredInputs = []; // 新しい配列を作成
    var hasRequired = false;

    // InputにRequiredが使用されているかチェックし、条件を満たす要素を追加
    for (var i = 0; i < inputs.length; i += 1) {
        // type が radio または checkbox の場合は無条件で追加
        if (inputs[i].type === 'radio' || inputs[i].type === 'checkbox') {
            filteredInputs.push(inputs[i]);
        }
        // クラス名に 'required' を含む場合も追加
        else if (inputs[i].classList.toString().includes('required')) {
            filteredInputs.push(inputs[i]);
            
        }
    }

    // フラグを立てる：filteredInputs が inputs の 4 分の 3 以上の場合に true にする
    if (filteredInputs.length >= inputs.length * 3 / 4) {
      hasRequired = true;
    }


    // hasRequiredがTrueならばFilterdInputsを、なければ元の inputs を返す。
    return hasRequired ? filteredInputs : inputs;
}


function Phone_3inputs() {
    var phoneInputs = [];
    var inputs = formElements.inputs;

    // 電話番号に関連する input 要素を収集
    //ClassやNameなどすべての要素をひとつの文字列にしてる
    for (var j = 0; j < inputs.length; j++) {
        var element = inputs[j];
        var combinedString = [
            element.id || '',
            Array.from(element.classList).join(' '),
            element.name || '',
            element.placeholder || ''
        ].join(' ');

        // 要素をまとめた文字列ないにKeyがないかをチェック
        for (var key of phoneKeys) {
            if (combinedString.includes(key)) {
                phoneInputs.push(element);
                break; // 1つのキーに対して1度だけ追加
            }
        }
    }
  
    // phoneInputs に3つの要素がある場合にのみ処理を行う
    if (phoneInputs.length === 3) {
        var phoneSegments = ['090', '1234', '5678'];

        for (var k = 0; k < phoneInputs.length; k++) {
            phoneInputs[k].value = phoneSegments[k];
        }
        

    }
}


  
// KeywordでLabelの文字列を検索して、TrueならばValueに任意の値を入力
// setInputValueForLabel('郵便', '3730012');
function setInputValueForLabel(keyword, value) {
  document.querySelectorAll('label').forEach(label => {
      if (label.textContent.includes(keyword)) {
          // ラベルに関連する input を取得
          var inputId = label.getAttribute('for');
          var input = document.getElementById(inputId);
          if (input) {
              input.value = value;
          }
      }
  });
}


    

  
  
