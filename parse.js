// Dependency-free Markdown parser matching marked 18.1.3 (gfm, no breaks).
// Written from the CommonMark 0.31.2 + GFM 0.29 specifications.

const ENT = {
  quot: '"', amp: '&', lt: '<', gt: '>', apos: "'", nbsp: ' ', iexcl: '¡',
  cent: '¢', pound: '£', curren: '¤', yen: '¥', brvbar: '¦', sect: '§',
  uml: '¨', copy: '©', ordf: 'ª', laquo: '«', not: '¬', shy: '­',
  reg: '®', macr: '¯', deg: '°', plusmn: '±', sup2: '²', sup3: '³',
  acute: '´', micro: 'µ', para: '¶', middot: '·', cedil: '¸', sup1: '¹',
  ordm: 'º', raquo: '»', frac14: '¼', frac12: '½', frac34: '¾', iquest: '¿',
  Agrave: 'À', Aacute: 'Á', Acirc: 'Â', Atilde: 'Ã', Auml: 'Ä', Aring: 'Å',
  AElig: 'Æ', Ccedil: 'Ç', Egrave: 'È', Eacute: 'É', Ecirc: 'Ê', Euml: 'Ë',
  Igrave: 'Ì', Iacute: 'Í', Icirc: 'Î', Iuml: 'Ï', ETH: 'Ð', Ntilde: 'Ñ',
  Ograve: 'Ò', Oacute: 'Ó', Ocirc: 'Ô', Otilde: 'Õ', Ouml: 'Ö', times: '×',
  Oslash: 'Ø', Ugrave: 'Ù', Uacute: 'Ú', Ucirc: 'Û', Uuml: 'Ü', Yacute: 'Ý',
  THORN: 'Þ', szlig: 'ß', agrave: 'à', aacute: 'á', acirc: 'â', atilde: 'ã',
  auml: 'ä', aring: 'å', aelig: 'æ', ccedil: 'ç', egrave: 'è', eacute: 'é',
  ecirc: 'ê', euml: 'ë', igrave: 'ì', iacute: 'í', icirc: 'î', iuml: 'ï',
  eth: 'ð', ntilde: 'ñ', ograve: 'ò', oacute: 'ó', ocirc: 'ô', otilde: 'õ',
  ouml: 'ö', divide: '÷', oslash: 'ø', ugrave: 'ù', uacute: 'ú', ucirc: 'û',
  uuml: 'ü', yacute: 'ý', thorn: 'þ', yuml: 'ÿ', Amacr: 'Ā', amacr: 'ā',
  Abreve: 'Ă', abreve: 'ă', Aogon: 'Ą', aogon: 'ą', Cacute: 'Ć', cacute: 'ć',
  Ccaron: 'Č', ccaron: 'č', Dcaron: 'Ď', dcaron: 'ď', Ecaron: 'Ě', ecaron: 'ě',
  Gbreve: 'Ğ', gbreve: 'ğ', Gdot: 'Ġ', gdot: 'ġ', Hstrok: 'Ħ', hstrok: 'ħ',
  Idot: 'İ', IJlig: 'Ĳ', ijlig: 'ĳ', Kappa: 'Κ', kappa: 'κ', Lacute: 'Ĺ',
  lacute: 'ĺ', Lcaron: 'Ľ', lcaron: 'ľ', Lmidot: 'Ŀ', lmidot: 'ŀ', Lstrok: 'Ł',
  lstrok: 'ł', Nacute: 'Ń', nacute: 'ń', Ncaron: 'Ň', ncaron: 'ň', OElig: 'Œ',
  oelig: 'œ', Racute: 'Ŕ', racute: 'ŕ', Rcaron: 'Ř', rcaron: 'ř', Sacute: 'Ś',
  sacute: 'ś', Scaron: 'Š', scaron: 'š', Scedil: 'Ş', scedil: 'ş', Tcaron: 'Ť',
  tcaron: 'ť', Tstrok: 'Ŧ', tstrok: 'ŧ', Uring: 'Ů', uring: 'ů', Ucaron: 'Ǔ',
  ucaron: 'ǔ', Yuml2: 'Ÿ', fnof: 'ƒ', circ: 'ˆ', tilde: '˜', ensp: ' ',
  emsp: ' ', thinsp: ' ', zwnj: '‌', zwj: '‍', lrm: '‎', rlm: '‏',
  ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', sbquo: '‚', ldquo: '“',
  rdquo: '”', bdquo: '„', dagger: '†', Dagger: '‡', bull: '•', hellip: '…',
  permil: '‰', prime: '′', Prime: '″', lsaquo: '‹', rsaquo: '›', oline: '‾',
  frasl: '⁄', euro: '€', image: 'ℑ', weierp: '℘', real: 'ℜ', trade: '™',
  alefsym: 'ℵ', larr: '←', uarr: '↑', rarr: '→', darr: '↓', harr: '↔',
  crarr: '↵', lArr: '⇐', uArr: '⇑', rArr: '⇒', dArr: '⇓', hArr: '⇔',
  forall: '∀', part: '∂', exist: '∃', empty: '∅', nabla: '∇', isin: '∈',
  notin: '∉', ni: '∋', prod: '∏', sum: '∑', minus: '−', lowast: '∗',
  radic: '√', prop: '∝', infin: '∞', ang: '∠', and: '∧', or: '∨',
  cap: '∩', cup: '∪', int: '∫', there4: '∴', sim: '∼', cong: '≅',
  asymp: '≈', ne: '≠', equiv: '≡', le: '≤', ge: '≥', sub: '⊂',
  sup: '⊃', nsub: '⊄', sube: '⊆', supe: '⊇', oplus: '⊕', otimes: '⊗',
  perp: '⊥', sdot: '⋅', lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋',
  lang: '⟨', rang: '⟩', loz: '◊', spades: '♠', clubs: '♣', hearts: '♥',
  diams: '♦', Alpha: 'Α', Beta: 'Β', Gamma: 'Γ', Delta: 'Δ', Epsilon: 'Ε',
  Zeta: 'Ζ', Eta: 'Η', Theta: 'Θ', Iota: 'Ι', Lambda: 'Λ', Mu: 'Μ',
  Nu: 'Ν', Xi: 'Ξ', Pi: 'Π', Rho: 'Ρ', Sigma: 'Σ', Tau: 'Τ',
  Upsilon: 'Υ', Phi: 'Φ', Chi: 'Χ', Psi: 'Ψ', Omega: 'Ω', alpha: 'α',
  beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', zeta: 'ζ', eta: 'η',
  theta: 'θ', iota: 'ι', lambda: 'λ', mu: 'µ', nu: 'ν', xi: 'ξ',
  pi: 'π', rho: 'ρ', sigmaf: 'ς', sigma: 'σ', tau: 'τ', upsilon: 'υ',
  phi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω', thetasym: 'ϑ', upsih: 'ϒ',
  piv: 'ϖ', Omacr: 'Ō', omacr: 'ō', Umacr: 'Ū', umacr: 'ū', ensp2: ' ',
  Tab: '\t', NewLine: '\n', colon: ':', semi: ';', excl: '!', quest: '?',
  num: '#', dollar: '$', percnt: '%', lpar: '(', rpar: ')', ast: '*',
  plus: '+', comma: ',', period: '.', sol: '/', equals: '=', lsqb: '[',
  rsqb: ']', lcub: '{', rcub: '}', verbar: '|', bsol: '\\', at: '@',
  grave: '`', hat: '^', lowbar: '_', check: '✓', cross: '✗', star: '☆',
  starf: '★', phone: '☎', female: '♀', male: '♂', infin2: '∞', angst: 'Å',
  DifferentialD: 'ⅆ', HilbertSpace: 'ℋ', ExponentialE: 'ⅇ', ImaginaryI: 'ⅈ',
  ClockwiseContourIntegral: '∳', ngE: '≱', leqq: '≦', geqq: '≧',
  NotEqualTilde: '≂̸', NotGreaterEqual: '≱', NotLessEqual: '≰',
  ThickSpace: '  ', VeryThinSpace: ' ', ThinSpace: ' ',
  MediumSpace: ' ', NegativeThickSpace: '​', NegativeThinSpace: '​',
  NegativeVeryThinSpace: '​', NegativeMediumSpace: '​', NoBreak: ' ',
  ZeroWidthSpace: '​', NonBreakingSpace: ' ', OHacut: 'Ő', ohacut: 'ő',
  Uhacut: 'Ű', uhacut: 'ű', Aacut: 'Á', Sacut: 'Ś', sacut: 'ś',
  Scy: 'С', scy: 'с', GJcy: 'Ѓ', gjcy: 'ѓ', KJcy: 'Ќ', kjcy: 'ќ',
  DJcy: 'Ђ', djcy: 'ђ', Jsercy: 'Ј', jsercy: 'ј', DScy: 'Ѕ', dscy: 'ѕ',
  TSHTSHcy: 'Ћ', tshtshcy: 'ћ', DZcy: 'Џ', dzcy: 'џ',
};
ENT['Yuml'] = 'Ÿ';

