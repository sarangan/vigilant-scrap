import requests
from bs4 import BeautifulSoup
from csv import writer
response = requests.get('https://www.sample.com/about.html')
soup = BeautifulSoup(response.text, 'html.parser')
posts = soup.find_all(class_='box-info')
with open('posts.csv', 'w') as csv_file:
    csv_writer = writer(csv_file)
    headers = ['Title', 'Link', 'Date']
    csv_writer.writerow(headers)
    for post in posts:
        title = u''.join(post.find(class_='title').get_text().replace('\n', '')).encode('utf-8').strip()
        link = u''.join(post.find('p').get_text().replace('\n', '')).encode('utf-8').strip()
        date = 'NULL'
        csv_writer.writerow([title, link, date])
