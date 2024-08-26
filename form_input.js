//https://blog.s0014.com/posts/2016-08-17-js-dummy-input-form/
(function () {
  // 固定で入力したい値
  var values = {
    textarea : 'Googleによるテスト送信です', 
    input : {
      'text'           : 'テスト',
      'tel'            : '09012345678', 
      'email'          : 'test@test.com',
      'number'         : '', // 入力が無ければinputのmax属性の値が入る
      'range'          : '', // 入力が無ければinputのmax属性の値が入る
    }
  };
  
  // ClassやID、Nameの名前から種類を推測して入力する
  
  var text_list = {
    '@': 'test@test.com', 
    'mail': 'test@test.com',
    'メール': 'test@test.com',
    'phone': '09012345678',
    'tel': '09012345678',
    '電話': '09012345678',
    'name': 'テスト',
    // 'addres': '3730012',機能しないこと多いのでコメントアウト26Aug2024
    'zip': '3730012'
  };
  
    
  /**
   * タグのname、id、class属性の中身を整形して返す
   * <input name="this_site" id="blog" class="s0014 com">
   *   => [this_site : #blog.s0014.com]
   * @param {Object} tag - タグエレメント
   * @return {String} '[name,id,class]'
   */
  var addAttrs = function (tag) {
    var attr = '[';
    if (tag.name) {
      attr += tag.name + ": ";
    }
    if (tag.id) {
      attr += "#" + tag.id;
    }
    if (tag.classList.length) {
      attr += "." + String(tag.classList).replace(" ", ".");
    }
    if (tag.placeholder) {
      attr += " (" + tag.placeholder + ")";
    }
    return attr + "]";
  };
  
  /**
   * メイン処理
   * @param {Object} formElements - textarea,select,inputタグ
   */
  var runInput = function (formElements) {
    // textareaタグ
    var textareas = formElements.textareas;
    for (var i = 0; i < textareas.length; i += 1) {
      textareas[i].value = 'Googleによるテスト送信です';
    }
  
    // selectタグ
    var selects = formElements.selects;
    for (var i = 0; i < selects.length; i += 1) {
      var options = selects[i].getElementsByTagName('option');
      if (options.length > 0) {
        selects[i].value = options[options.length - 1].value;
      }
    }
      

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
  
    
    for (var i = 0; i < inputs.length; i += 1) {
      // 属性毎に処理
      switch (inputs[i].type) {
        case 'checkbox':
        case 'radio':
          inputs[i].checked = 'checked';
          break;
          
        case 'text':
          var inputElement = inputs[i];
        
          // 属性の値を取得
          var id = inputElement.id || '';
          var classList = Array.from(inputElement.classList).join(' ');
          var name = inputElement.name || '';
          var placeholder = inputElement.placeholder || '';

          // text_list のキーがどれかに含まれているかチェック
          var found = false;
          for (var key in text_list) {
            if (text_list.hasOwnProperty(key)) {
              if (id.includes(key) || classList.includes(key) || name.includes(key) || placeholder.includes(key)) {
                inputElement.value = text_list[key];
                found = true;
                break;
              }
            }
          }

          //電話番号Inputが３つあるとき用のコード、最後に実行することで他のコードでValueの上書きされるのを防いでる
          Phone_3inputs(inputs)
  
          // text_list のキーが含まれていない場合はデフォルト値を設定
          if (!found) {
            inputElement.value = 'テスト';
          }
          break;
        case 'range':
        case 'number':
          var cons = values.input[inputs[i].type];
          inputs[i].value = cons? cons : inputs[i].max;
          break;
        default:
          if (values.input[inputs[i].type]) {
            inputs[i].value = values.input[inputs[i].type]
          }
      }
    }

    // 郵便番号に関する処理
    //labelの文字列を使った郵便の処理
    setInputValueForLabel('郵便', '3730012');

    var all_inputs_length = document.querySelectorAll('input');

    all_inputs_length.forEach(input => {
      if (input.maxLength === 7) {
          input.value = '3730012';
      }
  });

    //labelの文字列を使った電話番号処理
    setInputValueForLabel('電話', '09012345678');

  };
  



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
              hasRequired = true; // Required属性がある要素が見つかった場合、フラグを立てる
          }
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
              hasRequired = true; // Required属性がある要素が見つかった場合、フラグを立てる
          }
      }

      // Required属性がある要素があれば、それを返す。なければ元の inputs を返す。
      return hasRequired ? filteredInputs : inputs;
  }


  function Phone_3inputs(inputs) {
      var phoneInputs = [];
      var phoneKeys = ['tel', 'phone', '電話'];

  
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
      
      console.log(phoneInputs.length)
      
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


    
  var formElements = {
    textareas : document.getElementsByTagName('textarea'),
    selects   : document.getElementsByTagName('select'),
    inputs    : document.getElementsByTagName('input')
  };
  runInput(formElements);
  
})();
  
