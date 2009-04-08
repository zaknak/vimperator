var PLUGIN_INFO =
<VimperatorPlugin>
<name>{name}</name>
<description>Tombloo‚Åtumblr‚Épost‚·‚éApostæ‚Ìchannel_id‚ğw’è‰Â”\‚É‚µ‚Ü‚·</description>
<minVersion>2.0</minVersion>
<maxVersion>2.0</maxVersion>
<author homepage="http://d.hatena.ne.jp/zaknak/">zaknak</author>
<require type="extension" id="tombloo@brasil.to">Tombloo</require>
<version>0.0.1</version>
<detail><![CDATA[
== command ==
]]></detail>
</VimperatorPlugin>;

(function(){
    const sv = Components.classes['@brasil.to/tombloo-service;1'].getService().wrappedJSObject;
    var channel_id = '0';

    sv.addBefore(sv.Tumblr,'appendTags', function(form,ps){
        if(channel_id != '0' || channel_id != ''){
            form.channel_id = channel_id;
        }
    });

    commands.addUserCommand(['setc[hannelid]'],
        'set tumblr channel_id',
        function(args){
            switch(args.length){
                case 0:
                liberator.echo(channel_id);
                break;

                case 1:
                channel_id = args[0];
                liberator.echo(channel_id);
                break;

                default:
                liberator.echoerr('too many args');
                break;
            }
        },{
            completer:function(context,args){
                context.title = ['channel_id'];
                context.completions = [
                    ['0','default'],
                    ['private_','prefix private tumblelog'],
                    ['private_123456','private tumblelog'],
                ];
            }
        }
    );
})();
