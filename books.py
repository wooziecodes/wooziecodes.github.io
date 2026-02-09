import json
import re
import urllib.request
import xml.etree.ElementTree as ET

FEEDS = [
    ("https://www.goodreads.com/review/list_rss/14444457?shelf=currently-reading", "Currently Reading"),
    ("https://www.goodreads.com/review/list_rss/14444457?shelf=favorites", "Favorite"),
    ("https://www.goodreads.com/review/list_rss/14444457?shelf=read", "Read"),
]

STATUS_PRIORITY = {"Currently Reading": 0, "Favorite": 1, "Read": 2}


def strip_html(text):
    return re.sub(r"<[^>]+>", "", text).strip()


def upgrade_cover(url):
    return re.sub(r"\._S[XY]\d+_", "._SX300_", url)


def fetch_feed(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def parse_feed(xml_bytes, status):
    root = ET.fromstring(xml_bytes)
    books = []
    for item in root.iter("item"):
        title = (item.findtext("title") or "").strip()
        author = (item.findtext("author_name") or "").strip()
        cover = item.findtext("book_image_url") or ""
        link = (item.findtext("link") or "").strip()
        review = strip_html(item.findtext("user_review") or "")
        rating = item.findtext("user_rating") or "0"

        try:
            rating = int(rating)
        except ValueError:
            rating = 0

        if not rating and not review:
            continue

        if cover:
            cover = upgrade_cover(cover)

        books.append({
            "title": title,
            "author": author,
            "cover": cover,
            "status": status,
            "review": review,
            "link": link,
        })
    return books


def main():
    seen = {}
    for url, status in FEEDS:
        print(f"Fetching {status} shelf...")
        xml_bytes = fetch_feed(url)
        books = parse_feed(xml_bytes, status)
        for book in books:
            key = book["title"]
            if key not in seen or STATUS_PRIORITY[book["status"]] < STATUS_PRIORITY[seen[key]["status"]]:
                seen[key] = book
        print(f"  Found {len(books)} books")

    result = list(seen.values())

    # Drop empty reviews/links from output
    for book in result:
        if not book["review"]:
            del book["review"]
        if not book["link"]:
            del book["link"]

    with open("books.json", "w") as f:
        json.dump(result, f, indent=2)

    print(f"\nWrote {len(result)} books to books.json")


if __name__ == "__main__":
    main()
