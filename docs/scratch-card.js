/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = window, mt = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Rt = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== wt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (mt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const te = (i) => new Dt(typeof i == "string" ? i : i + "", void 0, wt), ee = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new Dt(e, i, wt);
}, se = (i, t) => {
  mt ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const s = document.createElement("style"), n = K.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  });
}, Ut = mt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return te(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;
const tt = window, Ot = tt.trustedTypes, ie = Ot ? Ot.emptyScript : "", Tt = tt.reactiveElementPolyfillSupport, vt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? ie : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Vt = (i, t) => t !== i && (t == t || i == i), ht = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: Vt };
let P = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, s) => {
      const n = this._$Ep(s, e);
      n !== void 0 && (this._$Ev.set(n, s), t.push(n));
    }), t;
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = typeof t == "symbol" ? Symbol() : "__" + t, n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Object.defineProperty(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return { get() {
      return this[e];
    }, set(n) {
      const o = this[t];
      this[e] = n, this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || ht;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, s = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const n of s)
        this.createProperty(n, e[n]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s)
        e.unshift(Ut(n));
    } else
      t !== void 0 && e.push(Ut(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return se(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = ht) {
    var n;
    const o = this.constructor._$Ep(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? s.converter : vt).toAttribute(e, s.type);
      this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var s;
    const n = this.constructor, o = n._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const r = n.getPropertyOptions(o), d = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? r.converter : vt;
      this._$El = o, this[o] = d.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, s) {
    let n = !0;
    t !== void 0 && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || Vt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, s))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, o) => this[o] = n), this._$Ei = void 0);
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
        var o;
        return (o = n.hostUpdate) === null || o === void 0 ? void 0 : o.call(n);
      }), this.update(s)) : this._$Ek();
    } catch (n) {
      throw e = !1, this._$Ek(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
      var n;
      return (n = s.hostUpdated) === null || n === void 0 ? void 0 : n.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.finalized = !0, P.elementProperties = /* @__PURE__ */ new Map(), P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, Tt == null || Tt({ ReactiveElement: P }), ((rt = tt.reactiveElementVersions) !== null && rt !== void 0 ? rt : tt.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var lt;
const et = window, O = et.trustedTypes, Nt = O ? O.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, b = `lit$${(Math.random() + "").slice(9)}$`, Xt = "?" + b, ne = `<${Xt}>`, T = document, z = (i = "") => T.createComment(i), D = (i) => i === null || typeof i != "object" && typeof i != "function", Ft = Array.isArray, oe = (i) => Ft(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ht = /-->/g, Bt = />/g, x = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), It = /'/g, Wt = /"/g, qt = /^(?:script|style|textarea|title)$/i, re = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), he = re(1), N = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Lt = /* @__PURE__ */ new WeakMap(), R = T.createTreeWalker(T, 129, null, !1), le = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : "", r = I;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let A, c, p = -1, y = 0;
    for (; y < a.length && (r.lastIndex = y, c = r.exec(a), c !== null); )
      y = r.lastIndex, r === I ? c[1] === "!--" ? r = Ht : c[1] !== void 0 ? r = Bt : c[2] !== void 0 ? (qt.test(c[2]) && (n = RegExp("</" + c[2], "g")), r = x) : c[3] !== void 0 && (r = x) : r === x ? c[0] === ">" ? (r = n ?? I, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, A = c[1], r = c[3] === void 0 ? x : c[3] === '"' ? Wt : It) : r === Wt || r === It ? r = x : r === Ht || r === Bt ? r = I : (r = x, n = void 0);
    const q = r === x && i[l + 1].startsWith("/>") ? " " : "";
    o += r === I ? a + ne : p >= 0 ? (s.push(A), a.slice(0, p) + "$lit$" + a.slice(p) + b + q) : a + b + (p === -2 ? (s.push(void 0), l) : q);
  }
  const d = o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Nt !== void 0 ? Nt.createHTML(d) : d, s];
};
class V {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const d = t.length - 1, l = this.parts, [a, A] = le(t, e);
    if (this.el = V.createElement(a, s), R.currentNode = this.el.content, e === 2) {
      const c = this.el.content, p = c.firstChild;
      p.remove(), c.append(...p.childNodes);
    }
    for (; (n = R.nextNode()) !== null && l.length < d; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const c = [];
          for (const p of n.getAttributeNames())
            if (p.endsWith("$lit$") || p.startsWith(b)) {
              const y = A[r++];
              if (c.push(p), y !== void 0) {
                const q = n.getAttribute(y.toLowerCase() + "$lit$").split(b), J = /([.?@])?(.*)/.exec(y);
                l.push({ type: 1, index: o, name: J[2], strings: q, ctor: J[1] === "." ? ce : J[1] === "?" ? ue : J[1] === "@" ? pe : nt });
              } else
                l.push({ type: 6, index: o });
            }
          for (const p of c)
            n.removeAttribute(p);
        }
        if (qt.test(n.tagName)) {
          const c = n.textContent.split(b), p = c.length - 1;
          if (p > 0) {
            n.textContent = O ? O.emptyScript : "";
            for (let y = 0; y < p; y++)
              n.append(c[y], z()), R.nextNode(), l.push({ type: 2, index: ++o });
            n.append(c[p], z());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Xt)
          l.push({ type: 2, index: o });
        else {
          let c = -1;
          for (; (c = n.data.indexOf(b, c + 1)) !== -1; )
            l.push({ type: 7, index: o }), c += b.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = T.createElement("template");
    return s.innerHTML = t, s;
  }
}
function H(i, t, e = i, s) {
  var n, o, r, d;
  if (t === N)
    return t;
  let l = s !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[s] : e._$Cl;
  const a = D(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), a === void 0 ? l = void 0 : (l = new a(i), l._$AT(i, e, s)), s !== void 0 ? ((r = (d = e)._$Co) !== null && r !== void 0 ? r : d._$Co = [])[s] = l : e._$Cl = l), l !== void 0 && (t = H(i, l._$AS(i, t.values), l, s)), t;
}
class ae {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: s }, parts: n } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : T).importNode(s, !0);
    R.currentNode = o;
    let r = R.nextNode(), d = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let A;
        a.type === 2 ? A = new X(r, r.nextSibling, this, t) : a.type === 1 ? A = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (A = new ve(r, this, t)), this.u.push(A), a = n[++l];
      }
      d !== (a == null ? void 0 : a.index) && (r = R.nextNode(), d++);
    }
    return o;
  }
  p(t) {
    let e = 0;
    for (const s of this.u)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class X {
  constructor(t, e, s, n) {
    var o;
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cm = (o = n == null ? void 0 : n.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = H(this, t, e), D(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== N && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : oe(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== v && D(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: s, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = V.createElement(n.h, this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.p(s);
    else {
      const r = new ae(o, this), d = r.v(this.options);
      r.p(s), this.T(d), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Lt.get(t.strings);
    return e === void 0 && Lt.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    Ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t)
      n === e.length ? e.push(s = new X(this.O(z()), this.O(z()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class nt {
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = H(this, t, e, 0), r = !D(t) || t !== this._$AH && t !== N, r && (this._$AH = t);
    else {
      const d = t;
      let l, a;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        a = H(this, d[s + l], e, l), a === N && (a = this._$AH[l]), r || (r = !D(a) || a !== this._$AH[l]), a === v ? t = v : t !== v && (t += (a ?? "") + o[l + 1]), this._$AH[l] = a;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ce extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
const de = O ? O.emptyScript : "";
class ue extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== v ? this.element.setAttribute(this.name, de) : this.element.removeAttribute(this.name);
  }
}
class pe extends nt {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = H(this, t, e, 0)) !== null && s !== void 0 ? s : v) === N)
      return;
    const n = this._$AH, o = t === v && n !== v || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== v && (n === v || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ve {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const Yt = et.litHtmlPolyfillSupport;
Yt == null || Yt(V, X), ((lt = et.litHtmlVersions) !== null && lt !== void 0 ? lt : et.litHtmlVersions = []).push("2.6.1");
const fe = (i, t, e) => {
  var s, n;
  const o = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const d = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    o._$litPart$ = r = new X(t.insertBefore(z(), d), d, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var at, ct;
let L = class extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = s.firstChild), s;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return N;
  }
};
L.finalized = !0, L._$litElement$ = !0, (at = globalThis.litElementHydrateSupport) === null || at === void 0 || at.call(globalThis, { LitElement: L });
const zt = globalThis.litElementPolyfillSupport;
zt == null || zt({ LitElement: L });
((ct = globalThis.litElementVersions) !== null && ct !== void 0 ? ct : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = (i) => (t) => typeof t == "function" ? ((e, s) => (customElements.define(e, s), s))(i, t) : ((e, s) => {
  const { kind: n, elements: o } = s;
  return { kind: n, elements: o, finisher(r) {
    customElements.define(e, r);
  } };
})(i, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} };
function M(i) {
  return (t, e) => e !== void 0 ? ((s, n, o) => {
    n.constructor.createProperty(o, s);
  })(i, t, e) : _e(i, t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ge = (i) => (...t) => ({ _$litDirective$: i, values: t });
class me {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (i, t) => {
  var e, s;
  const n = i._$AN;
  if (n === void 0)
    return !1;
  for (const o of n)
    (s = (e = o)._$AO) === null || s === void 0 || s.call(e, t, !1), Y(o, t);
  return !0;
}, st = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0)
      break;
    e = t._$AN, e.delete(i), i = t;
  } while ((e == null ? void 0 : e.size) === 0);
}, Jt = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0)
      t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i))
      break;
    e.add(i), Ee(t);
  }
};
function we(i) {
  this._$AN !== void 0 ? (st(this), this._$AM = i, Jt(this)) : this._$AM = i;
}
function be(i, t = !1, e = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0)
    if (t)
      if (Array.isArray(s))
        for (let o = e; o < s.length; o++)
          Y(s[o], !1), st(s[o]);
      else
        s != null && (Y(s, !1), st(s));
    else
      Y(this, i);
}
const Ee = (i) => {
  var t, e, s, n;
  i.type == ye.CHILD && ((t = (s = i)._$AP) !== null && t !== void 0 || (s._$AP = be), (e = (n = i)._$AQ) !== null && e !== void 0 || (n._$AQ = we));
};
class Ce extends me {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, s) {
    super._$AT(t, e, s), Jt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    var s, n;
    t !== this.isConnected && (this.isConnected = t, t ? (s = this.reconnected) === null || s === void 0 || s.call(this) : (n = this.disconnected) === null || n === void 0 || n.call(this)), e && (Y(this, t), st(this));
  }
  setValue(t) {
    if (Ae(this._$Ct))
      this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = () => new Se();
class Se {
}
const ut = /* @__PURE__ */ new WeakMap(), pt = ge(class extends Ce {
  render(i) {
    return v;
  }
  update(i, [t]) {
    var e;
    const s = t !== this.Y;
    return s && this.Y !== void 0 && this.rt(void 0), (s || this.lt !== this.ct) && (this.Y = t, this.dt = (e = i.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.ct = i.element)), v;
  }
  rt(i) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.dt) !== null && t !== void 0 ? t : globalThis;
      let s = ut.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), ut.set(e, s)), s.get(this.Y) !== void 0 && this.Y.call(this.dt, void 0), s.set(this.Y, i), i !== void 0 && this.Y.call(this.dt, i);
    } else
      this.Y.value = i;
  }
  get lt() {
    var i, t, e;
    return typeof this.Y == "function" ? (t = ut.get((i = this.dt) !== null && i !== void 0 ? i : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var xe = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, S = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? ke(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && xe(t, e, n), n;
}, bt = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
}, h = (i, t, e) => (bt(i, t, "read from private field"), e ? e.call(i) : t.get(i)), u = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, B = (i, t, e, s) => (bt(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e), $ = (i, t, e) => (bt(i, t, "access private method"), e), ft, w, f, U, $t, F, E, W, _, g, C, k, it, Et, j, _t, Ct, Kt, St, jt, xt, Zt, kt, Gt, ot, Mt, Pt, Qt, Z, At, G, yt, Q, gt;
let m = class extends L {
  constructor() {
    super(), u(this, _), u(this, C), u(this, it), u(this, j), u(this, Ct), u(this, St), u(this, xt), u(this, kt), u(this, ot), u(this, Pt), u(this, Z), u(this, G), u(this, Q), u(this, ft, "data:image/png;base64,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"), u(this, w, void 0), u(this, f, dt()), u(this, U, dt()), u(this, $t, dt()), u(this, F, !1), u(this, E, {
      x: 0,
      y: 0
    }), u(this, W, void 0), this.brushScale = 1, this.centerCover = !1, this.fillColor = "white", this.preserveAspectRatio = !1, this.showAllAt = 100, this.silenceWarnings = !1, B(this, w, new Image()), h(this, w).src = h(this, ft), B(this, W, new ResizeObserver(() => $(this, j, _t).call(this)));
  }
  render() {
    return he`
			<div class="container" ${pt(h(this, U))}>
				<canvas
					${pt(h(this, f))}
					width="0"
					height="0"
					@mousedown=${$(this, Z, At)}
					@touchstart=${{ handleEvent: (i) => $(this, Z, At).call(this, i), passive: !0 }}
					@mousemove=${$(this, G, yt)}
					@touchmove=${$(this, G, yt)}
					@mouseup=${$(this, Q, gt)}
					@touchend=${$(this, Q, gt)}
				></canvas>
				<div class="content" ${pt(h(this, $t))}>
					<slot></slot>
				</div>
			</div>
		`;
  }
  updated(i) {
    super.firstUpdated(i), $(this, j, _t).call(this), h(this, W).observe(h(this, U).value);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), h(this, W).disconnect();
  }
  /**
   * Method to manually clear the card, revealing immediately the underlying content.
   */
  clearCard() {
    h(this, C, k) && (h(this, f).value && h(this, f).value.parentNode ? (h(this, f).value.parentNode.removeChild(h(this, f).value), $(this, it, Et).call(this)) : this.silenceWarnings || console.warn("clearCanvas() called while canvas is not attached to the DOM"), h(this, C, k).style.visibility = "visible");
  }
};
ft = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
E = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakSet();
g = function() {
  return h(this, f).value.getContext("2d", { willReadFrequently: !0 });
};
C = /* @__PURE__ */ new WeakSet();
k = function() {
  if (!this.shadowRoot)
    return null;
  const i = this.shadowRoot.querySelector("slot");
  return i ? i.assignedElements()[0] : (this.silenceWarnings || console.warn("Missing slot element needed by scratch-card"), null);
};
it = /* @__PURE__ */ new WeakSet();
Et = function() {
  const i = { bubbles: !0, composed: !0 };
  this.dispatchEvent(new CustomEvent("cleared", i));
};
j = /* @__PURE__ */ new WeakSet();
_t = function() {
  if (!h(this, C, k))
    return;
  h(this, C, k).style.visibility = "hidden";
  const i = h(this, U).value.offsetWidth, t = h(this, U).value.offsetHeight;
  h(this, f).value.style.width = `${i}px`, h(this, f).value.style.height = `${t}px`;
  const e = window.devicePixelRatio, s = i * e, n = t * e;
  if (h(this, f).value.width = Math.floor(s), h(this, f).value.height = Math.floor(n), this.coverSrc) {
    const o = new Image();
    o.src = this.coverSrc, o.setAttribute("crossOrigin", ""), o.onload = () => {
      console.debug(this.preserveAspectRatio);
      const [r, d] = this.preserveAspectRatio ? $(this, Ct, Kt).call(this, s, n, o.width, o.height) : [o.width, o.height], l = this.centerCover ? (s - r) / 2 : 0, a = this.centerCover ? (n - d) / 2 : 0, A = (s - i) / -2, c = (n - t) / -2;
      h(this, _, g).drawImage(o, l, a, r, d), h(this, _, g).save(), h(this, _, g).setTransform(-e, 0, 0, -e, A, c), h(this, _, g).restore(), h(this, C, k).style.visibility = "visible";
    };
  } else if (this.fillColor) {
    h(this, _, g).fillStyle = this.fillColor;
    const o = this.preserveAspectRatio ? s : i, r = this.preserveAspectRatio ? n : t;
    h(this, _, g).rect(0, 0, o, r), h(this, _, g).fill(), h(this, C, k).style.visibility = "visible";
  } else
    this.clearCard();
};
Ct = /* @__PURE__ */ new WeakSet();
Kt = function(i, t, e, s) {
  !this.silenceWarnings && (i > e || t > s) && console.warn("The scratch-card cover image is being scaled up");
  const n = i / e, o = t / s, r = e * o;
  return r >= i ? [r, t] : [i, s * n];
};
St = /* @__PURE__ */ new WeakSet();
jt = function(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
};
xt = /* @__PURE__ */ new WeakSet();
Zt = function(i, t) {
  return Math.atan2(t.x - i.x, t.y - i.y);
};
kt = /* @__PURE__ */ new WeakSet();
Gt = function(i) {
  (!i || i < 1) && (i = 1);
  const t = h(this, _, g).getImageData(
    0,
    0,
    h(this, f).value.width,
    h(this, f).value.height
  ), e = t.data.length, s = e / i;
  let n = 0;
  for (let o = 0; o < e; o += i)
    t.data[o] === 0 && n++;
  return Math.round(n / s * 100);
};
ot = /* @__PURE__ */ new WeakSet();
Mt = function(i) {
  let t = 0, e = 0;
  if (h(this, f).value.offsetParent !== void 0) {
    let o = h(this, f).value.offsetParent;
    for (; o; )
      t += o.offsetLeft, e += o.offsetTop, o = o.offsetParent;
  }
  const s = "pageX" in i ? i.pageX : i.touches[0].clientX, n = "pageY" in i ? i.pageY : i.touches[0].clientY;
  return {
    x: s - t,
    y: n - e
  };
};
Pt = /* @__PURE__ */ new WeakSet();
Qt = function(i) {
  i = i || 0, i >= this.showAllAt && (h(this, f).value.parentNode.removeChild(h(this, f).value), $(this, it, Et).call(this), console.debug(`Removed cover at ${i}% scratched`));
};
Z = /* @__PURE__ */ new WeakSet();
At = function(i) {
  B(this, F, !0), B(this, E, $(this, ot, Mt).call(this, i));
};
G = /* @__PURE__ */ new WeakSet();
yt = function(i) {
  if (!h(this, F))
    return;
  i.preventDefault();
  const t = $(this, ot, Mt).call(this, i), e = $(this, St, jt).call(this, h(this, E), t), s = $(this, xt, Zt).call(this, h(this, E), t), n = window.devicePixelRatio;
  for (let o = 0; o < e; o++) {
    const r = h(this, w).width * this.brushScale, d = h(this, w).height * this.brushScale, l = h(this, E).x + Math.sin(s) * o - 25 - (r - h(this, w).width) / 2, a = h(this, E).y + Math.cos(s) * o - 25 - (d - h(this, w).height) / 2;
    h(this, _, g).globalCompositeOperation = "destination-out", h(this, _, g).drawImage(h(this, w), l * n, a * n, r, d);
  }
  B(this, E, t), $(this, Pt, Qt).call(this, $(this, kt, Gt).call(this, this.coverSrc ? 32 : 1));
};
Q = /* @__PURE__ */ new WeakSet();
gt = function() {
  B(this, F, !1);
};
m.styles = ee`
		.container {
			box-sizing: border-box;
			position: relative;
			width: 100%;
			height: 100%;
			background: var(--scratch-card-bg-fallback, transparent);
			border-radius: var(--scratch-card-border-radius, 0);
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
		}

		.container canvas {
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			cursor: var(--scratch-card-cursor, default);
		}

		.container .content {
			visibility: hidden;
			width: 100%;
			height: 100%;
		}
	`;
S([
  M({ type: Number })
], m.prototype, "brushScale", 2);
S([
  M({ type: Boolean })
], m.prototype, "centerCover", 2);
S([
  M()
], m.prototype, "coverSrc", 2);
S([
  M()
], m.prototype, "fillColor", 2);
S([
  M({ type: Boolean })
], m.prototype, "preserveAspectRatio", 2);
S([
  M({ type: Number })
], m.prototype, "showAllAt", 2);
S([
  M({ type: Boolean })
], m.prototype, "silenceWarnings", 2);
m = S([
  $e("scratch-card")
], m);
export {
  m as ScratchCard
};
