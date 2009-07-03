var PLUGIN_INFO =
<VimperatorPlugin>
<name>{name}</name>
<description>閲覧中のurlに対する、はてなブックマークのエントリーページを開きます。</description>
<minVersion>2.0pre</minVersion>
<maxVersion>2.0pre</maxVersion>
<author homepage="http://d.hatena.ne.jp/zaknak/">zaknak</author>
<version>0.2</version>
<detail><![CDATA[
== Command ==
:hateb[!]:
    閲覧中のurlに対する、はてなブックマークのエントリーページを新しいタブに開きそのタブにフォーカスを移動します。
    [!] 現在のタブに開きます。

== TODO ==
- urlに参照元情報(?ref=...)が付加されていた場合に除去するオプションの追加
- NEW_BACKGROUND_TAB で開くオプションの追加
]]></detail>
</VimperatorPlugin>;

(function(){
    commands.addUserCommand(
        ['hateb','hb'],
        'open hatena bookmark entry page',
        function(args){
            var prefixEntryUrl = 'b.hatena.ne.jp/entry/';
            var prefixMetabUrl = [];

            var uri = util.newURI(buffer.URL);
            var url = (uri.schemeIs("https") ? "s/" :"") + uri.host + uri.path;

            if(args.count > 1){
                for(i = 0; i < args.count; i++){
                    prefixMetabUrl.push(prefixEntryUrl);
                }
                prefixEntryUrl = prefixMetabUrl.join('');
            }

            url = 'http://' + prefixEntryUrl + url.replace('#','%23');

            if(args.bang){
                liberator.open(url, liberator.CURRENT_TAB);
            }else{
                liberator.open(url, liberator.NEW_TAB);
            }
        },{
            bang: true,
            count: true
        }
    );
})();

