import requests
from bs4 import BeautifulSoup

def find_departments(department_url: str) -> list:
    
    departments_request = requests.get(department_url)

    soup = BeautifulSoup(departments_request.content, "html.parser")

    all_departments = soup.find_all("div", class_="page-content-container")

    all_departments_list: list = all_departments[0].find_all("ul")[0].find_all("li")
    text_style_departments = [department.text for department in all_departments_list]

    return text_style_departments

# print(find_departments("https://www.canyons.edu/academics/"))