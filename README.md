# Masarok · مسارُك

A free, student-written guide for Saudi students who want to study abroad: the USA, the UK, Canada, Germany, Singapore and Australia.

It covers:

- **Country and university picker:** choose a country, city and university, and the guide adapts its visa steps, living costs, housing, transport and links. Share a link with `?country=uk` or `?uni=mit`, for example.
- **Step-by-step journey:** an optional locked staircase of small steps for each degree level, adapted to the chosen country.
- **Study options:** direct entry, Foundation Studies, Diploma, English courses, Master's and Pre-Masters
- **The SACM scholarship:** the four tracks, conditions, what to do while you study, and degree equivalency
- **Checklists:** before you fly, and your first two weeks
- **Money and work:** visa work limits, pay rights, tax and rent
- **Official links:** immigration sites for each country, the Ministry of Education, Safeer, the cultural missions and universities

**Live site:** https://masarok.org/

## Why this exists

I came to Sydney on a SACM scholarship, did a Foundation year, completed the Diploma in Engineering at UNSW College, and moved into the second year of Mining Engineering at UNSW. This guide is what I wish I had on day one.

## Contributing

Rules for visas and scholarships change often. If you spot something wrong or out of date, you can help:

1. **Report it:** open an [issue](../../issues) and say what is wrong and, if possible, link the official source.
2. **Fix it yourself:** Australia's text lives in `index.html` and `ar/index.html`; other countries are in `country.js`, and universities and cities are in `unis.js`. Open a pull request.

Please link an official source (a government immigration site, the Ministry of Education, a cultural mission or a university) for any rule you add or change.

## Disclaimer

This guide shares one student's experience. It is not official advice from any university, government or sponsor. Always confirm details with the official sources.

## Licence

See [LICENSE](LICENSE).

## Installable app

Masarok is also a Progressive Web App: visitors can install it to their home screen ("Install app" in the menu, or Share → Add to Home Screen on iPhone) and it keeps working offline.

- `manifest.webmanifest` and `ar/manifest.webmanifest`: app name, icons and shortcuts (English and Arabic)
- `sw.js`: offline support. Pages and scripts load from the network first and fall back to the saved copy offline, so updates show straight away
- `app.js`: registers the service worker and shows the install button (with Add to Home Screen steps on iPhone)
- `icons/`: app icons (`icon.svg` is the source)
