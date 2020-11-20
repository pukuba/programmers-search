import requests
from parseHtml import * 
from bs4 import BeautifulSoup
import csv

f = open('db.csv', 'w', encoding='utf-8', newline='')
wr = csv.writer(f)

wr.writerow(["Title","Lv","Url"])

def parse(x):
    title = x.h4.get_text()
    url = "https://programmers.co.kr"+x.attrs['href']
    level = str(x.parent.parent.find(attrs={'class':'card-algorithm'}))
    # print("level:" + level[33:34])
    # print(title)
    # print(url)
    wr.writerow([title,int(level[33:34]), url])

for page in pages:
    soup = BeautifulSoup(page)
    problems = soup.find_all('h4')
    for problem in problems:
        parse(problem.parent)

print("csv 작업 종료")

f.close()