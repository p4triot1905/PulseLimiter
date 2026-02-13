# PulseLimiter
Tiny, production-ready rate limiter for Node.js APIs (Token Bucket + Express middleware)

# PulseLimiter ⚡


It protects your backend from:

- Spam requests  
- Brute-force attacks  
- Abusive clients  
- Accidental overload  

Built with the lightweight **Token Bucket algorithm** and designed to be:

✅ TypeScript-first  
✅ Zero-dependency  
✅ Express middleware ready  
✅ Simple, fast, clean  

---

## 🚀 Features

- Token Bucket rate limiting (modern + efficient)
- Per-IP or per-user limiting
- Express middleware included
- Automatic `429 Too Many Requests` responses
- `Retry-After` header support
- Fully tested with Vitest
- Publish-ready as an npm package

---

## 📦 Installation

```bash
npm install pulselimiter

to run

npm test

to build the package

npm run build
