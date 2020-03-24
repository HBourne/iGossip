import csv
import sys
import pymysql


def csv_to_mysql(host, user, password, db_name):
    '''
    This function load a csv file to MySQL table according to
    the load_sql statement.
    '''
    filepath = ""

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
            for row in csv_data:
                i+=1
                id_ = int(row[0])
                subject_ = row[1]
                number_ = int(row[2])
                name_ = row[3]
                instructor_ = row[4]
                hash_val_ = row[5]
                cursor.execute('INSERT INTO apiTest_course(id, subject, \
          number, name, instructor, hash_val)' \
          'VALUES("%s","%s", "%s", "%s","%s","%s")',
          [id_,subject_,number_,name_,instructor_, hash_val_])
                if i == 364:
                    break
            print('Successfully loaded the table from csv.')

            con.commit()
            cursor.close()

    except Exception as e:
        print('Error: {}'.format(str(e)))
        sys.exit(1)


# Call the function here with host, user, pwd, db_name
csv_to_mysql("host",'user',"pwd", "db_name")