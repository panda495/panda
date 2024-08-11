//https://blog.s0014.com/posts/2016-08-17-js-dummy-input-form/
(function () {
    // 固定で入力したい値
    var values = {
      textarea : 'テスト送信です', 
      input : {
        'text'           : 'テキスト',
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
      'addres': '3730012',
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
        textareas[i].value = 'テスト送信です';
      }
    
      // selectタグ
      var selects = formElements.selects;
      for (var i = 0; i < selects.length; i += 1) {
        var options = selects[i].getElementsByTagName('option');
        if (options.length > 0) {
          selects[i].value = options[options.length - 1].value;
        }
      }
    
      // inputタグ
      var inputs = formElements.inputs;

      //required属性をチェックして、もしあればそれでフィルターかけてる
      inputs = check_required_attr(inputs)
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
    };
    
    // Required属性をチェック
    function check_required_attr(inputs) {
        var filteredInputs = []; // 新しい配列を作成

        // InputにRequiredが使用されているかチェックし、条件を満たす要素を追加
        for (var i = 0; i < inputs.length; i += 1) {
            if (inputs[i].hasAttribute('required')) {
                filteredInputs.push(inputs[i]); // 条件を満たす要素を追加
            }
        }

        // Required属性がある要素があれば、それを返す。なければ元の inputs を返す。
        return filteredInputs.length > 0 ? filteredInputs : inputs;
    }


    // Requiredという文字列がClassに含まれているかをチェック、主にWPCF7フォーム用
    function check_classList_required(inputs) {
        var requiredInputs = []; // 新しい配列を作成

        // InputにRequiredが使用されているのがあるかチェック
        for (var i = 0; i < inputs.length; i += 1) {
            // クラス名が 'required' を含むかチェック
            if (inputs[i].classList.toString().includes('required')) {
                requiredInputs.push(inputs[i]); // 条件を満たす要素を追加
            }
        }

        // 必要な要素があれば、それを返す
        return requiredInputs.length > 0 ? requiredInputs : inputs;
    }



      
    var formElements = {
      textareas : document.getElementsByTagName('textarea'),
      selects   : document.getElementsByTagName('select'),
      inputs    : document.getElementsByTagName('input')
    };
    runInput(formElements);
    
})();
    
