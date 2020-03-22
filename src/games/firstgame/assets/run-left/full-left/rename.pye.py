import os

listdir = os.listdir(".")


length = len("NITW_cat_run_left_1_00000")

for img in listdir:
    newname = img[:length] + img[-4:]
    os.rename(img, newname)
