from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.common.exceptions import NoSuchElementException

import time

coc_prof_list = "https://www.ratemyprofessors.com/search/professors/13708"

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
driver.get(coc_prof_list)

full_coc_prof_rating_list = driver.find_elements(By.CLASS_NAME, "SearchResultsPage__StyledResultsWrapper-vhbycj-4")
for prof in full_coc_prof_rating_list:
    names = prof.find_elements(By.CLASS_NAME, "CardName__StyledCardName-sc-1gyrgim-0")
    for name in names:
        print(f"Professor {name.get_attribute("innerHTML")}\n")

    # time.sleep(5)
    # button_elem = driver.find_element(By.CLASS_NAME, "Buttons__Button-sc-19xdot-1")
    # button_elem_exists = True
    # while button_elem_exists:
    #     try:
    #         print("try block ran")
    #         wait.until(EC.invisibility_of_element_located((By.NAME, "IL_SR_FRAME1")))
    #         button_elem = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "Buttons__Button-sc-19xdot-1")))
    #         time.sleep(1)
    #         button_elem.click()
    #     except NoSuchElementException:
    #         button_elem_exists = False

    links = prof.find_element(By.TAG_NAME, "a")
    driver.get(links.get_attribute("href"))

    """
        professor_name,
        department,
        overall_rating,
        take_again,
        level_of_difficulty,
        ratings: [{
            5: 169,
            4: 30,
            3: 8,
            2: 1,
            1: 3
        }],
        reviews: [{
            quality,
            difficulty,
            grade (if available),
            date,
            written_response
        }]
    """

    professor_name = driver.find_element(By.CLASS_NAME, "NameTitle__NameWrapper-dowf0z-2").text
    department = driver.find_element(By.CLASS_NAME, "TeacherDepartment__StyledDepartmentLink-fl79e8-0").text
    overall_rating = driver.find_element(By.CLASS_NAME, "RatingValue__Numerator-qw8sqy-2").text
    would_take_again_percentage = float(driver.find_element(By.CLASS_NAME, "FeedbackItem__FeedbackNumber-uof32n-1").text[:-1])
    level_of_difficulty = float(driver.find_elements(By.CLASS_NAME, "FeedbackItem__FeedbackNumber-uof32n-1")[1].text)
    list_of_ratings = driver.find_element(By.CLASS_NAME, "RatingDistributionChart__MeterList-o2y7ff-0").find_elements(By.TAG_NAME, "li")
    all_ratings = []

    for i in range(len(list_of_ratings)):
        current_rating_number = int(driver.find_elements(By.CLASS_NAME, "RatingDistributionChart__LabelValue-o2y7ff-7")[i].text)
        current_actual_rating = int(list_of_ratings[i].find_element(By.TAG_NAME, "b").text)
        all_ratings.append({current_rating_number: current_actual_rating})

    # TODO: continue with review section

    # links = prof.find_elements(By.TAG_NAME, "a")
    # for link in links:
    #     print(link.get_attribute("href"))
    #     link.click()
    #     time.sleep(5)