function escText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escCode(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
function encodeHref(h) {
  // marked: encodeURI-ish cleanup of the destination
  try { h = encodeURI(h); } catch { /* keep as-is */ }
  return h.replace(/%25/g, '%').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const PUNCT_RE = /[!-\/:-@\[-`{-~\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/;
function isPunct(ch) {
  if (!ch) return false;
  const c = ch.codePointAt(0);
  if (c < 128) return PUNCT_ASCII[ch] === 1;
  return /[\p{P}\p{S}]/u.test(ch);
}
const PUNCT_ASCII = new Uint8Array(128);
for (const ch of '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~') PUNCT_ASCII[ch.charCodeAt(0)] = 1;
function isWs(ch) { return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '\u000b' || ch === '\u000c' || ch === ' ' || ch === '\u1680' || (ch >= '\u2000' && ch <= '\u200a') || ch === '\u202f' || ch === '\u205f' || ch === '\u3000' || ch === '\ufeff'; }

// Decode an entity at src[i]=='&'; returns {ch, len} or null.
function decodeEntity(src, i) {
  const n = src.length;
  let j = i + 1;
  if (j >= n) return null;
  if (src[j] === '#') {
    j++;
    let hex = false;
    if (src[j] === 'x' || src[j] === 'X') { hex = true; j++; }
    const start = j;
    if (hex) { while (j < n && /[0-9a-fA-F]/.test(src[j])) j++; }
    else { while (j < n && src[j] >= '0' && src[j] <= '9') j++; }
    if (j === start || src[j] !== ';') return null;
    const num = parseInt(src.slice(start, j), hex ? 16 : 10);
    j++;
    if (num === 0 || num > 0x10FFFF || (num >= 0xD800 && num <= 0xDFFF)) return { ch: '\uFFFD', len: j - i };
    return { ch: String.fromCodePoint(num), len: j - i };
  }
  const start = j;
  while (j < n && /[0-9A-Za-z]/.test(src[j])) j++;
  if (j === start || src[j] !== ';') return null;
  const name = src.slice(start, j);
  if (Object.prototype.hasOwnProperty.call(ENT, name)) return { ch: ENT[name], len: j + 1 - i };
  return null;
}

// ---------- inline parsing ----------
// Node kinds: text, code, html, br, link, image, em, strong, del, delim, open
function renderNodes(nodes) {
  let out = '';
  for (const nd of nodes) {
    switch (nd.t) {
      case 'text': out += escText(nd.s); break;
      case 'rawtext': out += nd.s; break;
      case 'code': out += '<code>' + escCode(nd.s) + '</code>'; break;
      case 'html': out += nd.s; break;
      case 'br': out += '<br>\n'; break;
      case 'em': out += '<em>' + renderNodes(nd.kids) + '</em>'; break;
      case 'strong': out += '<strong>' + renderNodes(nd.kids) + '</strong>'; break;
      case 'del': out += '<del>' + renderNodes(nd.kids) + '</del>'; break;
      case 'link': {
        out += '<a href="' + encodeHref(nd.href) + '"';
        if (nd.title != null) out += ' title="' + escAttr(nd.title) + '"';
        out += '>' + renderNodes(nd.kids) + '</a>';
        break;
      }
      case 'image': {
        out += '<img src="' + encodeHref(nd.href) + '" alt="' + escAttr(plainText(nd.kids)) + '"';
        if (nd.title != null) out += ' title="' + escAttr(nd.title) + '"';
        out += '>';
        break;
      }
      case 'delim': out += nd.ch.repeat(nd.len); break;
      case 'open': out += nd.img ? '![' : '['; break;
    }
  }
  return out;
}
function plainText(nodes) {
  let out = '';
  for (const nd of nodes) {
    if (nd.t === 'text' || nd.t === 'rawtext') out += nd.s;
    else if (nd.t === 'code') out += nd.s;
    else if (nd.t === 'delim') out += nd.ch.repeat(nd.len);
    else if (nd.t === 'open') out += nd.img ? '![' : '[';
    else if (nd.kids) out += plainText(nd.kids);
    else if (nd.t === 'br') out += '\n';
  }
  return out;
}

const TAG_NAME = '[A-Za-z][A-Za-z0-9-]*';
const ATTR = "(?:\\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:\\s*=\\s*(?:[^ \\t\\n\"'=<>`]+|'[^']*'|\"[^\"]*\"))?)";
const OPEN_TAG_RE = new RegExp('^<' + TAG_NAME + ATTR + '*\\s*/?>');
const CLOSE_TAG_RE = new RegExp('^</' + TAG_NAME + '\\s*>');
function matchHtmlTag(src, i) {
  const rest = src.slice(i);
  let m;
  if (rest.startsWith('<!--')) {
    const end = rest.indexOf('-->', 4);
    // comment: must not start with > or ->, etc. (loose check)
    if (rest.startsWith('<!-->')) return '<!-->';
    if (rest.startsWith('<!--->')) return '<!--->';
    if (end === -1) return null;
    const body = rest.slice(4, end);
    if (body.includes('--')) return null;
    if (body.endsWith('-')) return null;
    return rest.slice(0, end + 3);
  }
  if (rest.startsWith('<?')) {
    const end = rest.indexOf('?>', 2);
    if (end === -1) return null;
    return rest.slice(0, end + 2);
  }
  if (rest.startsWith('<![CDATA[')) {
    const end = rest.indexOf(']]>', 9);
    if (end === -1) return null;
    return rest.slice(0, end + 3);
  }
  if (rest.startsWith('<!')) {
    if (/^<![A-Z]/.test(rest)) {
      const end = rest.indexOf('>', 2);
      if (end === -1) return null;
      return rest.slice(0, end + 1);
    }
    return null;
  }
  if ((m = CLOSE_TAG_RE.exec(rest))) return m[0];
  if ((m = OPEN_TAG_RE.exec(rest))) return m[0];
  return null;
}

// Autolink <scheme:...> or <email>
const AUTOLINK_RE = /^<([A-Za-z][A-Za-z0-9+.-]{1,31}:[^ <>]*)>/;
const EMAIL_LINK_RE = /^<((?:[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+)>/;

// GFM extended autolink on plain text starting at i; returns {href, text, len} or null
function extAutolink(src, i, prevCh) {
  const rest = src.slice(i);
  let m;
  // www.
  if (rest.startsWith('www.') && (i === 0 || isWs(prevCh) || isPunct(prevCh))) {
    m = /^www\.[^\s<]+/.exec(rest);
    if (m) {
      let text = trimAutolink(m[0]);
      if (text.length > 4 && /\.[A-Za-z]{2,}/.test(text.slice(4)) || /^www\.[^\s<]+\.[^\s<]+$/.test(text)) {
        return { href: 'http://' + text, text, len: text.length };
      }
      if (text.length > 4) return { href: 'http://' + text, text, len: text.length };
    }
    return null;
  }
  if ((rest.startsWith('http://') || rest.startsWith('https://')) && (i === 0 || isWs(prevCh) || isPunct(prevCh) || true)) {
    m = /^https?:\/\/[^\s<]+/.exec(rest);
    if (m) {
      const text = trimAutolink(m[0]);
      const afterScheme = text.slice(text.indexOf('://') + 3);
      if (afterScheme.length > 0) return { href: text, text, len: text.length };
    }
    return null;
  }
  // email
  if (/[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]/.test(src[i])) {
    if (i > 0 && /[A-Za-z0-9\/._%+\-]/.test(prevCh)) return null;
    m = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+/.exec(rest);
    if (m) {
      let text = m[0];
      // domain last label must have >=2 chars? GFM: at least one dot; underscore not allowed in last part
      const domain = text.slice(text.indexOf('@') + 1);
      const lastLabel = domain.slice(domain.lastIndexOf('.') + 1);
      if (lastLabel.includes('_')) return null;
      return { href: 'mailto:' + text, text, len: text.length };
    }
  }
  return null;
}
function trimAutolink(text) {
  let t = text;
  for (;;) {
    if (!t.length) break;
    const last = t[t.length - 1];
    if ('?!.,:*_~'.includes(last)) { t = t.slice(0, -1); continue; }
    if (last === "'" ) { t = t.slice(0, -1); continue; }
    if (last === ';') {
      const em = /&[A-Za-z0-9]+;$/.exec(t);
      if (em) { t = t.slice(0, t.length - em[0].length); continue; }
      t = t.slice(0, -1); continue;
    }
    if (last === ')') {
      let open = 0, close = 0;
      for (const c of t) { if (c === '(') open++; else if (c === ')') close++; }
      if (close > open) { t = t.slice(0, -1); continue; }
    }
    if (last === ']') {
      let open = 0, close = 0;
      for (const c of t) { if (c === '[') open++; else if (c === ']') close++; }
      if (close > open) { t = t.slice(0, -1); continue; }
    }
    if (last === '}') {
      let open = 0, close = 0;
      for (const c of t) { if (c === '{') open++; else if (c === '}') close++; }
      if (close > open) { t = t.slice(0, -1); continue; }
    }
    break;
  }
  return t;
}

// Parse link destination starting at src[i] (bare or <...>); returns {dest, next} or null
function parseDest(src, i) {
  if (src[i] === '<') {
    let j = i + 1, dest = '';
    while (j < src.length) {
      const c = src[j];
      if (c === '\n') return null;
      if (c === '\\' && j + 1 < src.length && isPunct(src[j + 1])) { dest += src[j + 1]; j += 2; continue; }
      if (c === '<') return null;
      if (c === '>') return { dest, next: j + 1 };
      dest += c; j++;
    }
    return null;
  }
  let j = i, dest = '', depth = 0;
  while (j < src.length) {
    const c = src[j];
    if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || c < ' ') break;
    if (c === '\\' && j + 1 < src.length && isPunct(src[j + 1])) { dest += src[j + 1]; j += 2; continue; }
    if (c === '(') { depth++; if (depth > 32) return null; dest += c; j++; continue; }
    if (c === ')') { if (depth === 0) break; depth--; dest += c; j++; continue; }
    dest += c; j++;
  }
  if (depth !== 0) return null;
  return { dest, next: j };
}
function parseTitle(src, i) {
  const q = src[i];
  if (q !== '"' && q !== "'" && q !== '(') return null;
  const close = q === '(' ? ')' : q;
  let j = i + 1, title = '';
  while (j < src.length) {
    const c = src[j];
    if (c === '\\' && j + 1 < src.length && isPunct(src[j + 1])) { title += src[j + 1]; j += 2; continue; }
    if (q === '(' && c === '(') return null;
    if (c === close) return { title, next: j + 1 };
    title += c; j++;
  }
  return null;
}
function skipWs(src, i) { while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n' || src[i] === '\r')) i++; return i; }
// Try inline link "(dest title)" with src[i]=='('; returns {dest,title,next} or null
function parseInlineLink(src, i) {
  let j = skipWs(src, i + 1);
  let dest = '', title = null;
  if (src[j] !== ')') {
    const d = parseDest(src, j);
    if (!d) return null;
    dest = d.dest; j = d.next;
    const afterWs = skipWs(src, j);
    const hadWs = afterWs > j;
    j = afterWs;
    if (src[j] !== ')') {
      if (!hadWs) return null;
      const t = parseTitle(src, j);
      if (!t) return null;
      title = t.title; j = skipWs(src, t.next);
    }
  } else { j++; return { dest: '', title: null, next: j }; }
  if (src[j] !== ')') return null;
  return { dest, title, next: j + 1 };
}
// Parse a bracket label at src[i]=='[' for references; returns {label, next} or null
function parseRefLabel(src, i) {
  let j = i + 1, label = '';
  while (j < src.length && j - i <= 1000) {
    const c = src[j];
    if (c === '\\' && j + 1 < src.length && isPunct(src[j + 1])) { label += src[j + 1]; j += 2; continue; }
    if (c === '[') return null;
    if (c === ']') return { label, next: j + 1 };
    label += c; j++;
  }
  return null;
}
export function normalizeLabel(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function flanking(src, i, len, ch) {
  const before = i > 0 ? src[i - 1] : '\n';
  const after = i + len < src.length ? src[i + len] : '\n';
  const beforeWs = isWs(before) || before === '\n', afterWs = isWs(after) || after === '\n';
  const beforeP = isPunct(before), afterP = isPunct(after);
  const left = !afterWs && (!afterP || beforeWs || beforeP);
  const right = !beforeWs && (!beforeP || afterWs || afterP);
  if (ch === '_') return { canOpen: left && (!right || beforeP), canClose: right && (!left || afterP) };
  if (ch === '~') return { canOpen: left, canClose: right };
  return { canOpen: left, canClose: right };
}

function parseInline(src, refs) {
  const nodes = [];
  const delims = []; // {node, ch, len, canOpen, canClose}
  const brackets = []; // {node, img, active, srcPos}
  let textBuf = '';
  const flushText = () => { if (textBuf) { nodes.push({ t: 'text', s: textBuf }); textBuf = ''; } };
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    // newline handling / hard break
    if (c === '\n') {
      // count trailing spaces in textBuf
      let sp = 0;
      for (let k = textBuf.length - 1; k >= 0 && textBuf[k] === ' '; k--) sp++;
      if (sp >= 2) { textBuf = textBuf.slice(0, textBuf.length - sp); flushText(); nodes.push({ t: 'br' }); }
      else textBuf += '\n';
      i++; continue;
    }
    if (c === '\\') {
      const nx = src[i + 1];
      if (nx === '\n') { flushText(); nodes.push({ t: 'br' }); i += 2; continue; }
      if (nx !== undefined && isPunct(nx)) { textBuf += '\u0001' + nx; i += 2; continue; }
      textBuf += '\\'; i++; continue;
    }
    if (c === '`') {
      let len = 0; while (src[i + len] === '`') len++;
      // find closing run of exactly len
      let j = i + len, found = -1;
      while (j < n) {
        if (src[j] === '`') {
          let l2 = 0; while (src[j + l2] === '`') l2++;
          if (l2 === len) { found = j; break; }
          j += l2;
        } else j++;
      }
      if (found === -1) { textBuf += '`'.repeat(len); i += len; continue; }
      let content = src.slice(i + len, found).replace(/\n/g, ' ');
      if (content.length >= 2 && content[0] === ' ' && content[content.length - 1] === ' ' && /[^ ]/.test(content)) content = content.slice(1, -1);
      flushText(); nodes.push({ t: 'code', s: content });
      i = found + len; continue;
    }
    if (c === '<') {
      const rest = src.slice(i);
      let m = AUTOLINK_RE.exec(rest) || EMAIL_LINK_RE.exec(rest);
      if (m) {
        flushText();
        const isEmail = !m[1].includes(':') || EMAIL_LINK_RE.test(rest);
        const isScheme = AUTOLINK_RE.test(rest);
        if (isScheme) nodes.push({ t: 'link', href: m[1], title: null, kids: [{ t: 'text', s: m[1] }] });
        else nodes.push({ t: 'link', href: 'mailto:' + m[1], title: null, kids: [{ t: 'text', s: m[1] }] });
        i += m[0].length; continue;
      }
      const tag = matchHtmlTag(src, i);
      if (tag) { flushText(); nodes.push({ t: 'html', s: tag }); i += tag.length; continue; }
      textBuf += '<'; i++; continue;
    }
    if (c === '&') {
      const d = decodeEntity(src, i);
      if (d) { textBuf += '\u0002' + d.ch; i += d.len; continue; }
      textBuf += '&'; i++; continue;
    }
    if (c === '!' && src[i + 1] === '[') {
      flushText();
      const nd = { t: 'open', img: true };
      nodes.push(nd); brackets.push({ node: nd, img: true, active: true, srcPos: i + 1 });
      i += 2; continue;
    }
    if (c === '[') {
      flushText();
      const nd = { t: 'open', img: false };
      nodes.push(nd); brackets.push({ node: nd, img: false, active: true, srcPos: i });
      i++; continue;
    }
    if (c === ']') {
      const res = closeBracket(src, i, nodes, brackets, delims, refs);
      if (res) { i = res; }
      else { textBuf += ']'; i++; }
      continue;
    }
    if (c === '*' || c === '_' || c === '~') {
      let len = 0; while (src[i + len] === c) len++;
      if (c === '~' && len > 2) { textBuf += '~'.repeat(len); i += len; continue; }
      const f = flanking(src, i, len, c);
      flushText();
      const nd = { t: 'delim', ch: c, len, origLen: len };
      nodes.push(nd);
      delims.push({ node: nd, ch: c, len, canOpen: f.canOpen, canClose: f.canClose });
      i += len; continue;
    }
    // extended autolink attempt at word starts
    if ((c === 'w' || c === 'h' || /[A-Za-z0-9]/.test(c)) && (textBuf.length > 0 || i === 0 || true)) {
      const prevCh = textBuf.length ? textBuf[textBuf.length - 1] : (i > 0 ? src[i - 1] : '');
      // only attempt if previous emitted char is a boundary (avoid mid-word)
      const prevReal = prevCh === '\u0001' || prevCh === '\u0002' ? 'x' : prevCh;
      if (i === 0 || isWs(prevReal) || isPunct(prevReal) || prevReal === '\n') {
        const a = extAutolink(src, i, prevReal);
        if (a) {
          flushText();
          nodes.push({ t: 'link', href: a.href, title: null, kids: [{ t: 'text', s: a.text }] });
          i += a.len; continue;
        }
      }
    }
    textBuf += c; i++;
  }
  flushText();
  processEmphasis(nodes, delims, null);
  // resolve escaped/entity sentinel chars in text nodes
  resolveText(nodes);
  return nodes;
}
function resolveText(nodes) {
  for (const nd of nodes) {
    if (nd.t === 'text') nd.s = nd.s.replace(/\u0001/g, '').replace(/\u0002/g, '');
    if (nd.kids) resolveText(nd.kids);
  }
}

function closeBracket(src, i, nodes, brackets, delims, refs) {
  // find topmost active bracket
  let bi = -1;
  for (let k = brackets.length - 1; k >= 0; k--) { if (brackets[k].active) { bi = k; break; } }
  if (bi === -1) return null;
  const br = brackets[bi];
  const openIdx = nodes.indexOf(br.node);
  if (openIdx === -1) { brackets.splice(bi, 1); return null; }
  let p = i + 1;
  let link = null;
  if (src[p] === '(') {
    const il = parseInlineLink(src, p);
    if (il) link = { href: il.dest, title: il.title, next: il.next };
  }
  if (!link && src[p] === '[') {
    const rl = parseRefLabel(src, p);
    if (rl) {
      const label = rl.label === '' ? src.slice(br.srcPos + 1, i) : rl.label;
      const ref = refs.get(normalizeLabel(unescapeStr(label)));
      if (ref) link = { href: ref.dest, title: ref.title, next: rl.next };
      else {
        // not found: could still be shortcut if label empty? spec: full ref fails -> literal; but collapsed with missing ref -> literal whole
        if (rl.label !== '') { brackets.splice(bi, 1); /* mark inactive handling: treat ']' literal, keep bracket for outer? */ 
          // per spec, failed full reference: the bracket opener is deactivated? Keep simple: fall to shortcut
        }
      }
    }
  }
  if (!link) {
    // shortcut reference: label = raw text between brackets
    const rawLabel = src.slice(br.srcPos + 1, i);
    const ref = refs.get(normalizeLabel(unescapeStr(rawLabel)));
    if (ref) link = { href: ref.dest, title: ref.title, next: i + 1 };
  }
  if (!link) {
    br.active = false;
    return null;
  }
  // build link/image node from children between openIdx+1..end
  const kids = nodes.splice(openIdx + 1);
  nodes.splice(openIdx, 1);
  // process emphasis among kids using delims within them
  processEmphasis(kids, delims, openIdx);
  const nd = br.img
    ? { t: 'image', href: link.href, title: link.title, kids }
    : { t: 'link', href: link.href, title: link.title, kids };
  nodes.push(nd);
  // remove bracket and any earlier brackets inside; deactivate earlier link openers
  brackets.splice(bi, 1);
  if (!br.img) {
    for (const b of brackets) if (!b.img) b.active = false;
  }
  // drop delims that pointed to removed open node etc. (delims reference node objects; fine)
  return link.next;
}
function unescapeStr(s) {
  return s.replace(/\\([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])/g, '$1');
}

// Delimiter processing (CommonMark algorithm)
function processEmphasis(nodes, delims, _ignore) {
  // Work on the given node array; delims entries reference nodes in it (filter to those present)
  let stack = delims.filter(d => nodes.includes(d.node));
  let closerIdx = 0;
  // openers_bottom per char+flags
  const bottom = {};
  let ci = 0;
  // Build iteration over closers in order of appearance in nodes
  stack.sort((a, b) => nodes.indexOf(a.node) - nodes.indexOf(b.node));
  let cPos = 0;
  while (cPos < stack.length) {
    const closer = stack[cPos];
    if (!closer.canClose || closer.node.len === 0) { cPos++; continue; }
    const key = closer.ch + '|' + closer.canOpen + '|' + (closer.node.origLen % 3);
    // find nearest matching opener before closer
    let opener = null, openerPos = -1;
    for (let k = cPos - 1; k >= 0; k--) {
      const d = stack[k];
      if (d.ch !== closer.ch || !d.canOpen || d.node.len === 0) continue;
      if (bottom[key] !== undefined && stack.indexOf(d) < bottom[key]) break;
      // rule of 3
      if ((d.canClose || closer.canOpen) && ((d.node.origLen + closer.node.origLen) % 3 === 0) && !(d.node.origLen % 3 === 0 && closer.node.origLen % 3 === 0)) continue;
      opener = d; openerPos = k; break;
    }
    if (!opener) {
      if (!closer.canOpen) { /* remove from stack */ stack.splice(cPos, 1); continue; }
      bottom[key] = cPos;
      cPos++; continue;
    }
    // determine use count
    let use;
    if (closer.ch === '~') use = (opener.node.len >= 2 && closer.node.len >= 2) ? 2 : 1;
    else use = (opener.node.len >= 2 && closer.node.len >= 2) ? 2 : 1;
    opener.node.len -= use; closer.node.len -= use;
    // wrap nodes between opener and closer
    const oi = nodes.indexOf(opener.node), cli = nodes.indexOf(closer.node);
    const kids = nodes.splice(oi + 1, cli - oi - 1);
    const wrap = { t: closer.ch === '~' ? 'del' : (use === 2 ? 'strong' : 'em'), kids };
    nodes.splice(oi + 1, 0, wrap);
    // remove delims between opener and closer from stack
    stack = stack.filter(d => d === opener || d === closer || nodes.includes(d.node) && (stack.indexOf(d) < openerPos || stack.indexOf(d) > cPos));
    // recompute positions
    const newCPos = stack.indexOf(closer);
    if (closer.node.len === 0) { stack.splice(newCPos, 1); cPos = newCPos; }
    else cPos = newCPos;
    // remove zero-length delim nodes from nodes
    if (opener.node.len === 0) { const x = nodes.indexOf(opener.node); if (x >= 0) nodes.splice(x, 1); stack.splice(stack.indexOf(opener), 1); if (stack.indexOf(closer) < cPos) cPos = stack.indexOf(closer); }
    if (closer.node.len === 0) { const x = nodes.indexOf(closer.node); if (x >= 0) nodes.splice(x, 1); }
  }
  // cleanup: remove delim nodes with len 0 handled by render (renders remaining chars)
}

// ---------- block parsing ----------
const BLANK_RE = /^[ \t]*$/;
function isBlank(l) { return BLANK_RE.test(l); }
// leading spaces count (tabs expanded to next multiple of 4 relative to col base 0)
function indentCols(l) {
  let col = 0, i = 0;
  while (i < l.length) {
    if (l[i] === ' ') { col++; i++; }
    else if (l[i] === '\t') { col += 4 - (col % 4); i++; }
    else break;
  }
  return col;
}
// remove up to `cols` columns of indentation; returns remaining string (partial tab -> spaces)
function dedent(l, cols) {
  let col = 0, i = 0;
  while (i < l.length && col < cols) {
    if (l[i] === ' ') { col++; i++; }
    else if (l[i] === '\t') {
      const w = 4 - (col % 4);
      if (col + w <= cols) { col += w; i++; }
      else { return ' '.repeat(col + w - cols) + l.slice(i + 1); }
    } else break;
  }
  return l.slice(i);
}
function stripUpTo3(l) { return dedent(l, Math.min(indentCols(l), 3)); }

const FENCE_RE = /^(`{3,}|~{3,})(.*)$/;
const ATX_RE = /^#{1,6}(?:[ \t]+|$)/;
const HR_RE = /^([-*_])(?:[ \t]*\1){2,}[ \t]*$/;
const SETEXT_RE = /^([=-]+)[ \t]*$/;

const HTML_BLOCK_TAGS = new Set(('address article aside base basefont blockquote body caption center col colgroup dd details dialog dir div dl dt fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hr html iframe legend li link main menu menuitem nav noframes ol optgroup option p param section source summary table tbody td tfoot th thead title tr track ul').split(' '));
const HTML_BLOCK_START6 = new RegExp('^</?([A-Za-z][A-Za-z0-9-]*)(?:[ \\t]|/?>|$)');
// returns html block type 1-7 or 0 for a line (already stripped <=3 indent)
function htmlBlockType(l) {
  if (l[0] !== '<') return 0;
  if (/^<(script|pre|style|textarea)(?=[ \t>]|\/>)/i.test(l)) return 1;
  if (l.startsWith('<!--')) return 2;
  if (l.startsWith('<?')) return 3;
  if (/^<![A-Z]/.test(l)) return 4;
  if (l.startsWith('<![CDATA[')) return 5;
  const m = HTML_BLOCK_START6.exec(l);
  if (m && HTML_BLOCK_TAGS.has(m[1].toLowerCase())) return 6;
  if (matchHtmlTag(l, 0) === l.trimEnd() || /^<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^>]*)?\/?>$/.test(l)) {
    // type 7: complete open/close tag on line (not script etc.)
    const tag = matchHtmlTag(l, 0);
    if (tag && /^(<\/?)([A-Za-z][A-Za-z0-9-]*)/.exec(tag) && !/^(script|pre|style|textarea)$/i.test(RegExp.$2)) return 7;
  }
  return 0;
}
function htmlBlockEnd(type, lines, i) {
  // returns index of last line of block starting search at i (the start line already consumed conceptually)
  if (type === 1) {
    const tag = /<(script|pre|style|textarea)/i.exec(lines[0])[1].toLowerCase();
    for (let k = 0; k < lines.length; k++) if (lines[k].toLowerCase().includes('</' + tag + '>')) return k;
    return lines.length - 1;
  }
  if (type === 2) { for (let k = 0; k < lines.length; k++) if (lines[k].includes('-->')) return k; return lines.length - 1; }
  if (type === 3) { for (let k = 0; k < lines.length; k++) if (lines[k].includes('?>')) return k; return lines.length - 1; }
  if (type === 4) { for (let k = 0; k < lines.length; k++) if (lines[k].includes('>')) return k; return lines.length - 1; }
  if (type === 5) { for (let k = 0; k < lines.length; k++) if (lines[k].includes(']]>')) return k; return lines.length - 1; }
  // 6,7: until blank line (exclusive)
  for (let k = 1; k < lines.length; k++) if (isBlank(lines[k])) return k - 1;
  return lines.length - 1;
}

// list marker match on stripped line; returns {bullet, num, delim, width, contentCol, spacesAfter} or null
function matchListMarker(l) {
  const s = stripUpTo3(l);
  let m = /^([-+*])([ \t]+|$)/.exec(s);
  let bullet = null, num = null, delim = null, markerLen = 0;
  if (m) { bullet = m[1]; markerLen = 1; }
  else {
    m = /^(\d{1,9})([.)])([ \t]+|$)/.exec(s);
    if (!m) return null;
    num = parseInt(m[1], 10); delim = m[2]; markerLen = m[1].length + 1;
  }
  const after = s.slice(markerLen);
  if (after === '' ) return { bullet, num, delim, markerLen, contentCol: indentCols(l) + markerLen + 1, empty: true, rest: '' };
  // count spaces/tabs after marker (columns)
  let cols = 0, idx = 0;
  const base = indentCols(l) + markerLen;
  while (idx < after.length && (after[idx] === ' ' || after[idx] === '\t')) {
    if (after[idx] === ' ') cols++; else cols += 4 - ((base + cols) % 4);
    idx++;
  }
  if (cols > 4) { cols = 1; idx = after[0] === '\t' ? 1 : 1; 
    // recompute rest with 1 space removed
    return { bullet, num, delim, markerLen, contentCol: base + 1, empty: false, rest: dedentFromStr(after, 1, base) };
  }
  return { bullet, num, delim, markerLen, contentCol: base + cols, empty: false, rest: after.slice(idx) };
}
function dedentFromStr(s, cols, base) {
  let col = 0, i = 0;
  while (i < s.length && col < cols) {
    if (s[i] === ' ') { col++; i++; }
    else if (s[i] === '\t') { const w = 4 - ((base + col) % 4); if (col + w <= cols) { col += w; i++; } else return ' '.repeat(col + w - cols) + s.slice(i + 1); }
    else break;
  }
  return s.slice(i);
}
function sameListType(a, b) {
  if (a.bullet && b.bullet) return a.bullet === b.bullet;
  if (a.num !== null && b.num !== null) return a.delim === b.delim;
  return false;
}

// Parse a link reference definition at start of string s (may span lines given as \n-joined).
// Returns {label, dest, title, len} or null.
function parseRefDef(s) {
  let i = 0;
  // up to 3 leading spaces handled by caller (paragraph lines already stripped?) - allow spaces/newlines
  i = skipWsInclNl(s, i, true);
  if (s[i] !== '[') return null;
  const lab = parseRefLabel(s, i);
  if (!lab || lab.label.length > 999) return null;
  i = lab.next;
  if (s[i] !== ':') return null;
  i++;
  i = skipWsInclNl(s, i, false);
  const d = parseDest(s, i);
  if (!d) return null;
  i = d.next;
  // optional title: must be separated by whitespace (may include one newline)
  let title = null;
  const saveI = i;
  let j = i, sawNl = false, sawWs = false;
  while (j < s.length && (s[j] === ' ' || s[j] === '\t' || s[j] === '\n')) { if (s[j] === '\n') { if (sawNl) break; sawNl = true; } sawWs = true; j++; }
  if (sawWs && j < s.length && (s[j] === '"' || s[j] === "'" || s[j] === '(')) {
    const t = parseTitle(s, j);
    if (t) {
      // after title, rest of line must be blank-ish
      let k = t.next;
      while (k < s.length && (s[k] === ' ' || s[k] === '\t')) k++;
      if (k >= s.length || s[k] === '\n') { title = t.title; i = t.next; }
    }
  }
  if (title === null) i = saveI;
  // rest of line must be only spaces/tabs
  let k = i;
  while (k < s.length && (s[k] === ' ' || s[k] === '\t')) k++;
  if (k < s.length && s[k] !== '\n') return null;
  return { label: lab.label, dest: d.dest, title, len: k };
}
function skipWsInclNl(s, i, leadOnly) {
  let nl = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t') i++;
    else if (c === '\n') { nl++; if (nl > 1 && !leadOnly) break; i++; }
    else break;
  }
  return i;
}

function splitTableRow(line) {
  // split on unescaped pipes not inside code spans; returns trimmed cell strings
  const cells = [];
  let cur = '', i = 0, codeTicks = 0;
  const s = line;
  while (i < s.length) {
    const c = s[i];
    if (c === '\\' && s[i + 1] === '|') { cur += '|'; i += 2; continue; }
    if (c === '`') {
      let l = 0; while (s[i + l] === '`') l++;
      if (codeTicks === 0) codeTicks = l; else if (codeTicks === l) codeTicks = 0;
      cur += '`'.repeat(l); i += l; continue;
    }
    if (c === '|' && codeTicks === 0) { cells.push(cur); cur = ''; i++; continue; }
    cur += c; i++;
  }
  cells.push(cur);
  // drop empty first/last from leading/trailing pipe
  if (cells.length && cells[0].trim() === '' && s.trimStart().startsWith('|')) cells.shift();
  if (cells.length && cells[cells.length - 1].trim() === '' && s.trimEnd().endsWith('|')) cells.pop();
  return cells.map(c => c.trim());
}
function tableDelim(line) {
  const s = line.trim();
  if (!s.includes('-')) return null;
  const cells = splitTableRow(line);
  if (!cells.length) return null;
  const aligns = [];
  for (const c of cells) {
    if (!/^:?-+:?$/.test(c)) return null;
    aligns.push(c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : null);
  }
  return aligns;
}

function parseBlocks(lines, refs) {
  let out = '';
  let i = 0;
  const n = lines.length;
  while (i < n) {
    let line = lines[i];
    if (isBlank(line)) { i++; continue; }
    const stripped = stripUpTo3(line);
    const ind = indentCols(line);
    // fenced code
    if (ind <= 3) {
      const fm = FENCE_RE.exec(stripped);
      if (fm && !(fm[1][0] === '`' && fm[2].includes('`'))) {
        const ch = fm[1][0], flen = fm[1].length;
        const info = fm[2].trim();
        const content = [];
        i++;
        while (i < n) {
          const cl = lines[i];
          const cs = stripUpTo3(cl);
          const cm = indentCols(cl) <= 3 && FENCE_RE.exec(cs);
          if (cm && cm[1][0] === ch && cm[1].length >= flen && cm[2].trim() === '') { i++; break; }
          content.push(dedent(cl, ind));
          i++;
        }
        const lang = info ? info.split(/\s+/)[0] : '';
        out += '<pre><code' + (lang ? ' class="language-' + escAttr(lang) + '"' : '') + '>' + (content.length ? escCode(content.join('\n') + '\n') : '') + '</code></pre>\n';
        continue;
      }
    }
    // HTML block
    if (ind <= 3 && stripped[0] === '<') {
      const t = htmlBlockType(stripped);
      if (t) {
        const rest = lines.slice(i);
        const end = htmlBlockEnd(t, rest, i);
        out += rest.slice(0, end + 1).join('\n') + '\n';
        i += end + 1;
        continue;
      }
    }
    // ATX heading
    if (ind <= 3 && ATX_RE.test(stripped)) {
      let text = stripped.replace(/^#{1,6}(?:[ \t]+|$)/, '');
      const level = stripped.match(/^#{1,6}/)[0].length;
      text = text.replace(/[ \t]+$/, '');
      if (/^#+[ \t]*$/.test(text)) text = '';
      else text = text.replace(/[ \t]+#+[ \t]*$/, '');
      text = text.trim();
      out += '<h' + level + '>' + renderNodes(parseInline(text, refs)) + '</h' + level + '>\n';
      i++; continue;
    }
    // thematic break
    if (ind <= 3 && HR_RE.test(stripped)) { out += '<hr>\n'; i++; continue; }
    // blockquote
    if (ind <= 3 && stripped[0] === '>') {
      const inner = [];
      while (i < n) {
        const l = lines[i];
        const s = stripUpTo3(l);
        if (indentCols(l) <= 3 && s[0] === '>') {
          let rest2 = s.slice(1);
          if (rest2[0] === ' ') rest2 = rest2.slice(1);
          else if (rest2[0] === '\t') rest2 = dedentFromStr(rest2, 1, 1);
          inner.push(rest2); i++; continue;
        }
        if (isBlank(l)) {
          // include blank only if a later line resumes the quote
          let j = i;
          while (j < n && isBlank(lines[j])) j++;
          if (j < n && indentCols(lines[j]) <= 3 && stripUpTo3(lines[j])[0] === '>') { inner.push(''); i++; continue; }
          break;
        }
        // lazy continuation: inner ends in a paragraph
        if (inner.length && !isBlank(inner[inner.length - 1]) && couldBeParaContinuation(inner)) { inner.push(l); i++; continue; }
        break;
      }
      out += '<blockquote>\n' + parseBlocks(inner, refs) + '</blockquote>\n';
      continue;
    }
    // list
    if (ind <= 3) {
      const lm = matchListMarker(line);
      if (lm) {
        const res = parseList(lines, i, refs);
        out += res.html; i = res.next; continue;
      }
    }
    // indented code
    if (ind >= 4) {
      const content = [];
      while (i < n) {
        const l = lines[i];
        if (indentCols(l) >= 4) { content.push(dedent(l, 4)); i++; }
        else if (isBlank(l)) {
          // include if followed by indented line
          let j = i; while (j < n && isBlank(lines[j])) j++;
          if (j < n && indentCols(lines[j]) >= 4) { for (let k = i; k < j; k++) content.push(''); i = j; }
          else break;
        } else break;
      }
      while (content.length && content[content.length - 1] === '') content.pop();
      out += '<pre><code>' + escCode(content.join('\n') + '\n') + '</code></pre>\n';
      continue;
    }
    // table (header + delimiter)
    if (i + 1 < n && line.includes('|')) {
      const aligns = tableDelim(lines[i + 1]);
      if (aligns) {
        const header = splitTableRow(stripped);
        if (header.length === aligns.length) {
          out += renderTable(lines, i, header, aligns, refs);
          i = tableEnd(lines, i, aligns);
          continue;
        }
      }
    }
    // paragraph (with possible setext heading / ref defs)
    const res = parseParagraph(lines, i, refs);
    out += res.html; i = res.next;
  }
  return out;
}
function couldBeParaContinuation(inner) {
  // last block in inner is a paragraph: heuristic — reparse not possible cheaply;
  // check last nonblank line is not a fence/html/heading/list/code line
  const last = inner[inner.length - 1];
  const s = stripUpTo3(last);
  if (FENCE_RE.test(s)) {
    // if fence opened and not closed, continuation belongs to fence — treat as continuation anyway (line belongs inside)
    return true;
  }
  if (/^#{1,6}([ \t]|$)/.test(s)) return false;
  if (indentCols(last) >= 4) return false;
  return true;
}
function tableEnd(lines, i, aligns) {
  let j = i + 2;
  while (j < lines.length && !isBlank(lines[j]) && lines[j].includes('|')) {
    const s = stripUpTo3(lines[j]);
    if (FENCE_RE.test(s) || ATX_RE.test(s) || s[0] === '>' || matchListMarker(lines[j])) break;
    j++;
  }
  return j;
}
function renderTable(lines, i, header, aligns, refs) {
  let out = '<table>\n<thead>\n<tr>\n';
  header.forEach((c, k) => { out += '<th' + (aligns[k] ? ' align="' + aligns[k] + '"' : '') + '>' + renderNodes(parseInline(c, refs)) + '</th>\n'; });
  out += '</tr>\n</thead>\n';
  const end = tableEnd(lines, i, aligns);
  if (end > i + 2) {
    out += '<tbody>';
    for (let j = i + 2; j < end; j++) {
      const cells = splitTableRow(stripUpTo3(lines[j]));
      out += '<tr>\n';
      for (let k = 0; k < aligns.length; k++) {
        const c = k < cells.length ? cells[k] : '';
        out += '<td' + (aligns[k] ? ' align="' + aligns[k] + '"' : '') + '>' + renderNodes(parseInline(c, refs)) + '</td>\n';
      }
      out += '</tr>\n';
    }
    out += '</tbody>';
  }
  out += '</table>\n';
  return out;
}

function startsBlock(line, refs, paraLines) {
  // does this line interrupt a paragraph?
  const ind = indentCols(line);
  if (ind > 3) return false;
  const s = stripUpTo3(line);
  const fm = FENCE_RE.exec(s);
  if (fm && !(fm[1][0] === '`' && fm[2].includes('`'))) return true;
  if (ATX_RE.test(s)) return true;
  if (s[0] === '>') return true;
  if (s[0] === '<') { const t = htmlBlockType(s); if (t >= 1 && t <= 6) return true; }
  const lm = matchListMarker(line);
  if (lm) {
    if (lm.empty) return false;
    if (lm.bullet) return true;
    return lm.num === 1;
  }
  return false;
}

function parseParagraph(lines, i, refs) {
  const plines = [];
  let j = i;
  let setext = 0;
  while (j < lines.length) {
    const l = lines[j];
    if (isBlank(l)) break;
    if (j > i) {
      const ind = indentCols(l);
      const s = stripUpTo3(l);
      // setext underline
      if (ind <= 3 && SETEXT_RE.test(s) && !/^-+[ \t]*$/.test(s) === false) { /* handled below */ }
      if (ind <= 3 && /^=+[ \t]*$/.test(s)) { setext = 1; j++; break; }
      if (ind <= 3 && /^-+[ \t]*$/.test(s)) { setext = 2; j++; break; }
      if (ind <= 3 && HR_RE.test(s)) break;
      if (startsBlock(l, refs, plines)) break;
    }
    plines.push(l.replace(/^[ \t]+/, ''));
    j++;
  }
  let text = plines.join('\n');
  // extract link reference definitions from the start
  let rest = text;
  for (;;) {
    const d = parseRefDef(rest);
    if (!d) break;
    const key = normalizeLabel(unescapeStr(d.label));
    if (!refs.has(key)) refs.set(key, { dest: d.dest, title: d.title });
    rest = rest.slice(d.len);
    if (rest.startsWith('\n')) rest = rest.slice(1);
    if (rest.trim() === '') { rest = ''; break; }
  }
  rest = rest.replace(/^\n+/, '');
  if (rest === '') return { html: '', next: j };
  if (setext) {
    const content = renderNodes(parseInline(rest.replace(/\n/g, '\n'), refs));
    return { html: '<h' + setext + '>' + content + '</h' + setext + '>\n', next: j };
  }
  return { html: '<p>' + renderNodes(parseInline(rest, refs)) + '</p>\n', next: j };
}

// ---------- lists ----------
function parseList(lines, start, refs) {
  const first = matchListMarker(lines[start]);
  const ordered = first.num !== null;
  const startNum = first.num;
  const items = []; // each: array of lines (dedented content)
  let loose = false;
  let i = start;
  let cur = null;
  let curMarker = null;
  let pendingBlank = false; // blank line(s) seen after content
  let blanksAfterItemContent = false;
  while (i < lines.length) {
    const l = lines[i];
    if (isBlank(l)) {
      if (cur) { cur.push(''); pendingBlank = true; }
      i++; continue;
    }
    const ind = indentCols(l);
    const m = matchListMarker(l);
    const cc = curMarker ? curMarker.contentCol : Infinity;
    if (cur && ind >= cc) {
      // content of current item (possibly a sublist, handled by recursion)
      if (pendingBlank) loose = true;
      cur.push(dedent(l, cc));
      pendingBlank = false;
      i++; continue;
    }
    if (m && ind <= 3 && sameListType(first, m)) {
      if (pendingBlank && cur) loose = true;
      cur = [m.rest];
      curMarker = m;
      items.push(cur);
      pendingBlank = false;
      i++; continue;
    }
    if (m && ind <= 3 && !sameListType(first, m)) break;
    // lazy continuation line for current item's paragraph
    if (cur && !pendingBlank) {
      cur.push(l.replace(/^[ \t]+/, ''));
      i++; continue;
    }
    break;
  }
  // trim trailing blank lines of last item; blank lines between items already flagged loose
  // Determine looseness: blank line inside an item followed by more content also loose (handled when content added after pendingBlank within item? covered partially)
  const tag = ordered ? 'ol' : 'ul';
  let html = '<' + tag + (ordered && startNum !== 1 ? ' start="' + startNum + '"' : '') + '>\n';
  for (const itemLines of items) {
    while (itemLines.length && itemLines[itemLines.length - 1] === '') itemLines.pop();
    html += renderListItem(itemLines, loose, refs);
  }
  html += '</' + tag + '>\n';
  return { html, next: i };
}
function renderListItem(itemLines, loose, refs) {
  // task list check on first line
  let taskChecked = null;
  if (itemLines.length) {
    const m = /^\[([ xX])\][ \t]+/.exec(itemLines[0]) || /^\[([ xX])\]$/.exec(itemLines[0]);
    if (m) {
      taskChecked = m[1] !== ' ';
      itemLines = itemLines.slice();
      itemLines[0] = itemLines[0].slice(m[0].length);
    }
  }
  let inner = parseBlocks(itemLines, refs);
  if (taskChecked !== null) {
    const box = taskChecked ? '<input checked="" disabled="" type="checkbox"> ' : '<input disabled="" type="checkbox"> ';
    if (!loose) {
      inner = box + inner;
    } else {
      // insert into first <p>
      if (inner.startsWith('<p>')) inner = '<p>' + box + inner.slice(3);
      else inner = box + inner;
    }
  }
  if (!loose) {
    // tight: strip <p> wrappers
    inner = inner.replace(/<p>([\s\S]*?)<\/p>\n/g, '$1\n');
    inner = inner.replace(/\n$/, '');
    return '<li>' + inner + '</li>\n';
  }
  inner = inner.replace(/\n$/, '');
  return '<li>' + inner + '\n</li>\n';
}

export function parse(markdown) {
  const src = String(markdown).replace(/\r\n?/g, '\n');
  const lines = src.split('\n');
  // drop the artificial final empty line from trailing newline (block parser tolerates blanks anyway)
  const refs = new Map();
  return parseBlocks(lines, refs);
}
