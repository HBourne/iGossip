import csv
import sys
import pymysql


def course_csv_to_mysql(host, user, password, db_name):
    '''
    This function load a csv file to MySQL table according to
    the load_sql statement.
    '''
    filepath = "/path/to/your/course_csv"

    try:
        con = pymysql.connect(host=host,
                              user=user,
                              password=password,
                              db = db_name)
        print('Connected to DB: {}'.format(host))
        i = 0
        # Create cursor and execute Load SQL
        with open(filepath,'r') as csvfile:
            cursor = con.cursor()
            csv_data = csv.reader(csvfile)
            try:
                for row in csv_data:
                    # Omit the header
                    if i == 0:
                        i = 1
                        continue
                    i+=1
                    id_ = int(row[0])
                    print(id_)
                    subject_ = row[1]
                    number_ = int(row[2])
                    name_ = row[3]
                    instructor_ = row[4]
                    hash_val_ = row[5]
                    cursor.execute('INSERT INTO apiTest_course(subject, \
            number, name, instructor, hash_val)' \
            'VALUES("%s", "%s", "%s","%s","%s")',
            [subject_,number_,name_,instructor_, hash_val_])
                print('Successfully loaded the table from csv.')
            # Make sure we can close the cursor successfully
            finally:
                con.commit()
                cursor.close()

    except Exception as e:
        print('Error: {}'.format(str(e)))
        sys.exit(1)

if __name__ == "__main__":
    # Call the function here with host, user, pwd, db_name
    course_csv_to_mysql("host",'user',"pwd", "db")