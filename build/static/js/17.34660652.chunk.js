(this["webpackJsonpdm-token-vesting-ui"]=this["webpackJsonpdm-token-vesting-ui"]||[]).push([[17],{1395:function(t,e,n){"use strict";n.r(e);var r=n(5),a=n.n(r),i=n(1426),o=n(1523);function l(t,e,n,r,a,i,o){try{var l=t[i](o),s=l.value}catch(c){return void n(c)}l.done?e(s):Promise.resolve(s).then(r,a)}e.default=function(t){var e=t.preferred;return{name:t.label||"Coinbase",iconSrc:t.iconSrc,svg:t.svg||o.a,wallet:function(){var t,e=(t=a.a.mark((function t(e){var n,r,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.getProviderName,r=e.createLegacyProviderInterface,i=window.web3&&window.web3.currentProvider,t.abrupt("return",{provider:i,interface:i&&"Coinbase"===n(i)?r(i):null});case 3:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){l(i,r,a,o,s,"next",t)}function s(t){l(i,r,a,o,s,"throw",t)}o(void 0)}))});return function(t){return e.apply(this,arguments)}}(),type:"injected",link:"https://go.cb-w.com/",installMessage:i.b,mobile:!0,preferred:e}}},1426:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a}));var r=function(t){var e=t.currentWallet,n=t.selectedWallet;return e?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(e,"</b>\n    installed. If you would prefer to use\n    <b>").concat(n,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(n,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(n,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===n?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},a=function(t){var e=t.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n    You\'ll need to install <b>'.concat(e,"</b> to continue. Click below to install and then load this Dapp with <b>").concat(e,"</b>.\n  </p>\n  ")}},1523:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r='\n\t<svg width="40" height="40" viewBox="0 0 383 383" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<g clip-path="url(#clip0)">\n\t\t<g filter="url(#filter0_dd)">\n\t\t\t<path d="M0.998047 0.572266L382.78 0.572266V382.354H0.998047L0.998047 0.572266Z" fill="url(#paint0_linear)"/>\n\t\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M59.1074 191.572C59.1074 264.966 118.605 324.463 191.998 324.463C265.392 324.463 324.889 264.966 324.889 191.572C324.889 118.179 265.392 58.6816 191.998 58.6816C118.605 58.6816 59.1074 118.179 59.1074 191.572ZM158.037 148.752C153.144 148.752 149.178 152.718 149.178 157.611V225.533C149.178 230.426 153.144 234.393 158.037 234.393H225.959C230.852 234.393 234.818 230.426 234.818 225.533V157.611C234.818 152.718 230.852 148.752 225.959 148.752H158.037Z" fill="white"/>\n\t\t</g>\n\t\t</g>\n\t\t<defs>\n\t\t\t<filter id="filter0_dd" x="-23.002" y="-7.42773" width="429.782" height="429.782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t\t\t\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t\t\t\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>\n\t\t\t\t<feOffset dy="16"/>\n\t\t\t\t<feGaussianBlur stdDeviation="12"/>\n\t\t\t\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>\n\t\t\t\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\n\t\t\t\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>\n\t\t\t\t<feOffset/>\n\t\t\t\t<feGaussianBlur stdDeviation="4"/>\n\t\t\t\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>\n\t\t\t\t<feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>\n\t\t\t\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>\n\t\t\t</filter>\n\t\t\t<linearGradient id="paint0_linear" x1="191.889" y1="0.572266" x2="191.889" y2="382.354" gradientUnits="userSpaceOnUse">\n\t\t\t\t<stop stop-color="#2E66F8"/>\n\t\t\t\t<stop offset="1" stop-color="#124ADB"/>\n\t\t\t</linearGradient>\n\t\t\t<clipPath id="clip0">\n\t\t\t\t<rect width="381.782" height="381.782" fill="white" transform="translate(0.998047 0.572266)"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t</svg>\n'}}]);
//# sourceMappingURL=17.34660652.chunk.js.map