export default class PRNG {
  constructor() {
    /**
     * @license: MIT - fxhash, https://github.com/fxhash/fxhash-webpack-boilerplate
     * updated to only use "hash" as the parameter
     */
    const search = new URLSearchParams(window.location.search);
    const alphabet = `123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ`;
    this.hash =
      search.get(`hash`) ||
      `oo` +
        Array(49)
          .fill(0)
          .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
          .join(``);
    const b58dec = (str) =>
      [...str].reduce(
        (p, c) => (p * alphabet.length + alphabet.indexOf(c)) | 0,
        0,
      );
    const fxhashTrunc = this.hash.slice(2);
    const regex = new RegExp(`.{` + ((this.hash.length / 4) | 0) + `}`, `g`);
    this.hashes = fxhashTrunc.match(regex).map((h) => b58dec(h));

    const sfc32 = (a, b, c, d) => {
      return () => {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        const t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };

    this.fxrand = sfc32(...this.hashes);
  }

  next() {
    return this.fxrand();
  }

  list({ size, fillWith = null, unique = false, precision = null }) {
    const values = [];

    if (fillWith === null) {
      for (let i = 0; i < size; i++) {
        let _next = this.next();

        if (precision !== null) {
          _next = +_next.toFixed(precision);
        }

        // The array should only contain unique values
        if (unique) {
          while (values.includes(_next)) {
            _next = this.next();
            _next = +_next.toFixed(precision);
          }
        }

        values.push(_next);
      }
    } else {
      for (let i = 0; i < size; i++) {
        values.push(fillWith);
      }
    }

    return values;
  }
}
