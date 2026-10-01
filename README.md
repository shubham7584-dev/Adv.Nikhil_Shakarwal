# Adv. Nikhil Shakarwal — Website

Static HTML/CSS/JS site. No build step, no server required.

## Deploy on GitHub Pages

1. Create a new GitHub repository (public, unless you have GitHub Pro/Team for a private Pages site).
2. Upload **everything in this folder** to the repo root (`index.html`, `css/`, `js/`, `images/`, etc. all at the top level — not inside an extra subfolder).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, pick the `main` branch and the `/ (root)` folder, then **Save**.
5. GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/` — it usually goes live within a minute or two.

## Using a custom domain (optional)

If you point a domain you own at this site, add a file named `CNAME` (no extension) to the repo root containing just your domain, e.g.:

```
www.yourdomain.com
```

Then follow GitHub's instructions to add the matching DNS records at your domain registrar.

## Notes

- `.nojekyll` is included so GitHub serves the files as-is.
- All links between pages are relative, so the site works the same whether it's hosted at the root domain or at `username.github.io/repo-name/`.
