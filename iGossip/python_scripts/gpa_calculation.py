import requests
import pandas as pd
import io
import decimal
from decimal import Decimal

output = ""
url = "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv"
s = requests.get(url).content
df = pd.read_csv(io.StringIO(s.decode('utf-8')))
columns = ["name","instructor","gpa"]
rows = []
cs_df = df[df['Subject']=="CS"]
gpa_dict = {}
for index, row in cs_df.iterrows():
    if pd.isna(row['Primary Instructor']):
        continue

    instructor = row["Primary Instructor"]
    number = row["Number"]
    name = row["Course Title"]
    key = (name,instructor)
    total = row["A+"]*4.0+row["A"]*4.0+row["A-"]*3.67+row["B+"]*3.33+row["B"]*3.00+row["B-"]*2.67+row["C+"]*2.33+row["C"]*2.00+row["C-"]*1.67+row["D+"]*1.33+row["D"]*1.00+row["F"]*0
    count =row["A+"]+row["A"]+row["A-"]+row["B+"]+row["B"]+row["B-"]+row["C+"]+row["C"]+row["C-"]+row["D+"]+row["D"]+row["D-"]+row["F"]
    if key in gpa_dict.keys():
        gpa_dict[key][0]+=total
        gpa_dict[key][1]+=count
    else:
        gpa_dict[key]=[total,count]


for key in gpa_dict.keys():
    avg_gpa = float(gpa_dict[key][0])/float(gpa_dict[key][1])
    gpa = Decimal(avg_gpa).quantize(Decimal("0.01"), decimal.ROUND_HALF_UP)
    rows.append([key[0],key[1],gpa])


final_df = pd.DataFrame(data = rows, columns = columns)
final_df.to_csv(output,index = False,header = True)