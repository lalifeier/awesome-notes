import{_ as l,o as t,c,a as n,b as s,d as i,e as a,r as d}from"./app.db6f0f80.js";const r={},o=a('<h2 id="\u73A9\u8F6C-ubuntu-20-04-lts" tabindex="-1"><a class="header-anchor" href="#\u73A9\u8F6C-ubuntu-20-04-lts" aria-hidden="true">#</a> \u73A9\u8F6C Ubuntu 20.04 LTS</h2><h3 id="\u5B89\u88C5\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u7BC7" aria-hidden="true">#</a> \u5B89\u88C5\u7BC7</h3><h4 id="\u89E3\u51B3\u663E\u5361\u9A71\u52A8\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u663E\u5361\u9A71\u52A8\u95EE\u9898" aria-hidden="true">#</a> \u89E3\u51B3\u663E\u5361\u9A71\u52A8\u95EE\u9898</h4><p>\u4E00\u822C\u9047\u5230\u7684\u5361\u6B7B\u3001\u9ED1\u5C4F\u4E4B\u7C7B\u7684\u95EE\u9898\u90FD\u662F\u82F1\u4F1F\u8FBE\u5F00\u6E90\u663E\u5361\u9A71\u52A8\u7684\u95EE\u9898</p><ul><li><p>\u5F00\u673A\uFF0C\u8FDB\u5165 grub \u753B\u9762</p></li><li><p>\u5149\u6807\u9009\u5B9A&quot;install Ubuntu&quot;\uFF0C\u6309&quot;e&quot; \u8FDB\u5165\u7F16\u8F91\u5F00\u673A\u6307\u4EE4\u7684\u6A21\u5F0F, \u627E\u5230 <code>quiet splash ---</code>\u66FF\u6362\u4E3A<code>nomodeset</code>\u3002\u4FEE\u6539\u5B8C\u6309 F10 \u91CD\u542F\u3002\u5B89\u88C5\u5B8C\u6210\u540E\uFF0C\u60A8\u5C06\u5FC5\u987B\u91CD\u542F\u7CFB\u7EDF</p></li><li><p>\u8FDB\u5165 grub \u753B\u9762\uFF0C\u518D\u6B21\u6309&quot;e&quot;\uFF0C\u627E\u5230<code>linux</code>\u5F00\u5934\u7684\u884C\uFF0C\u6DFB\u52A0<code>nouveau.modeset=0</code>\u5728\u8BE5\u884C\u7684\u7ED3\u5C3E\u5904\u3002\u6309 F10 \u91CD\u542F</p></li></ul><ul><li>\u5B89\u88C5 Nvidia \u663E\u5361\u9A71\u52A8</li></ul>',6),p={id:"\u53C2\u8003-https-ubuntuforums-org-showthread-php-t-2349782",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#\u53C2\u8003-https-ubuntuforums-org-showthread-php-t-2349782","aria-hidden":"true"},"#",-1),v={href:"https://ubuntuforums.org/showthread.php?t=2349782",target:"_blank",rel:"noopener noreferrer"},m=a(`<h3 id="\u7F8E\u5316\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u7F8E\u5316\u7BC7" aria-hidden="true">#</a> \u7F8E\u5316\u7BC7</h3><ul><li>\u5B89\u88C5\u5DE5\u5177 gnome-tweak-tool</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gnome-tweak-tool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u5B89\u88C5 gnome \u63D2\u4EF6</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gnome-shell-extensions
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> chrome-gnome-shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728https://extensions.gnome.org/\u5B89\u88C5\u63D2\u4EF6Dash to Dock \u548C NetSpeed</p><ul><li>\u5B89\u88C5 GTK \u4E3B\u9898</li></ul><p>\u5728https://www.gnome-look.org/p/1275087/\u4E0B\u8F7D\u4E3B\u9898\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> Mojave-dark-20200414114243.tar.xz
<span class="token function">sudo</span> <span class="token function">mv</span> Mojave-dark /usr/share/themes/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5F00 gnome-tweak-tool\uFF08\u4F18\u5316\uFF09\u5728\u4E3B\u9898\u680F\u9009\u62E9\u4E0B\u8F7D\u7684\u4E3B\u9898</p><ul><li>\u5B89\u88C5\u56FE\u6807 \u5728https://www.gnome-look.org/p/1305429/\u4E0B\u8F7D\u56FE\u6807\u6587\u4EF6</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> 01-McMojave-circle-20200415125915.tar.xz
<span class="token function">sudo</span> <span class="token function">mv</span> McMojave-circle /usr/share/icons
<span class="token function">sudo</span> <span class="token function">mv</span> McMojave-circle-dark /usr/share/icons
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5F00 gnome-tweak-tool\uFF08\u4F18\u5316\uFF09\u5728\u56FE\u6807\u680F\u9009\u62E9\u4E0B\u8F7D\u7684\u56FE\u6807</p><ul><li>\u5B89\u88C5\u5149\u6807 \u5728https://www.gnome-look.org/p/1355701/\u4E0B\u8F7D\u5149\u6807\u6587\u4EF6</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> McMojave-cursors.tar.xz
<span class="token function">sudo</span> <span class="token function">mv</span> McMojave-cursors /usr/share/icons
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5F00 gnome-tweak-tool\uFF08\u4F18\u5316\uFF09\u5728\u5149\u6807\u680F\u9009\u62E9\u4E0B\u8F7D\u7684\u5149\u6807</p><ul><li>\u5B89\u88C5 oh-my-zsh \u7F8E\u5316\u7EC8\u7AEF</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">zsh</span>
<span class="token comment">#\u8BBE\u5207\u6362shell\u4E3Azsh</span>
<span class="token function">sudo</span> chsh <span class="token parameter variable">-s</span> /bin/zsh
<span class="token comment">#\u5B89\u88C5oh-my-zsh</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span>

<span class="token comment">#\u5B89\u88C5\u5B57\u4F53</span>
<span class="token function">git</span> clone https://github.com/powerline/fonts.git <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token builtin class-name">cd</span> fonts
./install.sh

<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> fonts

<span class="token comment">#\u5B89\u88C5Powerlevel9k\u4E3B\u9898</span>
<span class="token function">git</span> clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
ohmyzsh/master/tools/install.sh<span class="token punctuation">)</span>
<span class="token comment">#\u514B\u9686\u5230\u672C\u5730\u540E\uFF0C\u5728 ~/.zshrc \u4E2D\u5C06\u4E3B\u9898\u66FF\u6362\u6210 powerlevel9k</span>
<span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;powerlevel9k/powerlevel9k&quot;</span>

<span class="token comment">#\u5B89\u88C5\u63D2\u4EF6</span>
<span class="token comment">#\u200Bzsh-autosuggestions(\u547D\u4EE4\u81EA\u52A8\u8865\u5168)</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-autosuggestions
<span class="token comment">#\u200B\u200Bzsh-syntax-highlighting(\u547D\u4EE4\u8BED\u6CD5\u9AD8\u4EAE)</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-syntax-highlighting
<span class="token comment">#autojump(\u81EA\u52A8\u8DF3\u8F6C)</span>
<span class="token function">git</span> clone https://github.com/wting/autojump.git <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/autojump
<span class="token builtin class-name">cd</span> <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/autojump
./install.py
<span class="token comment">#[[ -s /home/lalifeier/.autojump/etc/profile.d/autojump.sh ]] &amp;&amp; source /home/lalifeier/.autojump/etc/profile.d/autojump.sh</span>
<span class="token comment">#\u5728 ~/.zshrc \u4E2D plugins=() \u4E2D\u6DFB\u52A0\u4E0A zsh-autosuggestions\uFF0Czsh-syntax-highlighting\uFF0Cautojump, \u7528\u7A7A\u683C\u9694\u5F00\u5373\u53EF</span>
<span class="token assign-left variable">plugins</span><span class="token operator">=</span><span class="token punctuation">(</span>git zsh-autosuggestions zsh-syntax-highlighting autojump<span class="token punctuation">)</span>

