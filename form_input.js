//https://blog.s0014.com/posts/2016-08-17-js-dummy-input-form/
(function () {
// 固定で入力したい値
var values = {
  textarea : 'テスト送信です', 
  input : {
    'text'           : 'テキスト',
    'tel'            : '090123145678',
    'email'          : 'test@test.com',
    'number'         : '', // 入力が無ければinputのmax属性の値が入る
    'range'          : '', // 入力が無ければinputのmax属性の値が入る
  }
};

// ClassやID、Nameの名前から種類を推測して入力する

var text_list = {
  'addres': '3730012',
  'zip': '3730012',
  'mail': 'test@test.com',
  'phone': '090123145678',
  'tel': '090123145678',
  'name': 'テスト'
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
      
        // text_list のキーがどれかに含まれているかチェック
        var found = false;
        for (var key in text_list) {
          if (text_list.hasOwnProperty(key)) {
            if (id.includes(key) || classList.includes(key) || name.includes(key)) {
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

var formElements = {
  textareas : document.getElementsByTagName('textarea'),
  selects   : document.getElementsByTagName('select'),
  inputs    : document.getElementsByTagName('input')
};
runInput(formElements);

})();
