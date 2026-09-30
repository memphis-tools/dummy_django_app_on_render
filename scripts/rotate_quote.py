import json
import random
import re
import sys
import urllib.parse
import urllib.request

PAGE = "Saison 2 des Petits Meurtres d'Agatha Christie"
API = "https://fr.wikipedia.org/w/api.php"
TEMPLATE = "dummy_django_blog/blog/templates/blog/home.html"

CRITICS = [
    ("Gérard Pipette", "La Semaine en Énigmes"),
    ("Colette Vandenbergue", "La Revue du Flegme"),
    ("Hortense Papillon", "Le Cri du Père Noël"),
    ("Bertrand Ficel", "L'Écho des Guinguettes"),
    ("Marguerite Salade", "Le Trombone du Nord"),
    ("Aristide Boursouflure", "Canard Casquette"),
    ("Firmin Tiroir", "La Gazette des Chaussettes"),
    ("Joséphine Kwatz", "Le Marteau Pédagogique"),
    ("Célestin Bricole", "La Reporter du Fossé"),
    ("Olympe Tartine", "Le Journal des Pipelettes"),
    ("Prosper Vuvuzela", "L'Abeille du Commissariat"),
    ("Ravissante Doudou", "La Dépêche Farcie"),
    ("Ulysse Baguette", "Le Cri de la Casserole"),
    ("Séraphine Cotillon", "Les Échos de la Kermesse"),
    ("Marcellin Pinceau", "La Truelle Culturelle"),
]

TAGLINE_ENDINGS = [
    "Du suspense, de l'humour, du Nord !",
    "Un polar décalé qui ne se prend pas au sérieux.",
    "Du meurtre, du charme et des chaussettes dépareillées !",
    "Une enquête savoureuse, à déguster sans modération.",
    "Le genre policier n'a jamais été aussi rigolo.",
    "On y croise des cadavres, des pâtes de fruits et des imprimeurs sournois !",
]


def fetch_wikitext():
    params = {
        "action": "parse",
        "page": PAGE,
        "prop": "wikitext",
        "format": "json",
        "formatversion": "2",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "quote-rotation/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.load(resp)
    return data["parse"]["wikitext"]


def clean(text):
    text = re.sub(r"<ref[^>]*/>", "", text)
    text = re.sub(r"<ref[^>]*>.*?</ref>", "", text, flags=re.DOTALL)
    text = re.sub(r"<small>(.*?)</small>", r"\1", text, flags=re.DOTALL)
    for _ in range(5):
        text = re.sub(r"\{\{[^{}]*\}\}", "", text)
    text = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace("'''''", "").replace("'''", "").replace("''", "")
    text = text.replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_episodes(wikitext):
    episodes = []
    pattern = re.compile(r"===\s*Épisode\s+(\d+)\s*:\s*''(.*?)''\s*===")
    matches = list(pattern.finditer(wikitext))
    for i, m in enumerate(matches):
        num = int(m.group(1))
        title = clean(m.group(2))
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(wikitext)
        block = wikitext[start:end]
        synopsis = ""
        tpl = re.search(r"\|\s*synopsis\s*=\s*(.*?)(?=\n\s*\||\n\}\})", block, re.DOTALL)
        if tpl:
            synopsis = clean(tpl.group(1))
        else:
            plain = re.search(r"'''Synopsis'''\s*\n\s*\n(.*?)(?=\n'''|\n===|\Z)", block, re.DOTALL)
            if plain:
                synopsis = clean(plain.group(1))
        if synopsis:
            episodes.append({"num": num, "title": title, "synopsis": synopsis})
    return episodes


def shorten(text, max_chars=260):
    sentences = re.split(r"(?<=[.!?])\s+", text)
    short = sentences[0]
    for s in sentences[1:]:
        if len(short) + len(s) + 1 > max_chars:
            break
        short = short + " " + s
    if len(short) > max_chars:
        short = short[: max_chars - 1].rsplit(" ", 1)[0] + "…"
    return short


def main():
    wikitext = fetch_wikitext()
    episodes = parse_episodes(wikitext)
    if not episodes:
        print("No episode with synopsis found", file=sys.stderr)
        return 1
    ep = random.choice(episodes)
    summary = shorten(ep["synopsis"])
    name, newspaper = random.choice(CRITICS)
    tagline = random.choice(TAGLINE_ENDINGS)
    quote = f"« {summary} {tagline} »"

    with open(TEMPLATE, encoding="utf-8") as f:
        html = f.read()

    new_blockquote = (
        "<blockquote>\n"
        f"                <p><em>{quote}</em></p>\n"
        "            </blockquote>"
    )
    html, n1 = re.subn(
        r"<blockquote>.*?</blockquote>", new_blockquote, html, count=1, flags=re.DOTALL
    )
    new_cite = (
        f"<cite>— {name}, critique télé pour <strong>{newspaper}</strong></cite>"
    )
    html, n2 = re.subn(r"<cite>.*?</cite>", new_cite, html, count=1, flags=re.DOTALL)
    if n1 != 1 or n2 != 1:
        print("Could not locate blockquote/cite in template", file=sys.stderr)
        return 1

    with open(TEMPLATE, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Episode {ep['num']} : {ep['title']} — {name}, {newspaper}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