<span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),b=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"/usr/bin/env: \u201Cpython\u201D: \u6CA1\u6709\u90A3\u4E2A\u6587\u4EF6\u6216\u76EE\u5F55")],-1),h=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u68C0\u67E5\u7CFB\u7EDF\u5DF2\u5B89\u88C5\u7684 Python \u7248\u672C</span>
<span class="token function">ls</span> /usr/bin/python*
<span class="token comment">#\u68C0\u6D4B\u662F\u5426\u5DF2\u5B58\u5728 Python \u7684\u914D\u7F6E\u65B9\u6848</span>
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--list</span> python
<span class="token comment">#\u914D\u7F6Epython</span>
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--install</span> /usr/bin/python python /usr/bin/python3 <span class="token number">1</span>
<span class="token comment">#\u66F4\u6539\u9ED8\u8BA4 Python \u7248\u672C</span>
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--config</span> python
<span class="token comment">#\u68C0\u67E5\u5F53\u524D Python \u9ED8\u8BA4\u7248\u672C</span>
python <span class="token parameter variable">-V</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),k={id:"\u53C2\u8003-https-github-com-ohmyzsh-ohmyzsh",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#\u53C2\u8003-https-github-com-ohmyzsh-ohmyzsh","aria-hidden":"true"},"#",-1),f={href:"https://github.com/ohmyzsh/ohmyzsh",target:"_blank",rel:"noopener noreferrer"},x=a(`<h4 id="\u4FEE\u6539-zshrc-\u4E2D\u7684-zsh-theme" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539-zshrc-\u4E2D\u7684-zsh-theme" aria-hidden="true">#</a> \u4FEE\u6539 ~/.zshrc \u4E2D\u7684 ZSH_THEME</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u5B57\u4F53\u8BBE\u5B9A (\u6CE8\u610F\uFF0C\u5B57\u4F53\u8BBE\u5B9A\u5FC5\u987B\u653E\u5728\u4E3B\u9898\u4E4B\u524D\uFF09</span>
<span class="token comment">#\u5B57\u4F53\u6A21\u5F0F\u53EF\u9009\u7684\u6709\uFF1Anerdfont-complete awesome-fontconfig awesome-patched</span>
<span class="token assign-left variable">POWERLEVEL9K_MODE</span><span class="token operator">=</span><span class="token string">&#39;nerdfont-complete&#39;</span>
<span class="token comment">#\u4E3B\u9898\u8BBE\u5B9A</span>
<span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;powerlevel9k/powerlevel9k&quot;</span>
<span class="token assign-left variable">POWERLEVEL9K_CONTEXT_TEMPLATE</span><span class="token operator">=</span><span class="token string">&quot;%n&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003:</h4>`,3),w={href:"https://github.com/Powerlevel9k/powerlevel9k/wiki/Stylizing-Your-Prompt",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/Powerlevel9k/powerlevel9k/wiki/Show-Off-Your-Config",target:"_blank",rel:"noopener noreferrer"},_=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"\u6253\u5F00\u7EC8\u7AEF\u5C31\u53D8\u6210\u4E86 PowerLine \u7684\u5F62\u5F0F\u4E86\u3002\u7531\u4E8E\u6CA1\u6709\u5B89\u88C5\u76F8\u5E94\u7684\u5B57\u4F53\uFF0C\u5BFC\u81F4\u7B26\u53F7\u663E\u793A\u4E0D\u5B8C\u5168")],-1),T=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u5B89\u88C5awesome-terminal-fonts</span>
<span class="token function">git</span> clone https://github.com/gabrielelana/awesome-terminal-fonts
<span class="token builtin class-name">cd</span> awesome-terminal-fonts
<span class="token comment">#\u5C06 build/ \u76EE\u5F55\u91CC\u7684\u6240\u6709\u6587\u4EF6\u62F7\u8D1D\u5230 ~/.fonts/ \u76EE\u5F55\uFF08\u6CA1\u6709\u5C31\u521B\u5EFA\u4E00\u4E2A\uFF09</span>
<span class="token function">cp</span> <span class="token parameter variable">-R</span> build/* ~/.fonts/
<span class="token comment">#\u8BA9 freetype2 \u77E5\u9053\u8FD9\u4E9B\u5B57\u4F53</span>
fc-cache <span class="token parameter variable">-fv</span> ~/.fonts
<span class="token comment">#\u81EA\u5B9A\u4E49 config/10-symbols.conf \u914D\u7F6E\u6587\u4EF6\u91CC\u7684\u5B57\u4F53\uFF0C\u6539\u6210\u81EA\u5DF1\u559C\u6B22\u7684\u3002\u5F53\u7136\u4E0D\u6539\u5C31\u662F\u9ED8\u8BA4\u7684</span>
<span class="token comment">#\u62F7\u8D1D config/10-symbols.conf \u914D\u7F6E\u6587\u4EF6\u5230 ~/.config/fontconfig/conf.d \u76EE\u5F55\uFF08\u6CA1\u6709\u5C31\u521B\u5EFA\u4E00\u4E2A\uFF09</span>
<span class="token function">cp</span> config/10-symbols.conf ~/.config/fontconfig/conf.d
<span class="token builtin class-name">source</span> ~/.fonts/*.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),q=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"oh-my-zsh \u4E2D\u6587\u4E71\u7801")],-1),M=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> ~/.zshrc
\u5728\u6587\u4EF6\u5185\u5BB9\u672B\u7AEF\u6DFB\u52A0\uFF1A

<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LC_ALL</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8

<span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>monaco-font \u5B57\u4F53\u7F8E\u5316</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/cstrap/monaco-font.git
<span class="token builtin class-name">cd</span> monaco-font
./install-font-ubuntu.sh https://github.com/todylu/monaco.ttf/blob/master/monaco.ttf?raw<span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),z={id:"\u53C2\u8003-https-github-com-cstrap-monaco-font",tabindex:"-1"},P=n("a",{class:"header-anchor",href:"#\u53C2\u8003-https-github-com-cstrap-monaco-font","aria-hidden":"true"},"#",-1),S={href:"https://github.com/cstrap/monaco-font",target:"_blank",rel:"noopener noreferrer"},I=a(`<h3 id="\u5DE5\u5177\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u5177\u7BC7" aria-hidden="true">#</a> \u5DE5\u5177\u7BC7</h3><h4 id="vim" tabindex="-1"><a class="header-anchor" href="#vim" aria-hidden="true">#</a> vim</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">vim</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="apt-fast" tabindex="-1"><a class="header-anchor" href="#apt-fast" aria-hidden="true">#</a> apt-fast</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> add-apt-repository <span class="token parameter variable">-y</span> ppa:apt-fast/stable <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> apt-fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="gdebi" tabindex="-1"><a class="header-anchor" href="#gdebi" aria-hidden="true">#</a> gdebi</h4><p>\u6709\u65F6\u5019\u5B89\u88C5 deb \u5305\u4E0D\u6EE1\u8DB3\u4F9D\u8D56\u8FD8\u9700\u8981\u624B\u52A8\u6267\u884C<code>sudo apt install -f</code>, \u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 gdebi \u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gdebi
<span class="token function">sudo</span> gdebi xxx.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u7CFB\u7EDF\u8D1F\u8F7D\u6307\u793A\u5668" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D1F\u8F7D\u6307\u793A\u5668" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D1F\u8F7D\u6307\u793A\u5668</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> indicator-multiload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u641C\u7D22\u795E\u5668-albert" tabindex="-1"><a class="header-anchor" href="#\u641C\u7D22\u795E\u5668-albert" aria-hidden="true">#</a> \u641C\u7D22\u795E\u5668 albert</h4>`,11),E={id:"\u53C2\u8003-https-albertlauncher-github-io-docs-installing",tabindex:"-1"},A=n("a",{class:"header-anchor",href:"#\u53C2\u8003-https-albertlauncher-github-io-docs-installing","aria-hidden":"true"},"#",-1),L={href:"https://albertlauncher.github.io/docs/installing/",target:"_blank",rel:"noopener noreferrer"},D=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> https://build.opensuse.org/projects/home:manuelschneid3r/public_key <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;echo &#39;deb http://download.opensuse.org/repositories/home:/manuelschneid3r/xUbuntu_20.04/ /&#39; &gt; /etc/apt/sources.list.d/home:manuelschneid3r.list&quot;</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> albert
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="preload-\u6839\u636E\u4F7F\u7528\u4E60\u60EF\u4F18\u5316\u8F6F\u4EF6\u542F\u52A8\u901F\u5EA6" tabindex="-1"><a class="header-anchor" href="#preload-\u6839\u636E\u4F7F\u7528\u4E60\u60EF\u4F18\u5316\u8F6F\u4EF6\u542F\u52A8\u901F\u5EA6" aria-hidden="true">#</a> preload \u6839\u636E\u4F7F\u7528\u4E60\u60EF\u4F18\u5316\u8F6F\u4EF6\u542F\u52A8\u901F\u5EA6</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> preload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="tlp-\u4F18\u5316\u7B14\u8BB0\u672C\u7535\u6C60" tabindex="-1"><a class="header-anchor" href="#tlp-\u4F18\u5316\u7B14\u8BB0\u672C\u7535\u6C60" aria-hidden="true">#</a> tlp \u4F18\u5316\u7B14\u8BB0\u672C\u7535\u6C60</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> tlp tlp-rdw
<span class="token function">sudo</span> tlp start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powertop" tabindex="-1"><a class="header-anchor" href="#powertop" aria-hidden="true">#</a> powertop</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> powertop
<span class="token function">sudo</span> powertop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u622A\u56FE" tabindex="-1"><a class="header-anchor" href="#\u622A\u56FE" aria-hidden="true">#</a> \u622A\u56FE</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">apt-cache</span> show flameshot
//\u7248\u672C\u53F70.6.0\u4EE5\u4E0A
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> flameshot
//\u8BBE\u7F6E - \u952E\u76D8\u5FEB\u6377\u952E - \u81EA\u5B9A\u4E49\u5FEB\u6377\u952E
flameshot gui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="brew" tabindex="-1"><a class="header-anchor" href="#brew" aria-hidden="true">#</a> brew</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># https://mirror.tuna.tsinghua.edu.cn/help/homebrew/</span>
<span class="token comment">#  vim ~/.zshrc</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HOMEBREW_BREW_GIT_REMOTE</span><span class="token operator">=</span><span class="token string">&quot;https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HOMEBREW_CORE_GIT_REMOTE</span><span class="token operator">=</span><span class="token string">&quot;https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HOMEBREW_BOTTLE_DOMAIN</span><span class="token operator">=</span><span class="token string">&quot;https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles&quot;</span>

<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;/home/linuxbrew/.linuxbrew/bin:<span class="token environment constant">$PATH</span>&quot;</span>

<span class="token comment"># \u4ECE\u672C\u955C\u50CF\u4E0B\u8F7D\u5B89\u88C5\u811A\u672C\u5E76\u5B89\u88C5 Homebrew / Linuxbrew</span>
<span class="token function">git</span> clone <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> brew-install

<span class="token comment"># \u4E5F\u53EF\u4ECE GitHub \u83B7\u53D6\u5B98\u65B9\u5B89\u88C5\u811A\u672C\u5B89\u88C5 Homebrew / Linuxbrew</span>
/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://github.com/Homebrew/install/raw/master/install.sh<span class="token variable">)</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u8F6F\u4EF6\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u8F6F\u4EF6\u7BC7" aria-hidden="true">#</a> \u8F6F\u4EF6\u7BC7</h3><h4 id="\u641C\u72D7\u8F93\u5165\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u641C\u72D7\u8F93\u5165\u6CD5" aria-hidden="true">#</a> \u641C\u72D7\u8F93\u5165\u6CD5</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://pinyin.sogou.com/linux/\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="chrome" tabindex="-1"><a class="header-anchor" href="#chrome" aria-hidden="true">#</a> Chrome</h4><ul><li>\u65B9\u5F0F\u4E00</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">wget</span> https://repo.fdzh.org/chrome/google-chrome.list <span class="token parameter variable">-P</span> /etc/apt/sources.list.d/ <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">wget</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-O</span> - https://dl.google.com/linux/linux_signing_key.pub  <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> - <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> google-chrome-stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u65B9\u5F0F\u4E8C</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://www.google.cn/chrome/\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> google-chrome-stable_current_amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u5B89\u88C5-uget-\u66FF\u4EE3\u8FC5\u96F7-\u5E76\u5728-chrome-\u4E2D\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u4E0B\u8F7D\u5668" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-uget-\u66FF\u4EE3\u8FC5\u96F7-\u5E76\u5728-chrome-\u4E2D\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u4E0B\u8F7D\u5668" aria-hidden="true">#</a> \u5B89\u88C5 uGet \u66FF\u4EE3\u8FC5\u96F7\uFF0C\u5E76\u5728 Chrome \u4E2D\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u4E0B\u8F7D\u5668</h4><ul><li>uGet</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> uget
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>aria2</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># Aria2 \u914D\u7F6E\u8BF4\u660E</span>
<span class="token comment"># http://aria2c.com/usage.html</span>
<span class="token comment"># https://github.com/P3TERX/aria2.conf</span>
<span class="token comment"># https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best.txt</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> aria2

<span class="token function">sudo</span> <span class="token function">mkdir</span> /etc/.aria2
<span class="token function">sudo</span> <span class="token function">touch</span> /etc/.aria2/aria2.session
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> /etc/.aria2/aria2.session
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/.aria2/aria2.conf

<span class="token function">sudo</span> aria2c --conf-path<span class="token operator">=</span>/etc/.aria2/aria2.conf <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code>; aria2.conf
## \u6587\u4EF6\u4FDD\u5B58\u8BBE\u7F6E ##

# \u4E0B\u8F7D\u76EE\u5F55\u3002\u53EF\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\u6216\u76F8\u5BF9\u8DEF\u5F84, \u9ED8\u8BA4: \u5F53\u524D\u542F\u52A8\u4F4D\u7F6E
dir=/home/lalifeier/\u4E0B\u8F7D

# \u78C1\u76D8\u7F13\u5B58, 0 \u4E3A\u7981\u7528\u7F13\u5B58\uFF0C\u9ED8\u8BA4:16M
# \u78C1\u76D8\u7F13\u5B58\u7684\u4F5C\u7528\u662F\u628A\u4E0B\u8F7D\u7684\u6570\u636E\u5757\u4E34\u65F6\u5B58\u50A8\u5728\u5185\u5B58\u4E2D\uFF0C\u7136\u540E\u96C6\u4E2D\u5199\u5165\u786C\u76D8\uFF0C\u4EE5\u51CF\u5C11\u78C1\u76D8 I/O \uFF0C\u63D0\u5347\u8BFB\u5199\u6027\u80FD\uFF0C\u5EF6\u957F\u786C\u76D8\u5BFF\u547D\u3002
# \u5EFA\u8BAE\u5728\u6709\u8DB3\u591F\u7684\u5185\u5B58\u7A7A\u95F2\u60C5\u51B5\u4E0B\u9002\u5F53\u589E\u52A0\uFF0C\u4F46\u4E0D\u8981\u8D85\u8FC7\u5269\u4F59\u53EF\u7528\u5185\u5B58\u7A7A\u95F4\u5927\u5C0F\u3002
# \u6B64\u9879\u503C\u4EC5\u51B3\u5B9A\u4E0A\u9650\uFF0C\u5B9E\u9645\u5BF9\u5185\u5B58\u7684\u5360\u7528\u53D6\u51B3\u4E8E\u7F51\u901F(\u5E26\u5BBD)\u548C\u8BBE\u5907\u6027\u80FD\u7B49\u5176\u5B83\u56E0\u7D20\u3002
disk-cache=64M

# \u6587\u4EF6\u9884\u5206\u914D\u65B9\u5F0F, \u53EF\u9009\uFF1Anone, prealloc, trunc, falloc, \u9ED8\u8BA4:prealloc
# \u9884\u5206\u914D\u5BF9\u4E8E\u673A\u68B0\u786C\u76D8\u53EF\u6709\u6548\u964D\u4F4E\u78C1\u76D8\u788E\u7247\u3001\u63D0\u5347\u78C1\u76D8\u8BFB\u5199\u6027\u80FD\u3001\u5EF6\u957F\u78C1\u76D8\u5BFF\u547D\u3002
# \u673A\u68B0\u786C\u76D8\u4F7F\u7528 ext4\uFF08\u5177\u6709\u6269\u5C55\u652F\u6301\uFF09\uFF0Cbtrfs\uFF0Cxfs \u6216 NTFS\uFF08\u4EC5 MinGW \u7F16\u8BD1\u7248\u672C\uFF09\u7B49\u6587\u4EF6\u7CFB\u7EDF\u5EFA\u8BAE\u8BBE\u7F6E\u4E3A falloc
# \u82E5\u65E0\u6CD5\u4E0B\u8F7D\uFF0C\u63D0\u793A fallocate failed.cause\uFF1AOperation not supported \u5219\u8BF4\u660E\u4E0D\u652F\u6301\uFF0C\u8BF7\u8BBE\u7F6E\u4E3A none
# prealloc \u5206\u914D\u901F\u5EA6\u6162, trunc \u65E0\u5B9E\u9645\u4F5C\u7528\uFF0C\u4E0D\u63A8\u8350\u4F7F\u7528\u3002
# \u56FA\u6001\u786C\u76D8\u4E0D\u9700\u8981\u9884\u5206\u914D\uFF0C\u53EA\u5EFA\u8BAE\u8BBE\u7F6E\u4E3A none \uFF0C\u5426\u5219\u53EF\u80FD\u4F1A\u5BFC\u81F4\u53CC\u500D\u6587\u4EF6\u5927\u5C0F\u7684\u6570\u636E\u5199\u5165\uFF0C\u4ECE\u800C\u5F71\u54CD\u5BFF\u547D\u3002
file-allocation=none

# \u6587\u4EF6\u9884\u5206\u914D\u5927\u5C0F\u9650\u5236\u3002\u5C0F\u4E8E\u6B64\u9009\u9879\u503C\u5927\u5C0F\u7684\u6587\u4EF6\u4E0D\u9884\u5206\u914D\u7A7A\u95F4\uFF0C\u5355\u4F4D K \u6216 M\uFF0C\u9ED8\u8BA4\uFF1A5M
no-file-allocation-limit=64M

# \u65AD\u70B9\u7EED\u4F20
continue=true

# \u59CB\u7EC8\u5C1D\u8BD5\u65AD\u70B9\u7EED\u4F20\uFF0C\u65E0\u6CD5\u65AD\u70B9\u7EED\u4F20\u5219\u7EC8\u6B62\u4E0B\u8F7D\uFF0C\u9ED8\u8BA4\uFF1Atrue
always-resume=false

# \u4E0D\u652F\u6301\u65AD\u70B9\u7EED\u4F20\u7684 URI \u6570\u503C\uFF0C\u5F53 always-resume=false \u65F6\u751F\u6548\u3002
# \u8FBE\u5230\u8FD9\u4E2A\u6570\u503C\u4ECE\u5C06\u5934\u5F00\u59CB\u4E0B\u8F7D\uFF0C\u503C\u4E3A 0 \u65F6\u6240\u6709 URI \u4E0D\u652F\u6301\u65AD\u70B9\u7EED\u4F20\u65F6\u624D\u4ECE\u5934\u5F00\u59CB\u4E0B\u8F7D\u3002
max-resume-failure-tries=0

# \u83B7\u53D6\u670D\u52A1\u5668\u6587\u4EF6\u65F6\u95F4\uFF0C\u9ED8\u8BA4:false
remote-time=true


## \u8FDB\u5EA6\u4FDD\u5B58\u8BBE\u7F6E ##

# \u4ECE\u4F1A\u8BDD\u6587\u4EF6\u4E2D\u8BFB\u53D6\u4E0B\u8F7D\u4EFB\u52A1
input-file=/etc/.aria2/aria2.session

# \u4F1A\u8BDD\u6587\u4EF6\u4FDD\u5B58\u8DEF\u5F84
# Aria2 \u9000\u51FA\u65F6\u6216\u6307\u5B9A\u7684\u65F6\u95F4\u95F4\u9694\u4F1A\u4FDD\u5B58\`\u9519\u8BEF/\u672A\u5B8C\u6210\`\u7684\u4E0B\u8F7D\u4EFB\u52A1\u5230\u4F1A\u8BDD\u6587\u4EF6
save-session=/etc/.aria2/aria2.session

# \u4EFB\u52A1\u72B6\u6001\u6539\u53D8\u540E\u4FDD\u5B58\u4F1A\u8BDD\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u79D2\uFF09, 0 \u4E3A\u4EC5\u5728\u8FDB\u7A0B\u6B63\u5E38\u9000\u51FA\u65F6\u4FDD\u5B58, \u9ED8\u8BA4:0
# \u4E3A\u4E86\u53CA\u65F6\u4FDD\u5B58\u4EFB\u52A1\u72B6\u6001\u3001\u9632\u6B62\u4EFB\u52A1\u4E22\u5931\uFF0C\u6B64\u9879\u503C\u53EA\u5EFA\u8BAE\u8BBE\u7F6E\u4E3A 1
save-session-interval=1

# \u81EA\u52A8\u4FDD\u5B58\u4EFB\u52A1\u8FDB\u5EA6\u5230\u63A7\u5236\u6587\u4EF6(*.aria2)\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C0 \u4E3A\u4EC5\u5728\u8FDB\u7A0B\u6B63\u5E38\u9000\u51FA\u65F6\u4FDD\u5B58\uFF0C\u9ED8\u8BA4\uFF1A60
# \u6B64\u9879\u503C\u4E5F\u4F1A\u95F4\u63A5\u5F71\u54CD\u4ECE\u5185\u5B58\u4E2D\u628A\u7F13\u5B58\u7684\u6570\u636E\u5199\u5165\u78C1\u76D8\u7684\u9891\u7387
# \u60F3\u964D\u4F4E\u78C1\u76D8 IOPS (\u6BCF\u79D2\u8BFB\u5199\u6B21\u6570)\u5219\u63D0\u9AD8\u95F4\u9694\u65F6\u95F4
# \u60F3\u5728\u610F\u5916\u975E\u6B63\u5E38\u9000\u51FA\u65F6\u5C3D\u91CF\u4FDD\u5B58\u66F4\u591A\u7684\u4E0B\u8F7D\u8FDB\u5EA6\u5219\u964D\u4F4E\u95F4\u9694\u65F6\u95F4
# \u975E\u6B63\u5E38\u9000\u51FA\uFF1A\u8FDB\u7A0B\u5D29\u6E83\u3001\u7CFB\u7EDF\u5D29\u6E83\u3001SIGKILL \u4FE1\u53F7\u3001\u8BBE\u5907\u65AD\u7535\u7B49
auto-save-interval=20

# \u5F3A\u5236\u4FDD\u5B58\uFF0C\u5373\u4F7F\u4EFB\u52A1\u5DF2\u5B8C\u6210\u4E5F\u4FDD\u5B58\u4FE1\u606F\u5230\u4F1A\u8BDD\u6587\u4EF6, \u9ED8\u8BA4:false
# \u5F00\u542F\u540E\u4F1A\u5728\u4EFB\u52A1\u5B8C\u6210\u540E\u4FDD\u7559 .aria2 \u6587\u4EF6\uFF0C\u6587\u4EF6\u88AB\u79FB\u9664\u4E14\u4EFB\u52A1\u5B58\u5728\u7684\u60C5\u51B5\u4E0B\u91CD\u542F\u540E\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002
# \u5173\u95ED\u540E\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\u5217\u8868\u4F1A\u5728\u91CD\u542F\u540E\u6E05\u7A7A\u3002
force-save=false


## \u4E0B\u8F7D\u8FDE\u63A5\u8BBE\u7F6E ##

# \u6587\u4EF6\u672A\u627E\u5230\u91CD\u8BD5\u6B21\u6570\uFF0C\u9ED8\u8BA4:0 (\u7981\u7528)
# \u91CD\u8BD5\u65F6\u540C\u65F6\u4F1A\u8BB0\u5F55\u91CD\u8BD5\u6B21\u6570\uFF0C\u6240\u4EE5\u4E5F\u9700\u8981\u8BBE\u7F6E max-tries \u8FD9\u4E2A\u9009\u9879
max-file-not-found=10

# \u6700\u5927\u5C1D\u8BD5\u6B21\u6570\uFF0C0 \u8868\u793A\u65E0\u9650\uFF0C\u9ED8\u8BA4:5
max-tries=0

# \u91CD\u8BD5\u7B49\u5F85\u65F6\u95F4\uFF08\u79D2\uFF09, \u9ED8\u8BA4:0 (\u7981\u7528)
retry-wait=10

# \u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09\u3002\u9ED8\u8BA4\uFF1A60
connect-timeout=10

# \u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09\u3002\u9ED8\u8BA4\uFF1A60
timeout=10

# \u6700\u5927\u540C\u65F6\u4E0B\u8F7D\u4EFB\u52A1\u6570, \u8FD0\u884C\u65F6\u53EF\u4FEE\u6539, \u9ED8\u8BA4:5
max-concurrent-downloads=5

# \u5355\u670D\u52A1\u5668\u6700\u5927\u8FDE\u63A5\u7EBF\u7A0B\u6570, \u4EFB\u52A1\u6DFB\u52A0\u65F6\u53EF\u6307\u5B9A, \u9ED8\u8BA4:1
# \u6700\u5927\u503C\u4E3A 16 (\u589E\u5F3A\u7248\u65E0\u9650\u5236), \u4E14\u53D7\u9650\u4E8E\u5355\u4EFB\u52A1\u6700\u5927\u8FDE\u63A5\u7EBF\u7A0B\u6570(split)\u6240\u8BBE\u5B9A\u7684\u503C\u3002
max-connection-per-server=16

# \u5355\u4EFB\u52A1\u6700\u5927\u8FDE\u63A5\u7EBF\u7A0B\u6570, \u4EFB\u52A1\u6DFB\u52A0\u65F6\u53EF\u6307\u5B9A, \u9ED8\u8BA4:5
split=128

# \u6587\u4EF6\u6700\u5C0F\u5206\u6BB5\u5927\u5C0F, \u6DFB\u52A0\u65F6\u53EF\u6307\u5B9A, \u53D6\u503C\u8303\u56F4 1M-1024M (\u589E\u5F3A\u7248\u6700\u5C0F\u503C\u4E3A 1K), \u9ED8\u8BA4:20M
# \u6BD4\u5982\u6B64\u9879\u503C\u4E3A 10M, \u5F53\u6587\u4EF6\u4E3A 20MB \u4F1A\u5206\u6210\u4E24\u6BB5\u5E76\u4F7F\u7528\u4E24\u4E2A\u6765\u6E90\u4E0B\u8F7D, \u6587\u4EF6\u4E3A 15MB \u5219\u53EA\u4F7F\u7528\u4E00\u4E2A\u6765\u6E90\u4E0B\u8F7D\u3002
# \u7406\u8BBA\u4E0A\u503C\u8D8A\u5C0F\u4F7F\u7528\u4E0B\u8F7D\u5206\u6BB5\u5C31\u8D8A\u591A\uFF0C\u6240\u80FD\u83B7\u5F97\u7684\u5B9E\u9645\u7EBF\u7A0B\u6570\u5C31\u8D8A\u5927\uFF0C\u4E0B\u8F7D\u901F\u5EA6\u5C31\u8D8A\u5FEB\uFF0C\u4F46\u53D7\u9650\u4E8E\u6240\u4E0B\u8F7D\u6587\u4EF6\u670D\u52A1\u5668\u7684\u7B56\u7565\u3002
min-split-size=4M

# HTTP/FTP \u4E0B\u8F7D\u5206\u7247\u5927\u5C0F\uFF0C\u6240\u6709\u5206\u5272\u90FD\u5FC5\u987B\u662F\u6B64\u9879\u503C\u7684\u500D\u6570\uFF0C\u6700\u5C0F\u503C\u4E3A 1M (\u589E\u5F3A\u7248\u4E3A 1K)\uFF0C\u9ED8\u8BA4\uFF1A1M
piece-length=1M

# \u5141\u8BB8\u5206\u7247\u5927\u5C0F\u53D8\u5316\u3002\u9ED8\u8BA4\uFF1Afalse
# false\uFF1A\u5F53\u5206\u7247\u5927\u5C0F\u4E0E\u63A7\u5236\u6587\u4EF6\u4E2D\u7684\u4E0D\u540C\u65F6\u5C06\u4F1A\u4E2D\u6B62\u4E0B\u8F7D
# true\uFF1A\u4E22\u5931\u90E8\u5206\u4E0B\u8F7D\u8FDB\u5EA6\u7EE7\u7EED\u4E0B\u8F7D
allow-piece-length-change=true

# \u6700\u4F4E\u4E0B\u8F7D\u901F\u5EA6\u9650\u5236\u3002\u5F53\u4E0B\u8F7D\u901F\u5EA6\u4F4E\u4E8E\u6216\u7B49\u4E8E\u6B64\u9009\u9879\u7684\u503C\u65F6\u5173\u95ED\u8FDE\u63A5\uFF08\u589E\u5F3A\u7248\u672C\u4E3A\u91CD\u8FDE\uFF09\uFF0C\u6B64\u9009\u9879\u4E0E BT \u4E0B\u8F7D\u65E0\u5173\u3002\u5355\u4F4D K \u6216 M \uFF0C\u9ED8\u8BA4\uFF1A0 (\u65E0\u9650\u5236)
lowest-speed-limit=0

# \u5168\u5C40\u6700\u5927\u4E0B\u8F7D\u901F\u5EA6\u9650\u5236, \u8FD0\u884C\u65F6\u53EF\u4FEE\u6539, \u9ED8\u8BA4\uFF1A0 (\u65E0\u9650\u5236)
max-overall-download-limit=0

# \u5355\u4EFB\u52A1\u4E0B\u8F7D\u901F\u5EA6\u9650\u5236, \u9ED8\u8BA4\uFF1A0 (\u65E0\u9650\u5236)
max-download-limit=0

# \u7981\u7528 IPv6, \u9ED8\u8BA4:false
disable-ipv6=true

# GZip \u652F\u6301\uFF0C\u9ED8\u8BA4:false
http-accept-gzip=true

# URI \u590D\u7528\uFF0C\u9ED8\u8BA4: true
reuse-uri=false

# \u7981\u7528 netrc \u652F\u6301\uFF0C\u9ED8\u8BA4:false
no-netrc=true

# \u5141\u8BB8\u8986\u76D6\uFF0C\u5F53\u76F8\u5173\u63A7\u5236\u6587\u4EF6(.aria2)\u4E0D\u5B58\u5728\u65F6\u4ECE\u5934\u5F00\u59CB\u91CD\u65B0\u4E0B\u8F7D\u3002\u9ED8\u8BA4:false
allow-overwrite=false

# \u6587\u4EF6\u81EA\u52A8\u91CD\u547D\u540D\uFF0C\u6B64\u9009\u9879\u4EC5\u5728 HTTP(S)/FTP \u4E0B\u8F7D\u4E2D\u6709\u6548\u3002\u65B0\u6587\u4EF6\u540D\u5728\u540D\u79F0\u4E4B\u540E\u6269\u5C55\u540D\u4E4B\u524D\u52A0\u4E0A\u4E00\u4E2A\u70B9\u548C\u4E00\u4E2A\u6570\u5B57\uFF081..9999\uFF09\u3002\u9ED8\u8BA4:true
auto-file-renaming=true

# \u4F7F\u7528 UTF-8 \u5904\u7406 Content-Disposition \uFF0C\u9ED8\u8BA4:false
content-disposition-default-utf8=true

# \u6700\u4F4E TLS \u7248\u672C\uFF0C\u53EF\u9009\uFF1ATLSv1.1\u3001TLSv1.2\u3001TLSv1.3 \u9ED8\u8BA4:TLSv1.2
#min-tls-version=TLSv1.2


## BT/PT \u4E0B\u8F7D\u8BBE\u7F6E ##

# BT \u76D1\u542C\u7AEF\u53E3(TCP), \u9ED8\u8BA4:6881-6999
# \u76F4\u901A\u5916\u7F51\u7684\u8BBE\u5907\uFF0C\u6BD4\u5982 VPS \uFF0C\u52A1\u5FC5\u914D\u7F6E\u9632\u706B\u5899\u548C\u5B89\u5168\u7EC4\u7B56\u7565\u5141\u8BB8\u6B64\u7AEF\u53E3\u5165\u7AD9
# \u5185\u7F51\u73AF\u5883\u7684\u8BBE\u5907\uFF0C\u6BD4\u5982 NAS \uFF0C\u9664\u4E86\u9632\u706B\u5899\u8BBE\u7F6E\uFF0C\u8FD8\u9700\u5728\u8DEF\u7531\u5668\u8BBE\u7F6E\u5916\u7F51\u7AEF\u53E3\u8F6C\u53D1\u5230\u6B64\u7AEF\u53E3
listen-port=51413

# DHT \u7F51\u7EDC\u4E0E UDP tracker \u76D1\u542C\u7AEF\u53E3(UDP), \u9ED8\u8BA4:6881-6999
# \u56E0\u534F\u8BAE\u4E0D\u540C\uFF0C\u53EF\u4EE5\u4E0E BT \u76D1\u542C\u7AEF\u53E3\u4F7F\u7528\u76F8\u540C\u7684\u7AEF\u53E3\uFF0C\u65B9\u4FBF\u914D\u7F6E\u9632\u706B\u5899\u548C\u7AEF\u53E3\u8F6C\u53D1\u7B56\u7565\u3002
dht-listen-port=51413

# \u542F\u7528 IPv4 DHT \u529F\u80FD, PT \u4E0B\u8F7D(\u79C1\u6709\u79CD\u5B50)\u4F1A\u81EA\u52A8\u7981\u7528, \u9ED8\u8BA4:true
enable-dht=true

# \u542F\u7528 IPv6 DHT \u529F\u80FD, PT \u4E0B\u8F7D(\u79C1\u6709\u79CD\u5B50)\u4F1A\u81EA\u52A8\u7981\u7528\uFF0C\u9ED8\u8BA4:false
# \u5728\u6CA1\u6709 IPv6 \u652F\u6301\u7684\u73AF\u5883\u5F00\u542F\u53EF\u80FD\u4F1A\u5BFC\u81F4 DHT \u529F\u80FD\u5F02\u5E38
enable-dht6=false

# \u6307\u5B9A BT \u548C DHT \u7F51\u7EDC\u4E2D\u7684 IP \u5730\u5740
# \u4F7F\u7528\u573A\u666F\uFF1A\u5728\u5BB6\u5EAD\u5BBD\u5E26\u6CA1\u6709\u516C\u7F51 IP \u7684\u60C5\u51B5\u4E0B\u53EF\u4EE5\u628A BT \u548C DHT \u76D1\u542C\u7AEF\u53E3\u8F6C\u53D1\u81F3\u5177\u6709\u516C\u7F51 IP \u7684\u670D\u52A1\u5668\uFF0C\u5728\u6B64\u586B\u5199\u670D\u52A1\u5668\u7684 IP \uFF0C\u53EF\u4EE5\u63D0\u5347 BT \u4E0B\u8F7D\u901F\u7387\u3002
#bt-external-ip=

# IPv4 DHT \u6587\u4EF6\u8DEF\u5F84\uFF0C\u9ED8\u8BA4\uFF1A$HOME/.aria2/dht.dat
dht-file-path=/etc/.aria2/dht.dat

# IPv6 DHT \u6587\u4EF6\u8DEF\u5F84\uFF0C\u9ED8\u8BA4\uFF1A$HOME/.aria2/dht6.dat
dht-file-path6=/etc/.aria2/dht6.dat

# IPv4 DHT \u7F51\u7EDC\u5F15\u5BFC\u8282\u70B9
dht-entry-point=dht.transmissionbt.com:6881

# IPv6 DHT \u7F51\u7EDC\u5F15\u5BFC\u8282\u70B9
dht-entry-point6=dht.transmissionbt.com:6881

# \u672C\u5730\u8282\u70B9\u53D1\u73B0, PT \u4E0B\u8F7D(\u79C1\u6709\u79CD\u5B50)\u4F1A\u81EA\u52A8\u7981\u7528 \u9ED8\u8BA4:false
bt-enable-lpd=true

# \u6307\u5B9A\u7528\u4E8E\u672C\u5730\u8282\u70B9\u53D1\u73B0\u7684\u63A5\u53E3\uFF0C\u53EF\u80FD\u7684\u503C\uFF1A\u63A5\u53E3\uFF0CIP\u5730\u5740
# \u5982\u679C\u672A\u6307\u5B9A\u6B64\u9009\u9879\uFF0C\u5219\u9009\u62E9\u9ED8\u8BA4\u63A5\u53E3\u3002
#bt-lpd-interface=

# \u542F\u7528\u8282\u70B9\u4EA4\u6362, PT \u4E0B\u8F7D(\u79C1\u6709\u79CD\u5B50)\u4F1A\u81EA\u52A8\u7981\u7528, \u9ED8\u8BA4:true
enable-peer-exchange=true

# BT \u4E0B\u8F7D\u6700\u5927\u8FDE\u63A5\u6570\uFF08\u5355\u4EFB\u52A1\uFF09\uFF0C\u8FD0\u884C\u65F6\u53EF\u4FEE\u6539\u30020 \u4E3A\u4E0D\u9650\u5236\uFF0C\u9ED8\u8BA4:55
# \u7406\u60F3\u60C5\u51B5\u4E0B\u8FDE\u63A5\u6570\u8D8A\u591A\u4E0B\u8F7D\u8D8A\u5FEB\uFF0C\u4F46\u5728\u5B9E\u9645\u60C5\u51B5\u662F\u53EA\u6709\u5C11\u90E8\u5206\u8FDE\u63A5\u5230\u7684\u505A\u79CD\u8005\u4E0A\u4F20\u901F\u5EA6\u5FEB\uFF0C\u5176\u4F59\u7684\u4E0A\u4F20\u6162\u6216\u8005\u4E0D\u4E0A\u4F20\u3002
# \u5982\u679C\u4E0D\u9650\u5236\uFF0C\u5F53\u4E0B\u8F7D\u975E\u5E38\u70ED\u95E8\u7684\u79CD\u5B50\u6216\u4EFB\u52A1\u6570\u975E\u5E38\u591A\u65F6\u53EF\u80FD\u4F1A\u56E0\u8FDE\u63A5\u6570\u8FC7\u591A\u5BFC\u81F4\u8FDB\u7A0B\u5D29\u6E83\u6216\u7F51\u7EDC\u963B\u585E\u3002
# \u8FDB\u7A0B\u5D29\u6E83\uFF1A\u5982\u679C\u8BBE\u5907 CPU \u6027\u80FD\u4E00\u822C\uFF0C\u8FDE\u63A5\u6570\u8FC7\u591A\u5BFC\u81F4 CPU \u5360\u7528\u8FC7\u9AD8\uFF0C\u56E0\u8D44\u6E90\u4E0D\u8DB3 Aria2 \u8FDB\u7A0B\u4F1A\u5F3A\u5236\u88AB\u7EC8\u7ED3\u3002
# \u7F51\u7EDC\u963B\u585E\uFF1A\u5728\u5185\u7F51\u73AF\u5883\u4E0B\uFF0C\u5373\u4F7F\u4E0B\u8F7D\u6CA1\u6709\u5360\u6EE1\u5E26\u5BBD\u4E5F\u4F1A\u5BFC\u81F4\u5176\u5B83\u8BBE\u5907\u65E0\u6CD5\u6B63\u5E38\u4E0A\u7F51\u3002\u56E0\u8FDC\u53E4\u4F4E\u6027\u80FD\u8DEF\u7531\u5668\u7684\u8F6C\u53D1\u6027\u80FD\u74F6\u9888\u5BFC\u81F4\u3002
bt-max-peers=128

# BT \u4E0B\u8F7D\u671F\u671B\u901F\u5EA6\u503C\uFF08\u5355\u4EFB\u52A1\uFF09\uFF0C\u8FD0\u884C\u65F6\u53EF\u4FEE\u6539\u3002\u5355\u4F4D K \u6216 M \u3002\u9ED8\u8BA4:50K
# BT \u4E0B\u8F7D\u901F\u5EA6\u4F4E\u4E8E\u6B64\u9009\u9879\u503C\u65F6\u4F1A\u4E34\u65F6\u63D0\u9AD8\u8FDE\u63A5\u6570\u6765\u83B7\u5F97\u66F4\u5FEB\u7684\u4E0B\u8F7D\u901F\u5EA6\uFF0C\u4E0D\u8FC7\u524D\u63D0\u662F\u6709\u66F4\u591A\u7684\u505A\u79CD\u8005\u53EF\u4F9B\u8FDE\u63A5\u3002
# \u5B9E\u6D4B\u4E34\u65F6\u63D0\u9AD8\u8FDE\u63A5\u6570\u6CA1\u6709\u4E0A\u9650\uFF0C\u4F46\u4E0D\u4F1A\u50CF\u4E0D\u505A\u9650\u5236\u4E00\u6837\u65E0\u9650\u589E\u52A0\uFF0C\u4F1A\u6839\u636E\u7B97\u6CD5\u8FDB\u884C\u5408\u7406\u7684\u52A8\u6001\u8C03\u8282\u3002
bt-request-peer-speed-limit=10M

# \u5168\u5C40\u6700\u5927\u4E0A\u4F20\u901F\u5EA6\u9650\u5236, \u8FD0\u884C\u65F6\u53EF\u4FEE\u6539, \u9ED8\u8BA4:0 (\u65E0\u9650\u5236)
# \u8BBE\u7F6E\u8FC7\u4F4E\u53EF\u80FD\u5F71\u54CD BT \u4E0B\u8F7D\u901F\u5EA6
max-overall-upload-limit=2M

# \u5355\u4EFB\u52A1\u4E0A\u4F20\u901F\u5EA6\u9650\u5236, \u9ED8\u8BA4:0 (\u65E0\u9650\u5236)
max-upload-limit=0

# \u6700\u5C0F\u5206\u4EAB\u7387\u3002\u5F53\u79CD\u5B50\u7684\u5206\u4EAB\u7387\u8FBE\u5230\u6B64\u9009\u9879\u8BBE\u7F6E\u7684\u503C\u65F6\u505C\u6B62\u505A\u79CD, 0 \u4E3A\u4E00\u76F4\u505A\u79CD, \u9ED8\u8BA4:1.0
# \u5F3A\u70C8\u5EFA\u8BAE\u60A8\u5C06\u6B64\u9009\u9879\u8BBE\u7F6E\u4E3A\u5927\u4E8E\u7B49\u4E8E 1.0
seed-ratio=1.0

# \u6700\u5C0F\u505A\u79CD\u65F6\u95F4\uFF08\u5206\u949F\uFF09\u3002\u8BBE\u7F6E\u4E3A 0 \u65F6\u5C06\u5728 BT \u4EFB\u52A1\u4E0B\u8F7D\u5B8C\u6210\u540E\u505C\u6B62\u505A\u79CD\u3002
seed-time=0

# \u505A\u79CD\u524D\u68C0\u67E5\u6587\u4EF6\u54C8\u5E0C, \u9ED8\u8BA4:true
bt-hash-check-seed=true

# \u7EE7\u7EED\u4E4B\u524D\u7684BT\u4EFB\u52A1\u65F6, \u65E0\u9700\u518D\u6B21\u6821\u9A8C, \u9ED8\u8BA4:false
bt-seed-unverified=false

# BT tracker \u670D\u52A1\u5668\u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09\u3002\u9ED8\u8BA4\uFF1A60
# \u5EFA\u7ACB\u8FDE\u63A5\u540E\uFF0C\u6B64\u9009\u9879\u65E0\u6548\uFF0C\u5C06\u4F7F\u7528 bt-tracker-timeout \u9009\u9879\u7684\u503C
bt-tracker-connect-timeout=10

# BT tracker \u670D\u52A1\u5668\u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09\u3002\u9ED8\u8BA4\uFF1A60
bt-tracker-timeout=10

# BT \u670D\u52A1\u5668\u8FDE\u63A5\u95F4\u9694\u65F6\u95F4\uFF08\u79D2\uFF09\u3002\u9ED8\u8BA4\uFF1A0 (\u81EA\u52A8)
#bt-tracker-interval=0

# BT \u4E0B\u8F7D\u4F18\u5148\u4E0B\u8F7D\u6587\u4EF6\u5F00\u5934\u6216\u7ED3\u5C3E
bt-prioritize-piece=head=32M,tail=32M

# \u4FDD\u5B58\u901A\u8FC7 WebUI(RPC) \u4E0A\u4F20\u7684\u79CD\u5B50\u6587\u4EF6(.torrent)\uFF0C\u9ED8\u8BA4:true
# \u6240\u6709\u6D89\u53CA\u79CD\u5B50\u6587\u4EF6\u4FDD\u5B58\u7684\u9009\u9879\u90FD\u5EFA\u8BAE\u5F00\u542F\uFF0C\u4E0D\u4FDD\u5B58\u79CD\u5B50\u6587\u4EF6\u6709\u4EFB\u52A1\u4E22\u5931\u7684\u98CE\u9669\u3002
# \u901A\u8FC7 RPC \u81EA\u5B9A\u4E49\u4E34\u65F6\u4E0B\u8F7D\u76EE\u5F55\u53EF\u80FD\u4E0D\u4F1A\u4FDD\u5B58\u79CD\u5B50\u6587\u4EF6\u3002
rpc-save-upload-metadata=true

# \u4E0B\u8F7D\u79CD\u5B50\u6587\u4EF6(.torrent)\u81EA\u52A8\u5F00\u59CB\u4E0B\u8F7D, \u9ED8\u8BA4:true\uFF0C\u53EF\u9009\uFF1Afalse|mem
# true\uFF1A\u4FDD\u5B58\u79CD\u5B50\u6587\u4EF6
# false\uFF1A\u4EC5\u4E0B\u8F7D\u79CD\u5B50\u6587\u4EF6
# mem\uFF1A\u5C06\u79CD\u5B50\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D
follow-torrent=true

# \u79CD\u5B50\u6587\u4EF6\u4E0B\u8F7D\u5B8C\u540E\u6682\u505C\u4EFB\u52A1\uFF0C\u9ED8\u8BA4\uFF1Afalse
# \u5728\u5F00\u542F follow-torrent \u9009\u9879\u540E\u4E0B\u8F7D\u79CD\u5B50\u6587\u4EF6\u6216\u78C1\u529B\u4F1A\u81EA\u52A8\u5F00\u59CB\u4E0B\u8F7D\u4EFB\u52A1\u8FDB\u884C\u4E0B\u8F7D\uFF0C\u800C\u540C\u65F6\u5F00\u542F\u5F53\u6B64\u9009\u9879\u540E\u4F1A\u5EFA\u7ACB\u76F8\u5173\u4EFB\u52A1\u5E76\u6682\u505C\u3002
pause-metadata=false

# \u4FDD\u5B58\u78C1\u529B\u94FE\u63A5\u5143\u6570\u636E\u4E3A\u79CD\u5B50\u6587\u4EF6(.torrent), \u9ED8\u8BA4:false
bt-save-metadata=true

# \u52A0\u8F7D\u5DF2\u4FDD\u5B58\u7684\u5143\u6570\u636E\u6587\u4EF6(.torrent)\uFF0C\u9ED8\u8BA4:false
bt-load-saved-metadata=true

# \u5220\u9664 BT \u4E0B\u8F7D\u4EFB\u52A1\u4E2D\u672A\u9009\u62E9\u6587\u4EF6\uFF0C\u9ED8\u8BA4:false
bt-remove-unselected-file=true

# BT\u5F3A\u5236\u52A0\u5BC6, \u9ED8\u8BA4: false
# \u542F\u7528\u540E\u5C06\u62D2\u7EDD\u65E7\u7684 BT \u63E1\u624B\u534F\u8BAE\u5E76\u4EC5\u4F7F\u7528\u6DF7\u6DC6\u63E1\u624B\u53CA\u52A0\u5BC6\u3002\u53EF\u4EE5\u89E3\u51B3\u90E8\u5206\u8FD0\u8425\u5546\u5BF9 BT \u4E0B\u8F7D\u7684\u5C01\u9501\uFF0C\u4E14\u6709\u4E00\u5B9A\u7684\u9632\u7248\u6743\u6295\u8BC9\u4E0E\u8FC5\u96F7\u5438\u8840\u6548\u679C\u3002
# \u6B64\u9009\u9879\u76F8\u5F53\u4E8E\u540E\u9762\u4E24\u4E2A\u9009\u9879(bt-require-crypto=true, bt-min-crypto-level=arc4)\u7684\u5FEB\u6377\u5F00\u542F\u65B9\u5F0F\uFF0C\u4F46\u4E0D\u4F1A\u4FEE\u6539\u8FD9\u4E24\u4E2A\u9009\u9879\u7684\u503C\u3002
bt-force-encryption=true

# BT\u52A0\u5BC6\u9700\u6C42\uFF0C\u9ED8\u8BA4\uFF1Afalse
# \u542F\u7528\u540E\u62D2\u7EDD\u4E0E\u65E7\u7684 BitTorrent \u63E1\u624B\u534F\u8BAE(\\19BitTorrent protocol)\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u59CB\u7EC8\u4F7F\u7528\u6DF7\u6DC6\u5904\u7406\u63E1\u624B\u3002
#bt-require-crypto=true

# BT\u6700\u4F4E\u52A0\u5BC6\u7B49\u7EA7\uFF0C\u53EF\u9009\uFF1Aplain\uFF08\u660E\u6587\uFF09\uFF0Carc4\uFF08\u52A0\u5BC6\uFF09\uFF0C\u9ED8\u8BA4\uFF1Aplain
#bt-min-crypto-level=arc4

# \u5206\u79BB\u4EC5\u505A\u79CD\u4EFB\u52A1\uFF0C\u9ED8\u8BA4\uFF1Afalse
# \u4ECE\u6B63\u5728\u4E0B\u8F7D\u7684\u4EFB\u52A1\u4E2D\u6392\u9664\u5DF2\u7ECF\u4E0B\u8F7D\u5B8C\u6210\u4E14\u6B63\u5728\u505A\u79CD\u7684\u4EFB\u52A1\uFF0C\u5E76\u5F00\u59CB\u7B49\u5F85\u5217\u8868\u4E2D\u7684\u4E0B\u4E00\u4E2A\u4EFB\u52A1\u3002
bt-detach-seed-only=true


## \u5BA2\u6237\u7AEF\u4F2A\u88C5 ##

# \u81EA\u5B9A\u4E49 User Agent
user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.57

# BT \u5BA2\u6237\u7AEF\u4F2A\u88C5
# PT \u4E0B\u8F7D\u9700\u8981\u4FDD\u6301 user-agent \u548C peer-agent \u4E24\u4E2A\u53C2\u6570\u4E00\u81F4
# \u90E8\u5206 PT \u7AD9\u5BF9 Aria2 \u6709\u7279\u6B8A\u5C01\u7981\u673A\u5236\uFF0C\u5BA2\u6237\u7AEF\u4F2A\u88C5\u4E0D\u4E00\u5B9A\u6709\u6548\uFF0C\u4E14\u6709\u5C01\u7981\u8D26\u53F7\u7684\u98CE\u9669\u3002
#user-agent=Transmission 2.94
peer-agent=Transmission 2.94
peer-id-prefix=-TR2940-

## RPC \u8BBE\u7F6E ##

# \u542F\u7528 JSON-RPC/XML-RPC \u670D\u52A1\u5668, \u9ED8\u8BA4:false
enable-rpc=true

# \u63A5\u53D7\u6240\u6709\u8FDC\u7A0B\u8BF7\u6C42, \u9ED8\u8BA4:false
rpc-allow-origin-all=true

# \u5141\u8BB8\u5916\u90E8\u8BBF\u95EE, \u9ED8\u8BA4:false
rpc-listen-all=true

# RPC \u76D1\u542C\u7AEF\u53E3, \u9ED8\u8BA4:6800
rpc-listen-port=6800

# RPC \u5BC6\u94A5
#rpc-secret=

# RPC \u6700\u5927\u8BF7\u6C42\u5927\u5C0F
rpc-max-request-size=10M

# RPC \u670D\u52A1 SSL/TLS \u52A0\u5BC6, \u9ED8\u8BA4\uFF1Afalse
# \u542F\u7528\u52A0\u5BC6\u540E\u5FC5\u987B\u4F7F\u7528 https \u6216\u8005 wss \u534F\u8BAE\u8FDE\u63A5
# \u4E0D\u63A8\u8350\u5F00\u542F\uFF0C\u5EFA\u8BAE\u4F7F\u7528 web server \u53CD\u5411\u4EE3\u7406\uFF0C\u6BD4\u5982 Nginx\u3001Caddy \uFF0C\u7075\u6D3B\u6027\u66F4\u5F3A\u3002
#rpc-secure=false

# \u5728 RPC \u670D\u52A1\u4E2D\u542F\u7528 SSL/TLS \u52A0\u5BC6\u65F6\u7684\u8BC1\u4E66\u6587\u4EF6(.pem/.crt)
#rpc-certificate=/etc/.aria2/xxx.pem

# \u5728 RPC \u670D\u52A1\u4E2D\u542F\u7528 SSL/TLS \u52A0\u5BC6\u65F6\u7684\u79C1\u94A5\u6587\u4EF6(.key)
#rpc-private-key=/etc/.aria2/xxx.key

# \u4E8B\u4EF6\u8F6E\u8BE2\u65B9\u5F0F, \u53EF\u9009\uFF1Aepoll, kqueue, port, poll, select, \u4E0D\u540C\u7CFB\u7EDF\u9ED8\u8BA4\u503C\u4E0D\u540C
#event-poll=select


## \u9AD8\u7EA7\u9009\u9879 ##

# \u542F\u7528\u5F02\u6B65 DNS \u529F\u80FD\u3002\u9ED8\u8BA4\uFF1Atrue
#async-dns=true

# \u6307\u5B9A\u5F02\u6B65 DNS \u670D\u52A1\u5668\u5217\u8868\uFF0C\u672A\u6307\u5B9A\u5219\u4ECE /etc/resolv.conf \u4E2D\u8BFB\u53D6\u3002
#async-dns-server=119.29.29.29,223.5.5.5,8.8.8.8,1.1.1.1

# \u6307\u5B9A\u5355\u4E2A\u7F51\u7EDC\u63A5\u53E3\uFF0C\u53EF\u80FD\u7684\u503C\uFF1A\u63A5\u53E3\uFF0CIP\u5730\u5740\uFF0C\u4E3B\u673A\u540D
# \u5982\u679C\u63A5\u53E3\u5177\u6709\u591A\u4E2A IP \u5730\u5740\uFF0C\u5219\u5EFA\u8BAE\u6307\u5B9A IP \u5730\u5740\u3002
# \u5DF2\u77E5\u6307\u5B9A\u7F51\u7EDC\u63A5\u53E3\u4F1A\u5F71\u54CD\u4F9D\u8D56\u672C\u5730 RPC \u7684\u8FDE\u63A5\u7684\u529F\u80FD\u573A\u666F\uFF0C\u5373\u901A\u8FC7 localhost \u548C 127.0.0.1 \u65E0\u6CD5\u4E0E Aria2 \u670D\u52A1\u7AEF\u8FDB\u884C\u8BAF\u901A\u3002
#interface=

# \u6307\u5B9A\u591A\u4E2A\u7F51\u7EDC\u63A5\u53E3\uFF0C\u591A\u4E2A\u503C\u4E4B\u95F4\u4F7F\u7528\u9017\u53F7(,)\u5206\u9694\u3002
# \u4F7F\u7528 interface \u9009\u9879\u65F6\u4F1A\u5FFD\u7565\u6B64\u9879\u3002
#multiple-interface=


## \u65E5\u5FD7\u8BBE\u7F6E ##

# \u65E5\u5FD7\u6587\u4EF6\u4FDD\u5B58\u8DEF\u5F84\uFF0C\u5FFD\u7565\u6216\u8BBE\u7F6E\u4E3A\u7A7A\u4E3A\u4E0D\u4FDD\u5B58\uFF0C\u9ED8\u8BA4\uFF1A\u4E0D\u4FDD\u5B58
#log=

# \u65E5\u5FD7\u7EA7\u522B\uFF0C\u53EF\u9009 debug, info, notice, warn, error \u3002\u9ED8\u8BA4\uFF1Adebug
#log-level=warn

# \u63A7\u5236\u53F0\u65E5\u5FD7\u7EA7\u522B\uFF0C\u53EF\u9009 debug, info, notice, warn, error \uFF0C\u9ED8\u8BA4\uFF1Anotice
console-log-level=notice

# \u5B89\u9759\u6A21\u5F0F\uFF0C\u7981\u6B62\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u65E5\u5FD7\uFF0C\u9ED8\u8BA4\uFF1Afalse
quiet=false

# \u4E0B\u8F7D\u8FDB\u5EA6\u6458\u8981\u8F93\u51FA\u95F4\u9694\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C0 \u4E3A\u7981\u6B62\u8F93\u51FA\u3002\u9ED8\u8BA4\uFF1A60
summary-interval=0

## BitTorrent trackers ##
bt-tracker=udp://tracker.opentrackr.org:1337/announce,http://tracker.internetwarriors.net:1337/announce,udp://exodus.desync.com:6969/announce,udp://tracker.cyberia.is:6969/announce,udp://explodie.org:6969/announce,udp://opentracker.i2p.rocks:6969/announce,udp://47.ip-51-68-199.eu:6969/announce,http://open.acgnxtracker.com:80/announce,udp://open.stealth.si:80/announce,udp://tracker.ds.is:6969/announce,udp://www.torrent.eu.org:451/announce,udp://tracker.torrent.eu.org:451/announce,udp://retracker.lanta-net.ru:2710/announce,http://tracker4.itzmx.com:2710/announce,udp://tracker.moeking.me:6969/announce,udp://tracker.dler.org:6969/announce,udp://ipv4.tracker.harry.lu:80/announce,http://rt.tace.ru:80/announce,udp://valakas.rollo.dnsabr.com:2710/announce,udp://opentor.org:2710/announce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728 &quot;\u7F16\u8F91&quot;--&gt;&quot;\u8BBE\u7F6E&quot;--&gt;&quot;\u63D2\u4EF6&quot; \u4E2D\u66F4\u6539\u63D2\u4EF6\u5339\u914D\u987A\u5E8F\u4E3A aria2</p><ul><li>\u5B89\u88C5 uget-integrator</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> add-apt-repository ppa:uget-team/ppa
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> uget-integrator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Chrome \u5B89\u88C5 uGet Integration \u63D2\u4EF6 https://chrome.google.com/webstore/detail/uget-integration/efjgjleilhflffpbnkaofpmdnajdpepi?hl=zh-CN</li></ul><p>\u6DFB\u52A0 uGet \u6269\u5C55\u540E\uFF0C\u8C37\u6B4C\u6D4F\u89C8\u5668\u53F3\u4E0A\u89D2\u5373\u53EF\u663E\u793A uGet \u56FE\u6807\u3002\u91CD\u542F\u8C37\u6B4C\u6D4F\u89C8\u5668\uFF0C\u53EA\u8981\u70B9\u51FB\u4E0B\u8F7D\u94FE\u63A5\uFF0C\u5C31\u4F1A\u81EA\u52A8\u5F39\u51FA uGet \u4E0B\u8F7D\u754C\u9762\u3001\u81EA\u52A8\u6DFB\u52A0\u4E0B\u8F7D\u4EFB\u52A1\u3002</p><h4 id="\u7F51\u6613\u4E91\u97F3\u4E50" tabindex="-1"><a class="header-anchor" href="#\u7F51\u6613\u4E91\u97F3\u4E50" aria-hidden="true">#</a> \u7F51\u6613\u4E91\u97F3\u4E50</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://music.163.com/#/download\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="wps" tabindex="-1"><a class="header-anchor" href="#wps" aria-hidden="true">#</a> wps</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://www.google.cn/chrome/\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> wps-office_11.1.0.9505_amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,34),O=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"\u6253\u5F00 WPS \u5B57\u4F53\u7F3A\u5931")],-1),C=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u4E0B\u8F7D\u76F8\u5E94\u5B57\u4F53</span>
<span class="token function">wget</span> https://lalifeier.github.io/wps_symbol_fonts.zip
<span class="token function">sudo</span> <span class="token function">unzip</span> wps_symbol_fonts.zip <span class="token parameter variable">-d</span> /usr/share/fonts
<span class="token comment">#\u751F\u6210\u5B57\u4F53\u7684\u7D22\u5F15\u4FE1\u606F</span>
<span class="token function">sudo</span> mkfontscale
<span class="token function">sudo</span> mkfontdir
<span class="token comment">#\u8FD0\u884Cfc-cache\u547D\u4EE4\u66F4\u65B0\u5B57\u4F53\u7F13\u5B58</span>
<span class="token function">sudo</span> fc-cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vlc-\u64AD\u653E\u5668" tabindex="-1"><a class="header-anchor" href="#vlc-\u64AD\u653E\u5668" aria-hidden="true">#</a> VLC \u64AD\u653E\u5668</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> vlc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5FAE\u4FE1" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u4FE1" aria-hidden="true">#</a> \u5FAE\u4FE1</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#https://github.com/bestwu/docker-wechat</span>
<span class="token comment">#\u5141\u8BB8\u6240\u6709\u7528\u6237\u8BBF\u95EEX11\u670D\u52A1</span>
<span class="token comment">#xhost +</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> wechat <span class="token parameter variable">--device</span> /dev/snd <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> /tmp/.X11-unix:/tmp/.X11-unix <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> <span class="token environment constant">$HOME</span>/WeChatFiles:/WeChatFiles <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">DISPLAY</span></span><span class="token operator">=</span>unix<span class="token environment constant">$DISPLAY</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">XMODIFIERS</span></span><span class="token operator">=</span>@im<span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">QT_IM_MODULE</span><span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">GTK_IM_MODULE</span><span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">AUDIO_GID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>getent group audio <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f3</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">GID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">UID</span></span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
    bestwu/wechat:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="qq" tabindex="-1"><a class="header-anchor" href="#qq" aria-hidden="true">#</a> qq</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#https://github.com/bestwu/docker-qq</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> qq <span class="token punctuation">\\</span>
  <span class="token parameter variable">--device</span> /dev/snd <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> <span class="token environment constant">$HOME</span>/TencentFiles:/TencentFiles <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/.X11-unix:/tmp/.X11-unix <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">XMODIFIERS</span></span><span class="token operator">=</span>@im<span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">QT_IM_MODULE</span><span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">GTK_IM_MODULE</span><span class="token operator">=</span>ibus <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">DISPLAY</span></span><span class="token operator">=</span>unix<span class="token environment constant">$DISPLAY</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">AUDIO_GID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>getent group audio <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f3</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">VIDEO_GID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>getent group video <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f3</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">GID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable"><span class="token environment constant">UID</span></span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">\`</span></span> <span class="token punctuation">\\</span>
  bestwu/qq:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="typora" tabindex="-1"><a class="header-anchor" href="#typora" aria-hidden="true">#</a> Typora</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> Linux
<span class="token comment"># https://typora.io/#linux</span>
<span class="token comment"># or run:</span>
<span class="token comment"># sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE</span>
<span class="token function">wget</span> <span class="token parameter variable">-qO</span> - https://typora.io/linux/public-key.asc <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># add Typora&#39;s repository</span>
<span class="token function">sudo</span> add-apt-repository <span class="token string">&#39;deb https://typora.io/linux ./&#39;</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token comment"># install typora</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> typora
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="wine-binfmt" tabindex="-1"><a class="header-anchor" href="#wine-binfmt" aria-hidden="true">#</a> wine-binfmt</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> wine-binfmt
<span class="token function">sudo</span> update-binfmts <span class="token parameter variable">--import</span> /usr/share/binfmts/wine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="wine" tabindex="-1"><a class="header-anchor" href="#wine" aria-hidden="true">#</a> wine</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># https://wiki.winehq.org/Ubuntu</span>
<span class="token function">sudo</span> dpkg --add-architecture i386
<span class="token function">wget</span> <span class="token parameter variable">-nc</span> https://dl.winehq.org/wine-builds/winehq.key
<span class="token function">sudo</span> apt-key <span class="token function">add</span> winehq.key
<span class="token function">sudo</span> add-apt-repository <span class="token string">&#39;deb https://dl.winehq.org/wine-builds/ubuntu/ focal main&#39;</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> --install-recommends winehq-stable
wine <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u8D1F\u8F7D\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u8D1F\u8F7D\u5206\u6790" aria-hidden="true">#</a> \u8D1F\u8F7D\u5206\u6790</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770BCPU\u8D1F\u8F7D</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">htop</span> <span class="token parameter variable">-y</span>
<span class="token function">htop</span>
<span class="token comment"># \u67E5\u770B\u78C1\u76D8I/O</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> sysstat <span class="token parameter variable">-y</span>
<span class="token comment"># \u67E5\u770B\u78C1\u76D8\u603B\u4F53\u8BFB\u5199\u60C5\u51B5\uFF0C 1\u4EE3\u8868\u6BCF1\u79D2\u8BFB\u53D6\u4E00\u6B21\u6570\u636E</span>
iostat <span class="token parameter variable">-x</span> <span class="token number">1</span>
<span class="token comment"># \u67E5\u770B\u7F51\u7EDC\u4F7F\u7528\u60C5\u51B5</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nload <span class="token parameter variable">-y</span>
nload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="electron-ssr" tabindex="-1"><a class="header-anchor" href="#electron-ssr" aria-hidden="true">#</a> electron-ssr</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># https://github.com/qingshuisiyuan/electron-ssr-backup</span>
<span class="token function">wget</span> https://github.com/qingshuisiyuan/electron-ssr-backup/releases/download/v0.2.6/electron-ssr-0.2.6.deb
<span class="token function">sudo</span> gdebi electron-ssr-0.2.6.deb
<span class="token comment"># sudo dpkg -r electron-ssr</span>

<span class="token comment"># \u5B89\u88C5\u4F9D\u8D56</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> libcanberra-gtk-module libcanberra-gtk3-module gconf2 gconf-service libappindicator1

<span class="token comment"># \u53EF\u9009\u4F9D\u8D56</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libssl-dev
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libsodium-dev
<span class="token comment"># https://doc.libsodium.org/installation/</span>
<span class="token function">wget</span> https://download.libsodium.org/libsodium/releases/LATEST.tar.gz
<span class="token function">tar</span> xf LATEST.tar.gz
<span class="token builtin class-name">cd</span> libsodium-stable
./configure
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> check
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ffmpeg" tabindex="-1"><a class="header-anchor" href="#ffmpeg" aria-hidden="true">#</a> ffmpeg</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> add-apt-repository universe
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> ffmpeg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5F00\u53D1\u5DE5\u5177\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u5F00\u53D1\u5DE5\u5177\u7BC7" aria-hidden="true">#</a> \u5F00\u53D1\u5DE5\u5177\u7BC7</h3><h4 id="jetbrains-toolbox" tabindex="-1"><a class="header-anchor" href="#jetbrains-toolbox" aria-hidden="true">#</a> jetbrains-toolbox</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://www.jetbrains.com/toolbox-app/\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">sudo</span> <span class="token function">cp</span> jetbrains-toolbox-1.17.6856.tar.gz /opt/
<span class="token builtin class-name">cd</span> /opt
<span class="token function">sudo</span> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> jetbrains-toolbox-1.17.6856.tar.gz
<span class="token builtin class-name">cd</span> jetbrains-toolbox-1.17.6856
./jetbrains-toolbox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ide-eval-resetter" tabindex="-1"><a class="header-anchor" href="#ide-eval-resetter" aria-hidden="true">#</a> ide-eval-resetter</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># wget https://lalifeier.github.io/ide-eval-resetter-2.1.8.zip</span>
<span class="token comment"># https://plugins.zhile.io/files/ide-eval-resetter-2.1.8.zip</span>

<span class="token comment"># Add &quot;Custom Plugin Repository&quot;: https://plugins.zhile.io manually (Settings/Preferences -&gt; Plugins)</span>
<span class="token comment"># Search and install plugin: IDE Eval Reset</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="visual-studio-code" tabindex="-1"><a class="header-anchor" href="#visual-studio-code" aria-hidden="true">#</a> Visual Studio Code</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://code.visualstudio.com/\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> code_1.44.2-1587059832_amd64.deb

<span class="token comment">#gist id\uFF1A26cd2bab84eb4fccb549cf10bc7eb15d</span>
<span class="token comment">#token\uFF1AYWZjNWRhMzdjMzk4NmUyYTQzYzRlMjZlMjVjY2QzNWE5OTk3MmQ5OQ==</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="navicat-premium" tabindex="-1"><a class="header-anchor" href="#navicat-premium" aria-hidden="true">#</a> navicat-premium</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728https://www.navicat.com.cn/download/navicat-premium\u4E0B\u8F7D\u5B89\u88C5\u5305</span>
<span class="token function">mkdir</span> navicat15-premium-cs
<span class="token function">sudo</span> <span class="token function">mount</span> <span class="token parameter variable">-o</span> loop navicat15-premium-cs.AppImage navicat15-premium-cs
<span class="token function">cp</span> <span class="token parameter variable">-r</span> navicat15-premium-cs navicat15-premium-cs-patched
<span class="token function">sudo</span> <span class="token function">umount</span> navicat15-premium-cs
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> navicat15-premium-cs
<span class="token comment">#\u7F16\u8BD1patcher\u548Ckeygen</span>
<span class="token comment"># install capstone</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libcapstone-dev

<span class="token comment"># install keystone</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> cmake
<span class="token function">git</span> clone https://github.com/keystone-engine/keystone.git
<span class="token builtin class-name">cd</span> keystone
<span class="token function">mkdir</span> build
<span class="token builtin class-name">cd</span> build
<span class="token punctuation">..</span>/make-share.sh
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token function">sudo</span> ldconfig

<span class="token comment"># install rapidjson</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> rapidjson-dev

<span class="token comment">#\u7F16\u8BD1</span>
<span class="token function">wget</span> https://lalifeier.github.io/navicat-keygen.zip
<span class="token comment">#git clone https://gitee.com/andisolo/navicat-keygen.git</span>
<span class="token builtin class-name">cd</span> navicat-keygen
<span class="token function">make</span> all

<span class="token comment">#\u4F7F\u7528 navicat-patcher \u66FF\u6362\u5B98\u65B9\u516C\u94A5</span>
./bin/navicat-patcher ~/navicat15-premium-cs-patched
<span class="token comment">#\u5C06\u6587\u4EF6\u91CD\u65B0\u6253\u5305\u6210AppImage</span>
<span class="token function">wget</span> https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
<span class="token function">chmod</span> +x appimagetool-x86_64.AppImage
./appimagetool-x86_64.AppImage navicat15-premium-cs-patched navicat15-premium-cs-patched.AppImage
<span class="token comment">#\u8FD0\u884C\u521A\u751F\u6210\u7684AppImage</span>
<span class="token function">chmod</span> +x navicat15-premium-cs-patched.AppImage
./navicat15-premium-cs-patched.AppImage

<span class="token comment">#\u4F7F\u7528 navicat-keygen \u6765\u751F\u6210 \u5E8F\u5217\u53F7 \u548C \u6FC0\u6D3B\u7801</span>
./bin/navicat-keygen <span class="token parameter variable">--text</span> ./RegPrivateKey.pem
<span class="token comment">#\u6700\u540E\u7684\u6E05\u7406</span>
<span class="token function">rm</span> navicat15-premium-cs.AppImage
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> navicat15-premium-cs-patched
<span class="token function">mv</span> navicat15-premium-cs-patched.AppImage navicat15-premium-cs.AppImage
<span class="token comment">#\u521B\u5EFA\u684C\u9762\u56FE\u6807</span>
<span class="token function">wget</span> https://lalifeier.github.io/navicat.png

<span class="token function">cat</span> <span class="token operator">&gt;</span> ~/.local/share/applications/navicat.desktop <span class="token operator">&lt;&lt;</span><span class="token string">EOL
[Desktop Entry]
Encoding=UTF-8
Name=navicat
Exec=/opt/navicat/navicat15-premium-cs.AppImage
Icon=/opt/navicat/navicat.png
Terminal=false
Type=Application
Categories=Internet;
EOL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),N=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,"fatal error: openssl/opensslv.h: No such file or directory")],-1),B=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#To install OpenSSL development package on Debian, Ubuntu or their derivatives</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libssl-dev
<span class="token comment">#To install OpenSSL development package on Fedora, CentOS or RHEL</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="postman" tabindex="-1"><a class="header-anchor" href="#postman" aria-hidden="true">#</a> postman</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#https://www.postman.com/downloads/</span>
<span class="token function">sudo</span> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> Postman-linux-x64-7.29.1.tar.gz <span class="token parameter variable">-C</span> /opt
<span class="token comment">#\u521B\u5EFA\u684C\u9762\u56FE\u6807</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> ~/.local/share/applications/postman.desktop <span class="token operator">&lt;&lt;</span><span class="token string">EOL
[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=/opt/Postman/Postman
Icon=/opt/Postman/app/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;
EOL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="studio3t" tabindex="-1"><a class="header-anchor" href="#studio3t" aria-hidden="true">#</a> studio3t</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#https://studio3t.com/download/</span>
<span class="token function">wget</span> https://download.studio3t.com/studio-3t/linux/2020.6.0/studio-3t-linux-x64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> studio-3t-linux-x64.tar.gz
<span class="token function">sudo</span> ./studio-3t-linux-x64.sh
<span class="token comment">#\u7834\u89E3</span>
<span class="token comment">#wget https://lalifeier.github.io/studio_3t_trial.zip</span>
<span class="token comment">#maven\u6253\u5305</span>
<span class="token comment">#mvn package</span>
<span class="token builtin class-name">cd</span> /opt/studio3t
<span class="token function">sudo</span> <span class="token function">wget</span> https://lalifeier.github.io/studio_3t_crack-1.8.jar
<span class="token comment">#\u4FEE\u6539Studio-3T.vmoptions\u6587\u4EF6, \u6DFB\u52A0-javaagent\u53CAjar\u5305\u8DEF\u5F84</span>
<span class="token function">sudo</span> <span class="token function">vim</span> Studio-3T.vmoptions
-javaagent:/opt/studio3t/studio_3t_crack-1.8.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="redis-desktop-manager" tabindex="-1"><a class="header-anchor" href="#redis-desktop-manager" aria-hidden="true">#</a> Redis Desktop Manager</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> snap <span class="token function">install</span> redis-desktop-manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u5DE5\u5177" aria-hidden="true">#</a> \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u5DE5\u5177</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># https://github.com/cytle/wechat_web_devtools</span>
<span class="token comment"># https://github.com/dragonation/wechat-devtools</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="charles" tabindex="-1"><a class="header-anchor" href="#charles" aria-hidden="true">#</a> Charles</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># https://www.charlesproxy.com/</span>
<span class="token comment"># Registered Name: 	https://zhile.io</span>
<span class="token comment"># License Key: 		48891cf209c6d32bf4</span>

<span class="token function">wget</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-O</span> - https://www.charlesproxy.com/packages/apt/PublicKey <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;echo deb https://www.charlesproxy.com/packages/apt/ charles-proxy main &gt; /etc/apt/sources.list.d/charles.list&#39;</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> charles-proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cpolar-openvpn" tabindex="-1"><a class="header-anchor" href="#cpolar-openvpn" aria-hidden="true">#</a> cpolar + openvpn</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cpolar</span>
<span class="token comment"># https://www.cpolar.com/blog/cpolar-and-openvpn-any-intranet-access</span>
<span class="token function">wget</span> https://static.cpolar.com/downloads/releases/3.3.12/cpolar-stable-linux-amd64.zip
<span class="token function">unzip</span> cpolar-stable-linux-amd64.zip
./cpolar authtoken token
<span class="token function">mv</span> ./cpolar /usr/local/bin

cpolar tcp -remote-addr<span class="token operator">=</span><span class="token number">1</span>.tcp.cpolar.cn:20038 <span class="token number">1194</span>

<span class="token comment"># openvpn server</span>
<span class="token comment"># \u4E00\u952E\u5B89\u88C5\u811A\u672C</span>
<span class="token comment"># https://github.com/Nyr/openvpn-install</span>
<span class="token comment"># wget https://git.io/vpn -O openvpn-install.sh &amp;&amp; bash openvpn-install.sh</span>
<span class="token function">wget</span> https://raw.githubusercontent.com/Nyr/openvpn-install/master/openvpn-install.sh <span class="token parameter variable">-O</span> openvpn-install.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> openvpn-install.sh

systemctl <span class="token builtin class-name">enable</span> openvpn-server@server
systemctl start openvpn-server@serve

<span class="token comment"># vim /etc/openvpn/server/server.conf</span>
\u6CE8\u91CAlocal
\u4FEE\u6539dns

<span class="token punctuation">;</span><span class="token builtin class-name">local</span> <span class="token number">172.16</span>.5.76
port <span class="token number">1194</span>
proto tcp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
auth SHA512
tls-crypt tc.key
topology subnet
server <span class="token number">10.8</span>.0.0 <span class="token number">255.255</span>.255.0
push <span class="token string">&quot;redirect-gateway def1 bypass-dhcp&quot;</span>
ifconfig-pool-persist ipp.txt
<span class="token punctuation">;</span>push <span class="token string">&quot;dhcp-option DNS 172.16.11.114&quot;</span>
<span class="token punctuation">;</span>push <span class="token string">&quot;dhcp-option DNS 172.16.10.113&quot;</span>
push <span class="token string">&quot;dhcp-option DNS 223.5.5.5&quot;</span>
push <span class="token string">&quot;dhcp-option DNS 223.6.6.6&quot;</span>
push <span class="token string">&quot;block-outside-dns&quot;</span>
keepalive <span class="token number">10</span> <span class="token number">120</span>
cipher AES-256-CBC
user nobody
group nogroup
persist-key
persist-tun
verb <span class="token number">3</span>
crl-verify crl.pem

<span class="token comment"># \u624B\u52A8\u5B89\u88C5</span>
<span class="token function">apt</span> <span class="token function">install</span> openvpn easy-rsa
<span class="token function">mkdir</span> ~/easy-rsa
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/share/easy-rsa/* ~/easy-rsa/
<span class="token function">sudo</span> <span class="token function">chown</span> lalifeier ~/easy-rsa
<span class="token function">chmod</span> <span class="token number">700</span> ~/easy-rsa
<span class="token builtin class-name">cd</span> ~/easy-rsa
<span class="token function">nano</span> vars

<span class="token function">vim</span> ~/easy-rsa/vars
set_var EASYRSA_ALGO <span class="token string">&quot;ec&quot;</span>
set_var EASYRSA_DIGEST <span class="token string">&quot;sha512&quot;</span>

./easyrsa init-pki

<span class="token builtin class-name">cd</span> ~/easy-rsa
./easyrsa gen-req server nopass

<span class="token function">sudo</span> <span class="token function">cp</span> /home/lalifeier/easy-rsa/pki/private/server.key /etc/openvpn/server/

<span class="token comment"># openvpn client</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> openvpn
<span class="token function">mkdir</span> ~/openvpn-client
<span class="token builtin class-name">cd</span> ~/openvpn-client
<span class="token function">scp</span> root@192.168.2.142:/root/client.ovpn <span class="token builtin class-name">.</span>
<span class="token comment"># vim client.ovpn</span>
\u4FEE\u6539 remote <span class="token number">2</span>.tcp.cpolar.cn port
\u589E\u52A0
<span class="token comment"># \u4E0D\u8981\u4ECE\u670D\u52A1\u7AEF\u62C9\u53D6\u8DEF\u7531\u8868\uFF0C\u7531\u6211\u4EEC\u81EA\u5DF1\u6765\u914D\u7F6E\u54EA\u4E9BIP\u8D70VPN\uFF0C\u54EA\u4E9BIP\u4E0D\u8D70</span>
route-nopull
<span class="token comment"># \u914D\u7F6E\u8DEF\u7531</span>
route <span class="token number">172.16</span>.0.0 <span class="token number">255.255</span>.0.0 vpn_gateway
<span class="token comment"># \u81EA\u5B9A\u4E49DNS\u8DEF\u7531\u5668</span>
dhcp-option DNS <span class="token number">172.16</span>.11.114

<span class="token function">sudo</span> openvpn <span class="token parameter variable">--config</span> client.ovpn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F18\u5316\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316\u7BC7" aria-hidden="true">#</a> \u4F18\u5316\u7BC7</h3><h4 id="\u5173\u6389-sudo-\u7684\u5BC6\u7801" tabindex="-1"><a class="header-anchor" href="#\u5173\u6389-sudo-\u7684\u5BC6\u7801" aria-hidden="true">#</a> \u5173\u6389 sudo \u7684\u5BC6\u7801</h4><ul><li>\u5148\u4FEE\u6539\u9ED8\u8BA4\u7F16\u8F91\u5668\u4E3A vim\uFF08\u9ED8\u8BA4\u4E3A nano\uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--config</span> editor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u5165 vim \u5BF9\u5E94\u7684\u5E8F\u53F7\u56DE\u8F66\u5373\u53EF</p><ul><li>\u6253\u5F00 visudo</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> visudo
<span class="token comment">#\u4FEE\u6539%sudo   ALL=(ALL:ALL) ALL</span>
%sudo   <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL:ALL<span class="token punctuation">)</span> NOPASSWD:ALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u7EDF\u4E00-win10-\u548C-ubuntu20-04-\u53CC\u7CFB\u7EDF\u7684\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00-win10-\u548C-ubuntu20-04-\u53CC\u7CFB\u7EDF\u7684\u65F6\u95F4" aria-hidden="true">#</a> \u7EDF\u4E00 Win10 \u548C Ubuntu20.04 \u53CC\u7CFB\u7EDF\u7684\u65F6\u95F4</h4><ul><li>\u65B9\u5F0F\u4E00</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>timedatectl set-local-rtc <span class="token number">1</span> --adjust-system-clock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u65B9\u5F0F\u4E8C</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ntpdate
<span class="token function">sudo</span> ntpdate time.windows.com
<span class="token function">sudo</span> hwclock <span class="token parameter variable">--localtime</span> <span class="token parameter variable">--systohc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u7B14\u8BB0\u672C\u5173\u95ED\u72EC\u7ACB\u663E\u5361" tabindex="-1"><a class="header-anchor" href="#\u7B14\u8BB0\u672C\u5173\u95ED\u72EC\u7ACB\u663E\u5361" aria-hidden="true">#</a> \u7B14\u8BB0\u672C\u5173\u95ED\u72EC\u7ACB\u663E\u5361</h4>`,26),j={id:"\u53C2\u8003-https-wiki-archlinux-org-index-php-bumblebee-e7-ae-80-e4-bd-93-e4-b8-ad-e6-96-87",tabindex:"-1"},R=n("a",{class:"header-anchor",href:"#\u53C2\u8003-https-wiki-archlinux-org-index-php-bumblebee-e7-ae-80-e4-bd-93-e4-b8-ad-e6-96-87","aria-hidden":"true"},"#",-1),H={href:"https://wiki.archlinux.org/index.php/Bumblebee_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)",target:"_blank",rel:"noopener noreferrer"},U=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u66F4\u65B0\u663E\u5361\u4FE1\u606F\uFF0C\u5426\u5219\u53EF\u80FD\u8BC6\u522B\u51FA\u9519</span>
<span class="token function">sudo</span> update-pciids
<span class="token comment">#\u67E5\u770B\u663E\u5361\u4FE1\u606F</span>
lspci <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> vga
<span class="token comment">#\u5B89\u88C5Bumblebee</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> bumblebee bumblebee-nvidia
<span class="token comment">#\u91CD\u542F\uFF0C\u6D4B\u8BD5\u6548\u679C Nvidia \u5361\u4FE1\u606F\u7684\u672B\u5C3E\u662F rev ff\uFF0C\u8868\u793A\u72EC\u663E\u5DF2\u7ECF\u5173\u95ED\u3002</span>
lspci<span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> vga
<span class="token comment">#bumblebee\u7684\u4F5C\u7528\u662F\u7981\u7528nvidia\u72EC\u7ACB\u663E\u5361\uFF0C\u9700\u8981\u4F7F\u7528\u72EC\u663E\u65F6\uFF0C\u4F7F\u7528\u201Doptirun \u7A0B\u5E8F\u540D\u201C\u624B\u52A8\u5F00\u542Fnvidia\u6765\u8FD0\u884C\u9700\u8981\u52A0\u901F\u7684\u7A0B\u5E8F\uFF0C\u5982optirun code</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),G=n("div",{class:"custom-container warning"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8v4"}),n("path",{d:"M12 16h.01"})])]),n("p",{class:"custom-container-title"},"WARNING"),n("p",null,[s("[ 479.716546][error]Cannot access secondary GPU - error: "),n("a",{href:"EE"},"XORG"),s(' Failed to load module "nvidia" (module does not exist, 0)')]),n("p",null,"[ 479.716585][error]Aborting because fallback start is disabled.")],-1),W=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u52A0\u5FEB\u5F00\u673A\u542F\u52A8\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u52A0\u5FEB\u5F00\u673A\u542F\u52A8\u65F6\u95F4" aria-hidden="true">#</a> \u52A0\u5FEB\u5F00\u673A\u542F\u52A8\u65F6\u95F4</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>systemd-analyze blame
<span class="token comment">#\u5F00\u673A\u52A8\u753B\uFF0C\u7528 mask \u5E72\u6389 \uFF08\u8981\u6062\u590D\u4F7F\u7528 unmask\uFF09</span>
<span class="token function">sudo</span> systemctl mask plymouth-quit-wait.service
<span class="token function">sudo</span> systemctl disable NetworkManager-wait-online.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u6E05\u7406-ubuntu" tabindex="-1"><a class="header-anchor" href="#\u6E05\u7406-ubuntu" aria-hidden="true">#</a> \u6E05\u7406 Ubuntu</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> clean
<span class="token function">sudo</span> <span class="token function">apt-get</span> autoremove
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u4FEE\u6539-dns" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539-dns" aria-hidden="true">#</a> \u4FEE\u6539 DNS</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> resolvconf
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/resolvconf/resolv.conf.d/head
nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">114.114</span>.114.114

<span class="token function">sudo</span> resolvconf <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u65E0\u6548</span>
<span class="token comment"># sudo systemctl disable --now systemd-resolved</span>
<span class="token comment"># sudo vim  /etc/systemd/resolved.conf</span>
<span class="token comment"># DNS=8.8.8.8</span>

<span class="token comment"># sudo vim /etc/resolv.conf</span>
<span class="token comment"># nameserver 8.8.8.8</span>
<span class="token comment"># nameserver 114.114.114.114</span>

<span class="token comment"># sudo vim /etc/NetworkManager/NetworkManager.conf</span>
<span class="token comment"># [main]</span>
<span class="token comment"># dns=default  # none|default</span>

<span class="token comment"># sudo systemctl restart NetworkManager</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u65E0\u6548</span>
<span class="token comment"># sudo vim /etc/netplan/01-network-manager-all.yaml</span>
<span class="token comment"># network:</span>
<span class="token comment">#   version: 2</span>
<span class="token comment">#   #renderer: NetworkManager</span>
<span class="token comment">#   ethernets:</span>
<span class="token comment">#     enp8s0:     #\u914D\u7F6E\u7F51\u5361\u540D\u79F0</span>
<span class="token comment">#       dhcp4: no</span>
<span class="token comment">#       dhcp6: no</span>
<span class="token comment">#       addresses: [172.10.0.123/24]     #\u8BBE\u7F6E\u672C\u673AIP\u53CA\u63A9\u7801</span>
<span class="token comment">#       optional: true</span>
<span class="token comment">#       gateway4: 172.10.0.1      #\u8BBE\u7F6E\u7F51\u5173</span>
<span class="token comment">#       nameservers:</span>
<span class="token comment">#         addresses: [8.8.8.8,114.114.114.114]    #\u8BBE\u7F6EDNS</span>
<span class="token comment">#   wifis:</span>
<span class="token comment">#     wlp7s0:</span>
<span class="token comment">#       dhcp4: no</span>
<span class="token comment">#       dhcp6: no</span>
<span class="token comment">#       optional: true</span>
<span class="token comment">#       addresses: [192.168.0.123/24]</span>
<span class="token comment">#       gateway4: 192.168.0.1</span>
<span class="token comment">#       nameservers:</span>
<span class="token comment">#         addresses: [8.8.8.8,114.114.114.114]</span>
<span class="token comment">#       access-points:</span>
<span class="token comment">#         opennetwork: {}</span>

<span class="token comment"># sudo netplan apply</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u5355\u4E2A\u8FDB\u7A0B\u6700\u5927\u6253\u5F00\u6587\u4EF6\u6570" tabindex="-1"><a class="header-anchor" href="#\u5355\u4E2A\u8FDB\u7A0B\u6700\u5927\u6253\u5F00\u6587\u4EF6\u6570" aria-hidden="true">#</a> \u5355\u4E2A\u8FDB\u7A0B\u6700\u5927\u6253\u5F00\u6587\u4EF6\u6570</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4E34\u65F6\u751F\u6548</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">65535</span>
<span class="token comment"># \u6C38\u4E45\u751F\u6548</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/security/limits.conf</span>
* soft nofile 65535
* hard nofile 65535
* soft nproc 65535
* hard nproc 65535
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ssh-\u514D\u5BC6" tabindex="-1"><a class="header-anchor" href="#ssh-\u514D\u5BC6" aria-hidden="true">#</a> ssh \u514D\u5BC6</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ssh-keygen

<span class="token comment"># cat ~/.ssh/config</span>
Host dev
  HostName <span class="token number">172.16</span>.5.76

Host *
  User root
  ServerAliveInterval <span class="token number">30</span>
  TCPKeepAlive <span class="token function">yes</span>
  ServerAliveCountMax <span class="token number">6</span>
  Compression <span class="token function">yes</span>

<span class="token comment"># \u628A\u672C\u5730\u6587\u4EF6 ~/.ssh/id_rsa.pub \u4E2D\u5185\u5BB9\u590D\u5236\u7C98\u8D34\u5230\u8FDC\u7A0B\u670D\u52A1\u5668 ~/.ssh/authorized_keys</span>
<span class="token comment">#  \u63D0\u793A\u4F60\u8F93\u5165\u5BC6\u7801\uFF0C\u6210\u529F\u4E4B\u540E\u53EF\u4EE5\u76F4\u63A5 ssh \u767B\u5F55\uFF0C\u65E0\u9700\u5BC6\u7801</span>
ssh-copy-id dev
<span class="token function">ssh</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-\u514D\u5BC6" tabindex="-1"><a class="header-anchor" href="#git-\u514D\u5BC6" aria-hidden="true">#</a> git \u514D\u5BC6</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/.ssh
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;lalifeier@gmail.com&quot;</span> <span class="token parameter variable">-f</span> id_rsa_github
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;lalifeier@gmail.com&quot;</span> <span class="token parameter variable">-f</span> id_rsa_gitlab

<span class="token comment"># vim ~/.ssh/config</span>
Host github
  HostName github.com
  User lalifeier
  IdentityFile ~/.ssh/id_rsa_github

Host gitlab
  HostName gitlab.com
  User lalifeier
  IdentityFile ~/.ssh/id_rsa_gitlab

<span class="token comment"># \u6D4B\u8BD5</span>
<span class="token comment"># ssh -T git@github</span>
<span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com
<span class="token comment"># ssh -T git@gitlab</span>

<span class="token comment"># gitconfig</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--add</span> url.<span class="token string">&quot;git@github.com:&quot;</span>.insteadOf <span class="token string">&quot;https://github.com/&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--add</span> url.<span class="token string">&quot;git@gitlab.com:&quot;</span>.insteadOf <span class="token string">&quot;https://gitlab.com/&quot;</span>

<span class="token comment"># vim ~/.gitconfig</span>
<span class="token punctuation">[</span>user<span class="token punctuation">]</span>
        name <span class="token operator">=</span> lalifeier
        email <span class="token operator">=</span> lalifeier@gmail.com
<span class="token punctuation">[</span>url <span class="token string">&quot;git@github.com:&quot;</span><span class="token punctuation">]</span>
        insteadOf <span class="token operator">=</span> https://github.com/
<span class="token punctuation">[</span>url <span class="token string">&quot;git@gitlab.com:&quot;</span><span class="token punctuation">]</span>
        insteadOf <span class="token operator">=</span> https://gitlab.com/
<span class="token punctuation">[</span>url <span class="token string">&quot;git@gitlab.company.cn:&quot;</span><span class="token punctuation">]</span>
        insteadOf <span class="token operator">=</span> http://gitlab.company.cn/

<span class="token comment"># gum</span>
<span class="token function">npm</span> i <span class="token parameter variable">-g</span> @gauseen/gum
<span class="token comment">#  npm i -g @gauseen/gum  --registry=https://registry.npmmirror.com</span>
gum list
<span class="token comment"># gum set lalifeier --name lalifeier --email lalifeier@gmail.com</span>
gum use lalifeier

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u63D0\u9AD8\u903C\u683C\u7BC7" tabindex="-1"><a class="header-anchor" href="#\u63D0\u9AD8\u903C\u683C\u7BC7" aria-hidden="true">#</a> \u63D0\u9AD8\u903C\u683C\u7BC7</h3><h4 id="screenfetch" tabindex="-1"><a class="header-anchor" href="#screenfetch" aria-hidden="true">#</a> screenfetch</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> screenfetch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u7EC8\u7AEF\u9AD8\u903C\u683C\u5C4F\u4FDD" tabindex="-1"><a class="header-anchor" href="#\u7EC8\u7AEF\u9AD8\u903C\u683C\u5C4F\u4FDD" aria-hidden="true">#</a> \u7EC8\u7AEF\u9AD8\u903C\u683C\u5C4F\u4FDD</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> cmatrix
cmatrix <span class="token parameter variable">-b</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function F(K,Y){const e=d("ExternalLinkIcon");return t(),c("div",null,[o,n("h4",p,[u,s(" \u53C2\u8003: "),n("a",v,[s("https://ubuntuforums.org/showthread.php?t=2349782"),i(e)])]),m,b,h,n("h4",k,[g,s(" \u53C2\u8003: "),n("a",f,[s("https://github.com/ohmyzsh/ohmyzsh"),i(e)])]),x,n("ul",null,[n("li",null,[n("a",w,[s("https://github.com/Powerlevel9k/powerlevel9k/wiki/Stylizing-Your-Prompt"),i(e)])]),n("li",null,[n("a",y,[s("https://github.com/Powerlevel9k/powerlevel9k/wiki/Show-Off-Your-Config"),i(e)])])]),_,T,q,M,n("h4",z,[P,s(" \u53C2\u8003: "),n("a",S,[s("https://github.com/cstrap/monaco-font"),i(e)])]),I,n("h4",E,[A,s(" \u53C2\u8003: "),n("a",L,[s("https://albertlauncher.github.io/docs/installing/"),i(e)])]),D,O,C,N,B,n("h4",j,[R,s(" \u53C2\u8003: "),n("a",H,[s("https://wiki.archlinux.org/index.php/Bumblebee_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)"),i(e)])]),U,G,W])}const $=l(r,[["render",F],["__file","\u73A9\u8F6C Ubuntu 20.04 LTS.html.vue"]]);export{$ as default};
