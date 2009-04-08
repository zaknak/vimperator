var PLUGIN_INFO =
<VimperatorPlugin>
<name>{name}</name>
<description>Tomblooのサービスを利用してtumblrとhatenaのアカウントを切り替えます</description>
<minVersion>2.0pre</minVersion>
<maxVersion>2.0</maxVersion>
<author homepage="http://d.hatena.ne.jp/zaknak/">zaknak</author>
<require type="extension" id="tombloo@brasil.to">Tombloo</require>
<version>0.1.3</version>
<detail><![CDATA[
== command ==
:logintumblr[!] [e-mail] [password]
:loginhatena[!] [id] [password]
]]></detail>
</VimperatorPlugin>;

(function(){
    const sv = Components.classes['@brasil.to/tombloo-service;1'].getService().wrappedJSObject;

    function login(args,opt){
        var model = sv.models[opt.target];

        switch(args.length){
            case 0:
                model.getCurrentUser().addCallback(function(user){
                    liberator.echo('Current user is ' + user);
                    args.bang && liberator.open(opt.url, liberator.CURRENT_TAB);
                });
                break;

            case 1:
                model.getPasswords().some(function(pw){
                    if(args[0] == pw.user){
                        liberator.echo('User found');
                        model.login(pw.user, pw.password).addCallback(function(){
                            args.bang && liberator.open(opt.url, liberator.CURRENT_TAB);
                        });
                        return true;
                    }
                }) || liberator.echo('User not found');
                break;

            case 2:
                model.login(args[0], args[1]).addCallback(function(){
                    args.bang && liberator.open(opt.url, liberator.CURRENT_TAB);
                });
                break;

            default:
                liberator.echoerr('Illegal args');
                break;
        }
    }

    function completeUsers(target,args,context){
        var users = [];
        var model = sv.models[target];

        if(args.length <= 1){
            model.getPasswords().forEach(function(pw){
                users.push([pw.user, target + ' user']);
            });
            context.title = ['user name'];
        }else{
            model.getPasswords().forEach(function(pw){
                users.push([pw.password, target + ' password']);
            });
            context.title = ['password'];
        }
        context.completions = users;
    }

    commands.addUserCommand(['loginh[atena]','lh'],
        'login hatena',
        function(args){
            login(args,{
                target : 'Hatena',
                url    : 'http://www.hatena.ne.jp/my'
            });
        },{
            bang : true,
            completer : function(context,args){
                completeUsers('Hatena', args, context);
            }
        }
    );

    commands.addUserCommand(['logint[umblr]','lt'],
        'login tumblr',
        function(args){
            login(args,{
                target : 'Tumblr',
                url    : 'http://www.tumblr.com/dashboard'
            });
        },{
            bang : true,
            completer : function(context,args){
                completeUsers('Tumblr', args, context);
            }
        }
    );
})();
