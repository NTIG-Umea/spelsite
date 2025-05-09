# Sida för alla våra spel

Hostad på netlify. 

För att få med ditt spel. Antingen en pull request (när det finns ett år osv.) eller så skickar du infon till lärare tillsammans med en bild på ditt spel (inte 100mb stor), döp bilden till något rimligt (spelnamn-ditt-namn.format), inga spaces eller svenska tecken.

## Spelinfo

```json
{
    "team": "Gruppnamnet",
    "creators": "Vilka är ni som skapat spelet, om du jobbat själv så är det du",
    "title": "Spelets titel",
    "description": "Beskriv ditt spel i en slående mening. Varför ska vi spela ditt spel?",
    "image": "",
    "url": "https till ditt färdiga spel",
    "git": "https till ditt git repo med spelet"
}
```

## Clickerinfo
```json	
{
    "title": "CLICKERS TITEL",
    "tagline": "EN BESKRIVANDE OCH SÄLJANDE MENING",
    "url": "URL TILL CLICKERN",
    "git": "URL TILL GIT REPOT",
    "author": "DITT NAMN"
}
```

## Kom ihåg

Använda getscreens för att automatisera screenshots.

```bash
mkdir src/previews
npm i -D --save @zvorak/getimage
```

Scriptet använder puppeteer, så vi måste installera paket + chrome.
[Troubleshooting](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)
