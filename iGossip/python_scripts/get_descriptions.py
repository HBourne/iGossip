import pandas as pd

courses_csv = "/Users/gauravsharma/Desktop/test_csv.csv"
description_csv = "/Users/gauravsharma/Desktop/course_descriptions.xlsx"

course_pd = pd.read_csv(courses_csv)
description_pd = pd.read_excel(description_csv)

description_dict = {}
for index, row in description_pd.iterrows():
    num = row['Number']
    description = row['Description']
    description_dict[num] = description

col = []
for index, row in course_pd.iterrows():
    key = row[2]
    if key in description_dict.keys():
        col.append(description_dict[key])
    else:
        col.append("No description found")

course_pd['Description'] = col
output = "/Users/gauravsharma/Desktop/test_csv2.csv"
course_pd.to_csv(output)