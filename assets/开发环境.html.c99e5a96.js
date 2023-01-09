import{_ as n,o as s,c as a,e}from"./app.db6f0f80.js";const i={},l=e(`<h2 id="\u5F00\u53D1\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#\u5F00\u53D1\u73AF\u5883" aria-hidden="true">#</a> \u5F00\u53D1\u73AF\u5883</h2><h3 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> Node</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># nvm</span>
<span class="token function">curl</span> -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh <span class="token operator">|</span> <span class="token function">bash</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
export NVM_DIR=&quot;<span class="token environment constant">$HOME</span>/.nvm&quot;
[ -s &quot;<span class="token variable">$NVM_DIR</span>/nvm.sh&quot; ] &amp;&amp; \\. &quot;<span class="token variable">$NVM_DIR</span>/nvm.sh&quot;  # This loads nvm
[ -s &quot;<span class="token variable">$NVM_DIR</span>/bash_completion&quot; ] &amp;&amp; \\. &quot;<span class="token variable">$NVM_DIR</span>/bash_completion&quot;  # This loads nvm bash_completion
EOF</span>

nvm <span class="token function">install</span> <span class="token parameter variable">--lts</span>
<span class="token comment"># nvm alias default node</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="go" tabindex="-1"><a class="header-anchor" href="#go" aria-hidden="true">#</a> Go</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># gvm</span>
<span class="token function">bash</span> <span class="token operator">&lt;</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer<span class="token punctuation">)</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[[ -s &quot;<span class="token environment constant">$HOME</span>/.gvm/scripts/gvm&quot; ]] &amp;&amp; source &quot;<span class="token environment constant">$HOME</span>/.gvm/scripts/gvm&quot;
export GO111MODULE=&quot;on&quot;
export GOPROXY=https://goproxy.cn,direct
export GOPRIVATE=
# \u5173\u95ED\u6821\u9A8CGo\u4F9D\u8D56\u5305\u7684\u54C8\u5E0C\u503C
export GOSUMDB=off
EOF</span>

gvm listall

gvm <span class="token function">install</span> go1.4 <span class="token parameter variable">-B</span>
gvm use go1.4
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOROOT_BOOTSTRAP</span><span class="token operator">=</span><span class="token variable">$GOROOT</span>
gvm <span class="token function">install</span> go1.18.5
<span class="token comment"># go env -w GOPROXY=https://goproxy.cn,direct</span>

gvm use go1.18.5 <span class="token parameter variable">--default</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> Python</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># pyenv</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer <span class="token operator">|</span> <span class="token function">bash</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
export PYENV_ROOT=&quot;<span class="token environment constant">$HOME</span>/.pyenv&quot;
command -v pyenv &gt;/dev/null || export PATH=&quot;<span class="token variable">$PYENV_ROOT</span>/bin:<span class="token environment constant">$PATH</span>&quot;
eval &quot;<span class="token variable"><span class="token variable">$(</span>pyenv init -<span class="token variable">)</span></span>&quot;
EOF</span>

<span class="token comment"># poerty</span>
<span class="token comment"># sudo apt install python3-pip</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSL</span> https://install.python-poetry.org <span class="token operator">|</span> python3 -

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
export PATH=&quot;<span class="token environment constant">$HOME</span>/.local/bin:<span class="token environment constant">$PATH</span>&quot;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="java" tabindex="-1"><a class="header-anchor" href="#java" aria-hidden="true">#</a> Java</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># sdkman</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;https://get.sdkman.io&quot;</span> <span class="token operator">|</span> <span class="token function">bash</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR=&quot;<span class="token environment constant">$HOME</span>/.sdkman&quot;
[[ -s &quot;<span class="token environment constant">$HOME</span>/.sdkman/bin/sdkman-init.sh&quot; ]] &amp;&amp; source &quot;<span class="token environment constant">$HOME</span>/.sdkman/bin/sdkman-init.sh&quot;
EOF</span>

sdk list <span class="token function">java</span>
sdk <span class="token function">install</span> <span class="token function">java</span> <span class="token number">8.0</span>.265-open
sdk default <span class="token function">java</span> <span class="token number">8.0</span>.265-open

<span class="token comment"># sdk install java 11.0.12-open</span>

<span class="token comment"># maven</span>
<span class="token comment"># https://developer.aliyun.com/mvn/guide</span>
sdk <span class="token function">install</span> maven
<span class="token comment"># ~/.m2/settings.xml</span>
<span class="token function">vim</span> ~/.sdkman/candidates/maven/3.8.6/conf/settings.xml
<span class="token comment">#\u5728&lt;mirrors&gt;&lt;/mirrors&gt;\u6807\u7B7E\u4E2D\u6DFB\u52A0 mirror \u5B50\u8282\u70B9</span>
<span class="token comment"># &lt;mirror&gt;</span>
<span class="token comment">#   &lt;id&gt;nexus-aliyun&lt;/id&gt;</span>
<span class="token comment">#   &lt;mirrorOf&gt;*&lt;/mirrorOf&gt;</span>
<span class="token comment">#   &lt;name&gt;Nexus aliyun&lt;/name&gt;</span>
<span class="token comment">#   &lt;url&gt;http://maven.aliyun.com/nexus/content/groups/public&lt;/url&gt;</span>
<span class="token comment"># &lt;/mirror&gt;</span>
<span class="token operator">&lt;</span>mirror<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>id<span class="token operator">&gt;</span>aliyunmaven<span class="token operator">&lt;</span>/id<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>mirrorOf<span class="token operator">&gt;</span>*<span class="token operator">&lt;</span>/mirrorOf<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>\u963F\u91CC\u4E91\u516C\u5171\u4ED3\u5E93<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>https://maven.aliyun.com/repository/public<span class="token operator">&lt;</span>/url<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/mirror<span class="token operator">&gt;</span>

<span class="token comment"># gradle</span>
sdk <span class="token function">install</span> gradle
<span class="token comment"># ~/.gradle/init.gradle</span>
<span class="token function">vim</span> ~/.sdkman/candidates/gradle/7.5.1/init.d/init.gradle
allprojects<span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        def ALIYUN_CENTRAL_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/central&#39;</span>
        def ALIYUN_JCENTER_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/public&#39;</span>
        def ALIYUN_GOOGLE_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/google&#39;</span>
        def ALIYUN_GRADLE_PLUGIN_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/gradle-plugin&#39;</span>
        def ALIYUN_SPRING_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/spring&#39;</span>
        def ALIYUN_SPRING_PLUGIN_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/spring-plugin&#39;</span>
        def ALIYUN_GRAILS_CORE_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/grails-core&#39;</span>
        def ALIYUN_APACHE_SNAPSHOT_URL <span class="token operator">=</span> <span class="token string">&#39;https://maven.aliyun.com/repository/apache-snapshots&#39;</span>

        all <span class="token punctuation">{</span> ArtifactRepository repo -<span class="token operator">&gt;</span>
            if<span class="token punctuation">(</span>repo instanceof MavenArtifactRepository<span class="token punctuation">)</span><span class="token punctuation">{</span>
                def url <span class="token operator">=</span> repo.url.toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>url.startsWith<span class="token punctuation">(</span><span class="token string">&#39;https://repo1.maven.org/maven2&#39;</span><span class="token punctuation">))</span> <span class="token punctuation">{</span>
                    project.logger.lifecycle <span class="token string">&quot;Repository <span class="token variable">\${repo.url}</span> replaced by <span class="token variable">$ALIYUN_CENTRAL_URL</span>.&quot;</span>
                    remove repo
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>url.startsWith<span class="token punctuation">(</span><span class="token string">&#39;https://jcenter.bintray.com/&#39;</span><span class="token punctuation">))</span> <span class="token punctuation">{</span>
                    project.logger.lifecycle <span class="token string">&quot;Repository <span class="token variable">\${repo.url}</span> replaced by <span class="token variable">$ALIYUN_JCENTER_URL</span>.&quot;</span>
                    remove repo
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url ALIYUN_CENTRAL_URL
            url ALIYUN_JCENTER_URL
            url ALIYUN_GOOGLE_URL
            url ALIYUN_GRADLE_PLUGIN_URL
            url ALIYUN_SPRING_URL
            url ALIYUN_SPRING_PLUGIN_URL
            url ALIYUN_GRAILS_CORE_URL
            url ALIYUN_APACHE_SNAPSHOT_URL
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># build.gradle</span>
allprojects <span class="token punctuation">{</span>
  repositories <span class="token punctuation">{</span>
    maven <span class="token punctuation">{</span>
      url <span class="token string">&#39;https://maven.aliyun.com/repository/public/&#39;</span>
    <span class="token punctuation">}</span>
    mavenLocal<span class="token punctuation">(</span><span class="token punctuation">)</span>
    mavenCentral<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


sdk <span class="token function">install</span> tomcat
<span class="token comment"># sdk install springboot</span>

<span class="token comment"># sdk flush candidates</span>
<span class="token comment"># sdk env init</span>

<span class="token comment"># jenv</span>
<span class="token comment"># git clone https://github.com/jenv/jenv.git ~/.jenv</span>
<span class="token comment"># cat &gt;&gt; ~/.zshrc &lt;&lt;EOF</span>
<span class="token comment"># export PATH=&quot;$HOME/.jenv/bin:$PATH&quot;</span>
<span class="token comment"># eval &quot;$(jenv init -)&quot;</span>
<span class="token comment"># EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-O</span> https://github.com/phpbrew/phpbrew/releases/latest/download/phpbrew.phar
<span class="token function">chmod</span> +x phpbrew.phar

<span class="token comment"># Move the file to some directory within your $PATH</span>
<span class="token function">sudo</span> <span class="token function">mv</span> phpbrew.phar /usr/local/bin/phpbrew

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[[ -e <span class="token environment constant">$HOME</span>/.phpbrew/bashrc ]] &amp;&amp; source <span class="token environment constant">$HOME</span>/.phpbrew/bashrc
EOF</span>

phpbrew <span class="token function">install</span> <span class="token number">5.6</span> +default +fpm +mysql +gd
phpbrew list
phpbrew switch <span class="token number">5.6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="android" tabindex="-1"><a class="header-anchor" href="#android" aria-hidden="true">#</a> Android</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
export ANDROID_HOME=/opt/android-sdk-linux
export ANDROID_SDK_ROOT=<span class="token variable">$ANDROID_HOME</span>
export PATH=&quot;<span class="token variable">$ANDROID_HOME</span>/cmdline-tools/latest/bin:<span class="token variable">$ANDROID_HOME</span>/platform-tools:<span class="token variable">$ANDROID_HOME</span>/emulator:<span class="token variable">$ANDROID_HOME</span>/platforms:<span class="token environment constant">$PATH</span>&quot;
EOF</span>


ANDROID_SDK_TOOLS_VERSION <span class="token number">8512546</span>

<span class="token comment"># sdkmanager --list</span>
<span class="token comment"># android list sdk --all</span>
<span class="token comment"># android list sdk --extended --proxy-host mirrors.neusoft.edu.cn --proxy-port 80 -s</span>
<span class="token assign-left variable">ANDROID_VERSION</span><span class="token operator">=</span><span class="token number">30</span>
<span class="token assign-left variable">ANDROID_BUILD_TOOLS_VERSION</span><span class="token operator">=</span><span class="token string">&quot;30.0.3&quot;</span>
<span class="token assign-left variable">ANDROID_ARCHITECTURE</span><span class="token operator">=</span><span class="token string">&quot;x86_64&quot;</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.android
<span class="token function">touch</span> <span class="token environment constant">$HOME</span>/.android/repositories.cfg
<span class="token function">wget</span> <span class="token parameter variable">-q</span> https://dl.google.com/android/repository/commandlinetools-linux-<span class="token variable">\${ANDROID_SDK_TOOLS_VERSION}</span>_latest.zip <span class="token parameter variable">-O</span> android-sdk-tools.zip
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">\${ANDROID_HOME}</span>/cmdline-tools/
<span class="token function">sudo</span> <span class="token function">unzip</span> <span class="token parameter variable">-q</span> android-sdk-tools.zip <span class="token parameter variable">-d</span> <span class="token variable">\${ANDROID_HOME}</span>/cmdline-tools/
<span class="token function">sudo</span> <span class="token function">mv</span> <span class="token variable">\${ANDROID_HOME}</span>/cmdline-tools/cmdline-tools <span class="token variable">\${ANDROID_HOME}</span>/cmdline-tools/latest
<span class="token comment"># sudo chown $USER: $ANDROID_HOME -R</span>
<span class="token function">rm</span> android-sdk-tools.zip
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager <span class="token parameter variable">--licenses</span>
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager <span class="token string">&quot;build-tools;<span class="token variable">\${ANDROID_BUILD_TOOLS_VERSION}</span>&quot;</span>
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager <span class="token string">&quot;platforms;android-<span class="token variable">\${ANDROID_VERSION}</span>&quot;</span>
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager platform-tools
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager emulator
<span class="token function">yes</span> <span class="token operator">|</span> sdkmanager <span class="token string">&quot;system-images;android-<span class="token variable">\${ANDROID_VERSION}</span>;google_apis_playstore;<span class="token variable">\${ANDROID_ARCHITECTURE}</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter" aria-hidden="true">#</a> Flutter</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># fvm</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc <span class="token operator">&lt;&lt;</span><span class="token string">EOF
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH=&quot;<span class="token environment constant">$HOME</span>/.pub-cache/bin:<span class="token environment constant">$HOME</span>/fvm/default/bin:<span class="token environment constant">$PATH</span>&quot;
# alias flutter=&quot;fvm flutter&quot;
# alias dart=&quot;fvm dart&quot;
EOF</span>

<span class="token function">wget</span> https://github.com/fluttertools/fvm/releases/download/2.4.1/fvm-2.4.1-linux-x64.tar.gz

<span class="token comment"># install</span>
brew tap leoafarias/fvm
brew <span class="token function">install</span> fvm

<span class="token comment"># uninstall</span>
brew uninstall fvm
brew untap leoafarias/fvm

<span class="token comment"># fvm install 3.3.0</span>
fvm <span class="token function">install</span> stable
fvm global stable

flutter config --no-analytics --enable-web
flutter precache
<span class="token function">yes</span> <span class="token operator">|</span> flutter doctor --android-licenses
flutter doctor
flutter emulators <span class="token parameter variable">--create</span>
flutter update-packages

<span class="token function">vim</span> ~/fvm/versions/stable/packages/flutter_tools/gradle/flutter.gradle
buildscript <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        // google<span class="token punctuation">(</span><span class="token punctuation">)</span>
        // mavenCentral<span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/nexus/content/repositories/google&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://maven.aliyun.com/nexus/content/groups/public&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        /* When bumping, also update ndkVersion above. */
        classpath <span class="token string">&#39;com.android.tools.build:gradle:4.1.0&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[l];function o(p,c){return s(),a("div",null,t)}const d=n(i,[["render",o],["__file","\u5F00\u53D1\u73AF\u5883.html.vue"]]);export{d as default};
