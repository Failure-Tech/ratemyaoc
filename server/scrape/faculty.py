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

    all_meta_data = driver.find_element(By.XPATH, '//*[@id="profiles"]/tbody').find_elements(By.TAG_NAME, "tr")
    print(len(all_meta_data))

    professors_faculty = []
    titles = []
    departments = []
    offices = []

    data_save_file = "faculty_list_new.txt"

    
    for meta_data in all_meta_data:
        professor = meta_data.find_elements(By.TAG_NAME, "td")[0].text
        professors_faculty.append(str(professor))

        title = meta_data.find_elements(By.TAG_NAME, "td")[1].text
        titles.append(str(title))

        department = meta_data.find_elements(By.TAG_NAME, "td")[2].text
        departments.append(str(department))

        office = meta_data.find_elements(By.TAG_NAME, "td")[3].text
        offices.append(str(office))
        
        print(f"""
            Professor: {professor},
            Title: {title},
            Department: {department},
            Office: {office}
        """)

    # print(f"Final Element Cross Check: {departments}")

    for i in range(len(all_meta_data)):
        json_metadata_prof.append(
            {
            "professor": professors_faculty[i],
            "title": titles[i],
            "department": departments[i],
            "office": offices[i]
            }
        )

    with open(data_save_file, "w") as f:
        json.dump(json_metadata_prof, f)
    print(f"Successfully saved to {data_save_file}")

    driver.quit()

    return json_metadata_prof

find_faculty("https://www.canyons.edu/directory/")
