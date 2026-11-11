# Sclime.com Landing Page

This is a simple static landing page for the Sclime.com domain. It uses only HTML, CSS, and vanilla JavaScript, so it can be hosted directly on GitHub Pages.

## 1. Create a GitHub repository and upload the files

1. Sign in to [GitHub](https://github.com/).
2. Click the **+** button in the top-right corner and choose **New repository**.
3. Give the repository a name, such as `sclime-landing-page`.
4. Choose **Public** unless you have a GitHub plan that supports Pages for private repositories.
5. Do not add a README, `.gitignore`, or license during setup. This project already contains its own README.
6. Click **Create repository**.
7. On the new repository page, click **Add file > Upload files**.
8. Upload these files to the repository root, not inside another folder:

   - `index.html`
   - `styles.css`
   - `script.js`
   - `CNAME`
   - `.nojekyll`
   - `README.md`

9. If `.nojekyll` does not appear in the file picker, enable hidden-file display or upload it through Git/GitHub Desktop. It must be an empty file named exactly `.nojekyll`.
10. Open `CNAME` in GitHub and confirm it contains exactly this one line:

    ```text
    sclime.com
    ```

11. Scroll down, enter a commit message such as `Add Sclime landing page`, and click **Commit changes**.

## 2. Turn on GitHub Pages

1. Open the repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, open **Pages** under **Code and automation**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select:

   - Branch: `main`
   - Folder: `/ (root)`

6. Click **Save**.
7. Wait for GitHub to finish deploying. GitHub will show a temporary Pages URL on the same screen.

## 3. Set the custom domain

1. Stay in **Settings > Pages**.
2. In the **Custom domain** field, enter:

   ```text
   sclime.com
   ```

3. Click **Save**.
4. GitHub may take a few minutes to verify the domain and issue its HTTPS certificate.
5. Once the certificate is ready, enable **Enforce HTTPS**.

The `CNAME` file in the repository root and the custom-domain setting should both contain `sclime.com`.

## 4. Add DNS records at the domain registrar

Open the DNS management page at the company where `sclime.com` is registered. Add these records:

| Type | Host / Name | Value / Points to | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Automatic or 1 hour |
| A | `@` | `185.199.109.153` | Automatic or 1 hour |
| A | `@` | `185.199.110.153` | Automatic or 1 hour |
| A | `@` | `185.199.111.153` | Automatic or 1 hour |
| CNAME | `www` | `<my-github-username>.github.io` | Automatic or 1 hour |

Replace `<my-github-username>` with your actual GitHub username. For example, if your username is `alex`, the CNAME value is:

```text
alex.github.io
```

Important DNS notes:

- Use `@` for the apex domain (`sclime.com`) when your registrar supports it.
- Enter only `www` as the host for the `www` CNAME; do not enter the full domain unless your registrar specifically asks for it.
- Remove conflicting old A, AAAA, or CNAME records for `@` and `www` if they point somewhere else.
- Do not create a CNAME record for the apex `@` if your registrar requires the four GitHub Pages A records.

## 5. Wait for DNS and check the result

DNS changes often begin working within a few minutes, but they can take several hours. In some cases, full propagation can take up to 24–48 hours because DNS resolvers cache old records.

You can check the records with:

- [DNS Checker](https://dnschecker.org/): search for `sclime.com`, choose **A**, and confirm the four GitHub IP addresses appear.
- A terminal command:

  ```text
  nslookup sclime.com
  nslookup www.sclime.com
  ```

- Or with `dig` on macOS/Linux:

  ```text
  dig sclime.com A
  dig www.sclime.com CNAME
  ```

When the DNS records are correct, open both `https://sclime.com` and `https://www.sclime.com` in a browser. Return to **Settings > Pages** and wait for the custom-domain certificate status to become ready before enabling **Enforce HTTPS**.

## 6. Edit the price, email, and text later

### Change the price

Open `script.js` and find the editable constant near the top:

```js
const DOMAIN_PRICE_USD = 3399;
```

Change only the number. For example:

```js
const DOMAIN_PRICE_USD = 3999;
```

The page formats and uses this value in the hero badge, price card, offer section, FAQ, and offer email subject.

### Change the seller email

In `script.js`, find the email helper:

```js
const getSellerEmail = () => ['yousefshabank', '@', 'gmail.com'].join('');
```

Replace the three parts with the new email address. Keep the address split into small strings so it is not written directly in the normal HTML.

### Change the page text

Most visible text is in `index.html`, including:

- The hero headline and subheadline
- Navigation and button labels
- Use-case card titles and descriptions
- Price and FAQ text
- Footer text

Edit the wording directly in `index.html`, keeping the surrounding tags and IDs intact. IDs such as `#price`, `#offer`, and `#faq` are used by navigation links and JavaScript, so do not remove or rename them unless you also update every matching link and script reference.

After making edits:

1. Save the files.
2. Commit and push the changes to the `main` branch.
3. Wait for GitHub Pages to redeploy.
4. Refresh the live site. If an old version still appears, try a hard refresh or wait for browser and CDN caches to expire.
