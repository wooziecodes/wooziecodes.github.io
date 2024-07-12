import requests
from bs4 import BeautifulSoup
import json
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

def create_session_with_retries():
    session = requests.Session()
    retries = Retry(total=5, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    adapter = HTTPAdapter(max_retries=retries)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

def scrape_goodreads(url):
    session = create_session_with_retries()
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = session.get(url, headers=headers, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching the page: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    
    books = []
    
    # Scrape "Currently Reading" section
    currently_reading = soup.find('div', id='currentlyReadingReviews')
    if currently_reading:
        for book_item in currently_reading.find_all('div', class_='Updates'):
            try:
                title = book_item.find('a', class_='bookTitle').text.strip()
                author = book_item.find('a', class_='authorName').text.strip()
                cover_url = book_item.find('img')['src']
                books.append({
                    'title': title,
                    'author': author,
                    'cover': cover_url,
                    'status': 'Currently Reading'
                })
            except AttributeError as e:
                print(f"Error parsing a book item: {e}")
    
    # Scrape "Arif's favorite books" section
    favorite_books = soup.find('div', id='featured_shelf')
    if favorite_books:
        for book_item in favorite_books.find_all('a', href=lambda href: href and href.startswith('/book/show/')):
            try:
                title = book_item.find('img')['alt'].split(' by ')[0].strip()
                author = book_item.find('img')['alt'].split(' by ')[1].strip()
                cover_url = book_item.find('img')['src']
                books.append({
                    'title': title,
                    'author': author,
                    'cover': cover_url,
                    'status': 'Favorite'
                })
            except (AttributeError, IndexError) as e:
                print(f"Error parsing a favorite book item: {e}")
    
    return books

# URL of your Goodreads profile
url = 'https://www.goodreads.com/user/show/14444457-arif-woozeer'

max_retries = 3
for attempt in range(max_retries):
    try:
        books = scrape_goodreads(url)
        if books:
            break
    except Exception as e:
        print(f"Attempt {attempt + 1} failed: {e}")
        if attempt < max_retries - 1:
            print("Retrying in 5 seconds...")
            time.sleep(5)
        else:
            print("Max retries reached. Exiting.")
            books = []

if books:
    # Save to a JSON file
    with open('books.json', 'w') as f:
        json.dump(books, f, indent=2)
    print(f"Scraped {len(books)} books and saved to books.json")
else:
    print("Failed to scrape books.")