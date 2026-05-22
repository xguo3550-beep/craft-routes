# Workshop cover photos

By default the app loads **real Unsplash photography** (indigo, Erhai, tea, China streets, etc.).

To save copies locally (faster, works offline):

```bash
npm run images:download
```

Then in `.env.local`:

```
USE_LOCAL_WORKSHOP_IMAGES=true
```

Restart `npm run dev`.
