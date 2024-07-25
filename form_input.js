//https://blog.s0014.com/posts/2016-08-17-js-dummy-input-form/
(function () {
// 固定で入力したい値
var values = {
  textarea : 'テキスト\nエリア', // 「\n」で改行できる
  input : {
    'text'           : 'テキスト',
    'search'         : '検索テキスト',
    'tel'            : '01234567890',
    'password'       : 'Password1234',
    'url'            : 'http://abc.def.ghi',
    'email'          : 'mail@abc.def',
    'month'          : '2016-01',
    'week'           : '2016-W01',
    'date'           : '2016-01-01',
    'time'           : '12:34',
    'datetime-local' : '2016-01-01T12:34',
    'number'         : '', // 入力が無ければinputのmax属性の値が入る
    'range'          : '', // 入力が無ければinputのmax属性の値が入る
    'color'          : '#2477A0',
  }
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
    textareas[i].value = addAttrs(textareas[i]) + values.textarea;
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
        inputs[i].value = addAttrs(inputs[i]) + values.input[inputs[i].type];
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
