import pandas as pd
import hashlib
# Get the original uiuc-gpa-dataset.csv from https://github.com/wadefagen/datasets/blob/master/gpa/uiuc-gpa-dataset.csv
# You will need the path to the downloaded csv and a path to the desired output location of the new csv

file_path = "/Users/gauravsharma/Desktop/uiuc-gpa-dataset.csv"
output = "/Users/gauravsharma/Desktop/cs-courses.csv"

uiuc_df = pd.read_csv(file_path)
uiuc_df = uiuc_df[uiuc_df['Subject']=="CS"]
columns = ["id","Subject","Number","Name","Instructor","Key"]
seen = set()
rows = []
i = 0
for index, row in uiuc_df.iterrows():
    if pd.isna(row['Primary Instructor']):
        continue
    instructor = "\""+row["Primary Instructor"]+"\""
    name = "\""+row["Course Title"]+"\""
    if (instructor, name) not in seen:
        number = "\""+str(row["Number"])+"\""
        subject = "\""+row["Subject"]+"\""
        key = name+instructor
        result = hashlib.sha256(key.encode())
        key = "\""+str(i)+"\""


        rows.append([key,subject,number,name,instructor, "\""+str(result.hexdigest())+"\""])
        seen.add((instructor,name))
        i += 1
final_df = pd.DataFrame(data = rows, columns = columns)
final_df.to_csv(output,index = False,header = True)
