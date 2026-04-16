from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

import json

def find_faculty(faculty_link: str) -> list:
    driver = webdriver.Chrome()
    driver.get(faculty_link)

    # change entry amt
    div = driver.find_element(By.TAG_NAME, "select")
    for _ in range(3):
        div.send_keys(Keys.ARROW_DOWN)
    div.send_keys(Keys.ENTER)

    json_metadata_prof = []

    # all faculty names
    faculty_names = driver.find_elements(By.CLASS_NAME, "sorting_1")
    all_meta_data = driver.find_elements(By.CLASS_NAME, "even")
    titles = []
    departments = []
    offices = []
    for meta_data in all_meta_data:
        title = meta_data.find_elements(By.TAG_NAME, "td")[1].text
        titles.append(str(title))
        department = meta_data.find_elements(By.TAG_NAME, "td")[2].text
        departments.append(str(department))
        office = meta_data.find_elements(By.TAG_NAME, "td")[3].text
        offices.append(str(office))

    all_prof_names = []
    for prof_name in faculty_names:
        # print(prof_name.text)
        all_prof_names.append(str(prof_name.text))

    for i in range(len(titles)):
        json_metadata_prof.append(
            {
            "professor": all_prof_names[i],
            "title": titles[i],
            "department": departments[i],
            "office": offices[i]
            }
        )

    driver.quit()

    return json_metadata_prof

# find_faculty("https://www.canyons.edu/directory/")
