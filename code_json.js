function making_code_json(cvJson_cvaName,cvJson_label) {
    return [
        {
          'name': '電話クリック',
          'script': `<!-- Event snippet for ${cvJson_cvaName} -->
      <script>
            window.addEventListener("DOMContentLoaded", function() {
               document.querySelectorAll('a[href*="tel:"]').forEach(function(element) {
                    element.addEventListener('click', function(){
                        gtag('event', 'conversion', {'send_to':'AW-${cvJson_label}'});
                    });
                });
            });
      </script>`
        },
        {
          'name': 'LINEクリック(lin.ee)',
          'script': `<!-- Event snippet for ${cvJson_cvaName} -->
      <script>
            window.addEventListener("DOMContentLoaded", function() {
               document.querySelectorAll('a[href*="lin.ee"]').forEach(function(element) {
                    element.addEventListener('click', function(){
                        gtag('event', 'conversion', {'send_to':'AW-${cvJson_label}'});
                    });
                });
            });
      </script>`
        },
        {
          'name': 'LINEクリック(line.me)',
          'script': `<!-- Event snippet for ${cvJson_cvaName} -->
      <script>
            window.addEventListener("DOMContentLoaded", function() {
               document.querySelectorAll('a[href*="line.me"]').forEach(function(element) {
                    element.addEventListener('click', function(){
                        gtag('event', 'conversion', {'send_to':'AW-${cvJson_label}'});
                    });
                });
            });
      </script>`
        },
        {
          'name': 'dataLayer push',
          'script': `<script>
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                  'event':'CV',
                  'ec_mail': mail_value,
                  'ec_phone': phone_value
              });
          </script>`
        },
        {
        'name': 'Scroll',
        'script': `var fired = false;
        window.addEventListener('scroll', function () {
        
            //ページ上での現在の位置を取得
          let scrollPx = document.documentElement.scrollTop;
          
          //ページ全体の高さから現在表示している分を引いて、現在表示されていない部分を出している
          let hiddenHeight = document.documentElement.scrollHeight -  document.documentElement.clientHeight;
          
          let scrollValue = Math.round((scrollPx / hiddenHeight) * 100);
          if (scrollValue >= 50 && fired == false) {
            gtag('event', 'conversion', {'send_to':'AW-${cvJson_label}'});
            fired = true; 
            }
        });`
      },         
      {
        'name': 'WPのLightningテンプレのHeadにコードいれる',
        'script': `// head内にカスタム用のコードを追加する
            function meta_headcustomtags() {
            $headcustomtag = <<<EOM

            <!-- headに表示させたいコードをここに！（この行は消してOK）-->

            EOM;
            echo $headcustomtag;
            }
            add_action( 'wp_head', 'meta_headcustomtags', 99);`
      },       
    ];
}
