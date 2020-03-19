import pandas as pd

# Get the original uiuc-gpa-dataset.csv from https://github.com/wadefagen/datasets/blob/master/gpa/uiuc-gpa-dataset.csv
# You will need the path to the downloaded csv and a path to the desired output location of the new csv

uiuc_df = pd.read_csv("path to dataset here")
uiuc_df = uiuc_df[uiuc_df['Subject']=="CS"]
columns = ["Subject","Number","Name","Instructor"]
seen = set()
rows = []
for index, row in uiuc_df.iterrows():
    instructor = row["Primary Instructor"]
    name = row["Course Title"]
    if (instructor, name) not in seen:
        number = row["Number"]
        subject = row["Subject"]
        rows.append([subject,number,name,instructor])
        seen.add((instructor,name))
final_df = pd.DataFrame(data = rows, columns = columns)
final_df.to_csv("output file path here",index = True,header = True)
