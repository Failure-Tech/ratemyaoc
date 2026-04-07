from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs

soup = bs()

faculty_link = "https://www.canyons.edu/academics/"

driver = webdriver.Chrome()
driver.get(faculty_link)
container_div = driver.find_element(By.CLASS_NAME, "mt-4")
departments = container_div.find_element(By.TAG_NAME, "ul")
department_list = departments.find_elements(By.TAG_NAME, "li")

for department in department_list:
    link = department.find_element(By.TAG_NAME, "a")
    link.send_keys(Keys.ENTER)
    # each page will have two possible links to attend, faculty or contact
    nav_parse = driver.find_element(By.TAG_NAME, "nav")
    try:
        element = nav_parse.find_element(By.XPATH, "//a[contains(., 'Faculty')]")
        print(f"Success, found element with this inner text: {element.get_attribute("innerHTML")}")

        element.send_keys(Keys.ENTER)

        # if faculty (make custom scraping tool)

    except Exception as e:
        element = nav_parse.find_element(By.XPATH, "//a[contains(., 'Contact')]")
        print(f"Unable to find faculty element; default to contact\n{e}")


    # nav_links = driver.find_elements(By.TAG_NAME, "a")
    # for possible_link in nav_links:
    #     if possible_link.te
    #     file.write(str(nav_parse.get_attribute("innerHTML")))
    # print(f"Faculty Link: {[thing.get_attribute("innerHTML") for thing in possible_link]}")
        # print(f"No faculty directory")
    # time.sleep(10)

driver.close()
